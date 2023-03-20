import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/svg/lendsqr_logo.svg";
import Caret from "../../assets/icons/caret_outline.svg";

import sidebarData from "./sidebarData";
import { useState } from "react";
import routes from "../../routes/routes.const";

interface Props {}

interface LinkProps {
  label: string;
  icon: string;
  route: string;
  option?: boolean;
  onClick?: () => void;
}

function Links({ label, icon, route, option, onClick }: LinkProps) {
  const [isActive] = useState<string>(window.location.pathname);

  return (
    <Link
      onClick={onClick}
      className={`sidebar_link ${isActive === route && "active_link"}`}
      to={route}
    >
      <img src={icon} alt={label} />
      {label} {option && <img src={Caret} alt="caret_icon" />}
    </Link>
  );
}

export default function Sidebar({}: Props) {
  const navigate = useNavigate();
  const [hideSideBar, setHideSideBar] = useState<boolean>(false);

  return (
    <aside className={`${hideSideBar && "hide"}`}>
      {/* The logo and the closing burger icon */}
      <div className="logo_and_burger_container">
        <img className="dashboard_logo" src={Logo} alt="lendsqr_logo" />
        {/* The toggle burger icons*/}
        <button
          onClick={() => setHideSideBar(!hideSideBar)}
          className="burger_icon"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* The sidebar icons */}
      {/* Link(s) under switch organisation */}
      <div style={{ marginBottom: "52px" }}>
        <Links
          icon={sidebarData.switch[0].icon}
          label={sidebarData.switch[0].label}
          option={sidebarData.switch[0].option}
          route="/organisation"
        />
      </div>

      {/* Link(s) under dashboard */}
      <div style={{ marginBottom: "41px" }}>
        <Links
          icon={sidebarData.dashboard[0].icon}
          label={sidebarData.dashboard[0].label}
          route={sidebarData.dashboard[0].route}
        />
      </div>

      {/* Links under customers */}
      <div style={{ marginBottom: "41px" }} className="customers">
        <h1>CUSTOMERS</h1>

        {sidebarData.customers.map((link: LinkProps, index: number) => (
          <Links
            key={index}
            icon={link.icon}
            label={link.label}
            route={link.route}
          />
        ))}
      </div>

      {/* Links under businesses */}
      <div style={{ marginBottom: "41px" }} className="businesses">
        <h1>Businesses</h1>

        {sidebarData.businesses.map((link: LinkProps, index: number) => (
          <Links
            key={index}
            icon={link.icon}
            label={link.label}
            route={link.route}
          />
        ))}
      </div>

      {/* Links under settings */}
      <div style={{ marginBottom: "41px" }} className="businesses">
        <h1>settings</h1>

        {sidebarData.settings.map((link: LinkProps, index: number) => (
          <Links
            key={index}
            icon={link.icon}
            label={link.label}
            route={link.route}
          />
        ))}
      </div>

      {/* Link(s) under logout */}
      <div
        style={{
          borderTop: "1px solid rgb(33, 63, 125, 0.1)",
        }}
      >
        <Links
          icon={sidebarData.logout[0].icon}
          label={sidebarData.logout[0].label}
          route={sidebarData.logout[0].route}
          onClick={() => navigate(routes.home)}
        />
      </div>

      <span className="version">v1.2.0</span>
    </aside>
  );
}
