import logo from "../images/logo.svg";

import { useContext } from "react";
import AuthUserContext from "./../contexts/AuthUserContext";
import { NavLink, useLocation } from 'react-router-dom';

const Header = ({ logout }) => {
	const user = useContext(AuthUserContext);
	const { pathname } = useLocation()

	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="Логотип" />
			{user && user.email ? (
				<>
					<div className="header__info">
						<div className="header__email" >{user.email}</div>
						<button className="header__button" type="button" onClick={logout}>
							Выйти
						</button>
					</div>
				</>
			) : (

				<>
					{pathname === "/sign-up" && (
						<NavLink className="header__navlink" to="sign-in">
							Войти
						</NavLink>
					)}
					{pathname === "/sign-in" && (
						<NavLink className="header__navlink" to="/sign-up">
							Зарегистрироваться
						</NavLink>
					)}
				</>

			)}



		</header>
	);
};

export default Header;