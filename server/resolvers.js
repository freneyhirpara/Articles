import getArticle from './resolvers/getArticle';
import getArticles from './resolvers/getArticles';
import getAuthorInfo from './resolvers/getAuthorInfo';
import toggleLikes from './resolvers/toggleLikes';
import addComment from './resolvers/addComment';
import createArticle from './resolvers/createArticle';
import editArticle from './resolvers/editArticle';
import createUser from './resolvers/createUser';
import getArticlesByCategory from './resolvers/getArticlesByCategory';
import deleteArticle from './resolvers/deleteArticle';
import login from './resolvers/login';

const resolvers = {
  getArticle,
  getArticles,
  getAuthorInfo,
  toggleLikes,
  addComment,
  createArticle,
  deleteArticle,
  editArticle,
  createUser,
  login,
  getArticlesByCategory,
};

export default resolvers;
