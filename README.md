# Gerenciador de Produtos

Aplicação web reativa para gerenciamento de produtos com Vue.js + TypeScript.

## 🚀 Tecnologias

- **Vue.js 3** - Framework progressivo
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Navegação SPA
- **Tailwind CSS** - Estilização utilitária
- **ExcelJS** - Leitura e escrita de planilhas Excel
- **Lucide Vue Next** - Ícones
- **PrimeVue** - Componentes UI

## 📦 Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Entrar na pasta
cd teste-frontend

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📖 Funcionalidades

### Dashboard

- **Cards de métricas em tempo real:**
  - Total de produtos com imagem
  - Total de produtos indisponíveis
  - Total de produtos OK (disponíveis e completos)
  - Score médio dos produtos

- **Tabela de produtos:**
  - Visualização dos dados principais
  - Campo de busca textual
  - Filtro por categoria
  - Filtro por disponibilidade
  - Ordenação por colunas
  - CRUD completo (Criar, Editar, Excluir)

### Galeria

- Grid de cards com imagens em destaque
- Filtros de busca e categoria
- Clique para editar produto
- Design responsivo

### Recursos Extras

- 🌙 **Dark/Light Mode** - Alternância de tema com persistência
- 📤 **Importar Excel** - Carrega planilha de produtos
- 📥 **Exportar Excel** - Baixa dados atualizados no mesmo formato
- ⚡ **Reatividade total** - Alterações refletem instantaneamente nas métricas
- 📱 **Responsivo** - Funciona em desktop, tablet e mobile

## 🎯 Como usar

1. **Importar planilha:** Clique no botão "Importar" no cabeçalho e selecione seu arquivo Excel (.xlsx)

2. **Gerenciar produtos:**
   - Use os filtros para encontrar produtos
   - Clique em "Adicionar" para criar novo produto
   - Clique no ícone de lápis para editar
   - Clique no ícone de lixeira para excluir

3. **Exportar dados:** Clique no botão "Exportar" para baixar a planilha atualizada

4. **Alternar tema:** Clique no ícone de sol/lua para alternar entre modo claro e escuro

## 📋 Estrutura da Planilha

A planilha deve conter as seguintes colunas (aceita variações em português/inglês):

| Coluna     | Variações aceitas                  |
| ---------- | ---------------------------------- |
| Nome       | nome, name, produto                |
| Categoria  | categoria, category                |
| Preço      | preço, preco, price                |
| Estoque    | estoque, stock, quantidade         |
| Avaliação  | avaliação, avaliacao, rating, nota |
| Imagem     | imagem, image, imageurl, url       |
| Disponível | disponível, disponivel, available  |
| Descrição  | descrição, descricao, description  |

## 🏗️ Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   ├── MetricCard.vue
│   └── ProductModal.vue
├── router/           # Configuração de rotas
│   └── index.ts
├── stores/           # Stores Pinia
│   ├── products.ts   # Estado dos produtos
│   └── theme.ts      # Estado do tema
├── types/            # Tipos TypeScript
│   └── Product.ts
├── views/            # Páginas
│   ├── Dashboard.vue
│   └── Gallery.vue
├── App.vue           # Componente raiz
├── main.ts           # Entry point
└── style.css         # Estilos globais
```

## 👨‍💻 Autor

Desenvolvido para o desafio técnico de Frontend.
