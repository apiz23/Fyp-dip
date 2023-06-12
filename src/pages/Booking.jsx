import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./style/Booking.scss";
import Forms from "../components/Forms";
import FormsSpace from "../components/Forms_Space";
import FormsEquipment from "../components/Forms_Equipment";
import { db } from "../firebase-config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

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
	return (
		<>
			<section className="bookingSection">
				<Navbar />

				{formPage === 0 ? (
					<>
						<div className="row">
							<div className="col col-mx-2 d-flex justify-content-center">
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
									<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
										<div className="modal-content ">
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
												<ul class="list-group list-group-flush">
													<li class="list-group-item">
														Borang ini adalah sah untuk tempahan penggunaan
														ruang dan peralatan di bawah penyeliaan Pejabat
														Pentadbiran Kampus Pagoh
													</li>
													<li class="list-group-item">
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
							<div class="row">
								<div class="col-md-1"></div>
								<div class="col-md-10">
									<div className="card mx-auto" id="card">
										<div className="card-header text-center">
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
												Next Page
											</button>
										</div>
									</div>
								</div>
								<div class="col-md-1"></div>
							</div>
						</div>
					</>
				) : null}

				{formPage === 1 ? (
					<>
						<div className="row justify-content-center">
							<div className="col col-md-8 d-flex">
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
										class="bi bi-arrow-left-circle-fill"
										viewBox="0 0 16 16"
									>
										<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
									</svg>
								</button>
								<div className="radios mt-3">
									<div class="form-check form-check-inline">
										<input
											class="form-check-input"
											type="radio"
											name="radioBtn"
											id="rdb1"
											value="option1"
											checked={radioValue === "option1"}
											onChange={handleRadioChange}
										/>
										<label class="form-check-label" for="inlineRadio1">
											Space & Equipment
										</label>
									</div>
									<div class="form-check form-check-inline">
										<input
											class="form-check-input"
											type="radio"
											name="radioBtn"
											id="rdb2"
											value="option2"
											checked={radioValue === "option2"}
											onChange={handleRadioChange}
										/>
										<label class="form-check-label" for="inlineRadio2">
											Equipment Only
										</label>
									</div>
								</div>
							</div>
						</div>
						{radioValue === "option1" ? (
							<>
								<div className="row mx-1">
									<div class="col-md-2"></div>
									<div class="col-md-8">
										<FormsSpace />
									</div>
									<div class="col-md-2"></div>
								</div>
								<div className="row mx-1">
									<div class="col-md-2"></div>
									<div class="col-md-8">
										<FormsEquipment />
									</div>
									<div class="col-md-2"></div>
								</div>
							</>
						) : (
							<div className="row my-3 mx-1">
								<div class="col-md-2"></div>
								<div class="col-md-8">
									<FormsEquipment />
								</div>
								<div class="col-md-2"></div>
							</div>
						)}
						<div className="row">
							<div className="col d-flex justify-content-center">
								<button
									className="btn btn-danger"
									id="btnSubmit"
									onClick={() => {
										createReservation();
									}}
								>
									submit
								</button>
							</div>
						</div>
					</>
				) : null}
			</section>
			<Footer />
		</>
	);
}
