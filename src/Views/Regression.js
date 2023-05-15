import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import {
  findRegressionError,
  findRelation,
  findRelationType,
} from "../Functions/relationMath";
import Divide from "../Components/Divide";

function Content({ title, data, title2, data2 }) {
  const [isNum, setIsNum] = useState();
  const [XBar, setXBar] = useState();
  const [YBar, setYBar] = useState();
  const [Sxy, setSxy] = useState();
  const [Sx, setSx] = useState();
  const [ValA, setValA] = useState();
  const [ValB, setValB] = useState();
  const [YArr, setYArr] = useState();
  const [YCapArr, setYCapArr] = useState();
  const [Error, setError] = useState();
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
      let b = res.Sxy / (res.Sx * res.Sx);
      let a = res.yAvg - b * res.xAvg;
      let obj = findRegressionError(data2, a, b, data);
      setXBar(res.xAvg);
      setYBar(res.yAvg);
      setSxy(res.Sxy);
      setSx(res.Sx);
      setValA(a);
      setValB(b);
      setRel(res.r);
      setRelType(findRelationType(res.r));
      setYArr(obj.y);
      setYCapArr(obj.YCap);
      setError(obj.Sy);
      //   console.log(res, findRelationType(res.r));
    } else {
      setXBar();
      setYBar();
      setSxy();
      setSx();
      setValA();
      setValB();
      setRel();
      setRelType();
      setYArr();
      setYCapArr();
      setError();
    }
  }, [data, data2, isNum]);

  //   console.log(
  //     Math.ceil(percentOf(RelType, (5 / 6) * 100) / 10) * 10,
  //     RelType
  //   );

  return data.length === data2.length ? (
    isNum && XBar && YBar && Sxy && ValB && ValA && RelType && Sx ? (
      <ContentContainer>
        <>
          <h1>
            Explaining "{title2}" variables with the help of "{title}" variable:
          </h1>
          <div className="am_con">
            <p>
              Assuming the data set {title} as "x" and the data set {title2} as
              y. Change the serial in the input field if you want other wise.
            </p>
            <p>
              <u>Note:</u> choosing variables may affect this calculation.
            </p>
            <div className="calculation">
              <>
                <div className="math">
                  <h3>Here,</h3>
                  <var>Sx ={Sx.toFixed(4)}</var>
                  <var>
                    So, Sx<sup>2</sup> ={(Sx * Sx).toFixed(4)}
                  </var>
                  <var>Sxy ={Sxy.toFixed(4)}</var>
                  <var>x_bar = {XBar}</var>
                  <var>y_bar = {YBar}</var>
                </div>
                <br />
                <div className="math">
                  <h3>We know,</h3>
                  <var>
                    The Estimated regression equation is, y_cap = a + bx
                  </var>
                  <h3>Where,</h3>
                  <var>
                    b ={" "}
                    <Divide
                      a={<>Sxy</>}
                      b={
                        <>
                          Sx<sup>2</sup>
                        </>
                      }
                    />
                  </var>
                  <var>
                    b ={" "}
                    <Divide
                      a={<>{Sxy.toFixed(4)}</>}
                      b={<>{(Sx * Sx).toFixed(4)}</>}
                    />
                  </var>
                  <var>b = {ValB}</var>
                  <h3>And,</h3>
                  <var>a = y_bar - bx_bar</var>
                  <var>
                    a = {YBar} - {ValB}&times;{XBar}
                  </var>
                  <var>a = {ValA}</var>
                  <h3>So,</h3>
                  <var>y_cap = a + bx</var>
                  <var>
                    y_cap = {ValA} + {ValB}&times;x
                  </var>
                </div>
              </>
            </div>
            <p>
              <u>Comment:</u> For every {title}, the {title2} will increase{" "}
              {ValB} unit({title2}).
            </p>
            {/* <ScatterPlot x={data} y={data2} Values={Table} /> */}
          </div>
        </>
        {YArr && YCapArr && Error && (
          <>
            <h2>Standard error of estimate:</h2>
            <div className="am_con">
              <div className="calculation">
                <div className="math">
                  <h3>We know,</h3>
                  <var>
                    Sy = &radic;{" "}
                    <Divide
                      a={
                        <>
                          &sum;( y - y_cap )<sup>2</sup>
                        </>
                      }
                      b={<>n - 2</>}
                    />
                  </var>
                  <var>
                    Sy = &radic;{" "}
                    <Divide
                      a={React.Children.toArray(
                        YArr.map((el, i) => (
                          <>
                            ( {el} - {YCapArr[i].toFixed(2)} )<sup>2</sup>
                            {i !== data.length - 1 && " + "}
                          </>
                        ))
                      )}
                      b={<>{data.length} - 2</>}
                    />
                  </var>
                  <var>
                    Sy = &radic;{" "}
                    <Divide
                      a={React.Children.toArray(
                        YArr.map((el, i) => (
                          <>
                            ( {(el - YCapArr[i]).toFixed(2)} )<sup>2</sup>
                            {i !== data.length - 1 && " + "}
                          </>
                        ))
                      )}
                      b={<>{data.length - 2}</>}
                    />
                  </var>
                  <var>Sy = {Error.toFixed(2)}</var>
                </div>
              </div>
              <p>
                <u>Comment:</u> On average the gap between the estimated and the
                actual {title2} is {Error.toFixed(2)} unit({title2}).
              </p>
              {/* <ScatterPlot x={data} y={data2} Values={Table} /> */}
            </div>
          </>
        )}
        {Rel && (
          <>
            <h2>Co-efficient of Determination:</h2>
            <div className="am_con">
              <div className="calculation">
                <>
                  <div className="math">
                    <h3>
                      Co-efficient of Determination, R<sup>2</sup>
                    </h3>
                    <var>
                      R<sup>2</sup> = (Relation)<sup>2</sup>
                    </var>
                    <var>
                      R<sup>2</sup> = {(Rel * Rel).toFixed(4)}
                    </var>
                    <h3>Or,</h3>
                    <var>
                      R<sup>2</sup> = {(Rel * Rel * 100).toFixed(2)}%
                    </var>
                  </div>
                </>
              </div>
              <p>
                <u>Comment:</u> The variation in {title2} is{" "}
                {(Rel * Rel * 100).toFixed(2)}% explained by the variation in{" "}
                {title}.
              </p>
              {/* <ScatterPlot x={data} y={data2} Values={Table} /> */}
            </div>
          </>
        )}
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
    font-size: 1.5rem;
    text-decoration: underline;
    font-weight: 500;
    padding: 12px 0;
    color: var(--light-green);
    &.title {
      margin: 12px 0;
      padding: 6px 0;
      display: inline;
      width: max-content;
      border-bottom: 1px dashed var(--green);
    }
    & > strong {
      text-decoration: underline;
    }
  }
  & > h2 {
    font-size: 1.3rem;
    font-weight: 500;
    padding: 12px 24px;
    color: var(--light-green);
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

export default function Regression({ data }) {
  return (
    <Container>
      <h1>Regression between given data sets:</h1>
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
