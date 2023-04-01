import { kill } from "process";
import { useEffect } from "react";
import styled from "styled-components";
import { MatchInfoObj, UserDocument } from "../routes/Summoners";

interface Props {
  userInfo: UserDocument;
  match: MatchInfoObj;
  setCurrentMatch: Function;
  setTotalKillPart: Function;
}

interface PlayerObj {
  championName: string;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  summoner1Id: number;
  summoner2Id: number;
  perks: any;
  teamId: number;
  summonerName: string;
  kills: number;
  assists: number;
  win: boolean;
  deaths: number;
  queueId: number;
  visionWardsBoughtInGame: number;
  neutralMinionsKilled: number;
  totalMinionsKilled: number;
  champLevel: number;
}

const Match = styled.li<{ isWin: boolean }>`
  height: 96px;
  margin-bottom: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  border-left: 4px solid;
  background-color: ${(props: any) => (props.isWin ? "#ecf2ff" : "#fff1f3")};
  border-color: ${(props: any) => (props.isWin ? "#5383e8" : "#e84057")};
`;
const GameContainer = styled.div`
  padding: 0px 8px 0px 12px;
  display: flex;
  height: 96px;
  align-items: center;
  justify-content: space-between;
`;
const Game = styled.div`
  width: 108px;
  line-height: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
  color: #758592;
`;
const Type = styled.div<{ isWin: boolean }>`
  font-weight: bold;
  color: ${(props: any) => (props.isWin ? "#4171d6" : "#d31a45")};
`;
const Timestamp = styled.div`
  color: #758592;
`;
const Horizontal = styled.div`
  width: 48px;
  height: 1px;
  margin: 8px 0px 4px;
  background-color: #d5e3ff;
`;
const Result = styled.div<{ isWin: boolean }>`
  font-weight: bold;
`;
const Length = styled.div``;
const GameInfo = styled.div`
  width: 377px;
  height: 83px;
`;
const TopRow = styled.div`
  display: flex;
  height: 53px;
`;
const Champion = styled.div`
  display: flex;
`;
const ChampionIconBox = styled.div``;
const ChampionIcon = styled.img`
  border-radius: 50%;
  width: 48px;
  max-height: 48px;
`;
const ChampionLevel = styled.span`
  position: relative;
  right: -29px;
  bottom: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 11px;
  border-radius: 50%;
  color: rgb(255, 255, 255);
  background: rgb(32, 45, 55);
`;
const SpellContainer = styled.div`
  margin-left: 4px;
`;
const SpellBox = styled.div`
  margin-left: 4px;
`;
const SpellIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-bottom: 2px;
  border-radius: 4px;
`;
const RuneContainer = styled.div`
  margin-left: 2px;
`;
const MainRune = styled.div`
  margin-bottom: 2px;
  background-color: rgb(0, 0, 0);
  border-radius: 50%;
  width: 22px;
  height: 22px;
`;
const RuneIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-bottom: 2px;
`;
const KDAContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 107px;
  padding-right: 12px;
  margin-right: 8px;
  margin-left: 12px;
`;
const KDA = styled.div`
  line-height: 22px;
  font-size: 15px;
  color: #9aa4af;
  letter-spacing: 3px;
`;
const KDASpan = styled.span<{ red: boolean }>`
  color: #202d37;
  font-weight: 700;
  color: ${(props: any) => (props.red ? "#d31a45" : "#202d37")};
`;
const Ratio = styled.div`
  line-height: 16px;
  color: #758592;
  font-size: 12px;
`;
const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 140px;
  color: #758592;
  font-size: 11px;
  border-left: 1px solid #c6c6c6;
  padding-left: 4px;
`;
const Stat = styled.div<{ color: string }>`
  color: ${(props: any) => (props.color === "red" ? "#d31a45" : "#758592")};
`;
const BottomRow = styled.div`
  height: 22px;
  margin-top: 8px;
`;
const ItemContainer = styled.div`
  display: flex;
`;
const ItemUl = styled.ul`
  display: flex;
  margin: 0;
`;
const ItemBox = styled.div<{ isWin: boolean }>`
  width: 22px;
  height: 22px;
  background-color: ${(props: any) => (props.isWin ? "#b3cdff" : "#ffbac3")};
  margin-left: 2px;
  border-radius: 4px;
`;
const ItemIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 4px;
`;
const WardBox = styled.div<{ isWin: boolean }>`
  background-color: ${(props: any) => (props.isWin ? "#b3cdff" : "#ffbac3")};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-left: 2px;
  margin-right: 4px;
`;
const WardIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
`;
const PartContainer = styled.div`
  display: flex;
`;
const PartIconBox = styled.div`
  margin-right: 4px;
  width: 16px;
  height: 16px;
`;
const PartIcon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 4px;
`;
const PartNameBox = styled.div`
  display: inline-block;
  max-width: 60px;
  vertical-align: middle;
  color: #75859d;
`;
const PartLi = styled.li`
  display: flex;
  align-items: center;
  width: 88px;
  height: 18px;
  text-align: left;
  white-space: nowrap;
`;
const PartName = styled.a`
  color: inherit;
  display: block;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const PartNameB = styled.b`
  color: inherit;
  display: block;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
`;
const Detail = styled.div``;
const DetailBtn = styled.button<{ isWin: boolean }>`
  width: 40px;
  height: 96px;
  border: 0px;
  cursor: pointer;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${(props: any) => (props.isWin ? "#d5e3ff" : "#ffd8d9")};
`;

function MatchHistorys({
  userInfo,
  match,
  setCurrentMatch,
  setTotalKillPart,
}: Props) {
  const name = userInfo.name;
  // 매치 내 검색된 플레이어와 이름이 같은 플레이어의 정보를 currentPlayer에 할당
  const currentPlayer: PlayerObj = match.info.participants.filter(
    (player: PlayerObj) => player.summonerName === name
  )[0];
  // 매치 내 플레이어 10명중 검색된 플레이어와 같은 팀인 플레이어를 teamA에 할당
  const teamA = match.info.participants.filter(
    (player: PlayerObj) => player.teamId === currentPlayer.teamId
  );
  const teamLeft = match.info.participants.slice(0, 5);
  const teamRight = match.info.participants.slice(5);

  const teamATotalKills = teamA.reduce(function add(sum: any, item: any) {
    return sum + item.kills;
  }, 0);

  //킬 관여율
  let killPart: number;
  if (teamATotalKills !== 0) {
    killPart = Math.round(
      ((currentPlayer.kills + currentPlayer.assists) / teamATotalKills) * 100
    );
  } else {
    killPart = 0;
  }
  //게임 진행 시간
  const gameDuration = (match.info.gameDuration / 60).toFixed(0);
  const gameDurationNum = Number(match.info.gameDuration / 60);

  //승패
  const win = currentPlayer.win;
  //챔피언 이름
  let fixChampion;
  if (currentPlayer.championName === "FiddleSticks") {
    fixChampion = "Fiddlesticks";
  } else {
    fixChampion = currentPlayer.championName;
  }
  //KDA
  let kda;
  if (
    currentPlayer.kills === 0 &&
    currentPlayer.assists === 0 &&
    currentPlayer.deaths === 0
  ) {
    kda = "0.00";
  } else if (currentPlayer.deaths === 0) {
    kda = "Perfect";
  } else {
    kda = (
      (currentPlayer.kills + currentPlayer.assists) /
      currentPlayer.deaths
    ).toFixed(2);
  }

  //Cs
  const CS =
    currentPlayer.neutralMinionsKilled + currentPlayer.totalMinionsKilled;
  const CSm =
    (currentPlayer.neutralMinionsKilled + currentPlayer.totalMinionsKilled) /
    gameDurationNum;

  // 아이템
  let itemList = {
    item0: false,
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
  };
  if (currentPlayer.item0 > 0) {
    itemList.item0 = true;
  }
  if (currentPlayer.item1 > 0) {
    itemList.item1 = true;
  }
  if (currentPlayer.item2 > 0) {
    itemList.item2 = true;
  }
  if (currentPlayer.item3 > 0) {
    itemList.item3 = true;
  }
  if (currentPlayer.item4 > 0) {
    itemList.item4 = true;
  }
  if (currentPlayer.item5 > 0) {
    itemList.item5 = true;
  }
  if (currentPlayer.item6 > 0) {
    itemList.item6 = true;
  }

  //큐 타입 (게임 타입)
  let gameType;
  switch (match.info.queueId) {
    case 400:
      gameType = "일반";
      break;
    case 420:
      gameType = "솔랭";
      break;
    case 430:
      gameType = "일반";
      break;
    case 440:
      gameType = "자유 5:5 랭크";
      break;
    case 450:
      gameType = "무작위 총력전";
      break;
    case 700:
      gameType = "격전";
      break;
    case 830:
      gameType = "입문";
      break;
    case 840:
      gameType = "초보";
      break;
    case 850:
      gameType = "중급";
      break;
    case 900:
      gameType = "모두 무작위 U.R.F.";
      break;
    case 920:
      gameType = "포로왕";
      break;
    case 1020:
      gameType = "단일 챔피언";
      break;
    case 1300:
      gameType = "돌격 넥서스";
      break;
    case 1400:
      gameType = "궁극기 주문서";
      break;
    case 2000:
    case 2010:
    case 2020:
      gameType = "튜토리얼";
      break;
    default:
      break;
  }

  //스펠
  let spellA;
  let spellB;
  switch (currentPlayer.summoner1Id) {
    case 11:
      spellA = "SummonerSmite";
      break;
    case 4:
      spellA = "SummonerFlash";
      break;
    case 6:
      spellA = "SummonerHaste";
      break;
    case 7:
      spellA = "SummonerHeal";
      break;
    case 12:
      spellA = "SummonerTeleport";
      break;
    case 21:
      spellA = "SummonerBarrier";
      break;
    case 14:
      spellA = "SummonerDot";
      break;
    case 3:
      spellA = "SummonerExhaust";
      break;
    case 13:
      spellA = "SummonerMana";
      break;
    case 1:
      spellA = "SummonerBoost";
      break;
    case 39:
      spellA = "SummonerSnowURFSnowball_Mark";
      break;
    default:
      break;
  }
  switch (currentPlayer.summoner2Id) {
    case 11:
      spellB = "SummonerSmite";
      break;
    case 4:
      spellB = "SummonerFlash";
      break;
    case 6:
      spellB = "SummonerHaste";
      break;
    case 7:
      spellB = "SummonerHeal";
      break;
    case 12:
      spellB = "SummonerTeleport";
      break;
    case 21:
      spellB = "SummonerBarrier";
      break;
    case 14:
      spellB = "SummonerDot";
      break;
    case 3:
      spellB = "SummonerExhaust";
      break;
    case 13:
      spellB = "SummonerMana";
      break;
    case 1:
      spellB = "SummonerBoost";
      break;
    case 39:
      spellB = "SummonerSnowURFSnowball_Mark";
      break;
    default:
      break;
  }

  //룬
  let runeA;
  let runeB;
  switch (currentPlayer.perks.styles[0].selections[0].perk) {
    case 8005:
      runeA = "Precision/PressTheAttack/PressTheAttack";
      break;
    case 8008:
      runeA = "Precision/LethalTempo/LethalTempoTemp";
      break;
    case 8021:
      runeA = "Precision/FleetFootwork/FleetFootwork";
      break;
    case 8010:
      runeA = "Precision/Conqueror/Conqueror";
      break;
    case 8112:
      runeA = "Domination/Electrocute/Electrocute";
      break;
    case 8124:
      runeA = "Domination/Predator/Predator";
      break;
    case 8128:
      runeA = "Domination/DarkHarvest/DarkHarvest";
      break;
    case 9923:
      runeA = "Domination/HailOfBlades/HailOfBlades";
      break;
    case 8214:
      runeA = "Sorcery/SummonAery/SummonAery";
      break;
    case 8229:
      runeA = "Sorcery/ArcaneComet/ArcaneComet";
      break;
    case 8230:
      runeA = "Sorcery/PhaseRush/PhaseRush";
      break;
    case 8437:
      runeA = "Resolve/GraspOfTheUndying/GraspOfTheUndying";
      break;
    case 8439:
      runeA = "Resolve/VeteranAftershock/VeteranAftershock";
      break;
    case 8465:
      runeA = "Resolve/Guardian/Guardian";
      break;
    case 8351:
      runeA = "Inspiration/GlacialAugment/GlacialAugment";
      break;
    case 8360:
      runeA = "Inspiration/UnsealedSpellbook/UnsealedSpellbook";
      break;
    case 8369:
      runeA = "Inspiration/FirstStrike/FirstStrike";
      break;
  }
  //서브룬 이미지
  switch (currentPlayer.perks.styles[1].style) {
    case 8000:
      runeB = "7201_Precision";
      break;
    case 8100:
      runeB = "7200_Domination";
      break;
    case 8200:
      runeB = "7202_Sorcery";
      break;
    case 8300:
      runeB = "7203_Whimsy";
      break;
    case 8400:
      runeB = "7204_Resolve";
      break;
    default:
      break;
  }

  useEffect(() => {
    setCurrentMatch((prev: any) => [...prev, currentPlayer]);
    setTotalKillPart((prev: any) => [...prev, killPart]);
  }, []);

  return (
    <>
      {match !== undefined ? (
        <>
          <Match isWin={win}>
            <GameContainer>
              <Game>
                <Type isWin={win}>{gameType}</Type>
                <Timestamp>-시간 전</Timestamp>
                <Horizontal></Horizontal>
                <Result isWin={win}>{win ? "승리" : "패배"}</Result>
                <Length>{`${gameDuration}분`}</Length>
              </Game>
              <GameInfo>
                <TopRow>
                  <Champion>
                    <ChampionIconBox>
                      <ChampionIcon
                        src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${fixChampion}.png`}
                      ></ChampionIcon>
                      <ChampionLevel>{currentPlayer.champLevel}</ChampionLevel>
                    </ChampionIconBox>
                    <SpellContainer>
                      <SpellBox>
                        <SpellIcon
                          src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/spell/${spellA}.png`}
                        />
                      </SpellBox>
                      <SpellBox>
                        <SpellIcon
                          src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/spell/${spellB}.png`}
                        />
                      </SpellBox>
                    </SpellContainer>
                    <RuneContainer>
                      <MainRune>
                        <RuneIcon
                          src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${runeA}.png`}
                        />
                      </MainRune>
                      <RuneIcon
                        src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${runeB}.png`}
                      />
                    </RuneContainer>
                  </Champion>
                  <KDAContainer>
                    <KDA>
                      <KDASpan red={false}>{currentPlayer.kills}</KDASpan>/
                      <KDASpan red={true}>{currentPlayer.deaths}</KDASpan>/
                      <KDASpan red={false}>{currentPlayer.assists}</KDASpan>
                    </KDA>
                    <Ratio>
                      <span>{kda}</span> 평점
                    </Ratio>
                  </KDAContainer>
                  <Stats>
                    <Stat color="red">킬관여 {killPart}%</Stat>
                    <Stat color="gray">
                      제어와드 {currentPlayer.visionWardsBoughtInGame}
                    </Stat>
                    <Stat color="gray">
                      cs {CS}({CSm.toFixed(1)})
                    </Stat>
                    <Stat color="gray"></Stat>
                  </Stats>
                </TopRow>
                <BottomRow>
                  <ItemContainer>
                    <ItemUl>
                      <li>
                        <ItemBox isWin={win}>
                          {itemList.item0 ? (
                            <ItemIcon
                              src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${currentPlayer.item0}.png`}
                            />
                          ) : null}
                        </ItemBox>
                      </li>
                      <li>
                        <ItemBox isWin={win}>
                          {itemList.item1 ? (
                            <ItemIcon
                              src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${currentPlayer.item1}.png`}
                            />
                          ) : null}
                        </ItemBox>
                      </li>
                      <li>
                        <ItemBox isWin={win}>
                          {itemList.item2 ? (
                            <ItemIcon
                              src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${currentPlayer.item2}.png`}
                            />
                          ) : null}
                        </ItemBox>
                      </li>
                      <li>
                        <ItemBox isWin={win}>
                          {itemList.item3 ? (
                            <ItemIcon
                              src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${currentPlayer.item3}.png`}
                            />
                          ) : null}
                        </ItemBox>
                      </li>
                      <li>
                        <ItemBox isWin={win}>
                          {itemList.item4 ? (
                            <ItemIcon
                              src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${currentPlayer.item4}.png`}
                            />
                          ) : null}
                        </ItemBox>
                      </li>
                      <li>
                        <ItemBox isWin={win}>
                          {itemList.item5 ? (
                            <ItemIcon
                              src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${currentPlayer.item5}.png`}
                            />
                          ) : null}
                        </ItemBox>
                      </li>
                    </ItemUl>
                    <WardBox isWin={win}>
                      <WardIcon
                        src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${currentPlayer.item6}.png`}
                      />
                    </WardBox>
                  </ItemContainer>
                </BottomRow>
              </GameInfo>
              <PartContainer>
                <ul>
                  {teamLeft.map((item: any, index: any) => (
                    <PartLi>
                      <PartIconBox>
                        <PartIcon
                          src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${item.championName}.png`}
                        />
                      </PartIconBox>
                      <PartNameBox>
                        {currentPlayer.summonerName === item.summonerName ? (
                          <PartNameB>{item.summonerName}</PartNameB>
                        ) : (
                          <PartName>{item.summonerName}</PartName>
                        )}
                      </PartNameBox>
                    </PartLi>
                  ))}
                </ul>
                <ul>
                  {teamRight.map((item: any) => (
                    <PartLi>
                      <PartIconBox>
                        <PartIcon
                          src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${item.championName}.png`}
                        />
                      </PartIconBox>
                      <PartNameBox>
                        {currentPlayer.summonerName === item.summonerName ? (
                          <PartNameB>{item.summonerName}</PartNameB>
                        ) : (
                          <PartName>{item.summonerName}</PartName>
                        )}
                      </PartNameBox>
                    </PartLi>
                  ))}
                </ul>
              </PartContainer>
            </GameContainer>
            <Detail>
              <DetailBtn isWin={win}></DetailBtn>
            </Detail>
          </Match>
        </>
      ) : null}
    </>
  );
}

export default MatchHistorys;
