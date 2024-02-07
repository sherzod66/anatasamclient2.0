import Layout from '@/components/layout/Layout'
import AboutUs from '@/components/screens/home/about us/AboutUs'
import Carousel from '@/components/screens/home/caroucel/Carousel'
import MainCatalog from '@/components/screens/home/catalog big/MainCatalog'
import { I18NLocale } from '@/types/18n.type'

export default async function Home({ params: { locale } }: I18NLocale) {
	return (
		<Layout locale={locale}>
			<Carousel />
			<MainCatalog locale={locale} />
			<AboutUs locale={locale} />
		</Layout>
	)
}
