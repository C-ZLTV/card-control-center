import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useCurrentRoute } from "../../hooks/useCurrentRoutes";

import "./WipPage.css";
import { routes } from "../../app/navigation";

export function WipPage() {
  const { label } = useCurrentRoute();

  const pageLabel = label ?? "this";

  return (
    <section className="wip">
      <div className="wip__visual" aria-hidden="true">
        <div className="wip__icon">
          <Construction size={32} strokeWidth={1.5} />
        </div>
      </div>

      <div className="wip__content">
        <span className="wip__label">LAVORI IN CORSO</span>

        <h1>
          La sezione {pageLabel}
          <br />
          sarà disponibile a breve
        </h1>

        <p>
          {`Questa sezione è in fase di sviluppo. `}
          <br />
          {"Torna fra poco per poterla visualilzzare."}
        </p>

        <Button
          component={Link}
          to={routes.DASHBOARD}
          leftSection={<ArrowLeft size={16} />}
          variant="filled"
        >
          Torna sulla Lista Carta
        </Button>
      </div>
    </section>
  );
}
