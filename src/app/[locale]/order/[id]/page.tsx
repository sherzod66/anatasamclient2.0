import Layout from '@/components/layout/Layout'
import OrderCard from '@/components/screens/order card/OrderCard'

type Props = {
	params: { id: string; locale: string }
}

export default function Order({ params }: Props) {
	return (
		<Layout locale={params.locale}>
			<OrderCard params={params.id} />
		</Layout>
	)
}
