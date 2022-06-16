import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {
	const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const handleChangeName = (e) => setName(e.target.value);
	const handleChangeDescription = (e) => setDescription(e.target.value);

	useEffect(() => {
		if (currentUser.name) {
			setName(currentUser.name);
		}

		if (currentUser.about) {
			setDescription(currentUser.about);
		}
	}, [currentUser, props.isOpen]);

	const handleSubmit = (e) => {
		e.preventDefault();

		props.onUpdateUser({
			name,
			about: description,
		});
	};

	return (
		<PopupWithForm
			name="edit-profile"
			title="Редактировать профиль"
			buttonText="Сохранить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			children={
				<>
					<input
						type="text"
						className="popup__field"
						name="name"
						placeholder="Имя"
						minLength="2"
						maxLength="40"
						value={name}
						onChange={handleChangeName}
						required
					/>
					<span className="popup__error"></span>
					<input
						type="text"
						className="popup__field"
						name="about"
						placeholder="О себе"
						minLength="2"
						maxLength="200"
						value={description}
						onChange={handleChangeDescription}
						required
					/>
					<span className="popup__error"></span>
				</>
			}
		/>
	);
};

export default EditProfilePopup;