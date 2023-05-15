import React, { useState } from "react";
import styled from "styled-components";

export default function ContentContainer({ pushData, children, tab }) {
  const [Data, setData] = useState();

  const placeholder =
    tab < 3 || tab === 5
      ? `Input format:
Data title: data, data, data, ...
Data title: data, data, data, ...
...`
      : tab === 6
      ? `Input format: (Must be numeric value)
Either:
Data title: Initial value(ie: 100), New value(ie:110), Time period
Or:
Data title: 1% profit, 3% lose, ...`
      : tab < 6 || tab >= 7 || tab <= 16
      ? `Input format: (Must be numeric value)
Data title: data, data, data, ...
Data title: data, data, data, ...
...`
      : ``;

  const handleSubmit = (e) => {
    e.preventDefault();
    pushData(Data);
  };

  return (
    <Container>
      <form className="add_data_container" onSubmit={handleSubmit}>
        <label htmlFor="AddData">Enter your data*</label>
        <textarea
          name="AddData"
          id="addData"
          onChange={(e) => setData(e.target.value)}
          placeholder={placeholder}
          required
        />
        <div className="form_group">
          <button type="submit">Add Data</button>
        </div>
      </form>
      {children}
    </Container>
  );
}

const Container = styled.main`
  height: 100%;
  width: 100%;
  padding: 24px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  & > .add_data_container {
    display: flex;
    flex-direction: column;
    gap: 18px;
    & > textarea {
      resize: none;
      user-select: text;
      font-size: 1.1rem;
      background-color: transparent;
      height: 160px;
      color: var(--light);
      border: none;
      outline: none;
      box-shadow: var(--dark-shadow-out);
      padding: 12px;
      border-radius: 12px;
      &.small {
        height: 60px;
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
        background-color: var(--green);
        color: var(--light);
        box-shadow: var(--green-shadow);
        font-size: 1.2rem;
      }
    }
  }
`;
