import "./style/Home.scss";
import { useState } from "react";
import Booker from "../components/BookerDoc";
import SpaceDoc from "../components/SpaceDoc";
import EquipmentDoc from "../components/EquipmentDoc";
import NavbarAd from "../components/NavbarAd";

export default function HomeAd() {
	const [selectOutput, setSelectedOutput] = useState(0);

	const handleOutput = (x) => {
		setSelectedOutput(x);
	};

	const buttonData = [
		{ label: "Bookers", value: 0 },
		{ label: "Space", value: 1 },
		{ label: "Equipment", value: 2 },
	];

	return (
		<>
			<section className="homeSec">
				<NavbarAd />
				<div className="container text-center">
					<p className="display-3">Admin Page</p>
					<div className="col m-1">
						<div className="row">
							<div className="col">
								<Booker />
							</div>
							{/* <div className="col col-sm-2 mx-auto">
								{buttonData.map((button) => (
									<button
										key={button.value}
										type="button"
										className="btn btn-primary btn-lg"
										onClick={() => handleOutput(button.value)}
									>
										{button.label}
									</button>
								))}
							</div>
							<div className="col col-sm-10">
								<div class="table-responsive p-3">
									<table className="table table-bordered table-hover text-dark">
										{selectOutput === 0 && <Booker />}
										{selectOutput === 1 && <SpaceDoc />}
										{selectOutput === 2 && <EquipmentDoc />}
									</table>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
