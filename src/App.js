import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppSidebar from "./Views/AppSidebar";
import ContentContainer from "./Components/ContentContainer";
import FrequencyTable from "./Views/FrequencyTable";
import { process } from "./Functions/processData";
import HistoGram from "./Views/HistoGram";

export default function App() {
  const [DATA, setDATA] = useState();
  const [ProcessedDATA, setProcessedDATA] = useState();

  const NAVs = [
    // {
    //   id: 1,
    //   name: "Identify Data Type",
    //   component: "",
    // },
    {
      name: "Frequency Table",
      component: <FrequencyTable data={ProcessedDATA} />,
    },
    {
      name: "Histogram",
      component: <HistoGram data={ProcessedDATA} />,
    },
    {
      name: "Arithmetic Mean",
      component: <HistoGram data={ProcessedDATA} />,
    },
    {
      name: "Median",
      component: <HistoGram data={ProcessedDATA} />,
    },
    {
      name: "Mode",
      component: <HistoGram data={ProcessedDATA} />,
    },
    {
      name: "GeoMetric Mean",
      component: <HistoGram data={ProcessedDATA} />,
    },
    {
      name: "Harmonic Mean",
      component: <HistoGram data={ProcessedDATA} />,
    },
  ];

  const [ActiveNav, setActiveNav] = useState(0);

  useEffect(() => {
    setProcessedDATA(DATA && process(DATA));
  }, [DATA]);
  // console.log(ProcessedDATA);

  return (
    <Container>
      <AppSidebar navArray={NAVs} cNav={ActiveNav} setCNav={setActiveNav} />
      <ContentContainer tab={ActiveNav} pushData={setDATA} navArray={NAVs}>
        {NAVs[ActiveNav].component}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  width: min(1440px, 100%);
  height: min(100dvh, 100vh);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 9fr;
`;
