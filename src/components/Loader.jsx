import React from "react";
import "./style/Loader.scss";
import logo from "../Assets/uthm-favicon/android-chrome-512x512.png";

export default function Loader() {
	return (
		<div className="divLoader">
			<img src={logo} alt="" />
		</div>
	);
}
