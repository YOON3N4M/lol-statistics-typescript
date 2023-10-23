import IRON from '../img/tier/iron.png'
import BRONZE from '../img/tier/bronze.png'
import SILVER from '../img/tier/silver.png'
import GOLD from '../img/tier/gold.png'
import PLATINUM from '../img/tier/platinum.png'
import DIAMOND from '../img/tier/diamond.png'
import MASTER from '../img/tier/master.png'
import GRANDMASTER from '../img/tier/grandmaster.png'
import CHALLENGER from '../img/tier/challenger.png'

// KEY and ETC....
export const API_KEY = process.env.REACT_APP_RIOT_API_KEY

// API URL
export const SUMMONER_INFO_URL = (nickname) => {
	return `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${API_KEY}`
}
export const LEAGUE_INFO_URL = (id) => {
	return `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`
}
export const MATCH_INFO_URL = (puuid, qty) => {
	return `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${qty}&api_key=${API_KEY}`
}

// Images
export const tierIcon = {
	IRON,
	BRONZE,
	SILVER,
	GOLD,
	PLATINUM,
	DIAMOND,
	MASTER,
	GRANDMASTER,
	CHALLENGER,
}
