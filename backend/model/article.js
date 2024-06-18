const mongoose = require("mongoose");

const ArtSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  author: { type: String, required: true },
  publicationDate: { type: String, required: true },
  url: { type: String, required: true },
});

const ArticleModel = mongoose.model("Stories", ArtSchema);

module.exports = ArticleModel;
