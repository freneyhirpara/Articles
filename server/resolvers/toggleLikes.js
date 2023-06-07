import Article from '../models/Article';
import CommonResponse from '../helpers/index';

module.exports = async ({ articleId }, context) => {
  try {
    const userId = await context();
    if (userId) {
      let article = await Article.findById(articleId);
      if (article) {
        if (article.likes.find((like) => like._id == userId)) {
          article.likes = article.likes.filter((like) => like._id != userId);
        } else {
          article.likes.push({
            _id: userId,
          });
        }
        await article.save();
        return CommonResponse('SUCCESS', article, null);
      }
      throw new Error('Article does not Exist!');
    }
    throw new Error('Please login to like Articles.');
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
