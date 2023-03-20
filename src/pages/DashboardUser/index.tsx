import { ReactElement } from "react";
import { Layout, UserBox } from "../../components";

import userBoxData, { IUserProps } from "./userBoxData";

import Filter from "../../assets/icons/filter.svg";
import Options from "../../assets/icons/options.svg";
import Caret_Outline from "../../assets/icons/caret_outline.svg";

interface ITheader {
  label: string;
}

interface ITrow {
  organization?: string;
  username?: string;
  email?: string;
  phone_number?: string;
  date_joined?: string;
  status?: string;
}

export default function User() {
  return (
    <Layout>
      <section className="dashboard_main-view">
        <h1>Users</h1>

        {/* The users Overall statistics - Total Users, Active Users ... */}
        <div className="users_box-information">
          {userBoxData.data.map(
            (user: IUserProps, index: number): ReactElement => {
              return (
                <UserBox
                  key={index}
                  icon={user.icon}
                  label={user.label}
                  figure={user.figure}
                />
              );
            }
          )}
        </div>

        {/* The users table data */}
        <div className="users_information_container">
          <table className="users_table">
            {/* Table Head Section */}
            <thead>
              <tr>
                <Theader label="organization" />
                <Theader label="Username" />
                <Theader label="Email" />
                <Theader label="Phone number" />
                <Theader label="Date joined" />
                <Theader label="Status" />
              </tr>
            </thead>

            {/* Table Body Section */}
            <tbody>
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
              <TRow />
            </tbody>
          </table>

          {/* The pagination section  */}
        </div>
        <div className="pagination">
          <div className="showing">
            <span> Showing</span>
            <div>
              <select>
                <option>100</option>
              </select>
              <img src={Caret_Outline} alt="caret_down" />
            </div>
            <span>out of 100</span>
          </div>
          <div>
            <button>
              <img src={Caret_Outline} alt="caret_left" />
            </button>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>...</span>
            <span>100</span>
            <button>
              <img src={Caret_Outline} alt="caret_right" />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

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

function TRow({
  organization,
  username,
  phone_number,
  status,
  date_joined,
  email,
}: ITrow) {
  return (
    <tr className="table_row-body">
      <td>{organization ?? "Lendsqr"}</td>
      <td>{username ?? "Adedeji"}</td>
      <td>{email ?? "adedeji@lendsqr.com"}</td>
      <td>{phone_number ?? "08078903721"}</td>
      <td>{date_joined ?? "May 15, 2020 10:00 AM"}</td>
      <td>
        <div>
          <span className="pending_status">{status ?? "inactive"}</span>
          <button>
            <img src={Options} alt="options" />
          </button>
        </div>
      </td>
    </tr>
  );
}
