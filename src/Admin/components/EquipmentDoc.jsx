import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function EquipmentDoc() {
	const [equipment, setEquipment] = useState([]);

	useEffect(() => {
		const getEquipment = async () => {
			const data = await getDocs(collection(db, "equipment"));
			setEquipment(
				data.docs.map((docs) => ({
					...docs.data(),
					id: docs.id,
				}))
			);
		};
		getEquipment();
	}, []);

	const updateEquipment = async (id, inpNum) => {
		const equipDoc = doc(db, "equipment", id);
		const newField = { number: inpNum };
		await updateDoc(equipDoc, newField);
		window.location.reload();
	};

	const [inputValue, setInputValue] = useState("");
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	return (
		<>
			<div className="table-responsive p-3">
				<table class="table text-light table-dark">
					<thead>
						<tr>
							<th scope="col">No</th>
							<th scope="col">Equipment Name</th>
							<th scope="col">Number</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					{equipment.map((equip, index) => {
						return (
							<tbody>
								<tr>
									<th scope="row">{index + 1}</th>
									<td>{equip.id}</td>
									<td>{equip.number}</td>
									<td>
										<div className="row">
											<div className="col col-md-6">
												<div class=" my-3">
													<input
														type="number"
														class="form-control"
														id="exampleFormControlInput1"
														placeholder="any number"
														onChange={handleInputChange}
													/>
												</div>
											</div>
											<div className="col col-md-6">
												<button
													type="button"
													class="btn btn-primary my-3"
													onClick={() => {
														updateEquipment(equip.id, inputValue);
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														class="bi bi-pencil-square"
														viewBox="0 0 16 16"
													>
														<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
														<path
															fill-rule="evenodd"
															d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
														/>
													</svg>
												</button>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						);
					})}
				</table>
			</div>
		</>
	);
}
