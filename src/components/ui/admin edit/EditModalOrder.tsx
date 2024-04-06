'use Client'
import { TEditOrder } from '@/components/screens/admin/admin dashboard/order detaile/AdminOrder'
import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react'
import styles from './EditOrder.module.scss'
import { ICard } from '@/types/card.type'
import { GetCardManyById } from '@/server api/GetCardManyById'
import { editOrderPayload, extractCardId, findCardIndex } from './editCardObject'
import cn from 'clsx'
import { IInvitationInfo } from '@/types/invitationInfo.type'
import { imageLik } from '@/util/imageLinkHalper'
import { Input, Radio, Row, message } from 'antd'
import { changeEventOrder } from '@/components/screens/order card/order basket/changeEvent'
import OrderQuantityCount from '@/components/screens/basket/basket card/OrderQuantityCount'
import TextArea from 'antd/es/input/TextArea'
import { formatPrice } from '@/util/formatPrice'
import { IOrder } from '@/types/order.type'
import { countOrderPrice } from '@/util/conuntOrderPrice'
import { useEditOrderMutation } from '@/lib/api/orders.api'
import Loader from '../Loader/Loader'

type TEditModalOrderProps = {
	EditOrder: TEditOrder
	setEditOrder: Dispatch<SetStateAction<TEditOrder>>
}
const EditModalOrder: FC<TEditModalOrderProps> = ({ EditOrder, setEditOrder }) => {
	const [order, setOrder] = useState<IOrder>({ ...EditOrder.order })
	const [differenceInfo, setDifferenceInfo] = useState<IInvitationInfo[]>([])
	const [invitationInfo, setInvitation] = useState<IInvitationInfo[]>([])
	const [cardInfo, setCardInfo] = useState<(ICard | null)[]>([])
	const [editOrderRequest, { isLoading }] = useEditOrderMutation()

	useEffect(() => {
		GetCardManyById(extractCardId(EditOrder.invitationInfo), setCardInfo)
		setInvitation(EditOrder.invitationInfo)
		setDifferenceInfo(EditOrder.invitationInfo)
		setOrder({ ...EditOrder.order })
	}, [EditOrder])
	useEffect(
		() => setOrder(prev => ({ ...prev, orderPrice: countOrderPrice(invitationInfo) })),
		[invitationInfo]
	)
	const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		editOrderRequest(editOrderPayload(order, invitationInfo, differenceInfo))
			.then(() => {
				message.success('Success changed')
				setEditOrder(prev => ({ ...prev, isShow: false }))
			})
			.catch(() => message.error('Error'))
	}
	return (
		<div
			onClick={e =>
				!(e.target as HTMLElement).closest('#model-content') &&
				setEditOrder(prev => ({ ...prev, isShow: false }))
			}
			className={styles.model}
		>
			{isLoading && <Loader />}
			<div id='model-content' className={cn(styles.model__content, styles.big)}>
				<form onSubmit={handelSubmit} className={styles.editForm}>
					<div className={styles.card__row}>
						{invitationInfo.length > 0
							? invitationInfo.map((elem, index) => (
									<div key={elem.cardId} className={styles.card__column}>
										<div className={styles.card__item}>
											<div className={styles.card_image}>
												<img src={imageLik(elem.cardImage[0])} alt={elem.cardName} />
											</div>
											<Radio.Group
												onChange={e =>
													changeEventOrder(index, e, invitationInfo, 'lang', setInvitation)
												}
												style={{ display: 'flex', marginTop: '10px' }}
												value={elem.lang}
											>
												<Radio value={'RU'}>RU</Radio>
												<Radio value={'UZ'}>UZ</Radio>
												<Radio value={'EN'}>EN</Radio>
											</Radio.Group>
											<div className={styles.card__quantity_info}>
												{cardInfo.findIndex(item => item?.id === elem.cardId) >= 0 && (
													<OrderQuantityCount
														invitationInfo={elem}
														setInvitation={setInvitation}
														index={index}
														allInvitationInfo={invitationInfo}
														card={
															cardInfo[
																cardInfo.findIndex(item => item?.id === elem.cardId)
															] as ICard
														}
													/>
												)}

												{cardInfo.findIndex(item => item?.id === elem.cardId) >= 0 && (
													<p>
														In stock:{' '}
														{
															cardInfo[cardInfo.findIndex(item => item?.id === elem.cardId)]
																?.quantity
														}
													</p>
												)}
											</div>
											<div className={styles.card__info_item}>
												<label title='Жених и невеста' htmlFor={`bride${elem.cardId}`}>
													Bride and groom
												</label>
												<Input
													onChange={e =>
														changeEventOrder(index, e, invitationInfo, 'luckyOnes', setInvitation)
													}
													value={elem.luckyOnes}
													id={`bride${elem.cardId}`}
													type='text'
												/>
											</div>
											<div className={styles.card__info_item}>
												<label title='Ресторан' htmlFor={`restaurant${elem.cardId}`}>
													Restaurant
												</label>
												<Input
													onChange={e =>
														changeEventOrder(index, e, invitationInfo, 'restaurant', setInvitation)
													}
													value={elem.restaurant}
													id={`restaurant${elem.cardId}`}
													type='text'
												/>
											</div>
											<div className={styles.card__info_item}>
												<label title='С уважением семьи' htmlFor={`family${elem.cardId}`}>
													Family
												</label>
												<Input
													onChange={e =>
														changeEventOrder(index, e, invitationInfo, 'family', setInvitation)
													}
													value={elem.family}
													id={`family${elem.cardId}`}
													type='text'
												/>
											</div>
											<Row justify={'space-between'}>
												<div className={styles.card__info_item}>
													<label title='Дата' htmlFor={`day${elem.cardId}`}>
														Date
													</label>
													<Input
														onChange={e =>
															changeEventOrder(index, e, invitationInfo, 'date', setInvitation)
														}
														value={elem.date}
														id={`day${elem.cardId}`}
														type='date'
													/>
												</div>
												<div className={styles.card__info_item}>
													<label title='Время' htmlFor={`time${elem.cardId}`}>
														Time
													</label>
													<Input
														onChange={e =>
															changeEventOrder(index, e, invitationInfo, 'time', setInvitation)
														}
														value={elem.time}
														id={`time${elem.cardId}`}
														type='time'
													/>
												</div>
											</Row>
											<div className={styles.card__info_item}>
												<label title='Коментарий' htmlFor={`comment${elem.cardId}`}>
													Comment
												</label>
												<TextArea
													onChange={e =>
														changeEventOrder(index, e, invitationInfo, 'comment', setInvitation)
													}
													value={elem.comment}
													id={`comment${elem.cardId}`}
												/>
											</div>
											<div className={styles.card__price}>
												Price: {formatPrice(elem.cardPrice)} Sum
											</div>
										</div>
									</div>
							  ))
							: 0}
					</div>
					<Row justify={'center'}>
						<button className={styles.order__edit_button} type='submit'>
							Edit
						</button>
					</Row>
				</form>
			</div>
		</div>
	)
}

export default EditModalOrder
