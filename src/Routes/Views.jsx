import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import BookingProce from "../pages/BookingProce";
import HomeAd from "../Admin/Pages/Home";
import NavbarAd from "../Admin/components/NavbarAd";
import ReserveStatus from "../components/ReserveStatus";

export const Views = createBrowserRouter([
	{path: "/",element: <App />,},
	{path: "/login",element: <Login />,},
	{path: "/home",element: <Home />,},
	{path: "/booking",element: <Booking />,},
	{path: "/bookingProce",element: <BookingProce />,},
	{path: "/homeAd",element: <HomeAd />},
	{path: "/navbarAd",element: <NavbarAd />,},
	{path: "/reserveStatus",element: <ReserveStatus/>,}
]);
