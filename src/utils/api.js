import {
  LEAGUE_INFO_URL,
  MATCH_INFO_URL,
  SUMMONER_INFO_URL,
} from "../constants";
import axios from "axios";

async function getSummonersInfo(summonersName) {
  const res = await axios.get(SUMMONER_INFO_URL(summonersName));
  return res.data;
}

async function getLeagueInfo(id) {
  const res = await axios.get(LEAGUE_INFO_URL(id));
  return res.data;
}

async function getMatchInfo(puuid, qty) {
  const res = await axios.get(MATCH_INFO_URL(puuid, qty));
  return res.data;
}

export const api = {
  getSummonersInfo,
  getLeagueInfo,
  getMatchInfo,
};
