import React, { useEffect } from "react";
import Header from "../components/Header";

function Summoners() {
  const API_KEY = process.env.REACT_APP_RIOT_API_KEY;
  const testName = "늙고건강한퇴물";

  async function fetchAPI() {
    const summonersRes: any = await fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${testName}?api_key=${API_KEY}`
    ).catch((error) => console.log(error)); // summonerV4 기본 소환사 정보를 불러오는 API

    const summonersResJson: any = await summonersRes.json();
    console.log(summonersResJson);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default Summoners;
