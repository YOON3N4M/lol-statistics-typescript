import { variable } from '@/styles/Globalstyles'
import { handleRiotId } from '@/utils'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'

export default function SearchInput() {
	const router = useRouter()

	const [username, setUsername] = useState('')
	const [isToolTip, setIsToolTip] = useState(false)
	const [translatedName, setTranslatedName] = useState('')

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
		<StyledContainer>
			<form onSubmit={onSubmit}>
				<StyledSearchInput
					onChange={onChange}
					placeholder="소환사명..."
					value={username}
					onFocus={() => {
						setIsToolTip(true)
					}}
					onBlur={() => setIsToolTip(false)}
				></StyledSearchInput>
			</form>
			{isToolTip && (
				<StyledToolTip>
					<p className="notice">
						현재 대소문자를 정확히 입력해야만 정상적인 검색이 가능 합니다.
					</p>
					{translatedName === '' ? (
						<div className="head">
							<div>
								<span className="tip">기존 닉네임 검색 ( 이름#KR1 )</span>
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
								<span className="tip">Riot ID 검색 ( 이름#태그 )</span>
							</div>
							<div>
								<span className="translate">{translatedName}</span>
							</div>
						</div>
					)}
				</StyledToolTip>
			)}
		</StyledContainer>
	)
}

const StyledContainer = styled.div`
	width: 100%;
	position: relative;
`
const StyledSearchInput = styled.input`
	width: 100%;
	border: 0px;
	outline: none;
	font-size: 14px;
`

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
