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
import { variable } from '@/styles/Globalstyles'

// export async function getServerSideProps() {
// 	const res = await firebaseAPI.getUserDocument('멀록몰록말록물록')
// 	return { props: { res } }
// }

function Summoners() {
	const pathname = usePathname()
	const matchQty = 20

	const [status, setStatus] = useState(true)
	const [userDocument, setUserDocument] = useState<UserDocument>()
	const [matchInfoArr, setMatchInfoArr] = useState<any>()
	const [loadingPercent, setLoadingPercent] = useState<number>(100)
	const [selectedContents, setSelectedContents] =
		useState<ContentsType>('MatchHistorys')

	async function getRiotApi(riotId: RiotId) {
		try {
			const accountRes: RiotAccount = await api.getAccountByNextApi(riotId)
			setLoadingPercent(20)
			const summonerRes: Summoner = await api.getSummonerByPuuid(
				accountRes.puuid,
			)
			setLoadingPercent(40)
			const leagueRes = await api.getLeagueInfo(summonerRes.id)
			setLoadingPercent(100)
			const matchIdsRes: string[] = await api.getMatchId(
				summonerRes.puuid,
				matchQty,
			)
			setStatus(true)
			return { accountRes, summonerRes, leagueRes, matchIdsRes }
		} catch {
			setStatus(false)
		}
	}

	async function refresh(riotId: RiotId) {
		const riotApiResult = await getRiotApi(riotId)
		if (!riotApiResult) return
		const postFirebaseResult = await firebaseAPI.postUserDocumentOnDB(
			riotApiResult.summonerRes,
			riotApiResult.leagueRes,
			riotApiResult.matchIdsRes,
			riotApiResult.accountRes,
		)
		console.log(riotApiResult.accountRes)
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
				setStatus(true)
			} else {
				const refreshRes = await refresh(riotId)
			}
		}

		initAction()
	}, [pathname])

	useEffect(() => {
		if (selectedContents === 'InGame') {
			alert('현재 인게임 정보 기능은 수정중에 있습니다.')
			setSelectedContents('MatchHistorys')
		}
	}, [selectedContents])

	return (
		<>
			<Header />
			<StyledSummonerContainer>
				{!status && (
					<StyledErrorContainer>
						<h3>KR 지역 내 검색결과가 없습니다.</h3>
						<p>변경된 RIOT ID 시스템에 따라 재시도 해주세요.</p>
						<div className="body">
							<div>
								<h4>기존 닉네임 검색</h4>
								<span className="name">Hide on bush#KR1</span>
								<span>태그 생략가능</span>
							</div>
							<div>
								<h4>RIOT ID 검색</h4>
								<span className="name">허거덩#0303</span>
								<span>태그까지 필수 입력</span>
							</div>
						</div>
					</StyledErrorContainer>
				)}
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
			</StyledSummonerContainer>
		</>
	)
}

export default Summoners

const StyledSummonerContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const StyledErrorContainer = styled.div`
	margin: 0 auto;
	margin-top: 50px;
	padding: 5px 50px;
	box-sizing: border-box;
	width: 1024px;
	min-height: 300px;
	background-color: white;
	border-radius: 4px;
	h3 {
		text-align: center;
	}
	p {
		text-align: center;
		color: ${variable.color.gray};
	}

	.body {
		margin-top: 40px;
	}
	.name {
		background-color: #f7f7f9;
		color: #4d4d4d;
		padding: 2px 4px;
		border-radius: 4px;
		font-weight: 600;
		margin-right: 5px;
	}
`
