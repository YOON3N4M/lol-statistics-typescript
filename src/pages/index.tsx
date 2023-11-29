import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'

import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import RecentSearched from '@/components/RecentSearched'
import { handleRiotId } from '@/utils'
import { variable } from '@/styles/Globalstyles'

function Home() {
	const [username, setUsername] = useState('')
	const [isToolTip, setIsToolTip] = useState(false)
	const [translatedName, setTranslatedName] = useState('')
	const router = useRouter()

	function onChange(e: any) {
		setUsername(e.target.value)
	}

	function onSubmit(e: any) {
		e.preventDefault()
		const inputValue = handleRiotId(username, '#')

		if (inputValue.tag === undefined) {
			if (inputValue.name.length === 2) {
				const handleBlank = `${inputValue.name[0]} ${inputValue.name[1]}`
				router.push(`summoners/kr/${handleBlank}-KR1`)
			} else {
				router.push(`summoners/kr/${inputValue.name}-KR1`)
			}
		} else {
			router.push(`summoners/kr/${inputValue.name}-${inputValue.tag}`)
		}
	}

	function onClick(name: string) {
		router.push(`summoners/kr/${name}`)
	}

	function translateName(name: string) {
		const nickname = name.split('#')[0]
		const tag = name.split('#')[1]
		if (!tag) {
			setTranslatedName('')
		} else if (tag === 'KR1') {
			setTranslatedName('')
		} else {
			setTranslatedName(name)
		}
	}

	useEffect(() => {
		translateName(username)
	}, [username])

	return (
		<>
			<Header />
			<HomeContainer>
				<LogoContainer>
					{/* <Logo className="home-logo">OP.GG</Logo> */}
				</LogoContainer>
				<div>
					<form onSubmit={onSubmit}>
						<SearchContainer>
							<RegionOption>
								<StyledLabel>Region</StyledLabel>
								<Region>Korea</Region>
							</RegionOption>
							<VLine></VLine>
							<InputContainer>
								<StyledLabel>Search</StyledLabel>
								<SearchInput
									onChange={onChange}
									className="search-input"
									placeholder="소환사명..."
									value={username}
									onFocus={() => {
										setIsToolTip(true)
									}}
									onBlur={() => setIsToolTip(false)}
								></SearchInput>
								{isToolTip && (
									<StyledToolTip>
										<p className="notice">
											현재 대소문자를 정확히 입력해야만 정상적인 검색이 가능
											합니다.
										</p>
										{translatedName === '' ? (
											<div className="head">
												<div>
													<span className="tip">
														기존 닉네임 검색 ( 이름#KR1 )
													</span>
												</div>
												<div>
													{username !== '' && (
														<span className="translate">
															{username.split('#')[0]}#KR1
														</span>
													)}
												</div>
											</div>
										) : (
											<div className="head">
												<div>
													<span className="tip">
														Riot ID 검색 ( 이름#태그 )
													</span>
												</div>
												<div>
													<span className="translate">{translatedName}</span>
												</div>
											</div>
										)}
									</StyledToolTip>
								)}
							</InputContainer>
							<SearchBtn onClick={onSubmit} className="search-btn">
								.GG
							</SearchBtn>
						</SearchContainer>
					</form>
				</div>
				<RecentSearched />
			</HomeContainer>
		</>
	)
}

export default Home

const StyledToolTip = styled.div`
	position: absolute;
	margin-top: 10px;
	width: 100%;
	box-sizing: border-box;
	background-color: white;
	z-index: 3000;
	padding: 10px 10px;
	border: 1px solid ${variable.color.border};

	transform: translateY(2px);
	box-shadow: 0 2px 2px 0 rgb(0 0 0 / 19%);
	.notice {
		font-size: 12px;
		color: ${variable.color.gray};
		font-weight: bold;
	}
	.head {
		.tip {
			font-size: 12px;
			background-color: #f7f7f9;
			padding: 1px 2px;
			color: ${variable.color.gray};
			border-radius: 4px;
		}
		.translate {
			font-size: 13px;
			color: gray;
			font-weight: bold;
			cursor: pointer;
		}
	}
	.head + .head {
		margin-top: 5px;
	}
`

const HomeContainer = styled.div`
	width: 100%;
	height: 1000px;
	background-color: #5383e8;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const LogoContainer = styled.div`
	width: 100%;
	height: 224px;
	margin: 56px 0 46px;
	display: flex;
	align-items: center;
	justify-content: center;
`
const Logo = styled.span`
	color: white;
	font-size: 10rem;
	font-weight: 900;
`
const SearchContainer = styled.div`
	width: 800px;
	height: 60px;
	background-color: white;
	border-radius: 30px;
	box-shadow: 0 2px 2px 0 rgb(0 0 0 / 19%);
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const RegionOption = styled.div`
	width: 234px;
	height: 40px;
	padding-left: 32px;
	padding-right: 8px;
	margin-right: 8px;
`
const StyledLabel = styled.small`
	display: block;
	font-size: 12px;
	font-weight: bold;
	margin-bottom: 3px;
`
const Region = styled.span`
	color: gray;
	font-size: 14px;
`
const VLine = styled.div`
	border-left: solid 1px gray;
	height: 30px;
	opacity: 30%;
`

const SearchInput = styled.input`
	width: 100%;
	border: 0px;
	outline: none;
	font-size: 14px;
`

const SearchBtn = styled.button`
	color: #5383e8;
	font-size: 25px;
	font-weight: 700;
	margin-right: 30px;
	cursor: pointer;
	border: 0px;
	background-color: rgb(0, 0, 0, 0);
`
const InputContainer = styled.div`
	position: relative;
	width: 420px;
	height: 40px;
`

const ProContainer = styled.div`
	margin-top: 40px;
	width: 800px;
	height: 464px;
	background-color: white;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
`

const ProHeader = styled.div`
	height: 50px;
	font-weight: 800;
	padding-top: 10px;
	padding-left: 10px;
	border-bottom: 1px solid #ebeef1;
`
const TeamContainer = styled.div`
	display: flex;
`
const Team = styled.div`
	width: 400px;
`
const TeamHeader = styled.div`
	width: 399px;
	height: 70px;
	background-color: white;
	border-bottom: 1px solid #ebeef1;
	display: flex;
	align-items: center;
	justify-content: center;
`
const Tone = styled.img`
	width: 70px;
`
const Geng = styled.img`
	width: 40px;
`
const PlayerContainer = styled.div`
	height: 70px;
	display: flex;
	align-items: center;
	padding: 0 40px 0px 40px;
	border-bottom: 1px solid #ebeef1;
	cursor: pointer;
`
const Lane = styled.img``
const Nickname = styled.div`
	font-weight: 900;
	font-size: 30px;
	margin-left: 75px;
`
const Name = styled.div`
	top: 9px;
	position: relative;
	font-weight: 200;
	left: 3px;
`
