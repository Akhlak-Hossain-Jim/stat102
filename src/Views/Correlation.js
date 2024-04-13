import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import { findRelation, findRelationType } from "../Functions/relationMath";
import Divide from "../Components/Divide";

function Content({ title, data, title2, data2 }) {
  const [isNum, setIsNum] = useState();
  const [XBar, setXBar] = useState();
  const [YBar, setYBar] = useState();
  const [SumOfSubs, setSumOfSubs] = useState();
  const [SumXsq, setSumXsq] = useState();
  const [SumYsq, setSumYsq] = useState();
  const [Table, setTable] = useState();
  const [Sxy, setSxy] = useState();
  const [Sx, setSx] = useState();
  const [Sy, setSy] = useState();
  const [Rel, setRel] = useState();
  const [RelType, setRelType] = useState();

  useEffect(() => {
    setIsNum(
      data.length === data2.length && dataIsNumber(data) && dataIsNumber(data2)
    );
  }, [data, data2]);

  useEffect(() => {
    if (isNum) {
      let res = findRelation(data, data2);
      setXBar(res.xAvg);
      setYBar(res.yAvg);
      setSumOfSubs(res.sumOfSubs);
      setSumXsq(res.sumOfXSubSq);
      setSumYsq(res.sumOfYSubSq);
      setTable(res.array);
      setSxy(res.Sxy);
      setSx(res.Sx);
      setSy(res.Sy);
      setRel(res.r);
      setRelType(findRelationType(res.r));
      console.log(res, findRelationType(res.r));
    } else {
      setXBar();
      setYBar();
      setSumOfSubs();
      setSumXsq();
      setSumYsq();
      setTable();
      setSxy();
      setSx();
      setSy();
      setRel();
      setRelType();
    }
  }, [data, data2, isNum]);

  //   console.log(
  //     Math.ceil(percentOf(RelType, (5 / 6) * 100) / 10) * 10,
  //     RelType
  //   );

  return data.length === data2.length ? (
    isNum &&
    XBar &&
    YBar &&
    SumOfSubs &&
    SumXsq &&
    Sxy &&
    Rel &&
    Sy &&
    RelType &&
    SumYsq &&
    Sx &&
    Table ? (
      <ContentContainer>
        <h1>
          Finding linear relationship between "{title}" and "{title2}":
        </h1>
        <div className="am_con">
          <p>
            Assuming the data set {title} as "x" and the data set {title2} as y.
            Change the serial in the input field if you want other wise.
          </p>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>x</th>
                  <th>y</th>
                  <th>x - x_bar</th>
                  <th>y - y_bar</th>
                  <th>(x - x_bar)(y - y_bar)</th>
                  <th>
                    (x - x_bar)<sup>2</sup>
                  </th>
                  <th>
                    (y - y_bar)<sup>2</sup>
                  </th>
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(
                  Table.map((td) => (
                    <tr>
                      <td>{td.x.toFixed(2)}</td>
                      <td>{td.y.toFixed(2)}</td>
                      <td>{td.xSubXBar.toFixed(2)}</td>
                      <td>{td.ySubYBar.toFixed(2)}</td>
                      <td>{td.sumOfSubs.toFixed(2)}</td>
                      <td>{td.xSq.toFixed(2)}</td>
                      <td>{td.ySq.toFixed(2)}</td>
                    </tr>
                  ))
                )}
                <tr>
                  <td>x_bar={XBar}</td>
                  <td>y_bar={YBar}</td>
                  <td></td>
                  <td></td>
                  <td>&sum; = {SumOfSubs}</td>
                  <td>&sum; = {SumXsq}</td>
                  <td>&sum; = {SumYsq}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="calculation">
            <>
              <div className="math">
                <h3>Here,</h3>
                <var>
                  co-variance of x, Sx = &radic;{" "}
                  <Divide
                    a={
                      <>
                        &sum;(x - x_bar)<sup>2</sup>
                      </>
                    }
                    b={`n - 1`}
                  />
                </var>
                <var>
                  Sx = &radic; <Divide a={SumXsq} b={data.length - 1} />
                </var>
                <var>Sx ={Sx.toFixed(4)}</var>
              </div>
              <div className="math">
                <var>
                  co-variance of y, Sy = &radic;{" "}
                  <Divide
                    a={
                      <>
                        &sum;(y - y_bar)<sup>2</sup>
                      </>
                    }
                    b={`n - 1`}
                  />
                </var>
                <var>
                  Sy = &radic; <Divide a={SumYsq} b={data.length - 1} />
                </var>
                <var>Sy ={Sy.toFixed(4)}</var>
              </div>
              <div className="math">
                <var>
                  Sxy ={" "}
                  <Divide a={<>&sum;(x - x_bar)(y - y_bar)</>} b={`n - 1`} />
                </var>
                <var>
                  Sxy = <Divide a={SumOfSubs} b={data.length - 1} />
                </var>
                <var>Sxy ={Sxy.toFixed(4)}</var>
              </div>
              <br />
              <div className="math">
                <h3>We know,</h3>
                <var>
                  Karl Pearsons correlation co-efficient, r ={" "}
                  <Divide a={<>Sxy</>} b={<>Sx Sy</>} />
                </var>
                <h3>So,</h3>
                <var>
                  r ={" "}
                  <Divide
                    a={<>{Sxy.toFixed(4)}</>}
                    b={
                      <>
                        {Sx.toFixed(4)} * {Sy.toFixed(4)}
                      </>
                    }
                  />
                </var>
                <var>r = {Rel.toFixed(4)}</var>
              </div>
            </>
          </div>
          <p>
            <u>Comment:</u> There is {RelType} linear relationship between{" "}
            {title} and {title2}.
          </p>
        </div>
      </ContentContainer>
    ) : (
      <ContentContainer>
        <h1 className="comment">
          Can not perform calculation due to some error. Please check the
          console for more information, and report it{" "}
          <a
            href="https://github.com/Akhlak-Hossain-Jim/stat102/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </h1>
      </ContentContainer>
    )
  ) : (
    <ContentContainer>
      <h1 className="comment">
        The length of the data "n" is not same in data {title} & data {title2},
        which is required for the calculation.
      </h1>
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
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
      width: Sxy-content;
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
    width: 100%;
    overflow-x: auto;
    & > .form {
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
        & > input,
        & > span > input {
          background-color: transparent;
          border: none;
          outline: none;
          color: var(--light);
          box-shadow: var(--dark-shadow-in);
          padding: 6px 12px;
          border-radius: 12px;
        }
      }
    }
    & > .table {
      width: 100%;
      overflow-x: auto;
      & > table {
        width: 100%;
      }
    }
    & > .calculation {
      display: flex;
      flex-direction: column;
      gap: 12px;
      & > .math {
        display: flex;
        gap: 8px;
        flex-direction: column;
        & > var {
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          & > * {
            white-space: break-spaces;
          }
        }
      }
    }
    & > .note {
      & > ul {
        padding: 12px 32px;
      }
    }
  }
`;

export default function Correlation({ data }) {
  return (
    <Container>
      <h1>Correlation between given data sets:</h1>
      {data &&
        (Array.isArray(data) && data.length > 1 ? (
          React.Children.toArray(
            data.map(
              (el, i) =>
                el &&
                data[i + 1] && (
                  <Content
                    data={el.data}
                    title={el.name}
                    data2={data[i + 1].data}
                    title2={data[i + 1].name}
                  />
                )
            )
          )
        ) : (
          <h2>
            There needs to be at least 2 data sets to find correlations between
            them
          </h2>
        ))}
    </Container>
  );
}

const Container = styled.div`
  & > p {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    gap: 12px;
    & > ol {
      padding-left: 24px;
    }
    & > .note {
      font-size: 1.25rem;
      font-style: italic;
      color: var(--light-green);
    }
  }
`;
