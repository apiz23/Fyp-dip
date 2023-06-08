import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingProce from "./pages/BookingProce";
import ReserveStatus from "./pages/ReserveStatus";

export default function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/booking" element={<Booking />} />
				<Route path="/bookingProce" element={<BookingProce />} />
				<Route path="/reserveStatus" element={<ReserveStatus />} />
			</Routes>
		</div>
	);
}