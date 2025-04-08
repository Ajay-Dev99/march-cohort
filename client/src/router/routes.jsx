import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import HomePage from "../pages/HomePage";
import Cartpage from "../pages/Cartpage";
import Login from "../pages/Login";
import Register from "../pages/Register";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <h1>Error page</h1>,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            // {
            //     path: "about",
            //     element: <AboutPage />,
            // },
            // {
            //     path: "courses",
            //     element: <Courses />,
            // },
            {
                path: "cart",
                element: <Cartpage />,
            },
            // {
            //     path: "payment/success",
            //     element: <Ordersuccess />
            // },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Register />,
            },
        ]
    },

]);