<div align="center">
  <br/>
  <img src="https://img.shields.io/badge/status-prototipo-FF5C34?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/react-19-61DAFB?style=flat-square&logo=react" alt="React 19"/>
  <img src="https://img.shields.io/badge/tanstack_start-1.167-FF4154?style=flat-square&logo=react" alt="TanStack Start"/>
  <img src="https://img.shields.io/badge/typescript-5.8-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind v4"/>
  <img src="https://img.shields.io/badge/bun-000000?style=flat-square&logo=bun" alt="Bun"/>
  <br/>
  <br/>

  <h1>COMY</h1>

  <h3><em>eat together</em></h3>

  <p>
    <strong>COMY</strong> (de <em>come together</em>) é um <strong>diário alimentar social</strong> mobile-first.<br/>
    Compartilhe suas refeições, reaja com emojis, comente, siga amigos e descubra<br/>
    o que a galera está comendo — tudo numa timeline bonita e gostosa de usar.
  </p>

  <br/>
</div>

---

## 🍽️ Funcionalidades

| | |
|---|---|
| 📸 **Compartilhar refeições** | Tire uma foto, dê um título, escolha categoria e tags |
| ❤️ **Reações com emoji** | 😋🤤🔥🥗💛 — toque para reagir, veja quem mais curtiu |
| 💬 **Comentários** | Comente nas refeições dos amigos com input fixo no fim da página |
| 👥 **Seguir amigos** | Busque por @username, veja sugestões com amigos em comum |
| 🏠 **Feed** | Timeline com fotos, autor, tempo decorrido e reações |
| 🔍 **Descobrir** | Encontre novas pessoas e convide por link ou QR Code |
| 👤 **Perfil** | Grid de fotos, bio, contadores de seguidores/seguindo |
| 🏷️ **Filtros** | Filtr o feed por categoria: Café da manhã, Almoço, Jantar, Lanche, Bebida |
| 🌙 **Mobile-first** | Design responsivo com navegação inferior tipo pill |

> ⚡ Atualmente rodando com **dados mockados** — o backend Supabase está pronto para ser conectado.

---

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| **Linguagem** | TypeScript (strict) |
| **Framework** | React 19 + TanStack Start (SSR) |
| **Roteamento** | TanStack Router (file-based) |
| **Estado** | TanStack React Query |
| **Estilização** | Tailwind CSS v4 + shadcn/ui (New York) |
| **Ícones** | Lucide React |
| **Formulários** | React Hook Form + Zod |
| **Backend** | Supabase (mockado, aguardando conexão) |
| **Deploy** | Cloudflare Workers / Pages |
| **Empacotador** | Vite 7 |
| **Gerenciador** | Bun |

---

## 🚀 Começando

### Pré-requisitos

- [Bun](https://bun.sh/) instalado

### Instalação

```bash
# Clone o repositório
git clone https://github.com/juhsuedde/comy.git
cd comy

# Instale as dependências
bun install

# Inicie o servidor de desenvolvimento
bun run dev
```

Acesse em [`http://localhost:5173`](http://localhost:5173).

### Scripts

| Comando | Descrição |
|---|---|
| `bun run dev` | Servidor de desenvolvimento (Vite) |
| `bun run build` | Build de produção |
| `bun run build:dev` | Build em modo development |
| `bun run preview` | Preview do build de produção |
| `bun run lint` | ESLint em todo o projeto |
| `bun run format` | Formata código com Prettier |

### Conectando o Supabase

```bash
# 1. Instale o cliente Supabase
bun add @supabase/supabase-js

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com as credenciais do seu projeto Supabase

# 3. Descomente as linhas em src/lib/supabase.ts
```

---

## 📁 Estrutura

```
src/
├── assets/          # Imagens estáticas (avatars, meals)
├── components/
│   ├── ui/          # 30+ componentes shadcn/ui (Radix)
│   ├── Logo.tsx     # Wordmark COMY (SVG inline)
│   ├── BottomNav.tsx
│   ├── MealCard.tsx
│   ├── FilterPills.tsx
│   └── ...
├── contexts/
│   └── AuthContext.tsx   # Contexto de autenticação (mock)
├── hooks/
│   └── use-mobile.tsx
├── lib/
│   ├── mock-data.ts      # Dados mockados
│   ├── supabase.ts       # Cliente Supabase (desligado)
│   └── utils.ts          # Utilitários (cn)
├── routes/               # Rotas file-based
│   ├── __root.tsx
│   ├── index.tsx         # Feed
│   ├── login.tsx
│   ├── post.tsx
│   ├── meal.$id.tsx      # Detalhe da refeição
│   ├── friends.tsx
│   ├── profile.tsx
│   └── splash.tsx
├── services/             # Camada de serviços (mock)
├── types/
│   └── index.ts          # Tipos TypeScript
├── router.tsx
├── server.ts
├── start.ts
└── styles.css            # Tailwind + tokens COMY
```

---

## 🎨 Design

| Token | Valor |
|---|---|
| **Cor primária** | `#FF5C34` (Orange Topaze) |
| **Cor secundária** | `#AEB8A0` (Sage) |
| **Fonte** | Nunito (400/600/700/800) |
| **Raio de borda** | `1.5rem` (24px) — extremamente arredondado |
| **Fundo** | `#FFFFFF` (paper-white) |
| **Sombras** | Nenhuma — flat design proposital |

---

## 🗺️ Roadmap

- [ ] Conectar Supabase (autenticação real, banco de dados)
- [ ] Upload real de fotos (não imagens estáticas)
- [ ] Notificações push
- [ ] Testes (Vitest + Testing Library)
- [ ] CI/CD com GitHub Actions
- [ ] Modo escuro
- [ ] Internacionalização (i18n)
- [ ] Deploy em produção

---

## 🤝 Contribuindo

Este é um projeto pessoal em fase inicial. Sugestões e issues são bem-vindas!

1. Abra uma [issue](https://github.com/juhsuedde/comy/issues)
2. Faça um fork do projeto
3. Crie uma branch (`git checkout -b feature/sua-ideia`)
4. Commit (`git commit -m 'feat: adiciona tal coisa'`)
5. Push (`git push origin feature/sua-ideia`)
6. Abra um Pull Request

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

<div align="center">
  <sub>Feito com ❤️ por <a href="https://github.com/juhsuedde">@juhsuedde</a></sub>
  <br/>
  <sub><em>come together, eat together</em></sub>
</div>
