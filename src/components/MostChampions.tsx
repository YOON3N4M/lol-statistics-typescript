import { useEffect, useState } from "react";

import { ParticipantInfo } from "@/types/types";
import { CHAMPION_ICON_URL } from "@/constants";

import { getKDA, getKDAColor, translateKorChampionName } from "@/utils";
import styled from "@emotion/styled";
import { variable } from "@/constants/temp";

interface Props {
  champions: ParticipantInfo[];
}

function MostChampions({ champions }: Props) {
  const ChampionName: any = champions[0].championName;
  const gameQty = champions.length;
  const totalKills = champions.reduce((sum, { kills }) => sum + kills, 0);
  const totalDeaths = champions.reduce((sum, { deaths }) => sum + deaths, 0);
  const totalAssists = champions.reduce((sum, { assists }) => sum + assists, 0);
  const totalMobKills = champions.reduce(
    (sum, { neutralMinionsKilled }) => sum + neutralMinionsKilled,
    0
  );
  const totalMinionKills = champions.reduce(
    (sum, { totalMinionsKilled }) => sum + totalMinionsKilled,
    0
  );
  const TotalCs = totalMobKills + totalMinionKills;
  const wins = champions.filter((champion) => champion.win === true).length;

  //평균
  const csAverage = (TotalCs / gameQty).toFixed(1);
  const kdaAverage = getKDA(totalKills, totalDeaths, totalAssists);
  const winRate = Math.round((wins / gameQty) * 100);

  //색상 관련

  const winRateColor = winRate >= 60 ? variable.color.red : variable.color.gray;
  const kdaColor = getKDAColor(kdaAverage);

  return (
    <>
      <ChampionContainer>
        <IconBox>
          <Icon src={CHAMPION_ICON_URL(ChampionName)} />
        </IconBox>
        <MostInfo>
          <MostName>{translateKorChampionName(ChampionName)}</MostName>
          <CS>CS {csAverage}</CS>
        </MostInfo>
        <MostStats>
          <MostRatio color={kdaColor}>
            {0 === Infinity ? "Perfect" : <>{kdaAverage}:1 평점</>}
          </MostRatio>
          <MostKda>
            {(totalKills / gameQty).toFixed(1)} /
            {(totalDeaths / gameQty).toFixed(1)} /
            {(totalAssists / gameQty).toFixed(1)}
          </MostKda>
        </MostStats>
        <Played>
          <WinRate color={winRateColor}>{winRate}%</WinRate>
          <Qty>{gameQty} 게임</Qty>
        </Played>
      </ChampionContainer>
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
