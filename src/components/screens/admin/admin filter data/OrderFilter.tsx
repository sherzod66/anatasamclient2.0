import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styles from './filter.module.scss'
import { Select } from 'antd'
import { IOrder } from '@/types/order.type'
import { orderSelectOption } from './orderSelectOption'
import { SearchOrder } from '@/server api/search'
type TInvitationProps = {
	globalDate: IOrder[] | undefined
	setData: Dispatch<SetStateAction<IOrder[] | undefined>>
}
const OrderFilter: FC<TInvitationProps> = ({ globalDate, setData }) => {
	const [defaultType, setDefaultType] = useState<string>('PENDING')
	const filterData = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 2) {
			const search = await SearchOrder(e.target.value)
			setData([...search])
		} else {
			setData(globalDate ? [...globalDate] : [])
		}
	}
	useEffect(() => {
		const copyData: IOrder[] = globalDate ? [...globalDate] : []
		setData([...copyData.filter(status => status.status === defaultType)])
	}, [globalDate])
	const filterPaymentId = (e: ChangeEvent<HTMLInputElement>) => {
		const copyData: IOrder[] = globalDate ? [...globalDate] : []
		setData([...copyData.filter(order => order.payment_id.includes(e.target.value))])
	}
	const filterOrderId = (e: ChangeEvent<HTMLInputElement>) => {
		const copyData: IOrder[] = globalDate ? [...globalDate] : []
		setData([...copyData.filter(order => String(order.id).includes(e.target.value))])
	}
	const handleChangeOrder = (value: string) => {
		setDefaultType(value)
		if (value === 'ALL') {
			setData(globalDate)
		} else {
			const copyData: IOrder[] = globalDate ? [...globalDate] : []
			setData([...copyData.filter(status => status.status === value)])
		}
	}
	return (
		<div className={styles.row}>
			<div>
				<input onChange={filterData} placeholder='Hero name' type='text' />
			</div>
			<div>
				<Select
					style={{ width: '100%', height: '36px' }}
					onChange={handleChangeOrder}
					placeholder='Filter by order status'
					defaultValue={'PENDING'}
					options={orderSelectOption}
				/>
			</div>
			<div>
				<input onChange={filterPaymentId} placeholder='Payment id' type='text' />
			</div>
			<div>
				<input onChange={filterOrderId} placeholder='Order id' type='text' />
			</div>
		</div>
	)
}

export default OrderFilter
