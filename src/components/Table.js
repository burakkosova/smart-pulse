import "./Table.css";

const Table = ({ data, column }) => {
  return (
    <table>
      <thead>
        <tr>
          {column.map((item) => (
            <TableHeadItem item={item} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow item={item} column={column} />
        ))}
      </tbody>
    </table>
  );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;

const TableRow = ({ item, column }) => (
  <tr>
    {column.map((columnItem) => {
      if (columnItem.value === "date") {
        return (
          <td>
            {item[`${columnItem.value}`].toLocaleString(navigator.language, {
              hour12: false,
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </td>
        );
      } else if (columnItem.value === "amount") {
        return (
          <td>
            {new Intl.NumberFormat(navigator.language).format(
              item[`${columnItem.value}`]
            )}
          </td>
        );
      } else if (
        columnItem.value === "cost" ||
        columnItem.value === "average"
      ) {
        return (
          <td>
            {new Intl.NumberFormat(navigator.language, {
              style: "currency",
              currency: "TRY",
            }).format(item[`${columnItem.value}`])}
          </td>
        );
      } else {
        return <td>{item[`${columnItem.value}`]}</td>;
      }
    })}
  </tr>
);

export default Table;
