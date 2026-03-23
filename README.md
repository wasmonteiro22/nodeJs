# nodeJs
Desenvolvimento e Aprendizado


# 🚀 Setup Backend Node.js + Prisma + MySQL (Docker)

Este guia documenta todo o processo necessário para configurar um backend com **Node.js + TypeScript + Prisma + MySQL via Docker**, incluindo os erros comuns enfrentados e como resolvê-los.

---

# 📦 Pré-requisitos

* Docker + Docker Compose
* Node.js (local opcional)
* Projeto Node inicializado (`package.json`)

---

# 🐳 1. Docker Compose

```yaml
services:
  nodejs:
    image: node:24
    container_name: nodejs
    env_file:
      - .env
    volumes:
      - ./:/var/www
      - /var/www/node_modules
    working_dir: /var/www
    command: sh -c "npm install && npx prisma generate && npm run dev"
    ports:
      - "3001:3000"
    depends_on:
      - database

  database:
    image: mysql:8
    container_name: database
    command: --default-authentication-plugin=mysql_native_password
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: application
    ports:
      - "3395:3306"
```

---

# 🔐 2. Variáveis de ambiente (.env)

```env
DATABASE_URL="mysql://root:root@database:3306/application"
```

---

# 🧠 3. Prisma (VERSÃO ESTÁVEL)

## Instalar Prisma 6 (IMPORTANTE)

```bash
npm remove prisma @prisma/client
npm install prisma@6 @prisma/client@6
```

---

## schema.prisma

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

---

# 🧩 4. Prisma Client

```ts
// src/database/prisma.ts
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
```

---

# 📁 5. Estrutura recomendada

```
src/
  database/
    prisma.ts
  modules/
    users/
      controllers/
      services/
      repositories/
```

---

# ⚙️ 6. Subindo o ambiente

```bash
docker compose down -v
docker compose up -d --build
```

---

# 🔧 7. Acessar container

```bash
docker exec -it nodejs sh
```

---

# 📦 8. Instalar dependências

```bash
npm install
```

---

# 🔄 9. Gerar Prisma Client

```bash
npx prisma generate
```

---

# 🗃️ 10. Criar estrutura no banco

```bash
npx prisma db push

npm install ts-node --save-dev

Rodar o seed:
npx prisma db seed
```

---

# ▶️ 11. Rodar aplicação

```bash
npm run dev
```

---

# 🧪 12. Testar variáveis de ambiente

```bash
echo $DATABASE_URL
```

---

# 📡 13. Testar API

Exemplo de resposta esperada:

```json
{
  "id": "uuid",
  "name": "Nome",
  "email": "email@test.com",
  "phone": "+553199999999",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

# ❗ Problemas comuns e soluções

## 1. Prisma não conecta

* Verificar `.env`
* Verificar `DATABASE_URL`
* Testar dentro do container

---

## 2. Erro de permissão (EACCES)

```bash
sudo chown -R $USER:$USER .
sudo chown -R $USER:$USER ~/.cache/prisma
```

---

## 3. ts-node-dev não encontrado

```bash
npm install
```

---

## 4. Prisma Client não encontrado

```bash
npx prisma generate
```

---

## 5. Container não sobe

Rodar em modo debug:

```yaml
command: tail -f /dev/null
```

---

## 🧠 Boas práticas

* Não usar Prisma diretamente no Controller
* Separar:

  * Controller → Service → Repository
* Nunca retornar senha
* Usar validação (ex: Zod)

---

# 🚀 Próximos passos

* Autenticação JWT
* Hash de senha (bcrypt)
* Migrations (`prisma migrate dev`)
* Seed (`prisma db seed`)
* Testes (Jest)

---

# ✅ Conclusão

* API Node funcional
* Banco MySQL via Docker
* Prisma configurado corretamente
* Estrutura escalável

---

🔥 Setup completo e pronto para produção básica.
