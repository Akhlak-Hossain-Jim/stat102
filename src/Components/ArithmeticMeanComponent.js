import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import { BsRecordCircle, BsCircle } from "react-icons/bs";

export default function ArithmeticMeanComponent({ title, data }) {
  const [isNum, setIsNum] = useState();
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

  return (
    <Container>
      <h1 className="title">Arithmetic Mean of {title && title}:</h1>
      {isNum ? (
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
          {
            {
              population: (
                <div className="calculation">
                  <div className="mathematical_line">
                    <var>&micro;</var>
                    <var> = </var>
                    <var>&sum;x &divide; N</var>
                  </div>
                  <div className="mathematical_line">
                    <var>&micro;</var>
                    <var> = </var>
                    <var>
                      ({data.join(" + ")}) &divide;{data.length}
                    </var>
                  </div>
                  <div className="mathematical_line">
                    <var>&micro;</var>
                    <var> = </var>
                    <var>
                      {data.reduce((a, b) => Number(a) + Number(b), 0)} &divide;
                      {data.length}
                    </var>
                  </div>
                  <div className="mathematical_line">
                    <var>&micro;</var>
                    <var> = </var>
                    <var>
                      {data.reduce((a, b) => Number(a) + Number(b), 0) /
                        data.length}
                    </var>
                  </div>
                </div>
              ),
              sample: (
                <div className="calculation">
                  <div className="mathematical_line">
                    <var>x_bar</var>
                    <var> = </var>
                    <var>&sum;x &divide; n</var>
                  </div>
                  <div className="mathematical_line">
                    <var>x_bar</var>
                    <var> = </var>
                    <var>
                      ({data.join(" + ")}) &divide;{data.length}
                    </var>
                  </div>
                  <div className="mathematical_line">
                    <var>x_bar</var>
                    <var> = </var>
                    <var>
                      {data.reduce((a, b) => Number(a) + Number(b), 0)} &divide;
                      {data.length}
                    </var>
                  </div>
                  <div className="mathematical_line">
                    <var>x_bar</var>
                    <var> = </var>
                    <var>
                      {data.reduce((a, b) => Number(a) + Number(b), 0) /
                        data.length}
                    </var>
                  </div>
                </div>
              ),
            }[NType]
          }
          <p>
            <u>Comment:</u> The estimated average of {title} is{" "}
            {(
              data.reduce((a, b) => Number(a) + Number(b), 0) / data.length
            ).toFixed(2)}
            .
          </p>
          <p className="note">
            <u>Note:</u>
            <ul>
              <li>Calculation is considering all values.</li>
              <li>Calculation is manipulated by extreme value/s.</li>
            </ul>
          </p>
        </div>
      ) : (
        <h1 className="comment">
          Can not perform <strong>Arithmetic Mean</strong> on "{title}" data
          set, as the data is not numerical or categorical data
        </h1>
      )}
    </Container>
  );
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
