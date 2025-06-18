import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h3 className="subtitle is-4">
        Welcome to my Kanban board! Select a project from the menu.
      </h3>
    </div>
  );
}
