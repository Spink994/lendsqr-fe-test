import React from "react";
import {
  IFormDataProps,
  LocalStorage,
  StatusType,
  StatusTypeModified,
  useAppContext,
} from "../../../context/AppContext";

import Caret_Outline from "../../../assets/icons/caret_outline.svg";
import Calendar from "../../../assets/icons/calendar.svg";
import { Button } from "../../../components";

type FilterModal = {
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// The filter options modal
export default function FilterModal({ setShowFilterModal }: FilterModal) {
  const context = useAppContext();

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { target } = e;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement
    )
      context?.setFormData((prevData) => ({
        ...prevData,
        [target.name]: target.value,
      }));
  }

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (context?.formData) {
      const { formData } = context;

      // Checking to see if all of the fields input are empty
      const formDataKeys = Object.keys(formData)
        .map((eachField) => formData[eachField as keyof IFormDataProps] === "")
        .every((value) => value === true);

      // Refusing to filter if all the fields are empty or close the modal
      if (formDataKeys) return;

      setShowFilterModal(false);
      handleFilterData();
    }
  }

  // Resetting the formData
  function handleReset() {
    context?.setFormData({
      username: "",
      email: "",
      phone: "",
      status: "",
      organisation: "",
      date: "",
    });

    context?.setUserData(context.userDataBeforeMutation);
    context?.setRerender(!context.rerender);
  }

  //   Refining the data to be used to filter the userData
  function RefineFilterOptions() {
    const filterOptionsToString = Object.values({ ...context?.formData })
      .join("")
      .replace(" ", "")
      .trim();

    return { filterOptionsToString };
  }

  // function to handle data filteration
  function handleFilterData() {
    if (context?.setUserData) {
      const { filterOptionsToString } = RefineFilterOptions();

      const userDataAfterMutation = context.userData.filter(
        (user) =>
          filterOptionsToString.includes(user.email) ||
          filterOptionsToString.includes(user.userName) ||
          filterOptionsToString.includes(user.phoneNumber) ||
          filterOptionsToString.includes(user.createdAt) ||
          filterOptionsToString.includes(user.status) ||
          filterOptionsToString.includes(user.orgName)
      );

      context?.setUserData(userDataAfterMutation);
    }
  }

  // Getting all the organisation name
  function getAllOrganisationName() {
    return context?.userData.map((user) => user.orgName);
  }

  const organisations = getAllOrganisationName();

  return (
    <div
      onClick={(e) => {
        const { target } = e;
        if (target instanceof HTMLElement) {
          if (target.className === "filter_modal_container")
            setShowFilterModal(false);
        }
      }}
      className="filter_modal_container"
    >
      <div className="filter_modal">
        <form onSubmit={handleSubmitForm}>
          {/* Organisation */}
          <label>
            <span>Organization</span>
            <div className="input_variant_3">
              <select
                onChange={handleInputChange}
                value={context?.formData.organisation}
                name="organisation"
                placeholder="Select"
              >
                <option>Select</option>
                {organisations &&
                  organisations.map((organisation: string, index: number) => (
                    <option key={index}>{organisation}</option>
                  ))}
              </select>
              <img src={Caret_Outline} alt="caret_down" />
            </div>
          </label>

          {/*  Username */}
          <label htmlFor="username">
            <span>Username</span>
            <input
              onChange={handleInputChange}
              value={context?.formData.username}
              className="input_variant_4"
              type="text"
              name="username"
              placeholder="User"
            />
          </label>

          {/*  Email */}
          <label htmlFor="email">
            <span>Email</span>
            <input
              onChange={handleInputChange}
              value={context?.formData.email}
              className="input_variant_4"
              type="email"
              name="email"
              placeholder="Email"
            />
          </label>

          {/*  Date */}
          <label className="date_label" htmlFor="date">
            <span>Date</span>
            <input
              onChange={handleInputChange}
              value={context?.formData.date}
              className="input_variant_4"
              type="date"
              name="date"
              placeholder="Date"
            />
            <img src={Calendar} alt="calendar" />
          </label>

          {/*  Phone Number */}
          <label htmlFor="phone">
            <span>Phone Number</span>
            <input
              onChange={handleInputChange}
              value={context?.formData.phone}
              className="input_variant_4"
              type="text"
              name="phone"
              placeholder="Phone Number"
            />
          </label>

          {/* Status */}
          <label>
            <span>Status</span>
            <div className="input_variant_3">
              <select
                onChange={handleInputChange}
                value={context?.formData.status}
                name="status"
                placeholder="Select"
              >
                <option>Select</option>
                <option value={StatusTypeModified.ACTIVE}>active</option>
                <option value={StatusType.BLACKLISTED}>
                  {StatusType.BLACKLISTED}
                </option>
                <option value={StatusTypeModified.INACTIVE}>inactive</option>
                <option value={StatusType.PENDING}>{StatusType.PENDING}</option>
              </select>
              <img src={Caret_Outline} alt="caret_down" />
            </div>
          </label>

          {/* Filter and Reset Buttons */}
          <div className="form_button_container">
            <Button
              onClick={handleReset}
              type="button"
              label="Reset"
              classes="btn_variant_3"
            />
            <Button type="submit" label="Filter" classes="btn_variant_2" />
          </div>
        </form>
      </div>
    </div>
  );
}
