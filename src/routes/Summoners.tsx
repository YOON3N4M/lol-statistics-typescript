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
import MatchHistorys from "../components/MatchHistorys";

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

export interface MatchInfoObj {
  info?: any;
  metadata?: any;
}
type MatchInfoArray = Array<MatchInfoObj>;

export interface UserDocument {
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
//상단 헤더 부분 컴포넌트
const ContentsHeader = styled.div`
  background-color: white;
  width: 100%;
  height: 273-45px;
  padding-bottom: 25px;
  padding-top: 16px;
`;
const Wrapper = styled.div`
  width: 1080px;
  margin-bottom: 10px;
  display: flex;
  margin: 0 auto;
`;
const ProfileIconContainer = styled.div`
  width: 100px;
  height: 100px;
  display: block;
  margin-top: 52px;
`;
const ProfileIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  z-index: -1;
`;
const Level = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  margin-top: -11px;
  text-align: center;
  font-size: 12px;
  color: white;
  background-color: #202d37;
  width: 36.22px;
  height: 20px;
  border-radius: 10px;
  font-weight: bold;
  line-height: 20px;
  z-index: 100;
`;
const Info = styled.div`
  width: 541px;
  height: 202px;
  margin-left: 24px;
`;
const TierContainer = styled.div`
  height: 32px;
`;
const TierLi = styled.li`
  display: inline-block;
  list-style: none;
  padding: 0px 4px;
  min-width: 78.33px;
  max-width: 120px;
  line-height: 18px;
  background-color: #ebeef1;
  border-radius: 2px;
  text-align: center;
  margin-right: 4px;
`;
const Year = styled.div`
  font-size: 11px;
  color: #9aa4af;
`;
const Name = styled.div`
  height: 32px;
  font-size: 24px;
  font-weight: bold;
`;
const RefeshBtn = styled.button`
  color: white;
  border: 0px;
  border-radius: 4px;
  background-color: #5383e8;
  cursor: pointer;
  width: 80px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 50px;
`;
const LastUpdate = styled.div`
  margin-top: 8px;
  color: gray;
  font-size: 12px;
`;
// 헤더 아래 탭
const InfoListTab = styled.div`
  width: 100%;
  height: 45px;
  border-top: 1px solid;
  border-color: #ebeef1;
  padding: 4px 0;
  display: flex;
  align-items: center;
  background-color: white;
`;
const InfoList = styled.ul`
  display: flex;
  width: 1080px;
  margin: 0 auto;
`;
const InfoListItem = styled.span<{ selected: boolean }>`
  text-align: center;
  display: block;
  min-width: 60px;
  line-height: 36px;
  padding: 0 16px;
  margin-right: 4px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props: any) => (props.selected ? "#ecf2ff" : "none")};
  font-weight: ${(props: any) => (props.selected ? 700 : "")};
  color: ${(props: any) => (props.selected ? "#4171d6" : "")};
`;

// 컨텐츠 부분 컴포넌트
const ContentsContainer = styled.div`
  width: 1080px;
  margin: 0 auto;
  height: 800px;
`;
// 모스트 챔피언, 현재 티어 등 좌측 컨텐츠 컴포넌트
const LeftContents = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 332px;
  min-height: 870px;
  font-size: 12px;
`;
const CurrentRankContainer = styled.div`
  margin-bottom: 8px;
`;
const CurrentRankHeader = styled.div`
  background-color: white;
  margin-top: 8px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  justify-content: space-between;
  line-height: 35px;
  padding: 0 12px;
  font-size: 14px;
`;
const CurrentRankContents = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-top: 1px solid;
  border-color: #ebeef1;
  width: 308px;
  height: 97px;
  background-color: white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;
const CurrentTierImg = styled.img`
  width: 60px;
`;
const CurrentTierImgContainer = styled.div`
  background-color: #f7f7f9;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CurrnetTierContainer = styled.div`
  flex: 1 1 0%;
  position: relative;
  margin-left: 16px;
`;
const CurrentTier = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const CurrentLp = styled.div`
  line-height: 16px;
  margin-top: 2px;
  font-size: 12px;
  color: #758592;
`;
const WinLoseContainer = styled.div`
  font-size: 12px;
  color: #9aa4af;
`;
const WinLose = styled.div`
  line-height: 26px;
  color: #9aa4af;
`;
const WinRate = styled.div`
  margin-top: 2px;
  line-height: 16px;
`;

const MostPlayed = styled.div`
  margin-top: 8px;
  background-color: white;
  border-radius: 4px;
`;
const MostPlayedTab = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  margin: 0px;
  font-size: 14px;
  border-bottom: 1px solid;
  border-color: #ebeef1;
`;
const MostPlayedItem = styled.li<{ selected: boolean }>`
  flex: 1;
  margin-left: 4px;
  vertical-align: middle;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
  line-height: 28px;
  background-color: ${(props: any) => (props.selected ? "#ecf2ff" : "none")};
  font-weight: ${(props: any) => (props.selected ? 700 : "")};
  color: ${(props: any) => (props.selected ? "#4171d6" : "")};
`;
const MostChampionContainer = styled.div`
  //여기서 map 으로 뿌림
  display: table;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid;
  border-color: #ebeef1;
  color: #9aa4af;
  text-align: center;
  table-layout: fixed;
`;
const More = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 8px;
  font-size: 12px;
  text-align: center;
  background-color: #f7f7f9;
  color: #758592;
  box-sizing: border-box;
  cursor: pointer;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;
// 개요 ,전적 등이 보여지는 우측 컴포넌트
const RightContents = styled.div`
  display: inline-block;
  width: 740px;
  height: 1000px;
  margin-top: 8px;
  margin-left: 8px;
  vertical-align: top;
`;
const MatchHistoryTab = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid;
  border-color: #ebeef1;
  background-color: white;
`;
const MatchHistroyTabUl = styled.ul`
  display: flex;
  line-height: 28px;
  margin: 0px;
`;
const MatchHistoryTabLi = styled.li<{ selected: boolean }>`
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 28px;
  cursor: pointer;
  background-color: ${(props: any) => (props.selected ? "#ecf2ff" : "none")};
  font-weight: ${(props: any) => (props.selected ? 700 : "")};
  color: ${(props: any) => (props.selected ? "#4171d6" : "")};
`;

const Summary = styled.div`
  display: flex;
  text-align: left;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 24px 21px;
  box-sizing: border-box;
  width: 740px;
  height: 164px;
  background-color: white;
`;
const SumStats = styled.div`
  width: 222px;
`;
const SumWinLose = styled.div`
  font-size: 12px;
  color: #758592;
`;
const RatioKda = styled.div`
  display: flex;
  margin-top: 12px;
`;
const Chart = styled.div`
  position: relative;
  display: inline-block;
  width: 88px;
  height: 88px;
`;
const Text = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 88px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  font-size: 14px;
  color: #5383e8;
`;
const SumInfo = styled.div`
  margin-left: 32px;
`;
const KDA = styled.div`
  font-size: 12px;
  letter-spacing: 0px;
`;

const Death = styled.span``;
const SumRaito = styled.div`
  margin-top: 2px;
  line-height: 26px;
  font-size: 20px;
  font-weight: bold;
  color: #202d37;
`;
const KillPart = styled.div`
  line-height: 16px;
  margin-top: 2px;
  font-size: 12px;
  color: #d31a45;
`;
const Champions = styled.div`
  width: 222px;
  margin-left: 16px;
`;
const Title = styled.div`
  line-height: 16px;
  font-size: 12px;
  color: #758592;
`;
const Positions = styled.div`
  width: 222px;
`;

const MatchHistoryContainer = styled.div`
  margin-top: 8px;
`;

//
function Summoners() {
  const API_KEY = process.env.REACT_APP_RIOT_API_KEY;
  //let userInfo: UserDocument | undefined;
  const [userInfo, setUserInfo] = useState<UserDocument>();
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
      setUserInfo(doc.data());
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

  function atFirst() {
    setMatchInfoArr([]);
    getUserDocument();
  }

  useEffect(() => {
    atFirst();
  }, []);

  useEffect(() => {
    if (userInfo?.matchHistory !== undefined) {
      userInfo.matchHistory.map((item) => getMatchFromDB(item));
      console.log(userInfo);
    } else {
      // fetchAPI();
    }
  }, [userInfo]);

  console.log(matchInfoArr, "");
  return (
    <>
      <Header />
      {userInfo !== undefined ? (
        <>
          <ContentsHeader>
            <Wrapper>
              <ProfileIconContainer>
                <ProfileIcon
                  src={`http://ddragon.leagueoflegends.com/cdn/13.6.1/img/profileicon/${userInfo.profileIconId}.png`}
                />
                <Level>{userInfo.summonerLevel}</Level>
              </ProfileIconContainer>
              <Info>
                <TierContainer>
                  <ul>
                    <TierLi>
                      <Year></Year>
                    </TierLi>
                  </ul>
                </TierContainer>
                <Name>{userInfo.name}</Name>
                <RefeshBtn>전적 갱신</RefeshBtn>
                <LastUpdate>최근 업데이트 : 방금 전</LastUpdate>
              </Info>
            </Wrapper>
          </ContentsHeader>
          <InfoListTab>
            <InfoList>
              <li>
                <InfoListItem selected={true}>종합</InfoListItem>
              </li>
              <li>
                <InfoListItem selected={false}>인게임 정보</InfoListItem>
              </li>
            </InfoList>
          </InfoListTab>
          <ContentsContainer>
            <LeftContents>
              <CurrentRankContainer>
                <CurrentRankHeader>
                  <span>솔로랭크</span>
                </CurrentRankHeader>
              </CurrentRankContainer>
              <MostPlayed>
                <MostPlayedTab>
                  <MostPlayedItem selected={true}>최근게임</MostPlayedItem>
                  <MostPlayedItem selected={false}>솔로랭크</MostPlayedItem>
                  <MostPlayedItem selected={false}>자유랭크</MostPlayedItem>
                </MostPlayedTab>
                <MostChampionContainer>
                  {/* 여기에서 map*/}
                </MostChampionContainer>
                <More>더 보기 + 다른 시즌 보기</More>
              </MostPlayed>
            </LeftContents>
            <RightContents>
              <MatchHistoryTab>
                <MatchHistroyTabUl>
                  <MatchHistoryTabLi selected={true}>전체</MatchHistoryTabLi>
                  <MatchHistoryTabLi selected={false}>
                    솔로랭크
                  </MatchHistoryTabLi>
                  <MatchHistoryTabLi selected={false}>
                    자유랭크
                  </MatchHistoryTabLi>
                  <MatchHistoryTabLi selected={false}>
                    큐 타입
                  </MatchHistoryTabLi>
                </MatchHistroyTabUl>
              </MatchHistoryTab>
              <Summary>
                <SumStats>
                  <SumWinLose>전 승 패 </SumWinLose>
                  <RatioKda>
                    <Chart>
                      <Text>
                        <strong>100%</strong>
                      </Text>
                      <div>
                        <svg viewBox="0 0 200 200">
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#E84057"
                            strokeWidth="30"
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#5383E8"
                            strokeWidth="30"
                            strokeDasharray="80"
                            strokeDashoffset={2 * Math.PI * 90 * 0.22}
                          />
                        </svg>
                      </div>
                    </Chart>
                    <SumInfo>
                      <KDA>
                        <span>3</span>
                        <Death>3</Death>
                        <span>3</span>
                      </KDA>
                      <SumRaito>1.55 : 1</SumRaito>
                      <KillPart>킬관여 100%</KillPart>
                    </SumInfo>
                  </RatioKda>
                </SumStats>
                <Champions>
                  <Title>플레이한 챔피언 (최근 {matchQty}게임)</Title>
                  <ul>{/* 여기에서 map */}</ul>
                </Champions>
                <Positions>{/* 여기에 positions */}</Positions>
              </Summary>
              <MatchHistoryContainer>
                {/* 여기서 map */}
                {matchInfoArr.map((match) => (
                  <MatchHistorys match={match} userInfo={userInfo} />
                ))}
              </MatchHistoryContainer>
            </RightContents>
          </ContentsContainer>
        </>
      ) : (
        <div>존재 하지 않는 소환사 입니다.</div>
      )}

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
