import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "../firebase-config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style/Forms.scss";

export default function Forms() {
	const [minDate, setMinDate] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [startDateEnd, setStartDateEnd] = useState(new Date());

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		localStorage.setItem(name, value);
		sessionStorage.setItem(name, value);
	};

	useEffect(() => {
		const today = new Date();
		today.setDate(today.getDate() + 1);
		const minDateValue = today.toISOString().split("T")[0];
		setMinDate(minDateValue);
	}, []);

	return (
		<>
			<form className="row g-3 needs-validation" novalidate>
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
					<p className="h3 mt-3 text-dark">Date Start</p>
					<div className="row">
						<div className="col col-md-6 my-3 d-flex align-items-center">
							<label for="dateStart" className="form-label text-dark">
								Date
							</label>
							<input
								type="date"
								className="form-control text-dark"
								id="dateStart"
								name="dateStart"
								min={minDate}
								onChange={(event) => handleChange(event)}
							/>
						</div>
						<div className="col col-md-6 d-flex align-items-center">
							<label for="timeStart" className="form-label text-dark me-3">
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

					<p className="h3 mt-3 text-dark">Date End</p>
					<div className="row ">
						<div className="col col-md-6 my-3 d-flex align-items-center">
							<label htmlFor="dateEnd" className="form-label text-dark">
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
							<label htmlFor="timeEnd" className="form-label text-dark me-3">
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
			</form>
		</>
	);
}
