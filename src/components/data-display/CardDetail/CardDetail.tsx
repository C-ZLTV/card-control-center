import { useState } from "react";
import { Link } from "react-router-dom";
import { Slider, Switch, Button, Skeleton } from "@mantine/core";
import { type Card } from "../../../types/card";
import visaLogo from "../../../assets/images/visa-logo.webp";
import mastercardLogo from "../../../assets/images/mastercard-logo.webp";
import { Networks } from "../../../constants/card";
import "./CardDetail.css";

import { type Transaction } from "../../../types/transaction";
import { routes } from "../../../app/navigation";
import { formatDateStringToIT } from "../../../utils/date";
import { directionConfigs } from "../../../constants/transactions";
import { type CardSettings } from "../../../types/card";
import { ServiceError } from "../../feeback/ServiceError";
import { useCardTransactions } from "../../../hooks/api/useCardTransactions";
import { useCardSettings } from "../../../hooks/api/useCardSettings";

function LoadingDetailsData({ size }: { size: number }) {
  return Array.from({ length: size }, (_, index) => (
    <div className="detail__section-item--loading" key={`skeleton-${index}`}>
      <Skeleton height={20} radius="md" />
      <Skeleton height={15} mt={6} radius="md" />
    </div>
  ));
}

function Transactions({
  transactions,
  isLoading,
  isError,
  retry,
}: {
  transactions: Transaction[] | undefined;
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
}) {
  if (isLoading) {
    return <LoadingDetailsData size={5} />;
  }

  if (isError) {
    return (
      <ServiceError message="Non è stato possibile recuperare le transazioni." onRetry={retry} />
    );
  }

  if (!transactions) {
    return null;
  }

  if (transactions.length === 0) {
    return <div className="detail__empty">Non ci sono ancora transazioni su questa carta.</div>;
  }

  return (
    <>
      {transactions.map((item) => (
        <div className="detail__section-item" key={item.id}>
          <div>
            <div className="detail__section-main-text">{item.merchantName}</div>

            <div className="detail__section-secondary-text">
              {formatDateStringToIT(item.date)} {item.time}
            </div>
          </div>

          <div
            className="detail__section-main-text"
            style={{
              color: directionConfigs[item.direction]?.color ?? "var(--app-text)",
            }}
          >
            {directionConfigs[item.direction]?.symbol ?? ""}
            {item.amount}
            {item.currency === "EUR" ? "€" : item.currency}
          </div>
        </div>
      ))}

      <Link className="detail__transactions-link" to={routes.TRANSACTIONS}>
        Vai alla lista completa di Transazioni
      </Link>
    </>
  );
}

function Settings({
  settings,
  isLoading,
  isError,
  retry,
  updateSetting,
}: {
  settings: CardSettings | undefined;
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
  updateSetting: <Setting extends keyof CardSettings>(
    key: Setting,
    value: CardSettings[Setting],
  ) => void;
}) {
  if (isLoading) {
    return <LoadingDetailsData size={4} />;
  }

  if (isError) {
    return (
      <ServiceError
        message="Non è stato possibile recuperare le impostazioni della carta."
        onRetry={retry}
      />
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <div className="detail__actions-list">
      <div className="detail__section-item">
        <div>
          <div className="detail__section-main-text">Blocca carta</div>
          <div className="detail__section-secondary-text">
            Impedisci temporaneamente qualsiasi utilizzo della carta
          </div>
        </div>

        <Switch
          checked={settings.cardBlocked}
          onChange={(event) => updateSetting("cardBlocked", event.currentTarget.checked)}
        />
      </div>

      <div className="detail__section-item">
        <div>
          <div className="detail__section-main-text">Pagamenti contactless</div>
          <div className="detail__section-secondary-text">Abilita i pagamenti contactless</div>
        </div>

        <Switch
          checked={settings.contactlessEnabled}
          onChange={(event) => updateSetting("contactlessEnabled", event.currentTarget.checked)}
        />
      </div>

      <div className="detail__section-item">
        <div>
          <div className="detail__section-main-text">Pagamenti online</div>
          <div className="detail__section-secondary-text">Abilita i pagamenti online</div>
        </div>

        <Switch
          checked={settings.onlinePaymentsEnabled}
          onChange={(event) => updateSetting("onlinePaymentsEnabled", event.currentTarget.checked)}
        />
      </div>

      <div>
        <div className="detail__section-item">
          <div>
            <div className="detail__section-main-text">Limite giornaliero</div>
            <div className="detail__section-secondary-text">
              Imposta un limite massimo per i pagamenti giornalieri
            </div>
          </div>

          <Switch
            checked={settings.dailyLimitEnabled}
            onChange={(event) => updateSetting("dailyLimitEnabled", event.currentTarget.checked)}
          />
        </div>

        {settings.dailyLimitEnabled && (
          <div className="detail__limit">
            <div className="detail__limit-value">{settings.dailyLimit} €</div>

            <Slider
              min={50}
              max={5000}
              step={50}
              value={settings.dailyLimit}
              onChange={(value) => updateSetting("dailyLimit", value)}
            />

            <div className="detail__limit-range">
              <span>50 €</span>
              <span>5.000 €</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CardDetail({ card }: { card: Card }) {
  const [newSettings, setNewSettings] = useState<CardSettings>();

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    isError: transactionsError,
    refetch: retryTransactions,
  } = useCardTransactions(card.cardId);

  const {
    data: settings,
    isLoading: settingsLoading,
    isError: settingsError,
    refetch: retrySettings,
  } = useCardSettings(card.cardId);

  function updateSetting<Setting extends keyof CardSettings>(
    key: Setting,
    value: CardSettings[Setting],
  ) {
    if (!settings) {
      return;
    }

    setNewSettings({
      ...settings,
      [key]: value,
    });
  }

  /*  async function getTransactions() {
    setTransactionsStatus(RequestStatuses.LOADING);

    try {
      const response = await fetch(`/api/transactions/${card.cardId}?limit=5`);

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.status}`);
      }

      const result = await response.json();

      setTransactionData(result);
      setTransactionsStatus(RequestStatuses.SUCCESS);
    } catch (error) {
      setTransactionsStatus(RequestStatuses.ERROR);
    }
  } */

  /*   async function getSettings() {
    setSettingsStatus(RequestStatuses.LOADING);

    try {
      const response = await fetch(`/api/settings/${card.cardId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch settings: ${response.status}`);
      }

      const result = await response.json();

      setSettings(result);
      setSettingsStatus(RequestStatuses.SUCCESS);
    } catch (error) {
      setSettingsStatus(RequestStatuses.ERROR);
    }
  } */

  /*   useEffect(() => {
    getTransactions();
    getSettings();
  }, [card.cardId]); */

  return (
    <div className="detail">
      <section className="detail__card">
        <div className="detail__card-contacless">Contacless</div>
        <div className="detail__pan">**** **** **** {card.last4}</div>
        <div className="detail__card-name">{card.customerName}</div>
        <div className="detail__card-exp">
          <div className="detail__card-exp-text">Scade</div>
          <div className="detail__card-exp-date">{formatDateStringToIT(card.expirationDate)}</div>
        </div>
        <div>
          {card.cardNetwork === Networks.MASTERCARD ? (
            <img className="detail__card-logo" src={mastercardLogo} alt="Mastercard" />
          ) : (
            <img className="detail__card-logo" src={visaLogo} alt="Visa" />
          )}
        </div>
      </section>

      <section className="detail__transactions">
        <div className="detail__section-title">Ultime transazioni</div>
        <Transactions
          transactions={transactionsData?.transactions}
          isLoading={transactionsLoading}
          isError={transactionsError}
          retry={retryTransactions}
        />
      </section>

      <section className="detail__actions">
        <div className="detail__section-title">Azioni</div>
        <Settings
          settings={settings}
          isLoading={settingsLoading}
          isError={settingsError}
          retry={retrySettings}
          updateSetting={updateSetting}
        />
      </section>
      <div className="detail__actions-submit">
        <Button variant="filled">Salve modifiche</Button>
      </div>
    </div>
  );
}
