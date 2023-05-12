import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../../Functions/processData";
import { CoEffMeanDeviationCalc } from "../../Functions/dispersionMath";
import { BsCircle, BsRecordCircle } from "react-icons/bs";
import Divide from "../Divide";
import { CoEffCommentGen } from "../../Functions/CommentGen";

function Content({ data }) {
  const [isNum, setIsNum] = useState();
  const [CoMeanDevArr, setCoMeanDevArr] = useState();
  const [Comment, setComment] = useState();
  const [Comment2, setComment2] = useState();

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
    let is_num = false;
    for (let el of data) {
      if (dataIsNumber(el.data)) {
        is_num = true;
      } else {
        is_num = false;
        break;
      }
    }
    setIsNum(is_num);
  }, [data]);

  useEffect(() => {
    if (isNum) {
      let array = CoEffMeanDeviationCalc(data, NType);
      let comment = [...array].map((el) => el.name);
      setComment(CoEffCommentGen(comment, "is more dispersed/scattered than"));
      setComment2(
        CoEffCommentGen(comment, "is more consistent than", "reverse")
      );
      setCoMeanDevArr(array);
    }
  }, [data, isNum, NType]);

  console.log(CoMeanDevArr);

  return (
    <ContentContainer>
      {isNum && CoMeanDevArr ? (
        <>
          <h1 className="title">
            Co-efficient of Mean Deviation of{" "}
            {[...data].map((el) => el.name).join(", ")}:
          </h1>
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
          </div>
          {React.Children.toArray(
            CoMeanDevArr.map((item) => (
              <>
                <div className="am_con">
                  <br />
                  <div className="calculation">
                    {NType === "sample" ? (
                      <div className="math">
                        <var>
                          <span>
                            x_bar<sub>{item.name}</sub>
                          </span>{" "}
                          = <Divide a={<>&sum; x</>} b={"n"} />
                        </var>
                        <var>
                          <span>
                            x_bar<sub>{item.name}</sub>
                          </span>{" "}
                          ={" "}
                          <Divide
                            a={React.Children.toArray(
                              item.arr.map((vx, i) => (
                                <>
                                  {vx}
                                  {i !== item.arr.length - 1 && " + "}
                                </>
                              ))
                            )}
                            b={`${item.arr.length}`}
                          />
                        </var>
                        <var>
                          <span>
                            x_bar<sub>{item.name}</sub>
                          </span>{" "}
                          = {item.avg.toFixed(4)}
                        </var>
                        <var>
                          <span>
                            Mean Deviation<sub>{item.name}</sub>
                          </span>{" "}
                          = <Divide a={<>&sum; | x - x_bar |</>} b={"n"} />
                        </var>
                        <var>
                          <span>
                            Mean Deviation<sub>{item.name}</sub>
                          </span>{" "}
                          ={" "}
                          <Divide
                            a={React.Children.toArray(
                              item.arr.map((vx, i) => (
                                <>
                                  | {vx} - {item.avg.toFixed(2)} |
                                  {i !== item.arr.length - 1 && " + "}
                                </>
                              ))
                            )}
                            b={`${item.arr.length}`}
                          />
                        </var>
                        <var>
                          <span>
                            Mean Deviation<sub>{item.name}</sub>
                          </span>{" "}
                          = {item.meanD}
                        </var>

                        <var>
                          <span>
                            CD<sub>{item.name}</sub>
                          </span>{" "}
                          ={" "}
                          <Divide
                            a={
                              <>
                                Mean Deviation<sub>{item.name}</sub>
                              </>
                            }
                            b={
                              <>
                                x_bar<sub>{item.name}</sub>
                              </>
                            }
                          />{" "}
                          x 100%
                        </var>
                        <var>
                          <span>
                            CD<sub>{item.name}</sub>
                          </span>{" "}
                          ={" "}
                          <Divide
                            a={item.meanD.toFixed(4)}
                            b={item.avg.toFixed(4)}
                          />{" "}
                          x 100%
                        </var>
                        <var>
                          <span>
                            CD<sub>{item.name}</sub>
                          </span>{" "}
                          = {item.cd}%
                        </var>
                      </div>
                    ) : NType === "population" ? (
                      <div className="math">
                        <var>
                          <span>
                            &micro;<sub>{item.name}</sub>
                          </span>{" "}
                          = <Divide a={<>&sum;x</>} b={"N"} />
                        </var>
                        <var>
                          <span>
                            &micro;<sub>{item.name}</sub>
                          </span>{" "}
                          ={" "}
                          <Divide
                            a={React.Children.toArray(
                              item.arr.map((vx, i) => (
                                <>
                                  {vx}
                                  {i !== item.arr.length - 1 && " + "}
                                </>
                              ))
                            )}
                            b={`${item.arr.length}`}
                          />
                        </var>
                        <var>
                          <span>
                            &micro;<sub>{item.name}</sub>
                          </span>{" "}
                          = {item.avg.toFixed(4)}
                        </var>
                        <var>
                          {" "}
                          <span>
                            Mean Deviation<sub>{item.name}</sub>
                          </span>{" "}
                          = <Divide a={<>&sum; | x - &micro; |</>} b={"N"} />
                        </var>
                        <var>
                          <span>
                            Mean Deviation<sub>{item.name}</sub>
                          </span>{" "}
                          ={" "}
                          <Divide
                            a={React.Children.toArray(
                              item.arr.map((vx, i) => (
                                <>
                                  | {vx} - {item.avg.toFixed(2)} |{" "}
                                  {i !== item.arr.length - 1 && " + "}
                                </>
                              ))
                            )}
                            b={`${item.arr.length} - 1`}
                          />
                        </var>
                        <var>
                          <span>
                            Mean Deviation<sub>{item.name}</sub>
                          </span>{" "}
                          ={" "}
                          <Divide
                            a={React.Children.toArray(
                              item.arr2.map((vx, i) => (
                                <>
                                  {vx.toFixed(2)}{" "}
                                  {i !== item.arr2.length - 1 && " + "}
                                </>
                              ))
                            )}
                            b={`${item.arr2.length} - 1`}
                          />
                        </var>
                        <var>
                          <span>
                            Mean Deviation<sub>{item.name}</sub>
                          </span>{" "}
                          = {item.meanD}
                        </var>

                        <var>
                          <span>
                            CD<sub>{item.name}</sub>
                          </span>{" "}
                          ={" "}
                          <Divide
                            a={
                              <>
                                Mean Deviation<sub>{item.name}</sub>
                              </>
                            }
                            b={
                              <>
                                &micro;<sub>{item.name}</sub>
                              </>
                            }
                          />{" "}
                          x 100%
                        </var>
                        <var>
                          <span>
                            CD<sub>{item.name}</sub>
                          </span>{" "}
                          ={" "}
                          <Divide
                            a={item.meanD.toFixed(4)}
                            b={item.avg.toFixed(4)}
                          />{" "}
                          x 100%
                        </var>
                        <var>
                          <span>
                            CD<sub>{item.name}</sub>
                          </span>{" "}
                          = {item.cd}%
                        </var>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            ))
          )}
          <div className="am_con">
            <br />
            <div className="calculation">
              <h3>So,</h3>
              <div className="math">
                {React.Children.toArray(
                  CoMeanDevArr.map((item) => (
                    <var>
                      <span>
                        CD<sub>{item.name}</sub>
                      </span>{" "}
                      = {item.cd}%
                    </var>
                  ))
                )}
              </div>
            </div>
            <p>
              <u>Comment:</u> On an average, {Comment && Comment}.
              <br />
              Or,
              <br />
              <u>Comment:</u> On an average, {Comment2 && Comment2}.
            </p>
          </div>
        </>
      ) : (
        <h1 className="comment">
          Can not perform calculation due to some error. Please check the
          console for more information, and report it{" "}
          <a
            href="https://github.com/Akhlak-Hossain-Jim/stat102/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
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

export default function CoEffMeanDeviation({ data }) {
  return (
    <Container>
      <h1>Co-efficient of Deviation:</h1>
      {data &&
        Array.isArray(data) &&
        (data.length < 2 ? (
          <>
            <br />
            <h2>Need at least 2 numerical data set to compare</h2>
          </>
        ) : (
          <Content data={data} />
        ))}
    </Container>
  );
}

const Container = styled.main``;
