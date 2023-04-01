import { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  champion: any;
}

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
const MostRatio = styled.div<{ color: string }>`
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
const WinRate = styled.div<{ color: string }>`
  text-align: right;
  font-size: 12px;

  color: ${(props) => props.color};
`;
const Qty = styled.div`
  text-align: right;
  font-size: 11px;
  margin-top: 2px;
`;

function MostChampions({ champion }: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState({ winRateC: "", kdaC: "" });
  const match = champion[1];
  const gameQty = match.length;
  const totalKills = match.reduce(function add(sum: any, item: any) {
    return sum + item.kills;
  }, 0);
  const totalDeaths = match.reduce(function add(sum: any, item: any) {
    return sum + item.deaths;
  }, 0);
  const totalAssists = match.reduce(function add(sum: any, item: any) {
    return sum + item.assists;
  }, 0);
  const totalMobKills = match.reduce(function add(sum: any, item: any) {
    return sum + item.neutralMinionsKilled;
  }, 0);
  const totalCsKills = match.reduce(function add(sum: any, item: any) {
    return sum + item.totalMinionsKilled;
  }, 0);
  const cs = totalMobKills + totalCsKills;
  const csAver = (cs / gameQty).toFixed(1);
  const totalKda = (totalKills + totalAssists) / totalDeaths;
  const wins = match.filter((e: any) => e.win === true).length;
  const winRate = (wins / gameQty) * 100;

  useEffect(() => {
    if (champion[0] === "FiddleSticks") {
      setName("Fiddlesticks");
    } else {
      setName(champion[0]);
    }

    if (winRate >= 60) {
      setColor((prev) => {
        return { ...prev, winRateC: "#d31a45" };
      });
    }
    if (4 > totalKda && totalKda >= 3) {
      setColor((prev) => {
        return { ...prev, kdaC: "#00bba3" };
      });
    } else if (5 > totalKda && totalKda >= 4) {
      setColor((prev) => {
        return { ...prev, kdaC: "#0093ff" };
      });
    } else if (totalKda >= 5) {
      setColor((prev) => {
        return { ...prev, kdaC: "#f06f00" };
      });
    }
  }, []);

  return (
    <>
      <ChampionContainer>
        <IconBox>
          <Icon
            src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${name}.png`}
          />
        </IconBox>
        <MostInfo>
          <MostName>{name}</MostName>
          <CS>CS {csAver}</CS>
        </MostInfo>
        <MostStats>
          <MostRatio color={color.kdaC}>
            {totalKda === Infinity ? (
              "Perfect"
            ) : (
              <>{totalKda.toFixed(2)}:1 평점</>
            )}
          </MostRatio>
          <MostKda>
            {(totalKills / gameQty).toFixed(1)} /
            {(totalDeaths / gameQty).toFixed(1)} /
            {(totalAssists / gameQty).toFixed(1)}
          </MostKda>
        </MostStats>
        <Played>
          <WinRate color={color.winRateC}>{Math.round(winRate)}%</WinRate>
          <Qty>{gameQty}게임</Qty>
        </Played>
      </ChampionContainer>
    </>
  );
}

export default MostChampions;
