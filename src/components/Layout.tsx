import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GlobalStyles } from '../styles/Globalstyles'

export default function Layout({ children }: React.PropsWithChildren) {
	//로그인 여부 체크 로직

	return (
		<>
			<GlobalStyles />
			<>{children}</>
		</>
	)
}
