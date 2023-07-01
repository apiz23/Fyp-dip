import { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, getDocs, where, deleteDoc, doc } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import "./style/ReserveStatus.scss";
import { Link } from "react-router-dom";

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

	const deleteBooking = async (id) => {
		const bookerDoc = doc(db, "booking-users", id);
		await deleteDoc(bookerDoc);
		window.location.reload();
	};

	const handleDownload = async (bookId) => {
		try {
			const timeBookField = filteredBooker.find(({ timeBook }) => timeBook);
			const formattedTime = timeBookField.timeBook.replace(/[/:, ]|AM|PM/g, "");

			const storageRef = ref(storage, `${bookId}`);
			const fileList = await listAll(storageRef);

			const matchingFiles = fileList.items.filter((fileRef) =>
				fileRef.name.startsWith(formattedTime)
			);

			if (matchingFiles.length > 0) {
				const fileRef = matchingFiles[0];
				const url = await getDownloadURL(fileRef);
				window.open(url, "_blank");
			} else {
				console.error("No matching files found in the folder");
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
												<td>
													{book.status === 1
														? "Approved"
														: book.status === 2
														? "Rejected"
														: "Pending"}
												</td>
												<td
													className="d-flex justify-content-center"
													style={{ display: "flex", alignItems: "center" }}
												>
													<div class="accordion" id="accordionExample">
														<div class="accordion-item">
															<h2 class="accordion-header">
																<button
																	className="accordion-button"
																	type="button"
																	data-bs-toggle="collapse"
																	data-bs-target="#collapseOne"
																	aria-expanded="true"
																	aria-controls="collapseOne"
																>
																	Details
																</button>
															</h2>
															<div
																id="collapseOne"
																class="accordion-collapse collapse "
																data-bs-parent="#accordionExample"
															>
																<div class="accordion-body" id="detailsBody">
																	{Object.entries(book).map(([key, value]) => (
																		<p key={key}>
																			<strong>{key}:</strong> {value}
																		</p>
																	))}
																</div>
															</div>
														</div>
													</div>
													<div
														class="btn-group"
														role="group"
														aria-label="Basic example"
													>
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
														<button
															type="button"
															class="btn btn-danger"
															id="deleteBtn"
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
													</div>
												</td>
											</tr>
										))}
									</table>
								) : (
									<div className="row d-flex justify-content-center">
										<div className="col col-md d-flex flex-column align-items-center justify-content-center">
											<span className="mt-4 mx-3">No book yet</span>
											<Link to="/booking">
												<button
													type="button"
													className="btn btn-outline-primary"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="25"
														height="25"
														fill="currentColor"
														className="bi bi-arrow-right-circle me-3 my-1"
														viewBox="0 0 16 16"
													>
														<path
															fillRule="evenodd"
															d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
														/>
													</svg>
													Click Here to Book
												</button>
											</Link>
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
