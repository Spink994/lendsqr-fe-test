import routes from "../../routes/routes.const";
import { Burger, Layout } from "../../components";
import { Link, useParams } from "react-router-dom";
import {
  IModifiedUserDataProps,
  LocalStorage,
  StatusType,
  StatusTypeModified,
  useAppContext,
} from "../../context/AppContext";

import Back_Arrow from "../../assets/icons/arrow_left.svg";
import Star_Filled from "../../assets/icons/star_fill.svg";
import Star_Outline from "../../assets/icons/star_outline.svg";
import Avatar from "../../assets/svg/user_avatar.svg";
import navLinkData from "./navLinkData";
import React, { useEffect, useState } from "react";

type Props = {};

export default function UserDetails({}: Props) {
  const params = useParams();
  const context = useAppContext();
  const [showPanel, setShowPanel] = useState(false);
  const [isBlackListing, setIsBlackListing] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [singleUserDetails, setSingleUserDetails] =
    useState<IModifiedUserDataProps>();

  const isActiveView = window.location.href.split("#")[1];

  // Function handles actions that are repeated in activating and blacklisting a user
  function handleRepeatedActions(statusType: string, id: string) {
    // Finds an item that matches given id and modifies its status
    const modifiedData = context?.userData.map((item) => {
      if (item.id === id) {
        return { ...item, status: statusType };
      }
      return item;
    });

    // Modifies the current data in the local storage to the modified data
    localStorage.setItem(LocalStorage.USER_DATA, JSON.stringify(modifiedData));

    // This is just a trick to cause the component to rerender in order to see the changes as they are being made
    // without having to refresh the page
    context?.setRerender(!context.rerender);
  }
  // This function activates the user
  function handleActivateUser(id: string) {
    setIsActivating(true);
    setTimeout(() => {
      handleRepeatedActions(StatusTypeModified.ACTIVE, id);
      setIsActivating(false);
      context?.setRerender(!context.rerender);
    }, 2000);
  }

  // This function blacklists a user
  function handleBlacklistUser(id: string) {
    setIsBlackListing(true);
    setTimeout(() => {
      handleRepeatedActions(StatusType.BLACKLISTED, id);
      setIsBlackListing(false);
      context?.setRerender(!context.rerender);
    }, 2000);
  }

  // Getting the data of a single user whose id matches the one clicked in the users table
  useEffect(() => {
    context?.setUserData(context.userDataBeforeMutation);

    if (params.userId)
      setSingleUserDetails(
        context?.userData.find((singleUser) => singleUser.id === params.userId)
      );
  }, [singleUserDetails, context?.userData, params.userId]);

  // Calculating the total monthly income
  const totalMonthlyIncome = singleUserDetails?.education?.monthlyIncome.reduce(
    (currentIncome, totalIncome) => Number(currentIncome) + Number(totalIncome)
  );

  // The length of the monthly income array
  const monthlyIncomeLength =
    singleUserDetails?.education?.monthlyIncome.length || 0;

  // Lowest monthly income
  const lowestMonthlyIncome =
    singleUserDetails &&
    Math.min(...(singleUserDetails?.education?.monthlyIncome as number[]));

  // highest monthly income
  const highestMonthlyIncome =
    singleUserDetails &&
    Math.max(...(singleUserDetails?.education?.monthlyIncome as number[]));

  return (
    <Layout>
      <section className="user_details_main">
        {/* Back to users button */}
        <Link className="back_to_users" to={routes.users}>
          <img src={Back_Arrow} alt="back_arrow" /> Back to Users
        </Link>

        {/* The user header with the buttons for blacklisting and activating users */}
        <div className="user_details-header">
          <h1>User Details</h1>
          <div>
            <button
              onClick={() => {
                if (singleUserDetails?.status === StatusType.BLACKLISTED)
                  return;
                handleBlacklistUser(params.userId as string);
              }}
            >
              {isBlackListing
                ? "Blacklisting User..."
                : singleUserDetails?.status === StatusType.BLACKLISTED
                ? "Blacklisted"
                : "Blacklist User"}
            </button>
            <button
              onClick={() => {
                if (
                  singleUserDetails?.status ===
                  (StatusTypeModified.ACTIVE as string)
                )
                  return;
                handleActivateUser(params.userId as string);
              }}
            >
              {isActivating
                ? "Activating User..."
                : singleUserDetails?.status ===
                  (StatusTypeModified.ACTIVE as string)
                ? "Activated"
                : "Activate User"}
            </button>
          </div>
        </div>

        {/* The Partial user information box */}
        <div className="partail_user_box">
          {/* users details */}
          <div className="users_details">
            {/* avatar and user's name */}
            <div className="avatar_and_username">
              <img
                src={singleUserDetails?.profile?.avatar || Avatar}
                alt="profile_avatar"
              />
              <div>
                <span>
                  {singleUserDetails?.profile?.lastName}{" "}
                  {singleUserDetails?.profile?.firstName}
                </span>
                <span>LSQ{singleUserDetails?.accountNumber}</span>
              </div>
            </div>

            {/* Tiers */}
            <div className="tiers">
              <span>User’s Tier</span>
              <div>
                <img src={Star_Filled} alt="filled_star" />
                <img src={Star_Outline} alt="filled_star" />
                <img src={Star_Outline} alt="filled_star" />
              </div>
            </div>

            {/* Bank details */}
            <div className="bank_details">
              <span>
                ₦{(totalMonthlyIncome / monthlyIncomeLength)?.toLocaleString()}
              </span>
              <span>
                {singleUserDetails?.profile?.accountNumber}/
                {singleUserDetails?.profile?.bankName}
              </span>
            </div>
          </div>

          {/* View Navigation Panel button - only shows on mobile */}
          <button onClick={() => setShowPanel(!showPanel)}>View Panel</button>

          {/* Navigation panel */}
          <div className={`navigation_panel ${showPanel && "show_panel"} `}>
            {navLinkData.map((navLink, index: number) => (
              <NavLink
                key={index}
                setShowPanel={setShowPanel}
                label={navLink.label}
                href={navLink.href}
              />
            ))}
          </div>
        </div>

        {/* Other Information Section */}
        <div className="other_information_details">
          {/* Personal Information */}
          <div
            id="general_details"
            className={`general_details_information ${
              isActiveView !== "general_details" && "hide-current_view"
            }`}
          >
            <div className="">
              <div className="personal_information_header">
                <h1>Personal Information</h1>
              </div>
              <div>
                <span>full Name</span>
                <span>
                  {singleUserDetails?.profile?.lastName}{" "}
                  {singleUserDetails?.profile?.firstName}
                </span>
              </div>
              <div>
                <span>Phone Number</span>
                <span>{singleUserDetails?.profile?.phoneNumber}</span>
              </div>
              <div>
                <span>Email Address</span>
                <span style={{ textTransform: "lowercase" }}>
                  {singleUserDetails?.email}
                </span>
              </div>
              <div>
                <span>Bvn</span>
                <span>{singleUserDetails?.profile?.phoneNumber}</span>
              </div>
              <div>
                <span>Gender</span>
                <span>{singleUserDetails?.profile?.gender}</span>
              </div>
              <div>
                <span>Marital status</span>
                <span>{singleUserDetails?.profile?.maritalStatus}</span>
              </div>
              <div>
                <span>Children</span>
                <span>{singleUserDetails?.profile?.children}</span>
              </div>
              <div>
                <span>Type of residence</span>
                <span>{singleUserDetails?.profile?.typeOfResidence}</span>
              </div>
            </div>

            {/* Education and Employment */}
            <div>
              <div className="education">
                <h1>Education and Employment</h1>
              </div>

              <div>
                <span>level of education</span>
                <span>{singleUserDetails?.education?.level}</span>
              </div>

              <div>
                <span>employment status</span>
                <span>{singleUserDetails?.education?.employmentStatus}</span>
              </div>
              <div>
                <span>sector of employment</span>
                <span>{singleUserDetails?.education?.sector}</span>
              </div>
              <div>
                <span>Duration of employment</span>
                <span>{singleUserDetails?.education?.duration}</span>
              </div>
              <div>
                <span>office email</span>
                <span style={{ textTransform: "lowercase" }}>
                  {singleUserDetails?.education?.officeEmail}
                </span>
              </div>
              <div>
                <span>Monthly income</span>
                <span>
                  {`₦${lowestMonthlyIncome?.toLocaleString()}`} -{" "}
                  {`₦${highestMonthlyIncome?.toLocaleString()}`}
                </span>
              </div>
              <div>
                <span>loan repayment</span>
                <span>{`₦${Number(
                  singleUserDetails?.education?.loanRepayment
                ).toLocaleString()}`}</span>
              </div>
            </div>

            {/* Socials */}
            <div>
              <div className="socials">
                <h1>Socials</h1>
              </div>

              <div>
                <span>Twitter</span>
                <span>{singleUserDetails?.socials?.twitter}</span>
              </div>
              <div>
                <span>Facebook</span>
                <span>{singleUserDetails?.socials?.facebook}</span>
              </div>
              <div>
                <span>Instagram</span>
                <span>{singleUserDetails?.socials?.instagram}</span>
              </div>
            </div>

            {/* Guarantor */}
            <div>
              <div className="guarantor">
                <h1>Guarantor</h1>
              </div>

              <div>
                <span>full Name</span>
                <span>
                  {singleUserDetails?.guarantor?.lastName}{" "}
                  {singleUserDetails?.guarantor?.firstName}
                </span>
              </div>

              <div>
                <span>Phone Number</span>
                <span>{singleUserDetails?.guarantor?.phoneNumber}</span>
              </div>
              <div>
                <span>Email Address</span>
                <span style={{ textTransform: "lowercase" }}>
                  {singleUserDetails?.guarantor?.email}
                </span>
              </div>
              <div>
                <span>Relationship</span>
                <span>{singleUserDetails?.guarantor?.relationship}</span>
              </div>
            </div>
          </div>
          <div
            id="documents"
            className={`general_details_information ${
              isActiveView !== "documents" && "hide-current_view"
            }`}
          >
            <h1>Documents</h1>
            <p>No Content</p>
          </div>
          <div
            id="bank_details"
            className={`general_details_information ${
              isActiveView !== "bank_details" && "hide-current_view"
            }`}
          >
            <h1>Bank Details</h1>
            <p>No Content</p>
          </div>
          <div
            id="loans"
            className={`general_details_information ${
              isActiveView !== "loans" && "hide-current_view"
            }`}
          >
            <h1>Loans</h1>
            <p>No Content</p>
          </div>
          <div
            id="savings"
            className={`general_details_information ${
              isActiveView !== "savings" && "hide-current_view"
            }`}
          >
            <h1>Savings</h1>
            <p>No Content</p>
          </div>
          <div
            id="app_and_systems"
            className={`general_details_information ${
              isActiveView !== "app_and_systems" && "hide-current_view"
            }`}
          >
            <h1>App and System</h1>
            <p>No Content</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Navigation Link Component

type NavLinkType = {
  label: string;
  href: string;
  setShowPanel: React.Dispatch<React.SetStateAction<boolean>>;
};

function NavLink({ label, href, setShowPanel }: NavLinkType) {
  const isActiveView = window.location.href.split("#")[1];

  return (
    <a
      onClick={() => setShowPanel(false)}
      className={`${isActiveView === href && "border_active"}`}
      href={`#${href}`}
    >
      {label}
    </a>
  );
}
