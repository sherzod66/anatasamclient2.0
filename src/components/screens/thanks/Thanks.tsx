'use client'
import Loader from '@/components/ui/Loader/Loader'
import { removeLocalBasket } from '@/config/localStorage.helper'
import { useActions } from '@/hooks/useActions'
import { usePaymentVerificationQuery } from '@/lib/api/orders.api'
import { Button, Result } from 'antd'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect } from 'react'

const Thanks: FC = () => {
	const search = useSearchParams()
	const paymentId = search.get('payment_id')
	const paymentStatus = search.get('payment_status')
	const { data, isLoading } = usePaymentVerificationQuery({
		paymentId: paymentId ? paymentId : '0'
	})
	const { countBasket } = useActions()
	useEffect(() => {
		if (data) {
			if (data?.paymentStatus >= 0) {
				removeLocalBasket()
				countBasket([])
			}
		}
	}, [data])
	return (
		<>
			{isLoading && <Loader />}
			{data && paymentId ? (
				<Result
					style={{ marginTop: '90px' }}
					status={data.status}
					title={data.paymentStatus >= 0 ? 'Спасобо за покупку :)' : 'Ошибка!'}
					subTitle={
						data.paymentStatus >= 0
							? `Оплата успешно прошла. Номер заказа: ${paymentId}`
							: paymentStatus === '-5017'
							? 'Оплата не прошла не достаточно средств на карте'
							: `Оплата не прошла или оплата была отменена. Номер заказа: ${paymentId}`
					}
					extra={
						data.paymentStatus >= 0
							? [
									<Button type='primary' key='console'>
										<Link href={'/profile'}>Перейти в профиль</Link>
									</Button>,
									<Link href={'/search'}>Продолжить покупки</Link>
							  ]
							: [
									<Button type='primary' key='error'>
										<a href='tel:+998915229627'>Связаться с нами</a>
									</Button>,
									<Link href={'/search'}>Продолжить покупки</Link>
							  ]
					}
				/>
			) : (
				''
			)}
		</>
	)
}

export default Thanks
