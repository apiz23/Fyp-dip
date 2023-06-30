import emailjs from "emailjs-com";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase-config";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import {
	collection,
	getDocs,
	doc,
	updateDoc,
	query,
	orderBy,
	getDoc,
	addDoc,
} from "firebase/firestore";

export default function Booker() {
	const [booker, setBooker] = useState([]);
	const [history, setHistory] = useState([]);
	const [historyIds, setHistoryIds] = useState([]);

	useEffect(() => {
		const getHistory = async () => {
			const data = await getDocs(collection(db, "history"));
			const historyData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setHistory(historyData);
			setHistoryIds(data.docs.map((doc) => doc.id));
		};

		getHistory();
	}, []);

	const filterHistoryByTimeBook = (timeBook) => {
		const filteredHistory = history.filter((doc) => doc.timeBook === timeBook);
		const filteredIds = filteredHistory.map((doc) => doc.id);
		setHistory(filteredHistory);
		return filteredIds;
	};

	useEffect(() => {
		const fetchBooker = async () => {
			const q = query(collection(db, "booking-users"), orderBy("timeBook"));
			const querySnapshot = await getDocs(q);
			const fetchedBooker = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					...data,
				};
			});
			setBooker(fetchedBooker);
		};

		fetchBooker();
	}, []);

	const updateStatusReject = async (id, time) => {
		const idHistory = filterHistoryByTimeBook(time);
		console.log(idHistory);
		const book = doc(db, "booking-users", id);
		const history = doc(db, "history", idHistory[0]);
		const newField = { status: 2 };
		await updateDoc(book, newField);
		await updateDoc(history, newField);
		window.location.reload();
	};

	const updateStatus = async (id) => {
		const equipDoc = doc(db, "booking-users", id);
		const equipSnapshot = await getDoc(equipDoc);

		if (equipSnapshot.exists()) {
			const equipData = equipSnapshot.data();
			const fieldArray = Object.keys(equipData).reduce((obj, key) => {
				obj[key] = equipData[key];
				return obj;
			}, {});
			fieldArray.status = 1;
			const historyCollection = collection(db, "history");
			await addDoc(historyCollection, fieldArray);
			const newField = { status: 1 };
			await updateDoc(equipDoc, newField);
			window.location.reload();
		} else {
			console.log("Document does not exist.");
		}
	};

	const wrapperFX = (id, status, award, message) => {
		updateStatus(id);
		sendEmail(id, status, award, message);
		
	};

	const [selectedBookId, setSelectedBookId] = useState(null);

	const handleShowModal = (bookId) => {
		setSelectedBookId(bookId);
	};

	const handleDownload = async (bookId) => {
		try {
			const storageRef = ref(storage, `${bookId}`);
			const fileList = await listAll(storageRef);

			if (fileList.items.length > 0) {
				const fileRef = fileList.items[0];
				const url = await getDownloadURL(fileRef);
				window.open(url, "_blank");
			} else {
				console.error("No files found in the folder");
			}
		} catch (error) {
			console.error("Error downloading file:", error);
		}
	};

	useEffect(() => {
		emailjs.init("RJYPtCeKGZ9btOiV7");
	}, []);

	const sendEmail = (id, s, a, m) => {
		const templateParams = {
			to_email: id,
			award: a,
			status: s,
			from_name: "Admin",
			message: m,
		};

		emailjs.send("service_7nsdum6", "template_7mg6uhn", templateParams).then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	return (
		<>
			<div className="table-responsive p-3 text-light rounded">
				<table className="table text-light table-dark">
					<thead>
						<tr>
							<th scope="col">No</th>
							<th scope="col">Booking ID</th>
							<th scope="col">Booking Date</th>
							<th scope="col">Category</th>
							<th scope="col">Status</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{booker.map((book, index) => {
							return (
								<tr key={book.id}>
									<th scope="row">{index + 1}</th>
									<td>{book.id}</td>
									<td>{book.timeBook}</td>
									<td>
										{book.radioBtn === "option1"
											? "Space & Equipment"
											: "Equipment"}
									</td>
									<td
										style={{
											backgroundColor:
												book.status === 1
													? "green"
													: book.status === 2
													? "red"
													: "grey",
										}}
									>
										{book.status === 1
											? "Approved"
											: book.status === 2
											? "Rejected"
											: "Pending"}
									</td>

									<td>
										<div
											class="btn-group"
											role="group"
											aria-label="Basic mixed styles example"
										>
											<button
												type="button"
												class="btn btn-info"
												data-bs-toggle="modal"
												data-bs-target={`#exampleModal-${book.id}`}
												onClick={() => handleShowModal(book.id)}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													fill="currentColor"
													class="bi bi-card-list"
													viewBox="0 0 16 16"
												>
													<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
													<path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
												</svg>
											</button>
											<div
												className="modal fade"
												id={`exampleModal-${book.id}`}
												tabindex="-1"
												aria-labelledby={`exampleModalLabel-${book.id}`}
												aria-hidden="true"
											>
												<div class="modal-dialog modal-dialog-scrollable">
													<div class="modal-content">
														<div class="modal-header">
															<h1
																class="modal-title fs-5"
																id="exampleModalLabel"
															>
																Details
															</h1>
															<button
																type="button"
																class="btn-close"
																data-bs-dismiss="modal"
																aria-label="Close"
															></button>
														</div>
														<div class="modal-body">
															{selectedBookId === book.id && (
																<ol>
																	{Object.entries(book)
																		.filter(([key]) => key !== "id")
																		.sort(([key1], [key2]) =>
																			key1.localeCompare(key2)
																		)
																		.map(([key, value]) => (
																			<li key={key}>
																				{key.charAt(0).toUpperCase() +
																					key.slice(1)}
																				: {value}
																			</li>
																		))}
																</ol>
															)}
														</div>
														<div class="modal-footer">
															<button
																type="button"
																class="btn btn-secondary"
																data-bs-dismiss="modal"
															>
																Close
															</button>
														</div>
													</div>
												</div>
											</div>
											<button
												type="button"
												class="btn btn-warning"
												onClick={() => {
													handleDownload(book.id);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													fill="currentColor"
													class="bi bi-file-earmark-arrow-down"
													viewBox="0 0 16 16"
												>
													<path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
													<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
												</svg>
											</button>

											<button
												type="button"
												class="btn btn-success"
												onClick={() => {
													wrapperFX(
														book.id,
														"Approved",
														"Congratulation",
														"Congratulation, your Booking have been approved."
													);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													fill="currentColor"
													class="bi bi-arrow-bar-up"
													viewBox="0 0 16 16"
												>
													<path
														fill-rule="evenodd"
														d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
													/>
												</svg>
											</button>
											<button
												type="button"
												className="btn btn-danger"
												onClick={() => {
													updateStatusReject(book.id, book.timeBook);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													fill="currentColor"
													class="bi bi-x-lg"
													viewBox="0 0 16 16"
												>
													<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
												</svg>
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
