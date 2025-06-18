const express = require('express');
const {
  registerAttendee,
  getAllTemplates,
  markCheckIn,
  getAllAttendees,
  sendPreEventReminder,
  sendAbsenteeEmails,
} = require('../controllers/attendeeController');

const router = express.Router();

router.post('/', registerAttendee);
router.get('/templates', getAllTemplates);
router.post('/check-in/:id', markCheckIn);
router.get('/', getAllAttendees);
router.post('/send-reminders', sendPreEventReminder);
// router.post('/send-reminders', emailController.sendPreEventReminder);
router.post('/send-missed', sendAbsenteeEmails);

// router.post('')





module.exports = router;
