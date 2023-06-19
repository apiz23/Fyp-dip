import React from "react";
import NavbarAd from "../components/NavbarAd";
import SpaceDoc from "../components/SpaceDoc";
import "./style/Space.scss"

export default function SpacePage() {
	return (
		<>
			<section className="spacePageSec">
				<NavbarAd />
				<div className="container text-center">
					<p className="display-3">Space List</p>
					<div className="col m-1">
						<div className="row">
							<div className="col col-md">
								<SpaceDoc />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
