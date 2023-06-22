import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { Route, Router } from "react-router-dom";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Booking from "./Booking";
import BookingProce from "./BookingProce";
import ReserveStatus from "../components/ReserveStatus";
import "./style/Home.scss";
import logo from "../Assets/uthm-favicon/android-chrome-512x512.png"

export default function Home() {
	<Router>
		<Route path="booking" element={<Booking />} />
		<Route path="bookingProce" element={<BookingProce />} />
	</Router>;

	useEffect(() => {
		const clearLocalStorage = () => {
			localStorage.clear();
		};
		window.onbeforeunload = clearLocalStorage;
		return () => {
			window.onbeforeunload = null;
		};
	}, []);

	const [expiredDocumentIds, setExpiredDocumentIds] = useState([]);

	useEffect(() => {
		const fetchExpiredDocuments = async () => {
			const currentTime = new Date();

			const q = query(collection(db, "booking-users"));

			try {
				const querySnapshot = await getDocs(q);
				const documentIds = [];

				querySnapshot.forEach((doc) => {
					const timeEnd = doc.data().timeEnd;
					const dateEnd = doc.data().dateEnd;
					const combinedTimestamp = new Date(`${dateEnd} ${timeEnd}`);

					if (combinedTimestamp <= currentTime) {
						documentIds.push(doc.id);
					}
				});

				setExpiredDocumentIds(documentIds);
			} catch (error) {
				console.error("Error fetching expired documents:", error);
			}
		};

		fetchExpiredDocuments();
	}, []);

	useEffect(() => {
		const deleteExpiredDocuments = async () => {
			try {
				const deletionPromises = expiredDocumentIds.map((documentId) =>
					deleteDoc(doc(db, "booking-users", documentId))
				);

				await Promise.all(deletionPromises);
				console.log("Expired documents deleted successfully");
			} catch (error) {
				console.error("Error deleting expired documents:", error);
			}
		};

		deleteExpiredDocuments();
	}, [expiredDocumentIds]);

	return (
		<>
			<section className="homeSec">
				<Navbar />
				<div className="container mt-3 col-md-10">
					<div className="title my-3">
						<div className="row">
							<div className="col col-md-8 p-5">
								<h1 className="display-4">
									Welcome To SPACE AND EQUIPMENT BOOKING SYSTEM
								</h1>
							</div>
							<div className="col col-md-4">
								<img src={logo} className="img-fluid my-5" width={"50%"} alt="Logo"/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col col-md">
							<ReserveStatus />
						</div>
					</div>
					<div className="row">
						<div className="col col-md-6">
							<div class="card text-bg-dark mb-3">
								<div class="card-header">Header</div>
								<div class="card-body">
									<h5 class="card-title">Light card title</h5>
									<p class="card-text">
										Some quick example text to build on the card title and make
										up the bulk of the card's content.
									</p>
								</div>
							</div>
						</div>
						<div className="col col-md-6">
							<div class="card text-bg-dark mb-3">
								<div class="card-header">Header</div>
								<div class="card-body">
									<h5 class="card-title">Dark card title</h5>
									<p class="card-text">
										Some quick example text to build on the card title and make
										up the bulk of the card's content.
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="row my-3 d-flex justify-content-center">
						<div class="card mb-5">
							<div class="row g-0">
								<div class="col-md-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="50"
										height="50"
										fill="currentColor"
										class="bi bi-file-earmark-play"
										viewBox="0 0 16 16"
									>
										<path d="M6 6.883v4.234a.5.5 0 0 0 .757.429l3.528-2.117a.5.5 0 0 0 0-.858L6.757 6.454a.5.5 0 0 0-.757.43z" />
										<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
									</svg>
								</div>
								<div class="col-md-9">
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											This is a wider card with supporting text below as a
											natural lead-in to additional content. This content is a
											little bit longer.
										</p>
										<p class="card-text">
											<small class="text-body-secondary">
												Last updated 3 mins ago
											</small>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div> */}
				</div>
				<Footer />
			</section>
		</>
	);
}
