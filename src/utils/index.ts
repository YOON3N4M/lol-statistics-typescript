import { tierIcon } from '../constants'

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
