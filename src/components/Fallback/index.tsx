import Spinner from "../../components/Spinner";

export default function Fallback() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        fontWeight: "400",
        fontSize: "14px",
        fontFamily: "Work sans",
      }}
    >
      <h1>Loading, Please wait...</h1>
    </div>
  );
}
