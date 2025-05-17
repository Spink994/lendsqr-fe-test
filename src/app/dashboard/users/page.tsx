'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import React, { Ref } from 'react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { fetcher } from '@/lib/fetcher';
import Button from '@/app/components/Button';
import TableRow from '../_components/TableRow';
import Pagination from '../_components/Pagination';
import TableHeader from '../_components/TableHead';
import useClickOutside from '@/app/useClickOutside';
import TableFilter from '../_components/TableFilter';
import StatusBadge from '../_components/StatusBadge';
import { UserData } from '@/app/interfaces/user.interface';
import { getFilteredUsers } from '@/helper/getFilteredUsers';
import styles from '@/app/styles/pages/dashboard.users.module.scss';
import { LoaderCircle } from 'lucide-react';

const _OVERVIEW_DATA = ({
	userValue,
	loanUsersValue,
	activeUserValue,
	savingsUsersValue,
}: {
	userValue: number;
	loanUsersValue: number;
	activeUserValue: number;
	savingsUsersValue: number;
}) => [
	{
		label: 'Users',
		imageUrl: '/icons/users.svg',
		value: userValue ?? '2,453',
	},
	{
		label: 'Active Users',
		imageUrl: '/icons/active_users.svg',
		value: activeUserValue ?? '2,453',
	},
	{
		label: 'Users with Loans',
		imageUrl: '/icons/loan_users.svg',
		value: loanUsersValue ?? '2,453',
	},
	{
		label: 'Users with Savings',
		imageUrl: '/icons/savings_user.svg',
		value: savingsUsersValue ?? '2,453',
	},
];

export default function Users() {
	/**
	 |--------------------------------------------------
	 | Components states
	 |--------------------------------------------------
	 */
	const [defaultTableLimit] = React.useState<number>(10);
	const [users, setUsers] = React.useState<UserData[]>([]);
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [filterString, setFilterString] = React.useState<string>('');
	const [showTableFilter, setShowTableFilter] = React.useState<boolean>(false);
	const [selectedUser, setSelectedUser] = React.useState<UserData | null>(null);

	/**
	|--------------------------------------------------
	| Custom hooks
	|--------------------------------------------------
	*/
	const popoverRef = useClickOutside(() => setSelectedUser(null));
	const tableFilterRef = useClickOutside(() => setShowTableFilter(false));

	/**
	|--------------------------------------------------
	| Recalculating the starting point and threshold
	|--------------------------------------------------
	*/
	const startingPoint = (currentPage - 1) * defaultTableLimit;
	const threshold = startingPoint + defaultTableLimit;

	/**
	|--------------------------------------------------
	| Userdata after applying filters
	|--------------------------------------------------
	*/
	const userData = React.useMemo(() => getFilteredUsers(users, filterString), [filterString, users]) as UserData[];

	/**
	|--------------------------------------------------
	| Effect to fetch the data
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);

				/**
				|--------------------------------------------------
				| api call to fetch the data
				|--------------------------------------------------
				*/
				const response = await fetcher<UserData[]>('/templates/KS7lQu3R3WH8/data');
				setUsers(response);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	/**
	|--------------------------------------------------
	| Loading state
	|--------------------------------------------------
	*/
	if (isLoading) {
		return (
			<div className={clsx(styles['loading-state'])}>
				<LoaderCircle className={clsx(styles['spin'])} size={48} />
			</div>
		);
	}

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div className={clsx(styles['user-main-page'])}>
			{/**
			|--------------------------------------------------
			| Header
			|--------------------------------------------------
			*/}
			<h1>Users</h1>

			{/**
			|--------------------------------------------------
			| Overview
			|--------------------------------------------------
			*/}
			<div className={clsx(styles['overview'])}>
				{_OVERVIEW_DATA({
					userValue: users.length,
					activeUserValue:
						users.filter((data) => data.education_and_employment.employment_status === 'active').length ??
						0,
					loanUsersValue:
						users.filter((data) => data.education_and_employment.loan_repayment > 0).length ?? 0,
					savingsUsersValue:
						users.filter((data) => data.education_and_employment.loan_repayment <= 0).length ?? 0,
				}).map((item) => (
					<div key={item.label} className={clsx(styles['overview-item'])}>
						<Image src={item.imageUrl} alt={item.label} width={40} height={40} />
						<span className={clsx(styles['overview-item-label'])}>{item.label}</span>
						<span className={clsx(styles['overview-item-value'])}>{item.value.toLocaleString()}</span>
					</div>
				))}
			</div>

			<div>
				{/**
				|--------------------------------------------------
				| Table
				|--------------------------------------------------
				*/}
				<div className={clsx(styles['table-wrapper'])}>
					<table style={{ width: '100%', borderCollapse: 'collapse' }}>
						{/**
						|--------------------------------------------------
						| Talbe head
						|--------------------------------------------------
						*/}
						<TableHeader
							useIcons
							onIconClick={() => setShowTableFilter(true)}
							headers={[
								'organization',
								'Username',
								'Email',
								'Phone number',
								'Date joined',
								'Status',
								' ',
							]}
						/>

						{/**
						|--------------------------------------------------
						| Table body
						|--------------------------------------------------
						*/}
						<tbody>
							{userData?.slice(startingPoint, threshold).map((user) => (
								<TableRow key={user.personal_information.bvn}>
									{/**
									|--------------------------------------------------
									| Organization
									|--------------------------------------------------
									*/}
									<td>{user?.education_and_employment?.organization}</td>

									{/**
									|--------------------------------------------------
									| Full name
									|--------------------------------------------------
									*/}
									<td>{user?.personal_information?.full_name}</td>

									{/**
									|--------------------------------------------------
									| Email address
									|--------------------------------------------------
									*/}
									<td>{user?.personal_information?.email_address}</td>

									{/**
									|--------------------------------------------------
									| Phone number
									|--------------------------------------------------
									*/}
									<td>{user?.personal_information?.phone_number}</td>

									{/**
									|--------------------------------------------------
									| Date joined
									|--------------------------------------------------
									*/}
									<td>
										{dayjs(user?.education_and_employment?.date_joined).format(
											'MMM DD, YYYY HH:MMA'
										)}
									</td>

									{/**
									|--------------------------------------------------
									| Status
									|--------------------------------------------------
									*/}
									<td>
										<StatusBadge
											status={
												user?.education_and_employment?.employment_status as
													| 'inactive'
													| 'active'
													| 'pending'
													| 'blacklisted'
											}
										/>
									</td>

									{/**
									|--------------------------------------------------
									| Options
									|--------------------------------------------------
									*/}
									<td className={clsx(styles['table-option'])}>
										<button
											type="button"
											className={clsx(styles['options'])}
											onClick={() => setSelectedUser(user)}
										>
											<Image
												width={20}
												height={20}
												alt="options"
												src="/icons/options.svg"
												style={{ pointerEvents: 'none' }}
											/>

											{/**
											|--------------------------------------------------
											| Popover
											|--------------------------------------------------
											*/}
											{selectedUser?.personal_information?.bvn ===
												user.personal_information.bvn && (
												<div
													className={clsx(styles['popover'])}
													ref={popoverRef as Ref<HTMLDivElement> | undefined}
												>
													{/**
													|--------------------------------------------------
													| View user
													|--------------------------------------------------
													*/}
													<Link
														onClick={() =>
															localStorage.setItem('user', JSON.stringify(user))
														}
														href={`/dashboard/users/${user?.personal_information?.email_address}`}
													>
														<Image
															width={16}
															height={16}
															alt="view-eye"
															src="/icons/view.svg"
														/>
														View Details
													</Link>

													{/**
													|--------------------------------------------------
													| Blacklist user
													|--------------------------------------------------
													*/}
													<Button className={clsx(styles['option-button'])}>
														<Image
															width={16}
															height={16}
															alt="view-eye"
															src="/icons/blacklist.svg"
														/>
														Blacklist User
													</Button>

													{/**
													|--------------------------------------------------
													| Activate user
													|--------------------------------------------------
													*/}
													<Button className={clsx(styles['option-button'])}>
														<Image
															width={16}
															height={16}
															alt="view-eye"
															src="/icons/activate.svg"
														/>
														Activate User
													</Button>
												</div>
											)}
										</button>
									</td>
								</TableRow>
							))}
						</tbody>

						{/**
						|--------------------------------------------------
						| Filter modal
						|--------------------------------------------------
						*/}
						{showTableFilter && (
							<div ref={tableFilterRef as Ref<HTMLDivElement> | undefined}>
								<TableFilter
									onReset={() => setFilterString('')}
									onFilter={(formState) => {
										setShowTableFilter(false);
										const stringValues = Object.values(formState)
											?.map((item) => item.toLowerCase())
											.join('');
										setFilterString(stringValues);
									}}
								/>
							</div>
						)}
					</table>
				</div>

				{/**
				|--------------------------------------------------
				| Pagination
				|--------------------------------------------------
				*/}
				<Pagination
					currentPage={currentPage}
					limit={defaultTableLimit}
					totalItems={userData.length}
					onPageChange={(value) => setCurrentPage(value as number)}
					totalPages={Math.ceil(userData.length / defaultTableLimit)}
				/>
			</div>
		</div>
	);
}
