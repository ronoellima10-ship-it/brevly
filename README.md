# Brev.ly

[Português](#português) · [English](#english) · [C4 Model](docs/architecture/C4.md)

Full-stack URL shortener that creates compact links, records access metrics and redirects visitors to the original destination.

## Português

### Visão geral

O **Brev.ly** é uma aplicação full stack para encurtar URLs. A interface web permite criar, listar, copiar e excluir links; a API também registra cada redirecionamento para produzir métricas de acesso.

### Funcionalidades

- criação de códigos curtos únicos com Nano ID;
- validação de URLs no frontend e no backend com Zod;
- listagem dos links do mais recente para o mais antigo;
- cópia do endereço curto para a área de transferência;
- exclusão de links e dos respectivos registros de acesso;
- redirecionamento HTTP para a URL original;
- contador e histórico de acessos com IP, user agent e data;
- relatório detalhado por código curto.

### Arquitetura

```text
React + Vite -> API Express -> módulos de negócio -> Prisma -> PostgreSQL
                         |
                         +-> redirecionamento para a URL original
```

Os diagramas de contexto, contêineres, componentes e fluxo de redirecionamento estão em [docs/architecture/C4.md](docs/architecture/C4.md).

### Tecnologias

| Área | Tecnologias |
|---|---|
| Frontend | React 19, TypeScript, Vite, Axios, React Hook Form e Zod |
| Backend | Node.js, Express 5, TypeScript, Zod e Nano ID |
| Dados | PostgreSQL e Prisma ORM |
| Infraestrutura local | Docker Compose |

### Estrutura

```text
.
├── backend/
│   ├── prisma/                 # schema e migrations
│   └── src/
│       ├── errors/             # erros da aplicação
│       ├── lib/                # cliente Prisma
│       ├── middlewares/        # tratamento global de erros
│       ├── modules/links/      # casos de uso
│       ├── routes/             # interface HTTP
│       └── server.ts           # composição da API
├── frontend/frontend/
│   └── src/
│       ├── components/         # formulário e cartões de links
│       ├── services/           # cliente Axios
│       ├── types/              # contratos TypeScript
│       └── App.tsx             # tela principal
└── docker-compose.yml
```

### Como executar

#### Pré-requisitos

- Node.js 20 ou superior;
- npm;
- PostgreSQL disponível localmente ou via Docker.

#### Backend

```bash
cd backend
npm install
```

Crie `backend/.env` sem versioná-lo:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/brevly
PORT=3333
BASE_URL=http://localhost:3333
```

Depois execute:

```bash
npx prisma migrate dev
npm run dev
```

#### Frontend

Em outro terminal:

```bash
cd frontend/frontend
npm install
npm run dev
```

O cliente Axios está configurado para acessar `http://localhost:3333`.

### Endpoints

| Método | Rota | Finalidade |
|---|---|---|
| `POST` | `/links` | Criar um link curto |
| `GET` | `/links` | Listar os links |
| `DELETE` | `/links/:id` | Excluir um link |
| `GET` | `/links/:shortCode/report` | Consultar relatório e acessos |
| `GET` | `/:shortCode` | Registrar o acesso e redirecionar |

### Estado e próximos passos

O fluxo principal está implementado. Melhorias naturais incluem autenticação, testes automatizados, configuração da URL da API por variável de ambiente, paginação dos acessos e observabilidade.

---

## English

### Overview

**Brev.ly** is a full-stack URL shortener. The web interface creates, lists, copies and deletes links, while the API records redirects to provide access metrics.

### Features

- unique short-code generation with Nano ID;
- URL validation on both frontend and backend with Zod;
- newest-first link listing;
- copy-to-clipboard and link deletion actions;
- HTTP redirection to the original URL;
- access counter and history with IP, user agent and timestamp;
- detailed report for each short code.

### Architecture and stack

The React/Vite client calls an Express API. Link use cases access PostgreSQL through Prisma, and the redirect flow updates the counter and access log in a transaction. See [docs/architecture/C4.md](docs/architecture/C4.md) for the diagrams.

| Area | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite, Axios, React Hook Form and Zod |
| Backend | Node.js, Express 5, TypeScript, Zod and Nano ID |
| Data | PostgreSQL and Prisma ORM |
| Local infrastructure | Docker Compose |

### Running locally

Install the backend dependencies, configure `DATABASE_URL`, `PORT` and `BASE_URL` in an untracked `backend/.env`, run the Prisma migration and start the API:

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Then start the frontend in another terminal:

```bash
cd frontend/frontend
npm install
npm run dev
```

The frontend currently expects the API at `http://localhost:3333`.

### Project status

The core shortening and redirect flows are implemented. Good next steps are authentication, automated tests, environment-based API configuration, access pagination and observability.

## License

No license file is currently included in this repository.
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
