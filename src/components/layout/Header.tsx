import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Header() {
  return (
    <>
      <StyledHeader>
        <Link
          style={{ textDecoration: "none" }}
          to={process.env.PUBLIC_URL + "/"}
        >
          <StyledLogo>OP.GG</StyledLogo>
        </Link>
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.div`
  background-color: #5383e8;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #4171d6;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 35px;
  box-sizing: border-box;
  justify-content: space-between;
`;
const StyledLogo = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 800;
  text-decoration-line: none;
`;

export default Header;
