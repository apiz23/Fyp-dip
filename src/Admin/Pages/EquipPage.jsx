import React from "react";
import EquipmentDoc from "../components/EquipmentDoc";
import FooterAd from "../components/FooterAd";
import NavbarAd from "../components/NavbarAd";
import "./style/Equipment.scss";

export default function EquipPage() {
	return (
		<>
			<section className="equipPageSec text-light">
				<NavbarAd />
				<p className="display-3 text-center">Equipment List</p>
				<div className="container">
					<div className="row">
						<div className="col col-md ">
							<EquipmentDoc />
						</div>
					</div>
				</div>
			</section>
			<FooterAd />
		</>
	);
}
