# 🎨 Documentação Técnica - Fase 2: HTML + CSS

## 📋 Informações do Projeto

**Atividade:** Desenvolvimento Front-End Para Web  
**Turma:** 005  
**Aluno:** Afonso Buarque Silva Gusmão  
**RGM:** 462812820  
**Fase:** 2 - Estilização com CSS  

---

## 🎯 Objetivo da Fase 2

Desenvolver a estilização completa do site da ONG Programando o Futuro com CSS, focando em:
- Design responsivo mobile-first
- Sistema de cores e tipografia consistente
- Animações e transições suaves
- Componentes reutilizáveis
- Performance e otimização

---

## 📁 Estrutura de Arquivos CSS

```
css/
├── styles.css           # Estilos globais e variáveis
├── components.css       # Componentes reutilizáveis
├── about.css           # Página inicial
├── projects.css        # Página de projetos
├── volunteer.css       # Página de voluntariado
├── donations.css       # Página de doações
├── transparency.css    # Página de transparência
├── contact.css         # Página de contato
├── forms.css           # Formulários
├── auth.css            # Autenticação
├── user-area.css       # Áreas de usuário
└── dashboard.css       # Dashboard admin
```

---

## 🎨 Sistema de Design

### Paleta de Cores
- **Primária:** #6366f1 (Indigo)
- **Secundária:** #ec4899 (Pink)
- **Sucesso:** #10b981 (Verde)
- **Alerta:** #f59e0b (Amarelo)
- **Erro:** #ef4444 (Vermelho)
- **Neutras:** Escala de cinza (50-900)

### Tipografia
- **Fonte:** Inter (Google Fonts)
- **Tamanhos:** 12px a 60px
- **Pesos:** 300, 400, 500, 600, 700

### Espaçamento
- Sistema baseado em 8px
- Variáveis: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 96px

---

## 🧩 Componentes Principais

### 1. Botões
- Primary, Secondary, Outline
- Hover effects com transform e shadow
- Estados: normal, hover, active, disabled

### 2. Cards
- Project cards com overlay
- Testimonial cards
- Stats cards
- Hover animations

### 3. Formulários
- Inputs estilizados
- Validação visual
- Checkboxes customizados
- Estados de erro e sucesso

### 4. Navegação
- Navbar sticky
- Menu mobile responsivo
- Hamburger menu animado
- Active states

### 5. Grid System
- Container responsivo
- Grid 1-4 colunas
- Flexbox utilities
- Gap system

---

## 📱 Design Responsivo

### Breakpoints
- **xs:** 0px - 639px (Mobile)
- **sm:** 640px+ (Tablet Portrait)
- **md:** 768px+ (Tablet Landscape)
- **lg:** 1024px+ (Desktop)
- **xl:** 1280px+ (Large Desktop)
- **2xl:** 1536px+ (Extra Large)

### Mobile First
Todos os estilos começam mobile e expandem para desktop.

---

## 🎭 Animações e Transições

### Implementadas
- Fade in ao carregar
- Slide in para elementos
- Hover effects em cards
- Progress bar animations
- Counter animations (preparado para JS)
- Smooth scrolling

### Durações
- Fast: 150ms
- Base: 300ms
- Slow: 500ms

---

## 🎨 Páginas Estilizadas

### 1. index.html
- Hero section com gradient
- Impact counter
- Featured projects grid
- Testimonials carousel
- Team section
- Newsletter form

### 2. projetos.html
- Projects hero
- Filter buttons
- Project cards com badges
- Progress bars
- Modal de detalhes

### 3. voluntariado.html
- Volunteer hero
- Benefits cards
- Area cards com demanda
- Testimonials
- Form completo

### 4. doacoes.html
- Donations hero
- Donation plans
- Impact visualization
- Payment form

### 5. Dashboard
- Sidebar navigation
- Stats cards
- Charts (preparado)
- Tables responsivas

---

## 🚀 Performance

### Otimizações
- CSS minificado
- Critical CSS inline
- Lazy loading de imagens
- Will-change para animações
- Sprites de ícones

---

## ✅ Checklist

- [x] Variáveis CSS
- [x] Componentes reutilizáveis
- [x] Design responsivo
- [x] Animações suaves
- [x] Formulários estilizados
- [x] Dashboard completo
- [x] Dark mode (preparado)

---

**Data de Conclusão:** 17 de outubro de 2024  
**Status:** ✅ Concluído
