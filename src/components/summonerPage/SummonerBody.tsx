import CurrentRank from "@/containers/sumonners/summonerBody/CurrentRank";
import MostSeven from "@/containers/sumonners/summonerBody/MostSeven";
import Summary from "@/components/Summary";
import MatchHistory from "@/components/matchHistory/MatchHistory";
import { MatchInfoObj, UserDocument } from "@/types/types";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useMatchHistory, useUserDocument } from "@/store/summonersStore";
import { Box, Flex } from "@chakra-ui/react";
import { getMostChampions } from "@/utils";

export default function SummonerBody() {
  const [mostPlayChampions, setMostPlayChampions] = useState<any>([]);
  const userDocument = useUserDocument();
  const matchHistory = useMatchHistory();

  useEffect(() => {
    if (!matchHistory) return;
    if (!userDocument) return;
    const mostPlay = getMostChampions(matchHistory, userDocument?.name);
    console.log(mostPlay);
    setMostPlayChampions(mostPlay);
  }, [matchHistory]);

  return (
    <Flex flexDirection={"column"} w="100%">
      <Box
        display={{ pc: "flex", mo: "none" }}
        className="tab"
        w="100%"
        h={"50px"}
        bg="white"
        borderTop={"1px solid"}
        borderColor="keyColor.border"
      ></Box>
      <Flex
        w={{ pc: "1080px" }}
        maxW="1080px"
        m={{ pc: "0 auto" }}
        mt={{ pc: 2 }}
        gap={{ pc: 2 }}
        flexDirection={{ pc: "row", mo: "column" }}
      >
        <Box className="left" width={{ pc: "332px", mo: "100%" }}>
          <CurrentRank />
          {mostPlayChampions && (
            <MostSeven mostPlayChampions={mostPlayChampions} />
          )}
        </Box>
        <Box className="right" flex={1} minH={"50px"}>
          <Summary mostPlayChampions={mostPlayChampions} />
        </Box>
        {/* <RightContents>
        <MatchHistoryTab>
          <MatchHistroyTabUl>
            <MatchHistoryTabLi selected={true}>전체</MatchHistoryTabLi>
            <MatchHistoryTabLi selected={false}></MatchHistoryTabLi>
            <MatchHistoryTabLi selected={false}></MatchHistoryTabLi>
            <MatchHistoryTabLi selected={false}></MatchHistoryTabLi>
          </MatchHistroyTabUl>
        </MatchHistoryTab>
        
        {mostPlayChampions && (
          <Summary
            matchHistory={matchHistory}
            mostPlayChampions={mostPlayChampions}
          />
        )}

        <MatchHistoryContainer>
          {matchHistory &&
            matchHistory.map((match: any) => (
              <MatchHistory match={match} userDocument={userDocument} />
            ))}
        </MatchHistoryContainer>
      </RightContents> */}
      </Flex>
    </Flex>
  );
}

// 컨텐츠 부분 컴포넌트
const ContentsContainer = styled.div`
  width: 100%;
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
