import Navigation from "../components/Common/Navigation";
import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootLayout,
});

// eslint-disable-next-line react-refresh/only-export-components
function RootLayout() {
  const { matches } = useRouterState();

  const activeMatch = matches[matches.length - 1];

  const { title = "FinTrack" } = activeMatch.context as { title: string };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}