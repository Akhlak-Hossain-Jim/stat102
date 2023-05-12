import React, { useState } from "react";
import styled from "styled-components";
import Range from "../Components/Range";
import MeanDeviation from "../Components/MeanDeviation";
import StandardDeviation from "../Components/StandardDeviation";
import QuartileDeviation from "../Components/QuartileDeviation";
import Variance from "../Components/Variance";

export default function AbsoluteDispersion({ data }) {
  const [CurrentNav, setCurrentNav] = useState(0);

  const NAVs = [
    {
      name: "Range",
      component: <Range data={data} />,
    },
    {
      name: "Mean Deviation",
      component: <MeanDeviation data={data} />,
    },
    {
      name: "Standard Deviation",
      component: <StandardDeviation data={data} />,
    },
    {
      name: "Quartile Deviation",
      component: <QuartileDeviation data={data} />,
    },
    {
      name: "Variance",
      component: <Variance data={data} />,
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
      white-space: nowrap;
      &.active {
        background-color: var(--light-green);
        color: var(--dark);
      }
    }
  }
`;
