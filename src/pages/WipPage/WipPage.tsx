import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useCurrentRoute } from "../../hooks/useCurrentRoutes";

import "./WipPage.css";
import { routes } from "../../app/navigation";

export function WipPage() {
  const { label } = useCurrentRoute();
  console.log(label);

  const pageLabel = label ?? "this";

  return (
    <section className="wip">
      <div className="wip__visual" aria-hidden="true">
        <div className="wip__icon">
          <Construction size={32} strokeWidth={1.5} />
        </div>
      </div>

      <div className="wip__content">
        <span className="wip__label">WORK IN PROGRESS</span>

        <h1>
          We&apos;re building
          <br />
          {pageLabel} section for you
        </h1>

        <p>
          {`This section is currently under development. `}
          <br />
          {"Check back soon for something new."}
        </p>

        <Button
          component={Link}
          to={routes.DASHBOARD}
          leftSection={<ArrowLeft size={16} />}
          variant="filled"
        >
          Back to Dashboard
        </Button>
      </div>
    </section>
  );
}
