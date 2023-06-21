import React from "react";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, getDocs, where, deleteDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import "./style/ReserveStatus.scss";

export default function ReserveStatus() {
	
	const id = sessionStorage.getItem("username");

	const [booker, setBooker] = useState([]);
	const bookingCollectionRef = collection(db, "booking-users");
	useEffect(() => {
		const getBooker = async () => {
			const data = await getDocs(bookingCollectionRef);
			setBooker(
				data.docs.map((docs) => ({
					...docs.data(),
					id: docs.id,
				}))
			);
		};
		getBooker();
	}, []);

	const filteredBooker = booker.filter((book) => book.id === id);

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

	return (
		<>
			<div className="row">
				<div className="col col-md mx-auto">
					<div class="card" id="cardStatus">
						<div class="card-header">Booking Status</div>
						<div class="card-body">
							<div class="table-responsive p-3">
								{filteredBooker.length > 0 ? (
									<table class="table table-hover mt-3 text-dark">
										<thead>
											<tr>
												<th scope="col">Booking ID</th>
												<th scope="col">Category</th>
												<th scope="col">Status</th>
												<th scope="col">Action</th>
											</tr>
										</thead>

										{filteredBooker.map((book, index) => (
											<tr key={index}>
												<td>{book.id}</td>
												<td>
													{book.radioBtn === "option1"
														? "Space & Equipment"
														: "Equipment"}
												</td>
												<td>{book.status === 1 ? "Approved" : "Pending"}</td>
												<td>
													<button
														type="button"
														id="viewBtn"
														class="btn btn-primary"
														data-bs-toggle="modal"
														data-bs-target="#exampleModal"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="25"
															height="25"
															fill="currentColor"
															class="bi bi-list-task"
															viewBox="0 0 16 16"
														>
															<path
																fill-rule="evenodd"
																d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
															/>
															<path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
															<path
																fill-rule="evenodd"
																d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
															/>
														</svg>
													</button>

													<div
														class="modal fade"
														id="exampleModal"
														tabindex="-1"
														aria-labelledby="exampleModalLabel"
														aria-hidden="true"
													>
														<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
															<div class="modal-content">
																<div class="modal-header">
																	<h1
																		class="modal-title fs-5 text-dark"
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
																<div class="modal-body text-dark">
																	{Object.entries(book).map(([key, value]) => (
																		<p key={key}>
																			<strong>{key}:</strong> {value}
																		</p>
																	))}
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
														class="btn"
														id="fileBtn"
														onClick={() => {
															handleDownload(book.id);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="25"
															height="25"
															fill="currentColor"
															class="bi bi-download"
															viewBox="0 0 16 16"
														>
															<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
															<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
														</svg>
													</button>
												</td>
											</tr>
										))}
									</table>
								) : (
									<div className="row ">
										<div className="col d-flex justify-content-center">
											<p>No book yet</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
