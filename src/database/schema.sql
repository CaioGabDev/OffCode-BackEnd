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
    foto_capa VARCHAR(255),
    descricao TEXT,
    especializacoes TEXT
);

INSERT INTO usuarios (nome, username, email, senha, tipo_conta, foto_perfil, foto_capa, descricao, especializacoes) VALUES 
('Ana Carolina', 'ana_carol', 'ana.carol@gmail.com', 'anacarol123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos', 'Front-end'),
('Ana Julia', 'ana_julia', 'ana.julia@gmail.com', 'anajulia123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos', 'Front-end'),
('Beatriz', 'bea_triz', 'bea.triz@gmail.com', 'beatriz123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos', 'Banco de dados'),
('Bernardo', 'bern_ardo', 'bern.cardo@gmail.com', 'bernardo123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos', 'Back-end'),
('Caio', 'ca_io', 'ca.io@gmail.com', 'caio123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos', 'Back-end'),
('Luana', 'lu_ana', 'lu.ana@gmail.com', 'luana123', 'Pessoal', 'https://avatars.githubusercontent.com', 'https://avatars.githubusercontent.com', 'Dev & Estudante no SESI e SENAI Valinhos', 'Banco de dados');

CREATE TABLE posts (
    id_post SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, 
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

CREATE TABLE comentarios (
    id_comentario SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, --FK
    id_post INT NOT NULL, --FK
    conteudo_comentario TEXT NOT NULL,
    anexo VARCHAR(255), 
    data_publicacao DATE,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_post FOREIGN KEY (id_post) REFERENCES posts(id_post) 
);

INSERT INTO comentarios (id_usuario, id_post, conteudo_comentario, anexo, data_publicacao) VALUES
(1, 2, 'amei seu post. ajudou muito', NULL, '2025-07-23'),
(2, 1, 'amei seu post. ajudou muito', NULL, '2025-07-23'),
(3, 4, 'amei seu post. ajudou muito', NULL, '2025-07-23'),
(4, 3, 'amei seu post. ajudou muito', NULL, '2025-07-23'),
(5, 6, 'amei seu post. ajudou muito', NULL, '2025-07-23'),
(6, 5, 'amei seu post. ajudou muito', NULL, '2025-07-23');

CREATE TABLE curtidas (
    id_curtida SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, --FK
    id_post INT, --FK
    id_comentario INT, --FK
    quantidade_curtidas INT NOT NULL,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_post FOREIGN KEY (id_post) REFERENCES posts(id_post),
    CONSTRAINT fk_comentarios FOREIGN KEY (id_comentario) REFERENCES comentarios(id_comentario)
);

INSERT INTO curtidas (id_usuario, id_post, id_comentario, quantidade_curtidas) VALUES 
(1, 4, 2, 3),
(2, NULL, 3, 1),
(3, 5, 2, 1),
(4, NULL, 1, 1),
(5, 6, 2, 1),
(6, NULL, 3, 5);