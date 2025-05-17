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
import styles from '@/app/styles/pages/dashboard.users.module.scss';

export default function Users() {
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
			<h1 className={clsx(styles[''])}>Users</h1>
		</div>
	);
}
