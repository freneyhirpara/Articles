import React, {
  useEffect, createContext, useContext, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import reducer, { initialState } from './Reducer';
import {
  addArticleAction,
  getArticlesAction,
  getArticleByIdAction,
  userLoginAction,
  userLogoutAction,
  setCategoryAction,
  setErrorAction,
  resetErrorAction,
  refreshStateAction,
} from './Actions';

// Prepares the dataLayer
const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addArticle(article) {
    dispatch(addArticleAction(article));
  }

  function getAllArticles(articles) {
    dispatch(getArticlesAction(articles));
  }

  function getArticleById(article) {
    dispatch(getArticleByIdAction(article));
  }

  function userLogin(userData) {
    dispatch(userLoginAction(userData));
  }

  function userLogout() {
    dispatch(userLogoutAction());
  }

  function setCategory(category) {
    dispatch(setCategoryAction(category));
  }
  function setError(error) {
    dispatch(setErrorAction(error));
  }

  function resetError() {
    dispatch(resetErrorAction());
  }

  function refreshState() {
    const newToken = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null;
    const newUserId = localStorage.getItem('userId')
      ? localStorage.getItem('userId')
      : null;
    dispatch(refreshStateAction({ token: newToken, userId: newUserId }));
  }

  useEffect(() => {
    refreshState();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        articles: state.articles,
        article: state.article,
        token: state.token,
        userId: state.userId,
        error: state.error,
        sortByCategory: state.sortByCategory,
        addArticle,
        getAllArticles,
        getArticleById,
        userLogin,
        userLogout,
        setCategory,
        setError,
        resetError,
        refreshState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Pull information from the data layer
export const useStateValue = () => useContext(GlobalContext);

GlobalState.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default GlobalState;
