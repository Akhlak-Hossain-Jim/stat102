import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function AppSidebar({ navArray, cNav, setCNav }) {
  const [HamStat, setHamStat] = useState(false);

  useEffect(() => {
    setHamStat(false);
  }, [cNav]);

  return (
    <>
      <Container className={HamStat ? "active" : ""}>
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
      <Ham onClick={() => setHamStat(!HamStat)}>
        <span className={HamStat ? "active" : ""}></span>
      </Ham>
      <Space>
        <a
          className="logo img"
          href="http://ahjim.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/logo.png" alt="ahjim logo" />
        </a>
      </Space>
    </>
  );
}

const Container = styled.aside`
  border-right: 1px solid gray;
  padding: 24px;
  display: flex;
  flex-direction: column;
  & > .logo {
    width: 100px;
    height: 46px;
    padding-bottom: 46px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
  }
  & > button.nav_item {
    border: none;
    outline: none;
    background: transparent;
    font-size: 1.4rem;
    text-align: start;
    color: var(--green);
    padding: 12px 0;
    cursor: pointer;
    &.active {
      color: var(--light);
    }
  }

  @media (max-width: 548px) {
    display: none;
    &.active {
      position: absolute;
      display: flex;
      background-color: var(--dark);
      height: 100dvh;
      overflow-y: auto;
    }
  }
`;

const Ham = styled.button`
  display: flex;
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: var(--dark-shadow-out);
  padding: 24px 10px;
  border-radius: 50%;
  height: max-content !important;
  @media (min-width: 549px) {
    display: none;
  }
  & > span {
    background-color: var(--green);
    width: 28px;
    height: 3px;
    position: relative;
    &::before,
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      background-color: var(--green);
      position: absolute;
      transition: all 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
      transform-origin: center;
    }
    &::before {
      top: -10px;
      left: 0;
    }
    &::after {
      bottom: -10px;
      left: 0;
    }
    &.active {
      background-color: transparent;
      &::before {
        top: 0;
        transform: rotate(45deg);
      }
      &::after {
        top: 0;
        transform: rotate(-45deg);
      }
    }
  }
`;

const Space = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  .logo {
    width: 100px;
    aspect-ratio: 100/46;
    margin: 0 auto 24px;
  }
  @media (min-width: 549px) {
    display: none;
  }
`;
