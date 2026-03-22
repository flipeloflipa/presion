import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { UserPlus, Trash2, CheckCircle2 } from 'lucide-react';

export default function Profiles() {
  const profiles = useAppStore(state => state.profiles);
  const activeProfileId = useAppStore(state => state.activeProfileId);
  const addProfile = useAppStore(state => state.addProfile);
  const setActiveProfile = useAppStore(state => state.setActiveProfile);
  const deleteProfile = useAppStore(state => state.deleteProfile);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name) return;
    addProfile({ name, age, weight });
    setName(''); setAge(''); setWeight('');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30 text-white">
          <UserPlus size={24} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Perfiles</h2>
      </div>

      <div className="space-y-4">
        {profiles.map(p => (
          <div 
            key={p.id} 
            onClick={() => setActiveProfile(p.id)}
            className={`p-5 rounded-3xl border-2 flex justify-between items-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-md ${
              activeProfileId === p.id 
                ? 'bg-blue-50/80 border-blue-500 shadow-blue-500/20' 
                : 'bg-white/80 border-transparent hover:border-slate-200 shadow-slate-200/50 backdrop-blur-md'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-inner ${activeProfileId === p.id ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {p.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{p.name}</h3>
                <p className="text-slate-500 text-sm font-medium">Edad: <span className="text-slate-700">{p.age || '-'}</span> | Peso: <span className="text-slate-700">{p.weight || '-'} kg</span></p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {activeProfileId === p.id && <CheckCircle2 size={24} className="text-blue-600 drop-shadow-sm mr-2 animate-in zoom-in" />}
              <button 
                onClick={(e) => { e.stopPropagation(); if(confirm(`Eliminar perfil de ${p.name}?`)) deleteProfile(p.id); }}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-2xl transition-colors"
                title="Eliminar Perfil"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        
        {profiles.length === 0 && (
          <div className="text-center p-10 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-300 shadow-sm text-slate-500 flex flex-col items-center">
            <UserPlus size={40} className="text-slate-300 mb-3 opacity-50" />
            <p className="font-medium text-lg text-slate-400">No hay pacientes registrados</p>
            <p className="text-sm">Agrega tu primer perfil abajo</p>
          </div>
        )}
      </div>

      <form onSubmit={handleAdd} className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white flex flex-col space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-5 rounded-bl-full z-0"></div>
        <h3 className="text-xl font-extrabold text-slate-800 z-10">Nuevo Paciente</h3>
        
        <div className="flex flex-col space-y-2 z-10">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Nombre</label>
          <input 
            type="text" required
            value={name} onChange={e => setName(e.target.value)}
            className="text-lg font-semibold p-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner" 
            placeholder="Ej: María Gómez"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 z-10">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Edad</label>
            <input 
              type="number"
              value={age} onChange={e => setAge(e.target.value)}
              className="text-lg font-semibold p-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-center shadow-inner text-slate-700" 
              placeholder="70"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Peso (kg)</label>
            <input 
              type="number"
              value={weight} onChange={e => setWeight(e.target.value)}
              className="text-lg font-semibold p-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-center shadow-inner text-slate-700" 
              placeholder="65"
            />
          </div>
        </div>

        <button type="submit" className="mt-6 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-slate-900/20 transition-all duration-300 z-10">
          Guardar Paciente
        </button>
      </form>
    </div>
  );
}
