import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./style/BookingProce.scss";
import tutorial from "../Assets/Video/video-manual.mp4";

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
							video{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="30"
								height="30"
								fill="currentColor"
								class="bi bi-arrow-down-circle-fill"
								viewBox="0 0 16 16"
							>
								<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
							</svg>
						</span>
					</p>
				</div>
				<div className="container vh-100">
					<div className="row my-5 d-flex justify-content-center">
						<div className="col col-md-8">
							<div className="ratio ratio-16x9">
								<video width="100%" height="100%" controls>
									<source src={tutorial} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
