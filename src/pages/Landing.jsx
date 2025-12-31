import { Link } from "react-router-dom";
import { CreditCard, PieChart, BarChart2, UploadCloud } from "lucide-react";

const services = [
  { title: "Track Incomes & Expenses", desc: "Record, edit and categorize every transaction.", icon: <CreditCard size={18} /> },
  { title: "Smart Categories", desc: "Group transactions and analyze spending by category.", icon: <PieChart size={18} /> },
  { title: "Insights & Charts", desc: "Visualize trends with interactive charts and reports.", icon: <BarChart2 size={18} /> },
  { title: "Export & Share", desc: "Download or email transaction reports in one click.", icon: <UploadCloud size={18} /> },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50">
      <header className="max-w-7xl mx-auto flex items-center justify-between py-6 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold">FL</div>
          <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600">FinLynk</div>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/login" className="px-4 py-2 rounded hover:bg-gray-100">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded shadow-md hover:opacity-95">Sign up</Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <section>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">Take control of your finances with FinLynk</h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl">FinLynk makes personal finance effortless — categorize transactions, visualize trends, and export reports. Powerful tools, beautifully simple.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg">Get Started</Link>
            <Link to="/login" className="inline-flex items-center px-6 py-3 border rounded-lg text-gray-700">Login</Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.title} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-50 text-purple-600">{s.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{s.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">Account Balance</div>
              <div className="text-xl font-bold">₹24,560</div>
            </div>
            <div className="h-56 bg-gradient-to-br from-purple-50 to-green-50 rounded-xl p-5 flex flex-col justify-between">
              <div className="flex gap-3">
                <div className="flex-1 bg-white/80 rounded p-3">
                  <div className="text-xs text-gray-500">Income</div>
                  <div className="font-semibold">₹45,000</div>
                </div>
                <div className="flex-1 bg-white/80 rounded p-3">
                  <div className="text-xs text-gray-500">Expenses</div>
                  <div className="font-semibold">₹20,440</div>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500">Interactive charts · Export · Categories</div>
            </div>
            <div className="mt-5 text-center text-sm text-gray-500">No account required to browse — sign up to save your data.</div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-sm text-gray-600">© {new Date().getFullYear()} FinLynk — Smart personal finance tracking</div>
      </footer>
    </div>
  );
};

export default Landing;
