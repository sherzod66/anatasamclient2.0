import { getToken } from '@/lib/api/api helper/apiCookies.helper'
import { ICard } from '@/types/card.type'
import { Dispatch, SetStateAction } from 'react'

export const GetCardManyById = async (
	id: number[],
	setCardInfo: Dispatch<SetStateAction<(ICard | null)[]>>
) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_RESPONSE}/cards/get-many-by-id`, {
		body: JSON.stringify({ id }),
		headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
		method: 'PUT'
	})

	const data = (await response.json()) as (ICard | null)[]
	if (response.ok) {
		setCardInfo(data)
	} else setCardInfo([])
}
