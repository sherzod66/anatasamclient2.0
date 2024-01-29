import Layout from '@/components/layout/Layout'
import AboutUs from '@/components/screens/home/about us/AboutUs'
import Carousel from '@/components/screens/home/caroucel/Carousel'
import MainCatalog from '@/components/screens/home/catalog big/MainCatalog'

export default function Home() {
	return (
		<Layout>
			<Carousel />
			<MainCatalog />
			<AboutUs />
		</Layout>
	)
}
