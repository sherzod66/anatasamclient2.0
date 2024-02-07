import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'
import './globals.scss'
import StoreProvider from './StoreProvider'

const firaSans = Fira_Sans({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '400', '500', '700'],
	variable: '--var-fira-sans'
})

export const metadata: Metadata = {
	title: 'Anatasam',
	authors: [{ name: 'Sherzod Sadillaev [sherzodjonsadillaev@gmail.com]' }],
	description:
		'Anatasam Invitation это одна из самых лидирующих компаний в Узбекистане по производству и печати пригласительных и поздравительных открыток, наша компания обслуживает и радует наших клиентов более 15 лет и   продолжает совершенствовать ассортимент своей продукции и привлекать более широкую аудиторию за счет повышения качества, продолжая развивать свою отрасль. Наша компания отличается одной особенностью, тем что у нас нет границ мы принимаем и отправляем нашу продукцию даже в самые дальние уголки мира. Мы печатали пригласительные для наших клиентов из Америки, Италии, Франции, Великобритании, России и много других стран и на самых разных языках мира. Мы гордимся за то, что мы всегда готовим лучшее, это является основной целью Anatasam Invitation, и так будет продолжаться и в будущем.',
	icons: {
		icon: `${process.env.CLIENT_API}/icon/favicon.ico`,
		shortcut: `${process.env.CLIENT_API}/icon/favicon.ico`,
		apple: [
			{ url: `${process.env.CLIENT_API}/icon/apple-touch-icon.png` },
			{
				url: `${process.env.CLIENT_API}/icon/apple-touch-icon-57x57.png`,
				sizes: '57x57'
			},
			{
				url: `${process.env.CLIENT_API}/icon/apple-touch-icon-72x72.png`,
				sizes: '72x72'
			},
			{
				url: `${process.env.CLIENT_API}/icon/apple-touch-icon-76x76.png`,
				sizes: '76x76'
			},
			{
				url: `${process.env.CLIENT_API}/icon/apple-touch-icon-114x114.png`,
				sizes: '114x114'
			},
			{
				url: `${process.env.CLIENT_API}/icon/apple-touch-icon-120x120.png`,
				sizes: '120x120'
			},
			{
				url: `${process.env.CLIENT_API}/icon/apple-touch-icon-144x144.png`,
				sizes: '144x144'
			},
			{
				url: `${process.env.CLIENT_API}/icon/apple-touch-icon-152x152.png`,
				sizes: '152x152'
			},
			{
				url: `${process.env.CLIENT_API}/icon/apple-touch-icon-180x180.png`,
				sizes: '180x180'
			}
		]
	},
	keywords: 'inventation congratulatory wedding'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ru'>
			<body className={firaSans.variable}>
				<StoreProvider>
					<div className='wrapper'>{children}</div>
				</StoreProvider>
			</body>
		</html>
	)
}
