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
('Ana Carolina Garcia Freitas', '@AnaCarolinaFreitas', 'ana.c.freitas35@aluno.senai.br', '1234', 'Pessoal', 'uploads/anacarolina', NULL, NULL, NULL),
('Ana Julia Pinheiro Demattei', '@anajudemattei', 'ana.demattei@aluno.senai.br', '1234', 'Pessoal', 'uploads/anademattei', NULL, NULL, NULL),
('Beatriz Lima', '@limabea23', 'beatriz.lima14@aluno.senai.br', '1234', 'Pessoal', 'uploads/', NULL, NULL, NULL),
('Bernardo Gabriel de Moraes Marques', '@Bernardo1401', 'bernardo.g.marques@aluno.senai.br', '1234', 'Pessoal', 'uploads/bernardo', NULL, NULL, NULL),
('Caio Gabriel Lacerda Silva', '@CaioLacerdaDev', 'caio.g.silva20@aluno.senai.br', '1234', 'Pessoal', 'uploads/caio.jpg', NULL, NULL, NULL),
('Luana Domeneghetti', '@domeneghetti', 'luana.domeneghetti@aluno.senai.br', '1234', 'Pessoal', 'uploads/luana.jpg', NULL, NULL, NULL);

CREATE TABLE posts (
    id_post SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, 
    conteudo_post TEXT NOT NULL,
    anexo TEXT, 
    data_publicacao DATE,
    CONSTRAINT fk_usuario_post FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

INSERT INTO posts (id_usuario, conteudo_post, anexo, data_publicacao) VALUES
(1, 'Meu ritual antes de começar a codar...', 'https://i.pinimg.com/736x/01/ec/e5/01ece52b11d155f053f50a7a6293a6ce.jpg', '2025-04-24'),
(2, 'Mostre seu layout mais bonito (ou mais caótico 😅)', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwufcE7pyPpNLayzb33eWmx2Jny71qRRyg3w&s', '2025-04-24'),
(3, 'Dica do dia: sempre leia sua DELETE 3x antes de apertar Enter. Ou escreva um testamento antes.', NULL, '2025-04-24'),
(4, 'Já perdeu dados no banco? Como?', NULL, '2025-04-24'),
(5, 'Qual linguagem você usa no back-end? Node, Go, Python, Java, outra? (e por quê?)', NULL, '2025-04-24'),
(6, 'Eu tentando entender por que a API morreu às 3h17 da manhã 💀', 'https://miro.medium.com/v2/resize:fit:1400/1*Al1fMG4yFlw033208Bu3MA.png', '2025-04-24');

CREATE TABLE duvidas (
    id_post SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, 
    conteudo_duvida TEXT NOT NULL,
    anexo TEXT, 
    data_publicacao DATE,
    CONSTRAINT fk_usuario_post FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

INSERT INTO duvidas (id_usuario, conteudo_duvida, anexo, data_publicacao) VALUES
(1, 'Como faço para melhorar a performance de uma query SQL complexa?', NULL, '2025-04-25'),
(2, 'Alguém sabe como configurar um servidor Node.js para produção?', NULL, '2025-04-26'),
(3, 'Qual a melhor prática para versionar um banco de dados?', NULL, '2025-04-27'),
(4, 'Como lidar com conflitos de merge no Git?', NULL, '2025-04-28'),
(5, 'Qual a diferença entre REST e GraphQL?', NULL, '2025-04-29'),
(6, 'Como faço para debugar um erro intermitente em uma aplicação?', NULL, '2025-04-30');

CREATE TABLE comentarios (
    id_comentario SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_post INT NOT NULL,
    conteudo_comentario TEXT NOT NULL,
    anexo TEXT, 
    data_publicacao DATE,
    CONSTRAINT fk_usuario_comentario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_post_comentario FOREIGN KEY (id_post) REFERENCES posts(id_post) ON DELETE CASCADE
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
    id_usuario INT NOT NULL,
    id_post INT,
    id_comentario INT,
    CONSTRAINT fk_usuario_curtida FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_post_curtida FOREIGN KEY (id_post) REFERENCES posts(id_post) ON DELETE CASCADE,
    CONSTRAINT fk_comentario_curtida FOREIGN KEY (id_comentario) REFERENCES comentarios(id_comentario) ON DELETE CASCADE,
    CHECK (
        (id_post IS NOT NULL AND id_comentario IS NULL) OR 
        (id_post IS NULL AND id_comentario IS NOT NULL)
    )
);

INSERT INTO curtidas (id_usuario, id_post, id_comentario) VALUES 
(1, NULL, 2),
(2, NULL, 4),
(3, 2, NULL),
(4, NULL, 3),
(5, 1, NULL),
(6, NULL, 1);