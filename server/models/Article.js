const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articlesSchema = new Schema(
  {
    articleName: String,
    category: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    userId: String,
    description: String,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        body: Schema.Types.String,
      },
    ],
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', articlesSchema);
