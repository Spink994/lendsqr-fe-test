import { useRef, useState } from "react";
import FilterModal from "../FilterModal";
import Theader from "../TableHeader";

import Caret_Outline from "../../../assets/icons/caret_outline.svg";
import {
  IModifiedUserDataProps,
  useAppContext,
} from "../../../context/AppContext";
import { generatePaginationItems } from "../../../utils/helperFunctions";
import TableRow from "../TableRow";

type Props = {};

export default function Table({}: Props) {
  const context = useAppContext();

  const [activePage, setActivePage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<IModifiedUserDataProps[]>(
    []
  );

  const paginationButtonContainer = useRef<HTMLDivElement | null>(null);
  const dataToSlice =
    filteredData.length === 0 ? context?.userData : filteredData;

  const count = context?.userData.length;
  const totalPages = count && count / rowsPerPage;

  // Slicing the userdata array to get only 10 users per page
  const calculatedRows = dataToSlice?.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  // Getting the button and options array for the pagination from the generate function
  const { buttonArray, optionsArray } = generatePaginationItems(
    totalPages,
    setActivePage,
    activePage,
    filteredData.length
  );

  return (
    <>
      {/* The users table data */}
      <div className="users_information_container">
        {/* The filter modal component */}
        {showFilterModal && (
          <FilterModal
            setFilteredData={setFilteredData}
            setShowFilterModal={setShowFilterModal}
          />
        )}

        <table className="users_table">
          {/* Table Head Section */}
          <thead>
            <tr onClick={() => setShowFilterModal(!showFilterModal)}>
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
              <TableRow
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
                filteredData={filteredData}
                setFilteredData={setFilteredData}
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
    </>
  );
}
