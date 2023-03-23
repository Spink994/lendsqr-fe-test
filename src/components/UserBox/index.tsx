import { IUserProps } from "pages/DashboardUser/userBoxData";

export default function UserBox({ icon, figure, label }: IUserProps) {
  return (
    <div className="users_box">
      <img src={icon} alt={label} />
      <span>{label.toUpperCase()}</span>
      <span>{figure.toLocaleString()}</span>
    </div>
  );
}
