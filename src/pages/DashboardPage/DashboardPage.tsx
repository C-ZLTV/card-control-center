import { useState, useEffect } from "react";
import { Pagination, TextInput, Select, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import cardData from "../../test/API/card-list.json";
import type { Card, CardFilters, CardStatus } from "../../types/card";
import { CardStatuses } from "../../constants/card";
import "./DashboardPage.css";
import { CardList } from "../../components/data-display/CardList/CardList";
import { CardsTable } from "../../components/data-display/CardsTable/CardsTable";

export function DashboardPage() {
  const statusList: (CardStatus | "all")[] = ["all", ...Object.values(CardStatuses)];

  const baseFilters = {
    branchCode: "",
    status: statusList[0],
    startExpirationDate: "",
    endExpirationDate: "",
    startActivationDate: "",
    endActivationDate: "",
    pan: "",
  };

  const [data, setData] = useState<Card[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<CardFilters>(baseFilters);
  const limit = 10;
  const totalPages = Math.ceil(Number(cardData.total) / limit);

  function paginate(data: Card[], limit: number, offset: number): Card[] {
    return data.slice(offset, offset + limit);
  }

  function updateFilter<filter extends keyof CardFilters>(key: filter, value: CardFilters[filter]) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function onDateChange(
    value: [string | null, string | null],
    dateType: "Activation" | "Expiration",
  ) {
    const [startDate, endDate] = value;

    if (dateType === "Activation") {
      updateFilter("startActivationDate", startDate ?? "");
      updateFilter("endActivationDate", endDate ?? "");
    } else {
      updateFilter("startExpirationDate", startDate ?? "");
      updateFilter("endExpirationDate", endDate ?? "");
    }
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

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <>
      <h1 className="title">Dashboard</h1>

      <div className="dashboard__filters">
        <TextInput
          label="PAN"
          placeholder="PAN"
          value={filters.pan}
          onChange={(e) => updateFilter("pan", e.target.value)}
        />
        <TextInput
          label="Branch Code"
          placeholder="Branch Code"
          value={filters.branchCode}
          onChange={(e) => updateFilter("branchCode", e.target.value)}
        />
        <Select
          label="Status"
          placeholder="Pick a status"
          defaultValue={statusList[0]}
          value={filters.status}
          data={statusList}
          onChange={(value) => updateFilter("status", value ?? undefined)}
        />
        <DatePickerInput
          type="range"
          label="Activation range"
          placeholder="Activation range"
          value={[filters.startActivationDate ?? null, filters.endActivationDate ?? null]}
          onChange={(value) => onDateChange(value, "Activation")}
        />
        <DatePickerInput
          type="range"
          label="Expiration range"
          placeholder=" Expiration range"
          value={[filters.startExpirationDate ?? null, filters.endExpirationDate ?? null]}
          onChange={(value) => onDateChange(value, "Expiration")}
        />
      </div>
      <div className="dashboard__filter-buttons">
        <Button variant="outline" onClick={() => setFilters(baseFilters)}>
          Clear Filters
        </Button>
        <Button variant="filled">Search</Button>
      </div>

      <div className="dashboard__card-list">
        <CardList data={data} isLoading={isLoading} />
      </div>

      <div className="dashboard__table">
        <CardsTable data={data} isLoading={isLoading} />
      </div>

      <div className="dashboard__pagination">
        <Pagination total={totalPages} value={page} onChange={setPage} color="var(--app-primary)" />
      </div>
    </>
  );
}
