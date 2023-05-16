import React from "react";
import styled from "styled-components";

export default function UD({ a, b }) {
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
  gap: 8px;
  & > div {
    text-align: right;
  }
`;
