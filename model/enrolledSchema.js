


const mongoose = require('mongoose');

const enrollSchema = mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courses', 
    required: true,
  },
  userId: {
   type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,

  },
});

module.exports = mongoose.model('Enroll', enrollSchema);

