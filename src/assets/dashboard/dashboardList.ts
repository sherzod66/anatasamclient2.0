import { IconType } from 'react-icons'
import { FaNetworkWired, FaClipboardList } from 'react-icons/fa'
import { LuWalletCards } from 'react-icons/lu'
import { HiUser } from 'react-icons/hi2'
import { RiMovie2Fill } from 'react-icons/ri'
import { FC } from 'react'
import AdminOrder from '@/components/screens/admin/admin dashboard/order detaile/AdminOrder'
import AdminInvitation from '@/components/screens/admin/admin dashboard/AdminInvitation'
import AdminAllUser from '@/components/screens/admin/admin dashboard/AdminAllUser'
import AdminElectronic from '@/components/screens/admin/admin dashboard/admin electronic/AdminElectronic'
import AdminReport from '@/components/screens/admin/admin dashboard/admin report/AdminReport'
import AdminInvitationPopup from '@/components/screens/admin/admin popup/AdminInvitationPopup'
import AdminElectronicPopup from '@/components/screens/admin/admin popup/AdminElectronicPopup'
type TDashboard = {
	link: string
	icon: IconType
	title: string
	PopupDetail?: FC
	DashboardComponent: FC
	role: string
}
export const dashboardBarList: TDashboard[] = [
	{
		title: 'Orders',
		link: '/manager/orders',
		icon: FaNetworkWired,
		DashboardComponent: AdminOrder,
		role: 'DIRECTOR MANAGER'
	},
	{
		icon: LuWalletCards,
		link: '/manager/create-order',
		title: 'Invitation cards',
		DashboardComponent: AdminInvitation,
		PopupDetail: AdminInvitationPopup,
		role: 'DIRECTOR SALESMAN'
	},
	{
		icon: HiUser,
		link: '/manager/all-users',
		title: 'All users',
		DashboardComponent: AdminAllUser,
		role: 'DIRECTOR'
	},
	{
		icon: RiMovie2Fill,
		link: '/manager/electronic',
		title: 'Electronic',
		DashboardComponent: AdminElectronic,
		PopupDetail: AdminElectronicPopup,
		role: 'DIRECTOR SALESMAN'
	},
	{
		icon: FaClipboardList,
		link: '/manager/report',
		title: 'Report',
		DashboardComponent: AdminReport,
		role: 'DIRECTOR'
	}
]
