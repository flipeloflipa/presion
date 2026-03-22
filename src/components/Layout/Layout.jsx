import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative pb-28 selection:bg-blue-100 selection:text-blue-900">
      <header className="bg-white/60 backdrop-blur-lg border-b border-white/50 shadow-sm shadow-slate-100/50 py-4 px-6 sticky top-0 z-40">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent text-center tracking-tight">
          PresiónApp
        </h1>
      </header>
      
      <main className="flex-1 overflow-x-hidden px-4 py-8 w-full max-w-md mx-auto">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
