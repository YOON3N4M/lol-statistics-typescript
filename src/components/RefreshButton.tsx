import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
	loadingPercentage: number
	refresh: () => Promise<void>
}

type LoadingStatus = '전적 갱신' | '갱신중...' | '갱신 완료!'

export default function RefreshButton({ loadingPercentage, refresh }: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const [text, setText] = useState<LoadingStatus>('전적 갱신')
	function handleRefresh() {
		if (loadingPercentage !== 100) {
			alert('갱신이 진행 중 입니다. 잠시만 기다려주세요.')
		}
		refresh()
		setText('갱신중...')
	}

	useEffect(() => {
		if (loadingPercentage === 100) {
			setIsLoading(false)
			if (text === '갱신중...') setText('갱신 완료!')
			setTimeout(() => {
				setText('전적 갱신')
			}, 180000)
		} else {
			setIsLoading(true)
		}
	}, [loadingPercentage])

	return (
		<RefreshBtn onClick={handleRefresh} $loadingPercentage={loadingPercentage}>
			<span>{text}</span>
		</RefreshBtn>
	)
}

const RefreshBtn = styled.button<{ $loadingPercentage: number }>`
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
		#5383e8 ${(props) => props.$loadingPercentage}%,
		gray ${(props) => 100 - props.$loadingPercentage}%
	);
	transition: background 0.5s ease;
`
