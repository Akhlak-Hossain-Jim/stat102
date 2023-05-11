import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import { RangeCalc } from "../Functions/dispersionMath";

function Content({ title, data }) {
  const [isNum, setIsNum] = useState();
  const [RangeObj, setRangeObj] = useState();

  useEffect(() => {
    setIsNum(dataIsNumber(data));
  }, [data]);

  useEffect(() => {
    if (isNum) {
      setRangeObj(RangeCalc(data));
    }
  }, [data, isNum]);

  console.log(RangeObj);

  return (
    <ContentContainer>
      {isNum && RangeObj ? (
        <>
          <h1 className="title">Range of {title && title}:</h1>
          <div className="am_con">
            <div className="calculation">
              <div className="math">
                <var>Range = ( maximum value - minimum value )</var>
                <var>
                  Range = ({RangeObj.max} - {RangeObj.min})
                </var>
                <var>Range = {RangeObj.range}</var>
              </div>
            </div>
            <p>
              <u>Comment:</u> The gap between the height and the lowest of{" "}
              {title} data set is {RangeObj.range}.
            </p>
            <p className="note">
              <u>Note:</u>
              <ul>
                <li>Calculation is not considering all values.</li>
                <li>Calculation is manipulated by extreme value/s.</li>
              </ul>
            </p>
          </div>
        </>
      ) : (
        <h1 className="comment">
          Can not perform <strong>Quartiles</strong> calculation on "{title}"
          data set, as the data is not numerical or categorical data
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

export default function Range({ data }) {
  return (
    <Container>
      <h1>Range{data && data.length > 1 ? "s" : ""} (Absolute Dispersion):</h1>
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
