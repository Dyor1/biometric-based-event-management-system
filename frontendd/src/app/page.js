"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { io } from "socket.io-client";
import { FaFileExcel, FaEnvelope, FaRegSadTear } from "react-icons/fa";
import Image from "next/image";

const App = () => {
	const [attendees, setAttendees] = useState([]);
	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState([]);
	const [notification, setNotification] = useState("");
	const [exporting, setExporting] = useState(false);

	const fetchAttendees = async () => {
		const res = await axios.get(
			"https://biometric-based-event-management-system.onrender.com/api/attendees"
		);
		setAttendees(res.data);
	};

	useEffect(() => {
		fetchAttendees();
		const interval = setInterval(fetchAttendees, 10000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const socket = io(
			"https://biometric-based-event-management-system.onrender.com"
		);
		socket.on("realtime-update", (data) => {
			setNotification(`${data.name} just checked in`);
			setTimeout(() => setNotification(""), 5000);
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
		XLSX.utils.book_append_sheet(wb, sheet, "Filtered Attendees");
		XLSX.writeFile(wb, "Attendees.xlsx");
		setTimeout(() => setExporting(false), 1000);
	};

	const handleSendReminder = async () => {
		try {
			await axios.post(
				"https://biometric-based-event-management-system.onrender.com/api/attendees/send-reminders"
			);
			alert("Reminder emails sent!");
		} catch (err) {
			alert("Failed to send reminders.");
			console.error(err);
		}
	};

	const handleSendMissed = async () => {
		try {
			await axios.post(
				"https://biometric-based-event-management-system.onrender.com/api/attendees/send-missed"
			);
			alert('"We Missed You" emails sent!');
		} catch (err) {
			alert("Failed to send missed-you emails.");
			console.error(err);
		}
	};

	const total = filtered.length;
	const present = filtered.filter((a) => a.attended).length;

	const chartData = {
		labels: ["Checked In", "Absent"],
		datasets: [
			{
				label: "Attendance Overview",
				data: [present, total - present],
				backgroundColor: ["#22c55e", "#ef4444"],
			},
		],
	};

	return (
		<>
			{/* Notification */}
			{notification && (
				<div className="fixed top-6 right-6 z-50 bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-xl shadow-lg animate-slide-in-down transition-all duration-500">
					{notification}
				</div>
			)}
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-800 p-2 md:p-8 space-y-4">
				<header className=" text-black p-6 md:p-8 rounded-b-2xl shadow-xl flex items-center justify-between mb-4">
					<div className="flex items-center gap-3">
						{/* Event Authenticator Logo */}
						<Image
							width={50}
							height={50}
							src="auth.svg"
							alt="Authenticator Logo"
							className="rounded-full bg-green-100 border border-green-300 shadow"
						/>
						<h1 className="text-2xl font-bold tracking-tight">
							Event Authenticator
						</h1>
					</div>
					<nav className="flex gap-4 text-sm md:text-base items-center">
						<div className="flex items-center gap-4">
							{/* Light/Dark Mode Toggle */}
							<button
								title="Toggle light/dark mode"
								className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
								onClick={() => {
									document.documentElement.classList.toggle("dark");
								}}>
								<span className="sr-only">Toggle theme</span>
								<svg
									className="w-5 h-5 cursor-pointer"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
									/>
								</svg>
							</button>
							{/* Notification Icon */}
							<button
								title="Notifications"
								className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition relative">
								<span className="sr-only">Notifications</span>
								<svg
									className="w-5 h-5 cursor-pointer"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
							</button>
							{/* Admin Mode Text */}
							<span className="bg-white/20 px-3 py-1 rounded-full font-semibold tracking-wide text-xs uppercase">
								Admin Mode
							</span>
						</div>
					</nav>
				</header>

				<p className="text-base opacity-90">
					Real-time dashboard for biometric-based event attendance. Instantly
					monitor attendee check-ins, export attendance data, and send reminders
					or follow-up emails to participants.
				</p>
				<p className="text-sm text-gray-600 mt-1">
					This dashboard enables event organizers to track attendance as it
					happens, manage attendee data, and communicate efficiently. All
					updates are reflected in real time as attendees check in using
					biometric authentication.
				</p>

				{/* Divider */}
				<hr className="border-t-2 border-indigo-100 my-2" />

				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
					<div className="bg-white border rounded-2xl shadow-lg p-6 flex flex-col items-center">
						<h4 className="text-gray-500 text-sm font-medium mb-1">
							Total Registered
						</h4>
						<p className="text-3xl font-extrabold text-indigo-700">{total}</p>
					</div>
					<div className="bg-green-50 border border-green-200 rounded-2xl shadow-lg p-6 flex flex-col items-center">
						<h4 className="text-green-700 text-sm font-medium mb-1">
							Checked In
						</h4>
						<p className="text-3xl font-extrabold">{present}</p>
					</div>
					<div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-6 flex flex-col items-center">
						<h4 className="text-red-700 text-sm font-medium mb-1">Absent</h4>
						<p className="text-3xl font-extrabold">{total - present}</p>
					</div>
				</div>

				{/* Chart */}
				<div className="bg-white border-2 border-indigo-100 p-6 rounded-2xl shadow-2xl max-w-3xl mx-auto mt-8">
					<Bar data={chartData} />
				</div>

				{/* Divider */}
				<hr className="border-t-2 border-indigo-100 my-2" />

				{/* Search */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 m-4">
					<input
						type="search"
						placeholder="Search name or email..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full md:w-[40%] px-5 py-3 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-700 placeholder-gray-400 transition"
					/>
				</div>

				{/* Table */}
				<div className="overflow-x-auto mt-8">
					<table className="w-full table-auto border-collapse shadow-xl rounded-2xl bg-white">
						<thead className="bg-indigo-100 text-indigo-700">
							<tr>
								<th className="border-b px-6 py-3 text-left font-semibold">
									Name
								</th>
								<th className="border-b px-6 py-3 text-left font-semibold">
									Email
								</th>
								<th className="border-b px-6 py-3 font-semibold">Status</th>
								<th className="border-b px-6 py-3 font-semibold">
									Check-In Time
								</th>
							</tr>
						</thead>
						<tbody>
							{filtered.map((a, i) => (
								<tr
									key={a._id}
									className={`transition hover:bg-indigo-50/80 ${
										i % 2 === 0 ? "bg-white" : "bg-indigo-50/40"
									}`}>
									<td className="border-b px-6 py-3">{a.name}</td>
									<td className="border-b px-6 py-3">{a.email}</td>
									<td
										className={`border-b px-6 py-3 font-semibold ${
											a.attended ? "text-green-600" : "text-red-600"
										}`}>
										{a.attended ? "Checked In" : "Absent"}
									</td>
									<td className="border-b px-6 py-3">
										{a.attended
											? new Date(a.checkInTime).toLocaleString()
											: "-"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{/* Actions */}
				<div>
					<div className="flex flex-wrap gap-4 mt-2">
						<button
							onClick={exportToExcel}
							disabled={exporting}
							className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-2.5 rounded-full font-semibold shadow transition-all duration-150">
							<FaFileExcel className="text-lg" />
							{exporting ? (
								<span className="flex items-center gap-2">
									<span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
									Exporting...
								</span>
							) : (
								"Export to Excel"
							)}
						</button>

						<button
							onClick={handleSendReminder}
							className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold shadow transition-all duration-150">
							<FaEnvelope className="text-lg" />
							Send Event Reminder
						</button>

						<button
							onClick={handleSendMissed}
							className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-semibold shadow transition-all duration-150">
							<FaRegSadTear className="text-lg" />
							Send Missed You Email
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
