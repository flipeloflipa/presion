/**
 * Utilidad básica para manejar recordatorios locales usando la API de Notificaciones del navegador.
 * En una PWA real de producción sin backend, se usaría la API de notificaciones locales o Push API.
 * Aquí implementamos una verificación periódica simple.
 */

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("Este navegador no soporta notificaciones de escritorio.");
    return false;
  }
  
  if (Notification.permission === "granted") {
    return true;
  }
  
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  
  return false;
};

export const scheduleReminders = () => {
  // Verificamos cada minuto si es hora de la alarma (8 AM o 8 PM por defecto)
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Notificación a las 08:00 y a las 20:00
    if ((hours === 8 || hours === 20) && minutes === 0) {
      if (Notification.permission === "granted") {
        new Notification("Control de Presión Arterial", {
          body: "¡Es hora de tomar y registrar tu presión arterial!",
          icon: "/pwa-192x192.png"
        });
      }
    }
  }, 60000); // Check every minute
};
