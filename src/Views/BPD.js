import React, { useState } from "react";
import styled from "styled-components";
import Summary from "../Components/Summary";
import { Bin } from "../Functions/math";
import { makeNumberArray } from "../Functions/gen";
import { engVal } from "../Functions/processData";

export default function BPD() {
  const title = "More info about Binomial Probability Distribution";
  const body = (
    <>
      <p>In short: X ~ Bin(n, p)</p>
      <br />
      <table>
        <thead>
          <tr>
            <th>Data Type</th>
            <th>Limit</th>
            <th>Parameter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Discrete</td>
            <td>[0, n]</td>
            <td>n, p</td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const [N, setN] = useState();
  const [P, setP] = useState();
  const [X, setX] = useState();
  const [Xn, setXn] = useState();
  const [Yn, setYn] = useState();
  const [XExp, setXExp] = useState();
  const [CanCalc, setCanCalc] = useState(false);
  const [Type, setType] = useState();
  const [Res, setRes] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (X.includes(">=")) {
      let x = Number(X.replace(">=", "").replaceAll(" ", ""));
      setXn(x);
      let arr = makeNumberArray(x, N);
      setXExp(arr);
      setRes(Bin(N, P, arr, "m"));
      setType(1);
      setCanCalc(true);
    } else if (X.includes("<=")) {
      let x = Number(X.replace("<=", "").replaceAll(" ", ""));
      let arr = makeNumberArray(0, x);
      setXExp(arr);
      setXn(x);
      setRes(Bin(N, P, arr, "m"));
      setType(2);
      setCanCalc(true);
    } else if (X.includes(">")) {
      let x = Number(X.replace(">", "").replaceAll(" ", ""));
      let arr = makeNumberArray(x + 1, N);
      setXExp(arr);
      setXn(x);
      setRes(Bin(N, P, arr, "m"));
      setType(3);
      setCanCalc(true);
    } else if (X.includes("<")) {
      let x = Number(X.replace("<", "").replaceAll(" ", ""));
      let arr = makeNumberArray(0, x - 1);
      setXExp(arr);
      setXn(x);
      setRes(Bin(N, P, arr, "m"));
      setType(4);
      setCanCalc(true);
    } else if (X.includes("=")) {
      let x = Number(X.replace("=", "").replaceAll(" ", ""));
      setXExp(x);
      setRes(Bin(N, P, x));
      setType(5);
      setCanCalc(true);
    } else if (X.includes("between(with)")) {
      let [x, y] = X.replace("between(with)", "")
        .replaceAll(":", "")
        .split("and")
        .map((el) => Number(el.replaceAll(" ", "")));
      let arr = makeNumberArray(x, y);
      setXExp(arr);
      setXn(x);
      setYn(y);
      setRes(Bin(N, P, arr, "m"));
      setType(6);
      setCanCalc(true);
    } else if (X.includes("between")) {
      let [x, y] = X.replace("between", "")
        .replaceAll(":", "")
        .split("and")
        .map((el) => Number(el.replaceAll(" ", "")));
      let arr = makeNumberArray(x + 1, y - 1);
      setXExp(arr);
      setXn(x);
      setYn(y);
      setRes(Bin(N, P, arr, "m"));
      setType(7);
      setCanCalc(true);
    } else {
      setType(undefined);
      setCanCalc(false);
    }
  };

  return (
    <Container>
      <h1>Binomial Probability Distribution</h1>
      <p>
        <u>Uses:</u>
        <ol>
          <li>
            If there is only <strong>two</strong> outcomes on the event. Or
          </li>
          <li>We can categorize all outcomes into two outcomes.</li>
        </ol>
      </p>
      <Summary title={title} body={body} />

      <form className="take_value d-flex flex-column" onSubmit={handleSubmit}>
        <div className="field flex-row align-items-center">
          <label htmlFor="n">Input n:</label>
          <input
            className="small"
            type="number"
            required
            name="n"
            id="n"
            value={N}
            onChange={(e) => {
              setN(e.target.value);
              setCanCalc(false);
            }}
            placeholder="value of n"
          />
        </div>
        <div className="field flex-row align-items-center">
          <label htmlFor="p">Input p:</label>
          <input
            className="small"
            type="number"
            required
            name="p"
            id="p"
            value={P}
            onChange={(e) => {
              setP(e.target.value);
              setCanCalc(false);
            }}
            placeholder="value of p"
          />
        </div>
        <div className="field flex-row align-items-center">
          <label htmlFor="x">x is</label>
          <input
            className="small"
            type="text"
            required
            name="x"
            id="x"
            value={X}
            onChange={(e) => {
              setX(e.target.value);
              setCanCalc(false);
            }}
            placeholder="define x"
          />
        </div>
        <p>
          <u>Example of x input:</u>
          <ul>
            <li>=3</li>
            <li>{`<=3`}</li>
            <li>{`>=3`}</li>
            <li>{`>3`}</li>
            <li>{`<3`}</li>
            <li>between: 2 and 3</li>
            <li>between(with): 2 and 3</li>
          </ul>
        </p>
        <button type="submit">Add Data</button>
      </form>
      <div className="math">
        <var>
          f(x) = <sup>n</sup>C<sub>x</sub> &times; p<sup>x</sup> &times; ( 1 - p
          ) <sup>(n-x)</sup>
        </var>
      </div>

      {CanCalc &&
        Res &&
        (Type === 1 ? (
          <div className="math">
            <var>
              P(x &ge; {Xn}) ={" "}
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    f({x}) {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &ge; {Xn}) = &nbsp;</span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      <sup>{N}</sup>C<sub>{x}</sub> &times; {P}
                      <sup>{x}</sup> &times; ( 1 - {P}){" "}
                      <sup>
                        ({N}-{x})
                      </sup>{" "}
                      {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &ge; {Xn}) = &nbsp;</span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      {Bin(N, P, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var>
              P(x &ge; {Xn}) = {engVal(Res, "react")}
            </var>
          </div>
        ) : Type === 2 ? (
          <div className="math">
            <var>
              P(x &le; {Xn}) ={" "}
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    f({x}) {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &le; {Xn}) = &nbsp;</span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      <sup>{N}</sup>C<sub>{x}</sub> &times; {P}
                      <sup>{x}</sup> &times; ( 1 - {P}){" "}
                      <sup>
                        ({N}-{x})
                      </sup>{" "}
                      {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &ge; {Xn}) = &nbsp;</span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      {Bin(N, P, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var>
              P(x &le; {Xn}) = {engVal(Res, "react")}
            </var>
          </div>
        ) : Type === 3 ? (
          <div className="math">
            <var>
              P(x &gt; {Xn}) ={" "}
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    f({x}) {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &gt; {Xn}) = &nbsp;</span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      <sup>{N}</sup>C<sub>{x}</sub> &times; {P}
                      <sup>{x}</sup> &times; ( 1 - {P}){" "}
                      <sup>
                        ({N}-{x})
                      </sup>{" "}
                      {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &gt; {Xn}) = &nbsp;</span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      {Bin(N, P, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var>
              P(x &gt; {Xn}) = {engVal(Res, "react")}
            </var>
          </div>
        ) : Type === 4 ? (
          <div className="math">
            <var>
              P(x &lt; {Xn}) ={" "}
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    f({x}) {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &lt; {Xn}) = &nbsp;</span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      <sup>{N}</sup>C<sub>{x}</sub> &times; {P}
                      <sup>{x}</sup> &times; ( 1 - {P}){" "}
                      <sup>
                        ({N}-{x})
                      </sup>{" "}
                      {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &lt; {Xn}) = &nbsp;</span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      {Bin(N, P, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var>
              P(x &lt; {Xn}) = {engVal(Res, "react")}
            </var>
          </div>
        ) : Type === 5 ? (
          <div className="math">
            <var>
              P(x={XExp}) = f({XExp}) = <sup>{N}</sup>C<sub>{XExp}</sub> &times;{" "}
              {P}
              <sup>{XExp}</sup> &times; ( 1 - {P}){" "}
              <sup>
                ({N}-{XExp})
              </sup>
            </var>
            <var>
              P(x={XExp}) = f({XExp}) = {engVal(Res, "react")}
            </var>
          </div>
        ) : Type === 6 ? (
          <div className="math">
            <var>
              P({Xn} &le; x &le; {Yn}) ={" "}
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    f({x}) {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">
                P({Xn} &le; x &le; {Yn}) = &nbsp;
              </span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      <sup>{N}</sup>C<sub>{x}</sub> &times; {P}
                      <sup>{x}</sup> &times; ( 1 - {P}){" "}
                      <sup>
                        ({N}-{x})
                      </sup>{" "}
                      {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">
                P({Xn} &le; x &le; {Yn}) = &nbsp;
              </span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      {Bin(N, P, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var>
              P({Xn} &le; x &le; {Yn}) = {engVal(Res, "react")}
            </var>
          </div>
        ) : Type === 7 ? (
          <div className="math">
            <var>
              P({Xn} &lt; x &lt; {Yn}) ={" "}
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    f({x}) {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">
                P({Xn} &lt; x &lt; {Yn}) = &nbsp;
              </span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      <sup>{N}</sup>C<sub>{x}</sub> &times; {P}
                      <sup>{x}</sup> &times; ( 1 - {P}){" "}
                      <sup>
                        ({N}-{x})
                      </sup>{" "}
                      {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">
                P({Xn} &lt; x &lt; {Yn}) = &nbsp;
              </span>
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      {Bin(N, P, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var>
              P({Xn} &lt; x &lt; {Yn}) = {engVal(Res, "react")}
            </var>
          </div>
        ) : (
          ""
        ))}
      {CanCalc && (
        <div className="math">
          <var>Mean E[x] = np</var>
          <var>
            Mean E[x] = {N}&times;{P}
          </var>
          <var>Mean E[x] = {(N * P).toFixed(4)}</var>
          <br />
          <var>
            Variance(x) = &sigma;<sup>2</sup> = np( 1 - p )
          </var>
          <var>
            Variance(x) = &sigma;<sup>2</sup> = {N}&times;{P}&times;( 1 - {P})
          </var>
          <var>
            Variance(x) = &sigma;<sup>2</sup> = {(N * P * (1 - P)).toFixed(4)}
          </var>
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
  & > p {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    gap: 12px;
    & > ol,
    & > ul {
      padding-left: 24px;
    }
    & > .note {
      font-size: 1.25rem;
      font-style: italic;
      color: var(--light-green);
    }
  }
  & > .take_value {
    gap: 24px;
    & > p {
      display: flex;
      flex-direction: column;
      font-size: 1.2rem;
      gap: 12px;
      & > ol,
      & > ul {
        padding-left: 24px;
      }
      & > .note {
        font-size: 1.25rem;
        font-style: italic;
        color: var(--light-green);
      }
    }
    & > button {
      padding: 12px 24px;
      font-size: 1.1rem;
      font-weight: 500;
      display: inline;
      margin-right: auto;
      background-color: var(--green-2);
      color: var(--light);
      box-shadow: var(--dark-shadow-out);
      border-radius: 16px;
    }
  }
  & > .math {
    display: flex;
    flex-direction: column;
    gap: 12px;
    & > var {
      font-size: 1.2rem;
    }
  }
  & > .comment {
    & > p {
      font-size: 1.3rem;
      & > span {
        text-decoration: underline;
      }
    }
  }
`;
