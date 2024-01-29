import initTranslations from '@/app/i18n'
import { createInstance } from 'i18next'
import { FC } from 'react'
import { I18nextProvider } from 'react-i18next'
type TTranslationProvider = {
	children: JSX.Element[] | JSX.Element | React.ReactElement | React.ReactElement[] | string
	locale: any
	namespaces: any
	resources: any
}
const TranslationProvider: FC<TTranslationProvider> = ({
	children,
	locale,
	namespaces,
	resources
}) => {
	const i18n = createInstance()
	initTranslations(locale, namespaces, i18n, resources)
	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export default TranslationProvider
