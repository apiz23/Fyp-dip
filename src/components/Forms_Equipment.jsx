import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./style/Forms_Equipment.scss";

export default function Forms_Equipment() {
	const items = [
		{ label: "Rostrum", id: "Rostrum", name: "rostrum" },
		{
			label: "Banquet Chairs",
			id: "BanquetChairs",
			name: "banquet-chairs",
		},
		{
			label: "Plastic Chairs",
			id: "PlasticChairs",
			name: "plastic-chairs",
		},
		{ label: "Round Table", id: "RoundTable", name: "round-table" },
		{
			label: "Seminar Table",
			id: "SeminarTable",
			name: "seminar-table",
		},
		{ label: "Platform", id: "Platform", name: "platform" },
		{
			label: "Multipurpose Table",
			id: "MultipurposeTable",
			name: "multipurpose-table",
		},
		{
			label: "Examination Table",
			id: "ExaminationTable",
			name: "examination-table",
		},
	];

	const [equip, setEquip] = useState([]);
	const [booker, setBooker] = useState([]);
	const [sessionData, setSessionData] = useState({});
	const [bookerIds, setBookerIds] = useState([]);
	const [matchingBookerId, setMatchingBookerId] = useState(null);
	const [matchingBookerFields, setMatchingBookerFields] = useState([]);

	const handleChangeLocalStorage = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		localStorage.setItem(name, value);
	};

	useEffect(() => {
		const getBooker = async () => {
			const data = await getDocs(collection(db, "booking-users"));
			const ids = data.docs.map((doc) => doc.id);
			setBookerIds(ids);
			setBooker(
				data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		};
		const getEquipment = async () => {
			const data = await getDocs(collection(db, "equipment"));
			const equipmentData = data.docs.map((doc) => ({
				id: doc.id,
				value: doc.data().number.toString(),
			}));
			setEquip(equipmentData);
		};

		const sessionStorageKeys = Object.keys(sessionStorage);
		const selectedKeys = ["dateStart", "dateEnd", "timeStart", "timeEnd"];

		const sessionDataObject = {};
		selectedKeys.forEach((key) => {
			if (sessionStorageKeys.includes(key)) {
				sessionDataObject[key] = sessionStorage.getItem(key);
			}
		});

		setSessionData(sessionDataObject);
		getEquipment();
		getBooker();
	}, []);

	useEffect(() => {
		const sessionData = {
			dateStart: sessionStorage.getItem("dateStart"),
			dateEnd: sessionStorage.getItem("dateEnd"),
			timeStart: sessionStorage.getItem("timeStart"),
			timeEnd: sessionStorage.getItem("timeEnd"),
		};

		const matchingBooker = booker.find(
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
		);

		if (matchingBooker) {
			setMatchingBookerId(matchingBooker.id);

			const matchingFields = Object.entries(matchingBooker)
				.filter(([key]) =>
					[
						"Rostrum",
						"Banquet Chairs",
						"Plastic Chairs",
						"Round Table",
						"Seminar Table",
						"Platform",
						"Multipurpose Table",
						"Examination Table",
					].includes(key)
				)
				.map(([key, value]) => ({ label: key, value }));

			setMatchingBookerFields(matchingFields);
		} else {
			setMatchingBookerId(null);
			setMatchingBookerFields([]);
		}
	}, [booker]);

	const compareDateTime = (
		startDate,
		endDate,
		startTime,
		endTime,
		enteredDateStart,
		enteredDateEnd,
		enteredTimeStart,
		enteredTimeEnd,
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
				<div
					className="card-body"
					id="card-body-equipment"
					style={{
						background: "rgb(204,207,210)",
						background:
							"radial-gradient(circle, rgba(204,207,210,1) 0%, rgba(90,107,177,1) 100%)",
					}}
				>
					{items.map((item, index) => {
						if (index % 2 === 0) {
							return (
								<div className="row my-3" key={index}>
									<div className="col col-lg-6">
										<h5>
											Max =
											<span className="mx-2 text-warning">
												{matchingBookerFields.some(
													(f) => f.label === item.label
												)
													? equip.find((e) => e.id === item.name)?.value -
													  matchingBookerFields.find(
															(f) => f.label === item.label
													  )?.value
													: equip.find((e) => e.id === item.name)?.value}
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
													matchingBookerFields.some(
														(f) => f.label === item.label
													)
														? equip.find((e) => e.id === item.name)?.value -
														  matchingBookerFields.find(
																(f) => f.label === item.label
														  )?.value
														: equip.find((e) => e.id === item.name)?.value
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
													{matchingBookerFields.some(
														(f) => f.label === items[index + 1].label
													)
														? equip.find((e) => e.id === items[index + 1].name)
																?.value -
														  matchingBookerFields.find(
																(f) => f.label === items[index + 1].label
														  )?.value
														: equip.find((e) => e.id === items[index + 1].name)
																?.value}
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
														matchingBookerFields.some(
															(f) => f.label === items[index + 1].label
														)
															? equip.find(
																	(e) => e.id === items[index + 1].name
															  )?.value -
															  matchingBookerFields.find(
																	(f) => f.label === items[index + 1].label
															  )?.value
															: equip.find(
																	(e) => e.id === items[index + 1].name
															  )?.value
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
				</div>
			</div>
		</>
	);
}
