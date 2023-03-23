import { IUserDataProps } from "../@types/data";
import { apiClient, HttpMethods } from "../api/apiClient";
import React, { useContext, createContext, useState, useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

export interface IFormDataProps {
  username: string;
  email: string;
  organisation: string;
  status: string;
  phone: string;
  date: string;
}

type AppContextType = {
  hideSideBar: boolean;
  setHideSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
  userData: IModifiedUserDataProps[];
  setUserData: React.Dispatch<React.SetStateAction<IModifiedUserDataProps[]>>;
  total_number_of_pages: number;
  isLoading: boolean;
  setFormData: React.Dispatch<React.SetStateAction<IFormDataProps>>;
  formData: IFormDataProps;
  setFilteredData: React.Dispatch<
    React.SetStateAction<IModifiedUserDataProps[]>
  >;
  filteredData: IModifiedUserDataProps[];
  userDataBeforeMutation: IModifiedUserDataProps[];
};

export enum LocalStorage {
  USER_DATA = "MODIFIED_USER_DATA",
}

export enum StatusType {
  ACTIVE = "on",
  INACTIVE = "off",
  PENDING = "pending",
  BLACKLISTED = "blacklisted",
}

export enum StatusTypeModified {
  ACTIVE = "on",
  INACTIVE = "off",
}

export interface IModifiedUserDataProps extends IUserDataProps {
  status: StatusType;
}

const SidebarContext = createContext<AppContextType | null>(null);

export default function SidebarProvider({ children }: IProps) {
  const [hideSideBar, setHideSideBar] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IModifiedUserDataProps[]>([]);
  const [filteredData, setFilteredData] = useState<IModifiedUserDataProps[]>(
    []
  );
  const [userDataBeforeMutation, setUserDataBeforeMutation] = useState<
    IModifiedUserDataProps[]
  >([]);

  const [rerender, setRerender] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormDataProps>({
    username: "",
    email: "",
    organisation: "",
    status: "",
    phone: "",
    date: "",
  });

  useEffect(() => {
    const check_local_storage_for_modified_data = localStorage.getItem(
      LocalStorage.USER_DATA
    );

    if (
      check_local_storage_for_modified_data &&
      JSON.parse(check_local_storage_for_modified_data).length > 99
    ) {
      setUserData(JSON.parse(check_local_storage_for_modified_data));
      setUserDataBeforeMutation(
        JSON.parse(check_local_storage_for_modified_data)
      );
      return;
    } else {
      setIsLoading(true);
      apiClient(HttpMethods.GET, "/users")
        .then((res: IModifiedUserDataProps[]) => {
          // modifying the user data to add the status
          const modified_data = res.map((data) => ({
            ...data,
            status: StatusTypeModified.INACTIVE,
            profile: {
              ...data.profile,
              maritalStatus: "single",
              bankName: "Guarantee Trust Bank",
              accountNumber: "0216337830",
              children: "none",
              typeOfResidence: "Parent's Apartment",
            },
            guarantor: {
              ...data.guarantor,
              email: "slowpacerapper@gmail.com",
              relationship: "cousin",
            },
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

          if (check_local_storage_for_modified_data) {
            setUserData(JSON.parse(check_local_storage_for_modified_data));
            setUserDataBeforeMutation(
              JSON.parse(check_local_storage_for_modified_data)
            );
            setIsLoading(false);
          }
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
    formData,
    setUserData,
    setFormData,
    filteredData,
    setFilteredData,
    userDataBeforeMutation,
  };

  return (
    <SidebarContext.Provider value={provisions}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useAppContext = () => useContext(SidebarContext);
