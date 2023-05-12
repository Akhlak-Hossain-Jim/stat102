import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import { findMedian } from "../Functions/skewAndOtherMath";
import { StdDeviationCalc } from "../Functions/dispersionMath";
import Divide from "../Components/Divide";

function Content({ title, data }) {
  const [SD, setSD] = useState();
  const [Mean, setMean] = useState();
  const [Median, setMedian] = useState();
  const [isNum, setIsNum] = useState();
  const [Skw, setSkw] = useState();
  const [Shape, setShape] = useState();

  useEffect(() => {
    setIsNum(dataIsNumber(data));
  }, [data]);

  useEffect(() => {
    if (isNum) {
      let arr = StdDeviationCalc(data, "sample");
      let mean = arr.avg;
      let sd = arr.res;
      let median = findMedian(data);
      setSD(sd);
      setMean(mean);
      setMedian(median);
      setSkw((3 * (mean - median)) / sd);
    }
  }, [data, isNum]);

  useEffect(() => {
    if (Skw) {
      if (Skw <= -0.5) {
        setShape("Left Skewed/Negatively Skewed");
      } else if (Skw > -0.5 && Skw < 0.5) {
        setShape("Symmetric");
      } else if (Skw >= 0.5) {
        setShape("Right Skewed/Positively Skewed");
      }
    }
  }, [Skw]);

  console.log(SD, Mean, Median, Skw, Shape);

  return (
    isNum &&
    Mean &&
    Median &&
    SD &&
    Skw && (
      <ContentContainer>
        <h1>Skewness of "{title}":</h1>
        <div className="am_con">
          <div className="calculation">
            <div className="math">
              <var>
                Skw ={" "}
                <Divide
                  a={<>3 x ( Mean - Median )</>}
                  b={<>Standard Deviation</>}
                />
              </var>
              <var>
                Skw ={" "}
                <Divide
                  a={
                    <>
                      3 x ( {Mean.toFixed(4)} - {Median} )
                    </>
                  }
                  b={SD.toFixed(4)}
                />
              </var>
              <var>
                Skw ={" "}
                <Divide
                  a={<>3 x ( {(Mean - Median).toFixed(4)} )</>}
                  b={SD.toFixed(4)}
                />
              </var>
              <var>
                Skw ={" "}
                <Divide
                  a={<>{(3 * (Mean - Median)).toFixed(4)}</>}
                  b={SD.toFixed(4)}
                />
              </var>
              <var>Skw = {Skw.toFixed(4)}</var>
            </div>
          </div>
          <p>
            <u>Comment:</u> The shape of the data "{title}" is {Shape}
            {/* {title} data set is {RangeObj.range}. */}
          </p>
        </div>
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

export default function Skewness({ data }) {
  return (
    <Container>
      <h1>Skewness Calculation:</h1>
      <p>
        <u>Possible Values:</u>
        <ol>
          <li>Right Skewed/Positively Skewed</li>
          <li>Symmetric</li>
          <li>Left Skewed/Negatively Skewed</li>
        </ol>
      </p>
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
