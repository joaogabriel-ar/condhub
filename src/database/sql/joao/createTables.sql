-- Table: public.roles
-- DROP TABLE IF EXISTS public.roles;
CREATE TABLE IF NOT EXISTS public.roles (
        id SERIAL NOT NULL,
        role character varying(255) COLLATE pg_catalog."default",
        CONSTRAINT roles_pkey PRIMARY KEY (id)
);

-- Table: public.users
-- DROP TABLE IF EXISTS public.users;
CREATE TABLE IF NOT EXISTS public.users (
        id SERIAL NOT NULL,
        name character varying(255) COLLATE pg_catalog."default" NOT NULL,
        email character varying(255) COLLATE pg_catalog."default" NOT NULL,
        password character varying(255) COLLATE pg_catalog."default" NOT NULL,
        phone character varying(255) COLLATE pg_catalog."default" NOT NULL,
        active boolean NOT NULL,
        profile_image character varying(255) COLLATE pg_catalog."default",
        role_id integer NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (id),
        CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);

create table if not exists buildings (
        id serial primary key,
        name varchar(255) not null,
        address varchar (255) not null,
        cnpj varchar (255) not null,
        syndic_id integer not null,
        CONSTRAINT fk_syndic FOREIGN KEY (syndic_id) REFERENCES users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);

create table if not exists apartments (
        id serial primary key,
        number integer not null,
        building_id integer not null,
        user_id integer,
        CONSTRAINT fk_building FOREIGN KEY (building_id) REFERENCES buildings (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);

create table if not exists amenities (
        id serial primary key,
        building_id integer not null,
        name varchar(255) not null,
        description varchar(255),
        availability_status integer,
        CONSTRAINT fk_building FOREIGN KEY (building_id) REFERENCES buildings (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);

create table if not exists amenity_reservations (
        id serial primary key,
        amenity_id integer not null,
        user_id integer not null,
        reservation_date date not null,
        reservation_status integer not null
);

create table if not exists reservation_status (
        id serial primary key,
        status varchar(255) not null
);

create table if not exists availability_status (
        id serial primary key,
        status varchar(255) not null
);

create table if not exists reservation_status (
        id serial primary key,
        status varchar(255) not null
);

CREATE TABLE IF NOT EXISTS public.users (
        id serial primary key,
        name character varying(255) COLLATE pg_catalog."default" NOT NULL,
        email character varying(255) COLLATE pg_catalog."default" NOT NULL,
        password character varying(255) COLLATE pg_catalog."default" NOT NULL,
        phone character varying(255) COLLATE pg_catalog."default" NOT NULL,
        active boolean NOT NULL,
        profile_image character varying(255) COLLATE pg_catalog."default",
        role_id integer NOT NULL,
        building_id integer not null,
        CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
        CONSTRAINT fk_building FOREIGN KEY (building_id) REFERENCES buildings (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);