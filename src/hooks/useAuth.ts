import Cookies from 'js-cookie'
import { useGetUserQuery } from '@/lib/api/api'
import { useEffect, useMemo } from 'react'
import { useTypedSelector } from './useTypedSelector'
import { useActions } from './useActions'
import { IAuth } from '@/types/user.type'
import { usePathname } from 'next/navigation'
export const useAuth = (): IAuth => {
	const auth = useTypedSelector(state => state.auth)
	const { isError, isSuccess, data } = useGetUserQuery(auth.token)
	const { editAuth } = useActions()
	const pathname = usePathname()
	useEffect(() => {
		const token = auth.token
		if (!token) {
			editAuth({ auth: null, isAdmin: false, token: auth.token })
		}
		if (isError) {
			Cookies.remove(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`)
			editAuth({ auth: null, isAdmin: false, token: auth.token })
		}
		if (isSuccess) editAuth({ auth: true, isAdmin: data?.isAdmin, token: auth.token })
	}, [isSuccess, isError, pathname])

	return useMemo(() => auth, [auth, pathname])
}
