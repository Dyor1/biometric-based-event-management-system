import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { io } from 'socket.io-client';

const App = () => {
  const [attendees, setAttendees] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [notification, setNotification] = useState('');
  const [exporting, setExporting] = useState(false);

  const fetchAttendees = async () => {
    const res = await axios.get('https://biometric-based-event-management-system.onrender.com/api/attendees');
    setAttendees(res.data);
  };

  useEffect(() => {
    fetchAttendees();
    const interval = setInterval(fetchAttendees, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const socket = io('https://biometric-based-event-management-system.onrender.com');
    socket.on('realtime-update', (data) => {
      setNotification(`✅ ${data.name} just checked in`);
      setTimeout(() => setNotification(''), 5000);
      setAttendees((prev) =>
        prev.find((a) => a._id === data._id)
          ? prev.map((a) => (a._id === data._id ? data : a))
          : [data, ...prev]
      );
    });
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const result = attendees.filter(
      (a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, attendees]);

  const exportToExcel = () => {
    setExporting(true);
    const sheet = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'Filtered Attendees');
    XLSX.writeFile(wb, 'Attendees.xlsx');
    setTimeout(() => setExporting(false), 1000);
  };

  const handleSendReminder = async () => {
    try {
      await axios.post('https://biometric-based-event-management-system.onrender.com/api/attendees/send-reminders');
      alert('✅ Reminder emails sent!');
    } catch (err) {
      alert('❌ Failed to send reminders.');
      console.error(err);
    }
  };

  const handleSendMissed = async () => {
    try {
      await axios.post('https://biometric-based-event-management-system.onrender.com/api/attendees/send-missed');
      alert('✅ "We Missed You" emails sent!');
    } catch (err) {
      alert('❌ Failed to send missed-you emails.');
      console.error(err);
    }
  };

  const total = filtered.length;
  const present = filtered.filter((a) => a.attended).length;

  const chartData = {
    labels: ['Checked In', 'Absent'],
    datasets: [
      {
        label: 'Attendance Overview',
        data: [present, total - present],
        backgroundColor: ['#22c55e', '#ef4444'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 space-y-6">
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded shadow animate-pulse">
          {notification}
        </div>
      )}

      <header className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg mb-4">
        <h1 className="text-2xl font-bold">Event Admin Dashboard</h1>
        <p className="text-sm">Monitor, manage, and export attendee data in real-time.</p>
      </header>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <input
          type="search"
          placeholder="🔍 Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-[40%] px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportToExcel}
            disabled={exporting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full transition"
          >
            {exporting ? 'Exporting...' : '⬇️ Export to Excel'}
          </button>

          <button
            onClick={handleSendReminder}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
          >
            📤 Send Reminder
          </button>

          <button
            onClick={handleSendMissed}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full transition"
          >
            😢 Send "We Missed You"
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div className="bg-white border rounded-lg shadow p-4">
          <h4 className="text-gray-600 text-sm">Total Registered</h4>
          <p className="text-2xl font-bold text-indigo-700">{total}</p>
        </div>
        <div className="bg-green-100 border border-green-300 rounded-lg shadow p-4">
          <h4 className="text-green-700 text-sm">Checked In</h4>
          <p className="text-2xl font-bold">{present}</p>
        </div>
        <div className="bg-red-100 border border-red-300 rounded-lg shadow p-4">
          <h4 className="text-red-700 text-sm">Absent</h4>
          <p className="text-2xl font-bold">{total - present}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow max-w-3xl mx-auto mt-6">
        <Bar data={chartData} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full table-auto border-collapse shadow-md rounded-md text-sm">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Check-In Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a._id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border px-4 py-2">{a.name}</td>
                <td className="border px-4 py-2">{a.email}</td>
                <td className={`border px-4 py-2 font-semibold ${a.attended ? 'text-green-600' : 'text-red-600'}`}>
                  {a.attended ? '✅ Checked In' : '❌ Absent'}
                </td>
                <td className="border px-4 py-2">
                  {a.attended ? new Date(a.checkInTime).toLocaleString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
