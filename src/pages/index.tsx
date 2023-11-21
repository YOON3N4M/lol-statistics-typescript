import React from 'react'
import Header from '../components/layout/Header'
import { useState, useEffect } from 'react'

import topIcon from '../img/lane/top.svg'
import jgIcon from '../img/lane/jg.svg'
import midIcon from '../img/lane/mid.svg'
import adcIcon from '../img/lane/adc.svg'
import supIcon from '../img/lane/sup.svg'
import geng from '../img/team/geng.png'
import t1 from '../img/team/t1.png'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'

function Home() {
	const [username, setUsername] = useState('')
	const router = useRouter()

	function onChange(e: any) {
		setUsername(e.target.value)
	}

	function onSubmit(e: any) {
		e.preventDefault()
		// 닉네임이 두 글자일 경우 정상적인 소환사 조회가 불가능하여, 사이에 공백을 넣어서 처리함.
		if (username.trim() === '') {
		} else if (username.length === 2) {
			const usernameRe = `${username[0]} ${username[1]}`
			router.push(`summoners/kr/${usernameRe}`)
		} else {
			router.push(`summoners/kr/${username}`)
		}
	}

	function onClick(name: string) {
		router.push(`summoners/kr/${name}`)
	}

	const sktMember = {
		top: '우 제',
		jg: '잘가요 굿바이',
		mid: 'Hide on bush',
		adc: 'T1 Gumayusi',
		sup: '역천괴',
	}

	const gengMember = {
		top: '어리고싶다',
		jg: 'XiaoHuaSheng7',
		mid: 'GOOD GAME GG XD',
		adc: '으끄으끄',
		sup: '무성은고기먹을래',
	}

	return (
		<>
			<Header />
			<HomeContainer>
				<LogoContainer>
					<Logo className="home-logo">OP.GG</Logo>
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
								></SearchInput>
							</InputContainer>
							<SearchBtn onClick={onSubmit} className="search-btn">
								.GG
							</SearchBtn>
						</SearchContainer>
					</form>
				</div>

				<ProContainer>
					<ProHeader>
						<span>프로게이머 전적 바로가기</span>
					</ProHeader>
					<TeamContainer>
						<Team>
							<TeamHeader>
								<div>
									<Tone src={t1} />
								</div>
							</TeamHeader>
							<PlayerContainer onClick={() => onClick(sktMember.top)}>
								<div className="pro-lane">
									<img src={topIcon} />
								</div>
								<Nickname>Zeus</Nickname>
								<Name>최우제</Name>
							</PlayerContainer>
							<PlayerContainer onClick={() => onClick(sktMember.jg)}>
								<div className="pro-lane">
									<img src={jgIcon} />
								</div>
								<Nickname>Oner</Nickname>
								<Name>문현준</Name>
							</PlayerContainer>{' '}
							<PlayerContainer onClick={() => onClick(sktMember.mid)}>
								<div className="pro-lane">
									<img src={midIcon} />
								</div>
								<Nickname>Faker</Nickname>
								<Name>이상혁</Name>
							</PlayerContainer>{' '}
							<PlayerContainer onClick={() => onClick(sktMember.adc)}>
								<div className="pro-lane">
									{' '}
									<img src={adcIcon} />
								</div>
								<Nickname>Gumayusi</Nickname>
								<Name>이민형</Name>
							</PlayerContainer>{' '}
							<PlayerContainer onClick={() => onClick(sktMember.sup)}>
								<div className="pro-lane">
									<img src={supIcon} />
								</div>
								<Nickname>Keria</Nickname>
								<Name>류민석</Name>
							</PlayerContainer>
						</Team>
						<Team>
							<TeamHeader>
								{' '}
								<div>
									<Geng src={geng} />
								</div>
							</TeamHeader>
							<PlayerContainer onClick={() => onClick(gengMember.top)}>
								<div className="pro-lane">
									<img src={topIcon} />
								</div>
								<Nickname>Doran</Nickname>
								<Name>최현준</Name>
							</PlayerContainer>
							<PlayerContainer onClick={() => onClick(gengMember.jg)}>
								<div className="pro-lane">
									<img src={jgIcon} />
								</div>
								<Nickname>Peanut</Nickname>
								<Name>한왕호</Name>
							</PlayerContainer>{' '}
							<PlayerContainer onClick={() => onClick(gengMember.mid)}>
								<div className="pro-lane">
									<img src={midIcon} />
								</div>
								<Nickname>Chovy</Nickname>
								<Name>정지훈</Name>
							</PlayerContainer>{' '}
							<PlayerContainer onClick={() => onClick(gengMember.adc)}>
								<div className="pro-lane">
									{' '}
									<img src={adcIcon} />
								</div>
								<Nickname>Payz</Nickname>
								<Name>김수환</Name>
							</PlayerContainer>{' '}
							<PlayerContainer onClick={() => onClick(gengMember.sup)}>
								<div className="pro-lane">
									<img src={supIcon} />
								</div>
								<Nickname>Delight</Nickname>
								<Name>유환중</Name>
							</PlayerContainer>
						</Team>
					</TeamContainer>
				</ProContainer>
			</HomeContainer>
		</>
	)
}

export default Home

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
