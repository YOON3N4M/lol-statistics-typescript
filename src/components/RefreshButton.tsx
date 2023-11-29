import { RiotId } from '@/@types/types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
	loadingPercent: number
	refresh: (riotId: RiotId) => Promise<void>
	riotId: RiotId
}

type LoadingStatus = '전적 갱신' | '갱신중...' | '갱신 완료!'

export default function RefreshButton({
	loadingPercent,
	refresh,
	riotId,
}: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const [text, setText] = useState<LoadingStatus>('전적 갱신')
	function handleRefresh() {
		if (loadingPercent !== 100) {
			alert('갱신이 진행 중 입니다. 잠시만 기다려주세요.')
		}
		refresh(riotId)
		setText('갱신중...')
	}

	useEffect(() => {
		if (loadingPercent === 100) {
			setIsLoading(false)
			if (text === '갱신중...') setText('갱신 완료!')
			setTimeout(() => {
				setText('전적 갱신')
			}, 180000)
		} else {
			setIsLoading(true)
		}
	}, [loadingPercent])

	return (
		<RefreshBtn onClick={handleRefresh} $loadingPercent={loadingPercent}>
			<span>{text}</span>
		</RefreshBtn>
	)
}

const RefreshBtn = styled.button<{ $loadingPercent: number }>`
	color: white;
	border: 0px;
	border-radius: 4px;
	cursor: pointer;
	width: 80px;
	height: 40px;
	font-size: 14px;
	font-weight: 500;
	margin-top: 50px;
	background: linear-gradient(
		to right,
		#5383e8 ${(props) => props.$loadingPercent}%,
		gray ${(props) => 100 - props.$loadingPercent}%
	);
	transition: background 0.5s ease;
`
