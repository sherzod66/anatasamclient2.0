import { ICard } from '@/types/card.type'
import { IInvitationInfo } from '@/types/invitationInfo.type'
import { RadioChangeEvent } from 'antd'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export interface IInvitationInfoEdit
	extends Omit<IInvitationInfo, 'cardId' | 'cardImage' | 'cardPrice' | 'quantity'> {}

export const changeEvent = (
	index: number,
	event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
	data: IInvitationInfo[],
	name: keyof IInvitationInfoEdit,
	setData: Dispatch<SetStateAction<IInvitationInfo[]>>
) => {
	const editCard = [...data]
	editCard.splice(index, 1, { ...data[index], [name]: event.target.value })
	setData(editCard)
}

export interface IInvitationOrderEdit
	extends Omit<IInvitationInfo, 'cardId' | 'cardImage' | 'cardPrice'> {}
export const changeEventOrder = (
	index: number,
	event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | RadioChangeEvent,
	data: IInvitationInfo[],
	name: keyof IInvitationOrderEdit,
	setData: Dispatch<SetStateAction<IInvitationInfo[]>>
) => {
	const editCard = [...data]
	editCard.splice(index, 1, { ...data[index], [name]: event.target.value })
	setData(editCard)
}

export const changeEventOrderQuantity = (
	index: number,
	value: string,
	data: IInvitationInfo[],
	setData: Dispatch<SetStateAction<IInvitationInfo[]>>
) => {
	const editCard = [...data]
	editCard.splice(index, 1, { ...data[index], quantity: +value })
	setData(editCard)
}
