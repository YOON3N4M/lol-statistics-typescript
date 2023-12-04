import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
	MatchInfoObj,
	RefinedMatchStatistics,
	RefinedParticipantInfo,
	UserDocument,
} from '../@types/types'
import { calculatedTimeDiffer, getMatchStatistics, handleRiotId } from '@/utils'
import {
	CHAMPION_ICON_URL,
	ITEM_ICON_URL,
	RUNE_ICON_URL,
	SUMMONER_SPELL_ICON_URL,
} from '@/constants'
import Link from 'next/link'
import MatchDetail from './MatchDetail'

interface Props {
	userDocument: UserDocument
	match: MatchInfoObj
}

function MatchHistory({ userDocument, match }: Props) {
	const [showDetail, setShowDetail] = useState(false)
	const name = handleRiotId(userDocument.riotId, '#').name

	const matchStatistics: RefinedMatchStatistics = getMatchStatistics(
		match,
		name,
	)
	const { currentPlayer, refinedMatchInfo } = matchStatistics
	const { gameCreation, queueType, gameDurationTime, teamA, teamB } =
		refinedMatchInfo
	const {
		win,
		championName,
		champLevel,
		summonersSpell,
		rune,
		kills,
		deaths,
		assists,
		kda,
		visionWardsBoughtInGame,
		cs,
		items,
		item6,
	} = currentPlayer

	return (
		<>
			<MatchContainer>
				<Match isWin={win}>
					<GameContainer>
						<Game>
							<Type isWin={win}>{queueType}</Type>
							<Timestamp>{calculatedTimeDiffer(gameCreation)}</Timestamp>
							<Horizontal></Horizontal>
							<Result isWin={win}>{win ? '승리' : '패배'}</Result>
							<Length>{`${gameDurationTime}분`}</Length>
						</Game>
						<GameInfo>
							<TopRow>
								<Champion>
									<ChampionIconBox>
										<ChampionIcon
											src={CHAMPION_ICON_URL(championName)}
										></ChampionIcon>
										<ChampionLevel>{champLevel}</ChampionLevel>
									</ChampionIconBox>
									<SpellContainer>
										<SpellBox>
											<SpellIcon
												src={SUMMONER_SPELL_ICON_URL(summonersSpell.a)}
											/>
										</SpellBox>
										<SpellBox>
											<SpellIcon
												src={SUMMONER_SPELL_ICON_URL(summonersSpell.b)}
											/>
										</SpellBox>
									</SpellContainer>
									<RuneContainer>
										<MainRune>
											<RuneIcon src={RUNE_ICON_URL(rune.main)} />
										</MainRune>
										<RuneIcon src={RUNE_ICON_URL(rune.sub)} />
									</RuneContainer>
								</Champion>
								<KDAContainer>
									<KDA>
										<KDASpan red={false}>{kills}</KDASpan>/
										<KDASpan red={true}>{deaths}</KDASpan>/
										<KDASpan red={false}>{assists}</KDASpan>
									</KDA>
									<Ratio>
										<span>{kda}</span> 평점
									</Ratio>
								</KDAContainer>
								<Stats>
									<Stat color="red">
										킬관여{' '}
										{/* {matchStatistics?.searchedPlayer.searchedPlayersKillPart}% */}
									</Stat>
									<Stat color="gray">제어와드 {visionWardsBoughtInGame}</Stat>
									<Stat color="gray">
										cs {cs}
										{/* {matchStatistics?.searchedPlayer.csPerMin}) */}
									</Stat>
									<Stat color="gray"></Stat>
								</Stats>
							</TopRow>
							<BottomRow>
								<ItemContainer>
									<ItemUl>
										{items.map((item: number) => (
											<li>
												<ItemBox isWin={win}>
													{item !== 0 && <ItemIcon src={ITEM_ICON_URL(item)} />}
												</ItemBox>
											</li>
										))}
									</ItemUl>
									<WardBox isWin={win}>
										{item6 !== 0 && <WardIcon src={ITEM_ICON_URL(item6)} />}
									</WardBox>
								</ItemContainer>
							</BottomRow>
						</GameInfo>
						<PartContainer>
							<ul>
								{teamA.map((item: RefinedParticipantInfo, index: any) => (
									<PartLi>
										<PartIconBox>
											<PartIcon src={CHAMPION_ICON_URL(item.championName)} />
										</PartIconBox>
										<PartNameBox>
											<PartName
												$isPlayer={item.riotIdGameName === userDocument.name}
											>
												<Link
													href={`/summoners/kr/${item.riotIdGameName}-${item.riotIdTagline}`}
												>
													{item.riotIdGameName}
												</Link>
											</PartName>
										</PartNameBox>
									</PartLi>
								))}
							</ul>
							<ul>
								{teamB.map((item: RefinedParticipantInfo) => (
									<PartLi>
										<PartIconBox>
											<PartIcon src={CHAMPION_ICON_URL(item.championName)} />
										</PartIconBox>
										<PartNameBox>
											<PartName
												$isPlayer={item.riotIdGameName === userDocument.name}
											>
												<Link
													href={`/summoners/kr/${item.riotIdGameName}-${item.riotIdTagline}`}
												>
													{item.riotIdGameName}
												</Link>
											</PartName>
										</PartNameBox>
									</PartLi>
								))}
							</ul>
						</PartContainer>
					</GameContainer>
					<Detail>
						<DetailBtn
							isWin={win}
							onClick={() => setShowDetail((prev) => !prev)}
						></DetailBtn>
					</Detail>
				</Match>
				{showDetail && <MatchDetail matchStatistics={matchStatistics} />}
			</MatchContainer>
		</>
	)
}

const MatchContainer = styled.div`
	position: relative;
	margin-top: 8px;
`

const Match = styled.li<{ isWin?: any }>`
	height: 96px;

	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	border-left: 4px solid;
	background-color: ${(props: any) => (props.isWin ? '#ecf2ff' : '#fff1f3')};
	border-color: ${(props: any) => (props.isWin ? '#5383e8' : '#e84057')};
`
const GameContainer = styled.div`
	padding: 0px 8px 0px 12px;
	display: flex;
	height: 96px;
	align-items: center;
	justify-content: space-between;
`
const Game = styled.div`
	width: 108px;
	line-height: 16px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 12px;
	color: #758592;
`
const Type = styled.div<{ isWin?: any }>`
	font-weight: bold;
	color: ${(props: any) => (props.isWin ? '#4171d6' : '#d31a45')};
`
const Timestamp = styled.div`
	color: #758592;
`
const Horizontal = styled.div`
	width: 48px;
	height: 1px;
	margin: 8px 0px 4px;
	background-color: #d5e3ff;
`
const Result = styled.div<{ isWin?: any }>`
	font-weight: bold;
`
const Length = styled.div``
const GameInfo = styled.div`
	width: 377px;
	height: 83px;
`
const TopRow = styled.div`
	display: flex;
	height: 53px;
`
const Champion = styled.div`
	display: flex;
`
const ChampionIconBox = styled.div``
const ChampionIcon = styled.img`
	border-radius: 50%;
	width: 48px;
	max-height: 48px;
`
const ChampionLevel = styled.span`
	position: relative;
	right: -29px;
	bottom: 23px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	font-size: 11px;
	border-radius: 50%;
	color: rgb(255, 255, 255);
	background: rgb(32, 45, 55);
`
const SpellContainer = styled.div`
	margin-left: 4px;
`
const SpellBox = styled.div`
	margin-left: 4px;
	width: 22px;
	height: 22px;
	margin-bottom: 3px;
`
const SpellIcon = styled.img`
	width: 22px;
	height: 22px;
	margin-bottom: 2px;
	border-radius: 4px;
`
const RuneContainer = styled.div`
	margin-left: 2px;
`
const MainRune = styled.div`
	margin-bottom: 2px;
	background-color: rgb(0, 0, 0);
	border-radius: 50%;
	width: 22px;
	height: 22px;
`
const RuneIcon = styled.img`
	width: 22px;
	height: 22px;
	border-radius: 50%;
	margin-bottom: 2px;
`
const KDAContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	width: 107px;
	padding-right: 12px;
	margin-right: 8px;
	margin-left: 12px;
`
const KDA = styled.div`
	line-height: 22px;
	font-size: 15px;
	color: #9aa4af;
	letter-spacing: 3px;
`
const KDASpan = styled.span<{ red: boolean }>`
	color: #202d37;
	font-weight: 700;
	color: ${(props: any) => (props.red ? '#d31a45' : '#202d37')};
`
const Ratio = styled.div`
	line-height: 16px;
	color: #758592;
	font-size: 12px;
`
const Stats = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 140px;
	color: #758592;
	font-size: 11px;
	border-left: 1px solid #c6c6c6;
	padding-left: 4px;
`
const Stat = styled.div<{ color: string }>`
	color: ${(props: any) => (props.color === 'red' ? '#d31a45' : '#758592')};
`
const BottomRow = styled.div`
	height: 22px;
	margin-top: 8px;
`
const ItemContainer = styled.div`
	display: flex;
`
const ItemUl = styled.ul`
	display: flex;
	margin: 0;
`
const ItemBox = styled.div<{ isWin?: any }>`
	width: 22px;
	height: 22px;
	background-color: ${(props: any) => (props.isWin ? '#b3cdff' : '#ffbac3')};
	margin-left: 2px;
	border-radius: 4px;
`
const ItemIcon = styled.img`
	width: 22px;
	height: 22px;
	border-radius: 4px;
`
const WardBox = styled.div<{ isWin?: any }>`
	background-color: ${(props: any) => (props.isWin ? '#b3cdff' : '#ffbac3')};
	width: 22px;
	height: 22px;
	border-radius: 50%;
	margin-left: 2px;
	margin-right: 4px;
`
const WardIcon = styled.img`
	width: 22px;
	height: 22px;
	border-radius: 50%;
`
const PartContainer = styled.div`
	display: flex;
`
const PartIconBox = styled.div`
	margin-right: 4px;
	width: 16px;
	height: 16px;
`
const PartIcon = styled.img`
	width: 16px;
	height: 16px;
	border-radius: 4px;
`
const PartNameBox = styled.div`
	display: inline-block;
	max-width: 60px;
	vertical-align: middle;
	color: #75859d;
`
const PartLi = styled.li`
	display: flex;
	align-items: center;
	width: 88px;
	height: 18px;
	text-align: left;
	white-space: nowrap;
`
const PartName = styled.a<{ $isPlayer: boolean }>`
	color: inherit;
	display: block;
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-weight: ${(props) => props.$isPlayer && 'bold'};
	a {
		text-decoration: none;
		color: #75859d;
	}
`
const PartNameB = styled.b`
	color: inherit;
	display: block;
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-weight: bold;
`
const Detail = styled.div``
const DetailBtn = styled.button<{ isWin?: any }>`
	width: 40px;
	height: 96px;
	border: 0px;
	cursor: pointer;
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
	background-color: ${(props: any) => (props.isWin ? '#d5e3ff' : '#ffd8d9')};
`

export default MatchHistory
