# Guía de Despliegue para PWA Control de Presión Arterial

¡Tu aplicación ha sido desarrollada por completo! Dado que usa tecnologías cliente (React + LocalStorage), no requieres un servidor backend, lo que la hace perfectamente gratuita de alojar.

## Opción 1: Despliegue con Vercel (Recomendado)
Vercel es ideal para aplicaciones Vite/React.

1. **Sube tu código a GitHub:**
   Crea un repositorio en tu cuenta de GitHub y sube los archivos de esta carpeta (`e:\app presion`).
2. **Conecta con Vercel:**
   - Ve a [Vercel](https://vercel.com/) e inicia sesión con GitHub.
   - Haz clic en **"Add New..." > "Project"**.
   - Importa tu repositorio recién creado.
3. **Configuración de Vercel:**
   - El *Framework Preset* se detectará automáticamente como "Vite".
   - El *Build Command* es `npm run build`.
   - El *Output Directory* es `dist`.
   - Haz clic en **Deploy**.
   ¡Listo! Tu app PWA tendrá una URL pública segura y los usuarios podrán usar la opción "Añadir a la pantalla de inicio" en sus móviles.

## Opción 2: Despliegue con Netlify

1. Sube tu código a GitHub igualmente.
2. Ve a [Netlify](https://www.netlify.com/) y haz login.
3. Clic en **"Add new site" > "Import an existing project"**.
4. Conecta tu GitHub y elige el repositorio.
5. Configuración de Build:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Clic en **Deploy site**.

### ¡Nota sobre la PWA!
Para que la aplicación funcione como PWA offline en los celulares, requiere estar hospedada en un dominio seguro con HTTPS (tanto Vercel como Netlify lo incluyen gratuitamente). Una vez alojada, al abrirla en Chrome/Safari móvil aparecerá el botón o banner de "Instalar" (Añadir a inicio).
