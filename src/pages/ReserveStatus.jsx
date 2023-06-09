import React from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

export default function ReserveStatus() {
	const [booker, setBooker] = useState([]);
	const bookingCollectionRef = collection(db, "booking-users");
	const id = sessionStorage.getItem("username");

	useEffect(() => {
		const getBooker = async () => {
			const data = await getDocs(bookingCollectionRef);
			setBooker(
				data.docs.map((docs) => ({
					...docs.data(),
					id: docs.id,
				}))
			);
		};
		getBooker();
	}, []);

	const filteredBooker = booker.filter((book) => book.id === id);

	return (
		<>
			<Navbar />
			<div className="row">
				<div className="col col-sm-10 mx-auto">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">No</th>
								<th scope="col">Booking ID</th>
								<th scope="col">Category</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						{filteredBooker.map((book, index) => (
							<tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>{book.id}</td>
								<td>
									{book.radioBtn === "option1"
										? "Space & Equipment"
										: "Equipment"}
								</td>
								<td>{book.status === 1 ? "Approved" : "Pending"}</td>
							</tr>
						))}
					</table>
				</div>
			</div>
			<Footer />
		</>
	);
}
