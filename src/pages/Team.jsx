import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import hafiz from "../Assets/team/hafiz.png";
import fariez from "../Assets/team/fariezNew.png";
import alysha from "../Assets/team/alysha.png";
import react from "../Assets/logo/react.png";
import html from "../Assets/logo/html.png";
import scss from "../Assets/logo/scss.png";
import bootstrap from "../Assets/logo/bootstrap.png";
import "./style/Team.scss";

export default function Team() {
	return (
		<>
			<section className="teamSec">
				<Navbar />
				<div className="container my-5" style={{ height: "fit-content" }}>
					<div className="row">
						<div className="col col-md d-flex justify-content-center my-5">
							<p className="text-center text-light" id="descTitle">
								<h1 className="display-3" id="mainTitle">
									TEAM
								</h1>
								Meet the exceptional individuals who drive our organization
								forward,<br></br> contributing their talent and expertise behind
								the scenes.
							</p>
						</div>
					</div>
					<div className="row d-flex justify-content-center">
						<div className="col col-xl-3 mx-5">
							<div class="card" id="cardTeam">
								<div class="card-overlay" id="cardTeam-overlay">
									<img src={hafiz} className="card-img-top" />
									<div class="card-body" id="cardBody">
										<p class="card-text">Hafizuddin</p>
									</div>
									<figure class="text-center">
										<blockquote class="blockquote my-3">
											<p>
												Web Programmer{" "}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="30"
													height="30"
													fill="currentColor"
													class="bi bi-filetype-jsx"
													viewBox="0 0 16 16"
												>
													<path
														fill-rule="evenodd"
														d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.075 14.841a1.13 1.13 0 0 0 .401.823c.13.108.288.192.478.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.776.15-.225.099-.4.24-.528.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM0 14.791c0 .165.027.32.082.466.055.147.136.277.243.39.11.113.245.202.407.267.164.062.354.093.569.093.42 0 .748-.115.984-.346.238-.23.358-.565.358-1.004v-2.725h-.791v2.745c0 .201-.046.357-.138.466-.092.11-.233.164-.422.164a.499.499 0 0 1-.454-.246.576.576 0 0 1-.073-.27H0Zm8.907-2.859H9.8l-1.274 2.007L9.78 15.93h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z"
													/>
												</svg>
											</p>
										</blockquote>
										<figcaption class="blockquote-footer">
											Specializes in writing and implementing code for web-based
											applications and websites.{" "}
											<cite title="Source Title"></cite>
										</figcaption>
									</figure>
								</div>
							</div>
						</div>
						<div className="col col-xl-3 mx-5">
							<div class="card" id="cardTeam">
								<div className="card-overlay" id="cardTeam-overlay">
									<img src={alysha} class="card-img-top" />
									<div class="card-body" id="cardBody">
										<p class="card-text text-dark">Alysha</p>
									</div>
									<figure class="text-center">
										<blockquote class="blockquote my-3">
											<p>
												Development Lead
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="30"
													height="30"
													fill="currentColor"
													class="bi bi-person-fill"
													viewBox="0 0 16 16"
												>
													<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
												</svg>
											</p>
										</blockquote>
										<figcaption class="blockquote-footer">
											Experienced professional who leads and managing the final
											year project website's development process, ensuring
											successful delivery and team coordination.
											<cite title="Source Title"></cite>
										</figcaption>
									</figure>
								</div>
							</div>
						</div>
						<div className="col col-xl-3 mx-5">
							<div class="card" id="cardTeam">
								<div className="card-overlay" id="cardTeam-overlay">
									<img src={fariez} class="card-img-top" />
									<div class="card-body" id="cardBody">
										<p class="card-text">Fariez</p>
									</div>
									<figure class="text-center">
										<blockquote class="blockquote my-3">
											<p>
												UI/UX Designer{" "}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="30"
													height="30"
													fill="currentColor"
													class="bi bi-image"
													viewBox="0 0 16 16"
												>
													<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
													<path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
												</svg>
											</p>
										</blockquote>
										<figcaption class="blockquote-footer">
											Combining design principles and user-centered approaches
											to create visually appealing and intuitive interfaces for
											websites and applications.
											<cite title="Source Title"></cite>
										</figcaption>
									</figure>
								</div>
							</div>
						</div>
						<div className="row d-flex justify-content-center m-5" id="devRow">
							<h1 className="display-4 text-center m-5">
								What components are utilized in the development of this system?
							</h1>
							<div className="col col-md-2">
								<img src={react} alt="" className="img-fluid" />
								<p className=" m-4 text-center">React JS</p>
							</div>
							<div className="col col-md-2">
								<img src={html} alt="" className="img-fluid" />
								<p className="m-4 text-center">HTML 5</p>
							</div>
							<div className="col col-md-2">
								<img src={bootstrap} alt="" className="img-fluid" />
								<p className="m-4 text-center">Bootstrap 5</p>
							</div>
							<div className="col col-md-2">
								<img src={scss} alt="" className="img-fluid" />
								<p className="m-4 text-center">SCSS	</p>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</section>
		</>
	);
}
