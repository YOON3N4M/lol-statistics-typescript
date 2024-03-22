import { useUserDocument } from "@/store/summonersStore";
import { LeagueInfo, UserDocument } from "@/types/types";
import { matchingTierImg, romeNumToArabNum } from "@/utils";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CurrentRank() {
  const userDocument = useUserDocument();
  const [leagues, setLeagues] = useState<any>([]);

  function refineLeague(league: LeagueInfo) {
    const tier =
      league.tier.toLowerCase().charAt(0).toUpperCase() +
      league.tier.toLowerCase().substring(1);
    const rank = romeNumToArabNum(league.rank);
    return { league, tier, rank };
  }

  useEffect(() => {
    setLeagues([]);
    if (!userDocument) return;
    if (userDocument.league1) {
      setLeagues((prev: any) => [...prev, refineLeague(userDocument.league1)]);
    }
    if (userDocument.league2) {
      setLeagues((prev: any) => [...prev, refineLeague(userDocument.league2)]);
    }
  }, [userDocument]);

  return (
    <Flex w="100%" flexDirection={{ pc: "column", mo: "row" }}>
      {leagues.map((league: any, idx: number) => (
        <Box mt={{ pc: idx * 2 }} w={{ pc: "100%", mo: "50%" }} flex={1}>
          <Flex
            w="100%"
            bg="white"
            p={2}
            borderTopRadius={"4px"}
            justifyContent={{ mo: "center", pc: "left" }}
          >
            <Text fontSize={"sm"} fontWeight="600">
              {league.league.queueType === "RANKED_SOLO_5x5"
                ? "솔로랭크"
                : "자유랭크"}
            </Text>
          </Flex>
          <Flex
            borderTop={"1px solid"}
            borderColor="keyColor.border"
            py={8}
            px={4}
            bg={"white"}
            alignItems="center"
            justifyContent={"space-between"}
            direction={{ mo: "column", pc: "row" }}
            borderBottomRadius={"4px"}
            textAlign={{ mo: "center", pc: "left" }}
          >
            <Center w="72px" h={"72px"} bg={"#F7F7F9"} borderRadius={"50%"}>
              <Box w="60px">
                <Image
                  width={60}
                  height={60}
                  src={matchingTierImg(league.league.tier)}
                  alt=""
                />
              </Box>
            </Center>
            <Box flex={1} ml={{ pc: 4 }} color={"black"}>
              <Text fontWeight={"bold"} fontSize="xl">
                {league.tier} {league.rank}
              </Text>
              <Text fontSize={"xs"} color="keyColor.darkGray">
                {league.league.leaguePoints} LP
              </Text>
            </Box>
            <Box fontSize={"xs"} color="keyColor.darkGray">
              <Text>
                {" "}
                {league.league.wins}승 {league.league.losses}패
              </Text>
              <Text>
                {" "}
                승률{` `}
                {Math.ceil(
                  (league.league.wins /
                    (league.league.wins + league.league.losses)) *
                    100
                )}
                %
              </Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}
