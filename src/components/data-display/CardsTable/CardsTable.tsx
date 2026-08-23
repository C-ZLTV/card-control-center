import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Loader, ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { Card } from "../../../types/card";
import { routes } from "../../../app/navigation";
import "./CardTable.css";
import { Ellipsis } from "lucide-react";
import { StatusItem } from "../StatusItem/StatusItem";
import { CardNetworkLogo } from "../CardNetworkLogo/CardNetworkLogo";
import { CardDetail } from "../CardDetail/CardDetail";

type NavigationItemProps = {
  data: Card[];
  isLoading: boolean;
};

export function CardsTable({ data, isLoading }: NavigationItemProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [card, setCard] = useState<Card>();

  const PAGE_SIZE = 10;

  const emptyRows = Array.from({ length: Math.max(0, PAGE_SIZE - data.length) }, (_, index) => (
    <Table.Tr key={`empty-${index}`}>
      <Table.Td className="table__empty-cell" colSpan={7} />
    </Table.Tr>
  ));

  const rows = data.map((element) => (
    <Table.Tr key={element.last4}>
      <Table.Td>
        <CardNetworkLogo cardNetwork={element.cardNetwork} />
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
        <ActionIcon onClick={() => onOpenDetail(element)} variant="outline">
          <Ellipsis />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  function onOpenDetail(card: Card) {
    setCard(card);
    open();
  }

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
        {card && <CardDetail card={card} />}
      </Modal>
    </>
  );
}
