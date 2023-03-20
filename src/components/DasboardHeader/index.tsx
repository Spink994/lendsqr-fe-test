import Burger from "../../components/Burger";
import { useAppContext } from "../../context/AppContext";

import Logo from "../../assets/svg/lendsqr_logo.svg";
import Profile_Avatar from "../../assets/svg/avatar.svg";
import Search from "../../assets/icons/search.svg";
import Bell from "../../assets/icons/bell.svg";
import Caret_Down_Fill from "../../assets/icons/caret_down_fill.svg";

import formData from "./formData";
import { Link } from "react-router-dom";

export default function DashboardHeader() {
  const context = useAppContext();

  return (
    <section className="dashboard_header">
      <img className="dashboard_logo" src={Logo} alt="lendsqr_logo" />
      <form>
        <input
          className="input_variant_1"
          name={formData.search.name}
          placeholder={formData.search.placeholder}
          required={formData.search.required}
          type={formData.search.type}
        />
        <button>
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
      {context?.hideSideBar && <Burger />}
    </section>
  );
}
