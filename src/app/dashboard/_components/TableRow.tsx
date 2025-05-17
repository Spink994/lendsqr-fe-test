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
import styles from '@/app/styles/components/TableRow.module.scss';

interface Props {
	children: React.ReactNode;
}

export default function TableRow({ children }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return <tr className={clsx(styles['table-row-wrapper'])}>{children}</tr>;
}
