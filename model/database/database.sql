#Criando e acessando o DataBase
create database db_filmes_20261_b;
use db_filmes_20261_b;

#Criando a tabela de status
create table tbl_status_filme (
	id int not null primary key auto_increment,
    status varchar(20)
);

#Criando a tabela de classificação
create table tbl_classificacao (
	id int not null primary key auto_increment,
    classificacao int not null,
    informacao_classificacao text not null
);

#Fazendo o create da nova tabela de filmes
create table tbl_filmes (
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    sinopse text not null,
    data_lancamento date not null,
    duracao time not null,
    bilheteria decimal(10,2) not null,
    valor decimal(5,2) not null,
    avaliacao_critica decimal(4,2),
    avaliacao decimal(4,2),
    id_status_filme int not null,
    id_classificacao int not null,
    
    constraint fk_filme_statusfilme
    foreign key (id_status_filme)
    references tbl_status_filme (id),
    
    constraint fk_filme_classificacao
    foreign key (id_classificacao)
    references tbl_classificacao (id)
);

#Criando a tabela de tipo da imagem
create table tbl_tipo_imagem (
	id int not null primary key auto_increment,
    tipo varchar(30) not null
);

#Criando a tabela de imagens
create table tbl_imagens (
	id int not null primary key auto_increment,
    id_tipo_imagem int not null,
    id_filme int not null,
    
    constraint fk_imagem_tipoimagem
    foreign key (id_tipo_imagem)
    references tbl_tipo_imagem (id),
    
    constraint fk_imagem_filme
    foreign key (id_filme)
    references tbl_filmes (id)
);

#Criando a tabela de trailers
create table tbl_trailers (
	id int not null auto_increment primary key,
    trailers varchar(256) not null,
    id_filme int not null,
    
    constraint fk_trailer_filme
    foreign key (id_filme)
    references tbl_filmes (id)
);

#Criando a tabela de genero
create table tbl_genero (
	id int not null auto_increment primary key,
    genero varchar(30) not null
);

#Criando a tabela intermediaria de filme e genero
create table tbl_filme_genero (
	id int not null auto_increment primary key,
    id_genero int not null,
    id_filme int not null,
    
    constraint fk_filmegenero_genero
    foreign key (id_genero)
    references tbl_genero (id),
    
    constraint fk_filmegenero_filme
    foreign key (id_filme)
    references tbl_filmes (id)
);

#Criando a tabela de produtora
create table tbl_produtora (
	id int not null primary key auto_increment,
    nome varchar(150)
);

#Criando a tabela intermediaria ded filme e produtora
create table tbl_filme_produtora (
	id int not null auto_increment primary key,
    id_produtora int not null,
    id_filme int not null,
    
    constraint fk_filmeprodutora_produtora
    foreign key (id_produtora)
    references tbl_produtora (id),
    
    constraint fk_filmeprodutora_filme
    foreign key (id_filme)
    references tbl_filmes (id)
);

#Criando a tabela de paises
create table tbl_pais (
	id int not null auto_increment primary key,
    pais varchar(50) not null
);

#Criando a tabela intermediaria de filme e pais
create table tbl_filme_pais (
	id int not null auto_increment primary key,
    id_pais int not null,
    id_filme int not null,
    
    constraint fk_filmepais_pais
    foreign key (id_pais)
    references tbl_pais (id),
    
    constraint fk_filmepais_filme
    foreign key (id_filme)
    references tbl_filmes (id)
);

#Criando a tabela de premio
create table tbl_premio (
	id int not null primary key auto_increment,
    nome varchar(30) not null,
    data_ganho date not null,
    descricao text not null,
    curiosidades text
);

#Criando a tabela de curiosidades
create table tbl_curiosidades (
	id int not null primary key auto_increment,
    curiosidade text
);

#Criando a tabela intermediaria de filme e premio
create table tbl_filme_premio (
	id int not null primary key auto_increment,
    id_premio int not null,
    id_filme int not null,
    
    constraint fk_filmepremio_premio
    foreign key (id_premio)
    references tbl_premio (id),
    
    constraint fk_filmepremio_filme
    foreign key (id_filme)
    references tbl_filmes (id)
);

#Criando a tabela de idiomas
create table tbl_idiomas (
	id int not null auto_increment primary key,
    idioma varchar(25) not null,
    sigla varchar(5) not null
);

#Criando a tabela intermediaria de filme e idiomas
create table tbl_filme_idiomas (
	id int not null auto_increment primary key,
    original tinyint not null,
    id_idiomas int not null,
    id_filme int not null,
    
    constraint fk_filmeidiomas_idiomas
    foreign key (id_idiomas)
    references tbl_idiomas (id),
    
    constraint fk_filmeidiomas_filme
    foreign key (id_filme)
    references tbl_filmes (id)
);

#####TABELAS COM COISAS RELACIONADAS A PESSOAS#####

#Criando a tabela de sexo
create table tbl_sexo (
	id int not null auto_increment primary key,
    sexo varchar(15) not null,
    sigla varchar(5)
);

#Criando a tabela de pessoa
create table tbl_pessoa (
	id int not null auto_increment primary key,
    nome_nascimento varchar(256) not null,
    data_nascimento date not null,
    data_falecimento date,
    ano_inicio_carreira date not null,
    ano_fim_carreira date,
    biografia text,
    altura decimal(3,2),
    cidade_natal varchar(150),
    id_sexo int not null,
    
    constraint fk_pessoa_sexo
    foreign key (id_sexo)
    references tbl_sexo (id)
);

#Criando a tabela de fotos da pessoa
create table tbl_foto_pessoa (
	id int not null auto_increment primary key,
    foto varchar(256) not null,
    id_pessoa int not null,
    
    constraint fk_fotopessoa_pessoa
    foreign key (id_pessoa)
    references tbl_pessoa (id)
);

#Criando a tabela de nome artistico
create table tbl_nome_artistico (
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    id_pessoa int not null,
    
    constraint fk_nomeartistico_pessoa
    foreign key (id_pessoa)
    references tbl_pessoa (id)
);

#Criando a tabela intermediaria de pesso e pais
create table tbl_pessoa_pais_origem (
	id int not null auto_increment primary key,
    id_pais int not null,
    id_pessoa int not null,
    
    constraint fk_pessoapais_pessoa
    foreign key (id_pessoa)
    references tbl_pessoa (id),
    
	constraint fk_pessoapais_pais
    foreign key (id_pais)
    references tbl_pais (id)
);

#Criando a tabela intermediaria de pessoa e premio
create table tbl_pessoa_premio (
	id int not null auto_increment primary key,
    id_pessoa int not null,
    id_premio int not null,
    
	constraint fk_pessoapremio_pessoa
	foreign key (id_pessoa)
	references tbl_pessoa (id),
    
	constraint fk_pessoapremio_premio
    foreign key (id_premio)
    references tbl_premio (id)
);

#Criando a tabela intermediaria de pessoa e curiosidades
create table tbl_pessoa_curiosidades (
	id int not null auto_increment primary key,
    id_pessoa int not null,
    id_curiosidades int not null,
    
	constraint fk_pessoacuriosidades_pessoa
	foreign key (id_pessoa)
	references tbl_pessoa (id),
    
	constraint fk_pessoacuriosidades_curiosidades
    foreign key (id_curiosidades)
    references tbl_curiosidades (id)
);

#Criando a tabela de setores
create table tbl_setor (
	id int not null auto_increment primary key,
    nome_setor varchar(50) not null
);

#Criando a tabela de ocupações
create table tbl_ocupacoes (
	id int not null auto_increment primary key,
    nome varchar(150) not null,
    descricao text not null,
    id_setor int not null,
    
    constraint fk_ocupacoes_setor
    foreign key (id_setor)
    references tbl_setor (id)
);

#Criando a table a intermediaria de pessoa e ocupações
create table tbl_pessoa_ocupacao (
	id int not null auto_increment primary key,
    id_ocupacoes int not null,
    id_pessoa int not null,
    
    constraint fk_pessoaocupacao_ocupacoes
    foreign key (id_ocupacoes)
    references tbl_ocupacoes (id),
    
    constraint fk_pessoaocupacao_pessoa
    foreign key (id_pessoa)
    references tbl_pessoa (id)
);

##### TABELAS DE PARTICIPAÇÃO #####

#Criando a tabela de participação
create table tbl_participacao (
	id int not null auto_increment primary key,
    salario varchar(45) not null,
    id_pessoa int not null,
    id_filme int not null,
    
    constraint fk_participacao_pessoa
    foreign key (id_pessoa)
    references tbl_pessoa (id),
    
    constraint fk_participacao_filme
    foreign key (id_filme)
    references tbl_filmes (id)
);

#Criando a tabela intermediaria de participacao e curiosidades
create table tbl_participacao_curiosidade (
	id int not null auto_increment primary key,
    id_curiosidades int not null,
    id_participacao int not null,
    
    constraint fk_participacaocuriosidade_curiosidade
    foreign key (id_curiosidades)
    references tbl_curiosidades (id),
    
    constraint fk_participacaocuriosidade_participacao
    foreign key (id_participacao)
    references tbl_participacao (id)
);

#Criando a tabela de tipo atuação
create table tbl_tipo_atuacao (
	id int not null auto_increment primary key,
    tipo varchar(55) not null,
    descricao text not null
);

#Criando a tabela de ator
create table tbl_ator (
	id int not null auto_increment primary key,
    ordem_credito int not null,
    id_tipo_atuacao int not null,
    id_participacao int not null,
    
    constraint fk_ator_participacao
    foreign key (id_participacao)
    references tbl_participacao (id),
    
    constraint fk_ator_tipoatuacao
    foreign key (id_tipo_atuacao)
    references tbl_tipo_atuacao (id)
);

#Criando a tabela intermediaria de ator e idiomas
create table tbl_ator_idiomas (
	id int not null auto_increment primary key,
    id_idiomas int not null,
    id_ator int not null,
    
    constraint fk_atoridiomas_idiomas
    foreign key (id_idiomas)
    references tbl_idiomas (id),
    
    constraint fk_atoridiomas_ator
    foreign key (id_ator)
    references tbl_ator (id)
);

#Criando a tabela de personagem
create table tbl_personagem (
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    descricao text not null
);

#Criando a tabela de foto do personagem
create table tbl_foto_personagem (
	id int not null auto_increment primary key,
    foto varchar(256) not null,
    id_personagem int not null,
    
    constraint fk_fotopersonagem_personagem
    foreign key (id_personagem)
    references tbl_personagem (id)
);

#Criando a tabela intermediaria de ator e personagem
create table tbl_ator_personagem (
	id int not null auto_increment primary key,
    id_ator int not null,
    id_personagem int not null,
    
    constraint fk_atorpersonagem_ator
    foreign key (id_ator)
    references tbl_ator (id),
    
    constraint fk_atorpersonagem
    foreign key (id_personagem)
    references tbl_personagem (id)
);