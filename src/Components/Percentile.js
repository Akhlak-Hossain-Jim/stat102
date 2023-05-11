import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import Divide from "./Divide";

function Content({ title, data }) {
  const [isNum, setIsNum] = useState();
  const [SortedValue, setSortedValue] = useState();
  const [PVal, setPVal] = useState();
  const [Px, setPx] = useState(1);

  useEffect(() => {
    setIsNum(dataIsNumber(data));
  }, [data]);
  useEffect(() => {
    if (isNum) {
      let a = [...data].map((el) => Number(el)).sort((a, b) => a - b);
      setSortedValue(a);
    }
  }, [data, isNum]);

  useEffect(() => {
    if (SortedValue && Array.isArray(SortedValue) && SortedValue.length > 0) {
      let pVal = ((SortedValue.length + 1) / 100) * Px;
      setPVal(pVal);
    }
  }, [SortedValue, Px]);

  return (
    SortedValue && (
      <ContentContainer>
        {isNum ? (
          <>
            <div className="form">
              <label htmlFor="PX">Find P</label>
              <input
                type="number"
                name="PX"
                value={Px}
                onChange={(e) =>
                  e.target.value > 0 &&
                  e.target.value < 100 &&
                  setPx(Number(e.target.value))
                }
                placeholder="Range: 1-100"
              />{" "}
              (Range is 1-100)
            </div>
            {PVal && (
              <>
                <h1 className="title">
                  P{Px} of {title && title}:
                </h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        P{Px} = (<Divide a={<>N + 1</>} b={100} /> x {Px})
                        <sup>th</sup> value
                      </var>
                      <var>
                        P{Px} = (
                        <Divide
                          a={<>{SortedValue.length} + 1</>}
                          b={100}
                        /> x {Px})<sup>th</sup> value
                      </var>
                      <var>
                        P{Px} = {PVal}
                      </var>
                    </div>
                    {Number.isInteger(PVal) ? (
                      <div className="math">
                        <var>
                          P{Px} ={" "}
                          {SortedValue[PVal - 1] ? SortedValue[PVal - 1] : 0}
                        </var>
                      </div>
                    ) : PVal < 1 ? (
                      <div className="math">
                        <var>
                          P{Px} = {0} +{" "}
                          {`{${PVal - Math.floor(PVal)} x (${
                            SortedValue[Math.floor(PVal)]
                          } - ${0})}`}
                        </var>
                        <var>
                          P{Px} = {0} + ({PVal - Math.floor(PVal)} x{" "}
                          {SortedValue[Math.floor(PVal)] - 0})
                        </var>
                        <var>
                          P{Px} ={" "}
                          {0 +
                            (PVal - Math.floor(PVal)) *
                              (SortedValue[Math.floor(PVal)] - 0)}
                        </var>
                      </div>
                    ) : (
                      <div className="math">
                        <var>
                          P{Px} = {SortedValue[Math.floor(PVal) - 1]} +{" "}
                          {`{${PVal - Math.floor(PVal)} x (${
                            SortedValue[Math.floor(PVal)]
                          } - ${SortedValue[Math.floor(PVal) - 1]})}`}
                        </var>
                        <var>
                          P{Px} = {SortedValue[Math.floor(PVal) - 1]} + (
                          {PVal - Math.floor(PVal)} x{" "}
                          {SortedValue[Math.floor(PVal)] -
                            SortedValue[Math.floor(PVal) - 1]}
                          )
                        </var>
                        <var>
                          P{Px} ={" "}
                          {SortedValue[Math.floor(PVal) - 1] +
                            (PVal - Math.floor(PVal)) *
                              (SortedValue[Math.floor(PVal)] -
                                SortedValue[Math.floor(PVal) - 1])}
                        </var>
                      </div>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> The{" "}
                    {Px <= 50 ? `worst ${Px}%` : `best ${100 - Px}%`} of data in{" "}
                    {title} is {Px <= 50 ? "less" : "more"} than{" "}
                    {PVal < 1
                      ? (PVal - Math.floor(PVal)) *
                        SortedValue[Math.floor(PVal)]
                      : SortedValue[Math.floor(PVal) - 1] +
                        (PVal - Math.floor(PVal)) *
                          (SortedValue[Math.floor(PVal)] -
                            SortedValue[Math.floor(PVal) - 1])}
                    {Px === 50 ? ", and rest is more than that" : ""}.
                  </p>
                </div>
              </>
            )}
          </>
        ) : (
          <h1 className="comment">
            Can not perform <strong>Quartiles</strong> calculation on "{title}"
            data set, as the data is not numerical or categorical data
          </h1>
        )}
      </ContentContainer>
    )
  );
}

const ContentContainer = styled.div`
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  & > h1 {
    font-size: 1.4rem;
    font-weight: 500;
    padding: 12px 0;
    color: var(--light-green);
    &.title {
      margin: 12px 0;
      padding: 6px 0;
      display: inline;
      width: max-content;
      border-bottom: 1px dashed var(--green);
    }
    & > strong {
      text-decoration: underline;
    }
  }
  & > .am_con {
    display: flex;
    flex-direction: column;
    gap: 24px;
    & > .choose_nType {
      display: flex;
      flex-direction: column;
      gap: 16px;
      & > h2 {
        color: var(--light-green);
        font-size: 1.2rem;
        font-weight: 500;
      }
      & > .option {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
    }
    & > .calculation {
      display: flex;
      flex-direction: column;
      gap: 12px;
      & > .math {
        display: flex;
        gap: 8px;
        flex-direction: column;
        & > var {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }
    }
    & > .note {
      & > ul {
        padding: 12px 32px;
      }
    }
  }
  & > .form {
    display: flex;
    align-items: center;
    & > input {
      border: none;
      outline: none;
      box-shadow: var(--dark-shadow-in);
      background-color: transparent;
      padding: 6px 12px;
      color: var(--light);
    }
  }
`;

export default function Percentile({ data }) {
  return (
    <Container>
      <h1>Percentile calculation:</h1>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => <Content data={el.data} title={el.name} />)
        )}
    </Container>
  );
}
const Container = styled.div``;
