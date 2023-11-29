import { fixedChampionName } from '@/utils'

import IRON from '@/img/tier/iron.png'
import BRONZE from '@/img/tier/bronze.png'
import SILVER from '@/img/tier/silver.png'
import GOLD from '@/img/tier/gold.png'
import PLATINUM from '@/img/tier/platinum.png'
import DIAMOND from '@/img/tier/diamond.png'
import MASTER from '@/img/tier/master.png'
import GRANDMASTER from '@/img/tier/grandmaster.png'
import CHALLENGER from '@/img/tier/challenger.png'
import EMERALD from '@/img/tier/emerald.png'

import TOP_ICON from '@/img/lane/top.svg'
import JG_ICON from '@/img/lane/jg.svg'
import MID_ICON from '@/img/lane/mid.svg'
import ADC_ICON from '@/img/lane/adc.svg'
import SUP_ICON from '@/img/lane/sup.svg'

// KEY and ETC...
export const API_KEY = process.env.NEXT_PUBLIC_RIOT_API_KEY
export const DATA_DRAGON_VERSION = '13.23.1'

// API URL
export const SUMMONER_INFO_URL = (nickname: string) => {
	return `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${API_KEY}`
}

export const SUMMONER_BY_PUUID_ID = (puuid: string) => {
	return `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`
}
export const LEAGUE_INFO_URL = (id: string) => {
	return `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`
}
export const MATCH_ID_URL = (puuid: string, qty: number) => {
	return `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${qty}&api_key=${API_KEY}`
}

export const MATCH_INFO_URL = (id: string) => {
	return `https://asia.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`
}

export const INGAME_INFO_URL = (summonerId: string) => {
	return `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${API_KEY}`
}

export const ACCOUNT_BY_RIOT_ID_URL = (name: string, tag: string) => {
	return `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${API_KEY}`
}

// DataDragon
export const CHAMPION_ICON_URL = (championName: string) => {
	return `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/champion/${fixedChampionName(
		championName,
	)}.png`
}

export const SUMMONER_PROFILE_ICON_URL = (iconId: number) => {
	return `http://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/profileicon/${iconId}.png`
}

export const SUMMONER_SPELL_ICON_URL = (spellName?: string) => {
	return `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/spell/${spellName}.png`
}

export const RUNE_ICON_URL = (runeId?: string) => {
	return `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${runeId}.png`
}

export const ITEM_ICON_URL = (itemId: number) => {
	return `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/item/${itemId}.png`
}

export const CHAMPIONS_JSON_URL = `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/data/ko_KR/champion.json`

// Images
export const tierIcon = {
	//@ts-ignore
	IRON: IRON.src,
	//@ts-ignore
	BRONZE: BRONZE.src,
	//@ts-ignore
	SILVER: SILVER.src,
	//@ts-ignore
	GOLD: GOLD.src,
	//@ts-ignore
	PLATINUM: PLATINUM.src,
	//@ts-ignore
	EMERALD: EMERALD.src,
	//@ts-ignore
	DIAMOND: DIAMOND.src,
	//@ts-ignore
	MASTER: MASTER.src,
	//@ts-ignore
	GRANDMASTER: GRANDMASTER.src,
	//@ts-ignore
	CHALLENGER: CHALLENGER.src,
}

export const positionIcon = {
	topIcon: TOP_ICON.src,
	jgIcon: JG_ICON.src,
	midIcon: MID_ICON.src,
	adcIcon: ADC_ICON.src,
	supIcon: SUP_ICON.src,
}
