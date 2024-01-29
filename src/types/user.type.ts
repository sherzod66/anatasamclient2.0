import { IElectronic } from './electronic.type'
import { IOrder } from './order.type'

export interface IUser {
	id: number
	createdAt: string
	updatedAt: string
	isAdmin: boolean
	role: 'USER' | 'DIRECTOR' | 'MANAGER' | 'SALESMAN'
	name: string
	phoneNumber: string
	orders: IOrder[]
	access_token: string
	electronic?: IElectronic[]
}
export interface IAuth {
	auth: boolean | null
	isAdmin?: boolean
	token?: string
}

export interface IUpdateUser
	extends Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'orders' | 'access_token'> {}
