import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BookingProce() {
	return (
		<>
			<Navbar />
			<div className="container my-3">
				<div class="ratio ratio-16x9">
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/HMqhXxH5-RQ"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					/>
				</div>
			</div>
			<Footer />
		</>
	);
}
