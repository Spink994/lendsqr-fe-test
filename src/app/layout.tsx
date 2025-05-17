/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import './styles/globals.scss';

/**
|--------------------------------------------------
| Fonts
|--------------------------------------------------
*/
const workSans = Work_Sans({
	variable: '--font-work-sans',
	subsets: ['latin'],
});

/**
|--------------------------------------------------
| Meta information
|--------------------------------------------------
*/
export const metadata: Metadata = {
	title: 'Lendsqr dashboard',
	description: 'This is a lendsqr dashboard',
};

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
		<html lang="en">
			<body
				className={`${workSans.variable}`}
				style={{ maxHeight: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}
			>
				{children}
			</body>
		</html>
	);
}
