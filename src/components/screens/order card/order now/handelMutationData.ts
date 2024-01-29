import { IInvitationInfo, IOrderInfo } from '@/types/invitationInfo.type'

export const handelMutationData = (
	invitationInfo: IInvitationInfo,
	paymentInfo: IOrderInfo
): IOrderInfo => {
	const object: IOrderInfo = { ...paymentInfo }
	object.invitationInfo.push(invitationInfo)
	return object
}
export const handelMultiMutationData = (
	invitationInfo: IInvitationInfo[],
	paymentInfo: IOrderInfo
): IOrderInfo => {
	const object: IOrderInfo = { ...paymentInfo }
	object.invitationInfo.length = 0
	object.invitationInfo.push(...invitationInfo)
	return object
}

type TClickUrlHelper = (amount: number, transaction_param: number, cardInfo: string) => void
export const clickRedirect: TClickUrlHelper = (amount, transaction_param, cardInfo) => {
	const returnUrl = `${process.env.NEXT_PUBLIC_CLIENT_API}/thanks`
	window.location.href = `https://my.click.uz/services/pay?service_id=${process.env.NEXT_PUBLIC_SERVICE_ID}&merchant_id=${process.env.NEXT_PUBLIC_MERCHANT_ID}&amount=${amount}&transaction_param=${transaction_param}&return_url=${returnUrl}&card_type=${cardInfo}`
}
