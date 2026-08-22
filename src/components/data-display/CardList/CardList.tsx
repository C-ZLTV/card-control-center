import { Button, Card as CardComponent, Modal, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import "./CardList.css";
import type { Card } from "../../../types/card";
import { Link } from "react-router-dom";
import { routes } from "../../../app/navigation";

import { CardNetworkLogo } from "../CardNetworkLogo/CardNetworkLogo";
import { StatusItem } from "../StatusItem/StatusItem";

export function CardList({ data, isLoading }: { data: Card[]; isLoading: boolean }) {
  const [opened, { open, close }] = useDisclosure(false);

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
  } else {
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

              <Button mt="md" variant="outline" onClick={open}>
                Details
              </Button>
            </CardComponent>
          );
        })}
        <Modal opened={opened} onClose={close} title="Card Details">
          Card
        </Modal>
      </>
    );
  }
}
