import React from "react";

import { IUserProps } from "../../pages/Dashboard/userBoxData";

export default function UserBox({ icon, figure, label }: IUserProps) {
  return (
    <div className="users_box">
      <img src={icon} alt={label} />
      <span>{label}</span>
      <span>{figure.toLocaleString()}</span>
    </div>
  );
}
