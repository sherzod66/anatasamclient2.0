import { ICard } from '@/types/card.type'
import { IInvitationInfo } from '@/types/invitationInfo.type'
import { ILocalBasket } from '@/types/localStorage.type'

type TRefactorQueryData = (data: ICard[], basket: ILocalBasket[]) => IInvitationInfo[]
export const refactorQueryData: TRefactorQueryData = (data, basket) => {
	const refactoring: IInvitationInfo[] = data.map(element => ({
		cardId: element.id,
		cardImage: element.imageLink,
		cardPrice: element.price,
		cardName: element.name,
		quantity: getOrderQuantity(basket, element.id),
		comment: '',
		date: '',
		family: '',
		lang: 'RU',
		luckyOnes: '',
		restaurant: '',
		time: ''
	}))
	return refactoring
}

function getOrderQuantity(basket: ILocalBasket[], cardId: number): number {
	const data = basket.find(order => cardId === order.cardId)
	return data ? data.orderQuantity : 0
}

export function orderBasketValidation(data: IInvitationInfo[]): boolean {
	let booleanData: boolean[] = []
	data.forEach(elem => {
		booleanData.push(elem.luckyOnes !== '')
		booleanData.push(elem.date !== '')
		booleanData.push(elem.time !== '')
		booleanData.push(elem.family !== '')
	})
	let booleanDataResult: boolean = true
	booleanData.forEach(elem => {
		if (elem) {
		} else {
			booleanDataResult = false
			return
		}
	})
	return booleanDataResult
}
