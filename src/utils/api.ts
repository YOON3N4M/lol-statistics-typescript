import {
	LEAGUE_INFO_URL,
	MATCH_ID_URL,
	MATCH_INFO_URL,
	SUMMONER_INFO_URL,
} from '../constants'
import axios from 'axios'

async function getSummonersInfo(summonersName: string) {
	const res = await axios.get(SUMMONER_INFO_URL(summonersName))
	return res.data
}

async function getLeagueInfo(id: string) {
	const res = await axios.get(LEAGUE_INFO_URL(id))
	return res.data
}

async function getMatchId(puuid: string, qty: number) {
	const res = await axios.get(MATCH_ID_URL(puuid, qty))
	return res.data
}

async function getMatchInfo(id: string) {
	const res = await axios.get(MATCH_INFO_URL(id))
	return res.data
}

export const api = {
	getSummonersInfo,
	getLeagueInfo,
	getMatchId,
	getMatchInfo,
}
