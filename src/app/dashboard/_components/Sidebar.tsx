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
import { usePathname } from 'next/navigation';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { _SIDEBAR_DATA } from '../data/sidebar.data';
import { useSidebar } from '@/app/context/SidebarContext';
import styles from '@/app/styles/layout/sidebar.module.scss';

export default function Sidebar() {
	/**
    |--------------------------------------------------
    | Pathname getter
    |--------------------------------------------------
    */
	const pathname = usePathname();

	/**
	|--------------------------------------------------
	| Custom hook(s)
	|--------------------------------------------------
	*/
	const { isSidebarOpen } = useSidebar();

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<aside className={clsx(styles['sidebar'], isSidebarOpen && styles['sidebar--visible'])}>
			{/**
            |--------------------------------------------------
            | Switch organization
            |--------------------------------------------------
            */}
			<Link href="/dashboard/users" style={{ marginBottom: '24px' }}>
				<div className={clsx(styles['navigation-item'])}>
					<Image src="/images/briefcase.png" width={16} height={16} alt="briefcase" />
					<span>Switch Organization</span>
					<Image src="/icons/chevron_down.svg" width={16} height={16} alt="chevron" />
				</div>
			</Link>

			{/**
            |--------------------------------------------------
            | Dashboard
            |--------------------------------------------------
            */}
			<Link href="/dashboard/users" style={{ marginBottom: '24px' }}>
				<div className={clsx(styles['navigation-item'])}>
					<Image src="/images/home.png" width={16} height={16} alt="briefcase" />
					<span>Dashboard</span>
				</div>
			</Link>

			{/**
            |--------------------------------------------------
            | Main navigations
            |--------------------------------------------------
            */}
			<div className={clsx(styles['main-navigations'])}>
				{/**
                |--------------------------------------------------
                | Customers
                |--------------------------------------------------
                */}
				<div className={clsx(styles['customer'])}>
					<h1>CUSTOMERS</h1>

					{_SIDEBAR_DATA.CUSTOMERS.map((navItem) => (
						<Link
							key={navItem.label}
							href={navItem.route}
							style={navItem.label.toLowerCase() !== 'users' ? { pointerEvents: 'none' } : undefined}
						>
							<div
								className={clsx(
									styles['navigation-item'],
									pathname.toLowerCase().includes(navItem.route.toLowerCase()) && styles['isActive']
								)}
							>
								<Image src={navItem.imageUrl} width={16} height={16} alt={navItem.label} />
								<span>{navItem.label}</span>
							</div>
						</Link>
					))}
				</div>

				{/**
                |--------------------------------------------------
                | Business
                |--------------------------------------------------
                */}
				<div className={clsx(styles['business'])}>
					<h1>BUSINESSES</h1>

					{_SIDEBAR_DATA.BUSINESSES.map((navItem) => (
						<Link style={{ pointerEvents: 'none' }} href={navItem.route} key={navItem.label}>
							<div
								className={clsx(
									styles['navigation-item'],
									pathname.toLowerCase().includes(navItem.route.toLowerCase()) && styles['isActive']
								)}
							>
								<Image src={navItem.imageUrl} width={16} height={16} alt={navItem.label} />
								<span>{navItem.label}</span>
							</div>
						</Link>
					))}
				</div>

				{/**
                |--------------------------------------------------
                | Settings
                |--------------------------------------------------
                */}
				<div className={clsx(styles['settings'])}>
					<h1>SETTINGS</h1>

					{_SIDEBAR_DATA.SETTINGS.map((navItem) => (
						<Link style={{ pointerEvents: 'none' }} href={navItem.route} key={navItem.label}>
							<div
								className={clsx(
									styles['navigation-item'],
									pathname.toLowerCase().includes(navItem.route.toLowerCase()) && styles['isActive']
								)}
							>
								<Image src={navItem.imageUrl} width={16} height={16} alt={navItem.label} />
								<span>{navItem.label}</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</aside>
	);
}
