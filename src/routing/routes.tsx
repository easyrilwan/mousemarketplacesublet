import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layout/AppLayout";
import Category from "../pages/Category";
import Explore from "../pages/Explore";
import ForgotPassword from "../pages/ForgotPassword";
import Offers from "../pages/Offers";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: "Not found",
    Component: AppLayout,
    children: [
      { index: true, Component: Explore },
      { path: "offers", Component: Offers },
      { path: "category/:categoryName", Component: Category },

      {
        Component: PrivateRoute,
        children: [{ path: "profile", Component: Profile }],
      },

      { path: "sign-in", Component: SignIn },
      { path: "sign-up", Component: SignUp },
      { path: "forgot-password", Component: ForgotPassword },
    ],
  },
]);
