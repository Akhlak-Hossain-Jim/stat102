import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function AppSidebar({ navArray, cNav, setCNav }) {
  const [HamStat, setHamStat] = useState(false);

  useEffect(() => {
    setHamStat(false);
  }, [cNav]);

  return (
    <>
      <Space>
        <a
          className="logo"
          href="http://ahjim.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/logo.png" alt="ahjim logo" />
        </a>
      </Space>
      <Container className={HamStat ? "active" : ""}>
        <a
          className="logo"
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
    </>
  );
}

const Container = styled.aside`
  // border-right: 1px solid gray;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--dark-shadow-out);
  border-radius: 16px;
  & > .logo {
    width: 100px;
    aspect-ratio: 51/25;
    padding-bottom: 16px;
    margin: 0 auto;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      opacity: 1;
      /* filter: drop-shadow(var(--drop-shadow)); */
    }
  }
  & > button.nav_item {
    border: none;
    outline: none;
    background: transparent;
    font-size: 1.1rem;
    text-align: start;
    color: var(--dark);
    padding: 12px 0;
    font-weight: 600;
    cursor: pointer;
    &.active {
      color: var(--green-2);
    }
  }

  @media (max-width: 548px) {
    display: none;
    &.active {
      position: absolute;
      display: flex;
      box-shadow: none;
      background-color: var(--light);
      height: 100dvh;
      width: 100%;
      overflow-y: auto;
      z-index: 500;
      & > .logo {
        opacity: 0;
      }
    }
  }
`;

const Ham = styled.button`
  display: flex;
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--light);
  border: none;
  outline: none;
  box-shadow: var(--dark-shadow-out);
  padding: 24px 10px;
  border-radius: 8px;
  height: max-content !important;
  z-index: 501;
  @media (min-width: 549px) {
    display: none;
  }
  & > span {
    background-color: var(--green-2);
    width: 28px;
    height: 3px;
    position: relative;
    &::before,
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      background-color: var(--green-2);
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
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
  & > .logo {
    width: 100px;
    aspect-ratio: 51/25;
    padding-bottom: 16px;
    margin: 0 auto;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      opacity: 1;
      /* filter: drop-shadow(var(--drop-shadow)); */
    }
  }
  @media (min-width: 549px) {
    display: none;
  }
`;
