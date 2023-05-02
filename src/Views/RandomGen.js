import React, { useEffect, useState } from "react";
import { BsFiles } from "react-icons/bs";
import styled from "styled-components";

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
  const DataTypeNormal = ["Numeric", "Categorical"];
  const DataTypeGM = ["Value with time interval", "% Profit/Lose Value"];

  function makeNumberArray(str) {
    let arr = str
      .split("-")
      .map((el) => el.replaceAll(" ", ""))
      .map((el) => Number(el));
    let array = [];
    for (let i = arr[0]; i < arr[1]; i++) {
      array.push(i);
    }
    return array;
  }

  function makeStringArray(str) {
    let arr = str
      .split(",")
      .map((el) => el.replaceAll(" ", ""))
      .filter((el) => el !== "");
    return arr;
  }

  function RandomGen(n, arr) {
    let array = [];
    for (let i = 0; i < n; i++) {
      array.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    return array.join(", ");
  }

  function profitLose(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
      let a = Math.round(Math.random() * 20) + 1;
      let i = Math.round(Math.random() * 2);
      let b = i === 1 ? "Profit" : "Lose";
      let c = `${a}% ${b}`;
      arr.push(c);
    }
    return arr.join(", ");
  }

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
        : Calc === "Geometric Mean" && DataType === "% Profit/Lose Value"
        ? profitLose(Length)
        : Calc === "Others" && DataType === "Numerical"
        ? RandomGen(Length, makeNumberArray(Range))
        : Calc === "Others" && DataType === "Categorical"
        ? RandomGen(Length, makeStringArray(RangeStr))
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
              Choose the calculation you intend to do with the data.
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
            Numeric: (
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
    .field {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 6px;
      font-size: 1.2rem;
      & > input,
      & > select {
        padding: 6px 12px;
        border-radius: 10px;
        border: none;
        outline: none;
        font-size: 1.2rem;
        background-color: transparent;
        box-shadow: var(--dark-shadow-out);
        color: var(--light);
        & > option {
          background: var(--dark);
        }
      }
    }
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
