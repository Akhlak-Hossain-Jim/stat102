import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../../Functions/processData";
import { CoEffRangeCalc } from "../../Functions/dispersionMath";
import Divide from "../Divide";
import { CoEffCommentGen } from "../../Functions/CommentGen";

function Content({ data }) {
  const [isNum, setIsNum] = useState();
  const [RangeArray, setRangeArray] = useState();
  const [Comment, setComment] = useState();
  const [Comment2, setComment2] = useState();

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
      let array = CoEffRangeCalc(data);
      let comment = [...array].map((el) => el.name);
      setComment(CoEffCommentGen(comment, "is more dispersed/scattered than"));
      setComment2(
        CoEffCommentGen(comment, "is more consistent than", "reverse")
      );
      setRangeArray(array);
    }
  }, [data, isNum]);

  console.log(RangeArray);

  return (
    <ContentContainer>
      {isNum && RangeArray ? (
        <>
          <h1 className="title">
            Co-efficient of Range of {[...data].map((el) => el.name).join(", ")}
            :
          </h1>
          {React.Children.toArray(
            RangeArray.map((item) => (
              <>
                <div className="am_con">
                  <br />
                  <div className="calculation">
                    <div className="math">
                      <var>
                        <u>Sorted data:</u>
                      </var>
                      <var>{item.arr.join(", ")}</var>
                      <br />
                      <var>
                        <span>
                          X<sub>min {item.name}</sub>
                        </span>{" "}
                        = {item.min}
                      </var>
                      <var>
                        <span>
                          X<sub>max {item.name}</sub>
                        </span>{" "}
                        = {item.max}
                      </var>
                      <var>
                        <span>
                          Co-efficient of Range<sub>{item.name}</sub>
                        </span>{" "}
                        ={" "}
                        <Divide
                          a={
                            <>
                              X<sub>max {item.name}</sub> - X
                              <sub>min {item.name}</sub>
                            </>
                          }
                          b={
                            <>
                              X<sub>max {item.name}</sub> + X
                              <sub>min {item.name}</sub>
                            </>
                          }
                        />{" "}
                        x 100%
                      </var>
                      <var>
                        <span>
                          Co-efficient of Range<sub>{item.name}</sub>
                        </span>{" "}
                        ={" "}
                        <Divide
                          a={
                            <>
                              {item.max} - {item.min}
                            </>
                          }
                          b={
                            <>
                              {item.max} + {item.min}
                            </>
                          }
                        />{" "}
                        x 100%
                      </var>
                      <var>
                        <span>
                          Co-efficient of Range<sub>{item.name}</sub>
                        </span>{" "}
                        = <Divide a={item.sub} b={item.sum} /> x 100%
                      </var>
                      <var>
                        <span>
                          Co-efficient of Range<sub>{item.name}</sub>
                        </span>{" "}
                        = {item.cd}%
                      </var>
                    </div>
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
                  RangeArray.map((item) => (
                    <var>
                      <span>
                        CV<sub>{item.name}</sub>
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
      border-bottom: 1px dashed var(--green-2);
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

export default function CoEffRange({ data }) {
  return (
    <Container>
      <h1>Co-efficient of Range:</h1>
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
