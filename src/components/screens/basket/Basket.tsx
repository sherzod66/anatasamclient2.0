'use client'
import { useAuth } from '@/hooks/useAuth'
import { FC, useEffect } from 'react'
import BasketAuth from './basket auth/BasketAuth'
import BasketCard from './basket card/BasketCard'
import EmptyBasket from './basket empty/EmptyBasket'
import { useGetBasketQuery } from '@/lib/api/basket.api'
import { useActions } from '@/hooks/useActions'
import { getAllLocal } from '@/config/localStorage.helper'

const Basket: FC = () => {
	const { auth, token } = useAuth()
	const { data } = useGetBasketQuery(token)
	const { countBasket } = useActions()
	useEffect(() => {
		if (auth) {
			let checkLocal = getAllLocal()
			countBasket(checkLocal ? checkLocal : [])
		}
	}, [auth])
	return <>{auth ? data?.length ? <BasketCard card={data} /> : <EmptyBasket /> : <BasketAuth />}</>
}

export default Basket
