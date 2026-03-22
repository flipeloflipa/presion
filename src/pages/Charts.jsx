import { useAppStore } from '../store/useAppStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { LineChart as ChartIcon, HeartPulse } from 'lucide-react';

export default function Charts() {
  const activeProfileId = useAppStore(state => state.activeProfileId);
  const profiles = useAppStore(state => state.profiles);
  const records = useAppStore(state => state.records);

  const activeProfile = profiles.find(p => p.id === activeProfileId);
  
  const userRecords = records
    .filter(r => r.profileId === activeProfileId)
    .slice(0, 30)
    .reverse();

  const data = userRecords.map(r => ({
    date: format(parseISO(r.datetime), "dd/MM", { locale: es }),
    Sis: r.systolic,
    Dia: r.diastolic,
    Pulse: r.pulse
  }));

  if (!activeProfile) return <div className="text-center p-8 bg-white/60 backdrop-blur-md rounded-3xl font-medium animate-pulse text-slate-500">Por favor, selecciona un paciente.</div>;
  if (data.length === 0) return (
    <div className="text-center p-12 bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-300 rounded-3xl text-slate-500 flex flex-col items-center">
       <ChartIcon size={40} className="text-slate-300 mb-4 opacity-50" />
      <p className="font-medium text-lg text-slate-400">Datos insuficientes</p>
      <p className="text-sm">Agrega lecturas para ver tus gráficos</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 text-white">
          <ChartIcon size={24} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Tendencias</h2>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-slate-800">Presión Arterial</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1 rounded-full">{activeProfile.name}</span>
        </div>
        
        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold', padding: '12px' }}
                itemStyle={{ fontWeight: 800 }}
              />
              <Area type="monotone" dataKey="Sis" name="Sistólica" stroke="#ef4444" strokeWidth={4} fillOpacity={1} fill="url(#colorSis)" activeDot={{ r: 6, strokeWidth: 0, fill: '#ef4444' }} />
              <Area type="monotone" dataKey="Dia" name="Diastólica" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorDia)" activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
        <div className="flex items-center gap-2 mb-6">
          <HeartPulse size={20} className="text-rose-500 animate-pulse" />
          <h2 className="text-xl font-extrabold text-slate-800">Pulsaciones</h2>
        </div>
        
        <div className="h-48 w-full relative">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500 opacity-5 rounded-full blur-2xl z-0"></div>
          <ResponsiveContainer width="100%" height="100%" className="z-10 relative">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="Pulse" name="Pulso (ppm)" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#colorPulse)" activeDot={{ r: 6, strokeWidth: 0, fill: '#f43f5e' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
