import {
	handelMultiMutationData,
	handelMutationData
} from '@/components/screens/order card/order now/handelMutationData'
import { ICard, IOrderNow } from '@/types/card.type'
import { IInvitationInfo, IOrderInfo } from '@/types/invitationInfo.type'
import { ILocalBasket } from '@/types/localStorage.type'
export const getLocalQuantity = (id: number): ILocalBasket | undefined => {
	const localParse = localStorage.getItem('basketCard')
	const cardParse = localParse ? (JSON.parse(localParse) as ILocalBasket[]) : null

	const cardResult = cardParse?.find(item => item.cardId === id)
	return cardResult
}

export const pushLocalStorage = (id: number, orderQuantity: number, cardPrice: number) => {
	const localParse = localStorage.getItem('basketCard')
	if (localParse) {
		const basket = JSON.parse(localParse) as ILocalBasket[]
		const searchBasket = basket.findIndex(item => item.cardId === id)
		if (searchBasket >= 0) {
			basket.splice(searchBasket, 1)
			localStorage.setItem('basketCard', JSON.stringify(basket))
		} else {
			const writeLocal: ILocalBasket[] = [...basket, { cardId: id, orderQuantity, cardPrice }]
			localStorage.setItem('basketCard', JSON.stringify(writeLocal))
		}
	} else localStorage.setItem('basketCard', JSON.stringify([{ cardId: id, orderQuantity }]))
}

export const getAllLocal = (): ILocalBasket[] | null => {
	const localParse = localStorage.getItem('basketCard')
	const cardParse = localParse ? (JSON.parse(localParse) as ILocalBasket[]) : null

	return cardParse
}
export const removeLocalBasket = (): void => {
	window.localStorage.removeItem('basketCard')
}

export const editLocalBasket = (id: number, orderQuantity: number, cardPrice: number) => {
	const localParse = localStorage.getItem('basketCard')
	const cardParse = localParse ? (JSON.parse(localParse) as ILocalBasket[]) : null
	if (cardParse) {
		const cardResult = cardParse.findIndex(item => item.cardId === id)
		if (cardResult >= 0) {
			cardParse.splice(cardResult, 1)
			const writeLocal: ILocalBasket[] = [...cardParse, { cardId: id, orderQuantity, cardPrice }]
			localStorage.setItem('basketCard', JSON.stringify(writeLocal))
		}
	}
}

export const setOrderNowLocal = (card: ICard, orderQuantity: number) => {
	const changeCard: { id?: number } = { ...card }
	delete changeCard.id
	window.localStorage.setItem(
		'orderNow',
		JSON.stringify({ ...changeCard, orderQuantity, cardId: card.id })
	)
}
export const getOrderNowLocal = (): IOrderNow =>
	JSON.parse(localStorage.getItem('orderNow') as string) as IOrderNow

export const checkWrite = (info: IInvitationInfo, paymentInfo: IOrderInfo) => {
	const dataPreparation = handelMutationData(info, paymentInfo)
	window.localStorage.setItem('checkOrder', JSON.stringify(dataPreparation))
	window.open(`${process.env.NEXT_PUBLIC_CLIENT_API}/check/`, '_blank', '')
}
export const checkWriteMulti = (info: IInvitationInfo[], paymentInfo: IOrderInfo) => {
	const dataPreparation = handelMultiMutationData(info, paymentInfo)
	window.localStorage.setItem('checkOrder', JSON.stringify(dataPreparation))
	window.open(`${process.env.NEXT_PUBLIC_CLIENT_API}/check/`, '_blank', '')
}
export const checkRead = (): IOrderInfo | null => {
	const isData = localStorage.getItem('checkOrder')
	if (isData) {
		const dataParse: IOrderInfo = JSON.parse(isData) as IOrderInfo
		return dataParse
	} else return null
}
