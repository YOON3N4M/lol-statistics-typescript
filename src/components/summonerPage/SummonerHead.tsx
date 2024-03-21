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
        <Flex m="0 auto" w="100%" maxW={"1080px"} py={12}>
          <Box className="head-left">
            <Box>
              <Box
                position={"relative"}
                w="100px"
                h="100px"
                borderRadius={"8px"}
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
              <Button bg="keyColor.bgSky" color={"white"}>
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
      {/* <ContentsHeader>
        <Wrapper>
          <ProfileIconContainer>
            <ProfileIcon
              src={SUMMONER_PROFILE_ICON_URL(userDocument.profileIconId)}
            />
            <Level>{userDocument.summonerLevel}</Level>
          </ProfileIconContainer>
          <Info>
            <TierContainer>
              <ul>
                <TierLi>
                  <Year></Year>
                </TierLi>
              </ul>
            </TierContainer>
            <Name>
              <span className="riot-id">
                {riotId.name} <span>#{riotId.tag}</span>
              </span>
              {riotId.tag !== "KR1" && (
                <span className="prev-nickname">prev. {userDocument.name}</span>
              )}
            </Name>

            <RefreshButton
              loadingPercent={100}
              refresh={refreshActions}
              riotId={riotId}
              lastRequestTime={userDocument.lastRequestTime}
            />
            <LastUpdate>
              최근 업데이트 :{" "}
              {calculatedTimeDiffer(userDocument.lastRequestTime)}{" "}
            </LastUpdate>
          </Info>
        </Wrapper>
      </ContentsHeader> */}
      {/* <ContentsSelectTab
        setSelectedContents={setSelectedContents}
        selectedContents={selectedContents}
      /> */}
    </>
  );
}

//상단 헤더 부분 컴포넌트
const ContentsHeader = styled.div`
  background-color: white;
  width: 100%;
  height: 273-45px;
  padding-bottom: 25px;
  padding-top: 16px;
`;

const Wrapper = styled.div`
  width: 1080px;
  margin-bottom: 10px;
  display: flex;
  margin: 0 auto;
`;
const ProfileIconContainer = styled.div`
  width: 100px;
  height: 100px;
  display: block;
  margin-top: 52px;
`;
const ProfileIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  z-index: -1;
`;
const Level = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  margin-top: -11px;
  text-align: center;
  font-size: 12px;
  color: white;
  background-color: #202d37;
  width: 36.22px;
  height: 20px;
  border-radius: 10px;
  font-weight: bold;
  line-height: 20px;
  z-index: 100;
`;
const Info = styled.div`
  width: 541px;
  height: 202px;
  margin-left: 24px;
`;
const TierContainer = styled.div`
  height: 32px;
`;
const TierLi = styled.li`
  display: inline-block;
  list-style: none;
  padding: 0px 4px;
  min-width: 78.33px;
  max-width: 120px;
  line-height: 18px;
  background-color: #ebeef1;
  border-radius: 2px;
  text-align: center;
  margin-right: 4px;
`;
const Year = styled.div`
  font-size: 11px;
  color: #9aa4af;
`;
const Name = styled.div`
  .riot-id {
    height: 32px;
    font-size: 24px;
    font-weight: bold;
    display: block;
    span {
      color: #758592;
    }
  }
  .prev-nickname {
    font-size: 12px;
    color: #9aa4af;
  }
`;
const RefreshBtn = styled.button`
  color: white;
  border: 0px;
  border-radius: 4px;
  background-color: #5383e8;
  cursor: pointer;
  width: 80px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 50px;
`;
const LastUpdate = styled.div`
  margin-top: 8px;
  color: gray;
  font-size: 12px;
`;
