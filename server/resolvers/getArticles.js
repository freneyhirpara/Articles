import Article from '../models/Article';
import CommonResponse from '../helpers/index';

module.exports = async () => {
  try {
    let articles = await Article.find()
      .populate({
        path: 'comments',
        populate: {
          path: '_id',
          select: 'firstName lastName profession',
        },
      })
      .populate('author', 'firstName lastName profession');
    return CommonResponse('SUCCESS', articles, null);
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
