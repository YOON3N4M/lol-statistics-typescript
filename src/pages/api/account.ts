import { RiotId } from '@/@types/types'
import { api } from '@/utils/api'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		const riotId: any = req.query
		try {
			const accountResult = await api.getAccountByRiotId(riotId)

			res.status(200).json(accountResult)
			console.log(accountResult)
		} catch (err) {
			res.status(500).json({ message: '500, 등록 실패' })
		}
	} else {
		res.status(405).json({ message: '405, 메소드가 없어' })
	}
}
