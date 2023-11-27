import { useEffect } from 'react'
import styled from 'styled-components'
import { MatchInfoObj, UserDocument } from '../@types/types'
import { calculatedTimeDiffer, getMatchStatistics } from '../utils'
import {
	CHAMPION_ICON_URL,
	ITEM_ICON_URL,
	RUNE_ICON_URL,
	SUMMONER_SPELL_ICON_URL,
} from '../constants'

interface Props {
	userDocument: UserDocument
	match: MatchInfoObj
}

function MatchHistorys({ userDocument, match }: Props) {
	const name = userDocument.name

	const matchStatistics = getMatchStatistics(match, name)
	// console.log(match, matchStatistics?.matchStatistics.queueType)

	return (
		<>
			{matchStatistics?.matchStatistics.queueType !== undefined && (
				<>
					<Match isWin={matchStatistics?.searchedPlayer.win}>
						<GameContainer>
							<Game>
								<Type isWin={matchStatistics?.searchedPlayer.win}>
									{matchStatistics?.matchStatistics.queueType}
								</Type>
								<Timestamp>
									{calculatedTimeDiffer(
										matchStatistics.matchStatistics.gameCreation,
									)}
								</Timestamp>
								<Horizontal></Horizontal>
								<Result isWin={matchStatistics?.searchedPlayer.win}>
									{matchStatistics?.searchedPlayer.win ? '승리' : '패배'}
								</Result>
								<Length>{`${matchStatistics?.matchStatistics.gameDurationTime}분`}</Length>
							</Game>
							<GameInfo>
								<TopRow>
									<Champion>
										<ChampionIconBox>
											<ChampionIcon
												src={CHAMPION_ICON_URL(
													matchStatistics?.searchedPlayer.championName,
												)}
											></ChampionIcon>
											<ChampionLevel>
												{matchStatistics?.searchedPlayer.level}
											</ChampionLevel>
										</ChampionIconBox>
										<SpellContainer>
											<SpellBox>
												<SpellIcon
													src={SUMMONER_SPELL_ICON_URL(
														matchStatistics?.searchedPlayer.summonersSpell.a,
													)}
												/>
											</SpellBox>
											<SpellBox>
												<SpellIcon
													src={SUMMONER_SPELL_ICON_URL(
														matchStatistics?.searchedPlayer.summonersSpell.b,
													)}
												/>
											</SpellBox>
										</SpellContainer>
										<RuneContainer>
											<MainRune>
												<RuneIcon
													src={RUNE_ICON_URL(
														matchStatistics?.searchedPlayer.rune.main,
													)}
												/>
											</MainRune>
											<RuneIcon
												src={RUNE_ICON_URL(
													matchStatistics?.searchedPlayer.rune.sub,
												)}
											/>
										</RuneContainer>
									</Champion>
									<KDAContainer>
										<KDA>
											<KDASpan red={false}>
												{matchStatistics?.searchedPlayer.kills}
											</KDASpan>
											/
											<KDASpan red={true}>
												{matchStatistics?.searchedPlayer.deaths}
											</KDASpan>
											/
											<KDASpan red={false}>
												{matchStatistics?.searchedPlayer.assists}
											</KDASpan>
										</KDA>
										<Ratio>
											<span>{matchStatistics?.searchedPlayer.kda}</span> 평점
										</Ratio>
									</KDAContainer>
									<Stats>
										<Stat color="red">
											킬관여{' '}
											{matchStatistics?.searchedPlayer.searchedPlayersKillPart}%
										</Stat>
										<Stat color="gray">
											제어와드 {matchStatistics?.searchedPlayer.pinkWardQty}
										</Stat>
										<Stat color="gray">
											cs {matchStatistics?.searchedPlayer.cs}(
											{matchStatistics?.searchedPlayer.csPerMin})
										</Stat>
										<Stat color="gray"></Stat>
									</Stats>
								</TopRow>
								<BottomRow>
									<ItemContainer>
										<ItemUl>
											{matchStatistics?.searchedPlayer.items.map((item) => (
												<li>
													<ItemBox isWin={matchStatistics?.searchedPlayer.win}>
														{item !== 0 && (
															<ItemIcon src={ITEM_ICON_URL(item)} />
														)}
													</ItemBox>
												</li>
											))}
										</ItemUl>
										<WardBox isWin={matchStatistics?.searchedPlayer.win}>
											{matchStatistics?.searchedPlayer.ward !== 0 && (
												<WardIcon
													src={ITEM_ICON_URL(
														matchStatistics?.searchedPlayer.ward,
													)}
												/>
											)}
										</WardBox>
									</ItemContainer>
								</BottomRow>
							</GameInfo>
							<PartContainer>
								<ul>
									{matchStatistics?.matchStatistics.teamA.map(
										(item: any, index: any) => (
											<PartLi>
												<PartIconBox>
													<PartIcon
														src={CHAMPION_ICON_URL(item.championName)}
													/>
												</PartIconBox>
												<PartNameBox>
													<PartName>{item.summonerName}</PartName>
												</PartNameBox>
											</PartLi>
										),
									)}
								</ul>
								<ul>
									{matchStatistics?.matchStatistics.teamB.map((item: any) => (
										<PartLi>
											<PartIconBox>
												<PartIcon src={CHAMPION_ICON_URL(item.championName)} />
											</PartIconBox>
											<PartNameBox>
												<PartName>{item.summonerName}</PartName>
											</PartNameBox>
										</PartLi>
									))}
								</ul>
							</PartContainer>
						</GameContainer>
						<Detail>
							<DetailBtn
								isWin={matchStatistics?.searchedPlayer.win}
							></DetailBtn>
						</Detail>
					</Match>
				</>
			)}
		</>
	)
}

const Match = styled.li<{ isWin?: any }>`
	height: 96px;
	margin-bottom: 8px;
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
const PartName = styled.a`
	color: inherit;
	display: block;
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
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

export default MatchHistorys
