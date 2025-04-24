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
('Ana Carolina Garcia Freitas', '@AnaCarolinaFreitas', 'ana.c.freitas35@aluno.senai.br', '1234', 'Pessoal', 'https://avatars.githubusercontent.com/u/158210617?v=4', 'NULL', 'NULL', 'NULL'),
('Ana Julia Pinheiro Demattei', '@anajudemattei', 'ana.demattei@aluno.senai.br', '1234', 'Pessoal', 'https://avatars.githubusercontent.com/u/158210311?v=4', 'NULL', 'NULL', 'NULL'),
('Beatriz Lima', '@limabea23', 'beatriz.lima14@aluno.senai.br', '1234', 'Pessoal', 'https://avatars.githubusercontent.com/u/158210831?v=4', 'NULL', 'NULL', 'NULL'),
('Bernardo Gabriel de Moraes Marques', '@Bernardo1401', 'bernardo.g.marques@aluno.senai.br', '1234', 'Pessoal', 'https://avatars.githubusercontent.com/u/158209610?v=4', 'NULL', 'NULL', 'NULL'),
('Caio Gabriel Lacerda Silva', '@CaioLacerdaDev', 'caio.g.silva20@aluno.senai.br', '1234', 'Pessoal', 'https://avatars.githubusercontent.com/u/158210310?v=4', 'NULL', 'NULL', 'NULL'),
('Luana Domeneghetti', '@domeneghetti', 'luana.domeneghetti@aluno.senai.br', '1234', 'Pessoal', 'https://avatars.githubusercontent.com/u/158210063?v=4', 'NULL', 'NULL', 'NULL');

CREATE TABLE posts (
    id_post SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, 
    conteudo_post TEXT NOT NULL,
    anexo VARCHAR(255), 
    data_publicacao DATE,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

INSERT INTO posts (id_usuario, conteudo_post, anexo, data_publicacao) VALUES
(1, 'Meu ritual antes de começar a codar...', 'https://i.pinimg.com/736x/01/ec/e5/01ece52b11d155f053f50a7a6293a6ce.jpg', '2025-04-24'),
(2, 'Mostre seu layout mais bonito (ou mais caótico 😅)', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwufcE7pyPpNLayzb33eWmx2Jny71qRRyg3w&s', '2025-04-24'),
(3, 'Dica do dia: sempre leia sua DELETE 3x antes de apertar Enter. Ou escreva um testamento antes.', 'NULL', '2025-04-24'),
(4, 'Já perdeu dados no banco? Como?', 'NULL', '2025-04-24'),
(5, 'Qual linguagem você usa no back-end? Node, Go, Python, Java, outra? (e por quê?)', 'NULL', '2025-04-24'),
(6, 'Eu tentando entender por que a API morreu às 3h17 da manhã 💀', 'https://miro.medium.com/v2/resize:fit:1400/1*Al1fMG4yFlw033208Bu3MA.png', '2025-04-24');

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