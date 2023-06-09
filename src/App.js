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
      name: "Random Data Generator",
      component: <RandomGen />,
    },
    {
      name: "Frequency Table",
      component: <FrequencyTable data={ProcessedDATA} />,
    },
    {
      name: "Graphical Presentation",
      component: <HistoGram data={ProcessedDATA} />,
    },
    {
      name: "Arithmetic Mean",
      component: <ArithmeticMean data={ProcessedDATA} />,
    },
    {
      name: "Median",
      component: <Median data={ProcessedDATA} />,
    },
    {
      name: "Mode",
      component: <Mode data={ProcessedDATA} />,
    },
    {
      name: "GeoMetric Mean",
      component: <GeometricMean data={ProcessedDATA} />,
    },
    {
      name: "Harmonic Mean",
      component: <HarmonicMean data={ProcessedDATA} />,
    },
    {
      name: "Quartiles",
      component: <Quartiles data={ProcessedDATA} />,
    },
    {
      name: "Absolute type Dispersion",
      component: <AbsoluteDispersion data={ProcessedDATA} />,
    },
    {
      name: "Relative type Dispersion",
      component: <RelativeDispersion data={ProcessedDATA} />,
    },
    {
      name: "Measures of Skewness",
      component: <Skewness data={ProcessedDATA} />,
    },
    {
      name: "Stem and Leaf Plot",
      component: <SteamAndLeafPlot data={ProcessedDATA} />,
    },
    {
      name: "Box Plot",
      component: <BoxPlot data={ProcessedDATA} />,
    },
    {
      name: "Correlation",
      component: <Correlation data={ProcessedDATA} />,
    },
    {
      name: "Regression, Error & Co-efficient",
      component: <Regression data={ProcessedDATA} />,
    },
    {
      name: "Probability Distribution",
      component: <ProbabilityDistribution data={ProcessedDATA} />,
    },
    {
      name: "Binomial Probability Distribution",
      component: <BPD />,
    },
    {
      name: "Poisson Distribution",
      component: <PoissonDis />,
    },
    {
      name: "Normal Distribution",
      component: <NormalDistribution />,
    },
    {
      name: "Exponential Distribution",
      component: <ExponentialDistribution />,
    },
  ];

  // const NAVsP = {
  //   frequencyTable: {
  //     name: "Frequency Table",
  //     handle: "frequencyTable",
  //     component: <FrequencyTable data={ProcessedDATA} />,
  //   },
  //   graphicalPresentation: {
  //     name: "Graphical Presentation",
  //     handle: "graphicalPresentation",
  //     component: <HistoGram data={ProcessedDATA} />,
  //   },
  //   as: {
  //     name: "Arithmetic Mean",
  //     component: <ArithmeticMean data={ProcessedDATA} />,
  //   },
  //   has: {
  //     name: "Median",
  //     component: <Median data={ProcessedDATA} />,
  //   },
  //   nas: {
  //     name: "Mode",
  //     component: <Mode data={ProcessedDATA} />,
  //   },
  //   ljas: {
  //     name: "GeoMetric Mean",
  //     component: <GeometricMean data={ProcessedDATA} />,
  //   },
  //   al: {
  //     name: "Harmonic Mean",
  //     component: <HarmonicMean data={ProcessedDATA} />,
  //   },
  // };

  // const [ActiveNav, setActiveNav] = useState(20);
  const [ActiveNav, setActiveNav] = useState(0);

  useEffect(() => {
    setProcessedDATA(DATA && process(DATA));
  }, [DATA]);
  // console.log(ProcessedDATA);

  return (
    <Container>
      <AppSidebar navArray={NAVs} cNav={ActiveNav} setCNav={setActiveNav} />
      {ActiveNav !== 0 && ActiveNav < 17 ? (
        <ContentContainer tab={ActiveNav} pushData={setDATA} navArray={NAVs}>
          {NAVs[ActiveNav].component}
        </ContentContainer>
      ) : (
        NAVs[ActiveNav].component
      )}
    </Container>
  );
}

const Container = styled.div`
  width: min(1440px, 100%);
  height: 100dvh;
  overflow-y: hidden;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 9fr;
  @media (max-width: 548px) {
    grid-template-columns: 1fr;
  }
  & > * {
    height: 100%;
    overflow-y: auto;
  }
`;
