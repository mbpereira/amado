--
-- PostgreSQL database dump
--

-- Dumped from database version 10.9 (Ubuntu 10.9-1.pgdg18.10+1)
-- Dumped by pg_dump version 11.4 (Ubuntu 11.4-1.pgdg18.10+1)

-- Started on 2019-10-08 22:59:47 -04

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

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 16566)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(255),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    thumbnail character varying(255)
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16564)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 3031 (class 0 OID 0)
-- Dependencies: 196
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 201 (class 1259 OID 16589)
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    id integer NOT NULL,
    id_product integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    name character varying(50) NOT NULL,
    hex character varying(20)
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16638)
-- Name: customer_addrs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer_addrs (
    id integer NOT NULL,
    id_customer integer NOT NULL,
    street character varying(150) NOT NULL,
    number integer,
    block character varying(150),
    zip character varying(8),
    complement character varying(100),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);


ALTER TABLE public.customer_addrs OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16636)
-- Name: customeraddresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customeraddresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customeraddresses_id_seq OWNER TO postgres;

--
-- TOC entry 3032 (class 0 OID 0)
-- Dependencies: 206
-- Name: customeraddresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customeraddresses_id_seq OWNED BY public.customer_addrs.id;


--
-- TOC entry 205 (class 1259 OID 16625)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    cpf character varying(14) NOT NULL,
    email character varying(100) NOT NULL,
    pass character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    phone character varying(20),
    birthday date,
    status integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16623)
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO postgres;

--
-- TOC entry 3033 (class 0 OID 0)
-- Dependencies: 204
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- TOC entry 211 (class 1259 OID 16671)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    id_order integer NOT NULL,
    id_stock integer NOT NULL,
    id_product integer NOT NULL,
    quantity integer NOT NULL,
    discount real,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16669)
-- Name: orderitems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orderitems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orderitems_id_seq OWNER TO postgres;

--
-- TOC entry 3034 (class 0 OID 0)
-- Dependencies: 210
-- Name: orderitems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orderitems_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 209 (class 1259 OID 16652)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    id_customer integer NOT NULL,
    delivery_addr integer NOT NULL,
    status integer NOT NULL,
    required_at timestamp without time zone,
    shipped_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16650)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 3035 (class 0 OID 0)
-- Dependencies: 208
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 203 (class 1259 OID 16603)
-- Name: product_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_images (
    id integer NOT NULL,
    id_color integer,
    src character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    link character varying(255),
    id_product integer NOT NULL
);


ALTER TABLE public.product_images OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16575)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    code character varying(20),
    id_category integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    name character varying(100) NOT NULL,
    "priceBase" double precision
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16573)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 3036 (class 0 OID 0)
-- Dependencies: 198
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 200 (class 1259 OID 16587)
-- Name: sku_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sku_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sku_id_seq OWNER TO postgres;

--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 200
-- Name: sku_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sku_id_seq OWNED BY public.colors.id;


--
-- TOC entry 202 (class 1259 OID 16601)
-- Name: skuimages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skuimages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.skuimages_id_seq OWNER TO postgres;

--
-- TOC entry 3038 (class 0 OID 0)
-- Dependencies: 202
-- Name: skuimages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skuimages_id_seq OWNED BY public.product_images.id;


--
-- TOC entry 213 (class 1259 OID 16695)
-- Name: stocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stocks (
    id integer NOT NULL,
    id_color integer NOT NULL,
    cost numeric NOT NULL,
    price numeric NOT NULL,
    on_stock numeric NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    id_product integer,
    option character varying(10) NOT NULL
);


ALTER TABLE public.stocks OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16693)
-- Name: skustock_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skustock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.skustock_id_seq OWNER TO postgres;

--
-- TOC entry 3039 (class 0 OID 0)
-- Dependencies: 212
-- Name: skustock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skustock_id_seq OWNED BY public.stocks.id;


--
-- TOC entry 215 (class 1259 OID 16712)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(100),
    pass character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    name character varying(100) NOT NULL,
    phone character varying(11) NOT NULL,
    username character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16710)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3040 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2845 (class 2604 OID 16569)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 2849 (class 2604 OID 16592)
-- Name: colors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors ALTER COLUMN id SET DEFAULT nextval('public.sku_id_seq'::regclass);


--
-- TOC entry 2855 (class 2604 OID 16641)
-- Name: customer_addrs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_addrs ALTER COLUMN id SET DEFAULT nextval('public.customeraddresses_id_seq'::regclass);


--
-- TOC entry 2853 (class 2604 OID 16628)
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- TOC entry 2859 (class 2604 OID 16674)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.orderitems_id_seq'::regclass);


--
-- TOC entry 2857 (class 2604 OID 16655)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 2851 (class 2604 OID 16606)
-- Name: product_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images ALTER COLUMN id SET DEFAULT nextval('public.skuimages_id_seq'::regclass);


--
-- TOC entry 2847 (class 2604 OID 16578)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 2861 (class 2604 OID 16698)
-- Name: stocks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stocks ALTER COLUMN id SET DEFAULT nextval('public.skustock_id_seq'::regclass);


--
-- TOC entry 2863 (class 2604 OID 16715)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2866 (class 2606 OID 16572)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2870 (class 2606 OID 16595)
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);


--
-- TOC entry 2880 (class 2606 OID 16644)
-- Name: customer_addrs customer_addrs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_addrs
    ADD CONSTRAINT customer_addrs_pkey PRIMARY KEY (id);


--
-- TOC entry 2874 (class 2606 OID 16633)
-- Name: customers customers_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_cpf_key UNIQUE (cpf);


--
-- TOC entry 2876 (class 2606 OID 16635)
-- Name: customers customers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- TOC entry 2878 (class 2606 OID 16631)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 2884 (class 2606 OID 16677)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 2882 (class 2606 OID 16658)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 2872 (class 2606 OID 16612)
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);


--
-- TOC entry 2868 (class 2606 OID 16581)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 2886 (class 2606 OID 16704)
-- Name: stocks stock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stocks
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);


--
-- TOC entry 2888 (class 2606 OID 16722)
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 2890 (class 2606 OID 16718)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2892 (class 2606 OID 16720)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 2894 (class 2606 OID 16596)
-- Name: colors colors_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.products(id);


--
-- TOC entry 2897 (class 2606 OID 16645)
-- Name: customer_addrs customer_addrs_id_customer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_addrs
    ADD CONSTRAINT customer_addrs_id_customer_fkey FOREIGN KEY (id_customer) REFERENCES public.customers(id);


--
-- TOC entry 2900 (class 2606 OID 16678)
-- Name: order_items order_items_id_order_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_id_order_fkey FOREIGN KEY (id_order) REFERENCES public.orders(id);


--
-- TOC entry 2901 (class 2606 OID 16688)
-- Name: order_items order_items_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.products(id);


--
-- TOC entry 2902 (class 2606 OID 16683)
-- Name: order_items order_items_id_stock_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_id_stock_fkey FOREIGN KEY (id_stock) REFERENCES public.colors(id);


--
-- TOC entry 2898 (class 2606 OID 16664)
-- Name: orders orders_delivery_addr_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_delivery_addr_fkey FOREIGN KEY (delivery_addr) REFERENCES public.customer_addrs(id);


--
-- TOC entry 2899 (class 2606 OID 16659)
-- Name: orders orders_id_customer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_id_customer_fkey FOREIGN KEY (id_customer) REFERENCES public.customers(id);


--
-- TOC entry 2896 (class 2606 OID 16613)
-- Name: product_images product_images_id_color_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_id_color_fkey FOREIGN KEY (id_color) REFERENCES public.colors(id);


--
-- TOC entry 2895 (class 2606 OID 25095)
-- Name: product_images product_images_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.products(id);


--
-- TOC entry 2893 (class 2606 OID 16582)
-- Name: products products_id_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_id_category_fkey FOREIGN KEY (id_category) REFERENCES public.categories(id);


--
-- TOC entry 2903 (class 2606 OID 16705)
-- Name: stocks stock_id_color_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stocks
    ADD CONSTRAINT stock_id_color_fkey FOREIGN KEY (id_color) REFERENCES public.colors(id);


--
-- TOC entry 2904 (class 2606 OID 25100)
-- Name: stocks stock_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stocks
    ADD CONSTRAINT stock_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.products(id);


-- Completed on 2019-10-08 22:59:47 -04

--
-- PostgreSQL database dump complete
--

