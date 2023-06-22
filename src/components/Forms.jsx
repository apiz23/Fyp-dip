import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "../firebase-config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style/Forms.scss";

export default function Forms() {
	const [fileUpload, setFileUpload] = useState(null);
	const [fileList, setFileList] = useState([]);
	const fileUploadRef = ref(storage, "files");
	const [minDate, setMinDate] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [startDateEnd, setStartDateEnd] = useState(new Date());

	useEffect(() => {
		const today = new Date();
		today.setDate(today.getDate() + 4);
		const minDateValue = today.toISOString().split("T")[0];
		setMinDate(minDateValue);
	}, []);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		localStorage.setItem(name, value);
		sessionStorage.setItem(name, value);
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

	return (
		<>
			<form className="needs-validation" required>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="floatingProgramName"
						name="programName"
						placeholder="text"
						onChange={(event) => handleChange(event)}
					/>
					<label for="floatingProgramName">Program/Meeting name</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="floatingPurpose"
						name="purposeBook"
						placeholder="text"
						onChange={(event) => handleChange(event)}
						required
					/>
					<label for="floatingPurpose">Purpose of Booking</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="floatingInaugurated"
						name="Inaugurated"
						placeholder="text"
						onChange={(event) => handleChange(event)}
					/>
					<label for="floatingInaugurated">Inaugurated by?</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="number"
						className="form-control"
						id="floatingNumPeople"
						placeholder="text"
						name="people"
						onChange={(event) => handleChange(event)}
						min={1}
					/>
					<label for="floatingNumPeople">Number of participants</label>
				</div>
				<div className="date my-3">
					<p className="h3 mt-3">Date Start</p>
					<div className="row text-light">
						<div className="col col-md-6 my-3 d-flex align-items-center">
							<label for="dateStart" className="form-label text-light">
								Date
							</label>
							<input
								type="date"
								className="form-control"
								id="dateStart"
								name="dateStart"
								min={minDate}
								onChange={(event) => handleChange(event)}
							/>
						</div>
						<div className="col col-md-6 d-flex align-items-center">
							<label for="timeStart" className="form-label text-light me-3">
								Time
							</label>
							<div className="row">
								<DatePicker
									selected={startDate}
									onChange={(date) => {
										const selectedTime = date.toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
											hour12: false,
										});
										setStartDate(date);
										localStorage.setItem("timeStart", selectedTime);
										sessionStorage.setItem("timeStart", selectedTime);
									}}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={15}
									timeCaption="Time"
									dateFormat="H:mm"
									className="timeStart"
								/>
							</div>
						</div>
					</div>

					<p className="h3 mt-3">Date End</p>
					<div className="row ">
						<div className="col col-md-6 my-3 d-flex align-items-center">
							<label htmlFor="dateEnd" className="form-label text-light">
								Date
							</label>
							<input
								type="date"
								className="form-control"
								id="dateEnd"
								name="dateEnd"
								min={minDate}
								onChange={(event) => handleChange(event)}
							/>
						</div>
						<div className="col col-md-6 d-flex align-items-center">
							<label htmlFor="timeEnd" className="form-label text-light me-3">
								Time
							</label>
							<div className="row">
								<DatePicker
									selected={startDateEnd}
									onChange={(date) => {
										const selectedTime = date.toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
											hour12: false,
										});
										setStartDateEnd(date);
										localStorage.setItem("timeEnd", selectedTime);
										sessionStorage.setItem("timeEnd", selectedTime);
									}}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={15}
									timeCaption="Time"
									dateFormat="H:mm"
									className="timeEnd"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col col-md">
						<div
							className="alert alert-warning alert-dismissible fade show"
							role="alert"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="25"
								height="25"
								fill="currentColor"
								className="bi bi-exclamation-circle me-2"
								viewBox="0 0 16 16"
							>
								<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
								<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
							</svg>
							Please Click the button Upload after confirming the file !
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="alert"
								aria-label="Close"
							></button>
						</div>
						<div class="input-group">
							<input
								type="file"
								class="form-control"
								id="inputFile"
								onChange={(event) => {
									setFileUpload(event.target.files[0]);
								}}
							/>
							<button
								type="button"
								for="inputFile"
								className="input-group-text bg-warning text-black"
								onClick={uploadFile}
								required
							>
								Upload
							</button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
