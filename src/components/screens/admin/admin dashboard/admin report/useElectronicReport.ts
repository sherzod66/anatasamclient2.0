import { useGetAllElectronicQuery } from '@/lib/api/electronic.api'
import { useMemo, useState } from 'react'

export const useElectronicReport = () => {
	const { data: globalElectronic, isLoading: electronicLoading } = useGetAllElectronicQuery(null)
	const [electronics, setElectronics] = useState<{ electronics: number; totalAmount: number }>({
		electronics: 0,
		totalAmount: 0
	})
	return useMemo(
		() => ({ globalElectronic, electronics, setElectronics, electronicLoading }),
		[globalElectronic, electronics, electronicLoading]
	)
}
