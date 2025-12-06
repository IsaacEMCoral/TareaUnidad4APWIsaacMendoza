# MercApp

## Resumen de la aplicación
MercApp es un sistema de gestión de productos con arquitectura **frontend + backend**:
- **Frontend**: Vue 3 + Vite, desplegado en **Netlify**.
- **Backend**: Node.js + Express + MongoDB Atlas, desplegado en **Railway**.

Netlify usa el API  en Railway.

Railway conecta con MongoDB Atlas para persistencia.

## Guía de ejecución local
1. Clonar el repositorio:
   ```bash
   (https://github.com/IsaacEMCoral/TareaUnidad4APWIsaacMendoza)
2. Instalar dependencias en la carpeta frontend:
   ```bash
    npm install 
    npm run dev 
3. Instalar dependencias en carpeta backend:
   ```bash
   npm install 
   npm run dev
4. Configurar variables de entorno:
   
   VITE_API_URL=http://localhost:3000
   
   MONGO_URI=<cadena de conexión Atlas>
   
Enlaces usados en el programa:

Frontend (Netlify): https://mercappiemc.netlify.app/

Backend API (Railway): https://tareaunidad4apwisaacmendoza-production.up.railway.app

