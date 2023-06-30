import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./style/HistoryAd.scss";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function HistoryAd() {
	const [history, setHistory] = useState([]);
	const [searchId, setSearchId] = useState("");
	const [searchMonth, setSearchMonth] = useState("");
	const [filteredHistory, setFilteredHistory] = useState([]);

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

	const handleSearch = (e) => {
		const value = e.target.value.toUpperCase();
		setSearchId(value);

		const filteredEntries = history.filter((entry) => entry.id === value);
		setFilteredHistory(filteredEntries);
	};

	const handleSearchMonth = (e) => {
		const value = e.target.value;
		setSearchMonth(value);

		const filteredEntries = history.filter((entry) => {
			const entryMonth = new Date(entry.timeBook).getMonth() + 1;
			return entryMonth.toString() === value;
		});
		setFilteredHistory(filteredEntries);
	};

	const handlePrint = () => {
		const doc = new jsPDF();
		doc.autoTable({ html: "#tableAdHistory" });
		doc.save("history.pdf");
	};

	return (
		<>
			<div className="row pt-3">
				<div className="col col-md ms-3">
					<input
						type="text"
						className="form-control my-3"
						id="search"
						value={searchId}
						onChange={handleSearch}
						placeholder="Enter ID"
						style={{ width: "fit-content", height: "min-content" }}
					/>
					<input
						type="number"
						className="form-control"
						id="search"
						value={searchMonth}
						onChange={handleSearchMonth}
						placeholder="Enter Month [number]"
						style={{ width: "fit-content", height: "min-content" }}
					/>
					<button className="btn btn-warning" onClick={handlePrint}>
						Print PDF
					</button>
				</div>
			</div>
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
								{searchId || searchMonth ? (
									filteredHistory.length > 0 ? (
										filteredHistory.map((h, index) => {
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
																.sort(([key1], [key2]) =>
																	key1.localeCompare(key2)
																)
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
										})
									) : (
										<tr>
											<td colSpan="6" className="bg-danger">
												No results found.
											</td>
										</tr>
									)
								) : (
									history.map((h, index) => {
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
															.sort(([key1], [key2]) =>
																key1.localeCompare(key2)
															)
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
									})
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
