import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import BookingProce from "../pages/BookingProce";
import Main from "../Admin/Pages/Main";
import NavbarAd from "../Admin/components/NavbarAd";
import ReserveStatus from "../pages/ReserveStatus";

export const router = createBrowserRouter([
	{path: "/",element: <App />,},
	{path: "/login",element: <Login />,},
	{path: "/home",element: <Home />,},
	{path: "/booking",element: <Booking />,},
	{path: "/bookingProce",element: <BookingProce />,},
	{path: "/mainAdmin",element: <Main />,},
	{path: "/navbarAd",element: <NavbarAd />,},
	{path: "/reserveStatus",element: <ReserveStatus/>,}
]);
