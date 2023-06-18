import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./style/BookingProce.scss";

export default function BookingProce() {
	return (
		<>
			<section className="bookingProceSec">
				<Navbar />
				<div className="title">
					<p class="display-5 mt-5">Not sure how to make a booking?</p>
					<p class="display-6 ">
						Watch This{" "}
						<span>
							<a
								href="https://www.youtube.com/embed/HMqhXxH5-RQ"
								target={"_blank"}
							>
								video
							</a>
						</span>
					</p>
				</div>
				<div className="container vh-100">
					<div className="row my-5 d-flex justify-content-center">
						<div className="col col-md-8">
							<div class="ratio ratio-16x9">
								<iframe
									width="560"
									height="315"
									src="https://www.youtube.com/embed/HMqhXxH5-RQ"
									title="YouTube video player"
									frameborder="1"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowfullscreen
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
				<Footer />
		</>
	);
}
