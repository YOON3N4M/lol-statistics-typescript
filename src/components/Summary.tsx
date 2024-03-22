import { MatchInfoArray, ParticipantInfo } from "@/types/types";
import PositionsBar from "@/components/PositionsBar";
import Summarys from "@/components/SummaryMost";
import styled from "@emotion/styled";
import { Box, Flex, Text } from "@chakra-ui/react";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface Props {
  mostPlayChampions: any;
}

export default function Summary({ mostPlayChampions }: Props) {
  const { isMobile } = useDeviceDetect();
  const flattedArr = mostPlayChampions.flat();
  const winCount = flattedArr.filter(
    (info: ParticipantInfo) => info.win === true
  ).length;
  const loseCount = flattedArr.length - winCount;
  const winRate = Math.round((winCount / flattedArr.length) * 100);

  const totalKillsAvg = Number(
    (
      flattedArr.reduce((sum: any, info: any) => {
        return sum + info.kills;
      }, 0) / flattedArr.length
    ).toFixed(1)
  );
  const totalDeathsAvg = Number(
    (
      flattedArr.reduce((sum: any, info: any) => {
        return sum + info.deaths;
      }, 0) / flattedArr.length
    ).toFixed(1)
  );

  const totalAssistsAvg = Number(
    (
      flattedArr.reduce((sum: any, info: any) => {
        return sum + info.assists;
      }, 0) / flattedArr.length
    ).toFixed(1)
  );

  const kdaAvg = (totalKillsAvg + totalAssistsAvg) / totalDeathsAvg;

  function Most() {}
  return (
    <Flex
      borderBottomRadius={"4px"}
      bg="white"
      p={{ pc: "24px 21px", mo: "12px 10px" }}
    >
      {mostPlayChampions.length !== 0 ? (
        <>
          {" "}
          <Box>
            <SumWinLose>
              {flattedArr.length}전 {winCount}승 {loseCount}패
            </SumWinLose>
            <Flex mt={{ pc: "12px", mo: "20px" }}>
              <Box
                position={"relative"}
                w="88px"
                h="88px"
                display={{ pc: "initial", mo: "none" }}
              >
                <Box
                  position={"absolute"}
                  w="88px"
                  h="88px"
                  textAlign={"center"}
                  lineHeight="88px"
                  color={"keyColor.bgSky"}
                  fontSize="sm"
                >
                  <strong>{winRate}%</strong>
                </Box>
                <div>
                  <svg viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#E84057"
                      strokeWidth="30"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#5383E8"
                      strokeWidth="30"
                      strokeDasharray={`${
                        (2 * Math.PI * 80 * winCount) / flattedArr.length
                      } ${
                        2 * Math.PI * 80 * (1 - winCount / flattedArr.length)
                      }`}
                      strokeDashoffset={2 * Math.PI * 90 * 0.22}
                    />
                  </svg>
                </div>
              </Box>
              <Box ml={{ pc: "32px" }}>
                <KDA>
                  <KDANum deaths={false}>{totalKillsAvg}</KDANum>/
                  <KDANum deaths={true}>{totalDeathsAvg}</KDANum>/
                  <KDANum deaths={false}>{totalAssistsAvg}</KDANum>
                </KDA>
                <SumRaito>{kdaAvg.toFixed(2)}: 1</SumRaito>
                <KillPart>
                  {/* 킬관여{' '}
									{totalKillPartNum !== undefined
								? Math.round(totalKillPartNum)
								: 0}
									% */}
                </KillPart>
              </Box>
            </Flex>
          </Box>
          <Flex
            w={"222px"}
            ml="16px"
            flexDirection={"column"}
            alignItems={{ mo: "center" }}
          >
            <Title>
              {isMobile
                ? "모스트 승률"
                : `플레이한 챔피언 (최근 ${flattedArr.length}게임)`}
            </Title>
            <Flex
              mt={{ mo: 4, pc: 2 }}
              flexDirection={{ pc: "column", mo: "row" }}
              gap={{ pc: "8px", mo: 2 }}
            >
              {mostPlayChampions.slice(0, 3).map((champion: any) => (
                <Summarys champion={champion} />
              ))}
            </Flex>
          </Flex>
          <Positions>
            <PositionsBar currentMatch={flattedArr} />
          </Positions>
        </>
      ) : (
        <NoHistory>
          {/* 전적 정보가 없습니다. 전적이 있다면 전적 갱신을 시도 해보세요. */}
        </NoHistory>
      )}
    </Flex>
  );
}

const NoHistory = styled.span`
  margin: 0 auto;
`;

const SummaryContainer = styled.div`
  display: flex;
  text-align: left;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 24px 21px;
  box-sizing: border-box;
  width: 740px;
  height: 164px;
  background-color: white;
`;
const SumStats = styled.div`
  width: 222px;
`;
const SumWinLose = styled.div`
  font-size: 12px;
  color: #758592;
`;
const RatioKda = styled.div`
  display: flex;
  margin-top: 12px;
`;
const Chart = styled.div`
  position: relative;
  display: inline-block;
  width: 88px;
  height: 88px;
`;

const SumInfo = styled.div`
  margin-left: 32px;
`;
const KDA = styled.div`
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 700;
  color: #758592;
`;

const KDANum = styled.span<{ deaths: boolean }>`
  color: ${(props: any) => (props.deaths ? "#d31a45" : "#758592")};
`;
const SumRaito = styled.div`
  margin-top: 8px;
  line-height: 26px;
  font-size: 20px;
  font-weight: bold;
  color: #202d37;
`;
const KillPart = styled.div`
  line-height: 16px;
  margin-top: 0px;
  font-size: 12px;
  color: #d31a45;
`;
const Champions = styled.div`
  width: 222px;
  margin-left: 16px;
`;
const Title = styled.div`
  line-height: 16px;
  font-size: 12px;
  color: #758592;
`;
const Positions = styled.div`
  width: 222px;
`;
