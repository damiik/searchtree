var mongoose = require('mongoose'); //http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/


var NoteSchema = new mongoose.Schema({
  // name: String,
  completed: {
    type: Boolean,
    default: false
  },
  note: String,
  description: String,
  updated_at: {
    type: Date,
    default: Date.now
  },
  connected_notes: []
});
module.exports = mongoose.model('Note', NoteSchema);