import Layout from '@/components/layout/Layout'
import Thanks from '@/components/screens/thanks/Thanks'
import { I18NLocale } from '@/types/18n.type'
import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Anatasam | Cпасибо за покупку'
}
export default function ThanksPage({ params }: I18NLocale) {
	return (
		<Layout locale={params.locale}>
			<Thanks />
		</Layout>
	)
}
