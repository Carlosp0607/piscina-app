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

**Autenticación y permisos**
Login con contraseñas cifradas con bcrypt y sesión en cookie firmada. Cada ruta de la API valida en el servidor que exista una sesión y que el rol tenga permiso para la acción; el frontend no decide nada por su cuenta.

| Rol | Puede |
|---|---|
| `admin` | Todo: miembros, asistencia y pagos |
| `portero` | Consultar miembros y registrar entradas y salidas |
| `guest` | Ver el panel de administración en modo lectura |
| `guest-portero` | Ver la portería en modo lectura |

La ruta de invitado crea una sesión de demostración sin credenciales, con permisos de solo lectura.

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
| Sesiones | cookie-session |
| Contraseñas | bcryptjs |
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
DB_HOST=localhost
DB_PORT=5432
DB_NAME=piscina
DB_USER=usuario
DB_PASSWORD=clave
SESSION_SECRET=cadena_aleatoria_larga
PORT=3000
```

Sin `SESSION_SECRET` el servidor no arranca.

Levanta el esquema y crea un administrador (la contraseña se guarda cifrada):

```bash
psql -h localhost -U usuario -d piscina -f backup.sql
```

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
INSERT INTO usuarios (nombre, usuario, password, rol)
VALUES ('Administrador', 'admin', crypt('tu_clave', gen_salt('bf', 10)), 'admin');
```

```bash
npm start
```

---

## Estructura

```
src/
  index.js          Servidor Express, sesión y montaje de rutas
  database.js       Pool de conexión a PostgreSQL
  middleware/       Validación de sesión y permisos por rol
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

Demo en vivo, desplegada en Vercel con base de datos PostgreSQL gestionada.
