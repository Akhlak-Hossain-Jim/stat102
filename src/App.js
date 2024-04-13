import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppSidebar from "./Views/AppSidebar";
import ContentContainer from "./Components/ContentContainer";
import FrequencyTable from "./Views/FrequencyTable";
import { process } from "./Functions/processData";
import HistoGram from "./Views/HistoGram";
import ArithmeticMean from "./Views/ArithmeticMean";
import Median from "./Views/Median";
import Mode from "./Views/Mode";
import GeometricMean from "./Views/GeometricMean";
import HarmonicMean from "./Views/HarmonicMean";
import RandomGen from "./Views/RandomGen";
import BPD from "./Views/BPD";
import PoissonDis from "./Views/PoissonDis";
import Quartiles from "./Views/Quartiles";
import AbsoluteDispersion from "./Views/AbsoluteDispersion";
import RelativeDispersion from "./Views/RelativeDispersion";
import Skewness from "./Views/Skewness";
import SteamAndLeafPlot from "./Views/SteamAndLeafPlot";
import BoxPlot from "./Views/BoxPlot";
import Correlation from "./Views/Correlation";
import Regression from "./Views/Regression";
import ProbabilityDistribution from "./Views/ProbabilityDistribution";
import NormalDistribution from "./Views/NormalDistribution";
import ExponentialDistribution from "./Views/ExponentialDistribution";

export default function App() {
  const [DATA, setDATA] = useState();
  const [ProcessedDATA, setProcessedDATA] = useState();

  const NAVs = [
    {
      name: "Frequency Table",
      component: <FrequencyTable data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Graphical Presentation",
      component: <HistoGram data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Arithmetic Mean",
      component: <ArithmeticMean data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Median",
      component: <Median data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Mode",
      component: <Mode data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Geometric Mean",
      component: <GeometricMean data={ProcessedDATA} />,
      type: "gm",
    },
    {
      name: "Harmonic Mean",
      component: <HarmonicMean data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Quartiles",
      component: <Quartiles data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Absolute type Dispersion",
      component: <AbsoluteDispersion data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Relative type Dispersion",
      component: <RelativeDispersion data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Measures of Skewness",
      component: <Skewness data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Stem and Leaf Plot",
      component: <SteamAndLeafPlot data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Box Plot",
      component: <BoxPlot data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Correlation",
      component: <Correlation data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Regression, Error & Co-efficient",
      component: <Regression data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Probability Distribution",
      component: <ProbabilityDistribution data={ProcessedDATA} />,
      type: "normal",
    },
    {
      name: "Binomial Probability Distribution",
      component: <BPD />,
      type: "normal",
    },
    {
      name: "Poisson Distribution",
      component: <PoissonDis />,
      type: "normal",
    },
    {
      name: "Normal Distribution",
      component: <NormalDistribution />,
      type: "normal",
    },
    {
      name: "Exponential Distribution",
      component: <ExponentialDistribution />,
      type: "normal",
    },
    {
      name: "Random Data Generator",
      component: <RandomGen />,
      type: "normal",
    },
  ];

  // const [ActiveNav, setActiveNav] = useState(20);
  const [ActiveNav, setActiveNav] = useState(0);

  useEffect(() => {
    setProcessedDATA(DATA && process(DATA));
  }, [DATA]);
  // console.log(ProcessedDATA);

  return (
    <Container>
      <AppSidebar navArray={NAVs} cNav={ActiveNav} setCNav={setActiveNav} />
      {
        <ContentContainer
          tab={ActiveNav}
          pushData={setDATA}
          navArray={NAVs}
          form={ActiveNav < 16}
          type={NAVs[ActiveNav].type}
        >
          {NAVs[ActiveNav].component}
        </ContentContainer>
      }
    </Container>
  );
}

const Container = styled.div`
  width: min(1440px, 100%);
  height: 100dvh;
  overflow-y: hidden;
  margin: 0 auto;
  padding: 12px;
  display: grid;
  gap: 12px;
  grid-template-columns: 3fr 9fr;
  & > * {
    height: 100%;
    overflow-y: auto;
  }
  @media (max-width: 548px) {
    display: flex;
    flex-direction: column;
    gap: 24px;
    & > * {
      height: max-content;
    }
  }
`;
