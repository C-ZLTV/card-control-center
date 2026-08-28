import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { renderWithQueryClient } from "../test-utils";
import { DashboardPage } from "../../pages/DashboardPage/DashboardPage";

describe("DashboardPage", () => {
  it("loads and displays cards", async () => {
    renderWithQueryClient(<DashboardPage />);

    expect(screen.getByText("Lista carte")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("84739261501")).toBeInTheDocument();
    });
  });

  it("filters cards by status", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText("84739261501")).toBeInTheDocument();
    });

    const statusSelect = screen.getByRole("combobox", {
      name: "Status",
    });

    await user.click(statusSelect);

    const blockedOption = screen.getByRole("option", {
      name: "blocked",
      hidden: true,
    });

    await user.click(blockedOption);

    expect(statusSelect).toHaveValue("blocked");

    await user.click(screen.getByRole("button", { name: "Cerca" }));

    await waitFor(() => {
      expect(screen.queryByText("84739261501")).not.toBeInTheDocument();
    });
  });

  it("clears filters and reloads the cards", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText("84739261501")).toBeInTheDocument();
    });

    const statusSelect = screen.getByRole("combobox", {
      name: "Status",
    });

    await user.click(statusSelect);

    const blockedOption = screen.getByRole("option", {
      name: "blocked",
      hidden: true,
    });

    await user.click(blockedOption);

    expect(statusSelect).toHaveValue("blocked");

    await user.click(screen.getByRole("button", { name: "Cerca" }));

    await waitFor(() => {
      expect(screen.queryByText("84739261501")).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Pulisci Filtri" }));

    expect(statusSelect).toHaveValue("all");

    await waitFor(() => {
      expect(screen.getByText("84739261501")).toBeInTheDocument();
    });
  });

  it("changes page and loads the corresponding cards", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText("84739261501")).toBeInTheDocument();
    });

    expect(screen.getByText("84739261510")).toBeInTheDocument();
    expect(screen.queryByText("84739261511")).not.toBeInTheDocument();

    const secondPage = screen.getByRole("button", {
      name: "2",
    });

    await user.click(secondPage);

    await waitFor(() => {
      expect(screen.getByText("84739261511")).toBeInTheDocument();
    });

    expect(screen.getByText("84739261515")).toBeInTheDocument();
    expect(screen.queryByText("84739261501")).not.toBeInTheDocument();
  });
});
