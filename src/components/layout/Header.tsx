import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import SearchInput from '../SearchInput'
import { usePathname } from 'next/navigation'

function Header() {
	const pathname = usePathname()

	return (
		<>
			<StyledHeader>
				<Link style={{ textDecoration: 'none' }} href="/">
					<StyledLogo>OP.GG</StyledLogo>
				</Link>
				{pathname !== '/' && (
					<StyledInputContainer>
						<div className="region">
							<span>KR</span>
						</div>
						<div className="search">
							<SearchInput />
						</div>
					</StyledInputContainer>
				)}

				<div></div>
			</StyledHeader>
		</>
	)
}

const StyledHeader = styled.div`
	background-color: #5383e8;
	width: 100%;
	height: 50px;
	border-bottom: 1px solid #4171d6;
	display: flex;
	align-items: center;
	padding-left: 15px;
	padding-right: 35px;
	box-sizing: border-box;
	justify-content: space-between;
`
const StyledLogo = styled.h1`
	color: white;
	font-size: 20px;
	font-weight: 800;
	text-decoration-line: none;
`
const StyledInputContainer = styled.div`
	display: flex;
	width: 1024px;
	height: 30px;
	background-color: white;
	border-radius: 4px;

	.region {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 100%;
		background-color: rgb(236, 242, 255);
		border-bottom-left-radius: 4px;
		border-top-left-radius: 4px;
		span {
			color: rgb(65, 113, 214);
			font-size: 12px;
		}
	}
	.search {
		padding-left: 10px;
		display: flex;
		width: 100%;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
	}
`

export default Header
