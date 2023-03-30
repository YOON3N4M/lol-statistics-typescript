import styled from "styled-components";
import { MatchInfoObj, UserDocument } from "../routes/Summoners";

interface Props {
  userInfo: UserDocument;
  match: MatchInfoObj;
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
const GameContainer = styled.div``;
const Game = styled.div``;
const Type = styled.div<{ isWin: boolean }>``;
const Timestamp = styled.div``;
const Horizontal = styled.div``;
const Result = styled.div<{ isWin: boolean }>``;
const Length = styled.div``;
const GameInfo = styled.div``;
const TopRow = styled.div``;
const Champion = styled.div``;
const IconBox = styled.div``;
const Icon = styled.img``;
const ChampionLevel = styled.span``;
const SpellContainer = styled.div``;
const SpellBox = styled.div``;
const SpellIcon = styled.img``;
const RuneContainer = styled.div``;
const MainRune = styled.div``;
const RuneIcon = styled.img``;
const KDAContainer = styled.div``;
const KDA = styled.div``;
const Ratio = styled.div``;
const Stats = styled.div``;
const Stat = styled.div<{ color: string }>``;
const BottomRow = styled.div``;
const ItemContainer = styled.div``;
const ItemBox = styled.div<{ isWin: boolean }>``;
const ItemIcon = styled.img``;
const WardBox = styled.div<{ isWin: boolean }>``;
const WardIcon = styled.img``;
const PartContainer = styled.div``;
const PartIconBox = styled.div``;
const PartIcon = styled.img``;
const PartName = styled.div``;
const PartNameB = styled.b<{ isCurrent: boolean }>``;
const Detail = styled.div``;
const DetailBtn = styled.button<{ isWin: boolean }>``;

function MatchHistorys({ userInfo, match }: Props) {
  const name = userInfo.name;
  // 매치 내 검색된 플레이어와 이름이 같은 플레이어의 정보를 currentPlayer에 할당
  const currentPlayer: PlayerObj = match.info.participants.filter(
    (player: PlayerObj) => player.summonerName === name
  )[0];
  // 매치 내 플레이어 10명중 검색된 플레이어와 같은 팀인 플레이어를 teamA에 할당
  const teamA = match.info.participants.filter(
    (player: PlayerObj) => player.teamId === currentPlayer.teamId
  );
  const teamATotalKills = teamA.reduce(function add(sum: any, item: any) {
    return sum + item.kills;
  }, 0);
  //킬 관여율
  let killPart;
  if (teamATotalKills !== 0) {
    killPart = Math.round(
      ((currentPlayer.kills + currentPlayer.assists) / teamATotalKills) * 100
    );
  } else {
    killPart = 0;
  }
  //승패
  const Win = currentPlayer.win;
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
  return (
    <>
      <Match isWin={Win}></Match>
    </>
  );
}

export default MatchHistorys;
