import styled from 'styled-components'
import { ContentsType } from '@/@types/types'

interface ContentsSelectTabProps {
	selectedContents: string
	setSelectedContents: any
}

export default function ContentsSelectTab(props: ContentsSelectTabProps) {
	const { selectedContents, setSelectedContents } = props
	function handleSelectChange(type: ContentsType) {
		setSelectedContents(type)
	}

	return (
		<>
			<InfoListTab>
				<InfoList>
					<li>
						<InfoListItem
							contents="MatchHistorys"
							onClick={() => handleSelectChange('MatchHistorys')}
						>
							종합
						</InfoListItem>
					</li>
					<li>
						<InfoListItem
							contents="InGame"
							onClick={() => handleSelectChange('InGame')}
						>
							인게임 정보
						</InfoListItem>
					</li>
				</InfoList>
			</InfoListTab>
		</>
	)
}

// 헤더 아래 탭
const InfoListTab = styled.div`
	width: 100%;
	height: 45px;
	border-top: 1px solid;
	border-color: #ebeef1;
	padding: 4px 0;
	display: flex;
	align-items: center;
	background-color: white;
	.selected {
		background-color: ${(props: any) => (props.selected ? '#ecf2ff' : 'none')};
		font-weight: ${(props: any) => (props.selected ? 700 : '')};
		color: ${(props: any) => (props.selected ? '#4171d6' : '')};
	}
`
const InfoList = styled.ul`
	display: flex;
	width: 1080px;
	margin: 0 auto;
`
const InfoListItem = styled.span<{ contents: string }>`
	text-align: center;
	display: block;
	min-width: 60px;
	line-height: 36px;
	padding: 0 16px;
	margin-right: 4px;
	font-size: 14px;
	border-radius: 4px;
	cursor: pointer;
	background-color: ${(props: any) => (props.selected ? '#ecf2ff' : 'none')};
	font-weight: ${(props: any) => (props.selected ? 700 : '')};
	color: ${(props: any) => (props.selected ? '#4171d6' : '')};
`
