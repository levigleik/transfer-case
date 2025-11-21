# Projeto Transfer

Uma aplicação web moderna para gerenciamento de frotas, motoristas, ocorrências e abastecimentos. Construído com as tecnologias mais recentes para uma experiência de usuário rápida e eficiente.

## ✨ Features

-   Gerenciamento de Veículos
-   Registro de Abastecimentos
-   Controle de Ocorrências
-   Upload de Documentos
-   Interface Responsiva com Tema Claro e Escuro
-   Tabelas com Filtros Avançados e Paginação

## 🚀 Tecnologias Utilizadas

Este projeto utiliza uma variedade de tecnologias modernas para desenvolvimento web:

-   **Framework:** [Next.js](https://nextjs.org/) (React)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes UI:** [Shadcn/UI](https://ui.shadcn.com/)
-   **Gerenciamento de Estado & Cache:** [TanStack Query (React Query)](https://tanstack.com/query)
-   **Formulários:** [React Hook Form](https://react-hook-form.com/)
-   **Validação de Esquemas:** [Zod](https://zod.dev/)
-   **Tabelas:** [TanStack Table](https://tanstack.com/table)
-   **Linting & Formatação:** [Biome.js](https://biomejs.dev/) & [ESLint](https://eslint.org/)
-   **Package Manager:** [Bun](https://bun.sh/)

## 📂 Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para manter o código modular, escalável e de fácil manutenção.

```
/
├── public/               # Arquivos estáticos
├── src/
│   ├── app/              # Rotas e páginas (Next.js App Router)
│   │   ├── (private)/    # Grupo de rotas privadas da aplicação
│   │   │   ├── components/ # Componentes específicos das páginas
│   │   │   ├── context/    # Provedores de contexto React
│   │   │   ├── hooks/      # Hooks customizados
│   │   │   ├── types/      # Tipos TypeScript específicos
│   │   │   └── validation/ # Esquemas de validação com Zod
│   │   └── layout.tsx    # Layout principal da aplicação
│   ├── assets/             # Imagens e outros assets
│   ├── components/         # Componentes reutilizáveis
│   │   ├── navbar/         # Componentes da barra de navegação
│   │   ├── sidebar/        # Componentes da barra lateral
│   │   └── ui/             # Componentes base do Shadcn/UI
│   ├── hooks/              # Hooks globais
│   ├── lib/                # Funções utilitárias, APIs, etc.
│   ├── providers/          # Provedores globais (Tema, QueryClient)
│   └── types/              # Tipos globais e schemas Prisma
└── ...
```

-   **`src/app`**: Utiliza o App Router do Next.js. A pasta `(private)` agrupa as rotas principais do sistema de forma organizada sem afetar a URL.
-   **`src/components`**: Contém componentes React reutilizáveis. `components/ui` são os componentes base (primitivos) e `components` são componentes mais complexos da aplicação.
-   **`src/lib`**: Centraliza a lógica de negócios, configurações e funções utilitárias.
-   **`src/context`**: Fornece gerenciamento de estado localizado para diferentes módulos da aplicação usando a Context API do React.
-   **`src/validation`**: Define os esquemas de validação de dados com Zod, usados em formulários e na comunicação com a API.

## 🏁 Começando

Siga os passos abaixo para executar o projeto em seu ambiente local.

**Pré-requisitos:**
*   [Node.js](https://nodejs.org/en/) (v20 ou superior)
*   [Bun](https://bun.sh/)

**Instalação:**

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd transfer
    ```

2.  **Instale as dependências:**
    ```bash
    bun install
    # ou
    yarn install
    # ou
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie uma cópia do arquivo `.env.example` (se houver) e renomeie para `.env`, preenchendo as variáveis necessárias (como a URL do banco de dados).

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    bun run dev
    # ou
    yarn dev
    # ou
    npm run dev
    ```

    Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver o resultado.

## 📜 Scripts Disponíveis

-   `bun run dev`: Inicia o servidor de desenvolvimento.
-   `bun run build`: Compila a aplicação para produção.
-   `bun run start`: Inicia um servidor de produção.
-   `bun run lint`: Executa o linter (ESLint) para analisar o código.
-   `bun run test`: Executa os testes unitários e de integração com Jest.

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.