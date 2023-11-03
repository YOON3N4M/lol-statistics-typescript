import { PlayerObj } from '../@types/types'
import { tierIcon } from '../constants'
import championsData from '../data/championsData.json'

// 티어 표기의 로마 숫자를 아랍 숫자로 변환
export function romeNumToArabNum(rome: string) {
	switch (rome) {
		case 'I':
			return 1
		case 'II':
			return 2
		case 'III':
			return 3
		case 'IV':
			return 4
	}
}

// 각 티어의 문자열과 이미지를 텍스트 대치
export function matchingTierImg(tier: string) {
	switch (tier) {
		case 'IRON':
			return tierIcon.IRON
		case 'BRONZE':
			return tierIcon.BRONZE
		case 'SILVER':
			return tierIcon.SILVER
		case 'GOLD':
			return tierIcon.GOLD
		case 'PLATINUM':
			return tierIcon.PLATINUM
		case 'EMERALD':
			return tierIcon.EMERALD
		case 'DIAMOND':
			return tierIcon.DIAMOND
		case 'MASTER':
			return tierIcon.MASTER
		case 'GRANDMASTER':
			return tierIcon.GRANDMASTER
		case 'CHALLENGER':
			return tierIcon.CHALLENGER
		default:
			return 'unranked'
	}
}

// 팀 전체킬 대비 특정 플레이어의 킬 관여율
export function getKillParticipationRate(
	totalKills: number,
	playerKills: number,
	playerAssist: number,
) {
	if (totalKills === 0) {
		return 0
	}

	return Math.round(((playerKills + playerAssist) / totalKills) * 100)
}

// KDA 계산
export function getKDA(kills: number, deaths: number, assists: number) {
	if (kills + assists > 0 && deaths === 0) {
		return 'Perfect'
	} else if (kills + deaths + assists === 0) {
		return '0.00'
	} else {
		return ((kills + assists) / deaths).toFixed(2)
	}
}

// CS 계산 gameDuration 인자가 있으면 총 CS가 아닌 분당 CS return
export function getCS(
	neutralMinionsKills: number,
	totalMinionsKills: number,
	gameDuration?: number,
) {
	if (gameDuration) {
		return ((neutralMinionsKills + totalMinionsKills) / gameDuration).toFixed(1)
	}
	return neutralMinionsKills + totalMinionsKills
}

// 큐 타입 코드에 따른 큐 타입 이름 대치
export function getQueueTypeName(queueType: number) {
	switch (queueType) {
		case 400:
			return '일반'

		case 420:
			return '솔랭'

		case 430:
			return '일반'

		case 440:
			return '자유 5:5 랭크'

		case 450:
			return '무작위 총력전'

		case 700:
			return '격전'

		case 830:
			return '입문'

		case 840:
			return '초보'

		case 850:
			return '중급'

		case 900:
			return '모두 무작위 U.R.F.'

		case 920:
			return '포로왕'

		case 1020:
			return '단일 챔피언'

		case 1300:
			return '돌격 넥서스'

		case 1400:
			return '궁극기 주문서'

		case 2000:
		case 2010:
		case 2020:
			return '튜토리얼'
		default:
			break
	}
}

// 스펠 코드에 따른 스펠 이름 대치
export function getSummonersSpellName(spellA: number, spellB: number) {
	//스펠
	let a
	let b
	switch (spellA) {
		case 11:
			a = 'SummonerSmite'
			break

		case 4:
			a = 'SummonerFlash'
			break

		case 6:
			a = 'SummonerHaste'
			break

		case 7:
			a = 'SummonerHeal'
			break

		case 12:
			a = 'SummonerTeleport'
			break

		case 21:
			a = 'SummonerBarrier'
			break

		case 14:
			a = 'SummonerDot'
			break

		case 3:
			a = 'SummonerExhaust'
			break

		case 13:
			a = 'SummonerMana'
			break

		case 1:
			a = 'SummonerBoost'
			break

		case 39:
			a = 'SummonerSnowURFSnowball_Mark'
			break

		default:
			break
	}
	switch (spellB) {
		case 11:
			b = 'SummonerSmite'
			break
		case 4:
			b = 'SummonerFlash'
			break
		case 6:
			b = 'SummonerHaste'
			break
		case 7:
			b = 'SummonerHeal'
			break
		case 12:
			b = 'SummonerTeleport'
			break
		case 21:
			b = 'SummonerBarrier'
			break
		case 14:
			b = 'SummonerDot'
			break
		case 3:
			b = 'SummonerExhaust'
			break
		case 13:
			b = 'SummonerMana'
			break
		case 1:
			b = 'SummonerBoost'
			break
		case 39:
			b = 'SummonerSnowURFSnowball_Mark'
			break
		default:
			break
	}

	return { a, b }
}

// 룬 코드에 따른 룬 이름 대치 (근데 이건 그대로 갖다 쓰는게 아닌 URL의 파라미터로 활용 되는 듯?)
export function getRuneName(mainRune: number, subRune: number) {
	let main
	let sub

	switch (mainRune) {
		case 8005:
			main = 'Precision/PressTheAttack/PressTheAttack'
			break
		case 8008:
			main = 'Precision/LethalTempo/LethalTempoTemp'
			break
		case 8021:
			main = 'Precision/FleetFootwork/FleetFootwork'
			break
		case 8010:
			main = 'Precision/Conqueror/Conqueror'
			break
		case 8112:
			main = 'Domination/Electrocute/Electrocute'
			break
		case 8124:
			main = 'Domination/Predator/Predator'
			break
		case 8128:
			main = 'Domination/DarkHarvest/DarkHarvest'
			break
		case 9923:
			main = 'Domination/HailOfBlades/HailOfBlades'
			break
		case 8214:
			main = 'Sorcery/SummonAery/SummonAery'
			break
		case 8229:
			main = 'Sorcery/ArcaneComet/ArcaneComet'
			break
		case 8230:
			main = 'Sorcery/PhaseRush/PhaseRush'
			break
		case 8437:
			main = 'Resolve/GraspOfTheUndying/GraspOfTheUndying'
			break
		case 8439:
			main = 'Resolve/VeteranAftershock/VeteranAftershock'
			break
		case 8465:
			main = 'Resolve/Guardian/Guardian'
			break
		case 8351:
			main = 'Inspiration/GlacialAugment/GlacialAugment'
			break
		case 8360:
			main = 'Inspiration/UnsealedSpellbook/UnsealedSpellbook'
			break
		case 8369:
			main = 'Inspiration/FirstStrike/FirstStrike'
			break
	}
	//서브룬 이미지
	switch (subRune) {
		case 8000:
			sub = '7201_Precision'
			break
		case 8100:
			sub = '7200_Domination'
			break
		case 8200:
			sub = '7202_Sorcery'
			break
		case 8300:
			sub = '7203_Whimsy'
			break
		case 8400:
			sub = '7204_Resolve'
			break
		default:
			break
	}

	return { main, sub }
}

export function getMatchStatistics(
	match: any,
	searchedName: string | undefined,
) {
	const currentPlayer: PlayerObj = match.info.participants.filter(
		(player: PlayerObj) => player.summonerName === searchedName,
	)[0]
	if (!currentPlayer) return
	const teamA = match.info.participants.filter(
		(player: PlayerObj) => player.teamId === currentPlayer?.teamId,
	)
	const teamB = match.info.participants.filter(
		(player: PlayerObj) => player.teamId !== currentPlayer?.teamId,
	)

	const teamATotalKills = teamA.reduce(function add(sum: any, item: any) {
		return sum + item.kills
	}, 0)

	const teamBTotalKills = teamB.reduce(function add(sum: any, item: any) {
		return sum + item.kills
	}, 0)

	const searchedPlayersKillPart = getKillParticipationRate(
		teamATotalKills,
		currentPlayer.kills,
		currentPlayer.assists,
	)

	const gameDurationTime = (match.info.gameDuration / 60).toFixed(0)
	const gameDurationTimeNum = Number(match.info.gameDuration / 60)
	const win = currentPlayer.win
	const championName = currentPlayer.championName
	const kda = getKDA(
		currentPlayer.kills,
		currentPlayer.deaths,
		currentPlayer.assists,
	)
	const cs = getCS(
		currentPlayer.neutralMinionsKilled,
		currentPlayer.totalMinionsKilled,
	)
	const csPerMin = getCS(
		currentPlayer.neutralMinionsKilled,
		currentPlayer.totalMinionsKilled,
		gameDurationTimeNum,
	)
	const queueType = getQueueTypeName(match.info.queueId)
	const summonersSpell = getSummonersSpellName(
		currentPlayer.summoner1Id,
		currentPlayer.summoner2Id,
	)
	const rune = getRuneName(
		currentPlayer.perks.styles[0].selections[0].perk,
		currentPlayer.perks.styles[1].style,
	)

	const searchedPlayer = {
		summonersSpell,
		rune,
		csPerMin,
		cs,
		kda,
		championName,
		win,
		searchedPlayersKillPart,
		level: currentPlayer.champLevel,
		kills: currentPlayer.kills,
		deaths: currentPlayer.deaths,
		assists: currentPlayer.assists,
		pinkWardQty: currentPlayer.visionWardsBoughtInGame,
		items: [
			currentPlayer.item0,
			currentPlayer.item1,
			currentPlayer.item2,
			currentPlayer.item3,
			currentPlayer.item4,
			currentPlayer.item5,
		],
		ward: currentPlayer.item6,
	}
	const matchStatistics = {
		queueType,
		gameDurationTime,
		teamA,
		teamB,
	}
	return { searchedPlayer, matchStatistics }
}

// API에서 받아오는 피들스틱의 이름을 다른 api 요청시에 사용하면 에러가 나서 해당 부분 처리
// 챔피언 이름 렌더링이 아닌 API 요청시에만 활용함.
export function fixedChampionName(championName: string) {
	if (championName === 'FiddleSticks') return 'Fiddlesticks'
	return championName
}

export function translateKorChampionName(championName: string) {
	const championsObj: any = championsData.data
	const koreanChampionName = championsObj[fixedChampionName(championName)].name

	return koreanChampionName
}
