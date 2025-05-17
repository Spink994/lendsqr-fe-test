/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import styles from '@/app/styles/components/StatusBadge.module.scss';

interface Props {
	status: 'active' | 'blacklisted' | 'pending' | 'inactive';
}
export default function StatusBadge({ status }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return <span className={`${clsx(styles['status-badge'])} ${styles[status.toLowerCase()]}`}>{status}</span>;
}
