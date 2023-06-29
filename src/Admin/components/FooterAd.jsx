export default function FooterAd() {
	return (
		<div
			style={{
				boxShadow:
					"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px 3px, rgba(0, 0, 0, 0.2) 0px 3px 0px inset",
			}}
		>
			<div
				className="text-center p-3"
				style={{
					color: "white",
					backgroundColor: "rgb(49, 71, 115)",
				}}
			>
				UTHM
				<span
					className="ms-2 text-light"
					style={{
						fontWeight: "bold",
					}}
				>
					Admin Page
				</span>
			</div>
		</div>
	);
}
