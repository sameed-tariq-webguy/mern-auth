import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import HomeView from "./pages/frontend/HomeView";
import Dashboard from "./pages/admin/Dashboard";
import LoginView from "./pages/auth/LoginView";
import RegisterView from "./pages/auth/RegisterView";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Profile from "./pages/admin/Profile";
import Users from "./pages/admin/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    element: <PublicRoute />, 
    children: [
      {
        path: "/login",
        element: <LoginView />,
      },
      {
        path: "/register",
        element: <RegisterView />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <PrivateRoute />, 
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);