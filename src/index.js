const express = require('express');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');

dotenv.config();

if (!process.env.SESSION_SECRET) {
  throw new Error('Falta la variable de entorno SESSION_SECRET');
}

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(express.json());

// Sesión guardada en una cookie firmada: funciona en Vercel, donde cada
// petición puede atenderla una instancia distinta del servidor.
app.use(cookieSession({
  name: 'piscina_sesion',
  keys: [process.env.SESSION_SECRET],
  maxAge: 8 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production'
}));

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.use(express.static('public'));

// Rutas
const miembrosRouter = require('./routes/miembros');
const asistenciaRouter = require('./routes/asistencia');
const pagosRouter = require('./routes/pagos');
const authRouter = require('./routes/auth');

app.use('/api/miembros', miembrosRouter);
app.use('/api/asistencia', asistenciaRouter);
app.use('/api/pagos', pagosRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
