import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataIsNumber } from "../Functions/processData";
import { StemLeafTable } from "../Functions/skewAndOtherMath";

function Content({ title, data }) {
  const [Table, setTable] = useState();
  const [isNum, setIsNum] = useState();
  const [NthPlace, setNthPlace] = useState(0);

  useEffect(() => {
    setIsNum(dataIsNumber(data));
  }, [data]);

  useEffect(() => {
    if (isNum) {
      let DATA = StemLeafTable(data);
      setTable(DATA.table);
      setNthPlace(DATA.nthPlace);
      console.log(DATA);
    }
  }, [data, isNum]);

  console.log(
    Table,
    NthPlace,
    data.length,
    [...Table].map((el) => el.count).reduce((a, b) => a + b, 0)
  );

  return isNum && Table && NthPlace ? (
    <ContentContainer>
      <h1>Stem & Leaf Plot of "{title}":</h1>
      <div className="am_con">
        <div className="calculation">
          <table>
            <thead>
              <tr>
                <th>
                  Stem ({NthPlace}
                  <sup>th</sup>place)
                </th>
                <th colSpan={3}>Leaf (Unit Place)</th>
              </tr>
            </thead>
            <tbody>
              {React.Children.toArray(
                Table.map((item) => (
                  <tr>
                    <td>{item.key.toString()[0]}</td>
                    <td colSpan={3} className="text-left text-nowrap">
                      {item.array.map((el) => el - item.key).join("\t")} (
                      {item.array.length})
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* <p>
          <u>Comment:</u> The shape of the data "{title}" is
        </p> */}
      </div>
    </ContentContainer>
  ) : (
    <h1 className="comment">
      Can not perform calculation due to some error. Please check the console
      for more information, and report it{" "}
      <a
        href="https://github.com/Akhlak-Hossain-Jim/stat102/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
      .
    </h1>
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

export default function SteamAndLeafPlot({ data }) {
  return (
    <Container>
      <h1>Stem and Leaf Plot:</h1>
      <p>
        <u>Benefits:</u>
        <ol>
          <li>Median can be found easily.</li>
          <li>Individuality present.</li>
          <li>Skewness can be visualize easily.</li>
        </ol>
      </p>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => <Content data={el.data} title={el.name} />)
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
