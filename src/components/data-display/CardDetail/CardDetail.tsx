import { useState } from "react";
import { Link } from "react-router-dom";
import { Slider, Switch, Button } from "@mantine/core";
import { type Card } from "../../../types/card";
import visaLogo from "../../../assets/images/visa-logo.webp";
import mastercardLogo from "../../../assets/images/mastercard-logo.webp";
import { Networks } from "../../../constants/card";
import "./CardDetail.css";
import transactionsData from "../../../test/API/transactions-list.json";
import cardSetting from "../../../test/API/card-settings.json";

import { type Transaction } from "../../../types/transaction";
import { routes } from "../../../app/navigation";
import { formatDateStringToIT } from "../../../utils/date";
import { directionConfigs } from "../../../constants/transactions";
import { type CardSettings } from "../../../types/card";

export function CardDetail({ card }: { card: Card }) {
  const [settings, setSettings] = useState<CardSettings | null>(cardSetting);
  const data = transactionsData.transactions as Transaction[];

  function updateSetting<Setting extends keyof CardSettings>(
    key: Setting,
    value: CardSettings[Setting],
  ) {
    if (!settings) {
      return;
    }

    setSettings({
      ...settings,
      [key]: value,
    });
  }

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
        {data.map((item) => {
          return (
            <div className="detail__section-item">
              <div>
                <div className="detail__section-main-text">{item.merchantName}</div>
                <div className="detail__section-secondary-text">{`${formatDateStringToIT(item.date)} ${item.time}`}</div>
              </div>
              <div
                style={{
                  color: directionConfigs[item.direction]
                    ? directionConfigs[item.direction]?.color
                    : "var(--app-text)",
                }}
                className="detail__section-main-text"
              >{`${
                directionConfigs[item.direction] ? directionConfigs[item.direction]?.symbol : ""
              }${item.amount}${item.currency === "EUR" ? "€" : item.currency}`}</div>
            </div>
          );
        })}

        <Link className="detail__transactions-link" to={routes.TRANSACTIONS}>
          Vai alla lista completa di Transazioni
        </Link>
      </section>
      {settings && (
        <section className="detail__actions">
          <div className="detail__section-title">Azioni</div>

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

                <div className="detail__section-secondary-text">
                  Abilita i pagamenti contactless
                </div>
              </div>

              <Switch
                checked={settings.contactlessEnabled}
                onChange={(event) =>
                  updateSetting("contactlessEnabled", event.currentTarget.checked)
                }
              />
            </div>

            <div className="detail__section-item">
              <div>
                <div className="detail__section-main-text">Pagamenti online</div>

                <div className="detail__section-secondary-text">Abilita i pagamenti online</div>
              </div>

              <Switch
                checked={settings.onlinePaymentsEnabled}
                onChange={(event) =>
                  updateSetting("onlinePaymentsEnabled", event.currentTarget.checked)
                }
              />
            </div>

            <div>
              <div className="detail__section-item">
                <div>
                  <div>
                    <div className="detail__section-main-text">Limite giornaliero</div>
                    <div className="detail__section-secondary-text">
                      Imposta un limite massimo per i pagamenti giornalieri
                    </div>
                  </div>
                </div>

                <Switch
                  checked={settings.dailyLimitEnabled}
                  onChange={(event) =>
                    updateSetting("dailyLimitEnabled", event.currentTarget.checked)
                  }
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

          <div className="detail__actions-submit">
            <Button variant="filled">Salve modifiche</Button>
          </div>
        </section>
      )}
    </div>
  );
}
