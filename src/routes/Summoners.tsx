import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import Header from '../components/Header'
import MatchHistorys from '../components/MatchHistorys'
import Summarys from '../components/Summarys'
import PositionsBar from '../components/PositionsBar'
import MostChampions from '../components/MostChampions'

import {
	LeagueArray,
	LeagueObj,
	MatchInfoArray,
	MatchInfoObj,
	PlayerObj,
	RiotApiObj,
	SummonerObj,
	UserDocument,
} from '../@types/types'
import { firebaseAPI } from '../utils/firebaseApi'
import { api } from '../utils/api'
import { DATA_DRAGON_VERSION, SUMMONER_PROFILE_ICON_URL } from '../constants'
import CurrentRank from '../components/CurrentRank'
import MostPlayed from '../components/MostPlayed'
import Summary from '../components/Summary'

//

function Summoners() {
	const matchQty = 15
	const params = useParams()
	const [searchedSummonersName, setSearchedSummonersName] = useState(
		params?.summonersName,
	)
	const [userDocument, setUserDocument] = useState<UserDocument>()
	// matchQty 만큼의 총 전적
	const [matchInfoArr, setMatchInfoArr] = useState<MatchInfoArray | undefined>(
		[],
	)
	// matchQty 만큼의 총 전적 중 검색된 플레이어의 15게임 정보 (챔피언, kda 등등)
	const [mostPlayChampions, setMostPlayChampions] = useState<any>([])

	///
	///
	///
	///
	const [alarm, setAlarm] = useState(false)

	//검색된 플레이어의 15게임 이내 플레이어 정보 - Summary 부분에 활용되는 정보임
	const [currentMatch, setCurrentMatch] = useState<any>([])

	//검색된 게임 포지션 비율
	const [notFound, setNotFound] = useState(false)
	function alarmFn() {
		setAlarm(true)
		setTimeout(() => {
			setAlarm(false)
		}, 3000)
	}

	async function getUserDocumentDB(): Promise<UserDocument | undefined> {
		if (searchedSummonersName === undefined) return
		const result = await firebaseAPI.getUserDocument(searchedSummonersName)
		setUserDocument(result)
		if (result) return result
	}

	async function getMatchDocumentDB(matchIDArr: string[] | undefined) {
		if (matchIDArr === undefined) return

		const result: any[] = await Promise.all(
			matchIDArr.map(async (matchID) => {
				const res = await firebaseAPI.getMatchFromDB(matchID)

				if (res === undefined) return
				return res
			}),
		)
		const removeUndefined = result.filter((e) => e !== undefined)

		return removeUndefined
	}

	async function getDocumentFromFirebase() {
		const userDocs = await getUserDocumentDB()

		setUserDocument(userDocs)
		if (userDocs === undefined) return false

		const matchArr: MatchInfoArray | undefined = await getMatchDocumentDB(
			userDocs.matchHistory,
		)

		if (matchArr === undefined) return
		console.log(matchArr)
		setMatchInfoArr(matchArr)
		return true
	}

	async function getRiotAPI() {
		if (searchedSummonersName === undefined) return

		try {
			const summonerInfo: SummonerObj = await api.getSummonersInfo(
				searchedSummonersName,
			)
			const leagueInfo: LeagueObj[] = await api.getLeagueInfo(summonerInfo.id)
			const matchInfo: string[] = await api.getMatchId(
				summonerInfo.puuid,
				matchQty,
			)

			if (matchInfo.length > 0) {
				const result: any[] = await Promise.all(
					matchInfo.map(async (matchID: string) => {
						const res = await firebaseAPI.getMatchFromDB(matchID)

						if (res === undefined) return matchID
						return res
					}),
				)
				const removeExist = result.filter((e) => typeof e === 'string')
				const matchInfoResArr = await Promise.all(
					removeExist.map(async (matchID: string) => {
						const matchInfoRes = await api.getMatchInfo(matchID)
						return matchInfoRes
					}),
				)

				matchInfoResArr.map(async (matchInfoRes) => {
					const firebaseRes = await firebaseAPI.postMatchInfoOnDB(matchInfoRes)
				})

				setMatchInfoArr(matchInfoResArr)
			}

			const result = {
				summonerInfo,
				leagueInfo,
				matchInfo,
			}
			return result
		} catch (error) {
			console.log(error)
			return error
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

	//검색시 firebase DB 체크, 있으면 그대로 보여주고 없으면 riot API 요청 (전적 갱신과 같은 동작을 함)
	// riot API 요청 후 바로 firebase 재요청
	useEffect(() => {
		async function existCheckUserOnFirebase() {
			const isExist = await getDocumentFromFirebase()

			if (isExist) return
			const riotAPIResult: any = await getRiotAPI()
			const postDB = await firebaseAPI.postUserDocumentOnDB(
				riotAPIResult.summonerInfo,
				riotAPIResult.leagueInfo,
				riotAPIResult.matchInfo,
			)
			const requestAgain = await getDocumentFromFirebase()
		}
		existCheckUserOnFirebase()
	}, [])

	useEffect(() => {
		if (matchInfoArr?.length === 0) return
		getMostChampionArr()
	}, [matchInfoArr])

	useEffect(() => {
		if (userDocument?.matchHistory !== undefined) {
			// userDocument.matchHistory.map((item) => getMatchFromDB(item));
		} else {
			//getUserDocument();
		}
	}, [])

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
								<RefeshBtn
									onClick={() => {
										getRiotAPI()
									}}
								>
									전적 갱신
								</RefeshBtn>
								<LastUpdate>최근 업데이트 : - </LastUpdate>
							</Info>
						</Wrapper>
					</ContentsHeader>
					<InfoListTab>
						<InfoList>
							<li>
								<InfoListItem selected={true}>종합</InfoListItem>
							</li>
							<li>
								{/*<InfoListItem selected={false}>인게임 정보</InfoListItem>*/}
							</li>
						</InfoList>
					</InfoListTab>
				</>
			)}

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
									<MatchHistoryTabLi selected={true}>전체</MatchHistoryTabLi>
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
										<MatchHistorys match={match} userDocument={userDocument} />
									))}
							</MatchHistoryContainer>
						</RightContents>
					</ContentsContainer>
				</>
			)}
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
const RefeshBtn = styled.button`
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
	height: 800px;
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
	height: 1000px;
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
