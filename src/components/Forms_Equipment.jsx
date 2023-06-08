import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./style/Forms_Equipment.scss";

export default function Forms_Equipment() {
	const handleChangeLocalStorage = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		localStorage.setItem(name, value);
	};

	const items = [
		{ label: "Rostrum", id: "rostrum" },
		{ label: "Banquet Chairs", id: "banquet-chairs" },
		{ label: "Plastic Chairs", id: "plastic-chairs" },
		{ label: "Round Table", id: "round-table" },
		{ label: "Seminar Table", id: "seminar-table" },
		{ label: "Platform", id: "platform" },
		{ label: "Multipurpose Table", id: "multipurpose-table" },
		{ label: "Examination Table", id: "examination-table" },
	];

	const [equip, setEquip] = useState([]);

	useEffect(() => {
		const getEquipment = async () => {
			const data = await getDocs(collection(db, "equipment"));
			const equipmentData = data.docs.map((doc) => ({
				id: doc.id,
				value: doc.data().number.toString(),
			}));
			setEquip(equipmentData);
		};
		getEquipment();
	}, []);

	console.log(equip);

	return (
		<>
			<div className="card" id="card-equipment">
				<div className="card-header text-center">Equipment</div>
				<div className="card-body" id="card-body-equipment">
					{items.map((item, index) => {
						if (index % 2 === 0) {
							return (
								<div className="row my-3" key={index}>
									<div className="col col-lg-6">
										<div className="form-floating mb-3">
											<input
												type="number"
												className="form-control"
												min="0"
												placeholder="number"
												name={item.label}
												max={
													equip.find((equipment) => equipment.id === item.id)
														?.value
												}
												onChange={(event) => handleChangeLocalStorage(event)}
											/>
											<label htmlFor={`floating${item.label}`}>
												{item.label}
											</label>
										</div>
									</div>
									{items[index + 1] && (
										<div className="col col-lg-6">
											<div className="form-floating mb-3">
												<input
													type="number"
													className="form-control"
													min="0"
													name={items[index + 1].label}
													placeholder="number"
													max={
														equip.find((equipment) => equipment.id === items[index + 1].id)
															?.value
													}
													onChange={(event) => handleChangeLocalStorage(event)}
												/>
												<label htmlFor={`floating${items[index + 1].label}`}>
													{items[index + 1].label}
												</label>
											</div>
										</div>
									)}
								</div>
							);
						}
					})}

					<div className="row my-3">
						<div className="col col-md-2"></div>
						<div className="col col-md-8">
							<div class="input-group">
								<span class="input-group-text">Others Equipment</span>
								<input
									type="text"
									aria-label="First name"
									placeholder="Name"
									class="form-control"
								/>
								<input
									type="number"
									aria-label="Last name"
									placeholder="Number"
									min="0"
									class="form-control"
								/>
							</div>
						</div>
						<div className="col col-md-2"></div>
					</div>
				</div>
			</div>
		</>
	);
}
