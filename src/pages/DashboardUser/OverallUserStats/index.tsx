import { UserBox } from "../../../components";
import userBoxData from "../userBoxData";
import {
  IModifiedUserDataProps,
  LocalStorage,
  useAppContext,
} from "../../../context/AppContext";

type Props = {};

export default function OverallUserStats({}: Props) {
  const context = useAppContext();
  const count = JSON.parse(localStorage.getItem(LocalStorage.USER_DATA) || "");

  return (
    // The users Overall statistics - Total Users, Active Users ...

    <div className="users_box-information">
      <UserBox
        key={userBoxData.totalUser.label}
        icon={userBoxData.totalUser.icon}
        label={userBoxData.totalUser.label}
        figure={count.length}
      />
      <UserBox
        key={userBoxData.activeUsers.label}
        icon={userBoxData.activeUsers.icon}
        label={userBoxData.activeUsers.label}
        figure={context?.userData.filter((data) => data.status === "on").length}
      />
      <UserBox
        key={userBoxData.usersWithLoans.label}
        icon={userBoxData.usersWithLoans.icon}
        label={userBoxData.usersWithLoans.label}
        figure={
          count.filter(
            (data: IModifiedUserDataProps) =>
              Number(data.education?.loanRepayment) > 0
          ).length
        }
      />
      <UserBox
        key={userBoxData.usersWithSavings.label}
        icon={userBoxData.usersWithSavings.icon}
        label={userBoxData.usersWithSavings.label}
        figure={
          count.filter(
            (data: IModifiedUserDataProps) =>
              Number(data.accountBalance) -
                Number(data.education?.loanRepayment) >
              0
          ).length
        }
      />
    </div>
  );
}
