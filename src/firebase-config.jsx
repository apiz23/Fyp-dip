import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyANZDng8r2y7jrjzoDodYRFyRruRjLFgYs",
	authDomain: "space-and-equipment.firebaseapp.com",
	projectId: "space-and-equipment",
	storageBucket: "space-and-equipment.appspot.com",
	messagingSenderId: "889756827837",
	appId: "1:889756827837:web:fcfaf50a12c7ef540ff7d4",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);