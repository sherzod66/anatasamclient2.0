export const getUserHelper = (): string => '/users/profile'
export const postUserAuth = (): string => '/auth'
export const postAuthKey = (): string => '/auth/confirmation/'
export const getAllOrders = (): string => '/orders/get-all/'
export const createOrder = (): string => '/orders/create'
export const deleteOrder = (): string => '/orders'
export const orderChangeStatus = (): string => '/orders/status'
export const checkPay = (): string => '/orders/payment-verification'
export const getAllUsers = (): string => '/users/all-user'
export const updateUser = (): string => '/users/update'
export const updateUserName = (): string => '/users/add-name'
export const createCard = (): string => '/cards/add'
export const deleteCard = (): string => '/cards/delete/'
export const updateCard = (): string => '/cards/update'
export const getCardByTag = (): string => '/cards/get-cards-by-tag'

export const electronicGetAll = (): string => '/electronic'
export const electronicCreate = (): string => '/electronic/create'
export const electronicDelete = (): string => '/electronic'

export type TAuth = {
	response: 'activation key sent for new user'
}
