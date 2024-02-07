import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import styles from './filter.module.scss'
import { ICard } from '@/types/card.type'
import { Select } from 'antd'
type TInvitationProps = {
	globalDate: ICard[] | undefined
	setData: Dispatch<SetStateAction<ICard[] | undefined>>
}
const InvitationFilter: FC<TInvitationProps> = ({ globalDate, setData }) => {
	const filterData = (e: ChangeEvent<HTMLInputElement>) => {
		const result = globalDate?.filter(item =>
			item.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setData(result)
	}
	const filterByBarcode = (e: ChangeEvent<HTMLInputElement>) => {
		const result = globalDate?.filter(item => item.barcode.includes(e.target.value))
		setData(result)
	}
	const handleChangeOrder = (value: string) => {
		const data: ICard[] = globalDate ? [...globalDate] : []
		if (value === 'more_sales') {
			data.sort((a, b) => a.orders - b.orders)
			setData(data.reverse())
		} else if (value === 'less_sales') {
			data.sort((a, b) => a.orders - b.orders)
			setData(data)
		}
	}
	return (
		<div className={styles.row}>
			<div>
				<input onChange={filterData} placeholder='Search by name' type='text' />
			</div>
			<div>
				<Select
					style={{ width: '100%', height: '36px' }}
					onChange={handleChangeOrder}
					placeholder='Select sorting'
					options={[
						{ value: 'more_sales', label: 'More sales', title: 'Больше продано' },
						{ value: 'less_sales', label: 'Less sales', title: 'Меньше продано' }
					]}
				/>
			</div>
			<div>
				<input onChange={filterByBarcode} placeholder='Search by barcode' type='text' />
			</div>
		</div>
	)
}

export default InvitationFilter
