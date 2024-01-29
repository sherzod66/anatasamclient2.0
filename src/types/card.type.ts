export interface ICard {
	id: number
	createdAt: string
	updatedAt: Date
	name: string
	description: string
	type: string
	barcode: string
	orders: number
	quantity: number
	minOrderQuantity: number
	price: number
	castPrice: number
	imageLink: string[]
}

export interface IOrderNow extends ICard {
	orderQuantity: number
	cardId: number
}

export interface IFormValue extends Omit<ICard, 'id' | 'createdAt' | 'updatedAt' | 'imageLink'> {
	castPrice: number
	imageLink: FileList
}

export interface ICardCreate extends Omit<ICard, 'id' | 'createdAt' | 'updatedAt' | 'orders'> {}
export interface ICardEdit
	extends Omit<ICard, 'id' | 'createdAt' | 'updatedAt' | 'orders' | 'imageLink'> {}

export interface IReportCardCount extends ICard {
	orderQuantity: number
}
