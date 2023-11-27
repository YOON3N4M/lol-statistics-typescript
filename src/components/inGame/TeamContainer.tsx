import styled from 'styled-components'
import { RefinedParticipant } from './InGame'
import Image from 'next/image'
import { CHAMPION_ICON_URL, SUMMONER_SPELL_ICON_URL } from '@/constants'

interface Props {
	team?: RefinedParticipant[]
}

export default function TeamContainer({ team }: Props) {
	console.log(team)
	return (
		<>
			<StyledTeamContainer>
				<StyledTeamHeader $isBlue={true}>
					<div className="team">
						<span className="bold">블루팀</span>
					</div>
					<div className="info">
						<div className="season">S2023</div>
						<div className="winRate">랭크 승률</div>
						<div className="champion">S2023</div>
						<div className="badge">배지</div>
					</div>
					<div className="rune-detail"></div>
					<div className="ban">
						<span>밴</span>
					</div>
				</StyledTeamHeader>
				{team?.map((participant) => (
					<ParticipantContainer>
						<div className="team">
							<div className="champion-icon">
								<img src={CHAMPION_ICON_URL('Ahri')} alt="ahri" />
							</div>
							<div className="summoner-spells">
								<div className="spell">
									<img
										src={
											'https://ddragon.leagueoflegends.com/cdn/13.23.1/img/spell/SummonerSmite.png'
										}
									/>
								</div>
								<div className="spell">
									<img
										src={
											'https://ddragon.leagueoflegends.com/cdn/13.23.1/img/spell/SummonerSmite.png'
										}
									/>
								</div>
							</div>
							<div className="rune">
								<div className="rune-main">
									<img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png" />
								</div>
								<div className="rune-sub">
									<img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7203_Whimsy.png" />
								</div>
							</div>
							<div className="nickname">
								<span>{participant.summonerName}</span>
							</div>
						</div>
						<div className="info">
							<div className="season">S2023</div>
							<div className="winRate">랭크 승률</div>
							<div className="champion">S2023</div>
							<div className="badge">배지</div>
						</div>
						<div className="rune-detail"></div>
						<div className="ban">
							<span>밴</span>
						</div>
					</ParticipantContainer>
				))}
			</StyledTeamContainer>
		</>
	)
}

const StyledTeamContainer = styled.div`
	width: 100%;
	.bold {
		font-weight: bold;
	}
	.team {
		display: flex;
		//background-color: pink;
		padding-left: 12px;
		width: 345px;
		box-sizing: border-box;
		align-items: center;
	}
	.info {
		//	background-color: yellow;
		width: 548px;
		box-sizing: border-box;
		display: flex;
		.season {
			width: 164px;
		}
		.winRate {
			width: 124px;
		}
		.champion {
			width: 200px;
		}
		.badge {
			width: 60px;
		}
		.rune-detail {
			width: 136px;
		}
	}

	.info > div {
		text-align: center;
	}

	.rune-detail {
		//	background-color: green;
		width: 136px;
		box-sizing: border-box;
	}
	.ban {
		//	background-color: skyblue;
		width: 48px;
		box-sizing: border-box;
		padding-right: 12px;
	}
`

const StyledTeamHeader = styled.div<{ $isBlue: boolean }>`
	display: flex;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	padding: 9px 0px;
	border-bottom: 1px solid #ebeef1;
	span {
		font-size: 12px;
		color: gray;
	}

	.team > span {
		color: ${(props) => (props.$isBlue ? '#4171D6' : '#D31A45')};
	}
`

const ParticipantContainer = styled.div`
	width: 100%;
	height: 37px;
	border-left: 2px solid #4171d6;
	display: flex;
	.champion-icon {
		display: flex;
		align-items: center;
	}
	.champion-icon > img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}

	.summoner-spells {
		padding: 2px 0;
		div {
			height: 15px;
		}
	}
	.spell {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 3px;
	}
	.spell > img {
		width: 15px;
		height: 15px;
		border-radius: 4px;
	}

	.rune-main {
		width: 15px;
		height: 15px;
		background-color: black;
		border-radius: 50%;
	}
	.rune {
		padding-left: 1px;
		height: min-content;
		div {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		img {
			width: 15px;
			height: 15px;
		}
	}

	.nickname {
		padding-left: 10px;
		span {
			color: #202d37;
			font-size: 12px;
			font-weight: 600;
		}
	}
`
