import React from "react";
import "./Home.scss";
import { useState } from "react";
import Booker from "./BookerDoc";
import SpaceDoc from "./SpaceDoc";
import EquipmentDoc from "./EquipmentDoc";

export default function Home() {
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
			<div className="row">
				<div className="col col-sm-2 mx-auto">
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
					<table className="table table-bordered table-hover">
						{selectOutput === 0 && <Booker />}
						{selectOutput === 1 && <SpaceDoc />}
						{selectOutput === 2 && <EquipmentDoc />}
					</table>
				</div>
			</div>
		</>
	);
}
