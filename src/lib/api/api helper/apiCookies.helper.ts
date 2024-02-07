import Cookies from 'js-cookie'
const token = `${process.env.NEXT_PUBLIC_TOKEN_NAME}`
export const getToken = () => `${Cookies.get(token)}`
export const writeToken = (accessToken: string) =>
	`${Cookies.set(token, accessToken, { expires: 30 })}`
export const removeToken = () => Cookies.remove(token)
