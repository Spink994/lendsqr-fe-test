import React, { useContext, createContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

type AppContextType = {
  hideSideBar: boolean;
  setHideSideBar: (hideSideBar: boolean) => void;
};

const SidebarContext = createContext<AppContextType | null>(null);

export default function SidebarProvider({ children }: IProps) {
  const [hideSideBar, setHideSideBar] = useState(false);

  const provisions = {
    hideSideBar,
    setHideSideBar,
  };

  return (
    <SidebarContext.Provider value={provisions}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useAppContext = () => useContext(SidebarContext);
