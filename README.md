# piscina-app

Sistema de control de acceso y pagos para clubes acuáticos. Registra la entrada de miembros, administra el padrón y lleva el recaudo diario.

**Demo:** [piscina-app.vercel.app](https://piscina-app.vercel.app)

---

## Qué resuelve

Un club con piscina tiene una persona en la puerta que necesita responder rápido una sola pregunta: esta persona puede entrar o no. Y al final del día, alguien tiene que saber cuánta gente entró y cuánto se recaudó.

La aplicación separa esas dos necesidades en dos interfaces:

- **Portería.** Pantalla simple para registrar entradas y consultar si un miembro está al día.
- **Administración.** Gestión del padrón de miembros, registro de pagos y consulta de totales por día, mes o rango de fechas.

---

## Módulos

**Miembros**
CRUD completo del padrón: alta, consulta individual, edición y baja.

**Asistencia**
Registro de entrada y consultas agregadas del día, del mes o de un rango de fechas definido por el usuario.

**Pagos**
Registro de pagos con total del día, acumulado mensual y consulta por rango. Es lo que permite cuadrar la caja al cierre.

**Autenticación**
Login con sesión de servidor mediante `express-session`. Incluye una ruta de acceso como invitado que habilita una sesión de demostración sin credenciales.

---

## Modelo de datos

PostgreSQL. Cuatro tablas.

| Tabla | Contenido |
|---|---|
| `usuarios` | Cuentas de acceso al sistema |
| `miembros` | Padrón del club |
| `asistencia` | Registro de entradas con fecha |
| `pagos` | Recaudo asociado a cada miembro |

El archivo `backup.sql` contiene el volcado de estructura, sin datos. Sirve para levantar el esquema desde cero.

---

## Stack

| Componente | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Base de datos | PostgreSQL (`pg`) |
| Sesiones | express-session |
| Configuración | dotenv |
| Despliegue | Vercel |

---

## Ejecución local

```bash
git clone https://github.com/Carlosp0607/piscina-app.git
cd piscina-app
npm install
```

Crea un archivo `.env` en la raíz:

```
DATABASE_URL=postgresql://usuario:clave@host:5432/basededatos
SESSION_SECRET=cadena_aleatoria_para_las_sesiones
PORT=3000
```

Levanta el esquema:

```bash
psql $DATABASE_URL -f backup.sql
```

```bash
npm start
```

---

## Estructura

```
src/
  index.js          Servidor Express y montaje de rutas
  database.js       Pool de conexión a PostgreSQL
  routes/           Endpoints de miembros, asistencia, pagos y auth
  controllers/      Lógica de cada módulo
  models/           Consultas SQL
public/
  index.html        Panel de administración
  login.html        Acceso
  portero.html      Pantalla de portería
backup.sql          Volcado de estructura
```

---

## Estado

En funcionamiento, desplegado en Vercel con base de datos PostgreSQL gestionada.
