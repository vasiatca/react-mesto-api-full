import { useState } from "react";

const Register = ({ onRegister }) => {
	const [registerData, setRegisterData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setRegisterData({ ...registerData, [name]: value });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		await onRegister(registerData)
	};

	return (
		<div className="register">
			<h2 className="register__heading">Регистрация</h2>
			<form
				className="popup__content"
				name="register"
				onSubmit={handleSubmit}
				action="#"
				noValidate
			>
				<input
					type="email"
					className="popup__field_type_email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
					required
					value={registerData.email}
				/>
				<input
					type="password"
					className="popup__field_type_password"
					placeholder="Пароль"
					name="password"
					onChange={handleChange}
					required
					value={registerData.password}
				/>

				<button className="register__button" type="submit">Зарегистрироваться</button>
			</form>
			<p className="register__paragraph">Уже зарегистриваны? <a className="register__link" type="submit" href="/sigh-in">Войти</a>
			</p>
		</div>
	);
};

export default Register;