import { useEffect, useState } from 'react'
import styled from 'styled-components'
import topIcon from '../img/lane/top.svg'
import jgIcon from '../img/lane/jg.svg'
import midIcon from '../img/lane/mid.svg'
import adcIcon from '../img/lane/adc.svg'
import supIcon from '../img/lane/sup.svg'

interface Props {
	currentMatch: any
}

const PositionUl = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 12px;
`
const PositionIcon = styled.img`
	width: 16px;
	margin-top: 8px;
`

const Bar = styled.div`
	display: flex;
	align-items: flex-end;
	width: 16px;
	height: 64px;
	background-color: #dbe0e4;
`

const Gauge = styled.div<{ height: string }>`
	background-color: #5383e8;
	width: 16px;
	height: ${(props) => props.height};
`

const Title = styled.div`
	line-height: 16px;
	font-size: 12px;
	color: #758592;
`

function PositionsBar({ currentMatch }: Props) {
	const [positions, setPositions] = useState({
		top: 0,
		jungle: 0,
		mid: 0,
		adc: 0,
		sup: 0,
	})

	useEffect(() => {
		if (currentMatch.length !== 0) {
			const top = currentMatch.filter(
				(e: any) => e.individualPosition === 'TOP',
			).length
			const jg = currentMatch.filter(
				(e: any) => e.individualPosition === 'JUNGLE',
			).length
			const mid = currentMatch.filter(
				(e: any) => e.individualPosition === 'MIDDLE',
			).length
			const adc = currentMatch.filter(
				(e: any) => e.individualPosition === 'BOTTOM',
			).length
			const sup = currentMatch.filter(
				(e: any) => e.individualPosition === 'UTILITY',
			).length
			setPositions((prev) => {
				return {
					...prev,
					top: top,
					jungle: jg,
					mid: mid,
					adc: adc,
					sup: sup,
				}
			})
		}
	}, [currentMatch])

	const topP = `${Math.round((positions.top / currentMatch.length) * 100)}%`
	const jgP = `${Math.round((positions.jungle / currentMatch.length) * 100)}%`
	const midP = `${Math.round((positions.mid / currentMatch.length) * 100)}%`
	const adcP = `${Math.round((positions.adc / currentMatch.length) * 100)}%`
	const supP = `${Math.round((positions.sup / currentMatch.length) * 100)}%`

	return (
		<>
			<Title>선호 포지션</Title>
			<PositionUl>
				<li>
					<Bar>
						<Gauge height={topP}></Gauge>
					</Bar>
					<PositionIcon src={topIcon.src} />
				</li>
				<li>
					<Bar>
						<Gauge height={jgP}></Gauge>
					</Bar>
					<PositionIcon src={jgIcon.src} />
				</li>
				<li>
					<Bar>
						<Gauge height={midP}></Gauge>
					</Bar>
					<PositionIcon src={midIcon.src} />
				</li>
				<li>
					<Bar>
						<Gauge height={adcP}></Gauge>
					</Bar>
					<PositionIcon src={adcIcon.src} />
				</li>
				<li>
					<Bar>
						<Gauge height={supP}></Gauge>
					</Bar>
					<PositionIcon src={supIcon.src} />
				</li>
			</PositionUl>
		</>
	)
}
export default PositionsBar
