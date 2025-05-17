'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';

/**
|--------------------------------------------------
| Sidebar context types
|--------------------------------------------------
*/
interface SidebarContextType {
	isSidebarOpen: boolean;
	closeSidebar: () => void;
	toggleSidebar: () => void;
}

/**
|--------------------------------------------------
| Create context
|--------------------------------------------------
*/
const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

/**
|--------------------------------------------------
| Provider
|--------------------------------------------------
*/
export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

	/**
    |--------------------------------------------------
    | Functions
    |--------------------------------------------------
    */
	const closeSidebar = () => setIsSidebarOpen(false);
	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

	/**
    |--------------------------------------------------
    | Provider
    |--------------------------------------------------
    */
	return (
		<SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
};

/**
|--------------------------------------------------
| Hook to use sidebar context
|--------------------------------------------------
*/
export const useSidebar = () => {
	const context = React.useContext(SidebarContext);

	/**
    |--------------------------------------------------
    | Error handler
    |--------------------------------------------------
    */
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider');
	}

	/**
    |--------------------------------------------------
    | Returned context
    |--------------------------------------------------
    */
	return context;
};
