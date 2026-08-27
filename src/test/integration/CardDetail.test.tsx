import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { renderWithQueryClient } from "../test-utils";
import { CardDetail } from "../../components/data-display/CardDetail/CardDetail";

import type { Card } from "../../types/card";
import { CardStatuses, Networks } from "../../constants/card";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";

describe("CardDetail", () => {
  const mockCard: Card = {
    cardId: "CARD-CTR-84739261501",
    last4: "1501",
    customerName: "Mario Rossi",
    branchCode: "001",
    branchCity: "Milano",
    cardNetwork: Networks.VISA,
    cardStatus: CardStatuses.ACTIVE,
    activationDate: "2023-09-13",
    expirationDate: "2027-09-13",
  };

  it("loads and displays card details, transactions and settings", async () => {
    const closeModal = vi.fn();

    renderWithQueryClient(<CardDetail card={mockCard} closeModal={closeModal} />);

    // Card information
    expect(screen.getByText("**** **** **** 1501")).toBeInTheDocument();
    expect(screen.getByText("Mario Rossi")).toBeInTheDocument();
    expect(screen.getByText("13/09/2027")).toBeInTheDocument();
    expect(screen.getByAltText("Visa")).toBeInTheDocument();

    // Transactions
    await waitFor(() => {
      expect(screen.getByText("Ultime transazioni")).toBeInTheDocument();
    });

    // Settings
    await waitFor(() => {
      expect(screen.getByText("Blocca carta")).toBeInTheDocument();
      expect(screen.getByText("Pagamenti contactless")).toBeInTheDocument();
      expect(screen.getByText("Pagamenti online")).toBeInTheDocument();
      expect(screen.getByText("Limite giornaliero")).toBeInTheDocument();
    });
  });

  it("allows the user to change card settings", async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithQueryClient(<CardDetail card={mockCard} closeModal={closeModal} />);

    await waitFor(() => {
      expect(screen.getByText("Blocca carta")).toBeInTheDocument();
    });

    const switches = screen.getAllByRole("switch");

    expect(switches).toHaveLength(4);

    const cardBlockedSwitch = switches[0];

    expect(cardBlockedSwitch).not.toBeChecked();

    await user.click(cardBlockedSwitch);

    expect(cardBlockedSwitch).toBeChecked();
  });

  it("keeps the daily limit slider visible when daily limit is enabled", async () => {
    const closeModal = vi.fn();

    renderWithQueryClient(<CardDetail card={mockCard} closeModal={closeModal} />);

    await waitFor(() => {
      expect(screen.getByText("Limite giornaliero")).toBeInTheDocument();
    });

    const switches = screen.getAllByRole("switch");

    expect(switches).toHaveLength(4);

    const dailyLimitSwitch = switches[3];

    expect(dailyLimitSwitch).toBeChecked();

    expect(screen.getByRole("slider")).toBeInTheDocument();

    expect(screen.getByText("50 €")).toBeInTheDocument();
    expect(screen.getByText("5.000 €")).toBeInTheDocument();
  });

  it("enables the save button when the form is dirty", async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithQueryClient(<CardDetail card={mockCard} closeModal={closeModal} />);

    await waitFor(() => {
      expect(screen.getByText("Blocca carta")).toBeInTheDocument();
    });

    const saveButton = screen.getByRole("button", {
      name: "Salve modifiche",
    });

    expect(saveButton).toBeDisabled();

    const switches = screen.getAllByRole("switch");

    await user.click(switches[0]);

    expect(saveButton).not.toBeDisabled();
  });

  it("closes the modal when updating settings succeeds", async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithQueryClient(<CardDetail card={mockCard} closeModal={closeModal} />);

    await waitFor(() => {
      expect(screen.getByText("Blocca carta")).toBeInTheDocument();
    });

    const switches = screen.getAllByRole("switch");

    await user.click(switches[0]);

    const saveButton = screen.getByRole("button", {
      name: "Salve modifiche",
    });

    expect(saveButton).not.toBeDisabled();

    await user.click(saveButton);

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });

  it("keeps the modal open when updating settings fails", async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    server.use(
      http.patch("/api/settings/:cardId", () => {
        return HttpResponse.json({ message: "Internal Server Error" }, { status: 500 });
      }),
    );

    renderWithQueryClient(<CardDetail card={mockCard} closeModal={closeModal} />);

    await waitFor(() => {
      expect(screen.getByText("Blocca carta")).toBeInTheDocument();
    });

    const switches = screen.getAllByRole("switch");

    await user.click(switches[0]);

    const saveButton = screen.getByRole("button", {
      name: "Salve modifiche",
    });

    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Non è stato possibile salvare le modifiche.")).toBeInTheDocument();
    });

    expect(closeModal).not.toHaveBeenCalled();

    expect(
      screen.getByRole("button", {
        name: "Riprova",
      }),
    ).toBeInTheDocument();
  });

  it("disables settings that are not allowed for the current card status", async () => {
    const closeModal = vi.fn();

    const blockedCard: Card = {
      ...mockCard,
      cardId: "CARD-CTR-84739261503",
      cardStatus: CardStatuses.BLOCKED,
    };

    renderWithQueryClient(<CardDetail card={blockedCard} closeModal={closeModal} />);

    await waitFor(() => {
      expect(screen.getByText("Blocca carta")).toBeInTheDocument();
    });

    const switches = screen.getAllByRole("switch");

    expect(switches).toHaveLength(4);

    expect(switches[0]).not.toBeDisabled();
    expect(switches[1]).toBeDisabled();
    expect(switches[2]).toBeDisabled();
    expect(switches[3]).toBeDisabled();
  });
});
