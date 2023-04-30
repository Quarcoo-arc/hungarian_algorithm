import React from "react";
import { TableEl } from "./Table.styled";

const Table = ({
  results,
  actualMatrix,
  rowHeading,
  colHeading,
  isProfitRelated,
}) => {
  return (
    <TableEl>
      <thead>
        <tr>
          <th>{rowHeading}</th>
          <th>{colHeading}</th>
          <th>{isProfitRelated ? "Profit" : "Cost"}</th>
        </tr>
      </thead>
      <tbody>
        {results.map((row, idx) => (
          <tr key={idx}>
            <td>{row[0] + 1}</td>
            <td>{row[1] + 1} </td>
            <td>{actualMatrix[row[0]][row[1]]}</td>
          </tr>
        ))}
      </tbody>
    </TableEl>
  );
};

export default Table;
