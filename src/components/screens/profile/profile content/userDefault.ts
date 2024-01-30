import { IUser } from '@/types/user.type'

export const userDefaultValue: IUser = {
	access_token: '',
	createdAt: '',
	id: 0,
	isAdmin: false,
	name: '',
	orders: [],
	phoneNumber: '',
	updatedAt: '',
	role: 'USER'
}
