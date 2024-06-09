'use client'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styles from './filter.module.scss'
import cn from 'clsx'
import { GetDataString } from '@/util/Date.heper'
import { IOrder, IOrderResult } from '@/types/order.type'
import {
	countElectronicPrice,
	countReportInProgress,
	countReportMade,
	countReportPrice
} from '@/util/conunReportPrice'
import { IElectronic } from '@/types/electronic.type'

type TReportProps = {
	globalOrder: IOrder[] | undefined
	setOrders: Dispatch<SetStateAction<IOrderResult>>
	setElectronics: Dispatch<
		SetStateAction<{
			electronics: number
			totalAmount: number
		}>
	>
	globalElectronic: IElectronic[] | undefined
}
const ReportFilter: FC<TReportProps> = ({
	globalOrder,
	setOrders,
	globalElectronic,
	setElectronics
}) => {
	const [filterData, setFilterData] = useState<{
		first: number
		second: number
	}>({ first: Date.now() - 2592000000, second: Date.now() })
	useEffect(() => {
		let copyOrder: IOrder[] = globalOrder ? [...globalOrder] : []
		console.log(copyOrder)
		let copyElectronic: IElectronic[] = globalElectronic ? [...globalElectronic] : []
		const coincidence = copyOrder.filter(
			order => filterData.first < +order.createdAt && filterData.second > +order.createdAt
		)
		const coincidenceCash = coincidence.filter(order => order.paymentMethod === 'CASH')
		const coincidenceCard = coincidence.filter(
			order => order.paymentMethod === 'HUMO' || order.paymentMethod === 'UZCARD'
		)

		const coincidenceElectronic = copyElectronic.filter(
			electronic =>
				filterData.first < +electronic.createdAt && filterData.second > +electronic.createdAt
		)
		setOrders(prev => ({
			...prev,
			orderQuantity: coincidence.length,
			totalAmount: countReportPrice(coincidence),
			done: countReportMade(coincidence),
			inProgress: countReportInProgress(coincidence),
			cash: countReportPrice(coincidenceCash),
			electronicCard: countReportPrice(coincidenceCard)
		}))
		setElectronics(prev => ({
			...prev,
			electronics: coincidenceElectronic.length,
			totalAmount: countElectronicPrice(coincidenceElectronic)
		}))
	}, [filterData])
	return (
		<div className={cn(styles.row, styles.calendar)}>
			<div>
				<input
					onChange={e =>
						setFilterData(prev => ({
							...prev,
							first: Date.parse(e.target.value)
						}))
					}
					value={GetDataString(filterData.first)}
					type='date'
				/>
			</div>
			<div>
				<input
					onChange={e =>
						setFilterData(prev => ({
							...prev,
							second: Date.parse(e.target.value)
						}))
					}
					value={GetDataString(filterData.second)}
					type='date'
				/>
			</div>
		</div>
	)
}

export default ReportFilter
