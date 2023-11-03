import { tierIcon } from '../constants'

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
		return (neutralMinionsKills + totalMinionsKills) / gameDuration
	}
	return neutralMinionsKills + totalMinionsKills
}
