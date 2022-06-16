import { useState, useEffect } from 'react';
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Main from "./Main";
import CurrentUserContext from "./../contexts/CurrentUserContext";

const Home = ({ onCardLike, onCardDelete, onUpdateUser, onUpdateAvatar, onAddPlaceCard, getUser, getInitialCards }) => {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [cards, setCards] = useState([]);

	const [currentUser, setCurrentUser] = useState({});

	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard({});
	};

	const handleCardClick = (card) => {
		setSelectedCard(card);
	};

	const handleCardLike = (card) => {
		const isLiked = card.likes.some((own) => own._id === currentUser._id);

		onCardLike({ id: card._id, isLiked })
			.then((newCard) => {
				setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
			})
			.catch(err => console.log(err));
	};

	const handleCardDelete = (card) => {
		onCardDelete({ id: card._id })
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== card._id));
			})
			.catch(err => console.log(err));
	};

	const handleUpdateUser = ({ name, about }) => {
		onUpdateUser({ name, about })
			.then((newUser) => {
				setCurrentUser(newUser);
				closeAllPopups();
			})
			.catch(err => console.log(err));
	};

	const handleUpdateAvatar = ({ avatar }) => {
		onUpdateAvatar({ avatar })
			.then((newUser) => {
				setCurrentUser(newUser);
				closeAllPopups();
			})
			.catch(err => console.log(err));
	};

	const handleAddPlaceCard = ({ name, link }) => {
		onAddPlaceCard({ name, link })
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userInfo = await getUser();
				setCurrentUser(userInfo);

				const cards = await getInitialCards();
				setCards(cards);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, [getUser, getInitialCards]);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<Main
				cards={cards}
				onEditProfile={() => setIsEditProfilePopupOpen(true)}
				onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
				onAddPlace={() => setIsAddPlacePopupOpen(true)}
				onCardClick={handleCardClick}
				onCardLike={handleCardLike}
				onCardDelete={handleCardDelete}
			/>


			<EditProfilePopup
				isOpen={isEditProfilePopupOpen}
				onUpdateUser={handleUpdateUser}
				onClose={closeAllPopups}
			/>

			<EditAvatarPopup
				isOpen={isEditAvatarPopupOpen}
				onUpdateAvatar={handleUpdateAvatar}
				onClose={closeAllPopups}
			/>

			<AddPlacePopup
				isOpen={isAddPlacePopupOpen}
				onAddCard={handleAddPlaceCard}
				onClose={closeAllPopups}
			/>

			<ImagePopup card={selectedCard} onClose={closeAllPopups} />

		</CurrentUserContext.Provider>
	);
};

export default Home;