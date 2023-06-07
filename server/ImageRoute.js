var express = require('express');
var multer = require('multer');
import { ensureToken } from './Utilities/jwtUtils';
import Article from './models/Article';
import CommonResponse from './helpers/index';

var router = express.Router({
  caseSensitive: true,
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  },
});
var upload = multer({ storage: storage });

router.use(async function (req, res, next) {
  try {
    const { authorization: token } = req.headers;
    const isAuth = await ensureToken(token);
    if (isAuth) {
      return next();
    }
    throw new Error('Invalid Token');
  } catch (error) {
    res.json(CommonResponse('ERROR', null, error.message));
  }
});

router.post('/upload', upload.single('file'), async function (req, res) {
  try {
    const article = await Article.findById(req.body.articleId).populate(
      'author',
      'firstName lastName profession'
    );
    if (article) {
      if (article.image === req.file.filename) {
        return res.status(200).json(CommonResponse('SUCCESS', article, null));
      }
      article.image = req.file.filename;
      await article.save();
      return res.status(200).json(CommonResponse('SUCCESS', article, null));
    }
    throw new Error('Article Not Found');
  } catch (error) {
    return res.json(CommonResponse('ERROR', null, error.message));
  }
});

module.exports = router;
