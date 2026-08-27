import "@testing-library/jest-dom/vitest";

import { beforeAll, afterEach, afterAll, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserver;

import { server } from "../mocks/server";
import { resetCardSettingsMock } from "../mocks/handlers/cardSettings";

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "warn",
  });
});

beforeEach(() => {
  resetCardSettingsMock();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  resetCardSettingsMock();
});

afterAll(() => server.close());

Element.prototype.scrollIntoView = () => {};
