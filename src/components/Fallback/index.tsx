import Spinner from "../../components/Spinner";

export default function Fallback() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "relative",
      }}
    >
      <Spinner />
    </div>
  );
}
