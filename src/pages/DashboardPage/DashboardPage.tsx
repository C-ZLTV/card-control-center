import { useState, useEffect } from "react";
import { Pagination, LoadingOverlay, Box } from "@mantine/core";
import { CardsTable } from "../../components/data-display/CardsTable/CardsTable";
import cardData from "../../test/API/card-list.json";
import type { Card } from "../../components/data-display/CardsTable/card-types";

export function DashboardPage() {
  const [data, setData] = useState<Card[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 10;
  const totalPages = Math.ceil(Number(cardData.total) / limit);

  function paginate(data: Card[], limit: number, offset: number): Card[] {
    return data.slice(offset, offset + limit);
  }

  async function getData(page: number) {
    setIsLoading(true);

    const offset = (page - 1) * limit;
    await new Promise((resolve) => setTimeout(resolve, 500));
    const cards = paginate(cardData.cards as Card[], limit, offset);

    setData(cards);
    setIsLoading(false);
  }

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <>
      <h1>Dashboard</h1>

      <CardsTable data={data} isLoading={isLoading} />

      <Pagination total={totalPages} value={page} onChange={setPage} color="var(--app-primary)" />
    </>
  );
}
