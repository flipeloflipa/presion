/**
 * Evalúa los niveles de presión arterial y retorna la categoría y código de color (semáforo).
 * Basado en las guías generales (AHA).
 * Normal: < 120 e < 80
 * Elevada: 120-129 e < 80
 * Alta Nivel 1: 130-139 o 80-89
 * Alta Nivel 2: >= 140 o >= 90
 * Crisis: > 180 o > 120
 */

export const getBPCategory = (sys, dia) => {
  if (sys > 180 || dia > 120) {
    return { label: 'Crisis Hipertensiva', color: 'bg-gradient-to-br from-red-500 to-rose-700 shadow-rose-500/30', text: 'text-rose-600', ring: 'ring-rose-500' };
  }
  if (sys >= 140 || dia >= 90) {
    return { label: 'Alta (Nivel 2)', color: 'bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-500/30', text: 'text-orange-600', ring: 'ring-orange-500' };
  }
  if (sys >= 130 || dia >= 80) {
    return { label: 'Alta (Nivel 1)', color: 'bg-gradient-to-br from-amber-300 to-orange-400 shadow-amber-500/30', text: 'text-amber-600', ring: 'ring-amber-500' };
  }
  if (sys >= 120 && dia < 80) {
    return { label: 'Elevada', color: 'bg-gradient-to-br from-yellow-300 to-amber-400 shadow-yellow-500/30', text: 'text-yellow-600', ring: 'ring-yellow-400' };
  }
  if (sys < 120 && dia < 80) {
    return { label: 'Normal', color: 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/30', text: 'text-emerald-500', ring: 'ring-emerald-400' };
  }
  return { label: 'Desconocido', color: 'bg-slate-400', text: 'text-slate-500', ring: 'ring-slate-300' };
};

export const generateDoctorReport = (profile, records) => {
  let report = `REPORTE DE PRESIÓN ARTERIAL\n`;
  report += `Paciente: ${profile.name} (Edad: ${profile.age}, Peso: ${profile.weight}kg)\n`;
  report += `Generado el: ${new Date().toLocaleString()}\n\n`;
  
  report += `Últimos Registros:\n`;
  report += `------------------------------------\n`;
  
  if (records.length === 0) {
    report += `No hay registros disponibles.\n`;
  } else {
    records.slice(0, 15).forEach(r => {
      const date = new Date(r.datetime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
      const status = getBPCategory(Number(r.systolic), Number(r.diastolic)).label;
      report += `- ${date} | PA: ${r.systolic}/${r.diastolic} | Pulso: ${r.pulse} | Estado: ${status}`;
      if (r.notes) report += ` | Nota: ${r.notes}`;
      report += `\n`;
    });
  }
  
  return report;
};
