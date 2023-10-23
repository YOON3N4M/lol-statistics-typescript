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
