import { SelectProps } from 'antd'

export const goodsSelect = (first: string, second: string): SelectProps['options'] => {
	const returnData: SelectProps['options'] = [
		{ value: 'price-from-high-to-low', label: first },
		{ value: 'price-from-low-to-high', label: second }
	]
	return returnData
}

export const changeBreadcrumbValue = (arg: string | string[]): string => {
	if (arg === 'wedding') return 'invitationn'
	else if (arg === 'sunnat') return 'sunnat'
	else if (arg === 'congratulatory') return 'congratulatory'
	else if (arg === 'anniversary') return 'anniversary'
	else return ''
}
