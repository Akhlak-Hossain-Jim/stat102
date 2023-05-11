import React, { useState } from "react";
import styled from "styled-components";
import Median from "./Median";
import Quartile from "../Components/Quartile";
import Decile from "../Components/Decile";
import Percentile from "../Components/Percentile";

export default function Quartiles({ data }) {
  const [CurrentNav, setCurrentNav] = useState(0);

  const NAVs = [
    {
      name: "Median",
      component: <Median data={data} />,
    },
    {
      name: "Quartile",
      component: <Quartile data={data} />,
    },
    {
      name: "Decile",
      component: <Decile data={data} />,
    },
    {
      name: "Percentile",
      component: <Percentile data={data} />,
    },
  ];
  return (
    <Container>
      <nav>
        {React.Children.toArray(
          NAVs.map((nav, index) => (
            <button
              className={`${index === CurrentNav ? "active" : ""}`}
              onClick={() => setCurrentNav(index)}
            >
              {nav.name}
            </button>
          ))
        )}
      </nav>
      {NAVs[CurrentNav].component}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  & > nav {
    display: flex;
    gap: 18px;
    width: 100%;
    overflow-y: auto;
    & > button {
      border: 1px solid var(--light-green);
      outline: none;
      background-color: transparent;
      color: var(--light-green);
      font-size: 1.2rem;
      font-weight: 500;
      padding: 6px 24px 7px;
      border-radius: 24px;
      &.active {
        background-color: var(--light-green);
        color: var(--dark);
      }
    }
  }
`;
