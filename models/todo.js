const mongoose = require('mongoose');

// Todo schema
const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  cheked: {
    type: Boolean,
    required: true,
    default: false
  },

});

const Todo = module.exports = mongoose.model('Todo', articleSchema);