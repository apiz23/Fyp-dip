import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingProce from "./pages/BookingProce";
import ReserveStatus from "./components/ReserveStatus";
import ProtectedRoute from "./Routes/ProtectedRoute";
import HomeAd from "./Admin/Pages/Home";
import Team from "./pages/Team";

export default function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/home" element={<Home />} />
					<Route path="/booking" element={<Booking />} />
					<Route path="/bookingProce" element={<BookingProce />} />
					<Route path="/reserveStatus" element={<ReserveStatus />} />
					<Route path="/homeAd" element={<HomeAd />} />
					<Route path="/team" element={<Team />} />
				</Route>
			</Routes>
		</div>
	);
}
