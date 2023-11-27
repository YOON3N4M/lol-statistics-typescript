import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import {
	ContentsType,
	LeagueArray,
	LeagueObj,
	MatchInfoArray,
	MatchInfoObj,
	RiotAccount,
	RiotApiObj,
	RiotId,
	SearchResult,
	Summoner,
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
import {
	calculatedTimeDiffer,
	extractSummonerName,
	handleRiotId,
} from '@/utils'
import InGame from '@/components/inGame/InGame'
import RefreshButton from '@/components/RefreshButton'
import axios from 'axios'

// export async function getServerSideProps() {
// 	const res = await firebaseAPI.getUserDocument('멀록몰록말록물록')
// 	return { props: { res } }
// }

function Summoners() {
	const pathname = usePathname()
	const matchQty = 20

	async function getRiotApi(riotId: RiotId) {
		const accountRes: RiotAccount = await api.getAccountByNextApi(riotId)
		const summonerRes: Summoner = await api.getSummonerByPuuid(accountRes.puuid)
		const leagueRes = await api.getLeagueInfo(summonerRes.id)
		const matchIdsRes: string[] = await api.getMatchId(
			summonerRes.puuid,
			matchQty,
		)

		return { accountRes, summonerRes, leagueRes, matchIdsRes }
	}

	//첫 진입 시 닉네임 추출
	useEffect(() => {
		if (pathname === null) return

		async function initAction() {
			const extractedSummonerName = extractSummonerName(pathname)

			const riotId = handleRiotId(extractedSummonerName, '-')
			const test = { tag: 'test', name: 'tests' }

			const userResult = await firebaseAPI.getUserDocumentByRiotId(test)
			if (!userResult) {
				const riotApiResult = await getRiotApi(riotId)
			}
		}

		initAction()
	}, [pathname])

	return <></>
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
