'use client'
import { FC } from 'react'
import { useInvitationPopup } from './useInvitationPopup'
import styles from './adminPopup.module.scss'
import Field from '@/components/ui/fieled/Field'
import Loader from '@/components/ui/Loader/Loader'
import Alert from '@/components/ui/alerts/Alert'
import { Select } from 'antd'
import { optionsInvitation } from './selectOption'

const AdminInvitationPopup: FC = () => {
	const {
		errors,
		handleSubmit,
		register,
		watch,
		reset,
		onSubmit,
		notification,
		setNotification,
		setSelectType,
		selectType
	} = useInvitationPopup()
	const handleChange = (value: string[]) => {
		setSelectType(prev => ({ ...prev, select: value.join(' ') }))
	}
	return (
		<>
			{notification.loading && <Loader />}
			{notification.alertShow && (
				<Alert setState={setNotification} text={notification.text} type={notification.event} />
			)}
			<form onSubmit={handleSubmit(onSubmit)} className={styles.invitationAdd}>
				<Field
					errors={errors}
					name='name'
					options='You forgot to name the invitation'
					placeholder='Invitation name'
					register={register}
					rest={reset}
					type='text'
					title='Имя товара'
				/>
				<div className={styles.invitationAdd__textarea}>
					<label title='Описание' htmlFor='description'>
						Description
					</label>
					<textarea
						{...register('description', {
							required: 'Брат описание кто будет писать?'
						})}
						name='description'
						id='description'
					/>
				</div>

				<Field
					errors={errors}
					name='quantity'
					options='Specify quantity'
					placeholder='Total quantity cards'
					register={register}
					rest={reset}
					type='number'
					title='Количество товара'
				/>
				<div className={styles.input__wrapper}>
					<label title='Штрих код' htmlFor='barcode'>
						Barcode
					</label>
					<input
						id='barcode'
						placeholder='Enter barcode'
						type='text'
						value={selectType.barcode}
						onChange={e => setSelectType(prev => ({ ...prev, barcode: e.target.value }))}
						className={styles.input}
					/>
					<span>{errors.name?.message}</span>
				</div>
				<Field
					errors={errors}
					name='minOrderQuantity'
					title='Минимальное количество заказа'
					options='Who indicate the minimum order quantity'
					placeholder='Minimum quantity order'
					register={register}
					rest={reset}
					type='number'
				/>
				<Field
					errors={errors}
					name='castPrice'
					options='Enter price'
					placeholder='Buy order'
					register={register}
					rest={reset}
					type='number'
					title='Себестоимость товара'
				/>
				<Field
					errors={errors}
					name='price'
					options='Enter price'
					placeholder='Sell order'
					register={register}
					rest={reset}
					type='number'
					title='Цена'
				/>
				<div className={styles.invitationAdd__image}>
					<label htmlFor='file'>Select image</label>
					<input
						{...register('imageLink', {
							required: 'select image'
						})}
						id='file'
						type='file'
						accept='.jpg, .png, .gif, .HEIC, .jpeg, .webp'
						multiple={true}
					/>
				</div>
				<Select
					mode='tags'
					style={{ width: '100%', marginTop: '15px' }}
					placeholder='Select type'
					onChange={handleChange}
					options={optionsInvitation}
				/>
				<button className={styles.create__button} type='submit'>
					Create
				</button>
			</form>
		</>
	)
}

export default AdminInvitationPopup
