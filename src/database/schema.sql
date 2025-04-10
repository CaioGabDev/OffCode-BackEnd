CREATE DATABASE offcode;

\c offcode;

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_conta VARCHAR(50) CHECK (tipo_conta IN ('Empresa', 'Pessoal')),
    foto_perfil VARCHAR(255),
    descricao TEXT,
    especializacoes TEXT
);

INSERT INTO usuarios (nome, username, email, senha, tipo_conta, foto_perfil, foto_capa, descricao, especializacoes) VALUES 
('Ana Carolina', 'ana_carol', 'ana.carol@gmail.com', 'anacarol123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos'),
('Ana Julia', 'ana_julia', 'ana.julia@gmail.com', 'anajulia123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos'),
('Beatriz', 'bea_triz', 'bea.triz@gmail.com', 'beatriz123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos'),
('Bernardo', 'bern_ardo', 'bern.cardo@gmail.com', 'bernardo123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos'),
('Caio', 'ca_io', 'ca.io@gmail.com', 'caio123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos'),
('Luana', 'lu_ana', 'lu.ana@gmail.com', 'luana123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos');

CREATE TABLE posts (
    id_post SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, --FK
    conteudo_post TEXT NOT NULL,
    anexo VARCHAR(255), 
    data_publicacao DATE,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

INSERT INTO posts (id_usuario, conteudo_post, anexo, data_publicacao) VALUES
(1, 'Lorem ipsum dolor sit amet.', 'https://avatars.githubusercontent.com', '2023-06-14'),
(2, 'Lorem ipsum dolor sit amet.', 'https://avatars.githubusercontent.com', '2024-12-30'),
(3, 'Lorem ipsum dolor sit amet.', 'https://avatars.githubusercontent.com', '2025-04-11'),
(4, 'Lorem ipsum dolor sit amet.', 'https://avatars.githubusercontent.com', '2025-07-23'),
(5, 'Lorem ipsum dolor sit amet.', 'https://avatars.githubusercontent.com', '2023-01-01'),
(6, 'Lorem ipsum dolor sit amet.', 'https://avatars.githubusercontent.com', '2023-01-01');