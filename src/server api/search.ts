import { ICard } from '@/types/card.type'
import { IOrder } from '@/types/order.type'

export async function SearchCard(params: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL_RESPONSE}/cards/search?name=${params}`,
		{
			method: 'POST',
			next: { revalidate: 60 }
		}
	)
	const data = (await response.json()) as ICard[] | []
	return data
}

export async function SearchOrder(params: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL_RESPONSE}/orders/search?name=${params}`,
		{
			method: 'POST',
			next: { revalidate: 60 }
		}
	)
	const data = (await response.json()) as IOrder[] | []
	return data
}
