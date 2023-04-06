import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { makeFrequencyObj } from "../Functions/processData";

export default function HistogramComponent({ title, data }) {
  const [isNum, setIsNum] = useState();
  const [SET, setSET] = useState([]);
  const [Frequency, setFrequency] = useState();
  const [Sorted, setSorted] = useState();

  useEffect(() => {
    for (let el of data) {
      if (isNaN(el)) {
        setIsNum(false);
        break;
      } else {
        setIsNum(true);
      }
    }
  }, [data]);

  useEffect(() => {
    !isNum && setSET([...new Set(data)]);
  }, [isNum, data]);

  useEffect(() => {
    setFrequency(makeFrequencyObj(isNum, data));
    setSorted(makeFrequencyObj(isNum, data).sort((a, b) => b.count - a.count));
  }, [data, data.length, SET, isNum]);
  //   console.log(!isNum && `not printing ${Sorted}`);

  return (
    <Container>
      {SET.length === data.length ? (
        <p>All data is unique, nothing to show in Histogram.</p>
      ) : (
        Frequency &&
        Sorted && (
          <>
            <div className="histogram_container">
              <div className="histogram_box">
                <>
                  {console.log(Math.round(Sorted[0].count / 5) + 1)}
                  {React.Children.toArray(
                    [...Array(Math.round(Sorted[0].count / 5) + 1)].map(
                      (el, index) => (
                        <div
                          className="y_label"
                          style={{
                            top: `${
                              index *
                                (100 / (Math.round(Sorted[0].count / 5) + 1)) -
                              2.1
                            }%`,
                          }}
                        >
                          {Sorted &&
                            5 * (Math.round(Sorted[0].count / 5) + 1 - index)}
                        </div>
                      )
                    )
                  )}
                  <div
                    className="y_label"
                    style={{
                      top: `97.7%`,
                    }}
                  >
                    0
                  </div>
                </>
                <div className="bar_box">
                  {isNum && (
                    <div
                      style={
                        {
                          // width: `${
                          //   100 / (Math.round(Sorted[0].count / 5) + 1)
                          // }%`,
                        }
                      }
                    ></div>
                  )}
                  {React.Children.toArray(
                    Frequency.map((el) => (
                      <div
                        style={{
                          height: `${
                            (el.count /
                              ((Math.round(Sorted[0].count / 5) + 1) * 5)) *
                            100
                          }%`,
                          // width: `${Math.round(Sorted[0].count / 5) + 1}%`,
                        }}
                      >
                        {el.count}
                      </div>
                    ))
                  )}
                </div>

                <div className="x_label">
                  {isNum && (
                    <div
                    // style={{
                    //   width: `${
                    //     100 / (Math.round(Sorted[0].count / 5) + 1)
                    //   }%`,
                    // }}
                    />
                  )}
                  {React.Children.toArray(
                    Frequency.map((el, index) =>
                      isNum ? (
                        <div
                        // style={{
                        //   width: `${
                        //     100 / (Math.round(Sorted[0].count / 5) + 1)
                        //   }%`,
                        // }}
                        >
                          <span>{el.class.split("-")[0]}</span>
                          {index + 1 === Frequency.length && (
                            <span className="right">
                              {el.class.split("-")[1]}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div
                          className="not_num"
                          // style={{
                          //   width: `${
                          //     100 / (Math.round(Sorted[0].count / 5) + 1)
                          //   }%`,
                          // }}
                        >
                          <p>{el.class}</p>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>
            <h1>
              Figure: {isNum ? "Histogram" : "Bar diagram"} of the {title}.
            </h1>
          </>
        )
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  /* overflow-x: auto; */
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 0;
  & > h1 {
    font-size: 1.4rem;
    font-weight: 500;
  }
  & > .histogram_container {
    width: 100%;
    overflow: auto;
    padding: 24px;
    padding-right: 0;
    & > .histogram_box {
      border-left: 1px solid var(--light);
      border-bottom: 1px solid var(--light);
      margin-left: 24px;
      position: relative;
      height: 400px;
      width: max(600px, 90%);
      & > .y_label {
        position: absolute;
        right: 101%;
        color: var(--light-green);
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -7px;
          transform: translateY(-50%);
          width: 6px;
          height: 2px;
          background-color: var(--light);
        }
      }
      & > .bar_box {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: flex-end;
        width: 100%;
        height: 100%;
        & > * {
          background-color: var(--light-green);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--light);
          flex: 1;
        }
      }
      & > .x_label {
        display: flex;
        position: relative;
        & > * {
          /* margin-left: -2px; */
          display: flex;
          flex-direction: column;
          position: relative;
          flex: 1;
          & > span {
            position: absolute;
            top: 4px;
            left: 0%;
            transform: translateX(-50%);
            &::before {
              content: "";
              position: absolute;
              height: 5px;
              width: 2px;
              background-color: var(--light);
              left: 50%;
              top: -3px;
              transform: translateX(-50%);
            }
            &.right {
              left: 100%;
              transform: translateX(-50%);
            }
          }
        }
        & > .not_num {
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;
