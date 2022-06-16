import { createRef } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
	const nameRef = createRef();
	const linkRef = createRef();

	const handleSumbit = (e) => {
		e.preventDefault();

		const name = nameRef.current.value;
		const link = linkRef.current.value;

		props.onAddCard({
			name,
			link,
		});

		nameRef.current.value = "";
		linkRef.current.value = "";
	};

	return (
		<PopupWithForm
			name="add-place"
			title="Новое место"
			buttonText="Создать"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSumbit}
			children={
				<>
					<input
						type="text"
						className="popup__field"
						name="name"
						placeholder="Место"
						minLength="2"
						maxLength="30"
						ref={nameRef}
						required
					/>
					<span className="popup__error"></span>
					<input
						type="url"
						className="popup__field"
						name="link"
						placeholder="Ссылка"
						ref={linkRef}
						required
					/>
					<span className="popup__error"></span>
				</>
			}
		/>
	);
};

export default AddPlacePopup;