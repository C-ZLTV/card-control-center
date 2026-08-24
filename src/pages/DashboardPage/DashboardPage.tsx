import { useState, useEffect } from "react";
import { Pagination, TextInput, Select, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import type { Card, CardFilters, CardStatus } from "../../types/card";
import { CardStatuses } from "../../constants/card";
import "./DashboardPage.css";
import { CardList } from "../../components/data-display/CardList/CardList";
import { CardsTable } from "../../components/data-display/CardsTable/CardsTable";
import type { RequestStatus } from "../../types/request";
import { RequestStatuses } from "../../constants/request";

export function DashboardPage() {
  const statusList: (CardStatus | "all")[] = ["all", ...Object.values(CardStatuses)];

  const baseFilters: CardFilters = {
    branchCode: "",
    status: statusList[0],
    startExpirationDate: "",
    endExpirationDate: "",
    startActivationDate: "",
    endActivationDate: "",
    pan: "",
  };

  const [data, setData] = useState<Card[]>([]);
  const [dataStatus, setDataStatus] = useState<RequestStatus>(RequestStatuses.IDLE);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<CardFilters>(baseFilters);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

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

  function buildQueryParams(
    filters: CardFilters & {
      limit: number;
      offset: number;
    },
  ): string {
    const params = Object.entries(filters)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    return params ? `?${params}` : "";
  }

  async function getData(page: number, filters: CardFilters) {
    setDataStatus(RequestStatuses.LOADING);

    try {
      const offset = (page - 1) * limit;

      const queryParams = buildQueryParams({
        ...filters,
        limit: limit,
        offset: offset,
      });

      const response = await fetch(`/api/cards${queryParams}`);

      if (!response.ok) {
        setDataStatus(RequestStatuses.ERROR);
        throw new Error(`Failed to fetch cards: ${response.status}`);
      }

      const result = await response.json();

      setData(result.cards);
      setTotal(result.total);

      setDataStatus(RequestStatuses.SUCCESS);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setData([]);
      setTotal(0);
    }
  }

  function handleSearch() {
    setPage(1);
    getData(page, filters);
  }

  function handleClearFilters() {
    setFilters(baseFilters);
    setPage(1);
  }

  function handlePagigation(page: number) {
    console.log(page);
    setPage(page);
    getData(page, filters);
  }

  useEffect(() => {
    getData(page, filters);
  }, []);

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
          value={filters.status}
          data={statusList}
          onChange={(value) => updateFilter("status", value ?? "all")}
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
          placeholder="Expiration range"
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

      <div className="dashboard__card-list">
        <CardList
          data={data}
          isLoading={dataStatus === RequestStatuses.LOADING}
          responseError={dataStatus === RequestStatuses.ERROR}
        />
      </div>

      <div className="dashboard__table">
        <CardsTable
          data={data}
          isLoading={dataStatus === RequestStatuses.LOADING}
          responseError={dataStatus === RequestStatuses.ERROR}
        />
      </div>

      <div className="dashboard__pagination">
        <Pagination
          total={totalPages}
          value={page}
          onChange={(value) => handlePagigation(value)}
          color="var(--app-primary)"
        />
      </div>
    </>
  );
}
