import Article from '../models/Article';
import CommonResponse from '../helpers/index';

module.exports = async ({ id }, context) => {
  try {
    await context();
    await Article.findByIdAndRemove(id);
    return CommonResponse('SUCCESS', id, null);
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
