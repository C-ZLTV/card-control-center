import { useState } from "react";
import { Pagination, TextInput, Select, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import type { CardFilters, CardStatus } from "../../types/card";
import { CardStatuses } from "../../constants/card";
import "./DashboardPage.css";
import { CardList } from "../../components/data-display/CardList/CardList";
import { CardsTable } from "../../components/data-display/CardsTable/CardsTable";

import { useCards } from "../../hooks/api/useCards";
import { useMediaQuery } from "@mantine/hooks";

export function DashboardPage() {
  const statusList: (CardStatus | "all")[] = ["all", ...Object.values(CardStatuses)];

  const baseFilters: CardFilters = {
    branchCode: "",
    status: statusList[0],
    startExpirationDate: "",
    endExpirationDate: "",
    startActivationDate: "",
    endActivationDate: "",
    cardId: "",
  };

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<CardFilters>(baseFilters);
  const [appliedFilters, setAppliedFilters] = useState<CardFilters>(baseFilters);

  const limit = 10;

  const { data, isLoading, isError } = useCards({
    page,
    limit,
    filters: appliedFilters,
  });

  const cards = data?.cards ?? [];

  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  const isMobile = useMediaQuery("(max-width: 768px)");

  function updateFilter<Filter extends keyof CardFilters>(key: Filter, value: CardFilters[Filter]) {
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

  function handleSearch() {
    setPage(1);
    setAppliedFilters(filters);
  }

  function handleClearFilters() {
    setFilters(baseFilters);
    setAppliedFilters(baseFilters);
    setPage(1);
  }

  return (
    <>
      <h1 className="title">Lista carte</h1>

      <div className="dashboard__filters">
        <TextInput
          label="Carta"
          placeholder="Carta"
          value={filters.cardId}
          onChange={(e) => updateFilter("cardId", e.target.value)}
        />

        <TextInput
          label="Codice Filiale"
          placeholder="Codice Filiale"
          value={filters.branchCode}
          onChange={(e) => updateFilter("branchCode", e.target.value)}
        />

        <Select
          label="Status"
          placeholder="Pick a status"
          value={filters.status}
          data={statusList}
          onChange={(value) => updateFilter("status", value ?? "all")}
        />

        <DatePickerInput
          type="range"
          label="Range di Attivazione"
          placeholder="Range di Attivazione"
          value={[filters.startActivationDate ?? null, filters.endActivationDate ?? null]}
          onChange={(value) => onDateChange(value, "Activation")}
        />

        <DatePickerInput
          type="range"
          label="Range di Scadenza"
          placeholder="Range di Scadenza"
          value={[filters.startExpirationDate ?? null, filters.endExpirationDate ?? null]}
          onChange={(value) => onDateChange(value, "Expiration")}
        />
      </div>

      <div className="dashboard__filter-buttons">
        <Button variant="outline" onClick={handleClearFilters}>
          Clear Filters
        </Button>

        <Button variant="filled" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {isMobile ? (
        <CardList data={cards} isLoading={isLoading} responseError={isError} />
      ) : (
        <CardsTable data={cards} isLoading={isLoading} responseError={isError} />
      )}

      <div className="dashboard__pagination">
        <Pagination total={totalPages} value={page} onChange={setPage} color="var(--app-primary)" />
      </div>
    </>
  );
}
