import { RiotId, UserDocument } from "@/types/types";
import {
  calculatedTimeDiffer,
  handleRiotId,
  matchingTierImg,
  romeNumToArabNum,
} from "@/utils";
import { firebaseAPI } from "@/utils/firebaseApi";
import { useEffect, useState } from "react";
import { SUMMONER_PROFILE_ICON_URL } from "@/constants";
import { useRouter } from "next/navigation";
import { Box, Center, Flex, Text } from "@chakra-ui/react";

export default function RecentSearched() {
  const [recentlyUser, setRecentlyUser] = useState<UserDocument[]>([]);
  const router = useRouter();

  useEffect(() => {
    // * 최근 검색된 모든 플레이어 doc 가져옴
    async function getCollection() {
      const collection = await firebaseAPI.getUserCollection();
      const sortByLastRequestTime = collection
        .slice()
        .sort(
          (a: UserDocument, b: UserDocument) =>
            b.lastRequestTime - a.lastRequestTime
        );
      setRecentlyUser(sortByLastRequestTime);
    }

    getCollection();
  }, []);

  function handleSummonerClick(riotId: RiotId) {
    router.push(`summoners/kr/${riotId.name}-${riotId.tag}`);
  }

  return (
    <Box
      position={"relative"}
      mt={50}
      w={{ pc: "1024px", mo: "100%" }}
      maxH="500px"
      bg={"white"}
      borderRadius="4px"
      overflow={"hidden"}
      boxShadow="md"
    >
      <Box width={"100%"} p="10px 15px">
        <Text fontWeight={700}>최근 갱신 (KR)</Text>
      </Box>
      <Box className="styled-scroll" overflowY={"scroll"} h="400px">
        {recentlyUser?.map((user) => {
          console.log(user.riotId, user.name);
          if (!user.riotId) return <Box key={user.puuid}></Box>;
          const riotId = handleRiotId(user.riotId, "#");
          let tier;
          let rank;
          if (user.league1) {
            tier =
              user.league1.tier.toLowerCase().charAt(0).toUpperCase() +
              user.league1.tier.toLowerCase().substring(1);
            rank = romeNumToArabNum(user.league1.rank);
          }

          return (
            <Flex
              key={user.puuid}
              w={"100%"}
              position={"relative"}
              p="10px 20px"
              borderBottom="1px solid"
              borderColor={"keyColor.border"}
              alignItems="center"
              cursor={"pointer"}
              _hover={{ backgroundColor: "#f7f7f9" }}
              onClick={() => handleSummonerClick(riotId)}
            >
              <Box className="summoner-icon">
                <Box
                  position={"relative"}
                  w={"50px"}
                  h={"50px"}
                  borderRadius="4px"
                >
                  <img src={SUMMONER_PROFILE_ICON_URL(user.profileIconId)} />
                  <Box
                    className="summoner-level"
                    position="absolute"
                    bg={"rgb(28,28,31)"}
                    color="white"
                    p={"1px 7px"}
                    borderRadius="12px"
                    top="80%"
                    left="50%"
                    transform={"translateX(-50%)"}
                  >
                    <Text fontSize={"xs"}>{user.summonerLevel}</Text>
                  </Box>
                </Box>
              </Box>
              <Box
                className="riot-id"
                ml="10px"
                minW="180px"
                maxW="180px"
                overflow="hidden"
              >
                <Text fontWeight={800}>
                  {riotId.name}{" "}
                  <Text color={"keyColor.gray"} display={"inline"}>
                    #{riotId.tag}
                  </Text>
                </Text>
                <Text fontSize={"sm"}>KR</Text>
              </Box>
              <Flex
                display={{ mo: "none", pc: "flex" }}
                className="rank"
                alignItems={"center"}
                ml="auto"
              >
                {user.league1 && (
                  <>
                    <Center
                      borderRadius={"50%"}
                      className="badge"
                      bg={"#f7f7f9"}
                      w="50px"
                      h={"50px"}
                    >
                      <Box w="30px">
                        <img src={matchingTierImg(user.league1.tier)}></img>
                      </Box>
                    </Center>
                    <Box ml="8px" className="point" fontSize={"sm"}>
                      <Box>
                        <Text fontWeight={700}>
                          {tier} {rank}
                        </Text>
                      </Box>
                      <Text color={"keyColor.gray"} fontWeight={600}>
                        {user.league1.leaguePoints}LP
                      </Text>
                    </Box>
                  </>
                )}
              </Flex>
              <Box
                className="time"
                ml="auto"
                fontSize={"sm"}
                color={"keyColor.gray"}
              >
                <Text>{calculatedTimeDiffer(user.lastRequestTime)}</Text>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}
