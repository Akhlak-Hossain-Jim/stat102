import React from "react";
import styled from "styled-components";
import MedianModeComponent from "../Components/MedianModeComponent";

export default function Median({ data }) {
  return (
    <Container>
      <h1>Median{data && data.length > 1 && "s"}:</h1>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        React.Children.toArray(
          data.map((el) => (
            <MedianModeComponent
              calculate="median"
              data={el.data}
              title={el.name}
            />
          ))
        )}
    </Container>
  );
}

const Container = styled.div``;
