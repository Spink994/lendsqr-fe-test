import { Spinner } from "../../components";

interface Props {
  classes?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  label: string;
  type?: "submit" | "button";
}

export function Button({
  classes,
  onClick,
  disabled,
  loading,
  label,
  type,
}: Props) {
  return (
    <button
      type={type}
      className={`${classes}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <Spinner /> : label}
    </button>
  );
}
