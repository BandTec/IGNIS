create database envsafe;

use envsafe;

create table Endereco (
	idEndereco int primary key auto_increment,
	logradouro varchar(100),
    numero int,
    complemento varchar(30),
    bairro varchar(45),
	cidade varchar(45),
    uf char(2),
    cep char(9)
);

create table Cliente (
	idCliente int primary key auto_increment,
	nomeCliente varchar(100),
    cnpjCliente varchar(18),
    statusCliente int,
    fkEndereco int,
    foreign key (fkEndereco) references endereco(idEndereco)
);

create table Usuario (
	fkCliente int,
    foreign key (fkCliente) references Cliente(idCliente),
    idUsuario int,
    primary key (fkCliente, idUsuario),
    emailUsuario varchar(100),
    senhaUsuario varchar(16),
    nomeUsuario varchar(100),
    cpfUsuario varchar(14),
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
	idTerreno int primary key auto_increment,
    nomeTerreno varchar(45),
    tamanhoTerreno int,
    fkEndereco int,
    foreign key (fkEndereco) references endereco(idEndereco),
    fkCliente int,
    foreign key (fkCliente) references Cliente(idCliente)
);

create table Sensor (
	idSensor int primary key auto_increment,
	modeloSensor varchar(45),
	latitude varchar (20),
    longitude varchar (20),
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
    momento datetime default current_timestamp
);

insert into endereco values 
	(null, "Praça dos Três Poderes", null, null, null, "Brasília", "DF", "70150-900"),
    (null, "Rua Natingui", 1005, "Andar 5", "Vila Madalena", "São Paulo", "SP", "05443-001"),
    (null, "Rua Dezesseis", 292, null, "Altos do Coxipó", "Cuiabá", "MT", "78088-530"),
    (null, "Serra da Mantiqueira", null, null, null, "Pindamonhangaba ", "SP", "45810-000"),
    (null, "Rua do Mamoeiro", 25, null, "Taperapuã", "Porto Seguro", "BA", "45810-000"),
    (null, "Rodovia Rs 429", null, "Km 18", "Zona Rural", "Cambará do Sul", "RS", "95480-000"),
    (null, "Rodovia Emanuel Pinheiro", null, "Km 50", "Véu de Noiva", "Cuiabá", "MT", "78195-000"),
    (null, "Rodovia RS 429", null, null, "Zona Rural", "Cambará do Sul", "RS", "95480-000");
    
insert into cliente values 
	(null, "Governo Federal do Brasil", "73.733.012/0001-07",  1, 1),
    (null, "Grupo Agricultura", "34.508.295/0001-23", 1, 2),
    (null, "Grupo Três Poderes", "03.373.825/0001-40", 0, 3);
    
insert into usuario values 
	(1, 1, "admin@gmail.com", "admin123", "Abel Almeida", "13732137015", "Presidente", 1),
    (1, 2, "barbosa.daniel@outlook.com", "danielb1234", "Daniel Barbosa", "92623623074", "Gestor Rural", 0),
    (1, 3, "gilbertoamaral96@gmail.com", "gil24081973", "Gilberto Amaral", "07183263002", "Gerente Administrativo", 1),
    (2, 1, "batistaI@grupoagricultura.com.br", "iago123456", "Iago Batista", "83404739051", "CEO", 1),
    (2, 2, "user@gmail.com", "user123", "Leandro Alves", "94874700004", "Agrônomo", 0);
    
insert into telefone values 
	(null, "(65)99719-5577", "Celular", 3),
    (null, "(66)2946-9452", "Telefone", 3),
    (null, "(11)99678-6902", "Celular", 2),
    (null, "(11)2532-9783", "Telefone", 2),
    (null, "(61)2587-6007", "Telefone", 1),
    (null, "(61)99551-5205", "Celular", 1),
    (null, "(61)98943-5094", "Celular", 1);
    
insert into terreno values 
	(null, "Fazenda Mantiqueira", "153000", 4, 2 ),
    (null, "Parque Nacional e Histórico do Monte Pascoal", "22330", 5 , 1),
    (null, "Parque Nacional da Serra Geral", "17301.96", 6, 1),
    (null, "Parque Nacional da Chapada dos Guimarães", "32630", 7, 1),
    (null, "Parque Nacional de Aparados da Serra", "10250", 8, 1);

insert into sensor values
	(null, "DHT11", "-16.8963707", "-39.2503182", "Ativo", 2),
    (null, "DHT11", "-22.8506214", "-45.3674147", "Ativo", 1), 
	(null, "DHT11", "-29.1232941", "-50.0127639", "Manutenção", 3), 
    (null, "DHT11", "-15.4103805", "-55.8367835", "Ativo", 4), 
    (null, "DHT11", "-29.1819914", "-50.1035944", "Ativo", 5), 
    (null, "DHT11", "-29.1731858", "-50.1048637", "Ativo", 5);
    
insert into dadoSensor (fkSensor, idDadoSensor, temperaturaSensor, umidadeSensor) values
	(1, 1, 27.5, 56),
    (2, 1, 32, 63),
    (3, 1, 34, 31),
    (4, 1, 29, 28),
    (5, 1, 28.8, 45),
    (6, 1, 30.3, 39);

select * from endereco;
select * from cliente;
select * from usuario;
select * from telefone;
select * from terreno;
select * from sensor;
select * from dadoSensor;

select * from terreno inner join endereco
	on fkEndereco = idEndereco;
select * from cliente inner join endereco
	on fkEndereco = idEndereco;
select * from usuario inner join cliente 
	on fkCliente = idCliente;
select * from telefone inner join cliente 
	on fkCliente = idCliente;
select * from terreno inner join cliente
	on fkCliente = idCliente;
select * from sensor as s inner join terreno as t
	on s.fkCliente = t.fkCliente 
    and s.fkTerreno = t.idTerreno;
select * from dadoSensor inner join sensor 
	on fkSensor = idSensor;
    
select * from terreno inner join cliente
	on fkCliente = idCliente;
select * from terreno left join cliente 
	on fkCliente = idCliente;
select * from terreno right join cliente 
	on fkCliente = idCliente;
select * from cliente right join endereco
	on fkEndereco = idEndereco;