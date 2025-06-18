const mongoose = require('mongoose');

const AttendeeSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email'] // Validates email format
  },
  gender: String,
  age: Number,
  phone: String,
  address: String,
  dob: String,
  fingerprintTemplate: {
    type: String,
    unique: true,
    required: true
  },
  attended: {
    type: Boolean,
    default: false
  },
  checkInTime: Date,
}, { timestamps: true });

module.exports = mongoose.model('Attendee', AttendeeSchema);
