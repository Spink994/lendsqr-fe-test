/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import styles from '@/app/styles/pages/dashboard.usersDetails.module.scss';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Tiny sub-component for the label/value pairs
|--------------------------------------------------
*/
export default function Field({ label, value }: { label: string; value: string | undefined }) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div className={clsx(styles['field'])}>
			<span className={clsx(styles['field__label'])}>{label}</span>
			<span className={clsx(styles['field__value'])}>{value}</span>
		</div>
	);
}
