import { FC } from 'react'
import styles from './aboutUs.module.scss'
import initTranslations from '@/app/i18n'

const AboutUs: FC<{ locale: string }> = async ({ locale }) => {
	const { t } = await initTranslations(locale, ['layout'])
	return (
		<div className={styles.about}>
			<div className={styles.about__container}>
				<div className={styles.about__row}>
					<div className={styles.about__item}>
						<div className={styles.about__title}>{t('about_us')}</div>
						<p>{t('about_us_description')}</p>
					</div>
					<div className={styles.about__item}>
						<div className={styles.about__img}>
							<img
								src='https://avatars.mds.yandex.net/get-altay/1880508/2a0000016e362f966ecdc93e2c1976561db7/XXXL'
								alt='ofice'
								draggable={false}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutUs
