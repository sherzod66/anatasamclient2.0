import { Dispatch, SetStateAction } from 'react'

export const countrySecond = (second: number, sedSecond: Dispatch<SetStateAction<number>>) => {
	let num = second
	setInterval(() => {
		if (num > 0) {
			num -= 1
			sedSecond(num)
		}
	}, 1000)
}
