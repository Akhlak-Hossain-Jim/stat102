import React, { useState } from "react";
import styled from "styled-components";
import {
  RandomGenerate,
  makeNumberArray,
  profitLoss,
  randomRange,
} from "../Functions/randomGen";

export default function ContentContainer({
  pushData,
  children,
  tab,
  form,
  type,
}) {
  const [Data, setData] = useState();
  const [GenN, setGenN] = useState(1);

  const placeholder =
    type === "gm"
      ? `Input format: (Must be numeric value)
Either:
Data title: Initial value(ie: 100), New value(ie:110), Time period
Or:
Data title: 1% profit, 3% Loss, ...`
      : type === "normal"
      ? `Input format: (Must be numeric value)
Data title: data, data, data, ...
Data title: data, data, data, ...
...`
      : ``;

  const handleSubmit = (e) => {
    e.preventDefault();
    pushData(Data);
  };

  const handleGen = (e) => {
    e.preventDefault();
    if (type === "normal") {
      setData(
        Data
          ? Data +
              `\nData ${GenN}: ` +
              RandomGenerate(50, makeNumberArray(randomRange()))
          : `Data ${GenN}: ` +
              RandomGenerate(50, makeNumberArray(randomRange()))
      );
    } else {
      setData(
        Data
          ? Data +
              `\nGeometric Mean Data ${GenN}:  ${
                GenN % 2 === 0
                  ? [
                      (Math.random() * 1000).toFixed(2),
                      (Math.random() * 1000).toFixed(2),
                      Math.round(Math.random() * 10) + 1,
                    ].join(", ")
                  : profitLoss(20)
              }`
          : `Geometric Mean Data ${GenN}: ` +
              [
                (Math.random() * 1000).toFixed(2),
                (Math.random() * 1000).toFixed(2),
                Math.round(Math.random() * 10) + 1,
              ].join(", ")
      );
    }
    setGenN(GenN + 1);
  };

  return (
    <Container>
      {form && (
        <form className="add_data_container" onSubmit={handleSubmit}>
          <div className="line">
            <label htmlFor="AddData">Enter your data*</label>
            <button onClick={handleGen}>Generate Data</button>
          </div>
          <textarea
            name="AddData"
            id="addData"
            value={Data}
            onChange={(e) => setData(e.target.value)}
            placeholder={placeholder}
            required
          />
          <div className="form_group">
            <button type="submit">Add Data</button>
          </div>
        </form>
      )}
      {children}
    </Container>
  );
}

const Container = styled.main`
  height: 100%;
  width: 100%;
  padding: 16px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: var(--dark-shadow-out);
  border-radius: 16px;
  @media (max-width: 548px) {
    flex: 1;
  }
  & > .add_data_container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    & > .line {
      display: flex;
      gap: 16px;
      & > label {
        font-size: 1rem;
        font-weight: 600;
        padding-left: 8px;
      }
      & > button {
        margin-left: auto;
        border-radius: 12px;
        box-shadow: var(--dark-shadow-out);
        padding: 6px 12px;
      }
    }
    & > textarea {
      resize: none;
      user-select: text;
      font-size: 1.1rem;
      background-color: transparent;
      height: 160px;
      color: var(--dark);
      border: none;
      outline: none;
      box-shadow: var(--dark-shadow-out);
      padding: 12px;
      border-radius: 12px;
      &.small {
        height: 60px;
      }
      &:focus {
        box-shadow: var(--dark-shadow-in);
      }
    }
    & > .form_group {
      display: flex;
      gap: 12px;
      & > input {
        flex: 1;
        background-color: transparent;
        color: var(--light);
        border: none;
        outline: none;
        box-shadow: var(--dark-shadow-out);
        padding: 12px;
        border-radius: 12px;
      }
      & > button {
        border: none;
        outline: none;
        margin-left: auto;
        padding: 12px 48px;
        border-radius: 12px;
        background-color: var(--green-2);
        color: var(--light);
        box-shadow: var(--dark-shadow-out);
        font-size: 1.2rem;
      }
    }
  }
`;
