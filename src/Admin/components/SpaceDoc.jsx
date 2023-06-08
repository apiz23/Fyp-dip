import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function SpaceDoc() {
	useEffect(() => {
		const getSpaces = async () => {
			const data = await getDocs(collection(db, "space"));
			setSpace(
				data.docs.map((docs) => ({
					...docs.data(),
					id: docs.id,
				}))
			);
		};
		getSpaces();
	}, []);

	const [space, setSpace] = useState([]);

	const updateSpace = async (id, availability) => {
		const spaceDoc = doc(db, "space", id);
		const newField = { availability: !availability };
		await updateDoc(spaceDoc, newField);
		window.location.reload();
	};

	return (
		<>
			<thead>
				<tr>
					<th scope="col">No</th>
					<th scope="col">Room Name</th>
					<th scope="col">Status</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			{space.map((space, index) => {
				return (
					<tbody>
						<tr>
							<th scope="row">{index + 1}</th>
							<td>{space.id}</td>
							<td>{space.availability ? "Available" : "Unavailable"}</td>
							<td>
								<button
									className="button-28"
									role="button"
									id={space.id}
									onClick={() => {
										updateSpace(space.id, space.availability);
									}}
								>
									update
								</button>
							</td>
						</tr>
					</tbody>
				);
			})}
		</>
	);
}
