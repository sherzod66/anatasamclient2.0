import { ICard, ICardEdit } from '@/types/card.type'
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
