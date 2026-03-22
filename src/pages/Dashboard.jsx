import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getBPCategory } from '../utils/bpLogic';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Activity, Heart, Info, Clock } from 'lucide-react';

export default function Dashboard() {
  const activeProfileId = useAppStore(state => state.activeProfileId);
  const profiles = useAppStore(state => state.profiles);
  const setActiveProfile = useAppStore(state => state.setActiveProfile);
  const addRecord = useAppStore(state => state.addRecord);
  const records = useAppStore(state => state.records);
  
  const activeProfile = profiles.find(p => p.id === activeProfileId);
  const lastRecord = records.find(r => r.profileId === activeProfileId);
  
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [notes, setNotes] = useState('');
  const [datetime, setDatetime] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!systolic || !diastolic || !pulse) return alert("Completa los datos obligatorios.");
    
    addRecord({
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      pulse: Number(pulse),
      notes,
      datetime
    });
    
    setSystolic('');
    setDiastolic('');
    setPulse('');
    setNotes('');
    setDatetime(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  };

  if (!activeProfile) return <div className="p-8 text-center text-slate-500 animate-pulse">Cargando perfil...</div>;

  return (
    <div className="space-y-6">
      {/* Selector de Perfil Premium */}
      <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-2 rounded-2xl shadow-xl shadow-slate-200/40 border border-white/80 ring-1 ring-slate-100">
        <div className="flex bg-slate-100/80 rounded-xl px-4 py-2 w-full justify-between items-center transition-all">
          <span className="text-xs text-slate-500 font-semibold tracking-wide uppercase mr-4">Paciente</span>
          <select 
            value={activeProfileId} 
            onChange={(e) => setActiveProfile(e.target.value)}
            className="text-lg font-extrabold text-slate-800 bg-transparent border-none p-0 focus:ring-0 text-right cursor-pointer"
          >
            {profiles.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {lastRecord && (
        <div className={`p-6 rounded-3xl shadow-xl text-white relative overflow-hidden transition-all duration-500 ${getBPCategory(lastRecord.systolic, lastRecord.diastolic).color}`}>
          {/* Decorative shapes inside the card for premium feel */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black opacity-10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Activity size={20} className="opacity-80"/> Último Registro
              </h3>
              <p className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {format(new Date(lastRecord.datetime), "d MMM, HH:mm", { locale: es })}
              </p>
            </div>
            
            <div className="flex justify-between items-end mt-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium opacity-80 mb-1">Presión (mmHg)</span>
                <div className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-sm">
                  {lastRecord.systolic} <span className="text-2xl opacity-70 font-semibold">/</span> {lastRecord.diastolic}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium opacity-80 mb-1 flex items-center gap-1"><Heart size={14} className="animate-pulse"/> Pulso</span>
                <div className="text-3xl font-bold tracking-tight">{lastRecord.pulse}</div>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-white/20 flex justify-between items-center">
              <p className="text-sm font-bold uppercase tracking-wider bg-white text-slate-800 px-4 py-1.5 rounded-full shadow-sm">
                {getBPCategory(lastRecord.systolic, lastRecord.diastolic).label}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Formulario Glassmorphism */}
      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white flex flex-col space-y-5">
        <h2 className="text-xl font-extrabold text-slate-800 mb-2">Nuevo Registro</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2 relative group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Sistólica</label>
            <input 
              type="number" min="0" max="300" required
              value={systolic} onChange={e => setSystolic(e.target.value)}
              className="w-full text-2xl font-bold p-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-center focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all text-slate-700 shadow-inner" 
              placeholder="120"
            />
          </div>
          <div className="flex flex-col space-y-2 relative group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Diastólica</label>
            <input 
              type="number" min="0" max="200" required
              value={diastolic} onChange={e => setDiastolic(e.target.value)}
              className="w-full text-2xl font-bold p-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-center focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all text-slate-700 shadow-inner" 
              placeholder="80"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-1"><Heart size={12}/> Pulso (ppm)</label>
          <input 
            type="number" min="0" max="250" required
            value={pulse} onChange={e => setPulse(e.target.value)}
            className="text-xl font-semibold p-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all text-slate-700 shadow-inner" 
            placeholder="70"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-1"><Clock size={12}/> Fecha y Hora</label>
          <input 
            type="datetime-local" required
            value={datetime} onChange={e => setDatetime(e.target.value)}
            className="text-base font-medium p-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-1"><Info size={12}/> Notas (Opcional)</label>
          <textarea 
            value={notes} onChange={e => setNotes(e.target.value)}
            className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner text-slate-600 resize-none" 
            rows="2" placeholder="Ej: Me sentía mareado..."
          />
        </div>

        <button type="submit" className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-blue-500/30 transition-all duration-300 flex justify-center items-center gap-2 group">
          Guardar Registro
        </button>
      </form>
    </div>
  );
}
