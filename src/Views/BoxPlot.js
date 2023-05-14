import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import {
  findMinMax,
  findMinMaxWithoutExtreme,
  findPercentile,
} from "../Functions/placementMaths";
import { percentOf, percentOfNumInRange } from "../Functions/PercentMaths";

function Content({ title, data }) {
  const [isNum, setIsNum] = useState();
  const [Q1, setQ1] = useState();
  const [Q2, setQ2] = useState();
  const [Q3, setQ3] = useState();
  const [Min, setMin] = useState();
  const [Max, setMax] = useState();
  const [MinE, setMinE] = useState();
  const [ExtremeValues, setExtremeValues] = useState();
  const [MaxE, setMaxE] = useState();
  const [LowerLimit, setLowerLimit] = useState();
  const [UpperLimit, setUpperLimit] = useState();
  const [GraphRange, setGraphRange] = useState();

  useEffect(() => {
    setIsNum(dataIsNumber(data));
  }, [data]);

  useEffect(() => {
    if (isNum) {
      let q1 = findPercentile(data, 25);
      let q3 = findPercentile(data, 75);
      let IQR = q3 - q1;
      let LL = q1 - 1.5 * IQR;
      let UL = q3 + 1.5 * IQR;
      let min = findMinMax(data, "min");
      let max = findMinMax(data, "max");
      setMin(min);
      setMax(max);
      setQ1(q1);
      setQ2(findPercentile(data, 50));
      setQ3(q3);
      setLowerLimit(LL);
      setUpperLimit(UL);
      if (LL > min) {
        setMinE(findMinMaxWithoutExtreme(data, "min").value);
      } else {
        setMinE();
      }
      if (UL < max) {
        setMaxE(findMinMaxWithoutExtreme(data, "max").value);
      } else {
        setMaxE();
      }
    } else {
      setUpperLimit();
      setLowerLimit();
      setQ1();
      setQ2();
      setQ3();
      setMax();
      setMin();
    }
  }, [data, isNum]);
  useEffect(() => {
    if (MinE || MaxE) {
      setExtremeValues([
        ...(findMinMaxWithoutExtreme(data, "min").array &&
          findMinMaxWithoutExtreme(data, "min").array),
        ...(findMinMaxWithoutExtreme(data, "max").array &&
          findMinMaxWithoutExtreme(data, "max").array),
      ]);
    } else setExtremeValues();
    if (Min && Max) {
      let obj = {
        min: Math.floor(Min / 10) * 10,
        max: Math.ceil(Max / 10) * 10,
      };
      setGraphRange(obj);
    } else setGraphRange();
  }, [data, MinE, MaxE, Min, Max]);

  console.log(MinE, MaxE, ExtremeValues, GraphRange);

  return isNum &&
    Q1 &&
    Q2 &&
    Q3 &&
    Min &&
    Max &&
    UpperLimit &&
    LowerLimit &&
    GraphRange ? (
    <ContentContainer>
      <div className="am_con">
        <div className="calculation">
          <div className="math">
            <h3>Here,</h3>
            <var>Min = {Min}</var>
            <var>Max = {Max}</var>
            <var>Q1 = {Q1}</var>
            <var>Q2 = {Q2}</var>
            <var>Q3 = {Q3}</var>
            <var>
              IQR = Q3 - Q1 = {Q3} - {Q1} = {Q3 - Q1}
            </var>
            <var>Lower Limit = Q1 - 1.5xIQR = {LowerLimit}</var>
            <var>Upper Limit = Q3 + 1.5xIQR = {UpperLimit}</var>
            {MinE && <var>Min excluding extreme value = {MinE}</var>}
            {MaxE && <var>Max excluding extreme value = {MaxE}</var>}
          </div>
        </div>
        {/* <p>
          <u>Comment:</u> The shape of the data "{title}" is
        </p> */}
        <BoxPlotContainer>
          <div className="container-plot">
            {ExtremeValues &&
              Array.isArray(ExtremeValues) &&
              ExtremeValues.length > 0 &&
              React.Children.toArray(
                ExtremeValues.map((el) => (
                  <span
                    className="extreme"
                    style={{
                      left: `${percentOfNumInRange(GraphRange, el)}%`,
                    }}
                  >
                    *
                  </span>
                ))
              )}
            <span
              className="tail"
              style={{
                left: `${percentOfNumInRange(GraphRange, !MinE ? Min : MinE)}%`,
                width: `${
                  percentOfNumInRange(GraphRange, Q1) -
                  percentOfNumInRange(GraphRange, !MinE ? Min : MinE)
                }%`,
              }}
            />
            <span
              className="tail"
              style={{
                left: `${percentOfNumInRange(GraphRange, Q3)}%`,
                width: `${
                  percentOfNumInRange(GraphRange, !MaxE ? Max : MaxE) -
                  percentOfNumInRange(GraphRange, Q3)
                }%`,
              }}
            />
            <span
              className="box"
              style={{
                left: `${percentOfNumInRange(GraphRange, Q1)}%`,
                width: `${
                  percentOfNumInRange(GraphRange, Q2) -
                  percentOfNumInRange(GraphRange, Q1)
                }%`,
              }}
            />
            <span
              className="box"
              style={{
                left: `${percentOfNumInRange(GraphRange, Q2)}%`,
                width: `${
                  percentOfNumInRange(GraphRange, Q3) -
                  percentOfNumInRange(GraphRange, Q2)
                }%`,
              }}
            />
          </div>
          <div className="container-label">
            <div className="label">
              <span>{GraphRange.min}</span>
            </div>
            <div className="label">
              <span>
                {Math.ceil(percentOf(GraphRange, (1 / 6) * 100) / 10) * 10}
              </span>
            </div>
            <div className="label">
              <span>
                {Math.ceil(percentOf(GraphRange, (2 / 6) * 100) / 10) * 10}
              </span>
            </div>
            <div className="label">
              <span>
                {Math.ceil(percentOf(GraphRange, (3 / 6) * 100) / 10) * 10}
              </span>
            </div>
            <div className="label">
              <span>
                {Math.ceil(percentOf(GraphRange, (4 / 6) * 100) / 10) * 10}
              </span>
            </div>
            <div className="label">
              <span>
                {Math.ceil(percentOf(GraphRange, (5 / 6) * 100) / 10) * 10}
              </span>
              <span>{GraphRange.max}</span>
            </div>
            {/* <div className="label">
            </div> */}
          </div>
        </BoxPlotContainer>
      </div>
      <h1>
        <u>Figure:</u> Box Plot of {title}.
      </h1>
    </ContentContainer>
  ) : (
    <h1 className="comment">
      Can not perform calculation due to some error. Please check the console
      for more information, and report it{" "}
      <a
        href="https://github.com/Akhlak-Hossain-Jim/stat102/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
      .
    </h1>
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
    width: 100%;
    overflow-x: auto;
    & > .form {
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
        & > input,
        & > span > input {
          background-color: transparent;
          border: none;
          outline: none;
          color: var(--light);
          box-shadow: var(--dark-shadow-in);
          padding: 6px 12px;
          border-radius: 12px;
        }
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

const BoxPlotContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 40px;
  display: grid;
  gap: 24px;
  /* flex-direction: column; */
  & > .container {
    &-plot {
      width: 100%;
      height: 80px;
      position: relative;
      padding-bottom: 10px;
      & > .extreme,
      & > .tail {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      & > .tail {
        border-top: 1px dashed var(--light-green);
      }
      & > .box {
        position: absolute;
        height: 80%;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid var(--light-green);
      }
    }
    &-label {
      display: flex;
      flex-direction: row;
      position: relative;
      & > .label {
        flex: 1;
        position: relative;
        height: 38px;
        width: (120px, 100%);
        min-width: 120px;
        border-top: 1px solid var(--light);
        &:last-child {
          /* text-align: end;
          flex: 0; */
        }
        & > span {
          position: absolute;
          bottom: 0;
          &:nth-child(1) {
            left: 0%;
            transform: translateX(-50%);
          }
          &:nth-child(2) {
            right: 0%;
            transform: translateX(50%);
          }
          &::after {
            content: "";
            position: absolute;
            left: 50%;
            height: 20px;
            width: 1px;
            transform: translateX(-50%);
            background: var(--light);
            bottom: 100%;
          }
        }
      }
    }
  }
`;

export default function BoxPlot({ data }) {
  return (
    <Container>
      <h1>Box Plot:</h1>
      {/* <p>
        <u>Benefits:</u>
        <ol>
          <li>Median can be found easily.</li>
          <li>Individuality present.</li>
          <li>Skewness can be visualize easily.</li>
        </ol>
      </p> */}
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => <Content data={el.data} title={el.name} />)
        )}
    </Container>
  );
}

const Container = styled.div`
  & > p {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    gap: 12px;
    & > ol {
      padding-left: 24px;
    }
    & > .note {
      font-size: 1.25rem;
      font-style: italic;
      color: var(--light-green);
    }
  }
`;
