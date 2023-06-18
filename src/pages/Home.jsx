import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Route, Router } from "react-router-dom";
import Booking from "./Booking";
import BookingProce from "./BookingProce";
import ReserveStatus from "../components/ReserveStatus";
import "./style/Home.scss";
import pic from "../Assets/pic.jpeg";

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
					<h1 className="display-2 mt-5">Welcome</h1>
					<h1 className="display-3">To</h1>
					<h1 className="display-4">SPACE AND EQUIPMENT BOOKING SYSTEM</h1>
				</div>
				<div className="container mt-5 col-md-10">
					<div className="row">
						<div className="col col-md">
							<ReserveStatus />
						</div>
					</div>
					<div className="row my-3 d-flex justify-content-center">
						<div className="col col-md">
							<div class="card mb-3">
								<div class="row g-0">
									<div class="col-md-8">
										<div class="card-body">
											<h5 class="card-title">Card title</h5>
											<p class="card-text">
												This is a wider card with supporting text below as a
												natural lead-in to additional content. This content is a
												little bit longer.
											</p>
											<p class="card-text">
												<small class="text-body-secondary">
													Last updated 3 mins ago
												</small>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row my-3 d-flex justify-content-center">
						<div className="col col-md">
							<div className="card mb-3">
								<div className="row g-0">
									<div className="col-md-8">
										<div className="card-body">
											<h5 className="card-title">Card title</h5>
											<p className="card-text">
												This is a wider card with supporting text below as a
												natural lead-in to additional content. This content is a
												little bit longer.
											</p>
											<p className="card-text">
												<small className="text-body-secondary">
													Last updated 3 mins ago
												</small>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
