import visaLogo from "../../../assets/images/visa-logo.webp";
import mastercardLogo from "../../../assets/images/mastercard-logo.webp";
import { Networks } from "../../../constants/card";
import "./CardNetworkLogo.css";

export function CardNetworkLogo({ cardNetwork }: { cardNetwork: string }) {
  return (
    <div className="table__network-icon">
      {cardNetwork === Networks.MASTERCARD ? (
        <img src={mastercardLogo} width={20} alt="Mastercard" />
      ) : (
        <img src={visaLogo} width={32} alt="Visa" />
      )}
    </div>
  );
}
