import { createFileRoute } from "@tanstack/react-router";
import Details from "@/components/Details";

export const Route = createFileRoute("/details")({
  component: DetailsPage,
});

function DetailsPage() {
  return (
    <Details />
  );
}
