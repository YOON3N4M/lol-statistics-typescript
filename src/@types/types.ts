export interface SummonerObj {
	accountId: string
	id: string
	name: string
	profileIconId: number
	puuid: string
	summonerLevel: number
}
export interface LeagueObj {
	wins: number
	losses: number
	rank: string
	tier: string
	leaguePoints: number
	queueType: string
}

export type LeagueArray = Array<LeagueObj>

export interface MatchInfoObj {
	info?: any
	metadata?: any
}
export type MatchInfoArray = Array<MatchInfoObj> | undefined

export interface UserDocument {
	accountId?: string
	id?: string
	name?: string
	nameRe?: string
	profileIconId?: number
	puuid?: string
	summonerLevel?: number
	league1?: any
	league2?: any
	matchHistory?: Array<string>
}

export interface RiotApiObj {
	summonerInfo: SummonerObj[]
	leagueInfo: LeagueObj[]
	matchInfo: string[]
}

export interface PlayerObj {
	championName: string
	item0: number
	item1: number
	item2: number
	item3: number
	item4: number
	item5: number
	item6: number
	summoner1Id: number
	summoner2Id: number
	perks: any
	teamId: number
	summonerName: string
	kills: number
	assists: number
	win: boolean
	deaths: number
	queueId: number
	visionWardsBoughtInGame: number
	neutralMinionsKilled: number
	totalMinionsKilled: number
	champLevel: number
}

export interface ParticipantInfo {
	kills: number
	deaths: number
	assists: number
	win: boolean
	totalMinionsKilled: number
	neutralMinionsKilled: number
	championName: string
}

export interface LeagueInfo {
	leaguePoints: number
	losses: number
	queueType: 'RANKED_SOLO_5x5'
	rank: string
	summonerId: string
	summonerName: string
	tier:
		| 'IRON'
		| 'BRONZE'
		| 'SILVER'
		| 'GOLD'
		| 'PLATINUM'
		| 'EMERALD'
		| 'DIAMOND'
		| 'MASTER'
		| 'GRANDMASTER'
		| 'CHALLENGER'

	wins: number
}
export interface ParticipantsData extends Array<ParticipantInfo[]> {
	[index: number]: ParticipantInfo[]
}
