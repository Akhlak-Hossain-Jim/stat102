import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MeanContent = ({ title, data }) => {
  const [IsString, setIsString] = useState(false);
  const [Sum, setSum] = useState();

  useEffect(() => {
    let isNum;
    for (let el of data) {
      if (isNaN(el)) {
        isNum = false;
        break;
      } else {
        isNum = true;
      }
    }
    setIsString(isNum);
    if (isNum) {
      let sum = 0;
      for (let el of data) {
        let a = 1 / el;
        sum += a;
      }
      setSum(sum);
    }
  }, [data]);

  return (
    <Content>
      {IsString ? (
        <>
          <h1 className="table_heading">Harmonic Mean of "{title}":</h1>
          <div className="math">
            <var>We know,</var>
            <var>
              H.M = n / ( 1/x<sub>1</sub> + 1/x<sub>2</sub> + 1/x
              <sub>3</sub> + ... + 1/x<sub>n</sub> )
            </var>
            <var>
              H.M = {data.length} / ({" "}
              {React.Children.toArray(
                data.map((x, i) => (
                  <>
                    1/ {x}
                    {i !== data.length - 1 && ` + `}
                  </>
                ))
              )}{" "}
              )
            </var>
            <var>
              H.M = {data.length} / ( {Sum} )
            </var>
            <var>H.M = {(data.length / Sum).toFixed(2)}</var>
          </div>
          <div className="comment">
            <p>
              <span>Comment:</span> On the given data set, the average speed is
              "<var>{(data.length / Sum).toFixed(2)}</var>
              ".
            </p>
          </div>
        </>
      ) : (
        <p className="wrong">
          Can't Do <i>Harmonic Mean</i> on the categorical "{title}" Data.
        </p>
      )}
    </Content>
  );
};

export default function HarmonicMean({ data }) {
  return (
    <Container>
      <h1>Harmonic Mean</h1>
      <p>
        <u>Use:</u>
        <ol>
          <li>To calculate the Average of speed data.</li>
          <li>
            Speed also mean "some data / some data". Example: 4 call/hour, 4
            products/person
          </li>
        </ol>
        {/* <span className="note">
          <u>Note:</u> Remove all data from the input box to see the accepted
          data input format.
        </span> */}
      </p>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => <MeanContent data={el.data} title={el.name} />)
        )}
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
