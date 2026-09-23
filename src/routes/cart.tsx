import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/cart")({
  component: CartLayout,
});

function CartLayout() {
  return <Outlet />;
}