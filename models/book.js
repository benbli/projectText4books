var mongoose = require('mongoose');

var TextbookSchema = mongoose.Schema({
  title: { type: String },
  isbn: { type: String },
  condition: { type: String },
  status: { type: Number, default: 0 },
  author: { type: String },
  description: { type: String },
  image: { type: String },
  professor: { type: String },
  college: { type: String },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Book', TextbookSchema);
