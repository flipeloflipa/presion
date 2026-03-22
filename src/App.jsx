import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Charts from './pages/Charts';
import Profiles from './pages/Profiles';
import { useAppStore } from './store/useAppStore';
import { useEffect } from 'react';
import { requestNotificationPermission, scheduleReminders } from './utils/reminders';

function App() {
  const activeProfileId = useAppStore((state) => state.activeProfileId);

  useEffect(() => {
    requestNotificationPermission().then(granted => {
      if(granted) scheduleReminders();
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Si no hay perfil activo, forzamos la vista de perfiles */}
          <Route 
            index 
            element={activeProfileId ? <Dashboard /> : <Navigate to="/profiles" replace />} 
          />
          <Route path="history" element={<History />} />
          <Route path="charts" element={<Charts />} />
          <Route path="profiles" element={<Profiles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
