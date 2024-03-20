import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Header from "@/components/layout/Header";
import RecentSearched from "@/components/RecentSearched";
import SearchInput from "@/components/SearchInput";

function Home() {
  return (
    <>
      <Header />
      <HomeContainer>
        <LogoContainer>
          {/* <Logo className="home-logo">OP.GG</Logo> */}
        </LogoContainer>
        <div>
          <SearchContainer>
            <RegionOption>
              <StyledLabel>Region</StyledLabel>
              <Region>Korea</Region>
            </RegionOption>
            <VLine></VLine>
            <InputContainer>
              <StyledLabel>Search</StyledLabel>
              <SearchInput />
            </InputContainer>
            <SearchBtn className="search-btn">.GG</SearchBtn>
          </SearchContainer>
        </div>
        <RecentSearched />
      </HomeContainer>
    </>
  );
}

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #5383e8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100px;
  margin: 56px 0 46px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.span`
  color: white;
  font-size: 10rem;
  font-weight: 900;
`;
const SearchContainer = styled.div`
  width: 800px;
  height: 60px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 19%);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RegionOption = styled.div`
  width: 234px;
  height: 40px;
  padding-left: 32px;
  padding-right: 8px;
  margin-right: 8px;
`;
const StyledLabel = styled.small`
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 3px;
`;
const Region = styled.span`
  color: gray;
  font-size: 14px;
`;
const VLine = styled.div`
  border-left: solid 1px gray;
  height: 30px;
  opacity: 30%;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  border: 0px;
  outline: none;
  font-size: 14px;
`;

const SearchBtn = styled.button`
  color: #5383e8;
  font-size: 25px;
  font-weight: 700;
  margin-right: 30px;
  cursor: pointer;
  border: 0px;
  background-color: rgb(0, 0, 0, 0);
`;
const InputContainer = styled.div`
  position: relative;
  width: 420px;
  height: 40px;
`;

const ProContainer = styled.div`
  margin-top: 40px;
  width: 800px;
  height: 464px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const ProHeader = styled.div`
  height: 50px;
  font-weight: 800;
  padding-top: 10px;
  padding-left: 10px;
  border-bottom: 1px solid #ebeef1;
`;
const TeamContainer = styled.div`
  display: flex;
`;
const Team = styled.div`
  width: 400px;
`;
const TeamHeader = styled.div`
  width: 399px;
  height: 70px;
  background-color: white;
  border-bottom: 1px solid #ebeef1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Tone = styled.img`
  width: 70px;
`;
const Geng = styled.img`
  width: 40px;
`;
const PlayerContainer = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 40px 0px 40px;
  border-bottom: 1px solid #ebeef1;
  cursor: pointer;
`;
const Lane = styled.img``;
const Nickname = styled.div`
  font-weight: 900;
  font-size: 30px;
  margin-left: 75px;
`;
const Name = styled.div`
  top: 9px;
  position: relative;
  font-weight: 200;
  left: 3px;
`;
