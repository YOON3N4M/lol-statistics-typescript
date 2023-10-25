import styled from 'styled-components'
import PositionsBar from './PositionsBar'

export default function Summary() {
	return (
		<SummaryContainer>
			<SumStats>
				<SumWinLose>
					{/* {matchInfoArr?.length}전 {currentWins}승{' '}
        {matchInfoArr?.length - currentWins}패 */}
				</SumWinLose>
				<RatioKda>
					<Chart>
						<Text>
							<strong>
								{/* {Math.round(
                (currentWins / matchInfoArr.length) * 100,
              )} */}
								%
							</strong>
						</Text>
						<div>
							{/* <svg viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#E84057"
                strokeWidth="30"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#5383E8"
                strokeWidth="30"
                strokeDasharray={`${
                  (2 * Math.PI * 80 * currentWins) /
                  matchInfoArr.length
                } ${
                  2 *
                  Math.PI *
                  80 *
                  (1 - currentWins / matchInfoArr.length)
                }`}
                strokeDashoffset={2 * Math.PI * 90 * 0.22}
              />
            </svg> */}
						</div>
					</Chart>
					<SumInfo>
						<KDA>
							<KDANum deaths={false}></KDANum>/<KDANum deaths={true}></KDANum>/
							<KDANum deaths={false}>
								{/* {totalInfo.totalAssists.toFixed(1)} */}
							</KDANum>
						</KDA>
						<SumRaito>
							{/* {(
								(totalInfo.totalKills + totalInfo.totalAssists) /
								totalInfo.totalDeaths
							).toFixed(2)}{' '} */}
							: 1
						</SumRaito>
						<KillPart>
							킬관여{' '}
							{/* {totalKillPartNum !== undefined
								? Math.round(totalKillPartNum)
								: 0} */}
							%
						</KillPart>
					</SumInfo>
				</RatioKda>
			</SumStats>
			<Champions>
				<Title>{/* 플레이한 챔피언 (최근 {matchInfoArr.length}게임) */}</Title>
				<ul>
					{/* {byChampionArr.length !== 0
						? byChampionArr
								.slice(0, 3)
								.map((champion: any) => <Summarys champion={champion} />)
						: null} */}
				</ul>
			</Champions>
			<Positions>
				{/* <PositionsBar currentMatch={currentMatch} /> */}
			</Positions>
		</SummaryContainer>
	)
}

const SummaryContainer = styled.div`
	display: flex;
	text-align: left;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	padding: 24px 21px;
	box-sizing: border-box;
	width: 740px;
	height: 164px;
	background-color: white;
`
const SumStats = styled.div`
	width: 222px;
`
const SumWinLose = styled.div`
	font-size: 12px;
	color: #758592;
`
const RatioKda = styled.div`
	display: flex;
	margin-top: 12px;
`
const Chart = styled.div`
	position: relative;
	display: inline-block;
	width: 88px;
	height: 88px;
`
const Text = styled.div`
	position: absolute;
	top: 0px;
	left: 0px;
	width: 88px;
	height: 88px;
	line-height: 88px;
	text-align: center;
	font-size: 14px;
	color: #5383e8;
`
const SumInfo = styled.div`
	margin-left: 32px;
`
const KDA = styled.div`
	font-size: 12px;
	letter-spacing: 2px;
	font-weight: 700;
	color: #758592;
`

const KDANum = styled.span<{ deaths: boolean }>`
	color: ${(props: any) => (props.deaths ? '#d31a45' : '#758592')};
`
const SumRaito = styled.div`
	margin-top: 8px;
	line-height: 26px;
	font-size: 20px;
	font-weight: bold;
	color: #202d37;
`
const KillPart = styled.div`
	line-height: 16px;
	margin-top: 0px;
	font-size: 12px;
	color: #d31a45;
`
const Champions = styled.div`
	width: 222px;
	margin-left: 16px;
`
const Title = styled.div`
	line-height: 16px;
	font-size: 12px;
	color: #758592;
`
const Positions = styled.div`
	width: 222px;
`
