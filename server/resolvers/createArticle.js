import Article from '../models/Article';
import CommonResponse from '../helpers/index';

module.exports = async ({ articleName, category, description }, context) => {
  try {
    const userId = await context();

    let article = new Article({
      articleName,
      description,
      likes: [],
      comments: [],
      category,
      author: userId,
    });
    const savedArticle = await article.save();
    if (savedArticle) {
      const populatedArticle = await savedArticle
        .populate('author', 'firstName lastName profession')
        .execPopulate();
      return CommonResponse('SUCCESS', populatedArticle, null);
    }
    throw new Error('Something went wrong!');
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
