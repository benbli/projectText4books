var mongoose = require('mongoose');

var TextbookSchema = mongoose.Schema({
  title: { type: String },
  isbn: { type: String },
  condition: { type: String, required: true },
  status: { type: Number, default: 0 },
  author: { type: String },
  description: { type: String },
  image: { type: String },
  professor: { type: String },
  college: { type: String },
  price: { type: Number, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Book', TextbookSchema);
