import { SearchX } from "lucide-react";
import "./ServiceEmpty.css";

type ServiceEmptyProps = {
  message?: string;
  className?: string;
  withIcon?: boolean;
  withtitle?: boolean;
};

export function ServiceEmpty({ message, className, withIcon, withtitle }: ServiceEmptyProps) {
  return (
    <div className={`empty ${className}`}>
      {withIcon && <SearchX color="var(--app-warning)" />}
      {withtitle && <p className="empty__title">{"Nessun dato disponibile"}</p>}
      <p className="empty__subtitle">
        {message ?? "Non sono disponibili dati da visualizzare per questa sezione"}
      </p>
    </div>
  );
}
