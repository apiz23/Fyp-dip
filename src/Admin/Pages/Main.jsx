import React from "react";
import Home from "../components/Home";
import NavbarAd from "../components/NavbarAd";

export default function Main() {
	return (
		<>
			<NavbarAd />
			<div className="row">
				<div className="col m-1">
					<Home />
				</div>
			</div>
		</>
	);
}
