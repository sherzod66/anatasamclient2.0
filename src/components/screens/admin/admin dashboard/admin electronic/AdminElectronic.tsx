'use client'
import { useDeleteElectronicMutation, useGetAllElectronicQuery } from '@/lib/api/electronic.api'
import { IElectronicKey } from '@/types/electronic.type'
import { Popconfirm, Table, TableColumnsType, message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { refactorData } from './tableData'
import Loader from '@/components/ui/Loader/Loader'
import Link from 'next/link'
import { formatPrice } from '@/util/formatPrice'

const AdminElectronic: FC = () => {
	const { data: globalDate, isLoading } = useGetAllElectronicQuery(null)
	const [data, setData] = useState<IElectronicKey[]>([])
	const [deleteElectronic, { data: deleteData, isLoading: deleteLoading }] =
		useDeleteElectronicMutation()
	const handleDelete = (key: React.Key) => {
		deleteElectronic({ id: String(key) })
	}
	useEffect(() => {
		if (deleteData) {
			message.success(deleteData.message)
		}
	}, [deleteData])
	useEffect(() => {
		setData(refactorData(globalDate))
	}, [globalDate])
	const columns: TableColumnsType<IElectronicKey> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (_, record: { key: React.Key }) => <Link href={`/electronic/${record.key}`}>{_}</Link>
		},
		{ title: 'Create At', dataIndex: 'createdAt', key: 'createdAt' },
		{ title: 'Storage period', dataIndex: 'shelfLife', key: 'shelfLife' },
		{ title: 'Viewing', dataIndex: 'viewing', key: 'viewing' },
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: value => `${formatPrice(value)} Sum`
		},
		{
			title: 'Actions',
			dataIndex: 'operation',
			render: (_, record: { key: React.Key }) =>
				data.length >= 1 ? (
					<Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.key)}>
						<a>Delete</a>
					</Popconfirm>
				) : null
		}
	]
	return (
		<>
			{isLoading && <Loader />}
			{deleteLoading && <Loader />}
			<Table
				columns={columns}
				expandable={{
					rowExpandable: record => record.name !== 'Not Expandable'
				}}
				dataSource={data}
			/>
		</>
	)
}

export default AdminElectronic
