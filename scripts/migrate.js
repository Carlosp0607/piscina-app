
#!/usr/bin/env node
/**
 * Migración idempotente del esquema.
 *
 * Se ejecuta en cada despliegue (Build Command de Render):
 *     npm install && npm run db:migrate
 *
 * Comportamiento:
 *   - Si las tablas ya existen  -> no hace nada y termina con éxito.
 *   - Si la base está vacía     -> crea tablas, vistas, procedimiento y datos base.
 *   - Si no puede conectarse    -> termina con error visible en el log del build.
 *
 * No requiere el cliente 'mysql' instalado ni consolas SQL web: interpreta el
 * bloque DELIMITER // del procedimiento almacenado, que es justo lo que rompe
 * a la mayoría de consolas en navegador.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const ARCHIVO_SQL = path.join(__dirname, '..', 'schema-cloud.sql');
const TABLA_TESTIGO = 'empresas';

/** Separa el script SQL en sentencias, respetando los bloques DELIMITER. */
function separarSentencias(sql) {
    const sentencias = [];
    let delimitador = ';';
    let buffer = '';

    for (const linea of sql.split(/\r?\n/)) {
        const limpia = linea.trim();
        if (limpia.startsWith('--') || limpia === '') continue;

        const cambio = limpia.match(/^DELIMITER\s+(\S+)$/i);
        if (cambio) {
            if (buffer.trim()) { sentencias.push(buffer.trim()); buffer = ''; }
            delimitador = cambio[1];
            continue;
        }

        buffer += linea + '\n';

        if (limpia.endsWith(delimitador)) {
            const s = buffer.trim();
            sentencias.push(s.slice(0, s.length - delimitador.length).trim());
            buffer = '';
        }
    }
    if (buffer.trim()) sentencias.push(buffer.trim());
    return sentencias.filter(s => s.length > 0);
}

function construirConfig() {
    const cfg = {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME,
        multipleStatements: false,
        connectTimeout: 20000
    };
    if (String(process.env.DB_SSL).toLowerCase() === 'true') {
        cfg.ssl = { rejectUnauthorized: String(process.env.DB_SSL_REJECT_UNAUTHORIZED).toLowerCase() !== 'false' };
    }
    return cfg;
}

(async () => {
    const faltantes = ['DB_HOST', 'DB_USER', 'DB_NAME'].filter(v => !process.env[v]);
    if (faltantes.length > 0) {
        console.error(`[migrate] Faltan variables de entorno: ${faltantes.join(', ')}`);
        process.exit(1);
    }

    const cfg = construirConfig();
    console.log(`[migrate] Destino: ${cfg.host}:${cfg.port}/${cfg.database} (TLS: ${cfg.ssl ? 'sí' : 'no'})`);

    let conn;
    try {
        conn = await mysql.createConnection(cfg);
    } catch (err) {
        console.error(`[migrate] No se pudo conectar: ${err.code} — ${err.message}`);
        if (err.code === 'ETIMEDOUT') {
            console.error('[migrate] ETIMEDOUT suele significar que el servicio está APAGADO');
            console.error('[migrate] o que el puerto no es el correcto. Si usa Aiven, verifique');
            console.error('[migrate] que el servicio esté en estado RUNNING y no "Powered off".');
        }
        process.exit(1);
    }

    try {
        // ¿Ya está migrada la base?
        const [existentes] = await conn.query(
            `SELECT TABLE_NAME FROM information_schema.TABLES
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
            [TABLA_TESTIGO]
        );

        if (existentes.length > 0) {
            const [[e]] = await conn.query('SELECT COUNT(*) AS n FROM empresas');
            const [[u]] = await conn.query('SELECT COUNT(*) AS n FROM usuarios');
            console.log(`[migrate] El esquema ya existe. Nada que hacer. (empresas: ${e.n}, usuarios: ${u.n})`);
            await conn.end();
            process.exit(0);
        }

        console.log('[migrate] Base vacía. Aplicando esquema...');
        const sentencias = separarSentencias(fs.readFileSync(ARCHIVO_SQL, 'utf8'));
        console.log(`[migrate] Sentencias a ejecutar: ${sentencias.length}`);

        for (const [i, sentencia] of sentencias.entries()) {
            const etiqueta = sentencia.split(/\s+/).slice(0, 3).join(' ');
            try {
                await conn.query(sentencia);
                console.log(`[migrate]   ${i + 1}/${sentencias.length} ${etiqueta} OK`);
            } catch (err) {
                console.error(`[migrate]   ${i + 1}/${sentencias.length} ${etiqueta} FALLÓ: ${err.code} ${err.sqlMessage || err.message}`);
                await conn.end();
                process.exit(1);
            }
        }

        const [[e]] = await conn.query('SELECT COUNT(*) AS n FROM empresas');
        const [[u]] = await conn.query('SELECT COUNT(*) AS n FROM usuarios');
        console.log(`[migrate] Esquema aplicado. Empresas: ${e.n}, Usuarios: ${u.n}`);
        console.log('[migrate] Acceso inicial -> NIT 900123456-7 / admin / admin123');

        await conn.end();
        process.exit(0);
    } catch (err) {
        console.error(`[migrate] Error inesperado: ${err.message}`);
        try { await conn.end(); } catch (_) {}
        process.exit(1);
    }
})();
