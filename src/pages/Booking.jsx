import { useState } from "react";
import { useNavigate } from "react-router";
import { db, storage } from "../firebase-config";
import { collection, doc, writeBatch } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Forms from "../components/Forms";
import FormsSpace from "../components/Forms_Space";
import FormsEquipment from "../components/Forms_Equipment";
import Loader2 from "../components/Loader2";
import "./style/Booking.scss";

export default function Booking() {
	const [radioValue, setRadioValue] = useState("");
	const [fileUpload, setFileUpload] = useState(null);
	const [fileList, setFileList] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [checkboxChecked, setCheckboxChecked] = useState(false);
	const navigate = useNavigate();

	const handleCheckboxChange = () => {
		setCheckboxChecked(!checkboxChecked);
	};

	const handleSubmit = () => {
		if (checkboxChecked) {
			setIsLoading(true);
			wrapperFunction();
			uploadFile();
			setTimeout(() => {
				setIsLoading(false);
				navigate("/home");
			}, 5500);
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
		const currentDate = new Date();
		const currentTime = currentDate.toLocaleString();
		localStorage.setItem("timeBook", currentTime);
		const time = localStorage.getItem("timeBook");
		const formattedTime = time.replace(/[/:, ]|AM|PM/g, "");
		const fileRef = ref(storage, `${id}/${formattedTime}`);
		uploadBytes(fileRef, fileUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setFileList((prev) => [...prev, url]);
			});
		});
	};

	const getAllLocalStorageData = (id) => {
		var localStorageDataObj = { status: 0, id: id };

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
			const currentDate = new Date();
			const currentTime = currentDate.toLocaleString();
			localStorage.setItem("timeBook", currentTime);
			const id = sessionStorage.getItem("username");
			const arr = getAllLocalStorageData(id);
			const bookingRef = doc(bookingCollectionRef, id);

			const batch = writeBatch(db);
			batch.set(bookingRef, arr);

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
										class="bi bi-exclamation-triangle-fill"
										viewBox="0 0 16 16"
									>
										<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
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
													This form is valid for space use reservations and
													equipment under the supervision of the Administrative
													Office Pagoh Campus.
												</li>
												<li className="list-group-item">
													Applicants only need to fill in all of Section (A).
												</li>
												<li className="list-group-item">
													Applicants must upload the program approval paperwork
													from the superior.
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
				<div
					className="row d-flex justify-content-center w-100"
					style={{ marginTop: "120px" }}
				>
					<h1 className="title2 display-5 text-center">
						Please choose one of the following options:{" "}
					</h1>
					<div
						className="col col-md d-flex justify-content-center"
						id="colRadio"
					>
						<div className="radios mt-3 text-dark">
							<div className="form-check form-check-inline">
								<input
									className="form-check-input mx-3"
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
									className="form-check-input mx-3"
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
						<div className="col d-flex justify-content-center text-center flex-column align-items-center">
							<div className="checkbox-wrapper-46">
								<input
									className="inp-cbx"
									id="cbx-46"
									type="checkbox"
									checked={checkboxChecked}
									onChange={handleCheckboxChange}
								/>
								<label
									className="cbx"
									htmlFor="cbx-46"
									style={{ fontSize: "larger" }}
								>
									<span>
										<svg width={"12px"} height={"10px"} viewbox="0 0 12 10">
											<polyline points="1.5 6 4.5 9 10.5 1"></polyline>
										</svg>
									</span>
									<span>
										Please make sure to check the checkbox and{" "}
										<strong className="text-warning">
											upload the important file
										</strong>{" "}
										to enable us to store this{" "}
										<strong className="text-warning">
											booking information
										</strong>{" "}
										in the history database.
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
										Your Booking have been placed
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
			{isLoading ? <Loader2 /> : null}
		</>
	);
}
