import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, Route, Router } from "react-router-dom";
import Booking from "./Booking";
import BookingProce from "./BookingProce";
import "./style/Home.scss";
import { useEffect } from "react";

export default function Home() {
	<Router>
		<Route path="booking" element={<Booking />} />
		<Route path="bookingProce" element={<BookingProce />} />
	</Router>;

	useEffect(() => {
		const clearLocalStorage = () => {
			localStorage.clear(); // Clear all localStorage data
		};

		window.onbeforeunload = clearLocalStorage; // Attach the event listener

		return () => {
			window.onbeforeunload = null; // Remove the event listener when the component unmounts
		};
	}, []);

	return (
		<>
			<Navbar />
			<div className="title">
				<h1 class="display-1 mt-3">Welcome</h1>
			</div>
			<div className="container my-5">
				<div className="row p-3">
					<div className="col col-md-6 px-3">
						<div className="card">
							<div className="card-header">Featured</div>
							<div className="card-body">
								<h5 className="card-title">Special title treatment</h5>
								<p className="card-text">
									With supporting text below as a natural lead-in to additional
									content.
								</p>
								<Link to="/booking">
									<button type="button" class="btn">
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
									With supporting text below as a natural lead-in to additional
									content.
								</p>
								<Link to="/booking">
									<button type="button" class="btn">
										Button
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
