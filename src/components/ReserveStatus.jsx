import React from "react";
import { useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
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

	return (
		<>
			<div className="row">
				<div className="col col-md mx-auto">
					<div class="card" id="cardStatus">
						<div class="card-header">Booking Status</div>
						<div class="card-body">
							<div class="table-responsive p-3">
								<table class="table table-hover mt-3 text-dark">
									<thead>
										<tr>
											<th scope="col">No</th>
											<th scope="col">Booking ID</th>
											<th scope="col">Category</th>
											<th scope="col">Status</th>
											<th scope="col">Action</th>
										</tr>
									</thead>

									{filteredBooker.map((book, index) => (
										<tr key={index}>
											<th scope="row">{index + 1}</th>
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
													View
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
											</td>
										</tr>
									))}
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
