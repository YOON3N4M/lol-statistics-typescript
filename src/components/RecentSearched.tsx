import { RiotId, UserDocument } from '@/@types/types'
import {
	calculatedTimeDiffer,
	handleRiotId,
	matchingTierImg,
	romeNumToArabNum,
} from '@/utils'
import { firebaseAPI } from '@/utils/firebaseApi'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { variable } from '@/styles/Globalstyles'
import { SUMMONER_PROFILE_ICON_URL } from '@/constants'
import { useRouter } from 'next/navigation'

export default function RecentSearched() {
	const [recentlyUser, setRecentlyUser] = useState<UserDocument[]>()
	const router = useRouter()
	useEffect(() => {
		async function getCollection() {
			const collection = await firebaseAPI.getUserCollection()
			const sortByLastRequestTime = collection
				.slice()
				.sort(
					(a: UserDocument, b: UserDocument) =>
						b.lastRequestTime - a.lastRequestTime,
				)
			setRecentlyUser(sortByLastRequestTime)
		}
		getCollection()
	}, [])

	function goSelectUser(riotId: RiotId) {
		router.push(`summoners/kr/${riotId.name}-${riotId.tag}`)
	}
	return (
		<StyledRecentContainer>
			<StyledRecentHeader>
				<h2>최근 갱신 (KR)</h2>
			</StyledRecentHeader>
			<div className="user-wrap">
				{recentlyUser?.map((user) => {
					const riotId = handleRiotId(user.riotId, '#')
					const tier =
						user.league1.tier.toLowerCase().charAt(0).toUpperCase() +
						user.league1.tier.toLowerCase().substring(1)
					const rank = romeNumToArabNum(user.league1.rank)

					return (
						<StyledUserContainer onClick={() => goSelectUser(riotId)}>
							<div className="summoner">
								<div>
									<img src={SUMMONER_PROFILE_ICON_URL(user.profileIconId)} />
								</div>
								<div className="level">
									<span>{user.summonerLevel}</span>
								</div>
							</div>
							<div className="riot-id">
								<h3>
									{riotId.name} <span>#{riotId.tag}</span>
								</h3>
								<span className="region">KR</span>
							</div>
							<div className="rank">
								<div className="badge">
									<div>
										<img src={matchingTierImg(user.league1.tier)}></img>
									</div>
								</div>
								<div className="point">
									<div>
										<span>
											{tier} {rank}
										</span>
									</div>
									<div>{user.league1.leaguePoints}LP</div>
								</div>
							</div>
							<div className="blank">
								<span>{calculatedTimeDiffer(user.lastRequestTime)}</span>
							</div>
						</StyledUserContainer>
					)
				})}
			</div>
		</StyledRecentContainer>
	)
}

const StyledRecentContainer = styled.div`
	position: relative;
	margin-top: 50px;
	width: 1024px;
	max-height: 500px;
	background-color: white;
	border-radius: 4px;
	overflow: hidden;
	box-shadow: 0 2px 2px 0 rgb(0 0 0 / 19%);
	.user-wrap {
		overflow-y: scroll;
		height: 400px;
		::-webkit-scrollbar {
			width: 5px;
		}

		::-webkit-scrollbar-thumb {
			background-color: #88888875;
			border-radius: 6px;
		}

		::-webkit-scrollbar-track {
			background-color: #f1f1f1;
		}
	}
`

const StyledRecentHeader = styled.div`
	position: sticky;
	width: 100%;
	padding: 5px 10px;
	//border-bottom: 1px solid ${variable.color.border};
	box-sizing: border-box;
	z-index: 1000;
	background-color: white;
	h2 {
		font-size: 15px;
	}
`

const StyledUserContainer = styled.div`
	position: relative;
	display: flex;
	width: 100%;

	box-sizing: border-box;
	padding: 10px 20px;
	border-bottom: 1px solid ${variable.color.border};
	align-items: center;
	cursor: pointer;
	:hover {
		background-color: #f7f7f9;
	}
	.summoner {
		display: flex;
		flex-direction: column;
		width: min-content;
		height: min-content;
		justify-content: center;
		text-align: center;
		img {
			width: 50px;
			height: 50px;
			border-radius: 4px;
		}
		.level {
			margin-top: -20px;
		}
		.level > span {
			border-radius: 12px;
			background-color: rgb(28, 28, 31);
			color: white;
			font-size: 12px;
			padding: 2px 8px;
		}
	}

	.riot-id {
		width: 60%;
		margin-left: 10px;
		h3 {
			font-size: 17px;
			margin: 0;
			span {
				color: ${variable.color.gray};
			}
		}
		.region {
			font-size: 12px;
		}
	}

	.rank {
		width: 160px;
		display: flex;
		.badge {
			display: flex;
			align-items: center;
		}
		.badge > div {
			width: 50px;
			height: 50px;
			background-color: #f7f7f9;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		img {
			width: 30px;
		}
		.point {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			margin-left: 5px;
			font-size: 15px;
			color: ${variable.color.gray};
			div {
				width: 100%;
				text-align: left;
			}
			span {
				font-size: 13px;
				font-weight: bold;
				color: black;
			}
		}
	}
	.blank {
		margin-left: 100px;
		font-size: 12px;
		color: ${variable.color.gray};
	}
`
