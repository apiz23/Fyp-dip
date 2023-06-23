import React from "react";
import "./style/FooterAd.scss"

export default function FooterAd() {
	return (
		<>
			<footer className="footerAd text-light p-5">
				<div className="footerContainer">
					<div className="row">
						<div className="col d-flex justify-content-center">
							<h1>FYP Project</h1>
						</div>
					</div>
					<div className="text-center my-3">
						<p>&copy; 2023 My Website. All Rights Reserved.</p>
					</div>
				</div>
			</footer>
		</>
	);
}
