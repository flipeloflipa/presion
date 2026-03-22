import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, LineChart, UserCircle } from 'lucide-react';
import clsx from 'clsx';

export default function BottomNav() {
  const tabs = [
    { name: 'Hoy', path: '/', icon: Home },
    { name: 'Hist.', path: '/history', icon: ClipboardList },
    { name: 'Gráficos', path: '/charts', icon: LineChart },
    { name: 'Perf.', path: '/profiles', icon: UserCircle },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/50 rounded-3xl z-50 px-2 py-2">
      <div className="flex justify-between items-center h-14">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center justify-center flex-1 h-full rounded-2xl transition-all duration-300 relative overflow-hidden group",
                isActive ? "text-blue-700 bg-blue-50 focus:scale-95" : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/50"
              )
            }
          >
            {({ isActive }) => (
              <div className={clsx(
                "flex flex-col items-center justify-center transition-transform duration-300",
                isActive && "-translate-y-0.5"
              )}>
                <tab.icon 
                  size={isActive ? 24 : 22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={clsx("transition-all duration-300", isActive && "drop-shadow-sm")} 
                />
                <span className={clsx(
                  "text-[10px] sm:text-xs font-semibold mt-0.5 transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-0 h-0 w-0 overflow-hidden"
                )}>
                  {tab.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
