import routes from "../../routes/routes.const";
import Home from "../../assets/icons/home.svg";
import Users from "../../assets/icons/users.svg";
import Guarantors from "../../assets/icons/guarantors.svg";
import Decision_Models from "../../assets/icons/decision_model.svg";
import Savings from "../../assets/icons/savings.svg";
import Loan_Requests from "../../assets/icons/loan_request.svg";
import Whitelist from "../../assets/icons/white_list.svg";
import Karma from "../../assets/icons/karma.svg";
import Briefcase from "../../assets/icons/brief_case.svg";
import Savings_Products from "../../assets/icons/savings_product.svg";
import Fees_and_Charges from "../../assets/icons/fees_and_charges.svg";
import Transactions from "../../assets/icons/transactions.svg";
import Services from "../../assets/icons/services.svg";
import Service_Account from "../../assets/icons/service_account.svg";
import Settlements from "../../assets/icons/settlements.svg";
import Reports from "../../assets/icons/reports.svg";
import Preferences from "../../assets/icons/preferences.svg";
import Fees_and_Pricing from "../../assets/icons/fees_and_pricing.svg";
import Audit_Logs from "../../assets/icons/audit_logs.svg";
import Systems_Messages from "../../assets/icons/system_messages.svg";
import Logout from "../../assets/icons/logout.svg";
import Loan from "../../assets/icons/loans.svg";

export default {
  switch: [
    {
      label: "Switch Organization",
      icon: Briefcase,
      option: true,
    },
  ],

  dashboard: [
    {
      label: "Dashboard",
      icon: Home,
      route: routes.dashboard,
    },
  ],

  customers: [
    {
      label: "Users",
      icon: Users,
      route: routes.users,
    },
    {
      label: "Guarantors",
      icon: Guarantors,
      route: routes.guarantors,
    },
    {
      label: "Loans",
      icon: Loan,
      route: routes.loans,
    },
    {
      label: "Decision Models",
      icon: Decision_Models,
      route: routes.decision_models,
    },
    {
      label: "Savings",
      icon: Savings,
      route: routes.savings,
    },
    {
      label: "Loan Requests",
      icon: Loan_Requests,
      route: routes.loan_requests,
    },
    {
      label: "Whitelist",
      icon: Whitelist,
      route: routes.whitelist,
    },
    {
      label: "Karma",
      icon: Karma,
      route: routes.karma,
    },
  ],

  businesses: [
    {
      label: "Organization",
      icon: Briefcase,
      route: routes.orgainization,
    },
    {
      label: "Loan Products",
      icon: Loan_Requests,
      route: routes.loan_products,
    },
    {
      label: "Savings Products",
      icon: Savings_Products,
      route: routes.savings_products,
    },
    {
      label: "Fees and Charges",
      icon: Fees_and_Charges,
      route: routes.fees_and_charges,
    },
    {
      label: "Transactions",
      icon: Transactions,
      route: routes.transactions,
    },
    {
      label: "Services",
      icon: Services,
      route: routes.services,
    },
    {
      label: "Service Account",
      icon: Service_Account,
      route: routes.service_account,
    },
    {
      label: "Settlements",
      icon: Settlements,
      route: routes.settlements,
    },
    {
      label: "Reports",
      icon: Reports,
      route: routes.reports,
    },
  ],

  settings: [
    {
      label: "Preferences",
      icon: Preferences,
      route: routes.preferences,
    },
    {
      label: "Fees and Pricing",
      icon: Fees_and_Pricing,
      route: routes.fees_and_pricing,
    },
    {
      label: "Audit Logs",
      icon: Audit_Logs,
      route: routes.audit_logs,
    },
    {
      label: "Systems Messages",
      icon: Systems_Messages,
      route: routes.systems_messages,
    },
  ],

  logout: [
    {
      label: "Logout",
      icon: Logout,
      route: routes.logout,
    },
  ],
};
