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
import generateNumberArray from '@/helper/generateNumbers';
import styles from '@/app/styles/components/Pagination.module.scss';

interface Props {
	limit: number;
	totalPages: number;
	totalItems: number;
	currentPage: number;
	onPageChange: (value?: number) => void;
}

export default function Pagination({ limit, totalPages, currentPage, totalItems, onPageChange }: Props) {
	/**
	|--------------------------------------------------
	| The total pages must be greater than this number
	| for the elipsis to show
	|--------------------------------------------------
	*/
	const pageNumberThreshold = totalPages > currentPage + 5 ? currentPage + 2 : currentPage + 5;

	/**
	|--------------------------------------------------
	| This is the starting point of the pages after the
	| elipsis
	|--------------------------------------------------
	*/
	const startingPointOfEndingPages = totalPages - 1;

	/**
	|--------------------------------------------------
	| This is the ending point of the pages after the
	| elipsis
	|--------------------------------------------------
	*/
	const endingPointOfEndingPages = totalPages;

	/**
	|--------------------------------------------------
	| This is the starting point for the page numbers
    | before the elipsis
	|--------------------------------------------------
	*/
	const startingPageNumberBeforeElipsis = currentPage + 5 < totalPages ? currentPage : currentPage - 4;

	/**
	|--------------------------------------------------
	| This is the threshold for the page numbers before
	| the elipsis
	|--------------------------------------------------
	*/
	const endingPageNumberBeforeElipsis = totalPages >= pageNumberThreshold ? pageNumberThreshold : totalPages;

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div className={clsx(styles['pagination'])}>
			{/**
            |--------------------------------------------------
            | Left side
            |--------------------------------------------------
            */}
			<div className={clsx(styles['pagination-left'])}>
				<span className={clsx(styles['showing'])}>Showing</span>

				<div className={clsx(styles['currently-showing'])}>
					<span>{totalItems > limit ? limit * currentPage : totalItems}</span>
				</div>

				<span className={clsx(styles['out-of'])}>out of {totalItems}</span>
			</div>

			{/**
            |--------------------------------------------------
            | Right side
            |--------------------------------------------------
            */}
			<div className={clsx(styles['pagination-right'])}>
				{/**
				|--------------------------------------------------
				| Previous button
				|--------------------------------------------------
				*/}
				<button
					className={clsx(styles['prev-btn'])}
					onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
				>
					<Image src="/icons/prev_btn.svg" width={20} height={20} alt="chevron-left" />
				</button>

				{/**
				|--------------------------------------------------
				| Selectable pages
				|--------------------------------------------------
				*/}
				{totalPages > 1 && (
					<div className={clsx(styles['pagination-page-wrapper'])}>
						<div className={clsx(styles['left'])}>
							{generateNumberArray(startingPageNumberBeforeElipsis, endingPageNumberBeforeElipsis).map(
								(_item, index) => (
									<button
										key={`pagination+${index}`}
										onClick={() => onPageChange(_item)}
										className={clsx(currentPage === _item ? styles['active'] : styles['inActive'])}
									>
										{_item}
									</button>
								)
							)}
						</div>

						{/**
						|--------------------------------------------------
						| Elipsis
						|--------------------------------------------------
						*/}
						{currentPage + 5 < totalPages && <span> ... </span>}

						{/**
						|--------------------------------------------------
						| Selectable pages
						|--------------------------------------------------
						*/}
						<div className={clsx(styles['right'])}>
							{pageNumberThreshold < totalPages &&
								generateNumberArray(startingPointOfEndingPages, endingPointOfEndingPages).map(
									(_item, index) => (
										<button
											key={`pagination+${index}`}
											onClick={() => onPageChange(_item)}
											className={clsx(
												currentPage === _item ? styles['active'] : styles['inActive']
											)}
										>
											{_item}
										</button>
									)
								)}
						</div>
					</div>
				)}

				{/**
				|--------------------------------------------------
				| Next button
				|--------------------------------------------------
				*/}
				<button
					className={clsx(styles['next-btn'])}
					onClick={() => currentPage !== totalPages && onPageChange(currentPage + 1)}
				>
					<Image src="/icons/next_btn.svg" width={20} height={20} alt="chevron-left" />
				</button>
			</div>
		</div>
	);
}
