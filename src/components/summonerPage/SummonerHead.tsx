import { RiotId, UserDocument } from "@/types/types";
import { SUMMONER_PROFILE_ICON_URL } from "@/constants";
import { calculatedTimeDiffer, handleRiotId } from "@/utils";
import ContentsSelectTab from "./ContentsSelectTab";
import RefreshButton from "@/components/RefreshButton";
import styled from "@emotion/styled";

interface Props {
  userDocument: UserDocument;
  selectedContents: ContentsType;
  setSelectedContents: React.Dispatch<React.SetStateAction<ContentsType>>;
  refresh: (riotId: RiotId) => Promise<void>;
  loadingPercent: number;
}

export default function SummonerHead({
  userDocument,
  selectedContents,
  setSelectedContents,
  refresh,
  loadingPercent,
}: Props) {
  const riotId = handleRiotId(userDocument.riotId, "#");
  return (
    <>
      <ContentsHeader>
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
              loadingPercent={loadingPercent}
              refresh={refresh}
              riotId={handleRiotId(userDocument.riotId, "#")}
              lastRequestTime={userDocument.lastRequestTime}
            />
            <LastUpdate>
              최근 업데이트 :{" "}
              {calculatedTimeDiffer(userDocument.lastRequestTime)}{" "}
            </LastUpdate>
          </Info>
        </Wrapper>
      </ContentsHeader>
      <ContentsSelectTab
        setSelectedContents={setSelectedContents}
        selectedContents={selectedContents}
      />
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
