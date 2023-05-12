import React, { useState } from "react";
import styled from "styled-components";
import CoEffRange from "../Components/RelativeTypeDispersion/CoEffRange";
import CoEffMeanDeviation from "../Components/RelativeTypeDispersion/CoEffMeanDeviation";
import CoEffQuartileDeviation from "../Components/RelativeTypeDispersion/CoEffQuartileDeviation";
import CoEffVariation from "../Components/RelativeTypeDispersion/CoEffVariation";

export default function RelativeDispersion({ data }) {
  const [CurrentNav, setCurrentNav] = useState(2);

  const NAVs = [
    {
      name: "Range",
      component: <CoEffRange data={data} />,
    },
    {
      name: "Mean Deviation",
      component: <CoEffMeanDeviation data={data} />,
    },
    {
      name: "Quartile Deviation",
      component: <CoEffQuartileDeviation data={data} />,
    },
    {
      name: "Variation",
      component: <CoEffVariation data={data} />,
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
