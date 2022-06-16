import React from "react";
import success from "../images/success.svg";
import notSuccess from "../images/not-success.svg";

const InfoTooltip = (props) => {
	return (
		<div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""
			}`}>
			<div className="popup__container" name={props.name}>
				<img
					className="popup__icon"
					src={props.isSuccess ? success : notSuccess}
					alt={
						props.isSuccess
							? "успешная регистрация"
							: "неуспешная регистрация"
					}
				/>
				<h2 className="popup__title">
					{props.isSuccess
						? "Вы успешно зарегистрировались!"
						: "Что-то пошло не так! Попробуйте еще раз."}
				</h2>
				<button
					onClick={props.onClose}
					type="button"
					className="popup__close"
				/>
			</div>
		</div>
	);
};

export default InfoTooltip;