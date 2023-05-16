import React, { useState } from "react";
import styled from "styled-components";
import Summary from "../Components/Summary";
import { NormalDis, ProbabilityByZ } from "../Functions/math";
import Divide from "../Components/Divide";

export default function NormalDistribution() {
  const title = "More info about Normal Distribution";
  const body = (
    <>
      <p>In short: X ~ N(&micro;, &sigma;)</p>
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
            <td>Continues</td>
            <td>(-&infin;, &infin;)</td>
            <td>&micro;, &sigma;</td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const [Avg, setAvg] = useState();
  const [StdDev, setStdDev] = useState();
  const [X, setX] = useState();
  const [Xn, setXn] = useState();
  const [Yn, setYn] = useState();
  const [CanCalc, setCanCalc] = useState(false);
  const [Type, setType] = useState();
  const [Res, setRes] = useState();
  const [ValZ, setValZ] = useState();
  const [ValYZ, setValYZ] = useState();
  const [ActiveNav, setActiveNav] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    if (X.includes(">=") || X.includes(">")) {
      let x = X.includes(">=")
        ? Number(X.replace(">=", "").replaceAll(" ", ""))
        : X.includes(">")
        ? Number(X.replace(">", "").replaceAll(" ", ""))
        : "";
      setXn(x);
      setRes(NormalDis(Avg, x, StdDev, "l"));
      setValZ(NormalDis(Avg, x, StdDev, "z"));
      setType(1);
      setCanCalc(true);
    } else if (X.includes("<=") || X.includes("<")) {
      let x = X.includes("<=")
        ? Number(X.replace("<=", "").replaceAll(" ", ""))
        : X.includes("<")
        ? Number(X.replace("<", "").replaceAll(" ", ""))
        : "";
      setXn(x);
      setRes(NormalDis(Avg, x, StdDev, "s"));
      setValZ(NormalDis(Avg, x, StdDev, "z"));
      setType(2);
      setCanCalc(true);
    } else if (X.includes("between") || X.includes("between(with)")) {
      let [x, y] = X.replace("between", "")
        .replaceAll(":", "")
        .split("and")
        .map((el) => Number(el.replaceAll(" ", "")));
      setXn(x);
      setYn(y);
      setRes(NormalDis(Avg, x, StdDev, "b", y));
      setValZ(NormalDis(Avg, x, StdDev, "z"));
      setValYZ(NormalDis(Avg, y, StdDev, "z"));
      setType(3);
      setCanCalc(true);
    } else {
      setType(undefined);
      setCanCalc(false);
    }
  }

  console.log(Xn, Res);

  return (
    <Container>
      <h1>Normal Probability Distribution</h1>
      <Summary title={title} body={body} />

      <form className="take_value d-flex flex-column" onSubmit={handleSubmit}>
        <div className="field flex-row align-items-center">
          <label htmlFor="Avg">Input &micro;:</label>
          <input
            className="small"
            type="number"
            required
            name="Avg"
            id="Avg"
            value={Avg}
            onChange={(e) => {
              setAvg(e.target.value);
              setCanCalc(false);
            }}
            placeholder="value of &micro;"
          />
        </div>
        <div className="field flex-row align-items-center">
          <label htmlFor="StdDeviation">Input &sigma;:</label>
          <input
            className="small"
            type="number"
            required
            name="StdDeviation"
            id="StdDeviation"
            value={StdDev}
            onChange={(e) => {
              setStdDev(e.target.value);
              setCanCalc(false);
            }}
            placeholder="value of &sigma;"
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
            <li>{`<=3 or <3`}</li>
            <li>{`>=3 or >3`}</li>
            <li>between: 2 and 3</li>
          </ul>
        </p>
        <button type="submit">Add Data</button>
      </form>

      <nav>
        <button
          className={`${ActiveNav === 0 ? "active" : ""}`}
          onClick={() => setActiveNav(0)}
        >
          Standard Normal(z)
        </button>
        <button
          className={`${ActiveNav === 1 ? "active" : ""}`}
          onClick={() => setActiveNav(1)}
        >
          Normal
        </button>
      </nav>

      {ActiveNav === 1 ? (
        <>
          <div className="math">
            <var className="d-flex align-items-center">
              f(x) = <Divide a={<>1</>} b={<>&sigma;&radic;2&pi;</>} />{" "}
              <span>
                e
                <sup>
                  -(x - &micro;)<sup>2</sup>/2&sigma;<sup>2</sup>
                </sup>
              </span>
            </var>
          </div>
          Will be adding soon.
          {/* {CanCalc &&
            Res &&
            (Type === 1 ? (
              <div className="math">
                <var>
                  P(x &ge; {Xn}) = {Res.toFixed(4)}
                </var>
              </div>
            ) : Type === 2 ? (
              <div className="math">
                <var>
                  P(x &le; {Xn}) = {Res.toFixed(4)}
                </var>
              </div>
            ) : Type === 3 ? (
              <div className="math">
                <var>
                  P({Xn} &lt; x &lt; {Yn}) = {Res.toFixed(4)}
                </var>
              </div>
            ) : (
              ""
            ))} */}
        </>
      ) : ActiveNav === 0 ? (
        <>
          <div className="math">
            <var>
              z = <Divide a={<>x - &micro;</>} b={<>&sigma;</>} />
            </var>
          </div>

          {CanCalc &&
            ValZ &&
            (Type === 1 ? (
              <div className="math">
                <var>
                  P(x &gt; {Xn}) = P(z &gt;{" "}
                  <Divide
                    a={
                      <>
                        {Xn} - {Avg}
                      </>
                    }
                    b={<>{StdDev}</>}
                  />
                  )
                </var>
                <var>
                  P(z &gt; {ValZ.toFixed(2)}) = 1 - P(z &lt; {ValZ.toFixed(2)})
                </var>
                {ProbabilityByZ(ValZ) && (
                  <var>
                    P(z &gt; {ValZ.toFixed(2)}) = 1 -{" "}
                    {ProbabilityByZ(ValZ).toFixed(4)}
                  </var>
                )}
                {ProbabilityByZ(ValZ) && (
                  <var>
                    P(z &gt; {ValZ.toFixed(2)}) ={" "}
                    {(1 - ProbabilityByZ(ValZ)).toFixed(4)}
                  </var>
                )}
              </div>
            ) : Type === 2 ? (
              <div className="math">
                <var>
                  P(x &lt; {Xn}) = P(z &lt;{" "}
                  <Divide
                    a={
                      <>
                        {Xn} - {Avg}
                      </>
                    }
                    b={<>{StdDev}</>}
                  />
                  )
                </var>
                {ProbabilityByZ(ValZ) && (
                  <var>
                    P(z &lt; {ValZ.toFixed(2)}) = {ProbabilityByZ(ValZ)}
                  </var>
                )}
              </div>
            ) : Type === 3 && Yn && ValYZ ? (
              <div className="math">
                <var>
                  P({Xn} &lt; x &lt; {Yn}) = P(
                  <Divide
                    a={
                      <>
                        {Xn} - {Avg}
                      </>
                    }
                    b={<>{StdDev}</>}
                  />{" "}
                  &lt; z &lt;{" "}
                  <Divide
                    a={
                      <>
                        {Yn} - {Avg}
                      </>
                    }
                    b={<>{StdDev}</>}
                  />
                  )
                </var>
                <var>
                  P({ValZ.toFixed(2)} &lt; z &lt; {ValYZ.toFixed(2)}) = P( z
                  &lt; {ValYZ.toFixed(2)} ) - P( z &lt; {ValZ.toFixed(2)} )
                </var>
                {ProbabilityByZ(ValYZ) && ProbabilityByZ(ValZ) && (
                  <var>
                    P({ValZ.toFixed(2)} &lt; z &lt; {ValYZ.toFixed(2)}) ={" "}
                    {ProbabilityByZ(ValYZ)} - {ProbabilityByZ(ValZ)}
                  </var>
                )}
                {ProbabilityByZ(ValYZ) && ProbabilityByZ(ValZ) && (
                  <var>
                    P({ValZ.toFixed(2)} &lt; z &lt; {ValYZ.toFixed(2)}) ={" "}
                    {ProbabilityByZ(ValYZ) - ProbabilityByZ(ValZ)}
                  </var>
                )}
              </div>
            ) : (
              ""
            ))}
        </>
      ) : (
        ""
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
    }
  }
  & > nav {
    display: flex;
    align-items: center;
    gap: 24px;
    & > button {
      padding: 6px 24px;
      border-radius: 12px;
      outline: none;
      background-color: transparent;
      color: var(--light-green);
      font-size: 1.1rem;
      font-weight: 500;
      border: 1px solid var(--light-green);
      cursor: pointer;
      &.active {
        background-color: var(--light-green);
        color: var(--dark);
      }
    }
  }
  & > .math {
    display: flex;
    flex-direction: column;
    gap: 12px;
    & > var {
      font-size: 1.2rem;
      display: flex;
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
