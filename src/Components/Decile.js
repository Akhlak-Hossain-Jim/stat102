import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import Divide from "./Divide";

function Content({ title, data }) {
  const [isNum, setIsNum] = useState();
  const [SortedValue, setSortedValue] = useState();
  const [D1, setD1] = useState();
  const [D2, setD2] = useState();
  const [D3, setD3] = useState();
  const [D4, setD4] = useState();
  const [D5, setD5] = useState();
  const [D6, setD6] = useState();
  const [D7, setD7] = useState();
  const [D8, setD8] = useState();
  const [D9, setD9] = useState();

  useEffect(() => {
    setIsNum(dataIsNumber(data));
  }, [data]);
  useEffect(() => {
    if (isNum) {
      let a = [...data].map((el) => Number(el)).sort((a, b) => a - b);
      setSortedValue(a);
    }
  }, [data, isNum]);

  useEffect(() => {
    if (SortedValue && Array.isArray(SortedValue) && SortedValue.length > 0) {
      let d1 = ((SortedValue.length + 1) / 100) * 10;
      let d2 = ((SortedValue.length + 1) / 100) * 20;
      let d3 = ((SortedValue.length + 1) / 100) * 30;
      let d4 = ((SortedValue.length + 1) / 100) * 40;
      let d5 = ((SortedValue.length + 1) / 100) * 50;
      let d6 = ((SortedValue.length + 1) / 100) * 60;
      let d7 = ((SortedValue.length + 1) / 100) * 70;
      let d8 = ((SortedValue.length + 1) / 100) * 80;
      let d9 = ((SortedValue.length + 1) / 100) * 90;
      setD1(d1);
      setD2(d2);
      setD3(d3);
      setD4(d4);
      setD5(d5);
      setD6(d6);
      setD7(d7);
      setD8(d8);
      setD9(d9);
    }
  }, [SortedValue]);

  return (
    SortedValue && (
      <ContentContainer>
        {isNum ? (
          <>
            {/* <QuartileGraph>
              <div className="identify">
                <span>min</span>
                <span>
                  D1 <br />(
                  {(
                    SortedValue[Math.floor(D1) - 1] +
                    (D1 - Math.floor(D1)) *
                      (SortedValue[Math.floor(D1)] -
                        SortedValue[Math.floor(D1) - 1])
                  ).toFixed(2)}
                  )
                </span>
                <span>
                  D2 <br />(
                  {(
                    SortedValue[Math.floor(D2) - 1] +
                    (D2 - Math.floor(D2)) *
                      (SortedValue[Math.floor(D2)] -
                        SortedValue[Math.floor(D2) - 1])
                  ).toFixed(2)}
                  )
                </span>
                <span>
                  D3 <br />(
                  {(
                    SortedValue[Math.floor(D3) - 1] +
                    (D3 - Math.floor(D3)) *
                      (SortedValue[Math.floor(D3)] -
                        SortedValue[Math.floor(D3) - 1])
                  ).toFixed(2)}
                  )
                </span>
                <span>
                  D4 <br />(
                  {(
                    SortedValue[Math.floor(D4) - 1] +
                    (D4 - Math.floor(D4)) *
                      (SortedValue[Math.floor(D4)] -
                        SortedValue[Math.floor(D4) - 1])
                  ).toFixed(2)}
                  )
                </span>
                <span className="center">
                  D5 <br />(
                  {(
                    SortedValue[Math.floor(D5) - 1] +
                    (D5 - Math.floor(D5)) *
                      (SortedValue[Math.floor(D5)] -
                        SortedValue[Math.floor(D5) - 1])
                  ).toFixed(2)}
                  )
                </span>
                <span>
                  D6 <br />(
                  {(
                    SortedValue[Math.floor(D6) - 1] +
                    (D6 - Math.floor(D6)) *
                      (SortedValue[Math.floor(D6)] -
                        SortedValue[Math.floor(D6) - 1])
                  ).toFixed(2)}
                  )
                </span>
                <span>
                  D7 <br />(
                  {(
                    SortedValue[Math.floor(D7) - 1] +
                    (D7 - Math.floor(D7)) *
                      (SortedValue[Math.floor(D7)] -
                        SortedValue[Math.floor(D7) - 1])
                  ).toFixed(2)}
                  )
                </span>
                <span>
                  D8 <br />(
                  {(
                    SortedValue[Math.floor(D8) - 1] +
                    (D8 - Math.floor(D8)) *
                      (SortedValue[Math.floor(D8)] -
                        SortedValue[Math.floor(D8) - 1])
                  ).toFixed(2)}
                  )
                </span>
                <span>
                  D9 <br />(
                  {(
                    SortedValue[Math.floor(D9) - 1] +
                    (D9 - Math.floor(D9)) *
                      (SortedValue[Math.floor(D9)] -
                        SortedValue[Math.floor(D9) - 1])
                  ).toFixed(2)}
                  )
                </span>
                <span>max</span>
              </div>
              <div className="graphical">
                <div className="graph">
                  <div className="divider">10%</div>
                  <div className="divider">10%</div>
                  <div className="divider">10%</div>
                  <div className="divider">10%</div>
                  <div className="divider">10%</div>
                  <div className="divider">10%</div>
                  <div className="divider">10%</div>
                  <div className="divider">10%</div>
                  <div className="divider">10%</div>
                  <div className="divider">10%</div>
                </div>
              </div>
            </QuartileGraph> */}
            {D1 && (
              <>
                <h1 className="title">D1 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        D1 = (<Divide a={<>N + 1</>} b={100} /> x 10)
                        <sup>th</sup> value
                      </var>
                      <var>
                        D1 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        10)<sup>th</sup> value
                      </var>
                      <var>D1 = {D1}</var>
                    </div>
                    {Number.isInteger(D1) ? (
                      <div className="math">
                        <var>D1 = {SortedValue[D1 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            D1 = {SortedValue[Math.floor(D1) - 1]} +{" "}
                            {`{${D1 - Math.floor(D1)} x (${
                              SortedValue[Math.floor(D1)]
                            } - ${SortedValue[Math.floor(D1) - 1]})}`}
                          </var>
                          <var>
                            D1 = {SortedValue[Math.floor(D1) - 1]} + (
                            {D1 - Math.floor(D1)} x{" "}
                            {SortedValue[Math.floor(D1)] -
                              SortedValue[Math.floor(D1) - 1]}
                            )
                          </var>
                          <var>
                            D1 ={" "}
                            {SortedValue[Math.floor(D1) - 1] +
                              (D1 - Math.floor(D1)) *
                                (SortedValue[Math.floor(D1)] -
                                  SortedValue[Math.floor(D1) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> There is 10% of data in {title} is less than{" "}
                    {SortedValue[Math.floor(D1) - 1] +
                      (D1 - Math.floor(D1)) *
                        (SortedValue[Math.floor(D1)] -
                          SortedValue[Math.floor(D1) - 1])}
                    .
                  </p>
                </div>
              </>
            )}
            {D2 && (
              <>
                <h1 className="title">D2 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        D2 = (<Divide a={<>N + 1</>} b={100} /> x 20)
                        <sup>th</sup> value
                      </var>
                      <var>
                        D2 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        20)<sup>th</sup> value
                      </var>
                      <var>D2 = {D2}</var>
                    </div>
                    {Number.isInteger(D2) ? (
                      <div className="math">
                        <var>D2 = {SortedValue[D2 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            D2 = {SortedValue[Math.floor(D2) - 1]} +{" "}
                            {`{${D2 - Math.floor(D2)} x (${
                              SortedValue[Math.floor(D2)]
                            } - ${SortedValue[Math.floor(D2) - 1]})}`}
                          </var>
                          <var>
                            D2 = {SortedValue[Math.floor(D2) - 1]} + (
                            {D2 - Math.floor(D2)} x{" "}
                            {SortedValue[Math.floor(D2)] -
                              SortedValue[Math.floor(D2) - 1]}
                            )
                          </var>
                          <var>
                            D2 ={" "}
                            {SortedValue[Math.floor(D2) - 1] +
                              (D2 - Math.floor(D2)) *
                                (SortedValue[Math.floor(D2)] -
                                  SortedValue[Math.floor(D2) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> There is 20% of data in {title} is less than{" "}
                    {SortedValue[Math.floor(D2) - 1] +
                      (D2 - Math.floor(D2)) *
                        (SortedValue[Math.floor(D2)] -
                          SortedValue[Math.floor(D2) - 1])}
                    .
                  </p>
                </div>
              </>
            )}
            {D3 && (
              <>
                <h1 className="title">D3 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        D3 = (<Divide a={<>N + 1</>} b={100} /> x 30)
                        <sup>th</sup> value
                      </var>
                      <var>
                        D3 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        30)<sup>th</sup> value
                      </var>
                      <var>D3 = {D3}</var>
                    </div>
                    {Number.isInteger(D3) ? (
                      <div className="math">
                        <var>D3 = {SortedValue[D3 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            D3 = {SortedValue[Math.floor(D3) - 1]} +{" "}
                            {`{${D3 - Math.floor(D3)} x (${
                              SortedValue[Math.floor(D3)]
                            } - ${SortedValue[Math.floor(D3) - 1]})}`}
                          </var>
                          <var>
                            D3 = {SortedValue[Math.floor(D3) - 1]} + (
                            {D3 - Math.floor(D3)} x{" "}
                            {SortedValue[Math.floor(D3)] -
                              SortedValue[Math.floor(D3) - 1]}
                            )
                          </var>
                          <var>
                            D3 ={" "}
                            {SortedValue[Math.floor(D3) - 1] +
                              (D3 - Math.floor(D3)) *
                                (SortedValue[Math.floor(D3)] -
                                  SortedValue[Math.floor(D3) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> There is 30% of data in {title} is less than{" "}
                    {SortedValue[Math.floor(D3) - 1] +
                      (D3 - Math.floor(D3)) *
                        (SortedValue[Math.floor(D3)] -
                          SortedValue[Math.floor(D3) - 1])}
                    .
                  </p>
                </div>
              </>
            )}
            {D4 && (
              <>
                <h1 className="title">D4 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        D4 = (<Divide a={<>N + 1</>} b={100} /> x 40)
                        <sup>th</sup> value
                      </var>
                      <var>
                        D4 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        40)<sup>th</sup> value
                      </var>
                      <var>D4 = {D4}</var>
                    </div>
                    {Number.isInteger(D4) ? (
                      <div className="math">
                        <var>D4 = {SortedValue[D4 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            D4 = {SortedValue[Math.floor(D4) - 1]} +{" "}
                            {`{${D4 - Math.floor(D4)} x (${
                              SortedValue[Math.floor(D4)]
                            } - ${SortedValue[Math.floor(D4) - 1]})}`}
                          </var>
                          <var>
                            D4 = {SortedValue[Math.floor(D4) - 1]} + (
                            {D4 - Math.floor(D4)} x{" "}
                            {SortedValue[Math.floor(D4)] -
                              SortedValue[Math.floor(D4) - 1]}
                            )
                          </var>
                          <var>
                            D4 ={" "}
                            {SortedValue[Math.floor(D4) - 1] +
                              (D4 - Math.floor(D4)) *
                                (SortedValue[Math.floor(D4)] -
                                  SortedValue[Math.floor(D4) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> There is 40% of data in {title} is less than{" "}
                    {SortedValue[Math.floor(D4) - 1] +
                      (D4 - Math.floor(D4)) *
                        (SortedValue[Math.floor(D4)] -
                          SortedValue[Math.floor(D4) - 1])}
                    .
                  </p>
                </div>
              </>
            )}
            {D5 && (
              <>
                <h1 className="title">D5 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        D5 = (<Divide a={<>N + 1</>} b={100} /> x 50)
                        <sup>th</sup> value
                      </var>
                      <var>
                        D5 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        50)<sup>th</sup> value
                      </var>
                      <var>D5 = {D5}</var>
                    </div>
                    {Number.isInteger(D5) ? (
                      <div className="math">
                        <var>D5 = {SortedValue[D5 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            D5 = {SortedValue[Math.floor(D5) - 1]} +{" "}
                            {`{${D5 - Math.floor(D5)} x (${
                              SortedValue[Math.floor(D5)]
                            } - ${SortedValue[Math.floor(D5) - 1]})}`}
                          </var>
                          <var>
                            D5 = {SortedValue[Math.floor(D5) - 1]} + (
                            {D5 - Math.floor(D5)} x{" "}
                            {SortedValue[Math.floor(D5)] -
                              SortedValue[Math.floor(D5) - 1]}
                            )
                          </var>
                          <var>
                            D5 ={" "}
                            {SortedValue[Math.floor(D5) - 1] +
                              (D5 - Math.floor(D5)) *
                                (SortedValue[Math.floor(D5)] -
                                  SortedValue[Math.floor(D5) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> There is 50% of data in {title} is less than{" "}
                    {SortedValue[Math.floor(D5) - 1] +
                      (D5 - Math.floor(D5)) *
                        (SortedValue[Math.floor(D5)] -
                          SortedValue[Math.floor(D5) - 1])}
                    , and rest is greater than that.
                  </p>
                </div>
              </>
            )}
            {D6 && (
              <>
                <h1 className="title">D6 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        D6 = (<Divide a={<>N + 1</>} b={100} /> x 60)
                        <sup>th</sup> value
                      </var>
                      <var>
                        D6 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        60)<sup>th</sup> value
                      </var>
                      <var>D6 = {D6}</var>
                    </div>
                    {Number.isInteger(D6) ? (
                      <div className="math">
                        <var>D6 = {SortedValue[D6 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            D6 = {SortedValue[Math.floor(D6) - 1]} +{" "}
                            {`{${D6 - Math.floor(D6)} x (${
                              SortedValue[Math.floor(D6)]
                            } - ${SortedValue[Math.floor(D6) - 1]})}`}
                          </var>
                          <var>
                            D6 = {SortedValue[Math.floor(D6) - 1]} + (
                            {D6 - Math.floor(D6)} x{" "}
                            {SortedValue[Math.floor(D6)] -
                              SortedValue[Math.floor(D6) - 1]}
                            )
                          </var>
                          <var>
                            D6 ={" "}
                            {SortedValue[Math.floor(D6) - 1] +
                              (D6 - Math.floor(D6)) *
                                (SortedValue[Math.floor(D6)] -
                                  SortedValue[Math.floor(D6) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> The top 40% of data in {title} is more than{" "}
                    {SortedValue[Math.floor(D6) - 1] +
                      (D6 - Math.floor(D6)) *
                        (SortedValue[Math.floor(D6)] -
                          SortedValue[Math.floor(D6) - 1])}
                    .
                  </p>
                </div>
              </>
            )}
            {D7 && (
              <>
                <h1 className="title">D7 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        D7 = (<Divide a={<>N + 1</>} b={100} /> x 20)
                        <sup>th</sup> value
                      </var>
                      <var>
                        D7 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        20)<sup>th</sup> value
                      </var>
                      <var>D7 = {D7}</var>
                    </div>
                    {Number.isInteger(D7) ? (
                      <div className="math">
                        <var>D7 = {SortedValue[D7 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            D7 = {SortedValue[Math.floor(D7) - 1]} +{" "}
                            {`{${D7 - Math.floor(D7)} x (${
                              SortedValue[Math.floor(D7)]
                            } - ${SortedValue[Math.floor(D7) - 1]})}`}
                          </var>
                          <var>
                            D7 = {SortedValue[Math.floor(D7) - 1]} + (
                            {D7 - Math.floor(D7)} x{" "}
                            {SortedValue[Math.floor(D7)] -
                              SortedValue[Math.floor(D7) - 1]}
                            )
                          </var>
                          <var>
                            D7 ={" "}
                            {SortedValue[Math.floor(D7) - 1] +
                              (D7 - Math.floor(D7)) *
                                (SortedValue[Math.floor(D7)] -
                                  SortedValue[Math.floor(D7) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> The top 30% of data in {title} is more than{" "}
                    {SortedValue[Math.floor(D7) - 1] +
                      (D7 - Math.floor(D7)) *
                        (SortedValue[Math.floor(D7)] -
                          SortedValue[Math.floor(D7) - 1])}
                    .
                  </p>
                </div>
              </>
            )}
            {D8 && (
              <>
                <h1 className="title">D8 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        D8 = (<Divide a={<>N + 1</>} b={100} /> x 80)
                        <sup>th</sup> value
                      </var>
                      <var>
                        D8 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        80)<sup>th</sup> value
                      </var>
                      <var>D8 = {D8}</var>
                    </div>
                    {Number.isInteger(D8) ? (
                      <div className="math">
                        <var>D8 = {SortedValue[D8 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            D8 = {SortedValue[Math.floor(D8) - 1]} +{" "}
                            {`{${D8 - Math.floor(D8)} x (${
                              SortedValue[Math.floor(D8)]
                            } - ${SortedValue[Math.floor(D8) - 1]})}`}
                          </var>
                          <var>
                            D8 = {SortedValue[Math.floor(D8) - 1]} + (
                            {D8 - Math.floor(D8)} x{" "}
                            {SortedValue[Math.floor(D8)] -
                              SortedValue[Math.floor(D8) - 1]}
                            )
                          </var>
                          <var>
                            D8 ={" "}
                            {SortedValue[Math.floor(D8) - 1] +
                              (D8 - Math.floor(D8)) *
                                (SortedValue[Math.floor(D8)] -
                                  SortedValue[Math.floor(D8) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> The top 20% of data in {title} is more than{" "}
                    {SortedValue[Math.floor(D8) - 1] +
                      (D8 - Math.floor(D8)) *
                        (SortedValue[Math.floor(D8)] -
                          SortedValue[Math.floor(D8) - 1])}
                    .
                  </p>
                </div>
              </>
            )}
            {D9 && (
              <>
                <h1 className="title">D9 of {title && title}:</h1>
                <div className="am_con">
                  <div className="calculation">
                    <div className="math">
                      <var>
                        D9 = (<Divide a={<>N + 1</>} b={100} /> x 90)
                        <sup>th</sup> value
                      </var>
                      <var>
                        D9 = (
                        <Divide a={<>{SortedValue.length} + 1</>} b={100} /> x
                        90)<sup>th</sup> value
                      </var>
                      <var>D9 = {D9}</var>
                    </div>
                    {Number.isInteger(D9) ? (
                      <div className="math">
                        <var>D9 = {SortedValue[D9 - 1]}</var>
                      </div>
                    ) : (
                      <>
                        <div className="math">
                          <var>
                            D9 = {SortedValue[Math.floor(D9) - 1]} +{" "}
                            {`{${D9 - Math.floor(D9)} x (${
                              SortedValue[Math.floor(D9)]
                            } - ${SortedValue[Math.floor(D9) - 1]})}`}
                          </var>
                          <var>
                            D9 = {SortedValue[Math.floor(D9) - 1]} + (
                            {D9 - Math.floor(D9)} x{" "}
                            {SortedValue[Math.floor(D9)] -
                              SortedValue[Math.floor(D9) - 1]}
                            )
                          </var>
                          <var>
                            D9 ={" "}
                            {SortedValue[Math.floor(D9) - 1] +
                              (D9 - Math.floor(D9)) *
                                (SortedValue[Math.floor(D9)] -
                                  SortedValue[Math.floor(D9) - 1])}
                          </var>
                        </div>
                      </>
                    )}
                  </div>
                  <p>
                    <u>Comment:</u> The top 10% of data in {title} is more than{" "}
                    {SortedValue[Math.floor(D9) - 1] +
                      (D9 - Math.floor(D9)) *
                        (SortedValue[Math.floor(D9)] -
                          SortedValue[Math.floor(D9) - 1])}
                    .
                  </p>
                </div>
              </>
            )}
          </>
        ) : (
          <h1 className="comment">
            Can not perform <strong>Decile</strong> calculation on "{title}"
            data set, as the data is not numerical or categorical data
          </h1>
        )}
      </ContentContainer>
    )
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
      width: max-content;
      border-bottom: 1px dashed var(--green);
    }
    & > strong {
      text-decoration: underline;
    }
  }
  & > .am_con {
    display: flex;
    flex-direction: column;
    gap: 24px;
    & > .choose_nType {
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

// const QuartileGraph = styled.div`
//   & > .identify {
//     display: grid;
//     grid-template-columns: repeat(12, 1fr);
//     & > span {
//       text-align: center;
//       &:first-child {
//         text-align: left;
//       }
//       &:last-child {
//         text-align: right;
//       }
//       &.center {
//         grid-column: 6 / span 2;
//       }
//     }
//   }
//   & > .graphical {
//     display: flex;
//     align-items: center;
//     width: 100%;
//     gap: 8px;
//     & > .graph {
//       width: 100%;
//       position: relative;
//       display: grid;
//       grid-template-columns: repeat(10, 1fr);
//       align-items: center;
//       padding: 24px 0;
//       &::before,
//       &::after {
//         content: "";
//         position: absolute;
//         width: 2px;
//         height: 100%;
//         background-color: var(--light-green);
//         top: 0;
//       }
//       &::after {
//         right: 0;
//       }
//       & > .divider {
//         position: relative;
//         height: 2px;
//         width: 100%;
//         background-color: var(--light-green);
//         text-align: center;
//         &::after {
//           content: "";
//           position: absolute;
//           width: 2px;
//           height: 20px;
//           background-color: var(--light-green);
//           bottom: 0;
//           left: 0;
//         }
//       }
//     }
//   }
// `;

export default function Decile({ data }) {
  return (
    <Container>
      <h1>Deciles {data && data.length > 1 ? "s" : ""}:</h1>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => <Content data={el.data} title={el.name} />)
        )}
    </Container>
  );
}
const Container = styled.div``;
