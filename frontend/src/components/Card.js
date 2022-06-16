import { useContext } from "react";
import currentUserContext from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = useContext(currentUserContext);
  const isOwn = props.owner._id === currentUser._id;
  const isLikes = props.likes.some((own) => own._id === currentUser._id);

  return (
    <li className="element__card">
      <img
        className="element__image"
        src={props.image}
        onClick={props.onCardClick}
        alt="Фото"
      />
      <button
        type="button"
        onClick={props.onDeleteClick}
        className={`element__delete ${isOwn ? "element__delete_visible" : ""}`}
      />
      <div className="element__info">
        <h3 className="element__title">{props.name}</h3>
        <div className="element__like-group">
          <button
            type="button"
            onClick={props.onLikeClick}
            className={`element__like ${isLikes ? "element__like_active" : ""}`}
          />
          <p className="element__like-number">{props.likesCount}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;