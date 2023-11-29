import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import {
	ContentsType,
	RiotAccount,
	RiotId,
	SearchResult,
	Summoner,
	UserDocument,
} from '@/@types/types'
import { firebaseAPI } from '@/utils/firebaseApi'
import { api } from '@/utils/api'

import { usePathname } from 'next/navigation'
import { extractSummonerName, handleRiotId } from '@/utils'
import SummonerHead from '@/components/summonerPage/SummonerHead'
import SummonerBody from '@/components/summonerPage/SummonerBody'
import Header from '@/components/layout/Header'

// export async function getServerSideProps() {
// 	const res = await firebaseAPI.getUserDocument('멀록몰록말록물록')
// 	return { props: { res } }
// }

function Summoners() {
	const pathname = usePathname()
	const matchQty = 20

	const [userDocument, setUserDocument] = useState<UserDocument>()
	const [matchInfoArr, setMatchInfoArr] = useState<any>()
	const [loadingPercent, setLoadingPercent] = useState<number>(100)
	const [selectedContents, setSelectedContents] =
		useState<ContentsType>('MatchHistorys')

	async function getRiotApi(riotId: RiotId) {
		const accountRes: RiotAccount = await api.getAccountByNextApi(riotId)
		setLoadingPercent(20)
		const summonerRes: Summoner = await api.getSummonerByPuuid(accountRes.puuid)
		setLoadingPercent(40)
		const leagueRes = await api.getLeagueInfo(summonerRes.id)
		setLoadingPercent(100)
		const matchIdsRes: string[] = await api.getMatchId(
			summonerRes.puuid,
			matchQty,
		)

		return { accountRes, summonerRes, leagueRes, matchIdsRes }
	}

	async function refresh(riotId: RiotId) {
		const riotApiResult = await getRiotApi(riotId)
		const postFirebaseResult = await firebaseAPI.postUserDocumentOnDB(
			riotApiResult.summonerRes,
			riotApiResult.leagueRes,
			riotApiResult.matchIdsRes,
			riotApiResult.accountRes,
		)
		setUserDocument(postFirebaseResult)
		const matchInfoResult = await handleMatchInfo(
			postFirebaseResult.matchHistory,
		)
		setMatchInfoArr(matchInfoResult)
	}

	async function searchMatchId(matchIdArr?: string[]) {
		if (matchIdArr === undefined || matchIdArr.length < 1) return []
		const searchResult = await Promise.all(
			matchIdArr.map(async (matchID: string) => {
				const res = await firebaseAPI.getMatchFromDB(matchID)
				if (res === undefined) return matchID
				return res
			}),
		)
		const existMatchInfoArr = searchResult.filter((e) => typeof e !== 'string')
		const unExistMatchIdArr = searchResult.filter((e) => typeof e === 'string')

		return { existMatchInfoArr, unExistMatchIdArr }
	}

	async function checkExistMatch(searchResult: SearchResult) {
		if (!searchResult) return
		const { existMatchInfoArr, unExistMatchIdArr } = searchResult

		if (unExistMatchIdArr === undefined) {
			return existMatchInfoArr
		} else {
			const getMatchInfoAndPost = await Promise.all(
				unExistMatchIdArr.map(async (matchID: string) => {
					const matchInfo = await api.getMatchInfo(matchID)
					const firebaseRes = await firebaseAPI.postMatchInfoOnDB(matchInfo)
					return matchInfo
				}),
			)
			const mergedArr = [...existMatchInfoArr, ...getMatchInfoAndPost]
			return mergedArr
		}
	}

	async function handleMatchInfo(matchIdArr?: string[]) {
		const searchResult: any = await searchMatchId(matchIdArr)
		const handleResult = await checkExistMatch(searchResult)
		const sortByTime = handleResult
			?.slice()
			.sort((a, b) => b.info.gameCreation - a.info.gameCreation)

		return sortByTime
	}

	//첫 진입 시 닉네임 추출
	useEffect(() => {
		if (pathname === null) return

		async function initAction() {
			const extractedSummonerName = extractSummonerName(pathname)

			const riotId = handleRiotId(extractedSummonerName, '-')

			const userResult: any = await firebaseAPI.getUserDocumentByRiotId(riotId)
			if (userResult) {
				const matchInfoResult = await handleMatchInfo(userResult.matchHistory)
				setUserDocument(userResult)
				setMatchInfoArr(matchInfoResult)
			} else {
				const refreshRes = await refresh(riotId)
			}
		}

		initAction()
	}, [pathname])

	return (
		<>
			<Header />
			{userDocument && (
				<>
					<SummonerHead
						userDocument={userDocument}
						selectedContents={selectedContents}
						setSelectedContents={setSelectedContents}
						refresh={refresh}
						loadingPercent={loadingPercent}
					/>
					<SummonerBody
						userDocument={userDocument}
						matchInfoArr={matchInfoArr}
					/>
				</>
			)}
		</>
	)
}

export default Summoners
