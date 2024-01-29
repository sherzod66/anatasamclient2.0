import { useCreateCardMutation } from '@/lib/api/card.api'
import { createFile } from '@/server api/createFile'
import { ICardCreate, IFormValue } from '@/types/card.type'
import { TUi } from '@/types/ui.type'
import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
export const useInvitationPopup = () => {
	const [notification, setNotification] = useState<TUi>({
		alertShow: false,
		event: '',
		loading: false,
		text: ''
	})
	const [selectType, setSelectType] = useState<{ select: string; barcode: string }>({
		select: '',
		barcode: ''
	})
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset
	} = useForm<IFormValue>()
	const [createCard] = useCreateCardMutation()
	const onSubmit: SubmitHandler<IFormValue> = async state => {
		if (selectType.barcode && selectType.select !== '') {
			setNotification(prev => ({ ...prev, loading: true }))
			const imageUrl: string[] = []
			try {
				for (let item of state.imageLink) {
					const bodyFormData = new FormData()
					bodyFormData.append('image', item)
					const data = await createFile(bodyFormData, 'cards')
					imageUrl.push(data)
				}
			} catch (e) {
				setNotification(prev => ({
					...prev,
					event: 'error',
					alertShow: true,
					loading: false,
					text: 'Error! Something went wrong. Check your internet connection'
				}))
			}

			if (imageUrl.length > 0) {
				const dataPreparation: ICardCreate = {
					name: state.name,
					description: state.description,
					quantity: +state.quantity,
					castPrice: +state.castPrice,
					minOrderQuantity: +state.minOrderQuantity,
					price: +state.price,
					barcode: selectType.barcode,
					type: selectType.select,
					imageLink: [...imageUrl]
				}
				createCard(dataPreparation)
					.then(() => {
						reset({
							castPrice: 0,
							description: '',
							minOrderQuantity: 0,
							name: '',
							price: 0,
							quantity: 0
						})
						setNotification(prev => ({
							...prev,
							loading: false,
							alertShow: true,
							text: 'Successfully added',
							event: 'success'
						}))
					})
					.catch(e =>
						setNotification(prev => ({
							...prev,
							event: 'error',
							alertShow: true,
							text: 'Error! Something went wrong. Check your internet connection'
						}))
					)
			}
		}
	}
	return useMemo(
		() => ({
			register,
			handleSubmit,
			watch,
			errors,
			reset,
			onSubmit,
			notification,
			setNotification,
			setSelectType,
			selectType
		}),
		[errors, notification, selectType]
	)
}
