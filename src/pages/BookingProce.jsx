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
