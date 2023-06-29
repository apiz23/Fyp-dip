import React from "react";

export default function FooterAd() {
	return (
		<>
			<div
				className="text-center p-3"
				style={{
					background: "#5a6bb1",
					boxShadow:
						"rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;",
				}}
			>
				UTHM
				<span
					className="ms-2 text-dark"
					style={{
						fontWeight: "bold",
					}}
				>
					Admin Page
				</span>
			</div>
		</>
	);
}
