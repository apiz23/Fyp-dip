import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Forms from "../components/Forms";
import FormsSpace from "../components/Forms_Space";
import FormsEquipment from "../components/Forms_Equipment";
import { db, storage } from "../firebase-config";
import { collection, doc, writeBatch } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "./style/Booking.scss";

export default function Booking() {
	const [radioValue, setRadioValue] = useState("option2");
	const [fileUpload, setFileUpload] = useState(null);
	const [fileList, setFileList] = useState([]);
	const [showAlert, setShowAlert] = useState(false);

	const [checkboxChecked, setCheckboxChecked] = useState(false);

	const handleCheckboxChange = () => {
		setCheckboxChecked(!checkboxChecked);
	};

	const handleSubmit = () => {
		if (checkboxChecked) {
			wrapperFunction();
			uploadFile();
		} else {
			alert("Please check the checkbox before submitting.");
		}
	};

	const handleRadioChange = (event) => {
		setRadioValue(event.target.value);
		localStorage.setItem(event.target.name, event.target.value);
	};

	const uploadFile = () => {
		if (fileUpload == null) return;
		const id = sessionStorage.getItem("username");
		const fileRef = ref(storage, `${id}/${fileUpload.name}`);
		uploadBytes(fileRef, fileUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setFileList((prev) => [...prev, url]);
			});
		});
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
	const historyCollectionRef = collection(db, "history");
	async function createReservation() {
		try {
			const arr = getAllLocalStorageData();
			const id = sessionStorage.getItem("username");
			const bookingRef = doc(bookingCollectionRef, id);
			const historyRef = doc(historyCollectionRef, id);

			const batch = writeBatch(db);
			batch.set(bookingRef, arr);
			batch.set(historyRef, arr);

			await batch.commit();
		} catch (error) {
			console.error(error);
		}
	}

	const handleButtonClick = () => {
		setShowAlert(true);
	};

	const wrapperFunction = () => {
		handleButtonClick();
		createReservation();
	};

	return (
		<>
			<section className="bookingSection">
				<Navbar />
				<div className="container-fluid" style={{ maxWidth: "1200px" }}>
					<div className="row">
						<div className="col d-flex justify-content-center">
							<button
								type="button"
								className="btn btn-warning position-relative my-5"
								data-bs-toggle="modal"
								data-bs-target="#staticBackdrop"
							>
								Instruction
								<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										class="bi bi-chat-quote-fill"
										viewBox="0 0 16 16"
									>
										<path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 6C4.776 6 4 6.746 4 7.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 9.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 6c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z" />
									</svg>
									<span class="visually-hidden">unread messages</span>
								</span>
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
											<h1 className="modal-title fs-5" id="staticBackdropLabel">
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
													Borang ini adalah sah untuk tempahan penggunaan ruang
													dan peralatan di bawah penyeliaan Pejabat Pentadbiran
													Kampus Pagoh
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
					</div>
					<div className="row d-flex justify-content-center">
						<div className="col-md">
							<div className="card mx-auto" id="card">
								<div className="card-header bg-dark text-center">
									<strong>Section A</strong>
								</div>
								<div
									className="card-body"
									style={{
										background: "rgb(204,207,210)",
										background:
											"radial-gradient(circle, rgba(204,207,210,1) 0%, rgba(90,107,177,1) 100%)",
									}}
								>
									<Forms />
									<div class="input-group">
										<input
											type="file"
											className="form-control"
											id="inputFile"
											onChange={(event) => {
												setFileUpload(event.target.files[0]);
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row d-flex justify-content-center w-100">
					<div className="col col-md d-flex justify-content-center">
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
							<div className="row ms-2 d-flex justify-content-center">
								<div className="col-md-8">
									<FormsSpace />
								</div>
							</div>
							<div className="row ms-2 d-flex justify-content-center">
								<div className="col-md-8">
									<FormsEquipment />
								</div>
							</div>
						</>
					) : (
						<div className="row my-3 ms-2 d-flex justify-content-center ">
							<div class="col-md-8">
								<FormsEquipment />
							</div>
						</div>
					)}
					<div className="row">
						<div className="col d-flex justify-content-center flex-column align-items-center">
							<div className="checkbox-wrapper-46">
								<input
									className="inp-cbx"
									id="cbx-46"
									type="checkbox"
									checked={checkboxChecked}
									onChange={handleCheckboxChange}
								/>
								<label className="cbx" for="cbx-46">
									<span>
										<svg width={"12px"} height={"10px"} viewbox="0 0 12 10">
											<polyline points="1.5 6 4.5 9 10.5 1"></polyline>
										</svg>
									</span>
									<span>
										Please make sure to check the checkbox to enable use to
										store this <strong>Booking information</strong> in the
										history database
									</span>
								</label>
							</div>
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
								onClick={handleSubmit}
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
				<Footer />
			</section>
		</>
	);
}
