import React from "react";
import styled from "styled-components";
import ArithmeticMeanComponent from "../Components/ArithmeticMeanComponent";

export default function ArithmeticMean({ data }) {
  return (
    <Container>
      <h1>Arithmetic Mean{data && data.length > 1 && "s"}:</h1>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => (
            <ArithmeticMeanComponent data={el.data} title={el.name} />
          ))
        )}
    </Container>
  );
}

const Container = styled.main`
  /* padding: 24px 0; */
`;
