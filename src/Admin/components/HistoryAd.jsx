import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function HistoryAd() {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const getHistory = async () => {
			const data = await getDocs(collection(db, "history"));
			const ids = data.docs.map((doc) => doc.id);
			setHistory(
				data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		};
		getHistory();
	}, []);

	console.log(history);
	return (
		<>
			<div className="row my-3">
				<div className="col col-md mx-auto">
					<div className="table-responsive p-3 rounded">
						<table className="table bg-dark text-light" id="tableAdHistory">
							<thead>
								<tr>
									<th scope="col">No</th>
									<th scope="col">Booking Id</th>
									<th scope="col">Booking Date</th>
									<th scope="col">Category</th>
									<th scope="col">Status</th>
									<th scope="col">Details</th>
								</tr>
							</thead>
							<tbody>
								{history.map((h, index) => {
									return (
										<tr key={h.id}>
											<th scope="row">{index + 1}</th>
											<td scope="row">{h.id}</td>
											<td scope="row">{h.timeBook}</td>
											<td>
												{h.radioButton === "option1"
													? "Space & Equipment"
													: "Equipment"}
											</td>
											<td>
												{h.status === 1
													? "Approved"
													: h.status === 2
													? "Rejected"
													: "Pending"}
											</td>
											<td>
												<ol>
													{Object.entries(h).map(([key, value]) => (
														<li key={key}>
															<strong>{key}: </strong>
															{value}
														</li>
													))}
												</ol>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
