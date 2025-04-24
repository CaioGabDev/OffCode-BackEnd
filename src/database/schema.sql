CREATE DATABASE offcode;

\c offcode;

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(20) NOT NULL,
    tipo_conta VARCHAR(7) CHECK (tipo_conta IN ('Empresa', 'Pessoal')),
    foto_perfil TEXT,
    foto_capa TEXT,
    descricao VARCHAR(600),
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
    anexo TEXT, 
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
    anexo TEXT, 
    data_publicacao DATE,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_post FOREIGN KEY (id_post) REFERENCES posts(id_post) 
);

INSERT INTO comentarios (id_usuario, id_post, conteudo_comentario, anexo, data_publicacao) VALUES
(2, 1, 'O meu layout está em um estado tão caótico que até o código se perde no caminho. 😂', NULL, '2025-06-20'),
(3, 4, 'Escrevi DELETE sem querer e tive que devolver todos os backups... nunca mais!! 😅', NULL, '2025-05-30'),
(4, 3, 'Perdi dados em um banco uma vez, mas não foi nada comparado ao medo que senti na hora. Aquele pânico é inesquecível juro.', NULL, '2025-03-07'),
(5, 6, 'Sempre amei Python, mas o Go tem me deixado intrigado. Preciso estudar mais...', NULL, '2025-07-18'),
(6, 5, 'Eu também já perdi a API às 3h da manhã. A diferença é que, na minha versão, o servidor desceu pra dormir e não voltou.', 'api_dormindo.png', '2025-09-15'),
(2, 2, 'Tentei rodar um script em produção sem testes e o servidor ficou mais tempo em modo “offline” do que a minha conexão de internet. 🙄', NULL, '2025-08-22');


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
(2, 3, 4, 1), 
(3, 2, NULL, 5), 
(4, 5, 3, 2), 
(5, 1, NULL, 4), 
(6, 2, 1, 7); 
