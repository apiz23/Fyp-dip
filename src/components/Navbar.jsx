import React from "react";
import Login from "../pages/Login";
import logo from "../Assets/uthm-favicon/favicon.ico";
import { Link } from "react-router-dom";
import "./style/Navbar.scss";
import ReserveStatus from "./ReserveStatus";

export default function Navbar() {
	const home =
		window.location.pathname === "/" ? "nav-link active" : "nav-link";
	const booking = window.location.pathname.match(/^\/Booking/)
		? "nav-link active"
		: "nav-link";
	const bookingProce = window.location.pathname.match(/^\/BookingProce/)
		? "nav-link active"
		: "nav-link";

	const handleClearLocalStorage = () => {
		localStorage.clear();
		sessionStorage.removeItem("loggedIn");
	};
	return (
		<>
			<nav className="navbar sticky-top navbar-expand-md bg-dark">
				<div className="container-fluid">
					<a className="navbar-brand" href="/home">
						<img
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top mx-3"
							alt=""
						/>
						<Link to="/home">Space & Equipment</Link>
					</a>
					<button
						className="navbar-toggler bg-warning"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<a className={home}>
									<Link to="/home"> Home</Link>
								</a>
							</li>
							<li className="nav-item">
								<a className={booking}>
									<Link to="/booking">Booking</Link>
								</a>
							</li>
							<li className="nav-item">
								<a className={bookingProce}>
									<Link to="/bookingProce">Booking Procedure</Link>
								</a>
							</li>
						</ul>
						<ul className="navbar-nav nav-justified ms-auto mb-2 mb-lg-0">
							<div className="row">
								<li className="nav-item">
									<a className={bookingProce}>
										<Link to="/bookingProce">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="30"
												height="25"
												fill="currentColor"
												class="bi bi-person-circle"
												viewBox="0 0 16 16"
											>
												<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
												<path
													fill-rule="evenodd"
													d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
												/>
											</svg>
										</Link>
									</a>
								</li>
								<li className="nav-item">
									<a className={Login} onClick={handleClearLocalStorage}>
										<Link to="/">
											<svg
												id="svgLogOut"
												xmlns="http://www.w3.org/2000/svg"
												width="30"
												height="25"
												fill="currentColor"
												class="bi bi-box-arrow-in-right"
												viewBox="0 0 16 16"
											>
												<path
													fill-rule="evenodd"
													d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
												/>
												<path
													fill-rule="evenodd"
													d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
												/>
											</svg>
										</Link>
									</a>
								</li>
							</div>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
