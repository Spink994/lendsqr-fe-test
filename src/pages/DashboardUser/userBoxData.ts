import Active_Users from "../../assets/svg/active_users.svg";
import Total_Users from "../../assets/svg/total_users.svg";
import Users_With_Loans from "../../assets/svg/users_with_loans.svg";
import Users_With_Savings from "../../assets/svg/users_with_savings.svg";

export interface IUserProps {
  icon: string;
  label: string;
  figure: number;
}

export default {
  data: [
    {
      icon: Total_Users,
      label: "Users",
      figure: 2453,
    },
    {
      icon: Active_Users,
      label: "Active Users",
      figure: 2453,
    },
    {
      icon: Users_With_Loans,
      label: "Users with Loans",
      figure: 12453,
    },
    {
      icon: Users_With_Savings,
      label: "Users with Savings",
      figure: 102453,
    },
  ],
};
