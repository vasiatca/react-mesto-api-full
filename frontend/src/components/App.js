import { useState, useEffect } from "react";

import { Switch, Route, useHistory } from "react-router-dom";

import api from "./../utils/api";
import AuthApi from "../utils/AuthApi";

import Footer from "./Footer";
import Header from "./Header";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

import ProtectedRoute from "./ProtectedRoute";

import AuthUserContext from "./../contexts/AuthUserContext";

import InfoTooltip from "./InfoTooltip";

const App = () => {
  const history = useHistory();
  const [authUser, setAuthUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  const closeTooltip = () => {
    setIsOpenTooltip(false);
    setIsSuccess(false);
  }

  const logout = () => {
    localStorage.removeItem("token");
    setAuthUser({});
    setLoggedIn(false);
    history.push("/sign-in");
  }

  const onLogin = ({ email, password }) =>
    AuthApi.login({ password, email })
      .then(({ token }) => {
        localStorage.setItem("token", token);

        AuthApi.getUser(token).then(({ data }) => {
          setAuthUser(data);
          setLoggedIn(true);

          history.push("/");
        });
      })
      .catch((e) => console.log(e));


  const onRegister = ({ email, password }) =>
    AuthApi.register({ password, email })
      .then((res) => setIsSuccess(true))
      .catch((e) => setIsSuccess(false))
      .finally(() => setIsOpenTooltip(true));


  const onCardLike = ({ id, isLiked }) =>
    api.changeLikeCardStatus(id, isLiked);


  const onCardDelete = ({ id }) =>
    api.deleteCard(id);


  const onUpdateUser = ({ name, about }) =>
    api.editUser({ name, about });



  const onUpdateAvatar = ({ avatar }) =>
    api.updateAvatar(avatar);


  const onAddPlaceCard = ({ name, link }) =>
    api.addNewCard({ name, link });

  const getUser = () => api.getUser();

  const getInitialCards = () => api.getInitialCards();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await AuthApi.getUser(token);
          setAuthUser(response ? response.data : {});
          setLoggedIn(true);

          history.push("/");
        }
      } catch (err) {
        localStorage.removeItem("token")
      }
    };
    fetchData();
  }, [history]);

  return (
    <AuthUserContext.Provider value={authUser}>
      <div className="App">
        <div className="page">
          <Header logout={logout} />
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <ProtectedRoute path="/" loggedIn={loggedIn}>
              <Home
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                onUpdateUser={onUpdateUser}
                onUpdateAvatar={onUpdateAvatar}
                onAddPlaceCard={onAddPlaceCard}
                getUser={getUser}
                getInitialCards={getInitialCards}
              />
            </ProtectedRoute>
          </Switch>
          <Footer />
        </div>
      </div>
      <InfoTooltip
        name="register-tooltip"
        isOpen={isOpenTooltip}
        isSuccess={isSuccess}
        onClose={closeTooltip}
      />
    </AuthUserContext.Provider>
  );
};

export default App;
