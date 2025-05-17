/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import Image from 'next/image';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import styles from '@/app/styles/components/TableHead.module.scss';

interface Props {
	headers: string[];
	useIcons?: boolean;
	onIconClick?: () => void;
}

export default function TableHeader({ headers, useIcons, onIconClick }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<thead>
			<tr className={clsx(styles['table-row'])}>
				{headers.map((title, index) => (
					<th key={title}>
						<div className={clsx(styles[''])}>
							{/**
							|--------------------------------------------------
							| Label
							|--------------------------------------------------
							*/}
							<span className={clsx(styles[''])}>{title}</span>

							{/**
							|--------------------------------------------------
							| If icons are enabled
							|--------------------------------------------------
							*/}
							{useIcons && index + 1 !== headers.length && (
								<button className={clsx(styles[''])} onClick={onIconClick}>
									<Image src="/icons/filter.svg" width={16} height={16} alt="filter" />
								</button>
							)}
						</div>
					</th>
				))}
			</tr>
		</thead>
	);
}
