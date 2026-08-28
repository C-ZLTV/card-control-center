import { screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { CardList } from "../../components/data-display/CardList/CardList";

import type { Card } from "../../types/card";
import { CardStatuses, Networks } from "../../constants/card";

import { renderWithQueryClient } from "../test-utils";

describe("CardList", () => {
  const mockCards: Card[] = [
    {
      cardId: "CARD-CTR-84739261501",
      last4: "4821",
      customerName: "Marco Rossi",
      branchCode: "MI001",
      branchCity: "Milano",
      cardNetwork: Networks.VISA,
      cardStatus: CardStatuses.ACTIVE,
      activationDate: "2024-03-15",
      expirationDate: "2028-03-31",
    },
    {
      cardId: "CARD-CTR-84739261502",
      last4: "7364",
      customerName: "Giulia Bianchi",
      branchCode: "RM014",
      branchCity: "Roma",
      cardNetwork: Networks.MASTERCARD,
      cardStatus: CardStatuses.ACTIVE,
      activationDate: "2023-11-08",
      expirationDate: "2027-11-30",
    },
  ];

  it("renders cards", () => {
    renderWithQueryClient(<CardList data={mockCards} isLoading={false} responseError={false} />);

    expect(screen.getByText("Marco Rossi")).toBeInTheDocument();
    expect(screen.getByText("Giulia Bianchi")).toBeInTheDocument();

    expect(screen.getByText("84739261501")).toBeInTheDocument();
    expect(screen.getByText("84739261502")).toBeInTheDocument();

    expect(screen.getByText("Branch code: MI001")).toBeInTheDocument();
    expect(screen.getByText("Branch code: RM014")).toBeInTheDocument();

    expect(screen.getByText("Data attivazione: 15/03/2024")).toBeInTheDocument();
    expect(screen.getByText("Data scadenza: 31/03/2028")).toBeInTheDocument();

    expect(screen.getAllByRole("button", { name: "Dettagli" })).toHaveLength(2);
  });

  it("renders loading skeletons", () => {
    const { container } = renderWithQueryClient(
      <CardList data={[]} isLoading={true} responseError={false} />,
    );

    const skeletons = container.querySelectorAll(".card");

    expect(skeletons).toHaveLength(10);
  });

  it("renders an error message when loading cards fails", () => {
    renderWithQueryClient(<CardList data={[]} isLoading={false} responseError={true} />);

    expect(
      screen.getByText("Non è stato possibile recuperare la lista Carte."),
    ).toBeInTheDocument();
  });

  it("renders an empty state when there are no cards", () => {
    renderWithQueryClient(<CardList data={[]} isLoading={false} responseError={false} />);

    expect(
      screen.getByText("Non sono state trovate carte che corrispondono ai criteri selezionati."),
    ).toBeInTheDocument();
  });

  it("opens card details when clicking Details", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<CardList data={mockCards} isLoading={false} responseError={false} />);

    const detailsButtons = screen.getAllByRole("button", {
      name: "Dettagli",
    });

    await user.click(detailsButtons[0]);

    const dialog = await screen.findByRole("dialog");

    expect(dialog).toBeInTheDocument();

    expect(within(dialog).getByText("Marco Rossi")).toBeInTheDocument();

    expect(within(dialog).getByText("**** **** **** 4821")).toBeInTheDocument();
  });

  it("closes card details when the modal is closed", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<CardList data={mockCards} isLoading={false} responseError={false} />);

    await user.click(screen.getAllByRole("button", { name: "Dettagli" })[0]);

    await waitFor(() => {
      expect(screen.getByText("Dettagli Carta")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", {
      name: "Close",
    });

    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("Dettagli Carta")).not.toBeInTheDocument();
    });
  });
});
