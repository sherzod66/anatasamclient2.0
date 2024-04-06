export interface IInvitationInfo {
	id?: number
	cardId: number
	cardPrice: number
	cardName: string
	cardImage: string[]
	luckyOnes: string
	family: string
	lang: 'RU' | 'UZ' | 'EN'
	restaurant: string
	time: string
	date: string
	quantity: number
	comment: string
}
export type IPayment = 'UZCARD' | 'HUMO' | 'CASH' | undefined
export interface IOrderInfo {
	paymentMethod: IPayment
	paid?: number
	orderPrice: number
	userName: string | ''
	userPhone: string
	invitationInfo: IInvitationInfo[]
	basket: boolean
}
