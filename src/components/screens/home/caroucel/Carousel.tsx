'use client'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/pagination'
import { carouselData } from './caroucelData'
import Link from 'next/link'
import styles from './carousel.module.scss'
import { useTranslation } from 'react-i18next'
const Carousel: FC = () => {
	const { i18n } = useTranslation()
	return (
		<div className={styles.main__carousel}>
			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				speed={800}
				loop={true}
				pagination={{ clickable: true }}
				autoplay={{
					delay: 10500,
					stopOnLastSlide: true,
					disableOnInteraction: false
				}}
				modules={[Pagination, Autoplay]}
				className={styles.main__carousel_swiper}
			>
				{carouselData.map(banner => (
					<SwiperSlide className={styles.main__carousel_slide} key={banner.link}>
						<img src={banner.imageLink} alt={banner.title} />
						<div className={styles.banner}>
							<h1>{i18n.language === 'en' ? banner.titleEn : banner.title}</h1>
							<button type='button'>
								<Link href={banner.link}>
									{i18n.language === 'en' ? 'View all' : 'Посмотреть все'}
								</Link>
							</button>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default Carousel
