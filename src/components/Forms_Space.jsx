import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./style/Forms_Space.scss";

export default function FormsSpace() {
	const [rooms, setRooms] = useState([
		{
			title: "Meeting Room 1",
			items: [
				"Liquid-crystal display (LCD)",
				"LCD Projector White Screen",
				"PA System",
			],
		},
		{
			title: "Meeting Room 5",
			items: [
				"Liquid-crystal display (LCD)",
				"LCD Projector White Screen",
				"PA System",
			],
		},
		{
			title: "Meeting Room 6",
			items: [
				"Liquid-crystal display (LCD)",
				"LCD Projector White Screen",
				"PA System",
			],
		},
		{ title: "Meeting Room 2", items: ["Display TV"] },
		{
			title: "Meeting Room 3",
			items: ["Liquid-crystal display (LCD)", "LCD Projector White Screen"],
		},
		{
			title: "Meeting Room 4",
			items: ["Liquid-crystal display (LCD)", "LCD Projector White Screen"],
		},
		{ title: "Foyer (Level 1)", items: [] },
		{ title: "Cafeteria", items: [] },
	]);

	const [space, setSpace] = useState([]);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		localStorage.setItem(name, value);
	};

	useEffect(() => {
		const getSpaces = async () => {
			const data = await getDocs(collection(db, "space"));
			const fetchedSpaces = data.docs.map((docs) => ({
				...docs.data(),
				id: docs.id,
			}));

			const updatedSpace = fetchedSpaces.map((space) => {
				const updatedData = {};
				for (const key in space) {
					if (typeof space[key] === "boolean") {
						updatedData[key] = space[key] ? "yes" : "no";
					} else {
						updatedData[key] = space[key];
					}
				}return updatedData;
			});
			setSpace(updatedSpace);
		};
		getSpaces();
	}, []);

	console.log(space);

	return (
		<>
			<div className="card" id="card-space">
				<div className="card-header text-center">Space</div>
				<div className="card-body" id="card-body-space">
					{rooms.map((room, index) => {
						if (index % 2 === 0) {
							return (
								<div key={index} className="row my-3 p-3">
									<div className="col">
										<div className="card">
											<div className="card-body">
												<h5 className="card-title">{room.title}</h5>

												<ul className="list-group">
													{room.items.map((item, index) => (
														<li key={index} className="list-group-item">
															{item}
														</li>
													))}
												</ul>
											</div>
											<div class="form-check form-check-inline">
												<input
													class="form-check-input"
													type="radio"
													name="spaceOption"
													id="radio1"
													value={room.title}
													onChange={handleChange}
													disabled={space.some(
														(item) =>
															item.id ===
																room.title.toLowerCase().replace(/\s/g, "-") &&
															item.availability === "no"
													)}
												/>
												<label class="form-check-label" for="radio1">
													{room.title}
												</label>
											</div>
										</div>
									</div>
									{rooms[index + 1] && (
										<div className="col">
											<div className="card">
												<div className="card-body">
													<h5 className="card-title">
														{rooms[index + 1].title}
													</h5>
													<ul className="list-group">
														{rooms[index + 1].items.map((item, index) => (
															<li key={index} className="list-group-item">
																{item}
															</li>
														))}
													</ul>
												</div>
												<div className="form-check form-check-inline">
													<input
														className="form-check-input"
														type="radio"
														name="spaceOption"
														id={`radio${index + 1}`}
														value={rooms[index + 1].title}
														onChange={handleChange}
														disabled={space.some(
															(item) =>
																item.id ===
																	rooms[index + 1].title
																		.toLowerCase()
																		.replace(/\s/g, "-") &&
																item.availability === "no"
														)}
													/>
													<label
														className="form-check-label"
														htmlFor={`radio${index + 1}`}
													>
														{rooms[index + 1].title}
													</label>
												</div>
											</div>
										</div>
									)}
								</div>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
		</>
	);
}
