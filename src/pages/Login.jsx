import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./style/Login.scss";

export default function Login() {
	const navigate = useNavigate();

	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const [radioCheck, setRadioCheck] = useState("stdStaff");

	const [errors, setErrors] = useState({});

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
			navigate(radioCheck === "stdStaff" ? "/home" : "/mainAdmin");
		}
	};

	return (
		<div className="container-fluid-main mt-3">
			<div className="row main-content bg-success text-center mx-auto">
				<div className="col-md-4 text-center company__info">
					{/* <span className="company__logo">
						<h2>
							<span className="fa fa-android"></span>
						</h2>
					</span> */}
					<h4 className="company_title">UTHM Booking Space & Equipment</h4>
				</div>
				<div className="col-md-8 col-xs-12 col-sm-12 login_form ">
					<div className="container">
						<div className="row-title">
							<h2>Log In</h2>
						</div>
						<div className="row-input">
							<form onSubmit={handleSubmit} control="" className="form-group">
								<div className="row">
									<input
										type="text"
										name="username"
										id="username"
										className="form__input"
										placeholder="Username"
										value={values.username}
										onChange={handleChange}
									/>
									{errors.username && (
										<div
											className="alert alert-danger alert-dismissible fade show"
											role="alert"
										>
											<span>{errors.username}</span>
											<button
												type="button"
												class="btn-close"
												data-bs-dismiss="alert"
												aria-label="Close"
											></button>
										</div>
									)}
								</div>
								<div className="row">
									{/* <span className="fa fa-lock"></span> */}
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
											<button
												type="button"
												class="btn-close"
												data-bs-dismiss="alert"
												aria-label="Close"
											></button>
										</div>
									)}
								</div>
								<div className="row justify-content-center">
									{/* <div className="col-lg">
										<input
											type="checkbox"
											name="remember_me"
											id="remember_me"
											className=""
										/>
										<label for="remember_me">Remember Me!</label>
									</div> */}
								</div>
								<div className="radio-row m-3">
									<div class="form-check form-check-inline">
										<input
											class="form-check-input"
											type="radio"
											name="flexRadioDefault"
											id="inlineCheckbox1"
											value="stdStaff"
											checked={radioCheck === "stdStaff"}
											onChange={handleRadioChange}
										/>
										<label class="form-check-label" for="inlineCheckbox1">
											Student / Staff
										</label>
									</div>
									<div class="form-check form-check-inline">
										<input
											class="form-check-input"
											type="radio"
											name="flexRadioDefault"
											id="inlineCheckbox2"
											value="admin"
											checked={radioCheck === "admin"}
											onChange={handleRadioChange}
										/>
										<label class="form-check-label" for="inlineCheckbox1">
											Admin
										</label>
									</div>
								</div>
								<div className="row justify-content-center">
									<div className="col-lg">
										<input
											type="submit"
											value="Submit"
											className="btnSubmit btn-primary"
										/>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
