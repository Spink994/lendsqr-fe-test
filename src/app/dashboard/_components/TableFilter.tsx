/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { ChevronDown } from 'lucide-react';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import styles from '@/app/styles/components/TableFilter.module.scss';

/**
|--------------------------------------------------
| Initial form state
|--------------------------------------------------
*/
const INITIAL_FORM_STATE = {
	date: '',
	email: '',
	status: '',
	username: '',
	phoneNumber: '',
	organisation: '',
};

/**
|--------------------------------------------------
| Interface for Props
|--------------------------------------------------
*/
interface Props {
	onReset?: () => void;
	onFilter: (formState: typeof INITIAL_FORM_STATE) => void;
}

export default function TableFilter({ onReset, onFilter }: Props) {
	/**
    |--------------------------------------------------
    | State
    |--------------------------------------------------
    */
	const [formState, setFormState] = React.useState<typeof INITIAL_FORM_STATE>(INITIAL_FORM_STATE);

	/**
    |--------------------------------------------------
    | Handle input change
    |--------------------------------------------------
    */
	const handleInputChange = (
		key: keyof typeof INITIAL_FORM_STATE,
		event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => {
		setFormState((prevState) => ({ ...prevState, [key]: event.target.value }));
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div className={clsx(styles['table-filter'])}>
			{/**
            |--------------------------------------------------
            | Organization
            |--------------------------------------------------
            */}
			<div className={clsx(styles['input-wrapper'])}>
				<span>Organization</span>
				<select value={formState.organisation} onChange={(event) => handleInputChange('organisation', event)}>
					{['', 'Lendsqr', 'Irorun'].map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>

				{/**
                |--------------------------------------------------
                | Custom icon
                |--------------------------------------------------
                */}
				<ChevronDown size={15} strokeWidth={3} className={clsx(styles['chevron'])} />
			</div>

			{/**
            |--------------------------------------------------
            | Username
            |--------------------------------------------------
            */}
			<div className={clsx(styles['input-wrapper'])}>
				<span>Username</span>
				<Input
					type="text"
					placeholder="User"
					value={formState.username}
					inputClassName={clsx(styles['input'])}
					onChange={(event) => handleInputChange('username', event)}
				/>
			</div>

			{/**
            |--------------------------------------------------
            | Email
            |--------------------------------------------------
            */}
			<div className={clsx(styles['input-wrapper'])}>
				<span>Email</span>
				<Input
					type="email"
					placeholder="Email"
					value={formState.email}
					inputClassName={clsx(styles['input'])}
					onChange={(event) => handleInputChange('email', event)}
				/>
			</div>

			{/**
            |--------------------------------------------------
            | Date
            |--------------------------------------------------
            */}
			<div className={clsx(styles['input-wrapper'])}>
				<span>Date</span>
				<Input
					type="date"
					placeholder="Date"
					value={formState.date}
					inputClassName={clsx(styles['input'])}
					onChange={(event) => handleInputChange('date', event)}
					style={{ color: '#545F7D', fontSize: '14px', fontWeight: '400' }}
				/>
			</div>

			{/**
            |--------------------------------------------------
            | Phone number
            |--------------------------------------------------
            */}
			<div className={clsx(styles['input-wrapper'])}>
				<span>Phone number</span>
				<Input
					type="text"
					placeholder="Phone number"
					value={formState.phoneNumber}
					inputClassName={clsx(styles['input'])}
					onChange={(event) => handleInputChange('phoneNumber', event)}
				/>
			</div>

			{/**
            |--------------------------------------------------
            | Status
            |--------------------------------------------------
            */}
			<div className={clsx(styles['input-wrapper'])}>
				<span>Status</span>
				<select value={formState.status} onChange={(event) => handleInputChange('status', event)}>
					{['', 'active', 'inactive', 'blacklisted', 'pending'].map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>

				{/**
                |--------------------------------------------------
                | Custom icon
                |--------------------------------------------------
                */}
				<ChevronDown size={15} strokeWidth={3} className={clsx(styles['chevron'])} />
			</div>

			{/**
            |--------------------------------------------------
            | Action buttons
            |--------------------------------------------------
            */}
			<div className={clsx(styles['action-button-wrapper'])}>
				<Button
					variant="outline"
					onClick={() => {
						setFormState(INITIAL_FORM_STATE);
						onReset?.();
					}}
					className={clsx(styles['reset'])}
				>
					Reset
				</Button>
				<Button
					variant="filled"
					className={clsx(styles['filter'])}
					onClick={() => {
						onFilter?.({
							...formState,
							date: formState.date !== '' ? dayjs(formState.date).format('MMM DD, YYYY') : '',
						});
					}}
				>
					Filter
				</Button>
			</div>
		</div>
	);
}
