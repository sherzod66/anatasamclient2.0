import Layout from '@/components/layout/Layout'
import ProfilePage from '@/components/screens/profile/Profile'
import { I18NLocale } from '@/types/18n.type'
import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Anatasam | Личный кабинет'
}
export default function Profile({ params }: I18NLocale) {
	return (
		<Layout locale={params.locale}>
			<ProfilePage />
		</Layout>
	)
}
