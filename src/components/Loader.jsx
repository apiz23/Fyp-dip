import React from "react";
import "./style/Loader.scss";

export default function Loader() {
	return (
		<div className="divLoader">
			<div
				className="spinner spinner-border text-light"
				role="status"
				style={{ width: "5rem", height: "5rem" }}
			>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}
