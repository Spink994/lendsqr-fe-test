import Burger from "../../components/Burger";
import {
  IModifiedUserDataProps,
  useAppContext,
} from "../../context/AppContext";

import Logo from "../../assets/svg/lendsqr_logo.svg";
import Profile_Avatar from "../../assets/svg/avatar.svg";
import Search from "../../assets/icons/search.svg";
import Bell from "../../assets/icons/bell.svg";
import Caret_Down_Fill from "../../assets/icons/caret_down_fill.svg";

import formData from "./formData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function DashboardHeader() {
  const context = useAppContext();
  const [searchValue, setSearchValue] = useState<string>("");

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchValue === "active") setSearchValue("on");
    if (searchValue === "inactive") setSearchValue("off");

    if (context?.setUserData) {
      const userDataAfterMutation = context.userData.filter((user) => {
        const userDataToSingleString = `${user.email}${user.userName}${user.phoneNumber}${user.orgName}${user.status}`;
        return userDataToSingleString
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase() as string);
      });

      context?.setUserData(userDataAfterMutation);
    }
  }

  return (
    <section className="dashboard_header">
      <img className="dashboard_header-logo" src={Logo} alt="lendsqr_logo" />
      <form onSubmit={handleSearch}>
        <input
          className="input_variant_2"
          name={formData.search.name}
          placeholder={formData.search.placeholder}
          required={formData.search.required}
          type={formData.search.type}
          onChange={(e) => {
            if (e.target.value === "")
              context?.setUserData(context.userDataBeforeMutation);
            setSearchValue(e.target.value);
          }}
        />
        <button type="submit">
          <img src={Search} alt="search" />
        </button>
      </form>
      <div className="dashboard_header-right">
        <Link className="docs" to="/docs">
          Docs
        </Link>

        <img src={Bell} alt="bell" />

        <div className="profile_avatar">
          <img src={Profile_Avatar} alt="avatar" />
          <span>Adedeji</span>
          <img src={Caret_Down_Fill} alt="caret" />
        </div>
      </div>
      {!context?.hideSideBar && <Burger />}
    </section>
  );
}
