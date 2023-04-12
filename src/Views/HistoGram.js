import React from "react";
import styled from "styled-components";
import HistogramComponent from "../Components/HistogramComponent";

export default function HistoGram({ data }) {
  return (
    <Container>
      <h1>Graphical Presentation{data && data.length > 1 && "s"}:</h1>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => (
            <>
              <HistogramComponent
                // key={el.name}
                data={el.data}
                title={el.name}
              />
            </>
          ))
        )}
    </Container>
  );
}

const Container = styled.main``;
