import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { dbService } from "../fBase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

interface MatchInfoObj {}
type MatchInfoArray = Array<MatchInfoObj>;

interface UserDocument {
  accountId?: string;
  id?: string;
  name?: string;
  profileIconId?: number;
  puuid?: string;
  summonerLevel?: number;
  league1?: object;
  league2?: object;
  matchHistory?: Array<string>;
}

const ContentsHeader = styled.div``;
const Wrapper = styled.div``;
const ProfileIconContainer = styled.div``;

function Summoners() {
  const API_KEY = process.env.REACT_APP_RIOT_API_KEY;
  let userInfo: UserDocument | undefined;
  const [matchInfoArr, setMatchInfoArr] = useState<MatchInfoArray>([]);
  const matchQty = 15;
  const params = useParams();

  //해당 라우터가 동작하자마자 검색된 유저의 정보를 db에서 가져오는 함수

  async function fetchAPI() {
    // matchInfoArr 초기화
    setMatchInfoArr([]);
    //소환사 정보 요청
    const summonersRes: any = await fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.summonersName}?api_key=${API_KEY}`
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
      `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonersResJson.puuid}/ids?start=0&count=${matchQty}&api_key=${API_KEY}`
    );
    const matchResJson: Array<string> = await matchRes.json();

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
    /*
     배열 matchHistory의 매치 코드를 활용 해 매치 정보를 받아오고 파이어 베이스에 업로드하는 함수
     매치 기록이 이미 존재하는지 비교하는 코드가 추가되어야 함.
     아래 함수는 매치 코드(item)으로 db에 doc 요청을 한 후, 
     docSnap.exists()가 false일 경우 (=>매치 코드가 db에 없는 경우)
     api 요청을 보내고 그 값을 db에 업로드하는 방식으로 동작함.
    */

    async function fetchAllMatchInfo(item: string, index: number) {
      const docRef = doc(dbService, "match", item);
      const docSnap = await getDoc(docRef);
      const docSnapData: MatchInfoObj | undefined = docSnap.data();

      if (docSnap.exists() === false) {
        const matchInfoRes = await fetch(
          `https://asia.api.riotgames.com/lol/match/v5/matches/${matchResJson[index]}?api_key=${API_KEY}`
        );
        const matchInfoResJson = await matchInfoRes.json();
        await setDoc(doc(dbService, "match", item), matchInfoResJson);
        console.log("업로드 완료");
        setMatchInfoArr((prev) => [...prev, matchInfoResJson]);
        console.log("푸쉬 완료");
      }

      if (docSnapData !== undefined) {
        console.log("이미 db에 존재하는 전적 입니다. 푸쉬합니다.");
        setMatchInfoArr((prev) => [...prev, docSnapData]);
      }
    }

    // matchHistory가 존재하면 fetch
    if (matchHistory !== null) {
      matchHistory.map((item, index) => fetchAllMatchInfo(item, index));
    }
  }

  async function getUserDocument() {
    const q = query(
      collection(dbService, "user"),
      where("name", "==", params.summonersName)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userInfo = doc.data();
    });

    if (userInfo !== undefined) {
      console.log("db에 저장된 유저 입니다");
    } else {
      console.log("db에 유저 데이터가 없습니다.");
    }
  }

  async function getMatchFromDB(item: string) {
    const docRef = doc(dbService, "match", item);
    const docSnap = await getDoc(docRef);
    const docSnapData: MatchInfoObj | undefined = docSnap.data();
    setMatchInfoArr((prev: any) => [...prev, docSnapData]);
  }

  async function atFirst() {
    setMatchInfoArr([]);
    await getUserDocument();
    if (userInfo?.matchHistory !== undefined) {
      userInfo.matchHistory.map((item) => getMatchFromDB(item));
    } else {
      fetchAPI();
    }
  }

  useEffect(() => {
    atFirst();
  }, []);

  return (
    <>
      <Header />
      <button onClick={fetchAPI}>갱신</button>
      {matchInfoArr.length !== 0 ? (
        <>
          {matchInfoArr.map(() => (
            <div>hi</div>
          ))}
        </>
      ) : (
        <div>비어있음</div>
      )}
    </>
  );
}

export default Summoners;
