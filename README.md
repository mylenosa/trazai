# 🎉 TrazAí - Organizador de Eventos

Uma plataforma moderna e intuitiva para organizar eventos de forma colaborativa. Com o TrazAí, você pode criar churrascos, festas e encontros sem complicação!

## ✨ Características Principais

### 📱 **Mobile-First & Responsivo**
- Design otimizado para dispositivos móveis
- Interface touch-friendly com botões adequados (44px+)
- Experiência consistente em todos os dispositivos
- Sidebar adaptável (overlay em mobile, fixa em desktop)

### 🎯 **UX Direta e Intuitiva**
- Fluxo simplificado para criação de eventos
- CTAs claros e ações óbvias
- Navegação otimizada para eficiência
- Feedback visual imediato

### 🔧 **Tecnologias Modernas**
- **React 18** - Interface de usuário reativa
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Estilização utility-first
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **React Router** - Navegação client-side
- **Lucide React** - Ícones modernos

## 🚀 Como Usar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/trazai.git

# Entre no diretório
cd trazai

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor local em http://localhost:5173

# Build
npm run build        # Gera build de produção
npm run preview      # Prévia da build de produção

# Linting
npm run lint         # Verifica código com ESLint
```

## 📱 Funcionalidades

### Para Organizadores
- ✅ **Criar Eventos**: Interface simples para definir data, local e necessidades
- ✅ **Gerenciar Participantes**: Acompanhe confirmações em tempo real
- ✅ **Lista de Contribuições**: Organize itens e valores necessários
- ✅ **Compartilhamento**: Link direto para convidar participantes

### Para Participantes
- ✅ **Confirmação Rápida**: Confirme presença sem criar conta
- ✅ **Escolher Contribuição**: Selecione o que vai levar
- ✅ **Atualização em Tempo Real**: Veja o que ainda é necessário

## 🎨 Design System

### Breakpoints
```css
sm: 640px   /* Tablet pequeno */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
```

### Cores Principais
- **Laranja**: #f97316 (CTAs e elementos principais)
- **Verde**: #22c55e (confirmações e estados positivos)
- **Cinza**: #6b7280 (textos secundários)

### Componentes Otimizados
- **Buttons**: Touch-friendly com estados visuais claros
- **Cards**: Design clean com hover effects sutis
- **Inputs**: Altura adequada para mobile (48px)
- **Layout**: Sidebar responsiva e navegação otimizada

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                 # Componentes base (shadcn/ui)
│   ├── events/            # Componentes específicos de eventos
│   ├── event-details/     # Componentes de detalhes
│   └── public-event/      # Componentes de evento público
├── pages/                 # Páginas da aplicação
├── entities/              # Modelos de dados (Event, Participant)
├── utils/                 # Utilitários e helpers
└── styles/               # Estilos globais
```

## 🎯 Planos

### Gratuito
- ✅ Até 2 eventos ativos por mês
- ✅ Confirmação de presença ilimitada
- ✅ Lista de contribuições
- ✅ Link compartilhável

### Premium (R$ 9,90/mês)
- ✅ Eventos ilimitados
- ✅ Histórico completo
- ✅ Grupos salvos
- ✅ Exportação de dados
- 🔄 PIX integrado (em breve)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

- **Website**: [trazai.com](https://trazai.com)
- **Email**: contato@trazai.com

---

**Feito com ❤️ para organizar o rolê sem estresse!** 🎉