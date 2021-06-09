
create database proptech;

create table agentes (
	agenteId INT unsigned primary key auto_increment not null,
	customerName varchar(40) not null,
	nombre varchar(40),
	email varchar(40),
	contrasena TEXT,
	imagen TEXT
);

create table propiedades (
	propiedadId INT unsigned primary key auto_increment not null,
	name varchar(40) not null,
	direccion TEXT,
	agenteId INT,
	precio INT,
	descripcion TEXT,
	antiguedad INT,
	superficieCubierta INT,
	superficieDescubierta INT,
	banios INT,
	cocheras INT,
	dormitorios INT,
	ambientes INT,
	barrio varchar(40),
	destacado BOOL,
	reservado BOOL,
	precioDeReserva INT,
	image TEXT
);


create table users (
	userId INT unsigned primary key auto_increment not NULL,
	nombre varchar(40) not NULL,
	email varchar(40) not NULL,
	contrasena TEXT not NULL,
	imagen TEXT not NULL
);

create table reservas (
	reservaId INT unsigned primary key auto_increment not null,
	propiedadId INT not null,
	precioDeReserva INT,
	status varchar(40),
	userId INT not null
);