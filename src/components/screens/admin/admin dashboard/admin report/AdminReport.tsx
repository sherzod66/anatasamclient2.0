'use client'
import { FC, ReactNode } from 'react'
import styles from './adminReport.module.scss'
import ReportFilter from '../../admin filter data/ReportFilter'
import { useOrderResult } from './useOrderResult'
import { useCardResult } from './useCardResult'
import { Col, Progress, Row, Space, Statistic, Tooltip } from 'antd'
import CountUp from 'react-countup'
import { useGetUserQuery } from '@/lib/api/api'

const formatter = (value: number): ReactNode => <CountUp end={value} separator=' ' />
const AdminReport: FC = () => {
	const { globalOrder, orderLoading, orders, setOrders } = useOrderResult()
	const { data: user } = useGetUserQuery(undefined)
	const { cards, cardLoading, setCard } = useCardResult()
	return (
		<>
			{user ? (
				user.role === 'DIRECTOR' ? (
					<>
						<ReportFilter
							cards={cards}
							globalOrder={globalOrder}
							orders={orders}
							setOrders={setOrders}
						/>
						<Row gutter={16}>
							<Col span={5}>
								<Statistic
									className={styles.title}
									title='Orders'
									value={orders.orderQuantity}
									formatter={formatter}
									decimalSeparator=' '
								/>
							</Col>
							<Col span={5}>
								<Statistic
									title='Circulation of money'
									value={orders.totalAmount}
									formatter={formatter}
									decimalSeparator=' '
									suffix='Sum'
								/>
							</Col>
							<Col span={5}>
								<Statistic
									formatter={formatter}
									title='Profit'
									value={orders.netProfit}
									decimalSeparator=' '
									suffix='Sum'
								/>
							</Col>
						</Row>
						<Space wrap>
							<Tooltip title='In progress'>
								<Progress
									percent={Math.round((orders.inProgress / orders.orderQuantity) * 100)}
									success={{
										percent: Math.round((orders.inProgress / orders.orderQuantity) * 100)
									}}
									type='dashboard'
								/>
							</Tooltip>
							<Tooltip title='Completed orders'>
								<Progress
									percent={Math.round((orders.done / orders.orderQuantity) * 100)}
									success={{
										percent: Math.round((orders.done / orders.orderQuantity) * 100)
									}}
									type='dashboard'
								/>
							</Tooltip>
						</Space>
					</>
				) : (
					<h1>You don't have enough rights</h1>
				)
			) : (
				<h1>Error</h1>
			)}
		</>
	)
}

export default AdminReport
