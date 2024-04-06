import { ICard, ICardEdit } from '@/types/card.type'
import { IInvitationInfo } from '@/types/invitationInfo.type'
import { IEditOrderRequest, IOrder } from '@/types/order.type'
import { IUpdateUser, IUser } from '@/types/user.type'

export const editCardObject = (obj: ICard): ICardEdit => {
	const card: ICardEdit = {
		name: obj.name,
		description: obj.description,
		castPrice: obj.castPrice,
		minOrderQuantity: obj.minOrderQuantity,
		price: obj.price,
		quantity: obj.quantity,
		type: obj.type,
		barcode: obj.barcode
	}
	return card
}

export const editUserUpdateObject = (obj: IUser): IUpdateUser => {
	const card: IUpdateUser = {
		name: obj.name,
		isAdmin: obj.isAdmin,
		phoneNumber: obj.phoneNumber,
		role: obj.role
	}
	return card
}

export const extractCardId = (info: IInvitationInfo[]): number[] => {
	const cardIdResult = info.map(elem => elem.cardId)
	return cardIdResult
}

export const findCardIndex = (cards: ICard[], cardId: number): number => {
	const cardIndex = cards.findIndex(elem => elem.id === cardId)
	return cardIndex
}

export const editOrderPayload = (
	order: IOrder,
	invitationInfo: IInvitationInfo[],
	differenceInfo: IInvitationInfo[]
): IEditOrderRequest => {
	const payload: IEditOrderRequest = {
		orderPrice: order.orderPrice,
		id: order.id,
		invitationInfo,
		cardDifference: getDifferenceInfo(invitationInfo, differenceInfo)
	}
	return payload
}

type TDifferenceInfo = {
	cardId: number
	increment: boolean
	difference: number
}
const getDifferenceInfo = (
	invitationInfo: IInvitationInfo[],
	differenceInfo: IInvitationInfo[]
): TDifferenceInfo[] => {
	const getDifference: TDifferenceInfo[] = invitationInfo.map<TDifferenceInfo>((item, index) => {
		if (item.quantity > differenceInfo[index].quantity) {
			return {
				cardId: item.cardId,
				increment: false,
				difference: item.quantity - differenceInfo[index].quantity
			}
		} else {
			return {
				cardId: item.cardId,
				increment: true,
				difference: differenceInfo[index].quantity - item.quantity
			}
		}
	})
	return getDifference
}
