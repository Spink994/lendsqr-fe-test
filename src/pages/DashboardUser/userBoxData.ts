import { useAppContext } from "../../context/AppContext";

import Active_Users from "../../assets/svg/active_users.svg";
import Total_Users from "../../assets/svg/total_users.svg";
import Users_With_Loans from "../../assets/svg/users_with_loans.svg";
import Users_With_Savings from "../../assets/svg/users_with_savings.svg";

export interface IUserProps {
  icon: string;
  label: string;
  figure: number | undefined;
}

export default {
  totalUser: {
    icon: Total_Users,
    label: "Users",
    figure: 2453,
  },
  activeUsers: {
    icon: Active_Users,
    label: "Active Users",
    figure: 2453,
  },
  usersWithLoans: {
    icon: Users_With_Loans,
    label: "Users with Loans",
    figure: 12453,
  },
  usersWithSavings: {
    icon: Users_With_Savings,
    label: "Users with Savings",
    figure: 102453,
  },
};
