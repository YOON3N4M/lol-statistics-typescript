import { RiotId } from "@/types/types";
import {
  ACCOUNT_BY_RIOT_ID_URL,
  INGAME_INFO_URL,
  LEAGUE_INFO_URL,
  MATCH_ID_URL,
  MATCH_INFO_URL,
  SUMMONER_BY_PUUID_ID,
  SUMMONER_INFO_URL,
} from "@/constants";
import axios from "axios";

async function getSummonersInfo(summonersName: string) {
  const res = await axios.get(SUMMONER_INFO_URL(summonersName));

  return res.data;
}

async function getSummonerByPuuid(puuid: string) {
  const res = await axios.get(SUMMONER_BY_PUUID_ID(puuid));

  return res.data;
}

async function getLeagueInfo(id: string) {
  const res = await axios.get(LEAGUE_INFO_URL(id));
  return res.data;
}

async function getMatchId(puuid: string, qty: number) {
  const res = await axios.get(MATCH_ID_URL(puuid, qty));
  return res.data;
}

async function getMatchInfo(id: string) {
  const res = await axios.get(MATCH_INFO_URL(id));
  console.log(res.data);
  return res.data;
}

async function getInGameInfo(summonerId: string) {
  const res = await axios.get(INGAME_INFO_URL(summonerId));
  return res.data;
}

async function getAccountByRiotId(riotId: RiotId) {
  const res = await axios.get(ACCOUNT_BY_RIOT_ID_URL(riotId.name, riotId.tag));
  console.log(res);
  return res.data;
}

async function getAccountByNextApi(riotId: RiotId) {
  const nextUrl = "/api/account";
  const res = await axios(nextUrl, { params: riotId });

  return { ...res.data, tagLine: riotId.tag, gameName: riotId.name };
}

export const api = {
  getSummonersInfo,
  getLeagueInfo,
  getMatchId,
  getMatchInfo,
  getInGameInfo,
  getAccountByRiotId,
  getAccountByNextApi,
  getSummonerByPuuid,
};
