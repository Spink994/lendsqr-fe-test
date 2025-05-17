'use client';

/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Equal, Search, XIcon } from 'lucide-react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import Button from '@/app/components/Button';
import { useSidebar } from '@/app/context/SidebarContext';
import styles from '@/app/styles/layout/navbar.module.scss';

export default function TopNavigation() {
	/**
	|--------------------------------------------------
	| Custom hook(s)
	|--------------------------------------------------
	*/
	const { toggleSidebar, isSidebarOpen } = useSidebar();

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<nav className={clsx(styles['navbar'])}>
			{/**
            |--------------------------------------------------
            | Logo
            |--------------------------------------------------
            */}
			<div className={clsx(styles['logo-wrapper'])}>
				<Image
					width={174}
					height={36}
					alt="lendsqr-logo"
					src="/icons/logo.svg"
					className={clsx(styles['logo'])}
				/>
			</div>

			{/**
            |--------------------------------------------------
            | Other navigations
            |--------------------------------------------------
            */}
			<div className={clsx(styles['other-navigation-wrapper'])}>
				{/**
                |--------------------------------------------------
                | Input field
                |--------------------------------------------------
                */}
				<div className={clsx(styles['search-input-wrapper'])}>
					<input type="search" placeholder="Search for anything" className={clsx(styles['search-input'])} />
					<button type="button">
						<Search color="white" size={14} />
					</button>
				</div>

				{/**
                |--------------------------------------------------
                | Right navigation items
                |--------------------------------------------------
                */}
				<div className={clsx(styles['right-navigation-items-wrapper'])}>
					<Link href="#">Doc</Link>

					<Image alt="bell" width={26} height={26} src="/icons/bell.svg" className={clsx(styles['bell'])} />
					<Image
						alt="bell"
						width={48}
						height={48}
						src="/images/avatar.png"
						className={clsx(styles['avatar'])}
					/>

					{/**
                    |--------------------------------------------------
                    | User's name
                    |--------------------------------------------------
                    */}
					<span>Adedeji</span>

					<span>
						<Image src="/icons/caret_down.svg" alt="bell" width={20} height={20} />
					</span>
				</div>
			</div>

			{/**
			|--------------------------------------------------
			| Menu button
			|--------------------------------------------------
			*/}
			<Button onClick={toggleSidebar} className={clsx(styles['menu'])}>
				{isSidebarOpen ? <XIcon /> : <Equal />}
			</Button>
		</nav>
	);
}
