const ImagePopup = (props) => {
	return (
		<div className={`popup popup_picture ${Object.values(props.card).length ? 'popup_opened' : ''}`}>
			<div className="popup__container popup__container_picture">
				<button type="button" className="popup__close" onClick={props.onClose} />
				<img src={props.card.link} alt="Картинка" className="popup__picture" />
				<div className="popup__picture-caption">{props.card.name}</div>
			</div>
		</div>
	)
}

export default ImagePopup;