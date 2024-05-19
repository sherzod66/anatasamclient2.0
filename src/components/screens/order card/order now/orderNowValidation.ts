import { IInvitationInfo, IOrderInfo } from '@/types/invitationInfo.type'

export const orderNowValidation = (data: IInvitationInfo) => {
	const valid =
		data.date !== '' &&
		data.family !== '' &&
		data.luckyOnes !== '' &&
		data.restaurant !== '' &&
		data.time !== ''
	return valid
}
export const paymentInfoValidation = (data: IOrderInfo) => {
	const valid = data.userName !== '' && data.userPhone !== ''
	return valid
}
