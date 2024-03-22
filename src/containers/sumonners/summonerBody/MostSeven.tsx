import { useState } from "react";

import { ParticipantInfo, ParticipantsData } from "@/types/types";
import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";
import {
  getKDAColor,
  getMostChampionsStats,
  translateKorChampionName,
} from "@/utils";
import { variable } from "@/constants/temp";
import { CHAMPION_ICON_URL } from "@/constants";

interface MostSevenProps {
  mostPlayChampions: ParticipantsData;
}
interface ChampionsProps {
  champions: ParticipantInfo[];
}

export default function MostSeven({ mostPlayChampions }: MostSevenProps) {
  const most7 = mostPlayChampions.slice(0, 7);

  function MostChampion(props: ChampionsProps) {
    const { champions } = props;
    const {
      ChampionName,
      csAverage,
      kdaAverage,
      winRate,
      kdaKills,
      kdaDeaths,
      kdaAssists,
      gameQty,
    } = getMostChampionsStats(champions);
    //색상 관련
    const winRateColor =
      winRate >= 60 ? variable.color.red : variable.color.gray;
    const kdaColor = getKDAColor(kdaAverage);

    return (
      <>
        <Box
          display={"table"}
          w="100%"
          h={"48px"}
          borderBottom="1px solid"
          borderColor={"keyColor.border"}
          textAlign="center"
          px={2}
          py={1.5}
        >
          <Box
            display={"table-cell"}
            w="32px"
            textAlign={"right"}
            verticalAlign="middle"
          >
            <Icon src={CHAMPION_ICON_URL(ChampionName)} />
          </Box>
          <MostInfo>
            <MostName>{translateKorChampionName(ChampionName)}</MostName>
            <CS>CS {csAverage}</CS>
          </MostInfo>
          <MostStats>
            <MostRatio color={kdaColor}>
              {0 === Infinity ? "Perfect" : <>{kdaAverage}:1 평점</>}
            </MostRatio>
            <MostKda>
              {kdaKills} /{kdaDeaths} /{kdaAssists}
            </MostKda>
          </MostStats>
          <Played>
            <WinRate color={winRateColor}>{winRate}%</WinRate>
            <Qty>{gameQty} 게임</Qty>
          </Played>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box mt="8px" bg="white" borderRadius={"4px"}>
        <MostPlayedTab>
          <MostPlayedItem selected={true}>최근게임</MostPlayedItem>
          <MostPlayedItem selected={false}></MostPlayedItem>
          <MostPlayedItem selected={false}></MostPlayedItem>
        </MostPlayedTab>
        <MostChampionContainer>
          {most7.map((champions) => (
            <MostChampion
              key={`most7-${champions[0].championName}`}
              champions={champions}
            />
          ))}
        </MostChampionContainer>
        {/* <More>더 보기</More> */}
      </Box>
    </>
  );
}

const MostPlayedBox = styled.div`
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
  cursor: ${(props: any) => (props.selected ? "pointer" : "")};
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

const ChampionContainer = styled.div`
  display: table;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid;
  border-color: #ebeef1;
  color: #9aa4af;
  text-align: center;
  table-layout: fixed;
`;
const IconBox = styled.div`
  display: table-cell;
  width: 44px;
  text-align: right;
  vertical-align: middle;
`;
const Icon = styled.img`
  width: 32px;
  border-radius: 50%;
`;
const MostInfo = styled.div`
  display: table-cell;
  width: 100px;
  text-align: left;
  vertical-align: middle;
  padding-left: 8px;
  box-sizing: border-box;
`;
const MostName = styled.div`
  color: #202d37;
  font-weight: bold;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const CS = styled.div`
  margin-top: 2px;
  font-size: 11px;
  white-space: nowrap;
`;
const MostStats = styled.div`
  display: table-cell;
  width: 100px;
  vertical-align: middle;
  text-align: center;
  box-sizing: border-box;
`;
const MostRatio = styled.div<{ color?: string }>`
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.color};
`;
const MostKda = styled.div`
  font-size: 11px;
  margin-top: 2px;
`;
const Played = styled.div`
  display: table-cell;
  width: 88px;
  padding-right: 0;
  vertical-align: middle;
  text-align: center;
  box-sizing: border-box;
  margin-top: 8px;
  padding-right: 12px;
`;
const WinRate = styled.div<{ color?: string }>`
  text-align: right;
  font-size: 12px;

  color: ${(props) => props.color};
`;
const Qty = styled.div`
  text-align: right;
  font-size: 11px;
  margin-top: 2px;
`;
