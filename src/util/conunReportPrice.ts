import { ICard, IReportCardCount } from '@/types/card.type'
import { IElectronic } from '@/types/electronic.type'
import { IInvitationInfo } from '@/types/invitationInfo.type'
import { IOrder } from '@/types/order.type'

export const countReportPrice = (arg: IOrder[]): number => {
	let price = 0
	for (let index = 0; index < arg.length; index++) {
		price += arg[index].paid
	}
	return price
}

export const countReportMade = (arg: IOrder[]): number => {
	const count = arg.filter(item => item.status === 'TOOK')
	return count.length
}
export const countReportInProgress = (arg: IOrder[]): number => {
	const count = arg.filter(item => item.status === 'IN_PROGRESS')
	return count.length
}
export const countElectronicPrice = (arg: IElectronic[]): number => {
	let price = 0
	for (let index = 0; index < arg.length; index++) {
		price += arg[index].price
	}
	return price
}
