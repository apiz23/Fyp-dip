import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, Route, Router } from "react-router-dom";
import Booking from "./Booking";
import BookingProce from "./BookingProce";
import ReserveStatus from "../components/ReserveStatus";
import "./style/Home.scss";

export default function Home() {
	<Router>
		<Route path="booking" element={<Booking />} />
		<Route path="bookingProce" element={<BookingProce />} />
	</Router>;

	useEffect(() => {
		const clearLocalStorage = () => {
			localStorage.clear();
		};
		window.onbeforeunload = clearLocalStorage;
		return () => {
			window.onbeforeunload = null;
		};
	}, []);

	return (
		<>
			<section className="homeSec">
				<Navbar />
				<div className="title">
					<h1 class="display-1 mt-3">Welcome</h1>
				</div>
				<div className="container mt-5 col-md-8">
					<div className="row">
						<div className="col col-md d-flex justify-content-center">
							<ReserveStatus />
						</div>
					</div>
					<div className="row p-3 ">
						<div className="col col-md-6 px-3">
							<div className="card">
								<div className="card-header">Featured</div>
								<div className="card-body">
									<h5 className="card-title">Special title treatment</h5>
									<p className="card-text">
										With supporting text below as a natural lead-in to
										additional content.
									</p>
									<Link to="/booking">
										<button type="button" class="btn btn-primary">
											Button
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div className="col col-md-6 px-3">
							<div className="card">
								<div className="card-header">Featured</div>
								<div className="card-body">
									<h5 className="card-title">Special title treatment</h5>
									<p className="card-text">
										With supporting text below as a natural lead-in to
										additional content.
									</p>
									<Link to="/booking">
										<button type="button" class="btn btn-primary">
											Button
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="row">
				<Footer />
			</div>
		</>
	);
}
