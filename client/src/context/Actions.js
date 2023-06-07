import {
  ADD_ARTICLE,
  GET_ARTICLES,
  GET_ARTICLE_BY_ID,
  USER_LOGIN,
  USER_LOGOUT,
  REFRESH_STATE,
  SET_ERROR,
  RESET_ERROR,
  SET_CATEGORY,
} from './ActionTypes';

export const addArticleAction = (article) => ({
  type: ADD_ARTICLE,
  payload: article,
});

export const getArticlesAction = (articles) => ({
  type: GET_ARTICLES,
  payload: articles,
});

export const getArticleByIdAction = (article) => ({
  type: GET_ARTICLE_BY_ID,
  payload: article,
});

export const userLoginAction = (userData) => ({
  type: USER_LOGIN,
  payload: userData,
});

export const userLogoutAction = () => ({
  type: USER_LOGOUT,
  payload: null,
});

export const setCategoryAction = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  payload: error,
});
export const resetErrorAction = () => ({
  type: RESET_ERROR,
  payload: null,
});

export const refreshStateAction = (state) => ({
  type: REFRESH_STATE,
  payload: state,
});
