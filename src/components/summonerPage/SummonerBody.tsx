import CurrentRank from "@/components/CurrentRank";
import MostSeven from "@/components/MostSeven";
import Summary from "@/components/Summary";
import MatchHistory from "@/components/matchHistory/MatchHistory";
import { MatchInfoObj, UserDocument } from "@/types/types";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

interface Props {
  userDocument: UserDocument;
  matchInfoArr: MatchInfoObj[];
}

export default function SummonerBody({ userDocument, matchInfoArr }: Props) {
  const [mostPlayChampions, setMostPlayChampions] = useState<any>();

  function getMostChampion() {
    if (!matchInfoArr) return;
    const filtered = matchInfoArr?.map(
      (game) =>
        game?.info.participants.filter(
          (player: any) => player.summonerName === userDocument?.name
        )[0]
    );

    const removeUndefined: any = filtered?.filter((item) => item !== undefined);
    const most = removeUndefined.reduce((acc: any, obj: any) => {
      const key = obj.championName;
      acc[key] = (acc[key] || []).concat(obj);
      return acc;
    }, {});
    const mostList = Object.values(most).sort(
      (a: any, b: any) => b.length - a.length
    );

    setMostPlayChampions(mostList);
  }

  useEffect(() => {
    if (!matchInfoArr) return;
    getMostChampion();
  }, [matchInfoArr]);
  return (
    <ContentsContainer>
      <LeftContents>
        <CurrentRank userDocument={userDocument} />
        {mostPlayChampions && (
          <MostSeven mostPlayChampions={mostPlayChampions} />
        )}
      </LeftContents>
      <RightContents>
        <MatchHistoryTab>
          <MatchHistroyTabUl>
            <MatchHistoryTabLi selected={true}>전체</MatchHistoryTabLi>
            <MatchHistoryTabLi selected={false}></MatchHistoryTabLi>
            <MatchHistoryTabLi selected={false}></MatchHistoryTabLi>
            <MatchHistoryTabLi selected={false}></MatchHistoryTabLi>
          </MatchHistroyTabUl>
        </MatchHistoryTab>
        {/** */}
        {mostPlayChampions && (
          <Summary
            matchInfoArr={matchInfoArr}
            mostPlayChampions={mostPlayChampions}
          />
        )}

        <MatchHistoryContainer>
          {matchInfoArr &&
            matchInfoArr.map((match: any) => (
              <MatchHistory match={match} userDocument={userDocument} />
            ))}
        </MatchHistoryContainer>
      </RightContents>
    </ContentsContainer>
  );
}

// 컨텐츠 부분 컴포넌트
const ContentsContainer = styled.div`
  width: 1080px;
  margin: 0 auto;
  min-height: auto;
`;
// 모스트 챔피언, 현재 티어 등 좌측 컨텐츠 컴포넌트
const LeftContents = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 332px;
  min-height: 870px;
  font-size: 12px;
`;

// 개요 ,전적 등이 보여지는 우측 컴포넌트
const RightContents = styled.div`
  display: inline-block;
  width: 740px;
  min-height: 1000px;
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
  cursor: ${(props: any) => (props.selected ? "pointer" : "")};
  background-color: ${(props: any) => (props.selected ? "#ecf2ff" : "none")};
  font-weight: ${(props: any) => (props.selected ? 700 : "")};
  color: ${(props: any) => (props.selected ? "#4171d6" : "")};
`;

const MatchHistoryContainer = styled.div`
  margin-top: 8px;
`;
const NotFoundMsg = styled.div`
  padding-top: 50px;
  text-align: center;
  font-size: 30px;
`;
