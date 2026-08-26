import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Slider, Switch, Button, Skeleton } from "@mantine/core";
import { Controller } from "react-hook-form";
import { type Card } from "../../../types/card";
import visaLogo from "../../../assets/images/visa-logo.webp";
import mastercardLogo from "../../../assets/images/mastercard-logo.webp";
import { AllowedSettings, CardStatuses, Networks } from "../../../constants/card";
import "./CardDetail.css";

import { type Transaction } from "../../../types/transaction";
import { routes } from "../../../app/navigation";
import { formatDateStringToIT } from "../../../utils/date";
import { directionConfigs } from "../../../constants/transactions";
import { type CardSettings } from "../../../types/card";
import { ServiceError } from "../../feeback/ServiceError/ServiceError";
import { useCardTransactions } from "../../../hooks/api/useCardTransactions";
import { useCardSettings } from "../../../hooks/api/useCardSettings";
import { ServiceEmpty } from "../../feeback/ServiceEmpty/ServiceEmpty";

import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardSettingsSchema, type CardSettingsForm } from "../../../schemas/cardSettings.schema";
import { useUpdateCardSettings } from "../../../hooks/api/useUpdateCardSettings";

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
    return <ServiceEmpty message="Non ci sono ancora transazioni associate a questa carta." />;
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
  allowedSettings,
  settings,
  isLoading,
  isError,
  retry,
  form,
}: {
  allowedSettings;
  settings: CardSettings | undefined;
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
  form: UseFormReturn<CardSettingsForm>;
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

  const dailyLimitEnabled = form.watch("dailyLimitEnabled");
  const dailyLimit = form.watch("dailyLimit");

  const { errors } = form.formState;

  return (
    <div className="detail__actions-list">
      <div className="detail__section-item">
        <div>
          <div className="detail__section-main-text">Blocca carta</div>
          <div className="detail__section-secondary-text">
            Impedisci temporaneamente qualsiasi utilizzo della carta
          </div>
        </div>

        <Controller
          name="cardBlocked"
          control={form.control}
          render={({ field }) => (
            <Switch
              disabled={!allowedSettings.includes("cardBlocked")}
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
            />
          )}
        />
      </div>

      <div className="detail__section-item">
        <div>
          <div className="detail__section-main-text">Pagamenti contactless</div>
          <div className="detail__section-secondary-text">Abilita i pagamenti contactless</div>
        </div>
        <Controller
          name="contactlessEnabled"
          control={form.control}
          render={({ field }) => (
            <Switch
              disabled={!allowedSettings.includes("contactlessEnabled")}
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
            />
          )}
        />
      </div>

      <div className="detail__section-item">
        <div>
          <div className="detail__section-main-text">Pagamenti online</div>
          <div className="detail__section-secondary-text">Abilita i pagamenti online</div>
        </div>

        <Controller
          name="onlinePaymentsEnabled"
          control={form.control}
          render={({ field }) => (
            <Switch
              disabled={!allowedSettings.includes("onlinePaymentsEnabled")}
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
            />
          )}
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
          <Controller
            name="dailyLimitEnabled"
            control={form.control}
            render={({ field }) => (
              <Switch
                disabled={!allowedSettings.includes("dailyLimitEnabled")}
                checked={field.value}
                onChange={(event) => field.onChange(event.currentTarget.checked)}
              />
            )}
          />
        </div>

        {dailyLimitEnabled && (
          <div className="detail__limit">
            <div className="detail__limit-value">{dailyLimit} €</div>

            <Controller
              name="dailyLimit"
              control={form.control}
              render={({ field }) => (
                <Slider
                  min={10}
                  max={5000}
                  step={50}
                  value={field.value}
                  disabled={!allowedSettings.includes("dailyLimit")}
                  onChange={field.onChange}
                />
              )}
            />
            <div className="detail__limit-range">
              <span>50 €</span>
              <span>5.000 €</span>
            </div>

            {errors.dailyLimit && (
              <div className="detail__limits-error">{errors.dailyLimit.message}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function CardDetail({ card, closeModal }: { card: Card; closeModal: () => void }) {
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

  const {
    mutateAsync: updateSettings,
    isPending: isUpdating,
    isError: updateError,
  } = useUpdateCardSettings();

  const form = useForm<CardSettingsForm>({
    resolver: zodResolver(cardSettingsSchema),
  });

  async function onSubmit(values: CardSettingsForm) {
    console.log(values);
    const updatedSettings = await updateSettings({
      cardId: card.cardId,
      settings: values,
    });

    form.reset(updatedSettings);
  }

  const cardBlocked = form.watch("cardBlocked");

  let effectiveCardStatus = card.cardStatus;

  if (cardBlocked) {
    effectiveCardStatus = CardStatuses.BLOCKED;
  } else if (card.cardStatus === CardStatuses.BLOCKED) {
    effectiveCardStatus = CardStatuses.ACTIVE;
  }

  const allowedSettings = AllowedSettings[effectiveCardStatus];

  useEffect(() => {
    if (!settings) {
      return;
    }

    form.reset({
      cardBlocked: settings.cardBlocked,
      contactlessEnabled: settings.contactlessEnabled,
      onlinePaymentsEnabled: settings.onlinePaymentsEnabled,
      dailyLimitEnabled: settings.dailyLimitEnabled,
      dailyLimit: settings.dailyLimit,
    });
  }, [settings, form]);

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="detail">
          <Settings
            allowedSettings={allowedSettings}
            settings={settings}
            isLoading={settingsLoading}
            isError={settingsError}
            retry={retrySettings}
            form={form}
          />

          {updateError && <ServiceError message="Non è stato possibile salvare le modifiche." />}

          <div className="detail__actions-submit">
            <Button
              type="submit"
              variant="filled"
              disabled={!form.formState.isDirty || Object.keys(form.formState.errors).length > 0}
              loading={isUpdating}
              onClick={closeModal}
            >
              {updateError ? "Riprova" : "Salve modifiche"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
