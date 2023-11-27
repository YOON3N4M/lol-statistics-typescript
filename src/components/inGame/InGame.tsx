import { API_KEY } from '@/constants'
import { variable } from '@/styles/Globalstyles'
import { refineInGameInfo } from '@/utils'
import { api } from '@/utils/api'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import TeamContainer from './TeamContainer'
import { ContentsType } from '@/@types/types'

interface Props {
	summonerId?: string
	setSelectedContents: React.Dispatch<React.SetStateAction<ContentsType>>
}

interface InGameParticipant {
	bot: boolean
	championId: number
	perks: any
	profileIconId: number
	puuid: string
	spell1Id: number
	spell2Id: number
	summonerId: string
	summonerName: string
	teamId: number
}

interface BannedChampion {
	championId: number
	pickTurn: number
	teamId: number
}

export interface InGameInfo {
	bannedChampions: BannedChampion[]
	gameId: number
	gameStartTime: number
	gameMode: string
	gameType: string | 'MATCHED_GAME'
	mapId: number
	participants: InGameParticipant[]
	platformId: 'KR'
}

export interface RefinedParticipant extends InGameParticipant {
	ban: { championId: number; teamId: number; pickTurn: number }
}

export interface RefinedInGameInfo {
	gameId: number
	gameStartTime: number
	gameMode: string
	gameType: string | 'MATCHED_GAME'
	mapId: number
	blueTeam: RefinedParticipant[]
	purpleTeam: RefinedParticipant[]
	platformId: 'KR'
}

export default function InGame({ summonerId, setSelectedContents }: Props) {
	const [inGameData, setInGameData] = useState<RefinedInGameInfo | undefined>()
	const [isOnGame, setIsOnGame] = useState<true | false | undefined>(undefined)
	useEffect(() => {
		alert('현재 인게임 정보 기능이 수정 중 입니다.')
		setSelectedContents('MatchHistorys')

		// async function getAPI() {
		// 	if (!summonerId) return
		// 	try {
		// 		const result: InGameInfo = await api.getInGameInfo(summonerId)
		// 		const refined: RefinedInGameInfo = refineInGameInfo(result)
		// 		console.log(refined)
		// 		setInGameData(refined)
		// 		setIsOnGame(true)
		// 	} catch (error) {
		// 		setIsOnGame(false)
		// 		alert('해당 플레이어는 현재 게임중이 아닙니다.')
		// 		setSelectedContents('MatchHistorys')
		// 	}
		// }
		// getAPI()
	}, [])
	return (
		<>
			{isOnGame && (
				<StyledInGameContainer>
					<StyledHeader>
						<div>
							<span className="queue-type">솔랭</span>
							<span className="map">소환사의 협곡</span>
							<span className="timer">06:49</span>
						</div>
						<div></div>
					</StyledHeader>
					<TeamContainer team={inGameData?.blueTeam} />
				</StyledInGameContainer>
			)}
		</>
	)
}

const StyledInGameContainer = styled.div`
	margin: 0 auto;
	margin-top: 8px;
	width: 1080px;
	height: 500px;
	background-color: white;
	border-radius: 4px;
	overflow: hidden;
`

const StyledHeader = styled.div`
	width: 100%;
	//background-color: gray;
	padding: 8px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #ebeef1;
	.queue-type {
		font-size: 14px;
		font-weight: bold;
	}
	.map {
		border-left: 1px solid #00000021;
		margin-left: 8px;
		padding-left: 8px;
		font-size: 12px;
	}
	.timer {
		border-left: 1px solid #00000021;
		margin-left: 8px;
		padding-left: 8px;
		font-size: 12px;
	}
`
