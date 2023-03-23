import Blacklist_User from "../../../assets/icons/blacklist_user.svg";
import Activate_User from "../../../assets/icons/activate_user.svg";
import View_Details from "../../../assets/icons/view_details.svg";

import {
  LocalStorage,
  StatusType,
  StatusTypeModified,
  useAppContext,
} from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

type OptionsModal = {
  handleShowOptions: () => void;
  id: string;
};

// Options Modal Component
export default function OptionsModal({ handleShowOptions, id }: OptionsModal) {
  const context = useAppContext();
  const navigate = useNavigate();

  // Function handles actions that are repeated in other functions
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

    // This closes the modal after taking an action
    handleShowOptions();
  }

  // This function activates the user
  function handleActivateUser(id: string) {
    handleRepeatedActions(StatusTypeModified.ACTIVE, id);
  }

  // This function blacklists a user
  function handleBlacklistUser(id: string) {
    handleRepeatedActions(StatusType.BLACKLISTED, id);
  }

  return (
    <div onMouseLeave={handleShowOptions} className="options">
      <span onClick={handleShowOptions} className="close">
        X
      </span>
      <button onClick={() => navigate(`/users/${id}#general_details`)}>
        <img src={View_Details} alt="view_details" />
        <span>View Details</span>{" "}
      </button>
      <button
        disabled={(context?.userData.length as number) < 100}
        onClick={() => handleBlacklistUser(id)}
      >
        <img src={Blacklist_User} alt="blacklist_user" />
        <span>Blacklist User</span>
      </button>
      <button
        disabled={(context?.userData.length as number) < 100}
        onClick={() => handleActivateUser(id)}
      >
        <img src={Activate_User} alt="activate_user" />
        <span>Activate User</span>
      </button>
    </div>
  );
}
