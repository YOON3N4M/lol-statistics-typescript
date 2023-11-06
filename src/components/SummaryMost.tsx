import styled from 'styled-components'
import { CHAMPION_ICON_URL } from '../constants'
import { getKDA, getKDAColor, getWinRate } from '../utils'
import { variable } from '../styles/Globalstyles'

interface Props {
	champion: any
}

const SumLi = styled.li`
	height: 24px;
	margin-top: 8px;
	display: flex;
	align-items: center;
`
const ChampionIcon = styled.img`
	width: 24px;
	height: 24px;
	border-radius: 50%;
	margin-right: 8px;
`
const WinLose = styled.div`
	font-size: 11px;
	position: relative;
	color: '#9AA4AF';
`

const Text = styled.span<{ color: string }>`
	color: ${(props) => props.color};
`
function Summarys({ champion }: Props) {
	const championName = champion[0].championName

	const wins = champion.filter((e: any) => e.win === true).length
	const loses = champion.filter((e: any) => e.win === false).length
	const kills: number = champion.reduce(function add(sum: any, item: any) {
		return sum + item.kills
	}, 0)
	const deaths: number = champion.reduce(function add(sum: any, item: any) {
		return sum + item.deaths
	}, 0)
	const assists: number = champion.reduce(function add(sum: any, item: any) {
		return sum + item.assists
	}, 0)
	const winRate = getWinRate(wins, loses)
	const kda: any = getKDA(kills, deaths, assists)

	return (
		<>
			<SumLi>
				<ChampionIcon src={CHAMPION_ICON_URL(championName)} />

				<WinLose>
					<Text
						color={
							Math.round(winRate) >= 60
								? variable.color.red
								: variable.color.gray
						}
					>
						{Math.round(winRate)}%{' '}
					</Text>
					<Text color={variable.color.gray}>
						({wins}승 {loses}패)
					</Text>
					<Text color={getKDAColor(kda)}> {kda} 평점</Text>
				</WinLose>
			</SumLi>
		</>
	)
}

export default Summarys
