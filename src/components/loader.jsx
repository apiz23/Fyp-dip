import logo from "../Assets/uthm-favicon/android-chrome-192x192.png";
import "./style/Loader.scss";

export default function Loader() {
	return (
		<div className="divLoader">
			{/* <img src={logo} alt="Logo" /> */}

			<div className="spinner spinner-border text-light" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}
