DROP DATABASE IF EXISTS cityservice;
CREATE DATABASE cityservice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cityservice;

CREATE TABLE niveis_permissao (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    descricao VARCHAR(255),
    nivel_hierarquia INT,
    CONSTRAINT pk_niveis_permissao PRIMARY KEY (id)
);

CREATE TABLE permissoes (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    descricao VARCHAR(255),
    CONSTRAINT pk_permissoes PRIMARY KEY (id)
);

CREATE TABLE niveis_permissoes (
    nivel_id INT NOT NULL,
    permissao_id INT NOT NULL,
    CONSTRAINT pk_niveis_permissoes PRIMARY KEY (nivel_id, permissao_id),
    CONSTRAINT fk_np_nivel FOREIGN KEY (nivel_id)
        REFERENCES niveis_permissao(id),
    CONSTRAINT fk_np_permissao FOREIGN KEY (permissao_id)
        REFERENCES permissoes(id)
);

CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL,
    data_nascimento DATE,
    telefone VARCHAR(20),
    nivel_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    avatar_url VARCHAR(255),
    ultimo_login DATETIME,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_usuarios PRIMARY KEY (id),
    CONSTRAINT uq_usuarios_email UNIQUE (email),
    CONSTRAINT uq_usuarios_cpf UNIQUE (cpf),
    CONSTRAINT fk_usuarios_nivel FOREIGN KEY (nivel_id)
        REFERENCES niveis_permissao(id)
);

CREATE TABLE categorias_solicitacao (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    descricao VARCHAR(255),
    icone VARCHAR(40),
    ativo TINYINT DEFAULT 1,
    CONSTRAINT pk_categorias_solicitacao PRIMARY KEY (id)
);

CREATE TABLE solicitacoes (
    id INT NOT NULL AUTO_INCREMENT,
    protocolo VARCHAR(24) NOT NULL,
    usuario_id INT NOT NULL,
    categoria_id INT NOT NULL,
    atendente_id INT,
    titulo VARCHAR(140) NOT NULL,
    descricao TEXT NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    endereco VARCHAR(255),
    status VARCHAR(30) DEFAULT 'em_analise',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_conclusao DATETIME,
    CONSTRAINT pk_solicitacoes PRIMARY KEY (id),
    CONSTRAINT uq_solicitacoes_protocolo UNIQUE (protocolo),
    CONSTRAINT fk_solicitacoes_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_solicitacoes_categoria FOREIGN KEY (categoria_id)
        REFERENCES categorias_solicitacao(id),
    CONSTRAINT fk_solicitacoes_atendente FOREIGN KEY (atendente_id)
        REFERENCES usuarios(id)
);

CREATE TABLE historico_solicitacoes (
    id INT NOT NULL AUTO_INCREMENT,
    solicitacao_id INT NOT NULL,
    usuario_id INT NOT NULL,
    status_anterior VARCHAR(30),
    status_novo VARCHAR(30),
    data_alteracao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_historico_solicitacoes PRIMARY KEY (id),
    CONSTRAINT fk_historico_solicitacao FOREIGN KEY (solicitacao_id)
        REFERENCES solicitacoes(id),
    CONSTRAINT fk_historico_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
);

CREATE TABLE anexos (
    id INT NOT NULL AUTO_INCREMENT,
    solicitacao_id INT NOT NULL,
    nome_arquivo VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    tipo_arquivo VARCHAR(80),
    tamanho_bytes INT,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_anexos PRIMARY KEY (id),
    CONSTRAINT fk_anexos_solicitacao FOREIGN KEY (solicitacao_id)
        REFERENCES solicitacoes(id)
);

CREATE TABLE categorias_noticia (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    ativo TINYINT DEFAULT 1,
    CONSTRAINT pk_categorias_noticia PRIMARY KEY (id)
);

CREATE TABLE noticias (
    id INT NOT NULL AUTO_INCREMENT,
    autor_id INT NOT NULL,
    categoria_id INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    subtitulo VARCHAR(255),
    conteudo TEXT NOT NULL,
    imagem_url VARCHAR(500),
    destaque TINYINT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'publicado',
    data_publicacao DATE,
    horario_publicacao TIME,
    visualizacoes INT DEFAULT 0,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_exclusao DATETIME,
    CONSTRAINT pk_noticias PRIMARY KEY (id),
    CONSTRAINT fk_noticias_autor FOREIGN KEY (autor_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_noticias_categoria FOREIGN KEY (categoria_id)
        REFERENCES categorias_noticia(id)
);

CREATE TABLE eventos (
    id INT NOT NULL AUTO_INCREMENT,
    autor_id INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT NOT NULL,
    imagem_url VARCHAR(500),
    local VARCHAR(255),
    data_inicio DATE NOT NULL,
    data_fim DATE,
    publico_alvo VARCHAR(120),
    status VARCHAR(20) DEFAULT 'ativo',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_eventos PRIMARY KEY (id),
    CONSTRAINT fk_eventos_autor FOREIGN KEY (autor_id)
        REFERENCES usuarios(id)
);

CREATE TABLE servicos (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(160) NOT NULL,
    categoria VARCHAR(60),
    descricao_curta VARCHAR(255),
    descricao_completa TEXT,
    icone VARCHAR(60),
    ativo TINYINT DEFAULT 1,
    CONSTRAINT pk_servicos PRIMARY KEY (id)
);

CREATE TABLE notificacoes (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tipo VARCHAR(40) NOT NULL,
    titulo VARCHAR(140) NOT NULL,
    mensagem TEXT NOT NULL,
    referencia_tipo VARCHAR(30),
    referencia_id INT,
    lida TINYINT DEFAULT 0,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_notificacoes PRIMARY KEY (id),
    CONSTRAINT fk_notificacoes_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
);

CREATE TABLE logs_acesso (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT,
    acao VARCHAR(80) NOT NULL,
    ip VARCHAR(45),
    user_agent VARCHAR(255),
    data_acesso DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_logs_acesso PRIMARY KEY (id),
    CONSTRAINT fk_logs_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
);

SHOW DATABASES;
USE cityservice;
SHOW TABLES;