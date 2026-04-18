const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.redirect('/login.html');
});
app.use(session({
  secret: 'piscina_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 }
}));

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