import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber, makeFrequencyObj } from "../Functions/processData";

export default function MedianModeComponent({ calculate, title, data }) {
  const [isNum, setIsNum] = useState();
  const [SET, setSET] = useState();
  const [SortedValue, setSortedValue] = useState();
  const [Modes, setModes] = useState();
  const [Median, setMedian] = useState();

  useEffect(() => {
    setSET(makeFrequencyObj(false, data).sort((a, b) => b.count - a.count));
    setSortedValue([...data].map((el) => Number(el)).sort((a, b) => a - b));
  }, [data]);

  useEffect(() => {
    if (SET && Array.isArray(SET) && SET.length > 0) {
      let mArr = [...SET];
      setModes(mArr.filter((el) => el.count === SET[0].count));
    }
  }, [SET]);

  useEffect(() => {
    setIsNum(dataIsNumber(data));
  }, [data]);

  useEffect(() => {
    if (SortedValue && Array.isArray(SortedValue) && SortedValue.length > 0) {
      let i = (SortedValue.length + 1) / 2;
      if (Number.isInteger(i)) {
        setMedian(SortedValue[i - 1]);
      } else {
        let a =
          (Number(SortedValue[Math.floor(i) - 1]) +
            Number(SortedValue[Math.floor(i)])) /
          2;
        setMedian(a);
      }
    }
  }, [SortedValue]);

  return {
    mode: SET && (
      <Container>
        <h1 className="title">Mode of {title && title}:</h1>
        <div className="am_con">
          <p>
            <u>Comment:</u>{" "}
            {SET.length === data.length
              ? `There is no mode in the "${title}" data set. All values are unique`
              : Modes &&
                `The most frequent ${
                  Modes.length > 1
                    ? `values from the data set "${title}" are`
                    : `value from the data set "${title}" is`
                } ${Modes.map((el) => el.class).join(", ")}`}
            .
          </p>
        </div>
      </Container>
    ),
    median: SortedValue && (
      <Container>
        <h1 className="title">Median of {title && title}:</h1>
        {isNum ? (
          Median && (
            <div className="am_con">
              <div className="calculation">
                <div className="mathematical_line">
                  <var>Median</var>
                  <var> = </var>
                  <var>
                    (n + 1)&divide;2 <sup>th value</sup>
                  </var>
                </div>
                <div className="mathematical_line">
                  <var>Median</var>
                  <var> = </var>
                  <var>
                    ({data.length} + 1)&divide;2 <sup>th value</sup>
                  </var>
                </div>
                <div className="mathematical_line">
                  <var>Median</var>
                  <var> = </var>
                  <var>
                    {data.length + 1}&divide;2 <sup>th value</sup>
                  </var>
                </div>
                <div className="mathematical_line">
                  <var>Median</var>
                  <var> = </var>
                  <var>
                    {(data.length + 1) / 2} <sup>th value</sup>
                  </var>
                </div>
                {Number.isInteger((SortedValue.length + 1) / 2) ? (
                  <div className="mathematical_line">
                    <var>Median</var>
                    <var> = </var>
                    <var>{Median}</var>
                  </div>
                ) : (
                  <>
                    <div className="mathematical_line">
                      <var>Median</var>
                      <var> = </var>
                      <var>
                        ({Math.floor((data.length + 1) / 2)}
                        <sup>th value</sup>+
                        {Math.floor((data.length + 1) / 2) + 1}
                        <sup>th value</sup>)&divide;2
                      </var>
                    </div>
                    <div className="mathematical_line">
                      <var>Median</var>
                      <var> = </var>
                      <var>
                        ({SortedValue[Math.floor((data.length + 1) / 2) - 1]}+
                        {SortedValue[Math.floor((data.length + 1) / 2)]}
                        )&divide;2
                      </var>
                    </div>
                    <div className="mathematical_line">
                      <var>Median</var>
                      <var> = </var>
                      <var>{Median}</var>
                    </div>
                  </>
                )}
              </div>
              <p>
                <u>Comment:</u> The estimated average of {title} is {Median}.
              </p>
              <p>or,</p>
              <p>
                <u>Comment:</u> There is 50% of data in {title} is less than{" "}
                {Median} and rest 50% is more than that.
              </p>
              <p className="note">
                <u>Note:</u>
                <ul>
                  <li>Calculation is not considering all values.</li>
                  <li>Calculation is not manipulated by extreme value/s.</li>
                </ul>
              </p>
            </div>
          )
        ) : (
          <h1 className="comment">
            Can not perform <strong>Median</strong> on "{title}" data set, as
            the data is not numerical or categorical data
          </h1>
        )}
      </Container>
    ),
  }[calculate];
}

const Container = styled.div`
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
      & > .mathematical_line {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
    & > .note {
      & > ul {
        padding: 12px 32px;
      }
    }
  }
`;
