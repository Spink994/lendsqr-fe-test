import { useAppContext } from "../../context/AppContext";

export default function Burger() {
  const context = useAppContext();

  return (
    <button
      onClick={() => context?.setHideSideBar(!context.hideSideBar)}
      className="burger_icon"
    >
      <span />
      <span />
      <span />
    </button>
  );
}
