import FooterAd from "../components/FooterAd";
import NavbarAd from "../components/NavbarAd";
import SpaceDoc from "../components/SpaceDoc";
import "./style/Space.scss";

export default function SpacePage() {
	return (
		<>
			<section className="spacePageSec text-light">
				<NavbarAd />
				<div className="container ">
					<p className="display-3 text-center">Space List</p>
					<div className="col m-1">
						<div className="row">
							<div className="col col-md">
								<SpaceDoc />
							</div>
						</div>
					</div>
				</div>
				<FooterAd />
			</section>
		</>
	);
}
