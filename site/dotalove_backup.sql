--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

--
-- Name: insert_order_history_trigger(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_order_history_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO order_history (user_id, order_id, order_date)
    VALUES (NEW.user_id, NEW.order_id, CURRENT_TIMESTAMP); -- Замените NEW.order_id на имя вашего первичного ключа
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.insert_order_history_trigger() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: coach; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coach (
    id integer NOT NULL,
    title character varying(255),
    description text,
    price numeric(10,2),
    price_per_month numeric(10,2),
    image character varying(255)
);


ALTER TABLE public.coach OWNER TO postgres;

--
-- Name: coach_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coach_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coach_id_seq OWNER TO postgres;

--
-- Name: coach_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coach_id_seq OWNED BY public.coach.id;


--
-- Name: order_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_history (
    id integer NOT NULL,
    user_id integer,
    order_id integer,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.order_history OWNER TO postgres;

--
-- Name: order_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_history_id_seq OWNER TO postgres;

--
-- Name: order_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_history_id_seq OWNED BY public.order_history.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id integer NOT NULL,
    coach_id integer NOT NULL,
    customer_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(20) NOT NULL,
    delivery_address text NOT NULL,
    payment_method character varying(50) NOT NULL,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: coach id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach ALTER COLUMN id SET DEFAULT nextval('public.coach_id_seq'::regclass);


--
-- Name: order_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_history ALTER COLUMN id SET DEFAULT nextval('public.order_history_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: coach; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coach (id, title, description, price, price_per_month, image) FROM stdin;
33	выф	выф	пва	12.00	12.00	\N
34	мси	исм	исм	12.00	12.00	\N
36	бюоб	иоь	ит	454.00	54.00	\N
37	нкеншг	иоь	ит	756.00	54.00	\N
38	рапр	рапр	апр	54.00	576.00	\N
39	рпа	рапр		12.00	12.00	\N
42	авпмвап	вап		121.00	12.00	{}
43	dfgdf	gdf	dfg	12.00	12.00	\N
\.


--
-- Data for Name: order_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_history (id, user_id, order_id, order_date) FROM stdin;
1	43	36	2023-12-13 20:51:27.005013
2	44	37	2023-12-13 20:52:07.411738
3	44	38	2023-12-13 21:10:14.285735
4	44	39	2023-12-13 21:16:48.377971
5	48	40	2023-12-14 09:07:33.369107
6	49	41	2023-12-14 09:07:58.260543
7	46	42	2023-12-14 11:16:24.849
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, user_id, coach_id, customer_name, email, phone_number, delivery_address, payment_method, order_date) FROM stdin;
36	43	36	hfgh	hfgh	fgh	hfgh	По счету (для физлица)	2023-12-13 20:51:27.005013
37	44	33	hfgzb	ghfagb	hfgjjmv	hfg	По счету (для физлица)	2023-12-13 20:52:07.411738
38	44	34	hfgh	fhg	hfg	hfg	По счету (для физлица)	2023-12-13 21:10:14.285735
39	44	37	пар	апр	рап	рапр	Банковская карта	2023-12-13 21:16:48.377971
40	48	38	риапри	авпп	пва	пва	По счету (для физлица)	2023-12-14 09:07:33.369107
41	49	36	вап	ваппва	пва	пва	По счету (для физлица)	2023-12-14 09:07:58.260543
42	46	38	bvbv	bcvb	bcv	bcv	По счету (для физлица)	2023-12-14 11:16:24.849
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password) FROM stdin;
43	admin	admin@gmail.com	admin
44	123	dfgdf	123
45	444	444@gmail.com	$2b$10$MHVmHI1pbXKBhMqnTWSMteO9omReEftlqFLp.hSo3emfAGnCD/UCa
46	111	111	$2b$10$ZwdrslZ3a4v41Ds8mBrbOuAYLTzFGeRG1PzcGrRyTSo3CNcLx3LM.
47	122	122	122
48	ппп	ппп	$2b$10$KODge2ZS/Im0H6/RgET7Be8dMagNMA0wjHK5Jhv3LlrMkdBnHLOPm
49	ооо	ооо	$2b$10$tlgz/FNWKn8G4X4ZJWSZ0OdFwbPuIZBe11SEUWE.IN/XqeQlb8BT6
\.


--
-- Name: coach_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coach_id_seq', 43, true);


--
-- Name: order_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_history_id_seq', 7, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 42, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 49, true);


--
-- Name: coach coach_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach
    ADD CONSTRAINT coach_pkey PRIMARY KEY (id);


--
-- Name: order_history order_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_history
    ADD CONSTRAINT order_history_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: orders orders_insert_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER orders_insert_trigger AFTER INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.insert_order_history_trigger();


--
-- Name: orders orders_coach_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_coach_id_fkey FOREIGN KEY (coach_id) REFERENCES public.coach(id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

