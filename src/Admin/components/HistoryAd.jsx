import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./style/HistoryAd.scss";

export default function HistoryAd() {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const fetchBooker = async () => {
			const q = query(collection(db, "history"), orderBy("timeBook", "desc"));
			const querySnapshot = await getDocs(q);

			const fetchedBooker = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					...data,
				};
			});
			setHistory(fetchedBooker);
		};

		fetchBooker();
	}, []);

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
												{h.radioBtn === "option1"
													? "Space & Equipment"
													: "Equipment"}
											</td>
											<td
												style={{
													backgroundColor:
														h.status === 1
															? "green"
															: h.status === 2
															? "red"
															: "grey",
												}}
											>
												{h.status === 1
													? "Approved"
													: h.status === 2
													? "Rejected"
													: "Pending"}
											</td>
											<td className="tdSpecial">
												<ol>
													{Object.entries(h)
														.sort(([key1], [key2]) => key1.localeCompare(key2))
														.map(([key, value]) => (
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
