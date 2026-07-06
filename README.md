# API-Artworks

API REST desenvolvida em **Node.js**, **TypeScript**, **Express** e **TypeORM** para gerenciamento de obras de arte, artistas e usuários.

O sistema possui autenticação de usuários, recuperação de senha, gerenciamento de perfil e operações CRUD para artistas.

---

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT (JSON Web Token)
- BcryptJS
- Multer
- Nodemailer
- Handlebars

---

## Funcionalidades

### Usuários

- Cadastro de usuário
- Login com autenticação JWT
- Atualização de perfil
- Alteração de avatar
- Recuperação de senha por e-mail
- Redefinição de senha

### Artistas

- Cadastrar artista
- Listar artistas
- Buscar artista por ID
- Atualizar artista
- Remover artista

---

## Estrutura do projeto

```
src
│
├── modules
│   ├── users
│   ├── artists
│
├── shared
│   ├── http
│   ├── typeorm
│   ├── container
│   └── errors
│
└── config
```

---

## Instalação

Clone o repositório:

```bash
git clone <url-do-repositório>
```

Entre na pasta:

```bash
cd API-Artworks
```

Instale as dependências:

```bash
npm install
```

---

## Configuração

Crie um arquivo `.env` na raiz do projeto contendo as variáveis necessárias.

Exemplo:

```env
APP_SECRET=sua_chave_jwt

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=senha
DB_DATABASE=api_artworks
```

---

## Banco de dados

Execute as migrations:

```bash
npm run migration:run
```

---

## Executando o projeto

Modo desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

```
http://localhost:3333
```

---

## Rotas principais

### Usuários

| Método | Rota | Descrição |
|---------|------|-----------|
| POST | /users | Criar usuário |
| POST | /sessions | Login |
| GET | /profile | Buscar perfil |
| PUT | /profile | Atualizar perfil |
| PATCH | /users/avatar | Atualizar avatar |
| POST | /password/forgot | Recuperar senha |
| POST | /password/reset | Redefinir senha |

### Artistas

| Método | Rota | Descrição |
|---------|------|-----------|
| GET | /artists | Listar artistas |
| GET | /artists/:id | Buscar artista |
| POST | /artists | Criar artista |
| PUT | /artists/:id | Atualizar artista |
| DELETE | /artists/:id | Excluir artista |

---

## Autenticação

As rotas protegidas utilizam JWT.

Exemplo de header:

```http
Authorization: Bearer seu_token
```

---

## Arquitetura

O projeto segue uma arquitetura modular dividida em:

- Controllers
- Services
- Routes
- Repositories
- Entities

Essa organização facilita manutenção, reutilização de código e escalabilidade.

---

## Autor

Projeto desenvolvido para a disciplina de Desenvolvimento Web/API REST.