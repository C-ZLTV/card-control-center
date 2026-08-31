A modern frontend dashboard for managing payment cards, transactions and card settings.

**Live Demo:** https://card-control-center.netlify.app/

---

## Overview

Card Control Center is a frontend application designed to simulate an internal banking and fintech platform for managing payment cards and their associated transactions.

The project was built with a focus on modern frontend engineering practices, including type-safe development, server-state management, API abstraction, form validation, responsive design, API mocking and automated testing.

The application is fully functional without a real backend through Mock Service Worker (MSW), which intercepts API requests directly in the browser and provides realistic mock responses.

---

## Key Technical Highlights

* React application built with TypeScript and Vite
* REST API layer implemented with Axios
* Server-state management with TanStack Query
* Client-side state management with Zustand
* Type-safe forms with React Hook Form and Zod
* REST API mocking with MSW
* Unit and integration testing with Vitest and React Testing Library
* Responsive desktop and mobile layouts
* Custom design system and theming with Mantine
* Pagination, filtering and dynamic API query parameters
* Loading, error and empty states
* Card settings mutations with form validation and API feedback
* Production deployment with MSW-enabled mock APIs

---

## Features

### Card Dashboard

The dashboard provides an operator-oriented interface for browsing and filtering payment cards.

Features include:

* Card ID search
* Branch code filtering
* Card status filtering
* Activation date range
* Expiration date range
* Pagination
* Responsive table and list views
* Loading states
* Empty states
* Error handling

### Card Details

Each card provides a detailed view containing:

* Card information
* Card network
* Card status
* Expiration date
* Recent transactions
* Card settings

Card settings include:

* Card blocking
* Contactless payments
* Online payments
* Daily payment limit
* Daily payment limit configuration

The settings section dynamically enables or disables actions depending on the current card status.

### Transactions

The transaction section provides a complete transaction list with:

* Card ID filtering
* Transaction date range
* Transaction type
* Merchant category
* Transaction direction
* Amount range
* Pagination
* Transaction status

The card details view also provides direct navigation to the complete transaction list while automatically passing the selected card ID as a filter.

---

## Architecture

The application is structured around a separation of concerns between presentation, API communication, state management, domain types and business logic.

```text
src/
├── api/
│   ├── cards.ts
│   ├── transactions.ts
│   └── card-settings.ts
│
├── app/
│   └── navigation/
│
├── components/
│   ├── data-display/
│   ├── layout/
│   ├── navigation/
│   └── feedback/
│
├── constants/
│
├── hooks/
│   └── api/
│
├── mocks/
│   ├── data/
│   ├── handlers/
│   └── browser.ts
│
├── pages/
│   ├── DashboardPage/
│   └── TransactionsPage/
│
├── schemas/
│
├── types/
│
├── theme/
│
└── utils/
```

The architecture keeps API calls and server-state logic outside the UI components, making individual parts of the application easier to test, maintain and replace.

---

## Data Flow

The application follows a clear data flow between the UI, React Query, the API layer and the mock backend.

```text
React Component
       |
       v
Custom Hook
       |
       v
TanStack Query
       |
       v
API Function
       |
       v
Axios
       |
       v
MSW Handler
       |
       v
Mock Data
```

This architecture also makes it possible to replace MSW with a real backend without requiring major changes to the UI layer.

---

## API Layer

The frontend communicates through a REST-like API abstraction.

Examples of available endpoints:

```text
GET    /api/cards
GET    /api/transactions/:cardId
GET    /api/settings/:cardId
PATCH  /api/settings/:cardId
GET    /api/operator-info
```

API communication is isolated in dedicated modules.

For example, transaction retrieval is handled through an API function and exposed to React through a custom hook:

```text
useCardTransactions()
        |
        v
getCardTransactions()
        |
        v
Axios
        |
        v
/api/transactions/:cardId
```

Pagination and filtering parameters are passed independently from route parameters where appropriate.

---

## Mock API

Since the project does not rely on a real backend, Mock Service Worker is used to simulate API communication.

MSW intercepts requests in the browser and returns mock responses based on the request URL, route parameters and query parameters.

The mock API supports:

* Dynamic route parameters
* Query parameters
* Filtering
* Pagination
* GET requests
* PATCH requests
* Successful responses
* Error responses

The mock service worker is also enabled in the production deployment, allowing the live demo to remain fully functional without an external backend.

---

## Server State Management

TanStack Query is used to manage server state throughout the application.

Examples include:

```text
useCards()
useCardTransactions()
useCardSettings()
useUpdateCardSettings()
```

TanStack Query handles:

* Data fetching
* Loading states
* Error states
* Caching
* Query keys
* Refetching
* Mutations
* Pagination state
* Keeping previous data while fetching new pages

This keeps server-state concerns separate from the presentation layer.

---

## Client State

Zustand is used for client-side global state where appropriate.

The separation between server state and client state allows each type of state to be managed using the tool best suited to it.

```text
Server State
    |
    └── TanStack Query

Client State
    |
    └── Zustand
```

---

## Forms and Validation

Card settings are managed using React Hook Form with Zod validation.

The form supports:

* Controlled inputs
* Type-safe form values
* Validation
* Validation error messages
* Dirty-state detection
* Submit handling
* Loading states
* Mutation errors
* Resetting the form after successful updates

The Zod schema provides a centralized validation layer for the form.

---

## TypeScript

TypeScript is used throughout the application to provide a strongly typed domain model.

Examples include:

```text
Card
CardStatus
CardNetwork
CardSettings
CardSetting
Transaction
TransactionType
TransactionDirection
MerchantCategory
TransactionsResponse
```

Types are also used across API functions, React Query hooks, forms and reusable components.

This allows invalid data flows to be detected during development rather than at runtime.

---

## UI and Design System

Mantine is used as the primary UI component library.

The project also includes a custom theme and design system with:

* Custom color tokens
* Light and dark themes
* Consistent spacing
* Typography
* Reusable components
* Responsive layouts
* Loading skeletons
* Empty states
* Error states

Framer Motion is used for UI animations and transitions.

Lucide React is used for interface icons.

---

## Responsive Design

The application provides different presentations depending on the available screen size.

For example, the card dashboard uses:

```text
Desktop
   |
   └── CardsTable

Mobile
   |
   └── CardList
```

The underlying data-fetching and business logic remain shared while the presentation layer adapts to the viewport.

The application is designed to remain usable across desktop and mobile screen sizes.

---

## Testing

The project includes unit and integration tests using:

* Vitest
* React Testing Library
* MSW

Testing focuses on application behaviour rather than implementation details.

Examples include:

* Custom hooks
* API data fetching
* Pagination
* Filtering
* Component interactions
* Form behaviour
* API mocking

A typical integration flow is:

```text
React Component
       |
       v
Custom Hook
       |
       v
TanStack Query
       |
       v
API Request
       |
       v
MSW
       |
       v
Mock Response
       |
       v
Rendered UI
```

This allows the tests to verify how different parts of the application work together.

---

## Technology Stack

### Core

* JavaScript
* TypeScript
* React
* Vite

### State and Data

* TanStack Query
* TanStack Table
* Zustand
* Axios
* REST API

### UI and UX

* Mantine
* Framer Motion
* Lucide React
* CSS
* Responsive Design
* Light/Dark Theme

### Forms and Validation

* React Hook Form
* Zod

### Testing

* Vitest
* React Testing Library
* MSW

### Development

* ESLint
* Git
* GitHub

---

## Getting Started

### Requirements

* Node.js
* npm

### Installation

```bash
git clone <repository-url>

cd card-control-center

npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

### Tests

Run the test suite:

```bash
npm run test
```

### Production Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

The project follows a feature-oriented and responsibility-based structure.

```text
src/
│
├── api/                 API communication
│
├── app/                 Application-level configuration
│
├── assets/              Static assets
│
├── components/          Reusable UI components
│
├── constants/           Application constants
│
├── hooks/               Reusable React hooks
│
├── mocks/               MSW handlers and mock data
│
├── pages/               Application pages
│
├── schemas/             Zod validation schemas
│
├── theme/               Theme and design tokens
│
├── types/               TypeScript domain types
│
└── utils/               Shared utility functions
```

---

## Technical Decisions

### TanStack Query for server state

API data is treated as server state rather than being unnecessarily stored in global state.

This provides caching, request lifecycle management and predictable refetching behaviour.

### MSW instead of hardcoded component data

The application communicates through an API abstraction even though no backend is available.

This keeps components independent from the mock data and creates a realistic frontend/backend boundary.

### React Hook Form and Zod

Form state and validation are kept separate from the UI while maintaining strong TypeScript integration.

### Reusable UI components

Repeated patterns such as tables, lists, loading states, error states and empty states are extracted into reusable components.

### Responsive presentation

Desktop and mobile layouts can use different presentation components while sharing the same underlying data and business logic.

---

## What This Project Demonstrates

This project was built to demonstrate practical frontend engineering skills rather than only UI implementation.

It demonstrates experience with:

* Building a complete React application from scratch
* TypeScript-first development
* REST API integration
* Server-state management
* Client-state management
* API mocking
* Form management and validation
* Responsive design
* Component architecture
* Reusable UI patterns
* Loading, error and empty states
* Pagination and filtering
* API mutations
* Unit and integration testing
* Production deployment

---

## Future Improvements

Possible future extensions include:

* Authentication and authorization
* Role-based permissions
* End-to-end testing
* Extended test coverage
* Advanced transaction analytics
* Data visualizations
* Accessibility improvements
* Performance optimization

---

## Author

Built as a frontend engineering project focused on modern React architecture, maintainability and realistic fintech application patterns.

**Live Demo:** https://card-control-center.netlify.app/
