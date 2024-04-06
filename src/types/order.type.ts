import { IInvitationInfo } from './invitationInfo.type'

export interface IOrder {
	id: number
	createdAt: string
	updatedAt: Date
	paymentMethod: 'UZCARD' | 'HUMO' | 'CASH'
	status: 'PENDING' | 'IN_PROGRESS' | 'CAN_BE_PICKED_UP' | 'TOOK'
	paidStatus: 'PENDING' | 'PAID'
	payment_id: string
	paid: number
	orderPrice: number
	invitationInfo: IInvitationInfo[]
	userName: string
	userPhone: string
}

export type TPaymentVerificationResult = {
	status: 'error' | 'success'
	paymentStatus: number
	message: string
}

export interface IOrderResult {
	orderQuantity: number
	totalAmount: number
	cash: number
	electronicCard: number
	done: number
	inProgress: number
}
export interface IOrderChangeStatusResult {
	status: number
	message: string
}

export interface IOrderChangeStatusRequest {
	id: number
	status: 'PENDING' | 'IN_PROGRESS' | 'CAN_BE_PICKED_UP' | 'TOOK'
}

export const orderDefault: IOrder = {
	id: 0,
	createdAt: '',
	invitationInfo: [],
	orderPrice: 0,
	paid: 0,
	paidStatus: 'PENDING',
	payment_id: '',
	paymentMethod: 'CASH',
	status: 'PENDING',
	updatedAt: new Date(),
	userName: '',
	userPhone: ''
}

export interface IEditOrderRequest {
	id: number
	cardDifference: { cardId: number; increment: boolean; difference: number }[]
	orderPrice: number
	invitationInfo: IInvitationInfo[]
}
