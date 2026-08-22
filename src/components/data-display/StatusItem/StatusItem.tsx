import { statusColors } from "../../../constants/card";
import type { CardStatus } from "../../../types/card";
import "./StatusItem.css";

export function StatusItem({ status }: { status: CardStatus }) {
  if (!status) {
    return;
  }

  const color = statusColors[status] ?? "var(--app-text-secondary)";

  return (
    <div className="table__status">
      <div
        aria-hidden="true"
        className="table__status-visual"
        style={{ backgroundColor: color }}
      ></div>
      {status}
      <div></div>
    </div>
  );
}
