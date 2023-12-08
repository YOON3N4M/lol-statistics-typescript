import styled from 'styled-components'

import { RefinedParticipantInfo, RefinedTeamStats } from '@/@types/types'
import {
	CHAMPION_ICON_URL,
	RUNE_ICON_URL,
	SUMMONER_SPELL_ICON_URL,
} from '@/constants'
import { fixedChampionName, getKDAColor } from '@/utils'
import { variable } from '@/styles/Globalstyles'
import Link from 'next/link'

interface Props {
	team: RefinedParticipantInfo[]
	teamStats: RefinedTeamStats
	topDealtOnChampion: number
	topTakenDamage: number
}

interface RowProps {
	participant: RefinedParticipantInfo
	topDealtDamage?: number
	topTakenDamage?: number
}

export default function DetailTable({
	team,
	teamStats,
	topDealtOnChampion,
	topTakenDamage,
}: Props) {
	const {
		totalKills,
		totalBaronKills,
		totalTurretKills,
		totalDragonKills,
		totalGold,
		totalDealtToChampion,
	} = teamStats
	const win = team[0].win
	const teamId = team[0].teamId

	function ParticipantRow({ participant }: RowProps) {
		const {
			championName,
			champLevel,
			rune,
			summonersSpell,
			riotIdGameName,
			kills,
			deaths,
			assists,
			kda,
			dealtToChampion,
			totalDamageTaken,
			visionWardsBoughtInGame,
			wardsKilled,
			wardsPlaced,
			cs,
			riotIdTagline,
		} = participant
		const killPart = Math.round(((kills + assists) / totalKills) * 100)
		const dealtPercentage = Math.floor(
			(dealtToChampion / topDealtOnChampion) * 100,
		)
		const takenPercentage = Math.floor(
			(totalDamageTaken / topTakenDamage) * 100,
		)
		return (
			<StyledTr $kdaColor={getKDAColor(kda)}>
				<td className="champion">
					<a
						target="_"
						href={`https://www.op.gg/champions/${championName.toLowerCase()}/build`}
					>
						<div>
							<img src={CHAMPION_ICON_URL(fixedChampionName(championName))} />
						</div>
					</a>
				</td>
				<td className="spells">
					<div>
						<img
							src={SUMMONER_SPELL_ICON_URL(summonersSpell.a)}
							alt={summonersSpell.a}
						/>
					</div>
					<div>
						<img
							src={SUMMONER_SPELL_ICON_URL(summonersSpell.b)}
							alt={summonersSpell.b}
						/>
					</div>
				</td>
				<td className="runes">
					<div className="main">
						<img src={RUNE_ICON_URL(rune.main)} alt="메인 룬" />
					</div>
					<div>
						<img src={RUNE_ICON_URL(rune.sub)} alt="서브 룬" />
					</div>
				</td>
				<td className="name">
					<div>
						<Link href={`/summoners/kr/${riotIdGameName}-${riotIdTagline}`}>
							{riotIdGameName}
						</Link>
					</div>
					<div>
						<span>티어</span>
					</div>
				</td>
				<td className="op-score"></td>
				<td className="kda">
					<div>
						{`${kills}/${deaths}/${assists}`} {`(${killPart}%)`}
					</div>
					<div>
						<span>{kda}</span>
					</div>
				</td>
				<td className="damage">
					<div>
						<div>{dealtToChampion.toLocaleString('ko-KR')}</div>
						<div className="progress">
							<ProgressBar $progress={dealtPercentage} $color="#e84057" />
						</div>
					</div>
					<div>
						<div>{totalDamageTaken.toLocaleString('ko-KR')}</div>
						<div className="progress">
							<ProgressBar $progress={takenPercentage} $color="#9AA4AF" />
						</div>
					</div>
				</td>
				<td className="ward">
					<div>{visionWardsBoughtInGame}</div>
					<div>
						{wardsPlaced} / {wardsKilled}
					</div>
				</td>
				<td className="cs">
					<div>{cs}</div>
					<div>분당</div>
				</td>
				<td className="items"></td>
			</StyledTr>
		)
	}

	return (
		<StyledTable $win={win}>
			<colgroup>
				<col width="44" />
				<col width="18" />
				<col width="18" />
				<col width="" />
				<col width="68" />
				<col width="98" />
				<col width="120" />
				<col width="48" />
				<col width="56" />
				<col width="175" />
			</colgroup>
			<thead>
				<tr className="detail-head">
					<th colSpan={4}>
						<span className="team">
							{win ? '승리 ' : '패배 '}
							<span>{`(${teamId === 100 ? '블루팀' : '레드팀'})`}</span>
						</span>
					</th>
					<th></th>
					<th>KDA</th>
					<th>피해량</th>
					<th>와드</th>
					<th>CS</th>
					<th>아이템</th>
				</tr>
			</thead>
			<tbody>
				{team.map((participant) => (
					<ParticipantRow participant={participant} />
				))}
			</tbody>
		</StyledTable>
	)
}

const StyledTable = styled.table<{ $win: boolean }>`
	background-color: ${(props) => (props.$win ? '#ECF2FF' : '#fff1f3')};
	width: 100%;
	box-sizing: border-box;

	th {
		font-size: 12px;
	}
	thead {
		border-top-right-radius: 4px;
		border-top-left-radius: 4px;
	}
	.detail-head {
		background-color: white;
	}
	.team {
		font-weight: bold;
		color: ${(props) =>
			props.$win
				? variable.color.selectFontBlue
				: variable.color.selectFontRed};
		span {
			color: ${variable.color.gray};
			font-weight: normal;
		}
	}
`
const StyledTr = styled.tr<{ $kdaColor: string }>`
	padding: 2px 0;
	font-size: 11px;
	color: #758592;
	.champion {
		padding-left: 10px;
		div {
			display: flex;
			align-items: center;
		}
		img {
			width: 32px;
			height: 32px;
			border-radius: 50%;
		}
	}

	.spells {
		div,
		img {
			width: 16px;
			height: 16px;
			border-radius: 4px;
		}
		div + div {
			margin-top: 2px;
		}
	}
	.runes {
		.main {
			background-color: rgb(0, 0, 0);
			border-radius: 50%;
		}
		div,
		img {
			width: 16px;
			height: 16px;
			border-radius: 4px;
		}
		div + div {
			margin-top: 2px;
		}
	}

	.name {
		div {
			width: 90px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		a {
			white-space: nowrap;
			font-size: 12px;
			color: ${variable.color.fontBlack};
			text-decoration: none;
		}
	}
	.kda {
		text-align: center;

		span {
			font-weight: bold;
			color: ${(props) => props.$kdaColor};
		}
	}
	.damage {
		display: flex;
		text-align: center;
		div {
			flex: 1 1 0;
		}
		.progress {
			margin: 4px auto 0px;
			display: flex;
			justify-content: center;
		}
	}
	.ward,
	.cs {
		text-align: center;
	}
`

const ProgressBar = styled.div<{ $progress: number; $color: string }>`
	max-width: 50px;
	height: 6px;
	background-color: white;
	background: linear-gradient(
		to right,
		${(props) => props.$color} ${(props) => props.$progress}%,
		white 0%
	);
`
