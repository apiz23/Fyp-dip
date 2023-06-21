import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./style/Forms_Equipment.scss";

export default function Forms_Equipment() {
	const items = [
		{ label: "Rostrum", id: "Rostrum", name: "rostrum", number: 10 },
		{
			label: "Banquet Chairs",
			id: "BanquetChairs",
			name: "banquet-chairs",
			number: 10,
		},
		{
			label: "Plastic Chairs",
			id: "PlasticChairs",
			name: "plastic-chairs",
			number: 10,
		},
		{ label: "Round Table", id: "RoundTable", name: "round-table", number: 10 },
		{
			label: "Seminar Table",
			id: "SeminarTable",
			name: "seminar-table",
			number: 10,
		},
		{ label: "Platform", id: "Platform", name: "platform", number: 10 },
		{
			label: "Multipurpose Table",
			id: "MultipurposeTable",
			name: "multipurpose-table",
			number: 10,
		},
		{
			label: "Examination Table",
			id: "ExaminationTable",
			name: "examination-table",
			number: 10,
		},
	];

	const [equip, setEquip] = useState([]);
	const [booker, setBooker] = useState([]);
	const [sessionData, setSessionData] = useState({});

	const handleChangeLocalStorage = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		localStorage.setItem(name, value);
	};

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

	const newArray = booker.map((item) => {
		const newObj = {};
		Object.keys(item).forEach((key) => {
			const value = item[key];
			const newKey = key.replace(/\s+/g, "");
			newObj[newKey] = value;
		});
		return newObj;
	});

	useEffect(() => {
		const getEquipment = async () => {
			const data = await getDocs(collection(db, "equipment"));
			const equipmentData = data.docs.map((doc) => ({
				id: doc.id,
				value: doc.data().number.toString(),
			}));
			setEquip(equipmentData);
		};
		getEquipment();
	}, []);

	useEffect(() => {
		const sessionStorageKeys = Object.keys(sessionStorage);
		const selectedKeys = ["dateStart", "dateEnd", "timeStart", "timeEnd"];

		const sessionDataObject = {};
		selectedKeys.forEach((key) => {
			if (sessionStorageKeys.includes(key)) {
				sessionDataObject[key] = sessionStorage.getItem(key);
			}
		});

		setSessionData(sessionDataObject);
	}, []);

	const compareDateTime = (
		startDate,
		endDate,
		startTime,
		endTime,
		enteredDateStart,
		enteredDateEnd,
		enteredTimeStart,
		enteredTimeEnd
	) => {
		const dataStartDate = new Date(`${startDate}T${startTime}:00`);
		const dataEndDate = new Date(`${endDate}T${endTime}:00`);
		const inputStartDate = new Date(
			`${enteredDateStart}T${enteredTimeStart}:00`
		);
		const inputEndDate = new Date(`${enteredDateEnd}T${enteredTimeEnd}:00`);
		if (
			(inputStartDate >= dataStartDate &&
				inputEndDate <= dataEndDate &&
				inputStartDate <= inputEndDate) ||
			(inputStartDate >= dataStartDate && inputStartDate <= dataEndDate) ||
			(inputEndDate >= dataStartDate && inputEndDate <= dataEndDate) ||
			(inputStartDate <= dataStartDate && inputEndDate >= dataEndDate)
		) {
			return "inside";
		} else {
			return "outside";
		}
	};

	return (
		<>
			<div className="card bg-dark rounded" id="card-equipment">
				<div className="card-header bg-dark text-center text-light">
					Equipment
				</div>
				<div className="card-body" id="card-body-equipment">
					{items.map((item, index) => {
						if (index % 2 === 0) {
							return (
								<div className="row my-3" key={index}>
									<div className="col col-lg-6">
										<h5>
											Max =
											<span className="mx-2 text-danger">
												{booker.some(
													(book) =>
														compareDateTime(
															book.dateStart,
															book.dateEnd,
															book.timeStart,
															book.timeEnd,
															sessionData.dateStart,
															sessionData.dateEnd,
															sessionData.timeStart,
															sessionData.timeEnd
														) === "inside"
												)
													? item.number -
													  booker.find((book) =>
															book.hasOwnProperty(item.label)
													  )?.[item.label]
													: item.number}
											</span>
										</h5>

										<div className="form-floating mb-3">
											<input
												type="number"
												className="form-control"
												min="0"
												placeholder="number"
												name={item.label}
												max={
													booker.some(
														(book) =>
															compareDateTime(
																book.dateStart,
																book.dateEnd,
																book.timeStart,
																book.timeEnd,
																sessionData.dateStart,
																sessionData.dateEnd,
																sessionData.timeStart,
																sessionData.timeEnd
															) === "inside"
													)
														? item.number -
														  booker.find((book) =>
																book.hasOwnProperty(item.label)
														  )?.[item.label]
														: item.number
												}
												onChange={(event) => handleChangeLocalStorage(event)}
											/>
											<label htmlFor={`floating${item.label}`}>
												{item.label}
											</label>
										</div>
									</div>
									{items[index + 1] && (
										<div className="col col-lg-6">
											<h5>
												Max =
												<span className="mx-2 text-danger">
													{booker.some(
														(book) =>
															compareDateTime(
																book.dateStart,
																book.dateEnd,
																book.timeStart,
																book.timeEnd,
																sessionData.dateStart,
																sessionData.dateEnd,
																sessionData.timeStart,
																sessionData.timeEnd
															) === "inside"
													)
														? items[index + 1].number -
														  booker.find((book) =>
																book.hasOwnProperty(item.label)
														  )?.[item.label]
														: items[index + 1].number}
												</span>
											</h5>
											<div className="form-floating mb-3">
												<input
													type="number"
													className="form-control"
													min="0"
													name={items[index + 1].label}
													placeholder="number"
													max={
														booker.some(
															(book) =>
																compareDateTime(
																	book.dateStart,
																	book.dateEnd,
																	book.timeStart,
																	book.timeEnd,
																	sessionData.dateStart,
																	sessionData.dateEnd,
																	sessionData.timeStart,
																	sessionData.timeEnd
																) === "inside"
														)
															? items[index + 1].number -
															  booker.find((book) =>
																	book.hasOwnProperty(item.label)
															  )?.[item.label]
															: items[index + 1].number
													}
													onChange={(event) => handleChangeLocalStorage(event)}
												/>
												<label htmlFor={`floating${items[index + 1].label}`}>
													{items[index + 1].label}
												</label>
											</div>
										</div>
									)}
								</div>
							);
						}
					})}

					<div className="row my-3">
						<div className="col col-md">
							<div class="input-group">
								<span class="input-group-text">Others Equipment</span>
								<input
									type="text"
									aria-label="First name"
									placeholder="Name"
									class="form-control"
								/>
								<input
									type="number"
									aria-label="Last name"
									placeholder="Number"
									min="0"
									class="form-control"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
