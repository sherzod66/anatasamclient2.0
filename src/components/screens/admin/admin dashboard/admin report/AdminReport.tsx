'use client'
import { FC, ReactNode } from 'react'
import styles from './adminReport.module.scss'
import ReportFilter from '../../admin filter data/ReportFilter'
import { useOrderResult } from './useOrderResult'
import { Col, Statistic, Row } from 'antd'
import CountUp from 'react-countup'
import { useGetUserQuery } from '@/lib/api/api'
import { useElectronicReport } from './useElectronicReport'

const formatter = (value: number): ReactNode => <CountUp end={value} separator=' ' />
const AdminReport: FC = () => {
	const { globalOrder, orderLoading, orders, setOrders } = useOrderResult()
	const { electronicLoading, electronics, setElectronics, globalElectronic } = useElectronicReport()
	const { data: user } = useGetUserQuery(undefined)
	return (
		<>
			{user ? (
				user.role === 'DIRECTOR' ? (
					<>
						<ReportFilter
							globalOrder={globalOrder}
							setOrders={setOrders}
							globalElectronic={globalElectronic}
							setElectronics={setElectronics}
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
									title='Cash'
									value={orders.cash}
									formatter={formatter}
									decimalSeparator=' '
									suffix='Sum'
								/>
							</Col>
							<Col span={5}>
								<Statistic
									title='Electronic card'
									value={orders.electronicCard}
									formatter={formatter}
									decimalSeparator=' '
									suffix='Sum'
								/>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={5}>
								<Statistic
									className={styles.title}
									title='Completed orders'
									value={orders.done}
									formatter={formatter}
									decimalSeparator=' '
									suffix={`of ${orders.orderQuantity}`}
								/>
							</Col>
							<Col span={5}>
								<Statistic
									title='Orders in progress'
									value={orders.inProgress}
									formatter={formatter}
									decimalSeparator=' '
									suffix={`of ${orders.orderQuantity}`}
								/>
							</Col>
						</Row>
						<div className={styles.report__line}></div>
						<Row gutter={16}>
							<Col span={5}>
								<Statistic
									className={styles.title}
									title='Electronics'
									value={electronics.electronics}
									formatter={formatter}
									decimalSeparator=' '
								/>
							</Col>
							<Col span={5}>
								<Statistic
									title='Money earned'
									value={electronics.totalAmount}
									formatter={formatter}
									decimalSeparator=' '
									suffix='Sum'
								/>
							</Col>
						</Row>
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
