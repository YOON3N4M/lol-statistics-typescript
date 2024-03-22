import { useUserDocument } from "@/store/summonersStore";
import { League, LeagueInfo, UserDocument } from "@/types/types";
import { matchingTierImg, romeNumToArabNum } from "@/utils";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState, useEffect } from "react";

interface RefineLeague {
  league: League;
  tier: string;
  rank: number | undefined;
}

export default function CurrentRank() {
  const userDocument = useUserDocument();
  const [solo, setSolo] = useState<RefineLeague | null>(null);
  const [flex, setFlex] = useState<RefineLeague | null>(null);

  function refineLeague(league: League) {
    const tier =
      league.tier.toLowerCase().charAt(0).toUpperCase() +
      league.tier.toLowerCase().substring(1);
    const rank = romeNumToArabNum(league.rank);
    return { league, tier, rank };
  }

  useEffect(() => {
    if (!userDocument) return;
    console.log(userDocument);
    if (userDocument.league1?.queueType === "RANKED_SOLO_5x5") {
      setSolo(refineLeague(userDocument.league1));
    }
    if (userDocument.league2?.queueType === "RANKED_FLEX_SR") {
      setFlex(refineLeague(userDocument.league2));
    }
  }, [userDocument]);

  return (
    <Flex w="100%" flexDirection={{ pc: "column", mo: "row" }}>
      <Box
        className="solo-rank"
        w={{ pc: "100%", mo: "50%" }}
        flex={1}
        bg="white"
      >
        <Flex
          w="100%"
          bg="white"
          p={2}
          borderTopRadius={"4px"}
          justifyContent={{ mo: "center", pc: "left" }}
          alignItems="center"
        >
          <Text fontSize={"sm"} fontWeight="600">
            솔로랭크{" "}
            {!solo && (
              <Text color={"keyColor.gray"} display={"inline"}>
                unranked
              </Text>
            )}
          </Text>
        </Flex>
        {solo && (
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
                  src={matchingTierImg(solo.league.tier)}
                  alt=""
                />
              </Box>
            </Center>
            <Box flex={1} ml={{ pc: 4 }} color={"black"}>
              <Text fontWeight={"bold"} fontSize="xl">
                {solo.tier} {solo.rank}
              </Text>
              <Text fontSize={"xs"} color="keyColor.darkGray">
                {solo.league.leaguePoints} LP
              </Text>
            </Box>
            <Box fontSize={"xs"} color="keyColor.darkGray">
              <Text>
                {" "}
                {solo.league.wins}승 {solo.league.losses}패
              </Text>
              <Text>
                {" "}
                승률{` `}
                {Math.ceil(
                  (solo.league.wins / (solo.league.wins + solo.league.losses)) *
                    100
                )}
                %
              </Text>
            </Box>
          </Flex>
        )}
      </Box>
      <Box
        className="flex-rank"
        w={{ pc: "100%", mo: "50%" }}
        flex={1}
        mt={{ pc: 2 }}
        bg="white"
      >
        <Flex
          w="100%"
          bg="white"
          p={2}
          borderTopRadius={"4px"}
          justifyContent={{ mo: "center", pc: "left" }}
          alignItems="center"
        >
          <Text fontSize={"sm"} fontWeight="600">
            자유랭크{" "}
            {!flex && (
              <Text color={"keyColor.gray"} display={"inline"}>
                unranked
              </Text>
            )}
          </Text>
        </Flex>
        {flex && (
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
                  src={matchingTierImg(flex.league.tier)}
                  alt=""
                />
              </Box>
            </Center>
            <Box flex={1} ml={{ pc: 4 }} color={"black"}>
              <Text fontWeight={"bold"} fontSize="xl">
                {flex.tier} {flex.rank}
              </Text>
              <Text fontSize={"xs"} color="keyColor.darkGray">
                {flex.league.leaguePoints} LP
              </Text>
            </Box>
            <Box fontSize={"xs"} color="keyColor.darkGray">
              <Text>
                {" "}
                {flex.league.wins}승 {flex.league.losses}패
              </Text>
              <Text>
                {" "}
                승률{` `}
                {Math.ceil(
                  (flex.league.wins / (flex.league.wins + flex.league.losses)) *
                    100
                )}
                %
              </Text>
            </Box>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
