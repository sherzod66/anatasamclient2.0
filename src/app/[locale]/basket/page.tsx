import Layout from '@/components/layout/Layout'
import Basket from '@/components/screens/basket/Basket'
import { I18NLocale } from '@/types/18n.type'

export default function BasketPage({ params }: I18NLocale) {
	return (
		<Layout locale={params.locale}>
			<Basket />
		</Layout>
	)
}
