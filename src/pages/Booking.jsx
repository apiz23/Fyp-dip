import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Forms from "../components/Forms";
import FormsSpace from "../components/Forms_Space";
import FormsEquipment from "../components/Forms_Equipment";
import { db } from "../firebase-config";
import { collection, setDoc, doc } from "firebase/firestore";
import "./style/Booking.scss";

export default function Booking() {
	const [radioValue, setRadioValue] = useState("");

	const handleRadioChange = (event) => {
		setRadioValue(event.target.value);
		localStorage.setItem(event.target.name, event.target.value);
	};

	const [formPage, setFormPage] = useState(0);

	const handleChangeFormPage = (page) => {
		setFormPage(page);
	};

	const getAllLocalStorageData = () => {
		var localStorageDataObj = { status: 0 };

		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			localStorageDataObj[key] = value;
		}
		return localStorageDataObj;
	};

	const bookingCollectionRef = collection(db, "booking-users");
	async function createReservation() {
		try {
			const arr = getAllLocalStorageData();
			const id = sessionStorage.getItem("username");
			const ref = doc(bookingCollectionRef, id);
			await setDoc(ref, arr);
		} catch (error) {
			console.error(error);
		}
	}

	const username = sessionStorage.getItem("username");

	const [showAlert, setShowAlert] = useState(false);

	const handleButtonClick = () => {
		setShowAlert(true);
	};

	const wrapperFunction = () => {
		handleButtonClick();
		// createReservation();
	};
	return (
		<>
			<section className="bookingSection">
				<Navbar />

				{formPage === 0 ? (
					<>
						<div className="p-3">
							<div className="row ">
								<div className="col d-flex justify-content-center">
									<button
										type="button"
										className="btn btn-danger"
										data-bs-toggle="modal"
										data-bs-target="#staticBackdrop"
									>
										Instruction
									</button>
									<div
										className="modal fade"
										id="staticBackdrop"
										data-bs-backdrop="static"
										data-bs-keyboard="false"
										tabindex="-1"
										aria-labelledby="staticBackdropLabel"
										aria-hidden="true"
									>
										<div className="modal-dialog modal-dialog-centered ">
											<div className="modal-content m-3">
												<div className="modal-header">
													<h1
														className="modal-title fs-5"
														id="staticBackdropLabel"
													>
														Instruction
													</h1>
													<button
														type="button"
														className="btn-close"
														data-bs-dismiss="modal"
														aria-label="Close"
													></button>
												</div>
												<div className="modal-body">
													<ul className="list-group list-group-flush">
														<li className="list-group-item">
															Borang ini adalah sah untuk tempahan penggunaan
															ruang dan peralatan di bawah penyeliaan Pejabat
															Pentadbiran Kampus Pagoh
														</li>
														<li className="list-group-item">
															Pemohon hanya perlu mengisi BAHAGIAN (A) sahaja
														</li>
													</ul>
												</div>
												<div className="modal-footer">
													<button
														type="button"
														className="btn btn-secondary"
														data-bs-dismiss="modal"
													>
														Close
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row d-flex justify-content-center">
									<div className="col-md-10">
										<div className="card mx-auto" id="card">
											<div className="card-header bg-dark text-center">
												<strong>Section A</strong>
											</div>
											<div className="card-body">
												<Forms />
											</div>
										</div>
										<div className="row">
											<div className="col d-flex justify-content-center">
												<button
													type="button"
													className="btn btn-primary"
													onClick={() => {
														handleChangeFormPage(1);
													}}
												>
													Next Section
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) : null}

				{formPage === 1 ? (
					<>
						<div className="row d-flex justify-content-center w-100">
							<div className="col col-md d-flex justify-content-center">
								<button
									className="btn mt-4"
									id="btnBack"
									onClick={() => {
										handleChangeFormPage(0);
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="30"
										height="30"
										fill="currentColor"
										className="bi bi-arrow-left-circle-fill"
										viewBox="0 0 16 16"
									>
										<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
									</svg>
								</button>
								<div className="radios mt-3 text-dark">
									<div className="form-check form-check-inline">
										<input
											className="form-check-input"
											type="radio"
											name="radioBtn"
											id="rdb1"
											value="option1"
											checked={radioValue === "option1"}
											onChange={handleRadioChange}
										/>
										<label
											className="form-check-label text-light"
											for="inlineRadio1"
										>
											Space & Equipment
										</label>
									</div>
									<div className="form-check form-check-inline">
										<input
											className="form-check-input"
											type="radio"
											name="radioBtn"
											id="rdb2"
											value="option2"
											checked={radioValue === "option2"}
											onChange={handleRadioChange}
										/>
										<label
											className="form-check-label text-light"
											for="inlineRadio2"
										>
											Equipment Only
										</label>
									</div>
								</div>
							</div>
							{radioValue === "option1" ? (
								<>
									<div className="row mx-1 d-flex justify-content-center">
										<div className="col-md-8">
											<FormsSpace />
										</div>
									</div>
									<div className="row mx-1 d-flex justify-content-center">
										<div className="col-md-8">
											<FormsEquipment />
										</div>
									</div>
								</>
							) : (
								<div className="row my-3 mx-1 d-flex justify-content-center ">
									<div class="col-md-8">
										<FormsEquipment />
									</div>
								</div>
							)}
							<div className="row">
								<div className="col d-flex justify-content-center flex-column align-items-center">
									{showAlert && (
										<>
											<div class="alert alert-info" role="alert">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													fill="currentColor"
													className="bi bi-check-circle me-3"
													viewBox="0 0 16 16"
												>
													<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
													<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
												</svg>
												Your Booking have been placed and have been Email
											</div>
										</>
									)}
									<button
										className="btn btn-danger p-3"
										id="btnSubmit"
										onClick={() => {
											wrapperFunction();
										}}
									>
										<span className="me-3">Submit</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="25"
											height="25"
											fill="currentColor"
											class="bi bi-send"
											viewBox="0 0 16 16"
										>
											<path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</>
				) : null}
				<Footer />
			</section>
		</>
	);
}
