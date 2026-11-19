# Pet Shop API

## Sobre o projeto

A Pet Shop API é uma aplicação de back-end desenvolvida como projeto de curso. Seu objetivo é gerenciar as principais operações de um pet shop, como usuários, pets, agendamentos, produtos, fornecedores, serviços, profissionais, compras e controle de caixa.

A aplicação disponibiliza rotas para realizar operações de cadastro, consulta, atualização e exclusão de dados, conforme as funcionalidades de cada módulo.

## Tecnologias utilizadas

- **Node.js:** ambiente de execução JavaScript.
- **Express:** framework utilizado para criação da API e gerenciamento das rotas.
- **PostgreSQL:** sistema de gerenciamento do banco de dados.
- **pg:** biblioteca para conexão entre Node.js e PostgreSQL.
- **JWT:** utilizado para autenticação.
- **bcrypt:** utilizado para criptografia de senhas.
- **dotenv:** utilizado para carregar variáveis de ambiente.
- **CORS:** utilizado para configurar o acesso entre aplicações.

## Estrutura do projeto

```text
Pete/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── database/
└── README.md
```

## Funcionalidades principais

- Cadastro e autenticação de usuários.
- Gerenciamento de pets.
- Gerenciamento de agendamentos.
- Gerenciamento de produtos e fornecedores.
- Gerenciamento de serviços e profissionais.
- Cadastro de disponibilidades e bloqueios de profissionais.
- Gerenciamento de campanhas de marketing.
- Controle de caixa.
- Registro de compras e itens comprados.
- Registro de logs de WhatsApp.

## Middlewares

A API utiliza três middlewares principais:

- **validarDados:** verifica a presença dos campos obrigatórios e remove espaços desnecessários de valores textuais.
- **validarId:** verifica se o ID informado na URL é um número inteiro positivo.
- **logger:** registra no terminal as requisições recebidas pela aplicação.

## Banco de dados

O projeto utiliza PostgreSQL para armazenar as informações do pet shop.

## Instalação e configuração

### 1. Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- PostgreSQL
- Git (opcional, para clonar o repositório)

### 2. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd Pete
```

### 3. Instalar as dependências

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Na pasta `backend`, copie o arquivo `.env.example` para criar seu próprio arquivo `.env`:

```bash
cp .env.example .env
```

Configure as variáveis no arquivo `.env` com os dados da sua instalação do PostgreSQL:

```env
PORT=3333

DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=pet_shop

JWT_SECRET=sua_chave_secreta
```

**Importante:** o arquivo `.env` contém informações de configuração e não deve ser enviado ao GitHub. O arquivo `.env.example` deve conter apenas valores fictícios.

### 5. Executar a API

Na pasta `backend`, execute:

```bash
npm run dev
```

Se a inicialização ocorrer corretamente, o servidor estará disponível em:

`http://localhost:3333`

Para verificar se a API está funcionando, acesse:

`http://localhost:3333/`

A resposta esperada será:

```json
{
  "mensagem": "API da Pet Shop funcionando!"
}
```

## Principais rotas da API

A API possui rotas para gerenciar as principais operações do pet shop:

| Módulo | Endpoint | Funcionalidade |
|---|---|---|
| Usuários | `/usuarios` | Cadastro e login |
| Pets | `/pets` | Gerenciamento de pets |
| Agendamentos | `/agendamentos` | Gerenciamento de agendamentos |
| Produtos | `/produtos` | Gerenciamento de produtos |
| Fornecedores | `/fornecedores` | Gerenciamento de fornecedores |
| Serviços | `/servicos` | Gerenciamento de serviços |
| Profissionais | `/profissionais` | Gerenciamento de profissionais |
| Disponibilidades | `/disponibilidades` | Gerenciamento de horários |
| Bloqueios | `/bloqueios` | Gerenciamento de bloqueios |
| Campanhas | `/campanhas-marketing` | Gerenciamento de campanhas |
| Caixa | `/caixas` | Controle de caixa |
| Compras | `/compras` | Registro de compras |
| Logs WhatsApp | `/logs-whatsapp` | Registro de logs de WhatsApp |

**Observação:** algumas rotas exigem autenticação por token JWT.