import React from "react";
import EquipmentDoc from "../components/EquipmentDoc";
import NavbarAd from "../components/NavbarAd";
import "./style/Equipment.scss";

export default function EquipPage() {
	return (
		<>
			<section className="equipPageSec text-light">
				<NavbarAd />
				<div className="container">
					<p className="display-3 text-center">Equipment List</p>
					<div className="container">
						<div className="row">
							<div className="col col-md ">
								<EquipmentDoc />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
