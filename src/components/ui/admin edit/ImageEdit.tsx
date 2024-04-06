import { ChangeEvent, FC, MouseEvent } from 'react'
import styles from './editModel.module.scss'
import { FaPlus } from 'react-icons/fa'
import { imageLik } from '@/util/imageLinkHalper'
import { MdDelete } from 'react-icons/md'
import { Button, Popconfirm, message } from 'antd'
import {
	useDeleteCardImageMutation,
	useGetCardByIdQuery,
	usePushImageMutation
} from '@/lib/api/card.api'
import { createFile } from '@/server api/createFile'

const ImageEdit: FC<{ cardId: number }> = ({ cardId }) => {
	const { data } = useGetCardByIdQuery({ id: cardId })
	const [deleteCardImage] = useDeleteCardImageMutation()
	const [PushImage] = usePushImageMutation()
	const confirm = (imagePath: string) => {
		deleteCardImage({ cardId, imagePath })
			.then(() => message.success('Successfully changed'))
			.catch(() => message.error('Error! something went wrong'))
	}
	const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const bodyFormData = new FormData()
			bodyFormData.append('image', e.target.files[0])
			const dataResponse = await createFile(bodyFormData, 'cards')
			PushImage({ cardId, imagePath: dataResponse })
				.then(() => message.success('Successfully added'))
				.catch(() => message.error('Error! something went wrong'))
		}
	}
	const cancel = (e: MouseEvent<HTMLElement, globalThis.MouseEvent> | undefined) => {
		message.error('Click on No')
	}
	return (
		<div className={styles.image__row}>
			{data
				? data.imageLink.map(path => (
						<div key={path} className={styles.image__column}>
							<img src={imageLik(path)} alt='image card' />
							<Popconfirm
								title='Delete the image'
								description='Are you sure to delete this image?'
								onConfirm={e => confirm(path)}
								onCancel={cancel}
								okText='Yes'
								cancelText='No'
							>
								<Button danger>
									<MdDelete />
								</Button>
							</Popconfirm>
						</div>
				  ))
				: ''}
			<div className={styles.upload__file}>
				<label>
					<input onChange={uploadImage} type='file' />
					<FaPlus />
				</label>
			</div>
		</div>
	)
}

export default ImageEdit
