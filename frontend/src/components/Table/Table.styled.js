import styled from "styled-components";

const TableEl = styled.table`
  border-collapse: collapse;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;

export { TableEl };
