'use client'
import { IElectronicCreateForm } from '@/types/electronic.type'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './adminPopup.module.scss'
import cn from 'clsx'
import { useCreateElectronicMutation } from '@/lib/api/electronic.api'
import { createFile } from '@/server api/createFile'
import { getCreateElectronicData } from './getCreateElectronicData'
import Loader from '@/components/ui/Loader/Loader'
import { message } from 'antd'

const AdminElectronicPopup: FC = () => {
	const [fileLoading, setFileLoading] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset
	} = useForm<IElectronicCreateForm>()
	const [createElectronic, { isLoading }] = useCreateElectronicMutation()
	const onSubmit: SubmitHandler<IElectronicCreateForm> = async state => {
		setFileLoading(!fileLoading)
		const bodyFormData = new FormData()
		bodyFormData.append('image', state.file[0])
		const data = await createFile(bodyFormData, 'electronic')
		setFileLoading(false)
		createElectronic(getCreateElectronicData(state, data)).then(() => {
			reset({ name: '', price: 0, shelfLife: '' })
			message.success('Electronic successfully added')
		})
	}
	return (
		<>
			{isLoading && <Loader />}
			{fileLoading && <Loader />}
			<form onSubmit={handleSubmit(onSubmit)} className={styles.invitationAdd}>
				<div className={styles.input__wrapper}>
					<label title='Имя электронной пригласительной' htmlFor='name'>
						Electronic name
					</label>
					<input
						{...register('name', {
							required: 'Enter electronic name'
						})}
						id='name'
						placeholder='Electronic name'
						type='text'
						className={styles.input}
					/>
					<span>{errors.name?.message}</span>
				</div>
				<div className={styles.input__wrapper}>
					<label title='Цена электроника' htmlFor='price'>
						Electronic price
					</label>
					<input
						{...register('price', {
							required: 'Enter electronic price'
						})}
						id='price'
						placeholder='Electronic price'
						type='number'
						className={styles.input}
					/>
					<span>{errors.price?.message}</span>
				</div>
				<div className={styles.input__wrapper}>
					<label title='До кокого числа срок жизни электроника' htmlFor='shelfLife'>
						Shelf life
					</label>
					<input
						{...register('shelfLife', {
							required: 'Enter storage period'
						})}
						id='shelfLife'
						placeholder='Electronic storage period'
						type='date'
						className={cn(styles.input, styles.min)}
					/>
					<span>{errors.shelfLife?.message}</span>
				</div>
				<div className={styles.input__wrapper}>
					<label htmlFor='file'>Select video</label>
					<input
						{...register('file', {
							required: 'Select video'
						})}
						id='file'
						type='file'
						multiple={false}
						className={cn(styles.input)}
						accept='.mp4, .mov, .wmv, .avi, .mkv,'
					/>
					<span>{errors.file?.message}</span>
				</div>
				<button className={styles.create__button} type='submit'>
					Create
				</button>
			</form>
		</>
	)
}

export default AdminElectronicPopup
