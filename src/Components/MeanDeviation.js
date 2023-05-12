import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import { MeanDeviationCalc } from "../Functions/dispersionMath";
import { BsCircle, BsRecordCircle } from "react-icons/bs";
import Divide from "./Divide";

function Content({ title, data }) {
  const [isNum, setIsNum] = useState();
  const [MeanDevObj, setMeanDevObj] = useState();

  const [NType, setNType] = useState("sample");

  const NTypes = [
    {
      label: "Population",
      value: "population",
      details: "The given data has information for all people/item there is.",
    },
    {
      label: "Sample",
      value: "sample",
      details:
        "The given data has information of some of all people/item there is.",
    },
  ];

  useEffect(() => {
    setIsNum(dataIsNumber(data));
  }, [data]);

  useEffect(() => {
    if (isNum) {
      setMeanDevObj(MeanDeviationCalc(data));
    }
  }, [data, isNum]);

  console.log(MeanDevObj);

  return (
    <ContentContainer>
      {isNum && MeanDevObj ? (
        <>
          <h1 className="title">Mean Deviation of {title && title}:</h1>
          <div className="am_con">
            <div className="choose_nType">
              <h2>Choose variable type:</h2>
              {React.Children.toArray(
                NTypes.map((nt) => (
                  <div
                    className="option"
                    title={nt.details}
                    onClick={() => setNType(nt.value)}
                    role="button"
                  >
                    {nt.value === NType ? <BsRecordCircle /> : <BsCircle />}
                    {nt.label}
                  </div>
                ))
              )}
            </div>
            <div className="calculation">
              {NType === "sample" ? (
                <div className="math">
                  <var>
                    Mean Deviation ={" "}
                    <Divide a={<>&sum; | x - x_bar |</>} b={"n"} />
                  </var>
                  <var>
                    Mean Deviation ={" "}
                    <Divide
                      a={React.Children.toArray(
                        data.map((vx, i) => (
                          <>
                            | {vx} - {MeanDevObj.avg.toFixed(2)} |{" "}
                            {i !== data.length - 1 && " + "}
                          </>
                        ))
                      )}
                      b={data.length}
                    />
                  </var>
                  <var>
                    Mean Deviation ={" "}
                    <Divide
                      a={React.Children.toArray(
                        MeanDevObj.arr2.map((val, i) => (
                          <>
                            {val.toFixed(2)}
                            {i !== MeanDevObj.arr2.length - 1 && " + "}
                          </>
                        ))
                      )}
                      b={data.length}
                    />
                  </var>
                  <var>
                    Mean Deviation ={" "}
                    <Divide
                      a={MeanDevObj.sumOfDiff.toFixed(2)}
                      b={data.length}
                    />
                  </var>
                  <var>Mean Deviation = {MeanDevObj.res.toFixed(2)}</var>
                </div>
              ) : NType === "population" ? (
                <div className="math">
                  <var>
                    Mean Deviation ={" "}
                    <Divide a={<>&sum; | x - &micro; |</>} b={"N"} />
                  </var>
                  <var>
                    Mean Deviation ={" "}
                    <Divide
                      a={React.Children.toArray(
                        data.map((vx, i) => (
                          <>
                            | {vx} - {MeanDevObj.avg.toFixed(2)} |{" "}
                            {i !== data.length - 1 && " + "}
                          </>
                        ))
                      )}
                      b={data.length}
                    />
                  </var>
                  <var>
                    Mean Deviation ={" "}
                    <Divide
                      a={React.Children.toArray(
                        MeanDevObj.arr2.map((val, i) => (
                          <>
                            {val.toFixed(2)}
                            {i !== MeanDevObj.arr2.length - 1 && " + "}
                          </>
                        ))
                      )}
                      b={data.length}
                    />
                  </var>
                  <var>
                    Mean Deviation ={" "}
                    <Divide
                      a={MeanDevObj.sumOfDiff.toFixed(2)}
                      b={data.length}
                    />
                  </var>
                  <var>Mean Deviation = {MeanDevObj.res.toFixed(2)}</var>
                </div>
              ) : (
                ""
              )}
            </div>
            <p>
              <u>Comment:</u> The average absolute distance from mean of {title}{" "}
              data set is {MeanDevObj.res.toFixed(2)}.
            </p>
          </div>
        </>
      ) : (
        <h1 className="comment">
          Can not perform <strong>Mean Deviation</strong> calculation on "
          {title}" data set, as the data is not numerical or categorical data
        </h1>
      )}
    </ContentContainer>
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
          white-space: nowrap;
          & > * {
            white-space: break-spaces;
          }
        }
      }
    }
    & > .note {
      & > ul {
        padding: 12px 32px;
      }
    }
  }
`;
export default function MeanDeviation({ data }) {
  return (
    <Container>
      <h1>
        Mean Deviation{data && data.length > 1 ? "s" : ""} (Absolute
        Dispersion):
      </h1>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => <Content data={el.data} title={el.name} />)
        )}
    </Container>
  );
}

const Container = styled.main``;
