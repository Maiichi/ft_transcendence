import { Test, Home, Game, Settings, Profile, Chat } from "../packages";
import { Layout } from "./utils";
import { NotFoundError } from "./utils/components/errors";

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
  {
    path: "/chat",
    element: (
      <Layout>
        <Chat />
      </Layout>
    ),
    errorElement: <NotFoundError />,
  },
];
