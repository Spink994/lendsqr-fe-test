/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React, { InputHTMLAttributes, useState } from 'react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import styles from '../styles/components/Input.module.scss';

/**
|--------------------------------------------------
| Input interface
|--------------------------------------------------
*/
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	inputClassName?: string;
}

export default function Input({ type, className, inputClassName, placeholder, ...rest }: InputProps) {
	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const [showPassword, setShowPassword] = useState(false);

	const isPasswordType = type === 'password';
	const inputType = isPasswordType && showPassword ? 'text' : type;

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div className={`${styles.inputWrapper} ${className ?? ''}`}>
			{/**
            |--------------------------------------------------
            | Input field
            |--------------------------------------------------
            */}
			<input
				type={inputType}
				placeholder={placeholder}
				className={clsx(styles['inputField'], inputClassName)}
				{...rest}
			/>

			{/**
            |--------------------------------------------------
            | If the type is a password
            |--------------------------------------------------
            */}
			{isPasswordType && (
				<button
					type="button"
					className={styles.toggleButton}
					onClick={() => setShowPassword((prev) => !prev)}
					aria-label={showPassword ? 'Hide password' : 'Show password'}
				>
					{showPassword ? 'HIDE' : 'SHOW'}
				</button>
			)}
		</div>
	);
}
