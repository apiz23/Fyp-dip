import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { Link, Route, Router } from "react-router-dom";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Booking from "./Booking";
import BookingProce from "./BookingProce";
import ReserveStatus from "../components/ReserveStatus";
import logo from "../Assets/uthm-favicon/android-chrome-192x192.png";
import Loader from "../components/Loader";
import "./style/Home.scss";
import History from "../components/History";

export default function Home() {
	<Router>
		<Route path="booking" element={<Booking />} />
		<Route path="bookingProce" element={<BookingProce />} />
	</Router>;

	const [expiredDocumentIds, setExpiredDocumentIds] = useState([]);
	const [selectedOption, setSelectedOption] = useState("1");

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	// const [isLoading, setIsLoading] = useState(true);
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setIsLoading(false);
	// 	}, 2000);
	// }, []);

	useEffect(() => {
		const clearLocalStorage = () => {
			localStorage.clear();
		};
		window.onbeforeunload = clearLocalStorage;
		return () => {
			window.onbeforeunload = null;
		};
	}, []);

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
			} catch (error) {
				console.error("Error deleting expired documents:", error);
			}
		};

		deleteExpiredDocuments();
	}, [expiredDocumentIds]);

	return (
		<>
			<section className="homeSec">
				{/* {isLoading ? <Loader /> : null} */}
				<Navbar />
				<div className="container mt-3 col-md-10">
					<div className="title my-5">
						<div className="row p-3">
							<div className="col col-md-4">
								<img
									src={logo}
									className="img-fluid rounded mx-auto d-block mb-3"
									width={"50%"}
									alt="Logo"
								/>
							</div>
							<div className="col col-md-8">
								<h1 className="display-4">
									Welcome To SPACE AND EQUIPMENT BOOKING SYSTEM
								</h1>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col col-md ms-5">
							<select
								className="form-select"
								aria-label="Default select example"
								value={selectedOption}
								onChange={handleOptionChange}
							>
								<option value="1">Reserve Status</option>
								<option value="2">History</option>
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col col-md" id="selectedOption">
							{selectedOption === "1" ? <ReserveStatus /> : <History />}
						</div>
					</div>
					<div className="row my-3 d-flex justify-content-center">
						<div className="col col-md-4">
							<div class="card text-bg-dark mb-3">
								<div className="card-header">Video Tutorial</div>
								<div class="card-body text-center">
									<h5 class="card-title">
										New to our system and feeling a bit lost?
									</h5>
									<p className="card-text ">
										Check out this video tutorial
										<button className="btn btn-primary mx-auto">
											<Link to="/bookingProce">
												Click Here!{" "}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="30"
													height="30"
													fill="currentColor"
													className="bi bi-youtube mx-2"
													viewBox="0 0 16 16"
												>
													<path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
												</svg>
											</Link>
										</button>
									</p>
								</div>
							</div>
						</div>
						<div className="col col-md-4">
							<div class="card text-bg-dark mb-3">
								<div class="card-header">About</div>
								<div class="card-body text-center">
									<h5 class="card-title">
										Curious about our system and the team behind it?
									</h5>
									<p className="card-text">Click the button below </p>
									<button className="btn btn-primary mx-auto">
										<Link to="/team">
											Click Here!
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="30"
												height="30"
												fill="currentColor"
												className="bi bi-people-fill mx-2"
												viewBox="0 0 16 16"
											>
												<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
											</svg>
										</Link>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</section>
		</>
	);
}
