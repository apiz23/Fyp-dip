import React from "react";
import "./style/NavbarAd.scss";

export default function NavbarAd() {
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
							<li class="nav-item">
								<a class="nav-link active" aria-current="page" href="/homeAdmin">
									Home
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/spaceAdmin">
									Space
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/equipAdmin">
									Equipment
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/">
									Exit
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
				<div class="container-fluid">
					<a class="navbar-brand my-1" href="#">
						Admin Page
					</a>
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
					<div class="collapse navbar-collapse" id="navbarText">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
							<li class="nav-item">
								<a class="nav-link active" aria-current="page" href="#">
									Home
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">
									Features
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/">
									Exit
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav> */}
		</>
	);
}
