import Article from '../models/Article';
import CommonResponse from '../helpers/index';

module.exports = async ({ category, page, limit }) => {
  let articles;
  try {
    if (category === 'All') {
      articles = await Article.find()
        .sort([['articleName', 1]])
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: 'firstName lastName profession',
          },
        })
        .populate('author', 'firstName lastName profession');
      let totalArticles = Article.countDocuments();
      let response = {
        articles,
        totalArticles,
      };
      return CommonResponse('SUCCESS', response, null);
    } else {
      let articles = await Article.find({ category: category })
        .sort([['articleName', 1]])
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: 'firstName lastName profession',
          },
        })
        .populate('author', 'firstName lastName profession');
      let totalArticles = await Article.countDocuments({ category: category });
      let response = {
        articles,
        totalArticles,
      };
      return CommonResponse('SUCCESS', response, null);
    }
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
