import { Test, Home, Game, AccountSettings, Profile, Chat, Leaderboard } from "../packages";
import Login from "../packages/feat-Auth/Login";
import FirstLogin from "../packages/feat-Auth/components/FirstLogin";
import VerifyOtp from "./VerifyOtp";
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
    requireAuth: true,
  },
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <NotFoundError />,
    requireAuth: true,
  },
  {
    path: "/game",
    element: (
      <Layout>
        <Game />
      </Layout>
    ),
    errorElement: <NotFoundError />,
    requireAuth: false,
  },
  {
    path: "/account/settings",
    element: (
      <Layout>
        <AccountSettings />
      </Layout>
    ),
    errorElement: <NotFoundError />,
    requireAuth: true,
  },
  {
    path: "/account/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
    errorElement: <NotFoundError />,
    requireAuth: true,
  },
  {
    path: "/chat",
    element: (
      <Layout>
        <Chat />
      </Layout>
    ),
    errorElement: <NotFoundError />,
    requireAuth: true,
  },
  {
    path: "/leaderboard",
    element: (
      <Layout>
        <Leaderboard />
      </Layout>
    ), 
    errorElement: <NotFoundError />,
    requireAuth: true,
  },
  {
    path: "/firstlogin",
    element: <FirstLogin />,
    errorElement: <NotFoundError />,
    requireAuth: true,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFoundError />,
    requireAuth: false,
  },
];
