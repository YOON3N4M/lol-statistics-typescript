import styled from 'styled-components'

import { RefinedParticipantInfo } from '@/@types/types'
import {
	CHAMPION_ICON_URL,
	RUNE_ICON_URL,
	SUMMONER_SPELL_ICON_URL,
} from '@/constants'
import { fixedChampionName } from '@/utils'
import { variable } from '@/styles/Globalstyles'

interface Props {
	team: RefinedParticipantInfo[]
}

interface RowProps {
	participant: RefinedParticipantInfo
	topDealtDamage?: number
	topTakenDamage?: number
}

export default function DetailTable({ team }: Props) {
	console.log(team)

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
		} = participant
		return (
			<StyledTr>
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
						<span>{riotIdGameName}</span>
					</div>
					<div>
						<span>티어</span>
					</div>
				</td>
				<td className="op-score"></td>
				<td className="kda">
					<div>{`${kills}/${deaths}/${assists}`}</div>
				</td>
				<td className="damage"></td>
				<td className="ward"></td>
				<td className="cs"></td>
				<td className="items"></td>
			</StyledTr>
		)
	}

	return (
		<StyledTable>
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
					<th colSpan={4}>패배</th>
					<th>OP 스코어</th>
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

const StyledTable = styled.table`
	background-color: #fff1f3;
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
`
const StyledTr = styled.tr`
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
		span {
			font-size: 12px;
			color: ${variable.color.fontBlack};
		}
	}
	.kda {
		text-align: center;
	}
`
