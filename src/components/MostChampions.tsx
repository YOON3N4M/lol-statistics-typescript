import { useEffect, useState } from "react";

import { ParticipantInfo } from "@/types/types";
import { CHAMPION_ICON_URL } from "@/constants";

import {
  getKDA,
  getKDAColor,
  getMostChampionsStats,
  translateKorChampionName,
} from "@/utils";
import styled from "@emotion/styled";
import { variable } from "@/constants/temp";
import { Box } from "@chakra-ui/react";

interface Props {
  champions: ParticipantInfo[];
}

function MostChampions({ champions }: Props) {
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
  const winRateColor = winRate >= 60 ? variable.color.red : variable.color.gray;
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

export default MostChampions;

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
