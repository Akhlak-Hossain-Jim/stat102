import React from "react";
import styled from "styled-components";
import FrequencyTableComponent from "../Components/FrequencyTableComponent";

export default function FrequencyTable({ data }) {
  return (
    <Container>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => (
            <FrequencyTableComponent data={el.data} title={el.name} />
          ))
        )}
    </Container>
  );
}

const Container = styled.main``;
