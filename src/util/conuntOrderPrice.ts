import { ICard } from '@/types/card.type'
import { IInvitationInfo } from '@/types/invitationInfo.type'

export const countOrderPrice = (arg: IInvitationInfo[]): number => {
	let price = 0
	for (let index = 0; index < arg.length; index++) {
		price += arg[index].cardPrice * arg[index].quantity
	}
	return price
}
