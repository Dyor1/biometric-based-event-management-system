# 🛡️ Event Biometric System

A complete full-stack fingerprint-based event management system designed to streamline attendee registration and check-in.

---

## 🚀 Tech Stack

| Layer       | Tech Used                                     |
|-------------|-----------------------------------------------|
| UI (Desktop) | C# (WinForms) + DigitalPersona SDK            |
| Backend     | Node.js + Express                             |
| Database    | MongoDB (via MongoDB Atlas)                   |
| Admin Panel | Next.js + Tailwind CSS                        |
| Email       | Brevo (formerly Sendinblue) API               |

---

## ✨ Key Features

- 🔐 **Biometric Registration** – Users register with fingerprint and personal details  
- 🧾 **Fingerprint Check-In** – Check-in via fingerprint, no need for credentials  
- 📊 **Admin Dashboard** – Real-time updates, charts, attendance logs  
- 📧 **Email Notifications** – Auto-emails to attendees and absentees after event  
- 📁 **Excel Export** – Admin can export attendance list to Excel  
- 🔊 **Audio Feedback** – Scanning success/failure audio cues  

---

## 🧰 How to Run the Project
🔧 Requirements
Before running the project, make sure the following are installed:

✅ For Desktop Fingerprint App (C#)
.NET Framework Runtime
### 🔗 Requirements

- [.NET Framework Runtime](https://dotnet.microsoft.com/en-us/download/dotnet-framework)

DigitalPersona U.are.U SDK and RTE (Runtime Environment)
- [DigitalPersona SDK & RTE](SDK.zip)

Download SDK & RTE (Drivers + DLLs)

Ensure SDK DLLs are in the same directory as the executable (completefingerprintapp.exe)

✅ For Backend
Node.js
MongoDB Atlas account
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

✅ For Frontend (Admin Dashboard)
Node.js (LTS version)
npm or yarn package manager

🧪 Environment Configuration
Create a .env file inside your backend/ directory with the following:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BREVO_API_KEY=your_brevo_smtp_or_api_key
🔐 Keep this file private — do not commit it to GitHub.

### 🔧 Backend Setup

```bash
cd backend
npm install
node index.js
