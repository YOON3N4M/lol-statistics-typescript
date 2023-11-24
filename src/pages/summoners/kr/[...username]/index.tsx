import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import {
	ContentsType,
	LeagueArray,
	LeagueObj,
	MatchInfoArray,
	MatchInfoObj,
	RiotApiObj,
	SearchResult,
	SummonerObj,
	UserDocument,
} from '@/@types/types'
import { firebaseAPI } from '@/utils/firebaseApi'
import { api } from '@/utils/api'
import { SUMMONER_PROFILE_ICON_URL } from '@/constants'

import MatchHistorys from '@/components/MatchHistorys'
import CurrentRank from '@/components/CurrentRank'
import MostPlayed from '@/components/MostPlayed'
import Summary from '@/components/Summary'
import Footer from '@/components/layout/Footer'
import ContentsSelectTab from '@/components/layout/ContentsSelectTab'
import Header from '@/components/layout/Header'
import { usePathname } from 'next/navigation'
import { extractSummonerName } from '@/utils'
import InGame from '@/components/InGame'

// export async function getServerSideProps() {
// 	const res = await firebaseAPI.getUserDocument('멀록몰록말록물록')
// 	return { props: { res } }
// }

function Summoners() {
	const pathname = usePathname()

	const [searchedSummonersName, setSearchedSummonersName] = useState('')
	const [userDocument, setUserDocument] = useState<UserDocument>()
	// matchQty 만큼의 총 전적
	const [matchInfoArr, setMatchInfoArr] = useState<MatchInfoArray | undefined>(
		[],
	)
	const matchQty = 20
	// matchQty 만큼의 총 전적 중 검색된 플레이어의 15게임 정보 (챔피언, kda 등등)
	const [mostPlayChampions, setMostPlayChampions] = useState<any>([])
	const [selectedContents, setSelectedContents] =
		useState<ContentsType>('MatchHistorys')
	///
	///
	///
	///
	const [alarm, setAlarm] = useState(false)

	//검색된 게임 포지션 비율
	const [notFound, setNotFound] = useState(false)
	function alarmFn() {
		setAlarm(true)
		setTimeout(() => {
			setAlarm(false)
		}, 3000)
	}

	async function getUserDocument(
		summonerName: string,
	): Promise<UserDocument | undefined> {
		try {
			console.log(summonerName)
			const result = await firebaseAPI.getUserDocument(summonerName)
			console.log(result)
			return result
		} catch {
			alert('DB에서 소환사 조회에 실패')
		}
	}

	async function getRiotAPI(summonerName: string) {
		try {
			const summonerInfo: SummonerObj = await api.getSummonersInfo(summonerName)
			const leagueInfo: LeagueObj[] = await api.getLeagueInfo(summonerInfo.id)
			const matchIdArr: string[] = await api.getMatchId(
				summonerInfo.puuid,
				matchQty,
			)
			const result = {
				summonerInfo,
				leagueInfo,
				matchIdArr,
			}
			const postDB = await firebaseAPI.postUserDocumentOnDB(
				summonerInfo,
				leagueInfo,
				matchIdArr,
			)

			return { result, postDB }
		} catch (error) {
			console.log(error)
			return false
		}
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

	// matchId중 DB에 없는 ID를 라이엇에 요청 후 받아온 데이터를 DB에 보내고
	// DB에 존재하던 matchInfoArr에 합친 후, return
	async function checkExistMatch(searchResult: SearchResult) {
		if (!searchResult) return
		const { existMatchInfoArr, unExistMatchIdArr } = searchResult
		console.log(searchResult, unExistMatchIdArr)

		if (unExistMatchIdArr.length === 0) {
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

	function getMostChampionArr() {
		if (!matchInfoArr) return
		const filtered = matchInfoArr?.map(
			(game) =>
				game?.info.participants.filter(
					(player: any) => player.summonerName === userDocument?.name,
				)[0],
		)

		const removeUndefined: any = filtered?.filter((item) => item !== undefined)
		const most = removeUndefined.reduce((acc: any, obj: any) => {
			const key = obj.championName
			acc[key] = (acc[key] || []).concat(obj)
			return acc
		}, {})
		const mostList = Object.values(most).sort(
			(a: any, b: any) => b.length - a.length,
		)

		setMostPlayChampions(mostList)
	}

	async function handleMatchInfo(matchIdArr?: string[]) {
		console.log(matchIdArr)
		const searchResult: any = await searchMatchId(matchIdArr)
		const handleResult = await checkExistMatch(searchResult)
		const sortByTime = handleResult
			?.slice()
			.sort((a, b) => b.info.gameCreation - a.info.gameCreation)

		return sortByTime
	}

	async function refresh() {
		if (!userDocument) return
		const lastRequest = userDocument.lastRequestTime
		const nowTime = new Date().getTime()
		const timeDiffer = Math.abs((lastRequest - nowTime) / 1000)
		console.log(timeDiffer)
		// 3분
		const timeLimit = 180
		if (timeDiffer < timeLimit) {
			const remainTime = Math.floor(timeLimit - timeDiffer)
			console.log(remainTime)
			alert(`전적 갱신은 180초마다 가능합니다. ${remainTime}초 남았습니다.`)
		} else {
			const riotApiResult: any = await getRiotAPI(searchedSummonersName)
			const result: any = await handleMatchInfo(riotApiResult.result.matchIdArr)
			setUserDocument(riotApiResult.postDB)
			setMatchInfoArr(result)
			console.log('갱신완료')
		}
	}

	//첫 진입 시 닉네임 추출
	useEffect(() => {
		if (pathname === null) return
		const extractedSummonerName = extractSummonerName(pathname)
		setSearchedSummonersName(extractedSummonerName)
	}, [pathname])

	// 닉네임 추출 후 첫 동작
	useEffect(() => {
		if (searchedSummonersName === '') return
		async function initRefresh() {
			// 1. 검색된 닉네임으로 DB체크 (있으면 UserDocumnet, 없으면 undefined)
			const userDoc = await getUserDocument(searchedSummonersName)

			let matchInfos: any
			if (!userDoc) {
				console.log('db에 존재하지 않는 소환사 입니다.')
				const riotApiResult: any = await getRiotAPI(searchedSummonersName)
				setUserDocument(riotApiResult.postDB)
				matchInfos = await handleMatchInfo(riotApiResult.result.matchIdArr)
			} else {
				console.log('db에 존재하는 소환사 입니다.')
				setUserDocument(userDoc)
				matchInfos = await handleMatchInfo(userDoc.matchHistory)
			}
			setMatchInfoArr(matchInfos)
		}

		initRefresh()
	}, [searchedSummonersName])

	useEffect(() => {
		if (matchInfoArr?.length === 0) return
		getMostChampionArr()
	}, [matchInfoArr])

	return (
		<>
			<Header />
			{notFound ? (
				<NotFoundMsg>
					등록되지 않은 소환사 입니다. 오타를 확인 후 다시 검색 해주세요.
				</NotFoundMsg>
			) : null}

			{userDocument !== undefined && (
				<>
					<ContentsHeader>
						<Wrapper>
							<ProfileIconContainer>
								<ProfileIcon
									src={SUMMONER_PROFILE_ICON_URL(userDocument.profileIconId)}
								/>
								<Level>{userDocument.summonerLevel}</Level>
							</ProfileIconContainer>
							<Info>
								<TierContainer>
									<ul>
										<TierLi>
											<Year></Year>
										</TierLi>
									</ul>
								</TierContainer>
								<Name>{userDocument.name}</Name>
								<RefreshBtn
									onClick={() => {
										refresh()
										// setMatchInfoArr(undefined)
										// setSearchedSummonersName('')
										// setMostPlayChampions([])
										// setUserDocument(undefined)
									}}
								>
									전적 갱신
								</RefreshBtn>
								<LastUpdate>최근 업데이트 : - </LastUpdate>
							</Info>
						</Wrapper>
					</ContentsHeader>
					<ContentsSelectTab
						setSelectedContents={setSelectedContents}
						selectedContents={selectedContents}
					/>
				</>
			)}
			{selectedContents === 'MatchHistorys' ? (
				<>
					{userDocument !== undefined && (
						<>
							<ContentsContainer>
								<LeftContents>
									<CurrentRank userDocument={userDocument} />
									<MostPlayed mostPlayChampions={mostPlayChampions} />
								</LeftContents>
								<RightContents>
									<MatchHistoryTab>
										<MatchHistroyTabUl>
											<MatchHistoryTabLi selected={true}>
												전체
											</MatchHistoryTabLi>
											<MatchHistoryTabLi selected={false}></MatchHistoryTabLi>
											<MatchHistoryTabLi selected={false}></MatchHistoryTabLi>
											<MatchHistoryTabLi selected={false}></MatchHistoryTabLi>
										</MatchHistroyTabUl>
									</MatchHistoryTab>
									{/** */}
									<Summary
										matchInfoArr={matchInfoArr}
										mostPlayChampions={mostPlayChampions}
									/>

									<MatchHistoryContainer>
										{matchInfoArr &&
											matchInfoArr.map((match: any) => (
												<MatchHistorys
													match={match}
													userDocument={userDocument}
												/>
											))}
									</MatchHistoryContainer>
								</RightContents>
							</ContentsContainer>
						</>
					)}
				</>
			) : (
				<InGame />
			)}

			<Footer></Footer>
		</>
	)
}

export default Summoners

//상단 헤더 부분 컴포넌트
const ContentsHeader = styled.div`
	background-color: white;
	width: 100%;
	height: 273-45px;
	padding-bottom: 25px;
	padding-top: 16px;
`
const Wrapper = styled.div`
	width: 1080px;
	margin-bottom: 10px;
	display: flex;
	margin: 0 auto;
`
const ProfileIconContainer = styled.div`
	width: 100px;
	height: 100px;
	display: block;
	margin-top: 52px;
`
const ProfileIcon = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 20px;
	z-index: -1;
`
const Level = styled.div`
	position: relative;
	display: block;
	margin: 0 auto;
	margin-top: -11px;
	text-align: center;
	font-size: 12px;
	color: white;
	background-color: #202d37;
	width: 36.22px;
	height: 20px;
	border-radius: 10px;
	font-weight: bold;
	line-height: 20px;
	z-index: 100;
`
const Info = styled.div`
	width: 541px;
	height: 202px;
	margin-left: 24px;
`
const TierContainer = styled.div`
	height: 32px;
`
const TierLi = styled.li`
	display: inline-block;
	list-style: none;
	padding: 0px 4px;
	min-width: 78.33px;
	max-width: 120px;
	line-height: 18px;
	background-color: #ebeef1;
	border-radius: 2px;
	text-align: center;
	margin-right: 4px;
`
const Year = styled.div`
	font-size: 11px;
	color: #9aa4af;
`
const Name = styled.div`
	height: 32px;
	font-size: 24px;
	font-weight: bold;
`
const RefreshBtn = styled.button`
	color: white;
	border: 0px;
	border-radius: 4px;
	background-color: #5383e8;
	cursor: pointer;
	width: 80px;
	height: 40px;
	font-size: 14px;
	font-weight: 500;
	margin-top: 50px;
`
const LastUpdate = styled.div`
	margin-top: 8px;
	color: gray;
	font-size: 12px;
`
// 헤더 아래 탭
const InfoListTab = styled.div`
	width: 100%;
	height: 45px;
	border-top: 1px solid;
	border-color: #ebeef1;
	padding: 4px 0;
	display: flex;
	align-items: center;
	background-color: white;
`
const InfoList = styled.ul`
	display: flex;
	width: 1080px;
	margin: 0 auto;
`
const InfoListItem = styled.span<{ selected: boolean }>`
	text-align: center;
	display: block;
	min-width: 60px;
	line-height: 36px;
	padding: 0 16px;
	margin-right: 4px;
	font-size: 14px;
	border-radius: 4px;
	cursor: pointer;
	background-color: ${(props: any) => (props.selected ? '#ecf2ff' : 'none')};
	font-weight: ${(props: any) => (props.selected ? 700 : '')};
	color: ${(props: any) => (props.selected ? '#4171d6' : '')};
`

// 컨텐츠 부분 컴포넌트
const ContentsContainer = styled.div`
	width: 1080px;
	margin: 0 auto;
	min-height: auto;
`
// 모스트 챔피언, 현재 티어 등 좌측 컨텐츠 컴포넌트
const LeftContents = styled.div`
	display: inline-block;
	vertical-align: top;
	width: 332px;
	min-height: 870px;
	font-size: 12px;
`
const CurrentRankContainer = styled.div`
	margin-bottom: 8px;
`
const CurrentRankHeader = styled.div`
	background-color: white;
	margin-top: 8px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	display: flex;
	justify-content: space-between;
	line-height: 35px;
	padding: 0 12px;
	font-size: 14px;
`
const CurrentRankContents = styled.div`
	display: flex;
	align-items: center;
	padding: 12px;
	border-top: 1px solid;
	border-color: #ebeef1;
	width: 308px;
	height: 97px;
	background-color: white;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
`
const CurrentTierImg = styled.img`
	width: 60px;
`
const CurrentTierImgContainer = styled.div`
	background-color: #f7f7f9;
	width: 72px;
	height: 72px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
`
const CurrnetTierContainer = styled.div`
	flex: 1 1 0%;
	position: relative;
	margin-left: 16px;
`
const CurrentTier = styled.div`
	font-size: 20px;
	font-weight: bold;
`
const CurrentLp = styled.div`
	line-height: 16px;
	margin-top: 2px;
	font-size: 12px;
	color: #758592;
`
const WinLoseContainer = styled.div`
	font-size: 12px;
	color: #9aa4af;
`
const WinLose = styled.div`
	line-height: 26px;
	color: #9aa4af;
`
const WinRate = styled.div`
	margin-top: 2px;
	line-height: 16px;
`

// 개요 ,전적 등이 보여지는 우측 컴포넌트
const RightContents = styled.div`
	display: inline-block;
	width: 740px;
	min-height: 1000px;
	margin-top: 8px;
	margin-left: 8px;
	vertical-align: top;
`
const MatchHistoryTab = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 4px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border-bottom: 1px solid;
	border-color: #ebeef1;
	background-color: white;
`
const MatchHistroyTabUl = styled.ul`
	display: flex;
	line-height: 28px;
	margin: 0px;
`
const MatchHistoryTabLi = styled.li<{ selected: boolean }>`
	padding: 4px 12px;
	border-radius: 4px;
	font-size: 14px;
	line-height: 28px;
	cursor: ${(props: any) => (props.selected ? 'pointer' : '')};
	background-color: ${(props: any) => (props.selected ? '#ecf2ff' : 'none')};
	font-weight: ${(props: any) => (props.selected ? 700 : '')};
	color: ${(props: any) => (props.selected ? '#4171d6' : '')};
`

const MatchHistoryContainer = styled.div`
	margin-top: 8px;
`
const NotFoundMsg = styled.div`
	padding-top: 50px;
	text-align: center;
	font-size: 30px;
`
