import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import { GetCardByTag } from '@/server api/getCardByTag'
import Goods from '@/components/screens/goods/Goods'
import NotFound from '../../../not-found'
type Props = {
	params: { id: string; locale: string }
}

export const metadata: Metadata = {
	title: 'Anatasam | Пригласительные'
}

export default async function GoodsPage({ params }: Props) {
	const cardTag = await GetCardByTag(params.id)
	return (
		<Layout locale={params.locale}>
			{cardTag ? cardTag.length > 0 ? <Goods goods={cardTag} /> : <NotFound /> : ''}
		</Layout>
	)
}
