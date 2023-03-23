import Filter from "../../../assets/icons/filter.svg";

interface ITheader {
  label: string;
}

export default function Theader({ label }: ITheader) {
  return (
    <th className="user_table-headers">
      <div>
        {label}
        <img src={Filter} alt="filter" />
      </div>
    </th>
  );
}
