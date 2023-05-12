import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import { QuartileDeviationCalc } from "../Functions/dispersionMath";
import Divide from "./Divide";

function Content({ title, data }) {
  const [isNum, setIsNum] = useState();
  const [QuartileDevObj, setQuartileDevObj] = useState();

  useEffect(() => {
    setIsNum(dataIsNumber(data));
  }, [data]);

  useEffect(() => {
    if (isNum) {
      setQuartileDevObj(QuartileDeviationCalc(data));
    }
  }, [data, isNum]);

  console.log(QuartileDevObj);

  return (
    <ContentContainer>
      {isNum && QuartileDevObj ? (
        <>
          <h1 className="title">Quartile Deviation of {title && title}:</h1>
          <div className="am_con">
            <div className="calculation">
              <div className="math">
                <var>
                  Inter Quartile Range, IQR ={" "}
                  <span>
                    Q<sub>3</sub> - Q<sub>1</sub>
                  </span>
                </var>
                <var>
                  IQR = <Divide a={<>(N + 1) * 75</>} b={100} />
                  <span>
                    <sup>th</sup>value
                  </span>{" "}
                  - <Divide a={<>(N + 1) * 25</>} b={100} />
                  <span>
                    <sup>th</sup>value
                  </span>
                </var>
                <var>
                  IQR = <Divide a={<>({data.length} + 1) * 75</>} b={100} />
                  <span>
                    <sup>th</sup>value
                  </span>{" "}
                  - <Divide a={<>({data.length} + 1) * 25</>} b={100} />
                  <span>
                    <sup>th</sup>value
                  </span>
                </var>
                <var>
                  IQR = <Divide a={<>{data.length + 1} * 75</>} b={100} />
                  <span>
                    <sup>th</sup>value
                  </span>{" "}
                  - <Divide a={<>{data.length + 1} * 25</>} b={100} />
                  <span>
                    <sup>th</sup>value
                  </span>
                </var>
                <var>
                  IQR = <Divide a={<>{(data.length + 1) * 75}</>} b={100} />
                  <span>
                    <sup>th</sup>value
                  </span>{" "}
                  - <Divide a={<>{(data.length + 1) * 25}</>} b={100} />
                  <span>
                    <sup>th</sup>value
                  </span>
                </var>
                <var>
                  IQR = {((data.length + 1) * 75) / 100}
                  <span>
                    <sup>th</sup>value
                  </span>{" "}
                  - {((data.length + 1) * 25) / 100}
                  <span>
                    <sup>th</sup>value
                  </span>
                </var>
                <var>
                  IQR = {QuartileDevObj.q3.toFixed(4)} -{" "}
                  {QuartileDevObj.q1.toFixed(4)}
                </var>
                <var>IQR = {QuartileDevObj.iqr.toFixed(4)}</var>
                <var>
                  Quartile Deviation =
                  <Divide a={`IQR`} b={"2"} />
                </var>
                <var>
                  Quartile Deviation =
                  <Divide a={QuartileDevObj.iqr.toFixed(4)} b={"2"} />
                </var>
                <var>Quartile Deviation = {QuartileDevObj.res.toFixed(4)}</var>
              </div>
            </div>
            <p>
              <u>Comment:</u> The average inter quartile distance from mean of{" "}
              {title} data set is {QuartileDevObj.res.toFixed(4)}.
            </p>
          </div>
        </>
      ) : (
        <h1 className="comment">
          Can not perform <strong>Quartile Deviation</strong> calculation on "
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

export default function QuartileDeviation({ data }) {
  return (
    <Container>
      <h1>
        Quartile Deviation{data && data.length > 1 ? "s" : ""} (Absolute
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
