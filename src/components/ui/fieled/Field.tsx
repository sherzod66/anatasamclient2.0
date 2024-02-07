import { IFormValue } from '@/types/card.type'
import styles from './Field.module.scss'
import { FieldErrors, UseFormRegister, UseFormReset } from 'react-hook-form'
import { FC, HTMLInputTypeAttribute } from 'react'

type TFieldProps = {
	register: UseFormRegister<IFormValue>
	name:
		| 'name'
		| 'description'
		| 'type'
		| 'orders'
		| 'quantity'
		| 'minOrderQuantity'
		| 'price'
		| 'castPrice'
		| 'imageLink'
	options: string
	errors: FieldErrors<IFormValue>
	rest: UseFormReset<IFormValue>
	placeholder: string
	type: HTMLInputTypeAttribute
	value?: string | number | readonly string[] | undefined
	title?: string
}

const Field: FC<TFieldProps> = ({
	register,
	errors,
	name,
	options,
	rest,
	placeholder,
	type,
	value,
	title
}) => {
	return (
		<div className={styles.input__wrapper}>
			<label title={title} htmlFor={name}>
				{placeholder}
			</label>
			<input
				{...register(name, {
					required: options
				})}
				id={name}
				placeholder={placeholder}
				type={type}
				value={value}
				{...rest}
				className={styles.input}
			/>
			<span>{errors[name]?.message}</span>
		</div>
	)
}
export default Field
