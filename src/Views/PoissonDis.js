import React, { useState } from "react";
import styled from "styled-components";
import Summary from "../Components/Summary";
import { Poiss } from "../Functions/math";
import { makeNumberArray } from "../Functions/gen";
import Divide from "../Components/Divide";

export default function PoissonDis() {
  const title = "More info about Poisson Distribution";
  const body = (
    <>
      <p>In short: X ~ Poiss( &micro; )</p>
      <br />
      <p>- Can calculate per location.</p>
      <p>- Can calculate per time.</p>
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
            <td>[0, &infin;)</td>
            <td>&micro;</td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const [Avg, setAvg] = useState();
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
      let arr = makeNumberArray(0, x - 1);
      setXExp(arr);
      setRes(Poiss(Avg, arr, "m", "l"));
      setType(1);
      setCanCalc(true);
    } else if (X.includes("<=")) {
      let x = Number(X.replace("<=", "").replaceAll(" ", ""));
      let arr = makeNumberArray(0, x);
      setXExp(arr);
      setXn(x);
      setRes(Poiss(Avg, arr, "m"));
      setType(2);
      setCanCalc(true);
    } else if (X.includes(">")) {
      let x = Number(X.replace(">", "").replaceAll(" ", ""));
      let arr = makeNumberArray(0, x);
      setXExp(arr);
      setXn(x);
      setRes(Poiss(Avg, arr, "m", "l"));
      setType(3);
      setCanCalc(true);
    } else if (X.includes("<")) {
      let x = Number(X.replace("<", "").replaceAll(" ", ""));
      let arr = makeNumberArray(0, x - 1);
      setXExp(arr);
      setXn(x);
      setRes(Poiss(Avg, arr, "m"));
      setType(4);
      setCanCalc(true);
    } else if (X.includes("=")) {
      let x = Number(X.replace("=", "").replaceAll(" ", ""));
      setXExp(x);
      setRes(Poiss(Avg, x));
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
      setRes(Poiss(Avg, arr, "m"));
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
      setRes(Poiss(Avg, arr, "m"));
      setType(7);
      setCanCalc(true);
    } else {
      setType(undefined);
      setCanCalc(false);
    }
  };

  return (
    <Container>
      <h1>Poisson Probability Distribution</h1>
      <p>
        <u>Uses:</u>
        <ol>
          <li>
            All <strong>rare event</strong> distribution.
          </li>
        </ol>
      </p>
      <Summary title={title} body={body} />

      <form className="take_value d-flex flex-column" onSubmit={handleSubmit}>
        <div className="field flex-row align-items-center">
          <label htmlFor="avg">Input &micro;:</label>
          <input
            className="small"
            type="number"
            required
            name="avg"
            id="avg"
            value={Avg}
            onChange={(e) => {
              setAvg(e.target.value);
              setCanCalc(false);
            }}
            placeholder="average value"
          />
        </div>
        {/* <div className="field flex-row align-items-center">
          <label htmlFor="p">Input p:</label>
          <input
            className="small"
            type="number"
            required
            name="p"
            id="p"
            value=
            onChange={(e) => {
              setP(e.target.value);
              setCanCalc(false);
            }}
            placeholder="value of p"
          />
        </div> */}
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
          <span>f(x) = </span>
          <Divide
            a={
              <>
                &micro;<sup>x</sup> x e<sup>-&micro;</sup>
              </>
            }
            b={<>x!</>}
          />
        </var>
      </div>
      {CanCalc &&
        Res &&
        (Type === 1 ? (
          <div className="math">
            <var>
              P(x &ge; {Xn}) = 1 -{" "}
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    f({x}) {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &ge; {Xn}) = 1 - </span>(
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    <Divide
                      a={
                        <>
                          {Avg}
                          <sup>{x}</sup> x e<sup>-{Avg}</sup>
                        </>
                      }
                      b={<>{x}!</>}
                    />{" "}
                    {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
              )
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &ge; {Xn}) = 1 - </span>(
              <span>
                {React.Children.toArray(
                  XExp.map((x, i) => (
                    <>
                      {Poiss(Avg, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
              )
            </var>
            <var>
              P(x &ge; {Xn}) = {Res.toFixed(4)}
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
              <span className="text-nowrap">P(x &le; {Xn}) = </span>
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    <Divide
                      a={
                        <>
                          {Avg}
                          <sup>{x}</sup> x e<sup>-{Avg}</sup>
                        </>
                      }
                      b={<>{x}!</>}
                    />{" "}
                    {i !== XExp.length - 1 && "+ "}
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
                      {Poiss(Avg, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var>
              P(x &le; {Xn}) = {Res.toFixed(4)}
            </var>
          </div>
        ) : Type === 3 ? (
          <div className="math">
            <var>
              P(x &gt; {Xn}) = 1 -{" "}
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    f({x}) {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &gt; {Xn}) = 1 - </span>(
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    <Divide
                      a={
                        <>
                          {Avg}
                          <sup>{x}</sup> x e<sup>-{Avg}</sup>
                        </>
                      }
                      b={<>{x}!</>}
                    />{" "}
                    {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
              )
            </var>
            <var className="d-flex align-items-center ">
              <span className="text-nowrap">P(x &gt; {Xn}) = 1 - </span>(s
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    {Poiss(Avg, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                  </>
                ))
              )}
              )
            </var>
            <var>
              P(x &gt; {Xn}) = {Res.toFixed(4)}
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
                      <Divide
                        a={
                          <>
                            {Avg}
                            <sup>{x}</sup> x e<sup>-{Avg}</sup>
                          </>
                        }
                        b={<>{x}!</>}
                      />{" "}
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
                      {Poiss(Avg, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var>
              P(x &lt; {Xn}) = {Res.toFixed(4)}
            </var>
          </div>
        ) : Type === 5 ? (
          <div className="math">
            <var>
              <span>
                P(x={XExp}) = f({XExp}) ={" "}
              </span>
              <Divide
                a={
                  <>
                    {Avg}
                    <sup>{XExp}</sup> x e<sup>-{Avg}</sup>
                  </>
                }
                b={<>{XExp}!</>}
              />
            </var>
            <var>
              P(x={XExp}) = f({XExp}) = {Res.toFixed(4)}
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
            <var>
              <span className="text-nowrap">
                P({Xn} &le; x &le; {Yn}) = &nbsp;
              </span>
              {React.Children.toArray(
                XExp.map((x, i) => (
                  <>
                    <Divide
                      a={
                        <>
                          {Avg}
                          <sup>{x}</sup> x e<sup>-{Avg}</sup>
                        </>
                      }
                      b={<>{x}!</>}
                    />{" "}
                    {i !== XExp.length - 1 && "+ "}
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
                      {Poiss(Avg, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var>
              P({Xn} &le; x &le; {Yn}) = {Res.toFixed(4)}
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
                      <Divide
                        a={
                          <>
                            {Avg}
                            <sup>{x}</sup> x e<sup>-{Avg}</sup>
                          </>
                        }
                        b={<>{x}!</>}
                      />{" "}
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
                      {Poiss(Avg, x).toFixed(4)} {i !== XExp.length - 1 && "+ "}
                    </>
                  ))
                )}
              </span>
            </var>
            <var>
              P({Xn} &lt; x &lt; {Yn}) = {Res.toFixed(4)}
            </var>
          </div>
        ) : (
          ""
        ))}
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
    }
  }
  & > .math {
    display: flex;
    flex-direction: column;
    gap: 12px;
    & > var {
      font-size: 1.2rem;
      display: inline-flex;
      align-items: center;
      gap: 4px;
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
