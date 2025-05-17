'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import Input from '../components/Input';
import Button from '../components/Button';
import styles from '@/app/styles/pages/login.module.scss';

export default function LoginPage() {
	/**
	|--------------------------------------------------
	| Router
	|--------------------------------------------------
	*/
	const router = useRouter();

	/**
	|--------------------------------------------------
	| Submit handler
	|--------------------------------------------------
	*/
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		router.push('/dashboard');
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div className={clsx(styles['login-page'])}>
			{/**
            |--------------------------------------------------
            | Left pane
            |--------------------------------------------------
            */}
			<div className={clsx(styles['left-pane'])}>
				<div className={clsx(styles['left-pane-child'])}>
					{/**
                    |--------------------------------------------------
                    | Logo
                    |--------------------------------------------------
                    */}
					<Image
						width={174}
						height={36}
						alt="lendsqr-logo"
						src="/icons/logo.svg"
						className={clsx(styles['left-pane-logo'])}
					/>

					{/**
                    |--------------------------------------------------
                    | Backgroud image
                    |--------------------------------------------------
                    */}
					<Image
						width={600}
						height={340}
						alt="lendsqr-logo"
						src="/images/pablo-sign-in.png"
						className={clsx(styles['left-pane-bg-image'])}
					/>
				</div>
			</div>

			{/**
            |--------------------------------------------------
            | Right pane
            |--------------------------------------------------
            */}
			<div className={clsx(styles['right-pane'])}>
				<div className={clsx(styles['header'])}>
					<span>Welcome!</span>
					<p>Enter details to login.</p>
				</div>

				{/**
				|--------------------------------------------------
				| Form
				|--------------------------------------------------
				*/}
				<form onSubmit={onSubmit}>
					{/**
					|--------------------------------------------------
					| Email
					|--------------------------------------------------
					*/}
					<Input type="email" placeholder="Email" />

					{/**
					|--------------------------------------------------
					| Password
					|--------------------------------------------------
					*/}
					<Input type="password" placeholder="Password" />

					{/**
					|--------------------------------------------------
					| Forgot password
					|--------------------------------------------------
					*/}
					<span>FORGOT PASSWORD?</span>

					{/**
					|--------------------------------------------------
					| Submit button
					|--------------------------------------------------
					*/}
					<Button type="submit" className={clsx(styles['submit-button'])} variant="filled">
						LOG IN
					</Button>
				</form>
			</div>
		</div>
	);
}
