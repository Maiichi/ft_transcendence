import { Test, Home, Game, Settings, Profile } from "../packages";

import { NotFoundError } from "./errors";
import { Layout } from "./utils";

export const routes = [
  {
    path: "/test",
    element: (
      <Layout>
        <Test />
      </Layout>
    ),
    errorElement: <NotFoundError />,
  },
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <NotFoundError />,
  },
  {
    path: "/game",
    element: (
      <Layout>
        <Game />
      </Layout>
    ),
    errorElement: <NotFoundError />,
  },
  {
    path: "/account/settings",
    element: (
      <Layout>
        <Settings />
      </Layout>
    ),
    errorElement: <NotFoundError />,
  },
  {
    path: "/account/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
    errorElement: <NotFoundError />,
  },
];
