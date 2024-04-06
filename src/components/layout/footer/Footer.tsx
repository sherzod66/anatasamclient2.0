'use client'
import { FC, useEffect, useState } from 'react'
import './footer.css'
import { AiFillInstagram } from 'react-icons/ai'
import { FaTelegram } from 'react-icons/fa'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { useTranslation } from 'react-i18next'
const Footer: FC = () => {
	const [windowWidth, setWindowWidth] = useState<boolean>(false)
	const { t } = useTranslation()
	useEffect(() => {
		if (window.innerWidth < 768) {
			setWindowWidth(true)
		}
	}, [])

	return (
		<footer className='footer'>
			<div className='footer__container'>
				<div className={`footer__image ${windowWidth ? 'active' : ''}`}>
					<img src='/icon/logoMobile.png' alt='Anatasam' />
				</div>
				<div className='footer__row'>
					<div className='footer__column'>
						<h2 className='footer__title'>{t('company')}</h2>
						<ul className='footer__list'>
							<li>©Anatasam</li>
							<li>
								<a className='number' href='tel:+998915229627'>
									+99891 522-96-27
								</a>
							</li>
						</ul>
					</div>
					<div className={`footer__column ${windowWidth ? 'remove' : ''}`}>
						<div className='footer__img'>
							<img src='/icon/logo.png' alt='Anatasam' />
						</div>
					</div>
					<div className='footer__column'>
						<a
							target='_blank'
							className='mesanger'
							href='https://www.instagram.com/anatasam.invitation/'
						>
							<AiFillInstagram />
						</a>
						<a target='_blank' className='mesanger' href='https://t.me/anata36'>
							<FaTelegram />
						</a>
					</div>
				</div>
				<YMaps query={{ apikey: '133b3708-1c55-470b-8767-19e75d2d9d81' }}>
					<Map
						className='footer__map-width'
						defaultState={{ center: [39.652431, 66.954715], zoom: 18 }}
					>
						<Placemark
							modules={['geoObject.addon.balloon']}
							defaultGeometry={[39.652431, 66.954715]}
							properties={{
								balloonContentHeader: 'Anatasam',
								balloonContentBody: 'улица Амира Тимура, 36',
								balloonContentFooter: 'Пригласительные'
							}}
							options={{
								iconLayout: 'default#image',
								iconImageHref: 'https://cdn-icons-png.flaticon.com/512/143/143960.png',
								iconImageSize: [35, 35],
								iconImageOffset: [-18, -34]
							}}
						/>
					</Map>
				</YMaps>
			</div>
		</footer>
	)
}
export default Footer
