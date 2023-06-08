import React from "react";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase-config";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import {
	collection,
	getDocs,
	deleteDoc,
	doc,
	updateDoc,
	getDoc,
} from "firebase/firestore";

export default function Booker() {
	const [booker, setBooker] = useState([]);

	useEffect(() => {
		const getBooker = async () => {
			const data = await getDocs(collection(db, "booking-users"));
			setBooker(
				data.docs.map((docs) => ({
					...docs.data(),
					id: docs.id,
				}))
			);
		};
		getBooker();
	}, []);

	const deleteBooking = async (id) => {
		const bookerDoc = doc(db, "booking-users", id);
		await deleteDoc(bookerDoc);
		window.location.reload();
	};

	const checkSpaceOptionField = async (documentId) => {
		const document = booker.find((book) => book.id === documentId);
		const hasSpaceOption = document && document.spaceOption;
		if (hasSpaceOption) {
			const convertedString = hasSpaceOption.toLowerCase().replace(/\s+/g, "-");
			const equipDoc = doc(db, "space", convertedString);
			const newField = { availability: false, status: 1 };
			await updateDoc(equipDoc, newField);
		}
	};

	const updateBookerEquipment = async (id) => {
		const listEquipDoc = [
			"banquet-chairs",
			"examination-table",
			"multipurpose-table",
			"plastic-chairs",
			"rostrum",
			"round-table",
			"seminar-table",
		];
		const book = booker.find((book) => book.id === id);
		const bookerFields = {};

		if (book) {
			Object.entries(book).forEach(([key, value]) => {
				const newKey = key.toLowerCase().replace(/\s+/g, "-");
				if (listEquipDoc.includes(newKey)) {
					bookerFields[newKey] = value;
				}
			});
		}
		await Promise.all(
			Object.entries(bookerFields).map(async ([key, value]) => {
				const equipDoc = doc(db, "equipment", key);
				const docSnapshot = await getDoc(equipDoc);
				const oldNumber = docSnapshot.data().number;
				const newNumber = oldNumber - value;
				const newField = { number: newNumber };
				await updateDoc(equipDoc, newField);
			})
		);
	};

	const wrapperFX = (id) => {
		checkSpaceOptionField(id);
		updateBookerEquipment(id);
	};

	const [selectedBookId, setSelectedBookId] = useState(null);

	const handleShowModal = (bookId) => {
		setSelectedBookId(bookId);
	};

	const [fileList, setFileList] = useState([]);
	const fileUploadRef = ref(storage, "files");

	useEffect(() => {
		listAll(fileUploadRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					setFileList((prev) => [...prev, { name: item.name, url }]);
				});
			});
		});
	}, []);

	const handleDownload = async (index) => {
		try {
			const file = fileList[index];
			if (file) {
				window.open(file.url, "_blank");
			} else {
				console.error("Invalid file index");
			}
		} catch (error) {
			console.error("Error opening file:", error);
		}
	};

	return (
		<>
			<thead>
				<tr>
					<th scope="col">No</th>
					<th scope="col">Booking ID</th>
					<th scope="col">Category</th>
					<th scope="col">Status</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			{booker.map((book, index) => {
				return (
					<tbody>
						<tr>
							<th scope="row">{index + 1}</th>
							<td>{book.id}</td>
							<td>
								{book.radioBtn == "option1" ? "Space & Equipment" : "Equipment"}
							</td>
							<td>{book.status == 1 ? "Approved" : "Pending"}</td>
							<td>
								<button
									type="button"
									class="btn btn-danger"
									onClick={() => {
										deleteBooking(book.id);
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										class="bi bi-trash"
										viewBox="0 0 16 16"
									>
										<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
										<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
									</svg>
								</button>

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
									class="modal fade"
									id={`exampleModal-${book.id}`}
									tabindex="-1"
									aria-labelledby={`exampleModalLabel-${book.id}`}
									aria-hidden="true"
								>
									<div class="modal-dialog modal-dialog-scrollable">
										<div class="modal-content">
											<div class="modal-header">
												<h1 class="modal-title fs-5" id="exampleModalLabel">
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
													<ol class="list-group list-group-numbered">
														{Object.entries(book).map(([key, value]) => {
															if (key !== "id") {
																return (
																	<li class="list-group-item" key={key}>
																		{key.charAt(0).toUpperCase() + key.slice(1)}
																		: {value}
																	</li>
																);
															}
															return null;
														})}
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
												<button type="button" class="btn btn-primary">
													Save changes
												</button>
											</div>
										</div>
									</div>
								</div>

								<button
									type="button"
									class="btn btn-warning"
									onClick={() => {
										handleDownload(1);
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
										wrapperFX(book.id);
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
							</td>
						</tr>
					</tbody>
				);
			})}
		</>
	);
}
