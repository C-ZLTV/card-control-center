import { Button } from "@mantine/core";
import { CircleX } from "lucide-react";
import "./ServiceError.css";

type ServiceErrorProps = {
  message?: string;
  onRetry?: () => void;
  className?: string;
  withIcon?: boolean;
};

export function ServiceError({ message, onRetry, className, withIcon }: ServiceErrorProps) {
  return (
    <div className={`error ${className}`}>
      {withIcon && <CircleX color="var(--app-danger)" />}
      <p className="error__title">Qualcosa è andato storto</p>
      <p className="error__subtitle">{message ?? "Non è stato possibile recuperare i dati."}</p>
      {onRetry && (
        <Button variant="light" onClick={onRetry}>
          Riprova
        </Button>
      )}
    </div>
  );
}
