import React, { useState } from "react";

const Login = ({ onLogin }) => {
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData({ ...loginData, [name]: value });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		await onLogin(loginData);
	}

	return (
		<div className="register">
			<h2 className="register__heading">Вход</h2>
			<form
				className="popup__content"
				name="login"
				onSubmit={handleSubmit}
				action="#"
				noValidate
			>
				<input
					type="email"
					className="popup__field_type_email"
					name="email"
					required
					placeholder="Email"
					onChange={handleChange}
					value={loginData.email}
				/>
				<input
					type="password"
					className="popup__field_type_password"
					name="password"
					required
					placeholder="Пароль"
					onChange={handleChange}
					value={loginData.password}
				/>

				<button className="register__button" type="submit">Войти</button>
			</form>
		</div>
	);
};

export default Login;