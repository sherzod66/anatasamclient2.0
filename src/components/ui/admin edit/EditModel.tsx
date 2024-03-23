'use client'
import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import styles from './editModel.module.scss'
import { ICard } from '@/types/card.type'
import { useUpdateCardMutation } from '@/lib/api/card.api'
import { Select } from 'antd'
import { optionsInvitation } from '@/components/screens/admin/admin popup/selectOption'
import { editCardObject } from './editCardObject'
import Loader from '../Loader/Loader'

type TModelEdit = {
	setEdit: Dispatch<
		SetStateAction<{
			isShow: boolean
			data: ICard
		}>
	>
	data: ICard
}
const ModelEdit: FC<TModelEdit> = ({ setEdit, data }) => {
	const [card, setCard] = useState<ICard>(data)
	const handleChange = (value: string[]) => {
		setCard(prev => ({ ...prev, type: value.join(' ') }))
	}
	const [updateCard, { isLoading }] = useUpdateCardMutation()
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		updateCard({ id: card.id, body: editCardObject(card) })
	}
	return (
		<div
			onClick={e =>
				!(e.target as HTMLElement).closest('#model-content') &&
				!(e.target as HTMLElement).closest('.ant-select-dropdown') &&
				setEdit(prev => ({ ...prev, isShow: false }))
			}
			className={styles.model}
		>
			<div id='model-content' className={styles.model__content}>
				{isLoading && <Loader />}
				<form onSubmit={onSubmit} className={styles.editForm}>
					<label htmlFor='name'>Card name</label>
					<input
						className={styles.input__big}
						onChange={e => setCard(prev => ({ ...prev, name: e.target.value }))}
						id='name'
						value={card.name}
						type='text'
					/>
					<label htmlFor='description'>Card description</label>
					<textarea
						className={styles.textarea__big}
						id='description'
						onChange={e => setCard(prev => ({ ...prev, description: e.target.value }))}
						value={card.description}
					/>
					<label htmlFor='name'>Barcode</label>
					<input
						className={styles.input__big}
						onChange={e => setCard(prev => ({ ...prev, barcode: e.target.value }))}
						id='name'
						value={card.barcode}
						type='text'
					/>
					<div className={styles.edit__row}>
						<p>
							<label htmlFor='quantity'>Quantity</label>
							<input
								onChange={e => setCard(prev => ({ ...prev, quantity: +e.target.value }))}
								id='quantity'
								value={card.quantity}
								type='number'
							/>
						</p>
						<p>
							<label htmlFor='min-order'>Minimum order</label>
							<input
								onChange={e =>
									setCard(prev => ({
										...prev,
										minOrderQuantity: +e.target.value
									}))
								}
								id='min-order'
								value={card.minOrderQuantity}
								type='number'
							/>
						</p>
						<p>
							<label htmlFor='buy-price'>Buy price</label>
							<input
								onChange={e => setCard(prev => ({ ...prev, castPrice: +e.target.value }))}
								id='buy-price'
								value={card.castPrice}
								type='number'
							/>
						</p>
						<p>
							<label htmlFor='sale-price'>Sale price</label>
							<input
								onChange={e => setCard(prev => ({ ...prev, price: +e.target.value }))}
								id='sale-price'
								value={card.price}
								type='number'
							/>
						</p>
					</div>
					<Select
						mode='tags'
						style={{ width: '100%', marginTop: '15px' }}
						placeholder='Select type'
						onChange={handleChange}
						defaultValue={card.type.split(' ')}
						options={optionsInvitation}
					/>
					<button className={styles.edit__button}>Edit</button>
				</form>
			</div>
		</div>
	)
}

export default ModelEdit
