import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MeanContent = ({ title, data }) => {
  const [CanDo, setCanDo] = useState(false);
  const [Rule, setRule] = useState(0);
  const [Rule1Data, setRule1Data] = useState();
  const [Rule2Data, setRule2Data] = useState();
  const [Rule2DataA, setRule2DataA] = useState();

  useEffect(() => {
    let isNum;
    let stillDoable;
    for (let el of data) {
      if (isNaN(el)) {
        isNum = false;
        break;
      } else {
        isNum = true;
      }
    }
    for (let el of data) {
      if (
        isNaN(el) &&
        /[0-9]/.test(el) &&
        (el.includes("profit") ||
          el.includes("Profit") ||
          el.includes("lose") ||
          el.includes("Lose"))
      ) {
        stillDoable = true;
      } else {
        stillDoable = false;
        break;
      }
    }
    if (isNum) {
      if (data.length === 3) {
        let dataObj = { old: data[0], new: data[1], interval: data[2] };
        setRule1Data(dataObj);
        setRule(1);
        setCanDo(true);
      } else {
        setRule(0);
        setCanDo(false);
      }
    } else if (stillDoable) {
      let arr = [];
      let arr2 = [];
      for (let el of [...data]) {
        let array = el.split("%").map((el) => el.replaceAll(" ", ""));
        switch (array[1].toLowerCase()) {
          case "profit":
            arr.push(100 + Number(array[0]));
            arr2.push({
              iVal: array.join("% "),
              accumulated: 100 + Number(array[0]),
            });
            break;
          case "lose":
            arr.push(100 - Number(array[0]));
            arr2.push({
              iVal: array.join("% "),
              accumulated: 100 - Number(array[0]),
            });
            break;
          default:
            break;
        }
      }
      setRule2Data(arr);
      setRule2DataA(arr2);
      setRule(2);
      setCanDo(true);
    } else {
      setRule(0);
      setCanDo(false);
    }
  }, [data]);

  return (
    <Content>
      {CanDo ? (
        <>
          <h1 className="table_heading">Geometric Mean of "{title}":</h1>
          {Rule > 0 &&
          Rule === 1 &&
          Rule1Data &&
          Rule1Data.old &&
          Rule1Data.new &&
          Rule1Data.interval ? (
            <>
              <div className="math">
                <var>Given,</var>
                <var>
                  Initial value, P<sub>i</sub> = {Rule1Data.old}
                </var>
                <var>
                  New value, P<sub>n</sub> = {Rule1Data.new}
                </var>
                <var>Time Period, n = {Rule1Data.interval}</var>
              </div>
              <div className="math">
                <var>We know,</var>
                <var>
                  G.M = ( P<sub>n</sub> / P<sub>i</sub> )<sup>1/n</sup> - 1
                </var>
                <var>
                  G.M = ( {Rule1Data.new} / {Rule1Data.old} )
                  <sup>1/{Rule1Data.interval}</sup> - 1
                </var>
                <var>
                  G.M = ( {Rule1Data.new / Rule1Data.old} )
                  <sup>{1 / Rule1Data.interval}</sup> - 1
                </var>
                <var>
                  G.M ={" "}
                  {Math.pow(
                    Rule1Data.new / Rule1Data.old,
                    1 / Rule1Data.interval
                  )}{" "}
                  - 1
                </var>
                <var>
                  G.M ={" "}
                  {(
                    Math.pow(
                      Rule1Data.new / Rule1Data.old,
                      1 / Rule1Data.interval
                    ) - 1
                  ).toFixed(2)}
                </var>
                <br />
                <var>
                  Or, G.M ={" "}
                  {(
                    Math.pow(
                      Rule1Data.new / Rule1Data.old,
                      1 / Rule1Data.interval
                    ) - 1
                  ).toFixed(2) * 100}
                  %
                </var>
              </div>
              <div className="comment">
                <p>
                  <span>Comment:</span> On average the provided data has gotten
                  "
                  <var>
                    {(
                      Math.pow(
                        Rule1Data.new / Rule1Data.old,
                        1 / Rule1Data.interval
                      ) - 1
                    ).toFixed(2) * 100}
                    %
                  </var>
                  " mean every year.
                </p>
              </div>
            </>
          ) : Rule === 2 &&
            Rule2Data &&
            Array.isArray(Rule2Data) &&
            Rule2Data.length > 0 &&
            Rule2DataA &&
            Array.isArray(Rule2DataA) &&
            Rule2DataA.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <td>Profit/Lose</td>
                    <td>Accumulated Values</td>
                  </tr>
                </thead>
                <tbody>
                  {React.Children.toArray(
                    Rule2DataA.map((val) => (
                      <tr>
                        <td>{val.iVal}</td>
                        <td>{val.accumulated}</td>
                      </tr>
                    ))
                  )}
                  <tr>
                    <td>n = {Rule2Data.length}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className="math">
                <var>We know,</var>
                <var>
                  G.M = ( x<sub>1</sub> * x<sub>2</sub> * x<sub>3</sub> * ... *
                  x<sub>n</sub> ) <sup>1/n</sup>
                </var>
                <var>
                  G.M = ( {Rule2Data.join(" * ")} ){" "}
                  <sup>1/{Rule2Data.length}</sup>
                </var>
                <var>
                  G.M = ( {Rule2Data.reduce((a, b) => a * b, 1)} ){" "}
                  <sup>{1 / Rule2Data.length}</sup>
                </var>
                <var>
                  G.M ={" "}
                  {Math.pow(
                    Rule2Data.reduce((a, b) => a * b, 1),
                    1 / Rule2Data.length
                  ).toFixed(2)}
                </var>
                <br />
                <var>
                  Or, G.M ={" "}
                  {(
                    Math.pow(
                      Rule2Data.reduce((a, b) => a * b, 1),
                      1 / Rule2Data.length
                    ).toFixed(2) - 100
                  ).toFixed(2)}
                  %
                </var>
              </div>
              <div className="comment">
                <p>
                  <span>Comment:</span> On average the provided data has gotten
                  "
                  <var>
                    {Math.abs(
                      Math.pow(
                        Rule2Data.reduce((a, b) => a * b, 1),
                        1 / Rule2Data.length
                      ).toFixed(2) - 100
                    ).toFixed(2)}
                    %
                  </var>
                  "{" "}
                  {Math.pow(
                    Rule2Data.reduce((a, b) => a * b, 1),
                    1 / Rule2Data.length
                  ) -
                    100 >
                  0
                    ? "profit"
                    : "lose"}{" "}
                  on those reported years.
                </p>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <p className="wrong">
          Can't Do Geometric Mean on the "{title}" Data. Remove all the provided
          data and see the format you should follow to get <i>Geometric Mean</i>{" "}
          From data.
        </p>
      )}
    </Content>
  );
};

export default function GeometricMean({ data }) {
  return (
    <Container>
      <h1>Geometric Mean</h1>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => <MeanContent data={el.data} title={el.name} />)
        )}
    </Container>
  );
}

const Container = styled.div``;
const Content = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 0;
  & > .table_heading {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--light-green);
    font-style: italic;
    text-decoration: underline;
  }
  & > .wrong {
    font-size: 1.4rem;
    color: var(--light-green);
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
