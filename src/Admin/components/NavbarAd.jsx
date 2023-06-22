import "./style/NavbarAd.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../Assets/uthm-favicon/favicon.ico";

export default function NavbarAd() {
	const location = useLocation();
	return (
		<>
			<nav class="navbar navbar-expand-sm navbar-light mb-5" id="navAd">
				<div class="container-fluid">
					<a className="navbar-brand" href="/homeAdmin">
						<img
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top mx-3"
							alt=""
						/>
						<Link to="/homeAdmin">Space & Equipment</Link>
					</a>
					<button
						className="navbar-toggler bg-warning"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse " id="navbarText">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li
								className={`nav-item ${
									location.pathname === "/homeAdmin" ? "active" : ""
								}`}
							>
								<Link className="nav-link" to="/homeAdmin">
									Home
								</Link>
							</li>
							<li
								className={`nav-item ${
									location.pathname === "/spaceAdmin" ? "active" : ""
								}`}
							>
								<Link className="nav-link" to="/spaceAdmin">
									Space
								</Link>
							</li>
							<li
								className={`nav-item ${
									location.pathname === "/equipAdmin" ? "active" : ""
								}`}
							>
								<Link className="nav-link" to="/equipAdmin">
									Equipment
								</Link>
							</li>
							<li
								className={`nav-item ${
									location.pathname === "/" ? "active" : ""
								}`}
							></li>
						</ul>
						<ul className="navbar-nav nav-justified ms-auto mb-lg-0">
							<div className="row">
								<li className="nav-item">
									<Link className="nav-link" to="/">
										<svg
											id="svgLogOut"
											xmlns="http://www.w3.org/2000/svg"
											width="30"
											height="30"
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
								</li>
							</div>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
