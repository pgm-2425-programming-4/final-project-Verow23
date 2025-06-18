import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBacklog } from "../../../components/app/paginated-backlog/paginated-backlog";

export const Route = createFileRoute("/projects_/$projectSlug/backlog")({
  loader: ({ params }) => {
    return params;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { projectSlug } = Route.useLoaderData();

  return <PaginatedBacklog projectSlug={projectSlug} />;
}
