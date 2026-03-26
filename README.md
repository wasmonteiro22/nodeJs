# 🚀 Node.js Backend API

API backend desenvolvida com **Node.js + TypeScript + Express + Prisma**, contendo autenticação completa com JWT, refresh token, filas com Redis (BullMQ) e testes automatizados com Jest.

---

## 📌 Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* Prisma ORM (versão 6)
* MySQL
* JWT (JSON Web Token)
* BullMQ + Redis (filas)
* Jest + Supertest (testes)
* Zod (validação)

---

## ⚙️ Pré-requisitos

* Node.js instalado
* Docker (opcional, mas recomendado)
* MySQL
* Redis

---

## 📦 Instalação

```bash
git clone <repo>
cd projeto
npm install
```

---

## ⚠️ Prisma (IMPORTANTE)

Este projeto utiliza **Prisma v6**, pois a versão 7 possui breaking changes.

Instale manualmente:

```bash
npm install prisma@6 @prisma/client@6
```

---

## 🔐 Variáveis de ambiente

Crie um `.env`:

```env
DATABASE_URL="mysql://user:password@localhost:3306/database"

JWT_SECRET="seu_secret_aqui"

ACCESS_TOKEN_EXPIRES=15
REFRESH_TOKEN_EXPIRES=1440
```

---

## 🧱 Banco de dados (Prisma)

### 🔄 Rodar migrations

```bash
npx prisma migrate dev
```

---

### 📦 Gerar client

```bash
npx prisma generate
```

---

### 🧹 Resetar banco (DEV)

```bash
npx prisma migrate reset
```

---

### 🌱 Seed

```bash
npx prisma db seed
```

---

## 🚀 Rodar aplicação

```bash
npm run dev
```

---

## 📬 Filas com Redis (BullMQ)

### ▶️ Subir Redis (Docker)

```bash
docker run -p 6379:6379 redis
```

---

### ▶️ Rodar Worker

```bash
npx ts-node src/shared/queue/emailWorker.ts
```

---

### 📌 Exemplo de uso

A API envia jobs para fila:

* Email de boas-vindas
* Reset de senha
* Eventos assíncronos

---

## 🧪 Testes com Jest

### ▶️ Rodar testes

arquivo específico:
```bash
npx jest src/tests/auth.test.ts --forceExit
```

```bash
npm run test
```

ou

```bash
npx jest
```

---

### 📌 Cobertura atual

* Auth (login)
* JWT (rotas protegidas)
* Users (CRUD básico)
* Validação de acesso

---

## 📬 Postman Collection

A collection do Postman está disponível na pasta:

/postman

Importe no Postman para testar todos os endpoints da API.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://wasmonteiro22-6132729.postman.co/workspace/18b624c9-7a6e-4f3a-8fe7-977bd97bad60/collection/53317808-b76526b5-6c78-4c94-a6d7-31ad257db812?action=share&source=copy-link&creator=53317808)

---

## 🔐 Autenticação

### 📥 Login

```http
POST /auth/login
```

Retorna:

```json
{
  "user": {},
  "tokens": {
    "accessToken": "",
    "refreshToken": ""
  }
}
```

---

### 🔄 Refresh Token

```http
POST /auth/refresh
```

---

### 🔒 Rotas protegidas

Header obrigatório:

```http
Authorization: Bearer TOKEN
```

---

## 🧠 Arquitetura

```bash
src/
  modules/
    auth/
    users/
  shared/
    database/
    middlewares/
    queue/
    errors/
    utils/
```

---

## 🌳 Git Flow

* `main` → produção
* `dev` → desenvolvimento
* `feature/*` → novas funcionalidades

---

## 📌 Funcionalidades

* ✅ Cadastro de usuário
* ✅ Login com JWT
* ✅ Refresh Token
* ✅ Middleware de autenticação
* ✅ Hash de senha (bcrypt)
* ✅ Validação com Zod
* ✅ Filas com BullMQ + Redis
* ✅ Testes com Jest
* ✅ Prisma ORM com migrations

---

## 🚀 Próximos passos

* Swagger (documentação)
* RBAC (roles/permissões)
* Cache com Redis
* Deploy (Docker + VPS)

---

## 🏁 Versão

```bash
v1.0.0
```

---

## 👨‍💻 Autor

Washington Monteiro
wasmont@gmail.com
---
