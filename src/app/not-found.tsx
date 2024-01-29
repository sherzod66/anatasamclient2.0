import type { Metadata } from 'next'
import styles from '@/assets/styles/notFound.module.scss'
import Link from 'next/link'
export const metadata: Metadata = {
	title: 'Not found',
	description: ''
}

function NotFound() {
	return (
		<div className={styles.notFound}>
			<h1>404</h1>
			<h2>Page not found</h2>
			<button type='button'>
				<Link href={'/'}>Go home</Link>
			</button>
		</div>
	)
}
export default NotFound
