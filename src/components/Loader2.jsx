import React from "react";
import "./style/Loader2.scss";

export default function Loader2() {
	return (
		<>
			<div className="divLoader2">
				<h2 className="mt-3 text-light">
					{" "}
					Your booking has been successfully confirmed! 😊
				</h2>
				<p className="text-light mt-2 md-5 text-center">
					Thank you for your booking! Our Admin will review it shortly.<br></br>{" "}
					Please stay updated on the status by checking the home page regularly.
				</p>
				<div
					className="spinner-border m-3 text-info"
					style={{ width: "3rem", height: "3rem" }}
					role="status"
				>
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
		</>
	);
}
