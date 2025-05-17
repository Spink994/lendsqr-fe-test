'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { useRouter } from 'next/navigation';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import { UserData } from '@/app/interfaces/user.interface';
import styles from '@/app/styles/pages/dashboard.usersDetails.module.scss';
import GeneralDetails from './_components/GeneralDetail';

/**
|--------------------------------------------------
| Type for the sections
|--------------------------------------------------
*/
type EmployeeSection = 'general_details' | 'documents' | 'bank_details' | 'loans' | 'savings' | 'app_and_system';

export default function UserDetails({ params }: { params: Promise<{ user_email: string }> }) {
	/**
	|--------------------------------------------------
	| Route handler
	|--------------------------------------------------
	*/
	const router = useRouter();

	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const { user_email } = React.use(params);
	const [user, setUser] = React.useState<UserData | null>(null);
	const [activeView, setActiveView] = React.useState<EmployeeSection>('general_details');

	/**
	|--------------------------------------------------
	| Views
	|--------------------------------------------------
	*/
	const _VIEWS = {
		loans: null,
		savings: null,
		documents: null,
		bank_details: null,
		app_and_system: null,
		general_details: <GeneralDetails user={user as UserData} />,
	};

	/**
    |--------------------------------------------------
    | Effect to get the user information from the storage
    |--------------------------------------------------
    */
	React.useEffect(() => {
		const userFromLocal = localStorage.getItem('user');
		const userData = userFromLocal ? JSON.parse(userFromLocal) : null;
		setUser(userData);
	}, [user_email]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<section className={clsx(styles['details-page'])}>
			{/**
			|--------------------------------------------------
			| Back link
			|--------------------------------------------------
			*/}
			<button onClick={() => router.back()} className={clsx(styles['back-link'])}>
				← Back to Users
			</button>

			{/**
			|--------------------------------------------------
			| Header row
			|--------------------------------------------------
			*/}
			<header className={clsx(styles['header'])}>
				<h1>User Details</h1>
				<div className={clsx(styles['header__actions'])}>
					<button className={clsx(styles['btn'], styles['btn--danger'])}>Blacklist User</button>
					<button className={clsx(styles['btn'], styles['btn--success'])}>Activate User</button>
				</div>
			</header>

			{/**
			|--------------------------------------------------
			| User summary card
			|--------------------------------------------------
			*/}
			<div className={clsx(styles['summary-card-wrapper'])}>
				<div className={clsx(styles['summary-card'])}>
					{/**
					|--------------------------------------------------
					| Avatar
					|--------------------------------------------------
					*/}
					<div className={clsx(styles['avatar'])}>
						<span className={clsx(styles['avatar__icon'])}>👤</span>
					</div>

					{/**
					|--------------------------------------------------
					| Summary block
					|--------------------------------------------------
					*/}
					<div className={clsx(styles['summary__block'])}>
						<span className={clsx(styles['summary__name'])}>{user?.personal_information?.full_name}</span>
						<span className={clsx(styles['summary__id'])}>
							{user?.personal_information.bvn ?? 'LSQFf587g90'}
						</span>
					</div>

					{/**
					|--------------------------------------------------
					| User's tier
					|--------------------------------------------------
					*/}
					<div className={clsx(styles['summary__block'], styles['summary__tier'])}>
						<span>User’s Tier</span>
						<span>★ ☆ ☆</span>
					</div>

					{/**
					|--------------------------------------------------
					| Bank balance
					|--------------------------------------------------
					*/}
					<div className={clsx(styles['summary__block'])}>
						<span className={clsx(styles['summary__balance'])}>₦200,000.00</span>
						<span className={clsx(styles['summary__bank'])}>9912345678 / Providus Bank</span>
					</div>
				</div>

				{/**
				|--------------------------------------------------
				| Tab nav
				|--------------------------------------------------
				*/}
				<nav className={clsx(styles['tabs'])}>
					{['general_details', 'documents', 'bank_details', 'loans', 'savings', 'app_and_system'].map(
						(label) => (
							<button
								key={label}
								onClick={() => setActiveView(label as EmployeeSection)}
								className={clsx(styles['tab'], label === activeView && styles['tab--active'])}
							>
								{label.replaceAll('_', ' ')}
							</button>
						)
					)}
				</nav>
			</div>

			{/**
			|--------------------------------------------------
			| View
			|--------------------------------------------------
			*/}
			{_VIEWS[activeView as keyof typeof _VIEWS]}
		</section>
	);
}
