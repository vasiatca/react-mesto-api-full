const PopupWithForm = (props) => {
	return (
		<div
			className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""
				}`}
		>
			<div className="popup__container">
				<button
					type="button"
					className="popup__close"
					onClick={props.onClose}
				></button>
				<h2 className="popup__title">{props.title}</h2>
				<form
					className="popup__content"
					name={props.name}
					onSubmit={props.onSubmit}
					action="#"
				//noValidate
				>
					{props.children}
					<button type="submit" className="popup__submit-button">
						{props.buttonText}
					</button>
				</form>
			</div>
		</div>
	);
};

export default PopupWithForm;