import React from "react";
import styled from "styled-components";
import GreenlandLogoImg from "../../assets/mallick.png";
import { useState, useEffect } from "react";



export function Logo(props) {

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight
  });
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight
    });
  useEffect(() => (window.onresize = updateSize), []);

  const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color:black;
`;

const LogoImg = styled.div`
  width: 50px;
  height: 50px;
  margin-left: size.x * 0.5;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.h2`
display: flex;
  align-items: center;
  font-size: 16px;
  margin: 0;
  margin-left: 2px;
  color: white;
  font-weight: 500;
`;

  return (
    <LogoWrapper>
      <LogoImg>
        <img src={GreenlandLogoImg} alt="Greenland logo" style={{marginLeft:size.x * 0}}/>
      </LogoImg>
      <LogoText><h4 style={{color:'#ffd700',marginLeft:size.x * 0}}>MALLICK EMPIRE</h4></LogoText>
    </LogoWrapper>
  );
}
