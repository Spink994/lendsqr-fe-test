import React, { ReactNode } from "react";

// Function generates the pagination buttons and options to select rows pers page
export function generatePaginationItems(
  totalPages: number | undefined,
  setActivePage: React.Dispatch<React.SetStateAction<number>>,
  activePage: number,
  filteredDataLength: number
) {
  const buttonArray: ReactNode[] = [];
  const optionsArray: ReactNode[] = [];
  let button: ReactNode;
  let option: ReactNode;

  const totalToUse = filteredDataLength === 0 ? totalPages : filteredDataLength;

  if (totalToUse !== undefined)
    for (let pages = 1; pages < totalToUse + 1; pages++) {
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
