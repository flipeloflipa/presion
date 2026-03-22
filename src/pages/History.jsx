import { useAppStore } from '../store/useAppStore';
import { getBPCategory, generateDoctorReport } from '../utils/bpLogic';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Share2, Trash2, CalendarHeart } from 'lucide-react';

export default function History() {
  const activeProfileId = useAppStore(state => state.activeProfileId);
  const profiles = useAppStore(state => state.profiles);
  const records = useAppStore(state => state.records);
  const deleteRecord = useAppStore(state => state.deleteRecord);

  const activeProfile = profiles.find(p => p.id === activeProfileId);
  const userRecords = records.filter(r => r.profileId === activeProfileId);

  const handleExport = async () => {
    if (!activeProfile) return;
    const report = generateDoctorReport(activeProfile, userRecords);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Reporte Presión Arterial',
          text: report,
        });
      } else {
        await navigator.clipboard.writeText(report);
        alert('Reporte copiado al portapapeles. ¡Listo para pegar en WhatsApp!');
      }
    } catch (err) {
      console.error(err);
      await navigator.clipboard.writeText(report);
      alert('Reporte copiado al portapapeles.');
    }
  };

  if (!activeProfile) return <div className="text-center p-8 bg-white/60 backdrop-blur-md rounded-3xl font-medium animate-pulse text-slate-500">Por favor, selecciona un paciente.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg shadow-emerald-500/30 text-white">
            <CalendarHeart size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-tight">Historial</h2>
            <p className="text-emerald-600 font-semibold text-sm drop-shadow-sm">{activeProfile.name}</p>
          </div>
        </div>
        <button 
          onClick={handleExport}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-95 text-white p-3 sm:px-5 rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all duration-300"
          title="Compartir con el Doctor"
        >
          <Share2 size={20} className="drop-shadow-sm" />
          <span className="font-bold hidden sm:inline drop-shadow-sm tracking-wide">Doctor</span>
        </button>
      </div>

      <div className="space-y-4">
        {userRecords.length === 0 ? (
          <div className="text-center p-12 bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-300 rounded-3xl text-slate-500 flex flex-col items-center">
             <CalendarHeart size={40} className="text-slate-300 mb-4 opacity-50" />
            <p className="font-medium text-lg text-slate-400">No hay registros aún.</p>
          </div>
        ) : (
          userRecords.map(record => {
            const category = getBPCategory(record.systolic, record.diastolic);
            return (
              <div key={record.id} className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg shadow-slate-200/40 border-2 border-transparent hover:border-slate-100 overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1 group relative">
                <div className={`absolute top-0 left-0 w-2 h-full ${category.color.split(' ')[0]}`}></div>
                
                <div className="p-5 pl-7 flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-slate-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                      {format(new Date(record.datetime), "d MMM, yyyy", { locale: es })}
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{format(new Date(record.datetime), "HH:mm")}</span>
                    </p>
                    
                    <div className="text-2xl font-black flex gap-4 text-slate-800 tracking-tight">
                      <span>{record.systolic} <span className="text-sm font-semibold opacity-50">/</span> {record.diastolic} <span className="text-xs font-bold text-slate-400 uppercase">mmHg</span></span>
                      <span>{record.pulse} <span className="text-xs font-bold text-slate-400 uppercase">ppm</span></span>
                    </div>
                    
                    <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-50 border shadow-sm ${category.text}`}>
                      {category.label}
                    </span>
                    
                    {record.notes && (
                      <p className="text-slate-600 text-sm mt-3 bg-slate-50 p-3 rounded-2xl italic border border-slate-100 inline-block w-full">
                        "{record.notes}"
                      </p>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => { if(confirm('¿Eliminar registro?')) deleteRecord(record.id); }}
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 opacity-50 group-hover:opacity-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
