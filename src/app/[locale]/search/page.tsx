import Layout from '@/components/layout/Layout'
import Search from '@/components/screens/search/Search'
import { I18NLocale } from '@/types/18n.type'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Anatasam | Результаты поиска'
}

export default function pageSearch({ params }: I18NLocale) {
	return (
		<Layout locale={params.locale}>
			<Search />
		</Layout>
	)
}
