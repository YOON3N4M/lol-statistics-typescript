import styled from 'styled-components'
import { variable } from '@/styles/Globalstyles'

export default function LoadingSpinner() {
	return (
		<StyledContainer>
			<div className="spinner"></div>
		</StyledContainer>
	)
}

const StyledContainer = styled.div`
	padding-top: 30px;
	.spinner {
		margin: 0 auto;
		width: 50px;
		height: 50px;
		box-sizing: border-box;
		border: 3px solid white;
		border-top-color: ${variable.color.selectFontBlue};
		border-radius: 100%;

		animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
`
