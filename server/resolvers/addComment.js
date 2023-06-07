import Article from '../models/Article';
import CommonResponse from '../helpers/index';
module.exports = async ({ articleId, body }, context) => {
  try {
    const userId = await context();
    let article = await Article.findById(articleId);
    if (article) {
      await article.comments.push({
        user: userId,
        body: body,
      });
      await article.save();
      const result = await Article.findById(articleId)
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: '_id firstName lastName profession',
          },
        })
        .populate('author', 'firstName lastName profession');
      return CommonResponse('SUCCESS', result, null);
    }
    throw new Error('Article does not Exist!');
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
