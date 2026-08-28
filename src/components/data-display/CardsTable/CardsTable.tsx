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
import { ServiceError } from "../../feeback/ServiceError/ServiceError";
import { ServiceEmpty } from "../../feeback/ServiceEmpty/ServiceEmpty";

type NavigationItemProps = {
  data: Card[];
  isLoading: boolean;
  responseError: boolean;
};

export function CardsTable({ data, isLoading, responseError }: NavigationItemProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [card, setCard] = useState<Card>();

  const PAGE_SIZE = 10;

  const emptyRows = Array.from({ length: Math.max(0, PAGE_SIZE - data.length) }, (_, index) => (
    <Table.Tr key={`empty-${index}`}>
      <Table.Td className="table__empty-cell" colSpan={8} />
    </Table.Tr>
  ));

  const rows = data.map((element) => (
    <Table.Tr key={element.cardId.replace(/\D/g, "")}>
      <Table.Td>
        <CardNetworkLogo cardNetwork={element.cardNetwork} />
      </Table.Td>

      <Table.Td>
        <Link className="table__redirect-link" to={routes.TRANSACTIONS}>
          {element.cardId.replace(/\D/g, "")}
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
        <ActionIcon
          aria-label="Apri dettagli carta"
          onClick={() => onOpenDetail(element)}
          variant="outline"
        >
          <Ellipsis />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  function onOpenDetail(card: Card) {
    setCard(card);
    open();
  }

  if (responseError) {
    return <ServiceError message="Non è stato possibile recuperare la lista Carte." withIcon />;
  }

  if (!isLoading && data.length === 0) {
    return (
      <ServiceEmpty
        message="Non sono state trovate carte che corrispondono ai criteri selezionati."
        withIcon
      />
    );
  }

  return (
    <>
      <div className="table">
        {isLoading && <Loader className="table_loader" size="sm" />}

        <Table highlightOnHover highlightOnHoverColor="var(--app-surface)">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Circuito</Table.Th>
              <Table.Th>Carta</Table.Th>
              <Table.Th>Branch</Table.Th>
              <Table.Th>Cliente</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Data Attivazione</Table.Th>
              <Table.Th>Data Scadenza</Table.Th>
              <Table.Th />
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

      <Modal
        opened={opened}
        onClose={close}
        title="Dettagli Carta"
        closeButtonProps={{ "aria-label": "Close" }}
      >
        {card && <CardDetail card={card} closeModal={close} />}
      </Modal>
    </>
  );
}
