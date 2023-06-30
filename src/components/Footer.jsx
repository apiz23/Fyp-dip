import "./style/Footer.scss";

export default function Footer() {
	return (
		<>
			<footer className="footer text-light p-5 mt-5">
				<div className="footerContainer">
					<div className="row">
						<div className="col d-flex justify-content-center">
							<h1>FYP Project</h1>
						</div>
					</div>
					<div className="text-center my-3">
						<p>&copy; Student & Staff of UTHM</p>
					</div>
				</div>
			</footer>
		</>
	);
}
