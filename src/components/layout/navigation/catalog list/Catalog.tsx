'use client'
import { FC, SetStateAction } from 'react'
import styles from './catalog.module.scss'
import Link from 'next/link'
import { MdEvent } from 'react-icons/md'
import { GiHorseHead } from 'react-icons/gi'
import { FaGift } from 'react-icons/fa'
import { BsFillEnvelopeHeartFill } from 'react-icons/bs'
import { BiArchive } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

const Catalog: FC = () => {
	const { t } = useTranslation()
	return (
		<ul className={styles.catalog__list}>
			<li>
				<Link className={styles.catalog__link} href='/goods/all'>
					<BiArchive /> {t('all_goods')}
				</Link>
			</li>
			<li>
				<Link className={styles.catalog__link} href='/goods/wedding'>
					<MdEvent /> {t('invitationn')}
				</Link>
			</li>
			<li>
				<Link className={styles.catalog__link} href='/goods/sunnat'>
					<GiHorseHead />
					{t('sunnat')}
				</Link>
			</li>
			<li>
				<Link className={styles.catalog__link} href='/goods/congratulatory'>
					<FaGift /> {t('congratulatory')}
				</Link>
			</li>
			<li>
				<Link className={styles.catalog__link} href='/goods/anniversary'>
					<BsFillEnvelopeHeartFill /> {t('anniversary')}
				</Link>
			</li>
		</ul>
	)
}

export default Catalog
