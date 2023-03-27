import React, { useEffect } from "react";
import Header from "../components/Header";
import { dbService } from "../fBase";
import { doc, setDoc } from "firebase/firestore";

interface SummonerObj {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  summonerLevel: number;
}
interface LeagueObj {
  wins: number;
  losses: number;
  rank: string;
  tier: string;
  leaguePoints: number;
  queueType: string;
}

type LeagueArray = Array<LeagueObj>;

function Summoners() {
  const API_KEY = process.env.REACT_APP_RIOT_API_KEY;
  const testName = "늙고건강한퇴물";

  async function fetchAPI() {
    //소환사 정보 요청
    const summonersRes: any = await fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${testName}?api_key=${API_KEY}`
    ).catch((error) => console.log(error));

    // 소환사 정보 저장
    const summonersResJson: SummonerObj = await summonersRes.json();

    /* 검색된 소환사의 리그 정보를 불러온다 
    사례 1. 길이 2 = 자유랭크, 솔로랭크 모두 랭크가 존재 이때,
      [0] => 솔로랭크
      [1] => 자유랭크

    사례 2. 길이 1 = 자유랭크, 솔로랭크 중 하나만 랭크가 존재
      [0] => queueType을 보고 솔로랭크, 자유랭크 판별 해야함.

    사례 3. 길이 0 = 자유랭크, 솔로랭크 모두 언랭
    */
    const leagueRes = await fetch(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonersResJson.id}?api_key=${API_KEY}`
    );
    const LeagueResJson: LeagueArray = await leagueRes.json();

    const matchRes = await fetch(
      `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${
        summonersResJson.puuid
      }/ids?start=0&count=${15}&api_key=${API_KEY}`
    ); // matchV5 소환사 정보에서 불러온 puuid로 해당 소환사의 경기 코드를 불러오는 API rate limit에 걸리는 관계로 0~15로 설정
    const matchResJson = await matchRes.json();

    // 전적이 없는 경우를 컨트롤 하기 위해, 없는 경우엔 null을 db에 업로드하고 그 외엔 matchResJson을 할당하고 업로드
    let matchHistory = null;
    if (matchResJson) {
      matchHistory = matchResJson;
    }

    /*
     이 부분은 가장 마지막 단계 / db에 정보를 업로드 하는 단계
     소환사 정보가 있으면, 파이어 베이스에 doc(db,"컬렉션 명","doc 명"), {data} 형식으로 추가 하는 기능
    */
    //사례 1.
    if (summonersResJson && LeagueResJson.length === 2) {
      const summonerInfo = {
        ...summonersResJson,
        league1: LeagueResJson[0],
        league2: LeagueResJson[1],
        matchHistory,
      };
      await setDoc(
        doc(dbService, "user", summonersResJson.puuid),
        summonerInfo
      );
      //사례 2.
    } else if (summonersResJson && LeagueResJson.length === 1) {
      const summonerInfo = {
        ...summonersResJson,
        league1: LeagueResJson[0],
        league2: null,
        matchHistory,
      };
      await setDoc(
        doc(dbService, "user", summonersResJson.puuid),
        summonerInfo
      );
      //사례 3.
    } else if (summonersResJson && LeagueResJson.length === 0) {
      const summonerInfo = {
        ...summonersResJson,
        league1: null,
        league2: null,
        matchHistory,
      };

      await setDoc(
        doc(dbService, "user", summonersResJson.puuid),
        summonerInfo
      );
    }

    const matchInfoRes = await fetch(
      `https://asia.api.riotgames.com/lol/match/v5/matches/${matchResJson[0]}?api_key=${API_KEY}`
    );
    const matchInfoJson = await matchInfoRes.json();

    await setDoc(
      doc(dbService, "match", matchInfoJson.metadata.matchId),
      matchInfoJson
    );
    //
    //
  }

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <button onClick={fetchAPI}>갱신</button>
    </>
  );
}

export default Summoners;
