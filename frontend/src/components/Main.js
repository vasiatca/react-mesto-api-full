import { useContext } from "react";
import currentUserContext from "../contexts/CurrentUserContext";

import Card from "./Card";

const Main = (props) => {
	const currentUser = useContext(currentUserContext);

	return (
		<>
			<section className="profile">
				<div className="profile__content">
					<div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
						<img
							className="profile__avatar"
							src={currentUser.avatar}
							alt="Фото"
						/>
					</div>
					<div className="profile__info">
						<div className="profile__item">
							<div className="profile__item-inner">
								<h1 className="profile__title">{currentUser.name}</h1>
								<button
									type="button"
									id="edit-popup"
									className="profile__edit-button"
									onClick={props.onEditProfile}
								></button>
							</div>
						</div>
						<p className="profile__subtitle">{currentUser.about}</p>
					</div>
				</div>
				<button
					type="button"
					id="add-popup"
					className="profile__add-button"
					onClick={props.onAddPlace}
				></button>
			</section>

			<section className="elements">
				<ul className="element">
					{props.cards.map((item) => (
						<Card
							key={item._id}
							owner={item.owner}
							image={item.link}
							name={item.name}
							likes={item.likes}
							likesCount={item.likes.length}
							onCardClick={() => props.onCardClick(item)}
							onLikeClick={() => props.onCardLike(item)}
							onDeleteClick={() => props.onCardDelete(item)}
						/>
					))}
				</ul>
			</section>
		</>
	);
};

export default Main;