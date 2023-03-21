import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { Layout, UserBox } from "../../components";

import userBoxData, { IUserProps } from "./userBoxData";

import Filter from "../../assets/icons/filter.svg";
import Options from "../../assets/icons/options.svg";
import Caret_Outline from "../../assets/icons/caret_outline.svg";
import Blacklist_User from "../../assets/icons/blacklist_user.svg";
import Activate_User from "../../assets/icons/activate_user.svg";
import View_Details from "../../assets/icons/view_details.svg";

import {
  LocalStorage,
  StatusType,
  useAppContext,
} from "../../context/AppContext";

interface ITheader {
  label: string;
}

interface ITableRow {
  organization?: string;
  username?: string;
  email?: string;
  phone_number?: string;
  date_joined?: string;
  status: string;
  index: number;
  rowsPerPage: number;
  id: string;
}

export default function User() {
  const context = useAppContext();
  const [activePage, setActivePage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const paginationButtonContainer = useRef<HTMLDivElement | null>(null);

  const count = context?.userData.length;
  const totalPages = count && count / rowsPerPage;

  // Slicing the userdata array to get only 10 users per page
  const calculatedRows = context?.userData.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  // Function generates the pagination buttons and options to select rows pers page
  function generatePaginationButtons() {
    const buttonArray: ReactNode[] = [];
    const optionsArray: ReactNode[] = [];
    let button: ReactNode;
    let option: ReactNode;

    if (totalPages !== undefined)
      for (let pages = 1; pages < totalPages + 1; pages++) {
        button = (
          <span
            key={`button${pages}`}
            style={{
              cursor: "pointer",
              fontWeight: `${activePage === pages ? "700" : "400"}`,
            }}
            onClick={() => setActivePage(pages)}
          >
            {pages}
          </span>
        );

        option = <option key={`option${pages}`}>{pages * 10}</option>;

        optionsArray.push(option);
        buttonArray.push(button);
      }

    return { buttonArray, optionsArray };
  }

  // Getting the button array from the generate function
  const { buttonArray, optionsArray } = generatePaginationButtons();

  return (
    <section className="dashboard_main-view">
      <h1>Users</h1>

      {/* The users Overall statistics - Total Users, Active Users ... */}
      <div className="users_box-information">
        <UserBox
          key={userBoxData.totalUser.label}
          icon={userBoxData.totalUser.icon}
          label={userBoxData.totalUser.label}
          figure={count}
        />
        <UserBox
          key={userBoxData.activeUsers.label}
          icon={userBoxData.activeUsers.icon}
          label={userBoxData.activeUsers.label}
          figure={
            context?.userData.filter((data) => data.status === "active").length
          }
        />
        <UserBox
          key={userBoxData.usersWithLoans.label}
          icon={userBoxData.usersWithLoans.icon}
          label={userBoxData.usersWithLoans.label}
          figure={
            context?.userData.filter(
              (data) => Number(data.education?.loanRepayment) > 0
            ).length
          }
        />
        <UserBox
          key={userBoxData.usersWithSavings.label}
          icon={userBoxData.usersWithSavings.icon}
          label={userBoxData.usersWithSavings.label}
          figure={
            context?.userData.filter(
              (data) =>
                Number(data.accountBalance) -
                  Number(data.education?.loanRepayment) >
                0
            ).length
          }
        />
      </div>

      {/* The users table data */}
      <div className="users_information_container">
        <table className="users_table">
          {/* Table Head Section */}
          <thead>
            <tr>
              <Theader key="org" label="organization" />
              <Theader key="user" label="Username" />
              <Theader key="email" label="Email" />
              <Theader key="phone" label="Phone number" />
              <Theader key="date" label="Date joined" />
              <Theader key="status" label="Status" />
            </tr>
          </thead>

          {/* Table Body Section */}
          <tbody>
            {calculatedRows?.map((data, index: number) => (
              <TRow
                username={data.userName}
                date_joined={data.createdAt}
                email={data.email}
                key={`${data.id}${index}`}
                organization={data.orgName}
                phone_number={data.phoneNumber}
                status={data.status}
                index={index}
                rowsPerPage={rowsPerPage}
                id={data.id}
              />
            ))}
          </tbody>
        </table>

        {/* The pagination section  */}
      </div>
      <div className="pagination">
        {/* Select options */}
        <div className="showing">
          <span> Showing</span>
          <div>
            <select
              onChange={(e) => {
                setRowsPerPage(Number(e.currentTarget.value));
              }}
            >
              <option>{activePage * rowsPerPage}</option>
              {optionsArray.map((option) => option)}
            </select>
            <img src={Caret_Outline} alt="caret_down" />
          </div>
          <span>out of {count}</span>
        </div>

        {/* Pagination buttons */}
        <div className="pagination_container">
          {/* Previous Button */}
          <button
            disabled={activePage <= 1}
            onClick={() => {
              setActivePage(activePage - 1);
              paginationButtonContainer.current?.scrollBy({
                left: activePage <= 6 ? -80 : 0,
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <img src={Caret_Outline} alt="caret_left" />
          </button>

          {/* Buttons for each page  */}
          <div ref={paginationButtonContainer} className="pagination_buttons">
            {buttonArray.map((button) => button)}
          </div>

          {/* Next Button */}
          <button
            disabled={activePage === totalPages}
            onClick={() => {
              setActivePage(activePage + 1);
              paginationButtonContainer.current?.scrollBy({
                left: activePage >= 5 ? 80 : 0,
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <img src={Caret_Outline} alt="caret_right" />
          </button>
        </div>
      </div>
    </section>
  );
}

// The table header component
function Theader({ label }: ITheader) {
  return (
    <th className="user_table-headers">
      <div>
        {label}
        <img src={Filter} alt="filter" />
      </div>
    </th>
  );
}

// The table row component
function TRow({
  organization,
  username,
  phone_number,
  status,
  date_joined,
  email,
  index,
  rowsPerPage,
  id,
}: ITableRow) {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  function handleShowOptions() {
    setShowOptions(!showOptions);
  }

  return (
    <tr
      className={` ${
        index === rowsPerPage - 1 ? "border_bottom" : "table_row-body"
      }`}
    >
      <td>{organization ?? "Lendsqr"}</td>
      <td>{username ?? "Adedeji"}</td>
      <td>{email ?? "adedeji@lendsqr.com"}</td>
      <td>{phone_number ?? "08078903721"}</td>
      <td>{date_joined ?? "May 15, 2020 10:00 AM"}</td>
      <td>
        <div>
          <span className={`${status}`}>{status}</span>
          {showOptions && (
            <OptionsModal id={id} handleShowOptions={handleShowOptions} />
          )}

          <button onClick={handleShowOptions} className="options_button">
            <img src={Options} alt="options" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// The options modal type
type OptionsModal = {
  handleShowOptions: () => void;
  id: string;
};

// Options Modal Component
function OptionsModal({ handleShowOptions, id }: OptionsModal) {
  const context = useAppContext();

  // Function handles actions that are repeated in other functions
  function handleRepeatedActions(statusType: string, id: string) {
    // Finds an item that matches given id and modifies its state
    const modifiedData = context?.userData.map((item) => {
      if (item.id === id) {
        return { ...item, status: statusType };
      }
      return item;
    });

    // Modifies the current data in the local storage to the modified data
    localStorage.setItem(LocalStorage.USER_DATA, JSON.stringify(modifiedData));

    // This is just a trick to cause the component to rerender in order to see the changes as they are being made
    // without having to refresh the page
    context?.setRerender(!context.rerender);

    // This closes the modal after taking an action
    handleShowOptions();
  }

  // This function activates the user
  function handleActivateUser(id: string) {
    handleRepeatedActions(StatusType.ACTIVE, id);
  }

  // This function blacklists a user
  function handleBlacklistUser(id: string) {
    handleRepeatedActions(StatusType.BLACKLISTED, id);
  }

  return (
    <div onMouseLeave={handleShowOptions} className="options">
      <span onClick={handleShowOptions} className="close">
        X
      </span>
      <button>
        <img src={View_Details} alt="view_details" />
        <span>View Details</span>{" "}
      </button>
      <button onClick={() => handleBlacklistUser(id)}>
        <img src={Blacklist_User} alt="blacklist_user" />
        <span>Blacklist User</span>
      </button>
      <button onClick={() => handleActivateUser(id)}>
        <img src={Activate_User} alt="activate_user" />
        <span>Activate User</span>
      </button>
    </div>
  );
}
