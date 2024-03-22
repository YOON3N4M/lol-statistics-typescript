import { RiotId, UserDocument } from "@/types/types";
import { SUMMONER_PROFILE_ICON_URL } from "@/constants";
import { calculatedTimeDiffer, handleRiotId } from "@/utils";
import ContentsSelectTab from "./ContentsSelectTab";
import RefreshButton from "@/components/RefreshButton";
import styled from "@emotion/styled";
import { useRiotId, useUserDocument } from "@/store/summonersStore";
import useSummoner from "@/hooks/useSummoner";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

interface SummonerHeadProps {
  refreshActions: () => Promise<void>;
}

export default function SummonerHead(props: SummonerHeadProps) {
  const { refreshActions } = props;
  const riotId = useRiotId();
  const userDocument = useUserDocument();

  if (!riotId || !userDocument) return <></>;

  const { profileIconId, summonerLevel, lastRequestTime } = userDocument;
  return (
    <>
      <Flex w={"100%"} bg="white" px={{ mo: 4 }}>
        <Flex
          m="0 auto"
          w="100%"
          maxW={"1080px"}
          py={12}
          justifyContent={{ mo: "space-around", pc: "start" }}
        >
          <Box className="head-left">
            <Box py={4}>
              <Box position={"relative"}>
                <Box
                  position={"absolute"}
                  bg="rgb(32, 45, 55)"
                  color={"white"}
                  zIndex={100}
                  p="2px 12px"
                  fontSize={"xs"}
                  top={"90%"}
                  left="50%"
                  transform={"translateX(-50%)"}
                  borderRadius="10px"
                  fontWeight={700}
                >
                  {summonerLevel}
                </Box>
                <Box
                  position={"relative"}
                  w="100px"
                  h="100px"
                  borderRadius={"20px"}
                  overflow="hidden"
                >
                  <Image
                    alt="summoner-icon"
                    fill={true}
                    src={SUMMONER_PROFILE_ICON_URL(profileIconId)}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="head-right" ml={{ pc: 6, mo: 6 }}>
            <Heading fontSize={"2xl"}>
              {" "}
              {riotId.name}{" "}
              <Text ml={2} display={"inline"} color="keyColor.gray">
                #{riotId.tag}
              </Text>
            </Heading>{" "}
            {riotId.tag !== "KR1" && (
              <Text
                fontSize={"sm"}
                color="keyColor.gray"
                className="prev-nickname"
              >
                prev. {userDocument.name}
              </Text>
            )}
            <Box
              display={{ mo: "flex", pc: "block" }}
              flexDirection={"column"}
              mt={12}
            >
              <Button
                bg="keyColor.bgSky"
                color={"white"}
                onClick={refreshActions}
              >
                전적 갱신
              </Button>
              <Text
                mt={2}
                fontSize={"xs"}
                fontWeight="600"
                color={"keyColor.gray"}
                textAlign={{ pc: "initial", mo: "right" }}
              >
                최근 업데이트: 1주 전
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
