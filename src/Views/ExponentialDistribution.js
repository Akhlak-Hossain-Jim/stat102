import React, { useState } from "react";
import styled from "styled-components";
import Summary from "../Components/Summary";
import { ExponentialCalc } from "../Functions/math";
import Divide from "../Components/Divide";
import UD from "../Components/SmallOnes/UD";
import { engVal } from "../Functions/processData";

export default function ExponentialDistribution() {
  const title = "More info about Exponential Probability Distribution";
  const body = (
    <>
      <p>In short: X ~ Exp(&micro;, &sigma;)</p>
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
            <td>[0, &infin;)</td>
            <td>&theta;</td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const [Avg, setAvg] = useState();
  const [X, setX] = useState();
  const [Xn, setXn] = useState();
  const [Yn, setYn] = useState();
  const [CanCalc, setCanCalc] = useState(false);
  const [Type, setType] = useState();
  const [Res, setRes] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    if (X.includes(">=") || X.includes(">")) {
      let x = X.includes(">=")
        ? Number(X.replace(">=", "").replaceAll(" ", ""))
        : X.includes(">")
        ? Number(X.replace(">", "").replaceAll(" ", ""))
        : "";
      setXn(x);
      setRes(ExponentialCalc(x, Avg, "l"));
      setType(1);
      setCanCalc(true);
    } else if (X.includes("<=") || X.includes("<")) {
      let x = X.includes("<=")
        ? Number(X.replace("<=", "").replaceAll(" ", ""))
        : X.includes("<")
        ? Number(X.replace("<", "").replaceAll(" ", ""))
        : "";
      setXn(x);
      setRes(ExponentialCalc(x, Avg, "s"));
      setType(2);
      setCanCalc(true);
    } else if (X.includes("between") || X.includes("between(with)")) {
      let [x, y] = X.replace("between", "")
        .replaceAll(":", "")
        .split("and")
        .map((el) => Number(el.replaceAll(" ", "")));
      setXn(x);
      setYn(y);
      setRes(ExponentialCalc(x, Avg, "b", y));
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
      <h1>Exponential Probability Distribution</h1>
      <Summary title={title} body={body} />

      <form className="take_value d-flex flex-column" onSubmit={handleSubmit}>
        <div className="field flex-row align-items-center">
          <label htmlFor="Avg">Input &theta;:</label>
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
            placeholder="value of &theta;"
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

      <>
        <div className="math">
          <var className="d-flex align-items-center">
            f(x) = <Divide a={<>1</>} b={<>&theta;</>} />e pow(
            <sup>
              <Divide a={<>- x</>} b={<>&theta;</>} />
            </sup>
            )
          </var>
        </div>

        {CanCalc &&
          Res &&
          (Type === 1 ? (
            <div className="math">
              <var>
                P(x &gt; {Xn}) = 1 - P(x &lt; {Xn})
              </var>
              <var>
                P(x &gt; {Xn}) = 1 - <UD a={<>{Xn}</>} b={0} />
                &int;
                <Divide a={1} b={Avg} /> e pow(
                <Divide a={<>-x</>} b={Avg} />) dx
              </var>
              <var>
                P(x &gt; {Xn}) = 1 - (<Divide a={1} b={Avg} />*
                <Divide a={1} b={<Divide a={-1} b={Avg} />} />
                [e
                <sup>
                  <Divide a={<>-x</>} b={Avg} />
                </sup>
                ]
                <UD a={<>{Xn}</>} b={0} />)
              </var>
              <var>
                P(x &gt; {Xn}) = 1 - {`{`}(-1)( e Pow(
                <sup>
                  <Divide a={<>-{Xn}</>} b={Avg} />
                </sup>
                ) - e<sup>0</sup>){`}`}
              </var>
              <var>
                P(x &gt; {Xn}) = 1 - (1 - e Pow(
                <sup>
                  <Divide a={<>-{Xn}</>} b={Avg} />
                </sup>
                ))
              </var>
              <var>
                P(x &gt; {Xn}) = {engVal(Res, "react")}
              </var>
            </div>
          ) : Type === 2 ? (
            <div className="math">
              <var>
                P(x &lt; {Xn}) = <UD a={<>{Xn}</>} b={0} />
                &int;
                <Divide a={1} b={Avg} /> e pow(
                <Divide a={<>-x</>} b={Avg} />) dx
              </var>
              <var>
                P(x &lt; {Xn}) = (<Divide a={1} b={Avg} />*
                <Divide a={1} b={<Divide a={-1} b={Avg} />} />
                [e
                <sup>
                  <Divide a={<>-x</>} b={Avg} />
                </sup>
                ]
                <UD a={<>{Xn}</>} b={0} />)
              </var>
              <var>
                P(x &lt; {Xn}) = {`{`}(-1)( e Pow(
                <sup>
                  <Divide a={<>-{Xn}</>} b={Avg} />
                </sup>
                ) - e<sup>0</sup>){`}`}
              </var>
              <var>
                P(x &lt; {Xn}) = (1 - e Pow(
                <sup>
                  <Divide a={<>-{Xn}</>} b={Avg} />
                </sup>
                ))
              </var>
              <var>
                P(x &lt; {Xn}) = {engVal(Res, "react")}
              </var>
            </div>
          ) : Type === 3 ? (
            <div className="math">
              <var>
                P({Xn} &lt; x &lt; {Yn}) = P( x &lt; {Yn}) - P( x &lt; {Xn})
              </var>
              <var>
                P({Xn} &lt; x &lt; {Yn}) = <UD a={<>{Xn}</>} b={0} />
                &int;
                <Divide a={1} b={Avg} /> e pow(
                <Divide a={<>-x</>} b={Avg} />) dx &minus;{" "}
                <UD a={<>{Yn}</>} b={0} />
                &int;
                <Divide a={1} b={Avg} /> e pow(
                <Divide a={<>-x</>} b={Avg} />) dx
              </var>
              <var>
                P({Xn} &lt; x &lt; {Yn}) = (<Divide a={1} b={Avg} />*
                <Divide a={1} b={<Divide a={-1} b={Avg} />} />
                [e
                <sup>
                  <Divide a={<>-x</>} b={Avg} />
                </sup>
                ]
                <UD a={<>{Xn}</>} b={0} />) &minus; (<Divide a={1} b={Avg} />*
                <Divide a={1} b={<Divide a={-1} b={Avg} />} />
                [e
                <sup>
                  <Divide a={<>-x</>} b={Avg} />
                </sup>
                ]
                <UD a={<>{Yn}</>} b={0} />)
              </var>
              <var>
                P({Xn} &lt; x &lt; {Yn}) = {`{`}(-1)( e Pow(
                <sup>
                  <Divide a={<>-{Xn}</>} b={Avg} />
                </sup>
                ) - e<sup>0</sup>){`}`} &minus; {`{`}(-1)( e Pow(
                <sup>
                  <Divide a={<>-{Yn}</>} b={Avg} />
                </sup>
                ) - e<sup>0</sup>){`}`}
              </var>
              <var>
                P({Xn} &lt; x &lt; {Yn}) = (1 - e Pow(
                <sup>
                  <Divide a={<>-{Xn}</>} b={Avg} />
                </sup>
                )) &minus; (1 - e Pow(
                <sup>
                  <Divide a={<>-{Yn}</>} b={Avg} />
                </sup>
                ))
              </var>
              <var>
                P({Xn} &lt; x &lt; {Yn}) = {engVal(Res, "react")}
              </var>
            </div>
          ) : (
            ""
          ))}
      </>
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
