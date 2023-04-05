import React from "react";
import styled from "styled-components";

export default function AppSidebar({ navArray, cNav, setCNav }) {
  return (
    <Container>
      <a
        className="logo img"
        href="http://ahjim.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/logo.png" alt="ahjim logo" />
      </a>
      {React.Children.toArray(
        navArray.map((nav, index) => (
          <button
            className={`nav_item ${index === cNav ? "active" : ""}`}
            onClick={() => setCNav(index)}
          >
            {nav.name}
          </button>
        ))
      )}
    </Container>
  );
}

const Container = styled.aside`
  border-right: 1px solid gray;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .logo {
    width: 100px;
    aspect-ratio: 100/46;
    margin: 0 auto 24px;
  }
  & > button.nav_item {
    border: none;
    outline: none;
    background: transparent;
    font-size: 1.4rem;
    text-align: start;
    color: var(--green);
    padding: 12px 0;
    &.active {
      color: var(--light);
    }
  }
`;
