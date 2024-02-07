import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { FaRegUser } from 'react-icons/fa'
import { LuSearch, LuShoppingBag } from 'react-icons/lu'

type TNavigation = {
	path: string
	icon: IconType
	name: string
}
export const useNavigationList = () => {
	const pathName = usePathname()
	const { t } = useTranslation()
	const navigationList: TNavigation[] = [
		{
			path: '/search',
			icon: LuSearch,
			name: t('search')
		},
		{
			path: '/basket',
			icon: LuShoppingBag,
			name: t('basket')
		},
		{
			path: '/profile',
			icon: FaRegUser,
			name: t('profile')
		}
	]

	return { navigationList, pathName, t }
}
