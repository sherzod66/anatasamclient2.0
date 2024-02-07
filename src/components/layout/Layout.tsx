import { FC } from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import Navigation from './navigation/Navigation'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '../translation/TranslationProvider'
type TLayout = {
	children: JSX.Element[] | JSX.Element | React.ReactElement | React.ReactElement[] | string
	locale: string
}
const i18nNamespaces = ['layout']
const Layout: FC<TLayout> = async ({ children, locale }) => {
	const { t, resources } = await initTranslations(locale, i18nNamespaces)
	return (
		<>
			<TranslationsProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
				<Header />
				<Navigation />
				<>{children ? children : ''}</>
				<Footer />
			</TranslationsProvider>
		</>
	)
}

export default Layout
