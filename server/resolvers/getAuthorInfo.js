import User from '../models/User';
import Article from '../models/Article';
import CommonResponse from '../helpers/index';

module.exports = async ({ authorId, category, page, limit }, context) => {
  try {
    await context();
    let author = await User.findById(authorId);
    if (category === 'All') {
      let articles = await Article.find({ author: authorId })
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
      author.articles = articles;
      let totalArticles = await Article.countDocuments({ author: authorId });
      let response = {
        author,
        totalArticles,
      };
      return CommonResponse('SUCCESS', response, null);
    } else {
      let articles = await Article.find({
        author: authorId,
        category: category,
      })
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
      author.articles = articles;
      let totalArticles = await Article.countDocuments({
        author: authorId,
        category: category,
      });
      let response = {
        author,
        totalArticles,
      };
      return CommonResponse('SUCCESS', response, null);
    }
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
