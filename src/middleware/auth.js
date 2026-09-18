// Roles de sesión:
//   admin          administrador real
//   portero        portería real
//   guest          invitado que ve el panel de administración (solo lectura)
//   guest-portero  invitado que ve la portería (solo lectura)

const permitir = (...roles) => (req, res, next) => {
  const usuario = req.session && req.session.usuario;
  if (!usuario) {
    return res.status(401).json({ error: 'Debe iniciar sesión.' });
  }
  if (!roles.includes(usuario.rol)) {
    return res.status(403).json({ error: 'No tiene permisos para esta acción.' });
  }
  next();
};

module.exports = { permitir };
