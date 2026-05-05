# 🚀 Brev.ly — URL Shortener FullStack

Aplicação FullStack para encurtamento de URLs com rastreamento de acessos, construída com foco em **arquitetura limpa, boas práticas e escalabilidade**.

---

## 📌 Visão Geral

O **Brev.ly** permite:

* 🔗 Encurtar URLs longas
* 📊 Monitorar quantidade de acessos
* 📈 Registrar histórico de acessos (IP, User-Agent)
* 🗑️ Remover links
* 📄 Gerar relatórios por link
* ⚡ Redirecionamento rápido e eficiente

---

## 🧠 Arquitetura

A aplicação segue uma arquitetura modular baseada em separação de responsabilidades:

```txt
Frontend (React)
   ↓
Backend (Node.js API)
   ↓
Database (PostgreSQL)
```

### Backend

* Camadas:

  * `routes` → camada HTTP
  * `modules` → regras de negócio
  * `lib` → integrações externas (Prisma)
  * `middlewares` → tratamento global de erros

### Frontend

* Componentização com React
* Gerenciamento de estado local
* Comunicação via Axios
* Validação com Zod + React Hook Form

---

## 🛠️ Stack Tecnológica

### Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* Zod (validação)
* NanoID (geração de códigos curtos)

### Frontend

* React
* Vite
* TypeScript
* Axios
* React Hook Form
* Zod

### DevOps

* Docker (opcional)
* PostgreSQL
* Variáveis de ambiente (.env)

---

## 📂 Estrutura do Projeto

```txt
brevly/
├── backend/
│   ├── src/
│   │   ├── lib/
│   │   ├── modules/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── server.ts
│   ├── prisma/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

* Node.js ≥ 18
* PostgreSQL
* npm ou yarn

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### Configurar variáveis de ambiente

Crie um `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/brevly"
PORT=3333
BASE_URL="http://localhost:3333"
```

### Rodar migrations

```bash
npx prisma migrate dev
```

### Iniciar servidor

```bash
npm run dev
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Aplicação disponível em:

```txt
http://localhost:5173
```

---

## 🔌 Endpoints da API

### Criar link

```http
POST /links
```

### Listar links

```http
GET /links
```

### Deletar link

```http
DELETE /links/:id
```

### Redirecionar

```http
GET /:shortCode
```

### Relatório de acessos

```http
GET /links/:shortCode/report
```

---

## 🔄 Fluxo de Redirecionamento

```txt
1. Cliente acessa /abc123
2. Backend busca link
3. Registra acesso (AccessLog)
4. Incrementa contador
5. Retorna redirect (302)
```

---

## 📊 Modelo de Dados

### Link

```ts
Link {
  id: string
  originalUrl: string
  shortCode: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}
```

### AccessLog

```ts
AccessLog {
  id: string
  linkId: string
  ip?: string
  userAgent?: string
  createdAt: Date
}
```

---

## 🧪 Validações e Regras de Negócio

* URL validada com Zod
* `shortCode` único (evita colisões)
* Tratamento global de erros
* Separação clara entre controller e service

---

## 🎯 Diferenciais Técnicos

* ✔️ Arquitetura modular escalável
* ✔️ Uso de ORM moderno (Prisma)
* ✔️ Validação robusta com Zod
* ✔️ Código tipado com TypeScript
* ✔️ Separação clara de responsabilidades
* ✔️ Frontend desacoplado da API

---

## 🚀 Melhorias Futuras

* Autenticação de usuários
* Dashboard com gráficos
* Exportação CSV
* Cache com Redis
* Rate limiting
* Deploy automatizado (CI/CD)
* Custom domains (ex: meu.link/abc)

---

## 📦 Deploy (Sugestão)

* Backend: Northflank / Railway
* Frontend: Vercel / Netlify
* Banco: PostgreSQL (Supabase / Neon)

---

## 👨‍💻 Autor

Desenvolvido por Ronoel Lima como parte da evolução em:

* Engenharia de Software
* Backend com Node.js
* Arquitetura FullStack

---

## 📄 Licença

MIT
