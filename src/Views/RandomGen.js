import React, { useEffect, useState } from "react";
import { BsFiles } from "react-icons/bs";
import styled from "styled-components";
import {
  RandomGenerate,
  makeNumberArray,
  makeStringArray,
  profitLoss,
} from "../Functions/randomGen";

export default function RandomGen() {
  const [Title, setTitle] = useState();
  const [Calc, setCalc] = useState();
  const [Range, setRange] = useState("67-92");
  const [RangeStr, setRangeStr] = useState("A+, A-, B+, B-, AB+, AB-,O+,O-");
  const [DataType, setDataType] = useState();
  const [Length, setLength] = useState();
  const [Data, setData] = useState();

  useEffect(() => {
    if (Calc === "Geometric Mean" && DataType === "Value with time interval")
      setLength(3);
  }, [Calc, DataType]);

  const CalcOpt = ["Geometric Mean", "Others"];
  const DataTypeNormal = ["Numerical", "Categorical"];
  const DataTypeGM = ["Value with time interval", "% Profit/Loss Value"];

  const handleSubmit = (e) => {
    e.preventDefault();
    let string = "";
    string += `${Title.replaceAll(":", "")}: `;
    let dt =
      Calc === "Geometric Mean" && DataType === "Value with time interval"
        ? [
            (Math.random() * 1000).toFixed(2),
            (Math.random() * 1000).toFixed(2),
            Math.round(Math.random() * 10) + 1,
          ].join(", ")
        : Calc === "Geometric Mean" && DataType === "% Profit/Loss Value"
        ? profitLoss(Length)
        : Calc === "Others" && DataType === "Numerical"
        ? RandomGenerate(Length, makeNumberArray(Range))
        : Calc === "Others" && DataType === "Categorical"
        ? RandomGenerate(Length, makeStringArray(RangeStr))
        : "";
    string += dt;
    setData(string);
    console.log(dt);
  };
  const handleReset = () => {
    setTitle();
    setCalc();
    setDataType();
    setLength();
    setData();
  };

  return (
    <Container>
      <h1>Configure your random data:</h1>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="field">
          <label htmlFor="DataName">Name/Title:</label>
          <input
            required
            type="text"
            name="DataName"
            placeholder="Marks of Section A Students'"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="Calculation">Calculation:</label>
          <select
            required
            name="Calculation"
            id=""
            onChange={(e) => setCalc(e.target.value)}
          >
            <option value="" selected disabled>
              Choose Calculation type
            </option>
            {React.Children.toArray(
              CalcOpt.map((option) => <option value={option}>{option}</option>)
            )}
          </select>
        </div>
        <div className="two_col">
          <div className="field">
            <label htmlFor="Type">Data Type:</label>
            <select
              required
              name="Type"
              onChange={(e) => {
                setDataType(e.target.value);
                setRange();
              }}
            >
              <option value="" selected disabled>
                Choose data category
              </option>
              {React.Children.toArray(
                (Calc === "Geometric Mean" ? DataTypeGM : DataTypeNormal).map(
                  (option) => <option value={option}>{option}</option>
                )
              )}
            </select>
          </div>
          <div className="field">
            <label htmlFor="Length">Data Length:</label>
            <input
              required
              type="number"
              name="Length"
              min={2}
              value={Length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Identified as 'n'"
              readOnly={
                Calc === "Geometric Mean" &&
                DataType === "Value with time interval"
              }
            />
          </div>
        </div>
        {
          {
            Categorical: (
              <div className="field">
                <label htmlFor="ChooseFromArr">Choose random from:</label>
                <input
                  required
                  type="text"
                  name="ChooseFromArr"
                  value={RangeStr}
                  placeholder="A+, A-, AB+, AB-, ..."
                  onChange={(e) => setRangeStr(e.target.value)}
                />
              </div>
            ),
            Numerical: (
              <div className="field">
                <label htmlFor="Range">Choose Range:</label>
                <input
                  required
                  type="text"
                  name="Range"
                  placeholder="1-100"
                  value={Range}
                  onChange={(e) => setRange(e.target.value)}
                />
              </div>
            ),
          }[DataType]
        }
        <div className="buttons">
          <button type="submit">Generate</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>
      {Data && (
        <div className="data">
          {Data}{" "}
          <button
            className="copy"
            onClick={() => {
              navigator.clipboard.writeText(Data);
              window.alert("Copied to clip board");
            }}
          >
            <BsFiles />
          </button>
        </div>
      )}
    </Container>
  );
}

const Container = styled.main`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  & > form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    .two_col {
      display: flex;
      gap: 24px;
      @media (max-width: 600px) {
        flex-direction: column;
      }
    }
    & > .buttons {
      margin-left: auto;
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      & > button {
        padding: 12px 24px;
        font-size: 1.1rem;
        font-weight: 500;
        background-color: var(--green-2);
        color: var(--light);
        box-shadow: var(--dark-shadow-out);
        border-radius: 16px;
      }
    }
  }
  & > .data {
    padding: 24px;
    border-radius: 12px;
    color: var(--light);
    box-shadow: var(--dark-shadow-out);
    position: relative;
    & > .copy {
      background-color: transparent;
      box-shadow: var(--dark-shadow-out);
      border-radius: 50%;
      padding: 12px;
      color: var(--light);
      font-size: 1.2rem;
      border: none;
      outline: none;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
`;
