import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from 'firebase/firestore'
import { dbService } from '../fBase'
import {
	LeagueObj,
	MatchInfoObj,
	SummonerObj,
	UserDocument,
} from '../@types/types'

async function getUserDocument(summonersName: string) {
	const q = query(
		collection(dbService, 'user'),
		where('nameRe', '==', summonersName?.replace(/ /g, '')),
	)

	const querySnapshot = await getDocs(q)
	let result
	querySnapshot.forEach((doc) => {
		result = doc.data()
	})

	return result
}

async function getMatchFromDB(MatchID: string) {
	const docRef = doc(dbService, 'match', MatchID)
	const docSnap = await getDoc(docRef)

	return docSnap.data() as MatchInfoObj
}

async function postUserDocumentOnDB(
	summonerInfo: SummonerObj,
	leagueInfo: LeagueObj[],
	matchInfo: string[],
) {
	console.log(summonerInfo, leagueInfo, matchInfo)

	const soloRank = leagueInfo.find(
		(league) => league.queueType === 'RANKED_SOLO_5x5',
	)
	const freeRank = leagueInfo.find(
		(league) => league.queueType === 'RANKED_FLEX_SR',
	)

	const userDocumentRef: UserDocument = {
		accountId: summonerInfo.accountId,
		id: summonerInfo.id,
		name: summonerInfo.name,
		nameRe: summonerInfo.name.replace(/ /g, ''),
		profileIconId: summonerInfo.profileIconId,
		puuid: summonerInfo.puuid,
		summonerLevel: summonerInfo.summonerLevel,
		matchHistory: matchInfo || [],
		league1: soloRank || null,
		league2: freeRank || null,
	}

	await setDoc(doc(dbService, 'user', summonerInfo.puuid), userDocumentRef)
}

export const firebaseAPI = {
	getUserDocument,
	getMatchFromDB,
	postUserDocumentOnDB,
}
