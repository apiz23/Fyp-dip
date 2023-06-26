import { useEffect, useState } from "react";
import {
	collection,
	query,
	where,
	getDocs,
	getFirestore,
} from "firebase/firestore";
import "./style/History.scss";

export default function History() {
	const db = getFirestore();
	const historyCollectionRef = collection(db, "history");
	const id = sessionStorage.getItem("username");
	const [history, setHistory] = useState([]);

	useEffect(() => {
		getDocumentsById(id);
	}, []);

	async function getDocumentsById(id) {
		try {
			const q = query(historyCollectionRef, where("id", "==", id));
			const querySnapshot = await getDocs(q);

			const fetchedDocuments = [];
			querySnapshot.forEach((doc) => {
				fetchedDocuments.push(doc.data());
			});

			setHistory(fetchedDocuments);
			console.log("Documents:", fetchedDocuments);
		} catch (error) {
			console.error("Error retrieving documents:", error);
		}
	}

	return (
		<>
			<div className="row my-3">
				<div className="col col-md mx-auto">
					<div className="table-responsive p-3 rounded">
						<table className="table bg-dark text-light" id="tableHistory">
							<thead>
								<tr>
									<th scope="col">No</th>
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
											<td>{h.timeBook}</td>
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
