import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber, makeFrequencyObj } from "../Functions/processData";
import { calculateN } from "../Functions/frequencyCalculation";

function Content({ title, data }) {
  const [isNum, setIsNum] = useState();
  const [SET, setSET] = useState([]);
  const [Frequency, setFrequency] = useState();
  const [XSum, setXSum] = useState();

  useEffect(() => {
    setIsNum(dataIsNumber(data));
  }, [data]);

  useEffect(() => {
    !isNum && setSET([...new Set(data)]);
  }, [isNum, data]);

  useEffect(() => {
    let res = makeFrequencyObj(isNum, data);
    setFrequency(res);
    setXSum([...res].map((el) => el.count).reduce((a, b) => a + b, 0));
  }, [data, data.length, SET, isNum]);

  return (
    <ContentContainer>
      {SET.length === data.length ? (
        <p>All data is unique, nothing to show in frequency table.</p>
      ) : (
        Frequency && (
          <>
            <h1 className="table_heading">Frequency table of {title}</h1>
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Frequency</th>
                  <th>P(x)</th>
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(
                  Frequency.map((item, index) => (
                    <tr>
                      <td>{item.class}</td>
                      <td>{item.count}</td>
                      <td>
                        {item.count}/{XSum} (
                        {((item.count / XSum) * 100).toFixed(2)}%)
                      </td>
                    </tr>
                  ))
                )}
                <tr>
                  <td>n = {calculateN(Frequency)}</td>
                  <td>&sum;x = {XSum}</td>
                  <td>&sum; = 1</td>
                </tr>
              </tbody>
            </table>
            <p>n = {calculateN(Frequency)}</p>
          </>
        )
      )}
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 0;
  & > .table_heading {
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

export default function ProbabilityDistribution({ data }) {
  return (
    <Container>
      <h1>Probability Distribution{data && data.length > 1 && "s"}:</h1>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => <Content data={el.data} title={el.name} />)
        )}
    </Container>
  );
}

const Container = styled.main``;
