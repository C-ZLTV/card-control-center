import { screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { renderWithQueryClient } from "../test-utils";
import { CardsTable } from "../../components/data-display/CardsTable/CardsTable";

const cards = [
  {
    cardId: "CARD-CTR-84739261501",
    last4: "4821",
    customerName: "Marco Rossi",
    branchCity: "Milano",
    branchCode: "MI001",
    cardNetwork: "Visa" as const,
    cardStatus: "active" as const,
    activationDate: "2024-03-15",
    expirationDate: "2028-03-31",
  },
  {
    cardId: "CARD-CTR-84739261502",
    last4: "1234",
    customerName: "Giulia Bianchi",
    branchCity: "Roma",
    branchCode: "RM014",
    cardNetwork: "Mastercard" as const,
    cardStatus: "active" as const,
    activationDate: "2023-11-08",
    expirationDate: "2027-11-30",
  },
];

describe("CardsTable", () => {
  it("renders cards", () => {
    renderWithQueryClient(<CardsTable data={cards} isLoading={false} responseError={false} />);

    expect(screen.getByText("84739261501")).toBeInTheDocument();
    expect(screen.getByText("Marco Rossi")).toBeInTheDocument();
    expect(screen.getByText("MI001")).toBeInTheDocument();

    expect(screen.getByText("84739261502")).toBeInTheDocument();
    expect(screen.getByText("Giulia Bianchi")).toBeInTheDocument();
    expect(screen.getByText("RM014")).toBeInTheDocument();
  });

  it("renders empty rows up to the page size", () => {
    renderWithQueryClient(<CardsTable data={cards} isLoading={false} responseError={false} />);

    const emptyRows = document.querySelectorAll(".table__empty-cell");

    expect(emptyRows).toHaveLength(8);
  });

  it("shows a loader while loading", () => {
    renderWithQueryClient(<CardsTable data={cards} isLoading={true} responseError={false} />);

    expect(document.querySelector(".table_loader")).toBeInTheDocument();
  });

  it("renders an error message when loading cards fails", () => {
    renderWithQueryClient(<CardsTable data={[]} isLoading={false} responseError={true} />);

    expect(
      screen.getByText("Non è stato possibile recuperare la lista Carte."),
    ).toBeInTheDocument();
  });

  it("renders an empty state when there are no cards", () => {
    renderWithQueryClient(<CardsTable data={[]} isLoading={false} responseError={false} />);

    expect(
      screen.getByText("Non sono state trovate carte che corrispondono ai criteri selezionati."),
    ).toBeInTheDocument();
  });

  it("opens card details when clicking the details button", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<CardsTable data={cards} isLoading={false} responseError={false} />);

    const detailsButtons = screen.getAllByRole("button", {
      name: "Open card details",
    });

    await user.click(detailsButtons[0]);

    await user.click(detailsButtons[0]);

    const dialog = await screen.findByRole("dialog");

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("Marco Rossi")).toBeInTheDocument();
    expect(within(dialog).getByText("**** **** **** 4821")).toBeInTheDocument();
  });

  it("closes card details when the modal is closed", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<CardsTable data={cards} isLoading={false} responseError={false} />);

    const detailsButtons = screen.getAllByRole("button", {
      name: "Open card details",
    });

    await user.click(detailsButtons[0]);

    const dialog = await screen.findByRole("dialog");

    expect(dialog).toBeInTheDocument();

    const closeButton = screen.getByRole("button", {
      name: "Close",
    });

    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
