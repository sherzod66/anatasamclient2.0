'use client'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styles from '@/components/ui/count/count.module.scss'
import { FiMinus, FiPlus } from 'react-icons/fi'
import cn from 'clsx'
import { ICard } from '@/types/card.type'
import { minusCount, plusCount } from '../../card/countFunction'
import { IInvitationInfo } from '@/types/invitationInfo.type'
import {
	changeEventOrder,
	changeEventOrderQuantity
} from '../../order card/order basket/changeEvent'
import { IOrder } from '@/types/order.type'

type TCardProps = {
	card: ICard
	setInvitation: Dispatch<SetStateAction<IInvitationInfo[]>>
	invitationInfo: IInvitationInfo
	allInvitationInfo: IInvitationInfo[]
	index: number
}
const OrderQuantityCount: FC<TCardProps> = ({
	card,
	invitationInfo,
	setInvitation,
	index,
	allInvitationInfo
}) => {
	const [count, setCount] = useState<string>(String(invitationInfo.quantity))
	const [focus, setFocus] = useState<boolean>(true)
	useEffect(() => onBlur(), [])
	const onBlur = () => {
		setFocus(!focus)
		if (card.minOrderQuantity > +count) setCount(String(card.minOrderQuantity))
		if (card.quantity < +count) setCount(String(card.quantity))
	}
	useEffect(() => changeEventOrderQuantity(index, count, allInvitationInfo, setInvitation), [count])
	return (
		<div
			style={{ marginTop: '10px' }}
			className={cn(
				styles.card__quantity_input,
				{ [styles.active]: focus },
				{
					[styles.error]: +count < card.minOrderQuantity || +count > card.quantity
				}
			)}
		>
			<button onClick={() => minusCount(count, setCount, card.minOrderQuantity)} type='button'>
				<FiMinus />
			</button>{' '}
			<input
				onChange={e => setCount(e.target.value)}
				value={count}
				type='number'
				min={card.minOrderQuantity}
				max={card.quantity}
				inputMode='numeric'
				onFocus={() => setFocus(!focus)}
				onBlur={onBlur}
			/>{' '}
			<button onClick={() => plusCount(count, setCount, card.quantity)} type='button'>
				<FiPlus />
			</button>
		</div>
	)
}

export default OrderQuantityCount
