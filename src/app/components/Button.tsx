/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import React, { ButtonHTMLAttributes } from 'react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import styles from '../styles/components/Button.module.scss';

/**
|--------------------------------------------------
| Button interface
|--------------------------------------------------
*/
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	isIconOnly?: boolean;
	icon?: React.ReactNode;
	variant?: 'filled' | 'outline';
	iconPosition?: 'left' | 'right';
	size?: 'small' | 'medium' | 'large';
}

export default function Button({
	icon,
	onClick,
	children,
	className,
	loading = false,
	size = 'medium',
	type = 'button',
	disabled = false,
	isIconOnly = false,
	variant = 'filled',
	iconPosition = 'left',
}: ButtonProps) {
	/**
	|--------------------------------------------------
	| Local state(s)
	|--------------------------------------------------
	*/
	const isDisabled = disabled || loading;

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={isDisabled}
			className={clsx(
				styles.button,
				styles[size],
				styles[variant],
				{
					[styles.disabled]: isDisabled,
					[styles.iconOnly]: isIconOnly,
				},
				className
			)}
		>
			{loading ? (
				<LoaderCircle className={styles.spinner} aria-label="Loading..." />
			) : (
				<>
					{/**
					|--------------------------------------------------
					| For left positioned icon
					|--------------------------------------------------
					*/}
					{icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}

					{/**
					|--------------------------------------------------
					| Main children
					|--------------------------------------------------
					*/}
					{!isIconOnly && children}

					{/**
					|--------------------------------------------------
					| For right positioned icon
					|--------------------------------------------------
					*/}
					{icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
				</>
			)}
		</button>
	);
}
