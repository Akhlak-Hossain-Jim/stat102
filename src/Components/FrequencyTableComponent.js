import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  calculateN,
  cumulativeFrequencyLess,
  cumulativeFrequencyMore,
  relativeFrequency,
} from "../Functions/frequencyCalculation";
import { makeFrequencyObj } from "../Functions/processData";

export default function FrequencyTableComponent({ title, data }) {
  const [isNum, setIsNum] = useState();
  const [SET, setSET] = useState([]);
  const [Frequency, setFrequency] = useState();
  const [Sorted, setSorted] = useState();

  useEffect(() => {
    for (let el of data) {
      if (isNaN(el)) {
        setIsNum(false);
        break;
      } else {
        setIsNum(true);
      }
    }
  }, [data]);

  useEffect(() => {
    !isNum && setSET([...new Set(data)]);
  }, [isNum, data]);

  useEffect(() => {
    setFrequency(makeFrequencyObj(isNum, data));
    setSorted(makeFrequencyObj(isNum, data).sort((a, b) => b.count - a.count));
  }, [data, data.length, SET, isNum]);

  return (
    <Container>
      {SET.length === data.length ? (
        <p>All data is unique, nothing to show in frequency table.</p>
      ) : (
        Frequency &&
        Sorted && (
          <>
            <h1 className="table_heading">Frequency table of {title}</h1>
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Frequency</th>
                  <th>Relative Frequency</th>
                  <th>
                    Cumulative Frequency
                    <br />
                    (less than type)
                  </th>
                  <th>
                    Cumulative Frequency
                    <br />
                    (more than type)
                  </th>
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(
                  Frequency.map((item, index) => (
                    <tr>
                      <td>{item.class}</td>
                      <td>{item.count}</td>
                      <td>
                        {relativeFrequency(item.count, calculateN(Frequency))}
                      </td>
                      <td>
                        {cumulativeFrequencyLess(
                          Frequency,
                          index,
                          calculateN(Frequency)
                        )}
                      </td>
                      <td>
                        {cumulativeFrequencyMore(
                          Frequency,
                          index,
                          calculateN(Frequency)
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <p>n = {calculateN(Frequency)}</p>
            <div className="comment">
              <strong>
                <u>Comment:</u>
              </strong>{" "}
              In the table we have considered total of {calculateN(Frequency)}{" "}
              variation of {title}.{" "}
              {isNum &&
                "Where we took the class as exclusive and the gap as 10. "}
              Where variable is most condensed in {Sorted && Sorted[0].class}{" "}
              class, which is {Sorted && Sorted[0].count}.
            </div>
          </>
        )
      )}
    </Container>
  );
}

const Container = styled.div`
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
