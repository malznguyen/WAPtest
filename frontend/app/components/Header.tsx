export default function Header() {
  return (
    <header className="p-6 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          🌤️ Weather AI Forecast
        </h1>
        <input
          type="text"
          placeholder="Search for a location..."
          className="px-6 py-3 w-96 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500"
        />
        <div className="flex gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">🔔</button>
          <button className="p-2 hover:bg-gray-100 rounded-full">☀️</button>
        </div>
      </div>
    </header>
  );
}
