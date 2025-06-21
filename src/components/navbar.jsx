export default function Navbar() {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">UCUA Reporting System</h1>
      <div className="flex items-center gap-4">
        {/* Optional user info or logout */}
        <span className="text-gray-700 text-sm">
          {localStorage.getItem('userRole')?.toUpperCase()} Logged In
        </span>
      </div>
    </div>
  );
}
