import { useState } from "react";

import { Button, Card as CardComponent, Modal, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import "./CardList.css";
import type { Card } from "../../../types/card";
import { Link } from "react-router-dom";
import { routes } from "../../../app/navigation";

import { CardNetworkLogo } from "../CardNetworkLogo/CardNetworkLogo";
import { StatusItem } from "../StatusItem/StatusItem";
import { CardDetail } from "../CardDetail/CardDetail";
import { ServiceError } from "../../feeback/ServiceError/ServiceError";
import { ServiceEmpty } from "../../feeback/ServiceEmpty/ServiceEmpty";

export function CardList({
  data,
  isLoading,
  responseError,
}: {
  data: Card[];
  isLoading: boolean;
  responseError: boolean;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [card, setCard] = useState<Card>();

  function onOpenDetail(card: Card) {
    setCard(card);
    open();
  }

  if (isLoading) {
    const PAGE_SIZE = 10;

    const emptyCards = Array.from({ length: PAGE_SIZE }, (_, index) => (
      <CardComponent key={`skeleton-${index}`} className="card" shadow="sm" padding="lg" withBorder>
        <Skeleton height={30} radius="md" />
        <Skeleton height={30} mt={6} radius="md" />
        <Skeleton height={30} mt={30} radius="md" />
        <Skeleton height={30} mt={6} radius="md" />
        <Skeleton height={30} mt={30} radius="md" />
      </CardComponent>
    ));
    return <>{emptyCards}</>;
  }

  if (responseError) {
    return <ServiceError message="Non è stato possibile recuperare la lista Carte." withIcon />;
  }

  if (data.length === 0) {
    return (
      <ServiceEmpty
        message="Non sono state trovate carte che corrispondono ai criteri selezionati."
        withIcon
      />
    );
  }

  return (
    <>
      {data.map((card: Card) => {
        return (
          <CardComponent className="card" shadow="sm" padding="lg" withBorder>
            <div className="card__header">
              <div>
                <div>{card.customerName}</div>
                <Link className="table__redirect-link" to={routes.TRANSACTIONS}>
                  {card.last4}
                </Link>
              </div>
              <CardNetworkLogo cardNetwork={card.cardNetwork} />
            </div>

            <div>Branch code: {card.branchCode}</div>
            <div className="card__status">
              <div>Status: </div>
              <StatusItem status={card.cardStatus} />
            </div>
            <div>Activation date: {card.activationDate}</div>
            <div>Expiration date: {card.expirationDate}</div>

            <Button mt="md" variant="outline" onClick={() => onOpenDetail(card)}>
              Details
            </Button>
          </CardComponent>
        );
      })}
      <Modal opened={opened} onClose={close} title="Card Details">
        {card && <CardDetail card={card} />}
      </Modal>
    </>
  );
}
