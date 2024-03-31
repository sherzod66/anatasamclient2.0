import { IOrderNow } from '@/types/card.type'
import { IInvitationInfo } from '@/types/invitationInfo.type'

export const defaultInfo = (data: IOrderNow): IInvitationInfo => ({
	comment: '',
	date: '',
	family: '',
	lang: 'RU',
	luckyOnes: '',
	quantity: data.orderQuantity,
	restaurant: '',
	time: '',
	cardId: data.cardId,
	cardImage: data.imageLink,
	cardPrice: data.price,
	cardName: data.name
})
