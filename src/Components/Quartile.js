import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import Divide from "./Divide";

function Content({ title, data }) {
  const [isNum, setIsNum] = useState();
  const [SortedValue, setSortedValue] = useState();
  const [Q1, setQ1] = useState();
  const [Q2, setQ2] = useState();
  const [Q3, setQ3] = useState();

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
      let q1 = ((SortedValue.length + 1) / 100) * 25;
      let q2 = ((SortedValue.length + 1) / 100) * 50;
      let q3 = ((SortedValue.length + 1) / 100) * 75;
      setQ1(q1);
      setQ2(q2);
      setQ3(q3);
    }
  }, [SortedValue]);

  // console.log(
  //   SortedValue,
  //   data.map((el) => Number(el))
  // );

  return (
    SortedValue && (
      <ContentContainer>
        {isNum ? (
          <>
            <QuartileGraph>
              <div className="identify">
                <span>min</span>
                <span>
                  Q1 <br />(
                  {SortedValue[Math.floor(Q1) - 1] +
                    (Q1 - Math.floor(Q1)) *
                      (SortedValue[Math.floor(Q1)] -
                        SortedValue[Math.floor(Q1) - 1])}
                  )
                </span>
                <span className="center">
                  Q2 <br />(
                  {SortedValue[Math.floor(Q2) - 1] +
                    (Q2 - Math.floor(Q2)) *
                      (SortedValue[Math.floor(Q2)] -
                        SortedValue[Math.floor(Q2) - 1])}
                  )
                </span>
                <span>
                  Q3 <br />(
                  {SortedValue[Math.floor(Q3) - 1] +
                    (Q3 - Math.floor(Q3)) *
                      (SortedValue[Math.floor(Q3)] -
                        SortedValue[Math.floor(Q3) - 1])}
                  )
                </span>
                <span>max</span>
              </div>
              <div className="graphical">
                <div className="graph">
                  <div className="divider">25%</div>
                  <div className="divider">25%</div>
                  <div className="divider">25%</div>
                  <div className="divider">25%</div>
                </div>
              </div>
            </QuartileGraph>
            {Q1 && (
              <>
                <h1 className="title">Q1 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        Q1 = (<Divide a={<>N + 1</>} b={100} /> x 25)
                        <sup>th</sup> value
                      </var>
                      <var>
                        Q1 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        25)<sup>th</sup> value
                      </var>
                      <var>Q1 = {Q1}</var>
                    </div>
                    {Number.isInteger(Q1) ? (
                      <div className="math">
                        <var>Q1 = {SortedValue[Q1 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            Q1 = {SortedValue[Math.floor(Q1) - 1]} +{" "}
                            {`{${Q1 - Math.floor(Q1)} x (${
                              SortedValue[Math.floor(Q1)]
                            } - ${SortedValue[Math.floor(Q1) - 1]})}`}
                          </var>
                          <var>
                            Q1 = {SortedValue[Math.floor(Q1) - 1]} + (
                            {Q1 - Math.floor(Q1)} x{" "}
                            {SortedValue[Math.floor(Q1)] -
                              SortedValue[Math.floor(Q1) - 1]}
                            )
                          </var>
                          <var>
                            Q1 ={" "}
                            {SortedValue[Math.floor(Q1) - 1] +
                              (Q1 - Math.floor(Q1)) *
                                (SortedValue[Math.floor(Q1)] -
                                  SortedValue[Math.floor(Q1) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> There is 25% of data in {title} is less than{" "}
                    {SortedValue[Math.floor(Q1) - 1] +
                      (Q1 - Math.floor(Q1)) *
                        (SortedValue[Math.floor(Q1)] -
                          SortedValue[Math.floor(Q1) - 1])}
                    .
                  </p>
                </div>
              </>
            )}
            {Q2 && (
              <>
                <h1 className="title">Q2 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        Q2 = (<Divide a={<>N + 1</>} b={100} /> x 50)
                        <sup>th</sup> value
                      </var>
                      <var>
                        Q2 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        50)<sup>th</sup> value
                      </var>
                      <var>Q2 = {Q2}</var>
                    </div>
                    {Number.isInteger(Q2) ? (
                      <div className="math">
                        <var>Q2 = {SortedValue[Q2 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            Q2 = {SortedValue[Math.floor(Q2) - 1]} +{" "}
                            {`{${Q2 - Math.floor(Q2)} x (${
                              SortedValue[Math.floor(Q2)]
                            } - ${SortedValue[Math.floor(Q2) - 1]})}`}
                          </var>
                          <var>
                            Q2 = {SortedValue[Math.floor(Q2) - 1]} + (
                            {Q2 - Math.floor(Q2)} x{" "}
                            {SortedValue[Math.floor(Q2)] -
                              SortedValue[Math.floor(Q2) - 1]}
                            )
                          </var>
                          <var>
                            Q2 ={" "}
                            {SortedValue[Math.floor(Q2) - 1] +
                              (Q2 - Math.floor(Q2)) *
                                (SortedValue[Math.floor(Q2)] -
                                  SortedValue[Math.floor(Q2) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> There is 50% of data in {title} is less than{" "}
                    {SortedValue[Math.floor(Q2) - 1] +
                      (Q2 - Math.floor(Q2)) *
                        (SortedValue[Math.floor(Q2)] -
                          SortedValue[Math.floor(Q2) - 1])}
                    , and rest is greater than that.
                  </p>
                </div>
              </>
            )}
            {Q3 && (
              <>
                <h1 className="title">Q3 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        Q3 = (<Divide a={<>N + 1</>} b={100} /> x 75)
                        <sup>th</sup> value
                      </var>
                      <var>
                        Q3 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        75)<sup>th</sup> value
                      </var>
                      <var>Q3 = {Q3}</var>
                    </div>
                    {Number.isInteger(Q3) ? (
                      <div className="math">
                        <var>Q3 = {SortedValue[Q3 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            Q3 = {SortedValue[Math.floor(Q3) - 1]} +{" "}
                            {`{${Q3 - Math.floor(Q3)} x (${
                              SortedValue[Math.floor(Q3)]
                            } - ${SortedValue[Math.floor(Q3) - 1]})}`}
                          </var>
                          <var>
                            Q3 = {SortedValue[Math.floor(Q3) - 1]} + (
                            {Q3 - Math.floor(Q3)} x{" "}
                            {SortedValue[Math.floor(Q3)] -
                              SortedValue[Math.floor(Q3) - 1]}
                            )
                          </var>
                          <var>
                            Q3 ={" "}
                            {SortedValue[Math.floor(Q3) - 1] +
                              (Q3 - Math.floor(Q3)) *
                                (SortedValue[Math.floor(Q3)] -
                                  SortedValue[Math.floor(Q3) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> There is 25% of data in {title} is less than{" "}
                    {SortedValue[Math.floor(Q3) - 1] +
                      (Q3 - Math.floor(Q3)) *
                        (SortedValue[Math.floor(Q3)] -
                          SortedValue[Math.floor(Q3) - 1])}
                    .
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
`;

const QuartileGraph = styled.div`
  & > .identify {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    & > span {
      text-align: center;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
      &.center {
        grid-column: 3 / span 2;
      }
    }
  }
  & > .graphical {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    & > .graph {
      width: 100%;
      position: relative;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      padding: 24px 0;
      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 2px;
        height: 100%;
        background-color: var(--light-green);
        top: 0;
      }
      &::after {
        right: 0;
      }
      & > .divider {
        position: relative;
        height: 2px;
        width: 100%;
        background-color: var(--light-green);
        text-align: center;
        &::after {
          content: "";
          position: absolute;
          width: 2px;
          height: 20px;
          background-color: var(--light-green);
          bottom: 0;
          left: 0;
        }
      }
    }
  }
`;

export default function Quartile({ data }) {
  return (
    <Container>
      <h1>Quartiles {data && data.length > 1 ? "s" : ""}:</h1>
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
