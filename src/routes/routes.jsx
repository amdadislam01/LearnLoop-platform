import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import MyProfile from "../pages/MyProfile/MyProfile";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import PrivetRoutes from "./PrivetRoutes";
import SkillDetails from "../pages/SkillDetails/SkillDetails";
import Skills from "../pages/Skills/Skills";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <PageNotFound />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/myprofile',
                element: <PrivetRoutes><MyProfile /> </PrivetRoutes>
            },
            {
                path: '/forget-password',
                element: <ForgetPassword />
            },
            {
                path: '/skill/:id',
                element: <SkillDetails />
            },
            {
                path: '/skills',
                element: <Skills />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
        ]
    }
])