'use client'
import NotFound from '@/app/[locale]/not-found'
import { useAuth } from '@/hooks/useAuth'
import { IOrderNow } from '@/types/card.type'
import { FC } from 'react'
import OrderNow from './order now/OrderNow'
import OrderBasket from './order basket/OrderBasket'

const OrderCard: FC<{ params: string }> = ({ params }) => {
	const { auth } = useAuth()
	return (
		<>
			{auth ? (
				<>
					{params.includes('now') && <OrderNow />}
					{params.includes('basket') && <OrderBasket />}
				</>
			) : (
				<NotFound />
			)}
		</>
	)
}

export default OrderCard
