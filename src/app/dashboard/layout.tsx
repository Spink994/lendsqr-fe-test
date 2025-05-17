/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import Sidebar from './_components/Sidebar';
import styles from '../styles/layout/main.module.scss';
import TopNavigation from './_components/TopNavigation';
import { SidebarProvider } from '../context/SidebarContext';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return (
		<div className={`${styles['main']}`}>
			<SidebarProvider>
				{/**
				|--------------------------------------------------
				| Top navigation
				|--------------------------------------------------
				*/}
				<TopNavigation />

				{/**
				|--------------------------------------------------
				| Children
				|--------------------------------------------------
				*/}
				<main className={`${styles['']}`}>
					{/**
					|--------------------------------------------------
					| Sidebar
					|--------------------------------------------------
					*/}
					<Sidebar />

					{/**
					|--------------------------------------------------
					| Children
					|--------------------------------------------------
					*/}
					<div className={`${styles['children']}`}>{children}</div>
				</main>
			</SidebarProvider>
		</div>
	);
}
