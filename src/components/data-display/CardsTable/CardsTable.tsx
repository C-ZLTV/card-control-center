import { Link } from "react-router-dom";
import { Table, Loader, ActionIcon, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { Card, CardStatus } from "./card-types";
import { routes } from "../../../app/navigation";
import "./CardTable.css";
import visaLogo from "../../../assets/images/visa-logo.webp";
import mastercardLogo from "../../../assets/images/mastercard-logo.webp";
import { Networks, statusColors } from "./card-variables";
import { Ellipsis } from "lucide-react";

type NavigationItemProps = {
  data: Card[];
  isLoading: boolean;
};

function StatusItem({ status }: { status: CardStatus }) {
  if (!status) {
    return;
  }

  const color = statusColors[status] ?? "var(--app-text-secondary)";

  return (
    <div className="table__status">
      <div
        aria-hidden="true"
        className="table__status-visual"
        style={{ backgroundColor: color }}
      ></div>
      {status}
      <div></div>
    </div>
  );
}

export function CardsTable({ data, isLoading }: NavigationItemProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const PAGE_SIZE = 10;

  const emptyRows = Array.from({ length: Math.max(0, PAGE_SIZE - data.length) }, (_, index) => (
    <Table.Tr key={`empty-${index}`}>
      <Table.Td className="table__empty-cell" colSpan={7} />
    </Table.Tr>
  ));

  const rows = data.map((element) => (
    <Table.Tr key={element.last4}>
      <Table.Td>
        <div className="table__network-icon">
          {element.cardNetwork === Networks.MASTERCARD ? (
            <img src={mastercardLogo} width={20} alt="Mastercard" />
          ) : (
            <img src={visaLogo} width={32} alt="Visa" />
          )}
        </div>
      </Table.Td>
      <Table.Td>
        <Link className="table__redirect-link" to={routes.TRANSACTIONS}>
          {element.last4}
        </Link>
      </Table.Td>
      <Table.Td>{element.customerName}</Table.Td>
      <Table.Td>{element.branchCode}</Table.Td>
      <Table.Td>
        <StatusItem status={element.cardStatus} />
      </Table.Td>
      <Table.Td>{element.activationDate}</Table.Td>
      <Table.Td>{element.expirationDate}</Table.Td>
      <Table.Td>
        <ActionIcon onClick={open} variant="outline">
          <Ellipsis />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className="table">
        {isLoading && <Loader className="table_loader" size="sm" />}
        <Table highlightOnHover highlightOnHoverColor="var(--app-surface)">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Network</Table.Th>
              <Table.Th>PAN</Table.Th>
              <Table.Th>Branch</Table.Th>
              <Table.Th>Customer</Table.Th>
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

      <Modal opened={opened} onClose={close} title="Card Details">
        Card
      </Modal>
    </>
  );
}
