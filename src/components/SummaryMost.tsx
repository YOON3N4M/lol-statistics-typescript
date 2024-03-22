import { CHAMPION_ICON_URL } from "@/constants";
import { variable } from "@/constants/temp";

import {
  getKDA,
  getKDAColor,
  getMostChampionsStats,
  getWinRate,
} from "@/utils";
import { Box, Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";

interface Props {
  champion: any;
}

const SumLi = styled.li`
  height: 24px;
  margin-top: 8px;
  display: flex;
  align-items: center;
`;
const ChampionIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;
const WinLose = styled.div`
  font-size: 11px;
  position: relative;
  color: "#9AA4AF";
`;

function Summarys({ champion }: Props) {
  const {
    ChampionName,
    csAverage,
    kdaAverage,
    winRate,
    kdaKills,
    kdaDeaths,
    kdaAssists,
    gameQty,
    wins,
    lose,
  } = getMostChampionsStats(champion);
  return (
    <>
      <Flex
        mt={{ mo: 2, pc: 0 }}
        alignItems={"center"}
        flexDirection={{ pc: "row", mo: "column" }}
      >
        <Flex
          width={{ pc: "24px", mo: "35px" }}
          h={{ pc: "24px", mo: "35px" }}
          borderRadius="50%"
          overflow={"hidden"}
        >
          <img src={CHAMPION_ICON_URL(ChampionName)} alt={ChampionName} />
        </Flex>

        <Flex fontSize={"11px"} gap={1} ml={{ pc: 2 }}>
          <Text
            color={
              Math.round(winRate) >= 60
                ? variable.color.red
                : variable.color.gray
            }
          >
            {Math.round(winRate)}%{" "}
          </Text>
          <Text
            color={variable.color.gray}
            display={{ pc: "inline", mo: "none" }}
          >
            ({wins}승 {lose}패)
          </Text>
          <Text
            color={getKDAColor(kdaAverage)}
            display={{ pc: "inline", mo: "none" }}
          >
            {" "}
            {kdaAverage} 평점
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Summarys;
