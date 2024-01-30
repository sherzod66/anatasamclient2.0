'use client'
import { useEffect, useMemo, useState } from 'react'
import styles from './check.module.scss'
import { checkRead } from '@/config/localStorage.helper'
import CheckDetail from '@/components/screens/check/CheckDetail'

import { FC } from 'react'
import { IOrderInfo } from '@/types/invitationInfo.type'
import NotFound from '@/app/not-found'

const CheckOrder: FC = () => {
	const [checkData, setCheckData] = useState<IOrderInfo | null>(null)
	useEffect(() => setCheckData(checkRead()), [])
	return (
		<>
			{checkData ? (
				<div className={styles.ticket}>
					<div className={styles.ticket__container}>
						<div className={styles.ticket__body}>
							<div className={styles.ticket__title}>Anatasam</div>
							<div className={styles.ticket__row}>
								<CheckDetail check={checkData} />
							</div>
						</div>
					</div>
				</div>
			) : (
				<NotFound />
			)}
		</>
	)
}

export default CheckOrder
