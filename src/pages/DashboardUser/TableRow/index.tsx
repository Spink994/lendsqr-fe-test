import React, { useState } from "react";
import OptionsModal from "../OptionsModal";

import Options from "../../../assets/icons/options.svg";
import { IModifiedUserDataProps } from "context/AppContext";

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
  filteredData: IModifiedUserDataProps[];
  setFilteredData: React.Dispatch<
    React.SetStateAction<IModifiedUserDataProps[]>
  >;
}

export default function TableRow({
  organization,
  username,
  phone_number,
  status,
  date_joined,
  email,
  index,
  rowsPerPage,
  id,
  setFilteredData,
}: ITableRow) {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  function handleShowOptions() {
    setShowOptions(!showOptions);
  }

  let newStatus: string;

  (function () {
    switch (status) {
      case "off":
        newStatus = "inactive";
        break;

      case "on":
        newStatus = "active";
        break;

      default:
        newStatus = status;
        break;
    }
  })();

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
          <span className={`${newStatus}`}>{newStatus}</span>
          {showOptions && (
            <OptionsModal
              setFilteredData={setFilteredData}
              id={id}
              handleShowOptions={handleShowOptions}
            />
          )}

          <button onClick={handleShowOptions} className="options_button">
            <img src={Options} alt="options" />
          </button>
        </div>
      </td>
    </tr>
  );
}
