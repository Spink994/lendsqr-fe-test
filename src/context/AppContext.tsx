import { IUserDataProps } from "../@types/data";
import { apiClient, HttpMethods } from "../api/apiClient";
import React, { useContext, createContext, useState, useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

type AppContextType = {
  hideSideBar: boolean;
  setHideSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
  userData: IUserDataProps[];
  total_number_of_pages: number;
  isLoading: boolean;
};

export enum LocalStorage {
  USER_DATA = "MODIFIED_USER_DATA",
}

export enum StatusType {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  BLACKLISTED = "blacklisted",
}

interface IModifiedUserDataProps extends IUserDataProps {
  status: StatusType;
}

const SidebarContext = createContext<AppContextType | null>(null);

export default function SidebarProvider({ children }: IProps) {
  const [hideSideBar, setHideSideBar] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IModifiedUserDataProps[]>([]);
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(() => {
    const check_local_storage_for_modified_data = localStorage.getItem(
      LocalStorage.USER_DATA
    );

    if (check_local_storage_for_modified_data) {
      setUserData(JSON.parse(check_local_storage_for_modified_data));
      return;
    } else {
      setIsLoading(true);
      apiClient(HttpMethods.GET, "/users")
        .then((res: IModifiedUserDataProps[]) => {
          // modifying the user data to add the status
          const modified_data = res.map((data) => ({
            ...data,
            status: StatusType.INACTIVE,
          }));

          // Storing the modified data to the localstorage
          localStorage.setItem(
            LocalStorage.USER_DATA,
            JSON.stringify(modified_data)
          );
        })
        .then(() => {
          // Checking if the modified data is in the local storage
          const check_local_storage_for_modified_data = localStorage.getItem(
            LocalStorage.USER_DATA
          );

          if (check_local_storage_for_modified_data)
            setUserData(JSON.parse(check_local_storage_for_modified_data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [rerender]);

  const total_number_of_pages = userData.length / 10;

  const provisions = {
    hideSideBar,
    setHideSideBar,
    userData,
    total_number_of_pages,
    LocalStorage,
    isLoading,
    setRerender,
    rerender,
  };

  return (
    <SidebarContext.Provider value={provisions}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useAppContext = () => useContext(SidebarContext);
