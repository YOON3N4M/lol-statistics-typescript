import styled from 'styled-components'
import { RefinedParticipant } from './InGame'

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
					<div>
						<span>S2023</span>
						<span>랭크 승률</span>
						<span>S2023</span>
						<span>룬</span>
					</div>
					<div>
						<span>밴</span>
					</div>
				</StyledTeamHeader>
				{}
			</StyledTeamContainer>
		</>
	)
}

const StyledTeamContainer = styled.div`
	width: 100%;
`

const StyledTeamHeader = styled.div<{ $isBlue: boolean }>`
	display: flex;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	padding: 9px 12px;
	border-bottom: 1px solid #ebeef1;
	span {
		font-size: 12px;
		color: gray;
	}
	.bold {
		font-weight: bold;
	}
	.team > span {
		color: ${(props) => (props.$isBlue ? '#4171D6' : '#D31A45')};
	}
`

const ParticipantContainer = styled.div`
	width: 100%;
	height: 40px;
	border-left: 2px solid #4171d6;
`
