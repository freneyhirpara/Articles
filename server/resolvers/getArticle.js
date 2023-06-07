import Article from '../models/Article';
import CommonResponse from '../helpers/index';

module.exports = async ({ id }, context) => {
  try {
    await context();
    let article = await Article.findById(id)
      .populate('author', 'firstName lastName profession')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: '_id firstName lastName profession',
        },
      });
    return CommonResponse('SUCCESS', article, null);
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
