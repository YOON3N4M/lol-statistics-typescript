import { RefinedMatchStatistics } from '@/@types/types'
import styled from 'styled-components'
import { useState } from 'react'
import { variable } from '@/styles/Globalstyles'
import DetailTable from './DetailTable'

interface Props {
	matchStatistics: RefinedMatchStatistics
}

type DetailContents = '종합' | '팀 분석'

export default function MatchDetail({ matchStatistics }: Props) {
	const [content, setContents] = useState<DetailContents>('종합')
	const teamADealtOnChampion = Math.max(
		...matchStatistics.refinedMatchInfo.teamA.map(
			(participant) => participant.dealtToChampion,
		),
	)
	const teamBDealtOnChampion = Math.max(
		...matchStatistics.refinedMatchInfo.teamB.map(
			(participant) => participant.dealtToChampion,
		),
	)
	const topDealtOnChampion =
		teamADealtOnChampion - teamBDealtOnChampion > 0
			? teamADealtOnChampion
			: teamBDealtOnChampion

	const teamATakenDamage = Math.max(
		...matchStatistics.refinedMatchInfo.teamA.map(
			(participant) => participant.totalDamageTaken,
		),
	)
	const teamBTakenDamage = Math.max(
		...matchStatistics.refinedMatchInfo.teamB.map(
			(participant) => participant.totalDamageTaken,
		),
	)
	const topTakenDamage =
		teamATakenDamage - teamBTakenDamage > 0
			? teamATakenDamage
			: teamBTakenDamage

	console.log(teamADealtOnChampion, teamBDealtOnChampion, topDealtOnChampion)
	return (
		<StyledDetail>
			<div className="tab">
				<StyledTabButton
					onClick={() => setContents('종합')}
					$isSelected={content === '종합'}
					$win={matchStatistics.refinedMatchInfo.win}
				>
					종합
				</StyledTabButton>
				{/* <StyledTabButton
					onClick={() => setContents('팀 분석')}
					$isSelected={content === '팀 분석'}
					$win={matchStatistics.refinedMatchInfo.win}
				>
					팀 분석
				</StyledTabButton> */}
			</div>
			<div className="detail-wrap">
				<DetailTable
					team={matchStatistics.refinedMatchInfo.teamA}
					teamStats={matchStatistics.refinedMatchInfo.teamAStats}
					topDealtOnChampion={topDealtOnChampion}
					topTakenDamage={topTakenDamage}
				/>
				<div className="summary"></div>
				<DetailTable
					team={matchStatistics.refinedMatchInfo.teamB}
					teamStats={matchStatistics.refinedMatchInfo.teamBStats}
					topDealtOnChampion={topDealtOnChampion}
					topTakenDamage={topTakenDamage}
				/>
			</div>
			<div className="footer"></div>
		</StyledDetail>
	)
}

const StyledDetail = styled.div`
	width: 100%;

	margin-top: 4px;
	//background-color: white;
	.tab {
		width: 100%;
		padding: 4px;
		background-color: white;
		border-radius: 4px;
		display: flex;
		gap: 2px;
		box-sizing: border-box;
	}

	.detail-table {
	}
	.detail-wrap {
	}
	.footer {
		width: 100%;
		height: 30px;
		background-color: white;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		border-top: 1px solid ${variable.color.border};
	}
`

const StyledTabButton = styled.button<{
	$isSelected?: boolean
	$win?: boolean
}>`
	padding: 5px;
	flex-grow: 1;
	border: 0;
	border-radius: 4px;
	background-color: ${(props) => {
		const bgColor = props.$win
			? variable.color.selectBgBlue
			: variable.color.selectBgRed
		return props.$isSelected ? bgColor : 'white'
	}};
	color: ${(props) => {
		const fontColor = props.$win
			? variable.color.selectFontBlue
			: variable.color.selectFontRed
		return props.$isSelected ? fontColor : 'black'
	}};

	font-weight: ${(props) => (props.$isSelected ? 'bold' : '')};
	cursor: pointer;
`
