import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { percentOf, percentOfNumInRange } from "../../Functions/PercentMaths";
import { dataIsNumber } from "../../Functions/processData";
import { findMinMax } from "../../Functions/placementMaths";

export default function ScatterPlot({ Values, x, y }) {
  const [GraphRange, setGraphRange] = useState();
  const [IsNum, setIsNum] = useState();
  const [XSet, setXSet] = useState();
  const [YSet, setYSet] = useState();

  useEffect(() => {
    setIsNum(x.length === y.length && dataIsNumber(x) && dataIsNumber(y));
  }, [x, y]);

  useEffect(() => {
    if (IsNum) {
      let obj = {
        x: { min: findMinMax(x, "min"), max: findMinMax(x, "max") },
        y: { min: findMinMax(y, "min"), max: findMinMax(y, "max") },
      };
      setGraphRange(obj);
      let xs = [...x].map((el) => Number(el));
      let ys = [...y].map((el) => Number(el));
      setXSet([...new Set(xs.sort((a, b) => a - b))]);
      setYSet([...new Set(ys.sort((a, b) => a - b))]);
      //   setValues([...xs, ...ys]);
    }
  }, [x, y, IsNum]);

  return (
    IsNum &&
    x &&
    y &&
    XSet &&
    YSet &&
    GraphRange && (
      <Container>
        <div className="container-plot">
          {Values &&
            Array.isArray(Values) &&
            Values.length > 0 &&
            React.Children.toArray(
              Values.map((el) => (
                <span
                  className="extreme"
                  style={{
                    left: `${percentOfNumInRange(GraphRange.x, el.x)}%`,
                    bottom: `${percentOfNumInRange(GraphRange.y, el.y)}%`,
                  }}
                >
                  *
                </span>
              ))
            )}
        </div>
        <div className="container-label">
          <div className="label">
            <span>{Math.floor(GraphRange.x.min / 5) * 5}</span>
          </div>
          <div className="label">
            <span>{Math.floor(percentOf(GraphRange.x, 1 / 5))}</span>
          </div>
          <div className="label">
            <span>{Math.floor(percentOf(GraphRange.x, 2 / 5))}</span>
          </div>
          <div className="label">
            <span>{Math.floor(percentOf(GraphRange.x, 3 / 5))}</span>
          </div>
          <div className="label">
            <span>{Math.floor(percentOf(GraphRange.x, 4 / 5))}</span>
            <span>{Math.ceil(GraphRange.x.max / 5) * 5}</span>
          </div>
        </div>
      </Container>
    )
  );
}
const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 40px 20px;
  display: grid;
  gap: 24px;
  /* flex-direction: column; */
  & > .container {
    &-plot {
      width: 100%;
      height: 200px;
      position: relative;
      padding-bottom: 10px;
      & > .extreme,
      & > .tail {
        position: absolute;
        /* transform: translateY(-50%); */
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
