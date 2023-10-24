import styled from 'styled-components'
import { LeagueInfo, UserDocument } from '../@types/types'
import { matchingTierImg, romeNumToArabNum } from '../utils'

interface Props {
	userDocument: UserDocument
}

export default function CurrentRank({ userDocument }: Props) {
	const { league1, league2 } = userDocument
	console.log(league1, league2)
	const soloTier =
		league1.tier.toLowerCase().charAt(0).toUpperCase() +
		league1.tier.toLowerCase().substring(1)
	const soloRank = romeNumToArabNum(league1.rank)

	return (
		<>
			<CurrentRankContainer>
				<CurrentRankHeader>
					<span>솔로랭크</span>
				</CurrentRankHeader>
				{league1 !== null ? (
					<CurrentRankContents>
						<CurrentTierImgContainer>
							<CurrentTierImg
								src={matchingTierImg(league1.tier)}
								alt={soloTier}
							/>
						</CurrentTierImgContainer>
						<CurrentTierContainer>
							<CurrentTier>
								{soloTier} {soloRank}
							</CurrentTier>
							<CurrentLp>{league1.leaguePoints} LP</CurrentLp>
						</CurrentTierContainer>
						<WinLoseContainer>
							<WinLose>
								{league1.wins}승 {league1.losses}패
							</WinLose>
							<WinRate>
								승률{` `}
								{Math.ceil(
									(league1.wins / (league1.wins + league1.losses)) * 100,
								)}
								%
							</WinRate>
						</WinLoseContainer>
					</CurrentRankContents>
				) : null}
			</CurrentRankContainer>
		</>
	)
}

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
const CurrentTierContainer = styled.div`
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
