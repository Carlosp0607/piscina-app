--
-- PostgreSQL database dump
--

\restrict Fd9CrdoP1GphYFPmdxyaxwUek0VsCelIQfNpTk2mt1164bDjJ1DTO4D8y7wHJOY

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asistencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asistencia (
    id integer NOT NULL,
    miembro_id integer,
    fecha date DEFAULT CURRENT_DATE,
    hora_entrada time without time zone DEFAULT CURRENT_TIME,
    hora_salida time without time zone,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.asistencia OWNER TO postgres;

--
-- Name: asistencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asistencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.asistencia_id_seq OWNER TO postgres;

--
-- Name: asistencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asistencia_id_seq OWNED BY public.asistencia.id;


--
-- Name: miembros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.miembros (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    documento character varying(20) NOT NULL,
    telefono character varying(20),
    email character varying(100),
    plan character varying(20),
    fecha_inicio date NOT NULL,
    fecha_vencimiento date NOT NULL,
    estado character varying(20) DEFAULT 'activo'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT miembros_estado_check CHECK (((estado)::text = ANY ((ARRAY['activo'::character varying, 'vencido'::character varying, 'suspendido'::character varying])::text[]))),
    CONSTRAINT miembros_plan_check CHECK (((plan)::text = ANY ((ARRAY['mensual'::character varying, 'trimestral'::character varying, 'familiar'::character varying])::text[])))
);


ALTER TABLE public.miembros OWNER TO postgres;

--
-- Name: miembros_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.miembros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.miembros_id_seq OWNER TO postgres;

--
-- Name: miembros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.miembros_id_seq OWNED BY public.miembros.id;


--
-- Name: pagos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagos (
    id integer NOT NULL,
    miembro_id integer,
    concepto character varying(50),
    monto numeric(10,2) NOT NULL,
    metodo_pago character varying(20),
    fecha date DEFAULT CURRENT_DATE,
    observaciones text,
    created_at timestamp without time zone DEFAULT now(),
    fecha_finalizacion date,
    CONSTRAINT pagos_concepto_check CHECK (((concepto)::text = ANY ((ARRAY['mensualidad'::character varying, 'inscripcion'::character varying, 'clase'::character varying, 'otro'::character varying])::text[]))),
    CONSTRAINT pagos_metodo_pago_check CHECK (((metodo_pago)::text = ANY ((ARRAY['efectivo'::character varying, 'transferencia'::character varying, 'tarjeta'::character varying])::text[])))
);


ALTER TABLE public.pagos OWNER TO postgres;

--
-- Name: pagos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pagos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagos_id_seq OWNER TO postgres;

--
-- Name: pagos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pagos_id_seq OWNED BY public.pagos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    usuario character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT usuarios_rol_check CHECK (((rol)::text = ANY ((ARRAY['admin'::character varying, 'portero'::character varying])::text[])))
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: asistencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asistencia ALTER COLUMN id SET DEFAULT nextval('public.asistencia_id_seq'::regclass);


--
-- Name: miembros id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.miembros ALTER COLUMN id SET DEFAULT nextval('public.miembros_id_seq'::regclass);


--
-- Name: pagos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos ALTER COLUMN id SET DEFAULT nextval('public.pagos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: asistencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asistencia (id, miembro_id, fecha, hora_entrada, hora_salida, created_at) FROM stdin;
1	1	2026-04-17	18:06:46.296669	18:06:53.567545	2026-04-17 18:06:46.296669
2	1	2026-04-17	21:48:26.409765	21:49:01.554478	2026-04-17 21:48:26.409765
3	1	2026-04-17	21:59:25.020211	22:03:02.558345	2026-04-17 21:59:25.020211
4	1	2026-04-17	22:04:20.781909	22:05:11.617805	2026-04-17 22:04:20.781909
\.


--
-- Data for Name: miembros; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.miembros (id, nombre, documento, telefono, email, plan, fecha_inicio, fecha_vencimiento, estado, created_at) FROM stdin;
1	Carlos Pérez	12345678	3001234568	carlos@email.com	mensual	2026-04-17	2026-05-17	activo	2026-04-17 17:00:05.629795
\.


--
-- Data for Name: pagos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagos (id, miembro_id, concepto, monto, metodo_pago, fecha, observaciones, created_at, fecha_finalizacion) FROM stdin;
2	1	mensualidad	50000.00	efectivo	2026-04-17		2026-04-17 18:42:15.536823	2026-05-17
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, usuario, password, rol, created_at) FROM stdin;
1	Administrador	admin	admin123	admin	2026-04-17 21:38:33.1441
2	Portero	portero	portero123	portero	2026-04-17 21:38:33.1441
\.


--
-- Name: asistencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asistencia_id_seq', 4, true);


--
-- Name: miembros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.miembros_id_seq', 2, true);


--
-- Name: pagos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagos_id_seq', 2, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);


--
-- Name: asistencia asistencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asistencia
    ADD CONSTRAINT asistencia_pkey PRIMARY KEY (id);


--
-- Name: miembros miembros_documento_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.miembros
    ADD CONSTRAINT miembros_documento_key UNIQUE (documento);


--
-- Name: miembros miembros_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.miembros
    ADD CONSTRAINT miembros_pkey PRIMARY KEY (id);


--
-- Name: pagos pagos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_usuario_key UNIQUE (usuario);


--
-- Name: asistencia asistencia_miembro_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asistencia
    ADD CONSTRAINT asistencia_miembro_id_fkey FOREIGN KEY (miembro_id) REFERENCES public.miembros(id);


--
-- Name: pagos pagos_miembro_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_miembro_id_fkey FOREIGN KEY (miembro_id) REFERENCES public.miembros(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Fd9CrdoP1GphYFPmdxyaxwUek0VsCelIQfNpTk2mt1164bDjJ1DTO4D8y7wHJOY

