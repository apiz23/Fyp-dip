import "./style/NavbarAd.scss";
import { Link, useLocation } from "react-router-dom";

export default function NavbarAd() {
	const location = useLocation();
	return (
		<>
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div
						class="collapse navbar-collapse justify-content-center"
						id="navbarText"
					>
						<ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
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
							>
								<Link className="nav-link" to="/">
									Exit
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
