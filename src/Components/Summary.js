import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import styled from "styled-components";

export default function Summary({ title, body }) {
  const [Show, setShow] = useState(false);
  return (
    <Container>
      <button className="title" onClick={() => setShow(!Show)}>
        {title} {Show ? <BsChevronDown /> : <BsChevronUp />}
      </button>
      {Show && <div className="body">{body}</div>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  & > button {
    background-color: transparent;
    border: none;
    outline: none;
    text-align: left;
    color: var(--light-green);
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 24px;
  }
  & > .body {
    animation: fad forwards 200ms ease-in-out;
    @keyframes fad {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;
