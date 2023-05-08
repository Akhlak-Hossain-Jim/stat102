import React from "react";
import styled from "styled-components";

export default function Divide({ a, b }) {
  return (
    <Container>
      <div>{a}</div>
      <div>{b}</div>
    </Container>
  );
}

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  & > div {
    text-align: center;
    &:first-child {
      border-bottom: 1px solid;
      padding-bottom: 4px;
    }
  }
`;
