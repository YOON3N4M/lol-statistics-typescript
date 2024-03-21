export interface RiotId {
  name: string;
  tag: string;
}

export interface RiotAccount {
  gameName: string;
  puuid: string;
  tagLine: string;
}

export interface Summoner {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  summonerLevel: number;
}
////
export interface LeagueObj {
  wins: number;
  losses: number;
  rank: string;
  tier: string;
  leaguePoints: number;
  queueType: string;
}

export type LeagueArray = Array<LeagueObj>;

export interface MatchInfoObj {
  info?: any;
  metadata?: any;
}

export interface RefinedTeamStats {
  totalKills: number;
  totalBaronKills: number;
  totalTurretKills: number;
  totalDragonKills: number;
  totalGold: number;
  totalDealtToChampion: number;
}

export interface RefinedMatchInfo {
  queueType: string;
  gameDurationTime: string;
  teamA: RefinedParticipantInfo[];
  teamAStats: RefinedTeamStats;
  teamB: RefinedParticipantInfo[];
  teamBStats: RefinedTeamStats;
  gameDurationTimeNum: number;
  win: boolean;
  gameCreation: number;
}
export interface RefinedMatchStatistics {
  currentPlayer: RefinedParticipantInfo;
  refinedMatchInfo: RefinedMatchInfo;
}
export type MatchInfoArray = Array<MatchInfoObj> | undefined[] | undefined;

//firebase
export interface UserDocument {
  accountId: string;
  id: string;
  name: string;
  nameRe?: string;
  profileIconId: number;
  puuid: string;
  summonerLevel: number;
  league1?: any;
  league2?: any;
  matchHistory?: Array<string>;
  lastRequestTime: number;
  riotId: string;
}

export interface RiotApiObj {
  summonerInfo: Summoner[];
  leagueInfo: LeagueObj[];
  matchInfo: string[];
}

export interface ParticipantInfo {
  riotIdGameName: string;
  riotIdTagline: "KR1" | string;
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
  physicalDamageDealtToChampions: number;
  magicDamageDealtToChampions: number;
  totalDamageTaken: number;
  wardsKilled: number;
  wardsPlaced: number;
  goldEarned: number;
  dragonKills: number;
  baronKills: number;
  turretKills: number;
  championId: number;
  puuid: string;
}

export interface RefinedParticipantInfo {
  riotIdGameName: string;
  riotIdTagline: "KR1" | string;
  championName: string;
  kda: number;
  cs: number;
  kills: number;
  deaths: number;
  assists: number;
  teamId: number;
  //csPerMin,
  summonersSpell: { a: SummonerSpell; b: SummonerSpell };
  rune: { main: MainRune; sub: SubRune };
  dealtToChampion: number;
  totalDamageTaken: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  items: number[];
  item6: number;
  goldEarned: number;
  dragonKills: number;
  baronKills: number;
  turretKills: number;
  summonerName: string;
  win: boolean;
  champLevel: number;
  championId: number;
  puuid: string;
}

export interface LeagueInfo {
  leaguePoints: number;
  losses: number;
  queueType: "RANKED_SOLO_5x5";
  rank: string;
  summonerId: string;
  summonerName: string;
  tier:
    | "IRON"
    | "BRONZE"
    | "SILVER"
    | "GOLD"
    | "PLATINUM"
    | "EMERALD"
    | "DIAMOND"
    | "MASTER"
    | "GRANDMASTER"
    | "CHALLENGER";

  wins: number;
}
export interface ParticipantsData extends Array<ParticipantInfo[]> {
  [index: number]: ParticipantInfo[];
}

export interface SearchResult {
  existMatchInfoArr: MatchInfoObj[];
  unExistMatchIdArr: string[];
}

type SummonerSpell = "SummonerSmite" | "SummonerFlash" | string;
type MainRune = "Precision/Conqueror/Conqueror" | string;
type SubRune = "7203_Whimsy" | string;
export type QueueTypeStr =
  | "일반"
  | "솔랭"
  | "일반"
  | "자유 5:5 랭크"
  | "무작위 총력전"
  | "빠른 대전"
  | "격전"
  | "입문"
  | "초보"
  | "중급"
  | "모두 무작위 U.R.F."
  | "포로왕"
  | "단일 챔피언"
  | "돌격 넥서스"
  | "궁극기 주문서"
  | "튜토리얼"
  | "아레나"
  | "미등록";
