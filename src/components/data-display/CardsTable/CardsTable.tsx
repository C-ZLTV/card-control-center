import { Link } from "react-router-dom";
import { Table, Loader } from "@mantine/core";
import type { Card } from "./card-types";
import { routes } from "../../../app/navigation";
import "./CardTable.css";

type NavigationItemProps = {
  data: Card[];
  isLoading: boolean;
};

export function CardsTable({ data, isLoading }: NavigationItemProps) {
  const PAGE_SIZE = 10;

  const emptyRows = Array.from({ length: Math.max(0, PAGE_SIZE - data.length) }, (_, index) => (
    <Table.Tr key={`empty-${index}`}>
      <Table.Td className="table__empty-cell" colSpan={7} />
    </Table.Tr>
  ));
  const rows = data.map((element) => (
    <Table.Tr key={element.last4}>
      <Table.Td>
        <Link to={routes.TRANSACTIONS}>{element.last4}</Link>
      </Table.Td>
      <Table.Td>{element.customerName}</Table.Td>
      <Table.Td>{element.branchCode}</Table.Td>
      <Table.Td>{element.cardNetwork}</Table.Td>
      <Table.Td>{element.cardStatus}</Table.Td>
      <Table.Td>{element.activationDate}</Table.Td>
      <Table.Td>{element.expirationDate}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className="table">
        {isLoading && <Loader className="table_loader" size="sm" />}
        <Table highlightOnHover highlightOnHoverColor="var(--app-surface)">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>PAN</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Branch</Table.Th>
              <Table.Th>Network</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Activation Date</Table.Th>
              <Table.Th>Expiration Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
            style={{
              opacity: isLoading ? 0.4 : 1,
              transition: "opacity 150ms ease",
            }}
          >
            {rows}
            {emptyRows}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}
