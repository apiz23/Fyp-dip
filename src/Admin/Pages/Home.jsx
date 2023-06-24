import "./style/HomeAd.scss";
import { useState, useEffect } from "react";
import Booker from "../components/BookerDoc";
import NavbarAd from "../components/NavbarAd";
import { db } from "../../firebase-config";
import {
	collection,
	getDocs,
	getDoc,
	query,
	doc,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";
import FooterAd from "../components/FooterAd";
import Loader from "../../components/Loader";

export default function HomeAd() {
	const [expiredDocumentIds, setExpiredDocumentIds] = useState([]);
	const [expiredDocumentFields, setExpiredDocumentFields] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	const filteredDocuments = expiredDocumentFields.map((document) => {
		const filteredFields = Object.entries(document).filter(([key]) => {
			return (
				key.toLowerCase().includes("banquet chairs") ||
				key.toLowerCase().includes("examination table") ||
				key.toLowerCase().includes("plastic chairs") ||
				key.toLowerCase().includes("multipurpose table") ||
				key.toLowerCase().includes("rostrum") ||
				key.toLowerCase().includes("platform") ||
				key.toLowerCase().includes("round table") ||
				key.toLowerCase().includes("seminar table")
			);
		});

		const formattedFields = filteredFields.reduce((acc, [key, value]) => {
			const formattedKey = key.toLowerCase().replace(/ /g, "-");
			return { ...acc, [formattedKey]: value };
		}, {});

		return formattedFields;
	});

	useEffect(() => {
		const updateDocuments = async () => {
			try {
				const updatePromises = filteredDocuments.map((document) => {
					const updateFields = Object.entries(document).map(([key, value]) => {
						const fieldName = key.toLowerCase().replace(/ /g, "-");
						const fieldRef = doc(db, "equipment", fieldName);
						const equipmentNumber = parseInt(value);

						return getDoc(fieldRef)
							.then((docSnapshot) => {
								if (docSnapshot.exists()) {
									const currentNumber = parseInt(docSnapshot.data().number);
									const updatedNumber = currentNumber + equipmentNumber;

									return updateDoc(fieldRef, {
										number: updatedNumber,
									});
								}
							})
							.catch((error) => {
								console.error("Error fetching equipment document:", error);
							});
					});
					return Promise.all(updateFields);
				});
				await Promise.all(updatePromises);
				console.log("Documents updated successfully");
			} catch (error) {
				console.error("Error updating documents:", error);
			}
		};

		updateDocuments();
	}, [filteredDocuments]);

	useEffect(() => {
		const fetchExpiredDocuments = async () => {
			const currentTime = new Date();
			const q = query(collection(db, "booking-users"));

			try {
				const querySnapshot = await getDocs(q);
				const documentIds = [];
				const documentFields = [];

				querySnapshot.forEach((doc) => {
					const timeEnd = doc.data().timeEnd;
					const dateEnd = doc.data().dateEnd;
					const combinedTimestamp = new Date(`${dateEnd} ${timeEnd}`);

					if (combinedTimestamp <= currentTime) {
						documentIds.push(doc.id);
						documentFields.push(doc.data());
					}
				});

				setExpiredDocumentIds(documentIds);
				setExpiredDocumentFields(documentFields);
			} catch (error) {
				console.error("Error fetching expired documents:", error);
			}
		};

		fetchExpiredDocuments();
	}, []);

	useEffect(() => {
		const deleteExpiredDocuments = async () => {
			try {
				const deletionPromises = expiredDocumentIds.map(async (documentId) => {
					await deleteDoc(doc(db, "booking-users", documentId));
				});

				await Promise.all(deletionPromises);
				console.log(
					"Expired documents and corresponding folders deleted successfully"
				);
			} catch (error) {
				console.error("Error deleting expired documents and folders:", error);
			}
		};

		deleteExpiredDocuments();
	}, [expiredDocumentIds]);
	return (
		<>
			<section className="homeSecAd">
				{isLoading ? <Loader /> : null}
				<NavbarAd />
				<div className="container text-light">
					<p className="display-3 text-center">Admin Page</p>
					<div className="row">
						<div className="col col-md">
							<Booker />
						</div>
					</div>
				</div>
				<FooterAd />
			</section>
		</>
	);
}
