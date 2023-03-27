import Dashboard from "../pages/DashBoard";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

export const publicRoutes = [
    
    {
      title: "Login",
      path: "login",
      element: LoginPage,
    },
    {
      title: "Login",
      path: "/",
      element: LoginPage,
    },
    {
      title: "Login",
      path: "",
      element: LoginPage,
    },
    {
        title: "Sign Up",
        path: "signup",
        element: SignUpPage,
      }
]

export const privateRoutes = [
    {
        title: "Dashboard",
        path: "dashboard",
        element: Dashboard,
      }
]