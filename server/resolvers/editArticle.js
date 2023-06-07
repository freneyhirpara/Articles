import Article from '../models/Article';
import CommonResponse from '../helpers/index';

module.exports = async (
  { articleId, articleName, category, description },
  context
) => {
  try {
    const userId = await context();
    const getArticle = await Article.findById(articleId);
    const author = getArticle.author._id.toString();
    if (author !== userId) {
      throw new Error('Unauthorized!!');
    }
    let article;
    await Article.findByIdAndUpdate(
      articleId,
      {
        articleName,
        description,
        category,
      },
      { new: true, useFindAndModify: false },
      async function (err, docs) {
        if (err) {
          throw new Error('Something went wrong!');
        } else {
          if (docs) {
            article = docs;
          }
        }
      }
    );
    return CommonResponse('SUCCESS', article, null);
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
