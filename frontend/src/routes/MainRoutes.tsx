import React, { Suspense } from "react";
import NotFound from "@/components/NotFound";
import MainLayout from "@/layouts/MainLayout";
import Loading from "@/components/Loadind";
import ProctedRoutes from "./ProctedRoutes";

const HomePage = React.lazy(() => import("@/pages/home/HomePage"));
const Signup = React.lazy(() => import("@/pages/auth/sign-up/SignUp"));
const SignIn = React.lazy(() => import("@/pages/auth/sign-in/SignIn"));
const Settings = React.lazy(() => import("@/pages/settings/Settings"));

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading fullScreen />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: "/sign-in",
      element: (
        <Suspense fallback={<Loading fullScreen />}>
          <ProctedRoutes>
            <SignIn />
          </ProctedRoutes>
        </Suspense>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <Suspense fallback={<Loading fullScreen />}>
          <ProctedRoutes>
            <Signup />
          </ProctedRoutes>
        </Suspense>
      ),
    },
    {
      path: "/settings",
      element: (
        <Suspense fallback={<Loading fullScreen />}>
            <Settings />
        </Suspense>
      ),
    },
  ],
};
