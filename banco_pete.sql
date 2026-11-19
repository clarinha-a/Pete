-- 1. TABELAS INDEPENDENTES (Criadas primeiro)

CREATE TABLE fornecedor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

CREATE TABLE campanha_marketing (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    plataforma VARCHAR(50) NOT NULL,
    orcamento DECIMAL(10, 2) CHECK (orcamento >= 0)
);

CREATE TABLE caixa (
    id SERIAL PRIMARY KEY,
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP,
    saldo_inicial DECIMAL(10, 2) NOT NULL CHECK (saldo_inicial >= 0),
    saldo_final DECIMAL(10, 2) CHECK (saldo_final >= 0)
);

CREATE TABLE servico (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL CHECK (valor > 0)
);

CREATE TABLE profissional (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL
);


-- 2. TABELAS COM DEPENDÊNCIAS DE NÍVEL 1

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    campanha_id INT,
    CONSTRAINT fk_usuario_campanha FOREIGN KEY (campanha_id) REFERENCES campanha_marketing(id) ON DELETE SET NULL
);

CREATE TABLE produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    valor DECIMAL(10, 2) NOT NULL CHECK (valor > 0),
    estoque INT DEFAULT 0 CHECK (estoque >= 0),
    avaliacao DECIMAL(2, 1),
    imagem VARCHAR(255),
    fornecedor_id INT NOT NULL,
    CONSTRAINT fk_produto_fornecedor FOREIGN KEY (fornecedor_id) REFERENCES fornecedor(id)
);

CREATE TABLE disponibilidade_profissional (
    id SERIAL PRIMARY KEY,
    id_profissional INT NOT NULL,
    dia_semana INT NOT NULL CHECK (dia_semana BETWEEN 1 AND 7),
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    CONSTRAINT fk_disponibilidade_profissional FOREIGN KEY (id_profissional) REFERENCES profissional(id) ON DELETE CASCADE
);

CREATE TABLE bloqueio_profissional (
    id SERIAL PRIMARY KEY,
    id_profissional INT NOT NULL,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL,
    motivo VARCHAR(100),
    CONSTRAINT fk_bloqueio_profissional FOREIGN KEY (id_profissional) REFERENCES profissional(id) ON DELETE CASCADE
);


-- 3. TABELAS COM DEPENDÊNCIAS DE NÍVEL 2

CREATE TABLE pet (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    idade INT CHECK (idade >= 0),
    raca VARCHAR(200),
    imagem VARCHAR(255),
    id_usuario INT NOT NULL,
    CONSTRAINT fk_pet_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE log_whatsapp (
    id SERIAL PRIMARY KEY,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mensagem TEXT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT fk_log_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE compra (
    id SERIAL PRIMARY KEY,
    valor_total DECIMAL(10, 2) NOT NULL CHECK (valor_total >= 0),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL,
    id_caixa INT NOT NULL,
    CONSTRAINT fk_compra_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    CONSTRAINT fk_compra_caixa FOREIGN KEY (id_caixa) REFERENCES caixa(id)
);


-- 4. TABELAS DE DETALHES E AGENDAMENTOS (Dependências Finais)

CREATE TABLE item_compra (
    id SERIAL PRIMARY KEY,
    id_compra INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    preco_unitario DECIMAL(10, 2) NOT NULL CHECK (preco_unitario > 0),
    CONSTRAINT fk_item_compra FOREIGN KEY (id_compra) REFERENCES compra(id) ON DELETE CASCADE,
    CONSTRAINT fk_item_produto FOREIGN KEY (id_produto) REFERENCES produto(id)
);

CREATE TABLE agendamento (
    id SERIAL PRIMARY KEY,
    data_hora TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Confirmado', 'Concluído', 'Cancelado')),
    id_usuario INT NOT NULL,
    id_pet INT NOT NULL,
    id_servico INT NOT NULL,
    id_profissional INT NOT NULL,
    CONSTRAINT fk_agendamento_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    CONSTRAINT fk_agendamento_pet FOREIGN KEY (id_pet) REFERENCES pet(id),
    CONSTRAINT fk_agendamento_servico FOREIGN KEY (id_servico) REFERENCES servico(id),
    CONSTRAINT fk_agendamento_profissional FOREIGN KEY (id_profissional) REFERENCES profissional(id)
);

INSERT INTO servico (nome, valor)
VALUES ('Banho completo', 55.00),
	   ('Tosa especial', 75.00),
	   ('Spa & hidratação', 95.00);

INSERT INTO profissional (nome, email)
VALUES ('Marisa Oliveira', 'm.oliveira@gmail.com'), 
	   ('Otávio Silva', 'otaviosilva@gmail.com'),
	   ('Marcelo Marmelo', 'marmelada@gmail.com');