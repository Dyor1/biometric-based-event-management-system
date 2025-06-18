const Attendee = require('../models/Attendee');
const sendMail = require('../utils/sendMail.js');

exports.registerAttendee = async (req, res) => {
  try {
    const {
      name,
      email,
      gender,
      age,
      phone,
      address,
      dob,
      fingerprintTemplate,
    } = req.body;

    if (
      !name ||
      !email ||
      !gender ||
      !age ||
      !phone ||
      !address ||
      !dob ||
      !fingerprintTemplate
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const exists = await Attendee.findOne({ fingerprintTemplate });
    if (exists)
      return res
        .status(400)
        .json({ message: 'Fingerprint already registered' });

    const duplicateEmail = await Attendee.findOne({ email });
    if (duplicateEmail)
      return res.status(400).json({ message: 'Email already used' });

    const newAttendee = await Attendee.create({
      name,
      email,
      gender,
      age,
      phone,
      address,
      dob,
      fingerprintTemplate,
    });

    res.status(201).json(newAttendee);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Registration failed', error: error.message });
  }
};

exports.getAllTemplates = async (req, res) => {
  try {
    const attendees = await Attendee.find({}, 'name email fingerprintTemplate');
    res.json(attendees);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve templates', error: error.message });
  }
};

exports.markCheckIn = async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await Attendee.findById(id);
    if (!attendee)
      return res.status(404).json({ message: 'Attendee not found' });

    if (attendee.attended) {
      return res
        .status(400)
        .json({ message: 'Attendee has already checked in' });
    }

    attendee.attended = true;
    attendee.checkInTime = new Date();
    await attendee.save();

    req.io?.emit('realtime-update', attendee); // Socket optional

    // Send mail
    const emailBody = `
Hi ${attendee.name},

✅ This is a confirmation that you’ve successfully checked in to the event!

🕒 Check-In Time: ${new Date(attendee.checkInTime).toLocaleString()}
📍 Venue: new colphys

If you have any questions or need assistance, please feel free to reply to this email.

Thank you for attending!

—
EventBot
Event Management Team
`;

    await sendMail(
      attendee.email,
      '🎉 Check-In Confirmed – Welcome!',
      emailBody
    );
    res.json({ message: 'Check-in successful', attendee });
  } catch (error) {
    res.status(500).json({ message: 'Check-in failed', error: error.message });
  }
};

exports.getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find().sort({ createdAt: -1 });
    res.json(attendees);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch attendees', error: error.message });
  }
};

exports.sendPreEventReminder = async (req, res) => {
  try {
    const attendees = await Attendee.find();

    for (const attendee of attendees) {
      await sendMail(
        attendee.email,
        '📅 Reminder: Upcoming Event',
        `Dear ${attendee.name},\n\nJust a quick reminder of your registration for the upcoming event.`
      );
    }

    res.json({ message: 'Reminder emails sent' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Sending reminder failed', error: err.message });
  }
};

exports.sendEmails = async (req, res) => {
  const { type } = req.body; // 'attendees' or 'absentees'
  const filter =
    type === 'attendees' ? { attended: true } : { attended: false };
  const attendees = await Attendee.find(filter);

  for (const attendee of attendees) {
    await sendMail(
      attendee.email,
      type === 'attendees' ? '🎉 Thanks for attending!' : '😔 We missed you',
      type === 'attendees'
        ? `Hi ${attendee.name}, thanks for attending!`
        : `Hi ${attendee.name}, we noticed you couldn’t make it. Hope to see you next time!`
    );
  }

  res.json({ message: `Emails sent to ${type}` });
};


exports.sendAbsenteeEmails = async (req, res) => {
  const absentees = await Attendee.find({ attended: false });

  for (const attendee of absentees) {
    const msg = `
Hi ${attendee.name},

😔 We noticed you weren’t able to attend the event on ${new Date(process.env.EVENT_DATE).toLocaleDateString()}.

We missed you, and hope you can join us next time!

— EventBot
    `;
    await sendMail(attendee.email, '😢 Sorry We Missed You', msg);
  }

  res.json({ message: 'Missed-you emails sent' });
};
