import {
  Test,
  Home,
  Game,
  AccountSettings,
  Profile,
  Chat,
  Leaderboard,
} from "../packages";
import Login from "../packages/feat-Auth/Login";
import FirstLogin from "../packages/feat-Auth/components/FirstLogin";
import VerifyOtp from "./VerifyOtp";
import { Search } from "../packages/feat-Search/Search";
import { Layout } from "./utils";
import { NotFoundError } from "./utils/components/errors";
import { LandingPage } from "../packages/feat-landing";

export interface Route {
  path: string;
  element: JSX.Element;
  errorElement: JSX.Element;
  requireAuth: boolean;
}

export const routes: Route[] = [
  {
    path: "/overView",
    element: <LandingPage />,
    errorElement: <NotFoundError />,
    requireAuth: false,
  },
  {
    path: "/search",
    element: (
      <Layout>
        <Search />
      </Layout>
    ),
    errorElement: <NotFoundError />,
    requireAuth: true,
  },
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
    path: "/user/:uid",
    element: (
      <Layout>
        <Profile />
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
    path: "/verifyOtp",
    element: <VerifyOtp />,
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
