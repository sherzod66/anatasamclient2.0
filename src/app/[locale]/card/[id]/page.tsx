import Layout from '@/components/layout/Layout'
import CardDetail from '@/components/screens/card/Card'
import { GetCard } from '@/server api/getCard'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
	params: { id: string; locale: string }
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const id = params.id
	const url = process.env.NEXT_PUBLIC_API_URL

	const product = await GetCard(id)

	const previousImages = (await parent).openGraph?.images || []

	if (product)
		return {
			metadataBase: new URL(`${url}`),
			title: `Anatasam | ${product?.name}`,
			openGraph: {
				images: [product?.imageLink[0], ...previousImages]
			}
		}
	else
		return {
			metadataBase: new URL(`${process.env.CLIENT_API}`),
			title: `Anatasam | page not found`,
			openGraph: {
				images: [`/404/404-status-code.png`, ...previousImages]
			}
		}
}

export default async function Card({ params }: Props) {
	const card = await GetCard(params.id)

	return (
		<Layout locale={params.locale}>
			{card ? <CardDetail card={card} /> : <h1>Page not found</h1>}
		</Layout>
	)
}
