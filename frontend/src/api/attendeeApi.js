import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/attendees',
});

export const registerAttendee = (data) => API.post('/register-attendee', data);
export const checkInFingerprint = (data) => API.post('/check-in', data);
export const fetchAttendees = () => API.get('/');
export const sendEmails = (data) => API.post('/send-emails',data);
export const sendPreEventReminder = (data) => API.post('/send-reminders',data);
export const sendAbsenteeEmails = (data) => API.post('/send-missed',data);

