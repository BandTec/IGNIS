create database envsafe;
use envsafe;

create table Cliente (
	idCliente int primary key auto_increment,
	nomeCliente varchar(100),
    cnpjCliente varchar(14),
    logradouroCliente varchar(100),
    numeroCliente int,
    complementoCliente varchar(30),
    bairroCliente varchar(45),
	cidadeCliente varchar(45),
    ufCliente char(2),
    cepCliente char(9),
    statusCliente int
);

create table Usuario (
	fkCliente int,
    foreign key (fkCliente) references Cliente(idCliente),
    idUsuario int,
    primary key (fkCliente, idUsuario),
    emailUsuario varchar(100),
    senhaUsuario varchar(16),
    nomeUsuario varchar(100),
    cpfUsuario varchar(11),
    cargoUsuario varchar(45),
    nivelPermissao int,
    check (nivelPermissao = 1 or nivelPermissao = 0)
);

create table Telefone (
	 idTelefone int primary key auto_increment,
	 numeroTelefone VARCHAR(25),
	 tipoTelefone VARCHAR(20),
	 fkCliente int,
	 foreign key (fkCliente) references Cliente(idCliente)
 );

create table Terreno (
	fkCliente int,
    foreign key (fkCliente) references Cliente(idCliente),
    idTerreno int,
    primary key (idTerreno, fkCliente),
    nomeTerreno varchar(45),
    tamanhoTerreno int,
    logradouroTerreno varchar(100),
    numeroTerreno int,
    complementoTerreno varchar(30),
    bairroTerreno varchar(45),
	cidadeTerreno varchar(45),
    ufTerreno char(2),
    cepTerreno char(9)
);

create table Sensor (
	idSensor int primary key auto_increment,
	modeloSensor varchar(45),
	areaSensor varchar (45),
	statusSensor varchar(10),
	fkTerreno int,
	foreign key(fkTerreno) references Terreno(idTerreno)
);

create table dadoSensor (
	fkSensor int,
    foreign key (fkSensor) references Sensor(idSensor),
    idDadoSensor int,
    primary key (idDadoSensor, fkSensor),
    temperaturaSensor float,
    umidadeSensor float,
    momento datetime
);