import {
  GET_ARTICLES,
  ADD_ARTICLE,
  GET_ARTICLE_BY_ID,
  USER_LOGIN,
  USER_LOGOUT,
  SET_ERROR,
  RESET_ERROR,
  REFRESH_STATE,
  SET_CATEGORY,
} from './ActionTypes';

export const initialState = {
  articles: [],
  article: '',
  token: '',
  userId: '',
  sortByCategory: 'All',
  myself: [],
  users: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case GET_ARTICLE_BY_ID:
      return {
        ...state,
        article: action.payload,
      };
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload],
      };
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case USER_LOGOUT:
      return {
        ...state,
        article: null,
        token: null,
        userId: null,
      };
    case SET_CATEGORY:
      return {
        ...state,
        sortByCategory: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    case REFRESH_STATE:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };

    default:
      return state;
  }
};

export default reducer;
