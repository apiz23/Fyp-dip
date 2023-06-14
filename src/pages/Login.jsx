import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./style/Login.scss";
import logo from "../Assets/uthm-favicon/android-chrome-192x192.png";

export default function Login() {
	const navigate = useNavigate();
	const [login, setLogin] = useState([]);
	const [radioCheck, setRadioCheck] = useState("stdStaff");
	const [errors, setErrors] = useState({});
	const [values, setValues] = useState({ username: "", password: "" });

	useEffect(() => {
		const getLogin = async () => {
			const data = await getDocs(collection(db, "login"));
			setLogin(
				data.docs.map((docs) => ({
					...docs.data(),
					id: docs.id,
				}))
			);
		};
		getLogin();
	}, []);

	const validate = (values) => {
		return {
			...(values.username ? {} : { username: "Username is required" }),
			...(values.password ? {} : { password: "Password is required" }),
		};
	};

	const handleRadioChange = (event) => {
		setRadioCheck(event.target.value);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const errors = validate(values);
		setErrors(errors);

		if (Object.keys(errors).length === 0) {
			const adminUser = "BC7712";
			const adminPass = "12345";

			const matchedUser = login.find(
				(user) =>
					user.username === values.username && user.password === values.password
			);

			if (
				radioCheck === "admin" &&
				values.username === adminUser &&
				values.password === adminPass
			) {
				sessionStorage.setItem("loggedIn", "true");
				navigate("/homeAd");
			} else if (
				matchedUser &&
				radioCheck === "stdStaff" &&
				values.username !== adminUser &&
				values.password !== adminPass
			) {
				sessionStorage.setItem("loggedIn", "true");
				sessionStorage.setItem("username", values.username);
				navigate("/home");
			} else {
				const loginError = { username: "Invalid username or password" };
				setErrors((prevErrors) => ({ ...prevErrors, ...loginError }));
			}
		}
	};

	return (
		<section className="loginSec">
			<div className="container py-5 h-100">
				<div className="row d-flex justify-content-center align-items-center">
					<div className="col-12 col-md-8 col-lg-6 col-xl-5">
						<div className="card">
							<div className="card-body p-5 text-center">
								<img src={logo} width={70} />
								<h3 className="mt-4">Space & Equipment</h3>
								<form onSubmit={handleSubmit}>
									<div className="form-outline my-3">
										<input
											type="text"
											id="username"
											className="form__input"
											placeholder="Username"
											name="username"
											value={values.username}
											onChange={handleChange}
										/>
										{errors.username && (
											<div
												className="alert alert-danger alert-dismissible fade show"
												role="alert"
											>
												<span>{errors.username}</span>
											</div>
										)}
									</div>

									<div className="form-outline">
										<input
											type="password"
											name="password"
											id="password"
											className="form__input"
											placeholder="Password"
											value={values.password}
											onChange={handleChange}
										/>
										{errors.password && (
											<div
												className="alert alert-danger alert-dismissible fade show"
												role="alert"
											>
												<span>{errors.password}</span>
											</div>
										)}
									</div>
									<div className="radio-row">
										<div className="form-check form-check-inline">
											<input
												className="form-check-input"
												type="radio"
												name="flexRadioDefault"
												id="inlineCheckbox1"
												value="stdStaff"
												checked={radioCheck === "stdStaff"}
												onChange={handleRadioChange}
											/>
											<label className="form-check-label" for="inlineCheckbox1">
												Student / Staff
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												className="form-check-input"
												type="radio"
												name="flexRadioDefault"
												id="inlineCheckbox2"
												value="admin"
												checked={radioCheck === "admin"}
												onChange={handleRadioChange}
											/>
											<label className="form-check-label" for="inlineCheckbox1">
												Admin
											</label>
										</div>
									</div>

									<hr className="my-2" />

									<div className="row d-flex justify-content-center">
										<div className="col-lg">
											<input
												type="submit"
												value="Submit"
												className="btnSubmit btn-primary"
											/>
										</div>
									</div>

									<p className="mt-3 text-primary-emphasis">
										Only <strong>UTHM students</strong> with active status are
										allowed to login to this system. For any enquiries, please
										click here to contact us
									</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
