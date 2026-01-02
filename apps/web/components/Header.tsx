export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Fountain Response Bot
            </span>
          </div>
          <nav className="flex gap-4 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">
              History
            </a>
            <a href="#" className="hover:text-gray-900">
              Templates
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

