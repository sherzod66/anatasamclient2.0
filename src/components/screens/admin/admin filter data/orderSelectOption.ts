import { SelectProps } from 'antd'

export const orderSelectOption: SelectProps['options'] = [
	{ label: 'All', value: 'ALL', title: 'Все' },
	{ label: 'PENDING', value: 'PENDING', title: 'В ожидании' },
	{ label: 'IN PROGRESS', value: 'IN_PROGRESS', title: 'В процессе' },
	{ label: 'CAN BE PICKED UP', value: 'CAN_BE_PICKED_UP', title: 'Можно забирать' },
	{ label: 'TOOK', value: 'TOOK', title: 'Забрал' }
]
