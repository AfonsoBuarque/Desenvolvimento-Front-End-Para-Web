# 📚 Documentação Técnica - Fase 1: HTML

## 📋 Informações do Projeto

**Atividade:** Desenvolvimento Front-End Para Web  
**Turma:** 005  
**Aluno:** Afonso Buarque Silva Gusmão  
**RGM:** 462812820  
**Fase:** 1 - Estrutura HTML  

---

## 🎯 Objetivo da Fase 1

Desenvolver a estrutura semântica HTML5 completa do site da ONG Programando o Futuro, focando em:
- Marcação semântica adequada
- Acessibilidade
- SEO básico
- Estrutura de conteúdo organizada

---

## 📁 Estrutura de Arquivos HTML

```
Programando-futuro-ong/
│
├── index.html                 # Página inicial
├── projetos.html             # Página de projetos
├── voluntariado.html         # Página de voluntariado
├── doacoes.html              # Página de doações
├── transparencia.html        # Página de transparência
├── contato.html              # Página de contato
├── login.html                # Página de login
├── cadastro.html             # Página de cadastro
├── area-voluntario.html      # Área do voluntário
├── area-doador.html          # Área do doador
│
├── admin/
│   └── dashboard.html        # Dashboard administrativo
│
├── sitemap.xml               # Mapa do site
├── robots.txt                # Configuração de crawlers
└── manifest.json             # Manifesto PWA
```

---

## 🏗️ Estrutura Semântica HTML5

### Tags Semânticas Utilizadas

#### 1. **Estrutura Principal**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Meta tags, títulos, links -->
</head>
<body>
    <header>      <!-- Cabeçalho do site -->
    <nav>         <!-- Navegação principal -->
    <main>        <!-- Conteúdo principal -->
    <section>     <!-- Seções de conteúdo -->
    <article>     <!-- Conteúdo independente -->
    <aside>       <!-- Conteúdo complementar -->
    <footer>      <!-- Rodapé -->
</body>
</html>
```

#### 2. **Elementos de Conteúdo**
- `<h1>` a `<h6>`: Hierarquia de títulos
- `<p>`: Parágrafos
- `<ul>`, `<ol>`, `<li>`: Listas
- `<figure>` e `<figcaption>`: Imagens com legendas
- `<blockquote>`: Citações
- `<address>`: Informações de contato

#### 3. **Formulários**
- `<form>`: Formulários
- `<fieldset>` e `<legend>`: Agrupamento de campos
- `<label>`: Rótulos de campos
- `<input>`: Campos de entrada
- `<textarea>`: Áreas de texto
- `<select>` e `<option>`: Seleção
- `<button>`: Botões

---

## 📄 Páginas Desenvolvidas

### 1. **index.html** - Página Inicial
**Seções:**
- Hero Section (apresentação principal)
- Missão da ONG
- Contador de impacto
- Projetos em destaque
- Depoimentos
- História da ONG
- Missão, Visão e Valores
- Equipe
- Conquistas e reconhecimentos
- Newsletter

**Elementos principais:**
```html
<section class="hero">
<section class="mission">
<section class="impact-counter">
<section class="featured-projects">
<section class="testimonials">
<section class="history-section">
<section class="mvv-section">
<section class="team-section">
<section class="achievements-section">
<section class="newsletter">
```

### 2. **projetos.html** - Projetos Sociais
**Seções:**
- Hero com estatísticas
- Impacto dos projetos
- Filtros e busca
- Grid de projetos (CodeKids, TechWomen, Digital Senior)
- Como participar
- Call to action

**Estrutura de projeto:**
```html
<article class="project-card">
    <div class="project-badge">
    <div class="project-image">
    <div class="project-content">
        <h3 class="project-title">
        <p class="project-description">
        <div class="project-highlights">
        <div class="project-progress">
    </div>
</article>
```

### 3. **voluntariado.html** - Voluntariado
**Seções:**
- Hero com estatísticas
- Depoimento em vídeo
- Depoimentos de voluntários
- Benefícios do voluntariado
- Áreas de atuação
- Call to action
- Formulário de cadastro
- Processo de seleção

**Formulário completo com:**
- Dados pessoais
- Integração com ViaCEP
- Áreas de interesse (checkboxes)
- Disponibilidade de horários
- Experiências anteriores

### 4. **doacoes.html** - Doações
**Seções:**
- Hero com impacto
- Formas de doar
- Planos de doação
- Impacto das doações
- Transparência
- Formulário de doação

### 5. **transparencia.html** - Transparência
**Seções:**
- Compromisso com transparência
- Relatórios financeiros
- Aplicação de recursos
- Certificações
- Documentos para download

### 6. **contato.html** - Contato
**Seções:**
- Hero
- Informações de contato
- Formulário de contato
- Mapa de localização
- Redes sociais
- FAQ

### 7. **login.html** e **cadastro.html** - Autenticação
**Elementos:**
- Formulários de autenticação
- Validação de campos
- Links de recuperação
- Opções de perfil (Admin, Voluntário, Doador)

### 8. **area-voluntario.html** - Área do Voluntário
**Seções:**
- Dashboard com estatísticas
- Histórico de participação
- Oportunidades disponíveis
- Certificados
- Timeline de atividades
- Perfil editável

### 9. **area-doador.html** - Área do Doador
**Seções:**
- Dashboard com histórico
- Impacto gerado
- Campanhas ativas
- Relatórios de transparência
- Comprovantes de doação

### 10. **admin/dashboard.html** - Dashboard Administrativo
**Seções:**
- Estatísticas gerais
- Gestão de projetos
- Gestão de voluntários
- Gestão de doações
- Campanhas
- Relatórios
- Configurações

---

## 🎨 Meta Tags e SEO

### Meta Tags Básicas
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Descrição otimizada da página">
<meta name="keywords" content="palavras-chave relevantes">
<meta name="author" content="ONG Programando o Futuro">
<meta name="robots" content="index, follow">
```

### Open Graph (Redes Sociais)
```html
<meta property="og:type" content="website">
<meta property="og:url" content="URL da página">
<meta property="og:title" content="Título otimizado">
<meta property="og:description" content="Descrição atrativa">
<meta property="og:image" content="URL da imagem">
<meta property="og:locale" content="pt_BR">
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Título">
<meta name="twitter:description" content="Descrição">
<meta name="twitter:image" content="URL da imagem">
```

### Structured Data (Schema.org)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "ONG Programando o Futuro",
  ...
}
</script>
```

---

## ♿ Acessibilidade (ARIA)

### Atributos ARIA Implementados

```html
<!-- Navegação -->
<nav aria-label="Menu principal">
<button aria-label="Abrir menu" aria-expanded="false">

<!-- Seções -->
<section aria-labelledby="section-title">
<h2 id="section-title">Título da Seção</h2>

<!-- Formulários -->
<input aria-describedby="error-message">
<div id="error-message" role="alert"></div>

<!-- Elementos interativos -->
<ul role="menubar">
    <li role="none">
        <a role="menuitem">Item</a>
    </li>
</ul>
```

### Roles Semânticos
- `role="banner"`: Cabeçalho principal
- `role="navigation"`: Navegação
- `role="main"`: Conteúdo principal
- `role="complementary"`: Conteúdo complementar
- `role="contentinfo"`: Informações de rodapé
- `role="alert"`: Mensagens de alerta
- `role="menubar"` e `role="menuitem"`: Menus

---

## 📋 Formulários Implementados

### 1. Formulário de Voluntariado
**Campos:**
- Nome completo
- E-mail
- Telefone
- CPF
- Data de nascimento
- CEP (com busca automática via ViaCEP)
- Endereço completo (preenchimento automático)
- Áreas de interesse (múltipla escolha)
- Disponibilidade de horários
- Experiências anteriores

### 2. Formulário de Doação
**Campos:**
- Tipo de doação (única/recorrente)
- Valor
- Dados pessoais
- Dados de pagamento
- Projeto específico (opcional)

### 3. Formulário de Contato
**Campos:**
- Nome
- E-mail
- Telefone
- Assunto
- Mensagem
- Tipo de contato (dúvida, parceria, sugestão)

### 4. Newsletter
**Campos:**
- E-mail
- Nome
- Interesses (checkboxes)

---

## 🔍 SEO - Otimização para Motores de Busca

### Sitemap.xml
Arquivo XML com todas as URLs públicas:
```xml
<url>
    <loc>https://programandofuturo.org/</loc>
    <lastmod>2024-10-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
</url>
```

### Robots.txt
Controle de indexação:
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /login.html
Sitemap: https://programandofuturo.org/sitemap.xml
```

### URLs Canônicas
```html
<link rel="canonical" href="https://programandofuturo.org/pagina.html">
```

---

## 📊 Hierarquia de Títulos

### Estrutura de Headings
```
H1 - Título principal da página (único por página)
├── H2 - Seções principais
│   ├── H3 - Subseções
│   │   ├── H4 - Detalhes
│   │   └── H4 - Detalhes
│   └── H3 - Subseções
└── H2 - Seções principais
```

**Exemplo:**
```html
<h1>Transformando Vidas Através da Tecnologia</h1>
<section>
    <h2>Nossa Missão</h2>
    <article>
        <h3>Educação</h3>
        <h4>Cursos Oferecidos</h4>
    </article>
</section>
```

---

## 🔗 Navegação e Links

### Menu Principal
```html
<nav class="navbar" aria-label="Menu principal">
    <ul class="navbar-menu" role="menubar">
        <li role="none">
            <a href="index.html" class="nav-link" role="menuitem">Home</a>
        </li>
        <li role="none">
            <a href="projetos.html" class="nav-link" role="menuitem">Projetos</a>
        </li>
        <!-- ... outros itens -->
    </ul>
</nav>
```

### Links Internos
- Links de navegação entre páginas
- Links de âncora para seções (#section-id)
- Breadcrumbs (navegação hierárquica)

### Links Externos
- Redes sociais
- Documentos para download
- APIs externas (ViaCEP)

---

## 📱 Responsividade (Meta Viewport)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Preparação para design responsivo nas próximas fases.

---

## 🎯 Boas Práticas Implementadas

### 1. **Semântica**
✅ Uso correto de tags HTML5 semânticas  
✅ Hierarquia de títulos adequada  
✅ Estrutura lógica de conteúdo  

### 2. **Acessibilidade**
✅ Atributos ARIA implementados  
✅ Labels associados a inputs  
✅ Textos alternativos para imagens  
✅ Contraste adequado (preparado para CSS)  

### 3. **SEO**
✅ Meta tags otimizadas  
✅ Structured data (Schema.org)  
✅ URLs canônicas  
✅ Sitemap e robots.txt  

### 4. **Performance**
✅ Estrutura HTML limpa e organizada  
✅ Preparação para lazy loading  
✅ Atributos loading="lazy" em imagens  

### 5. **Validação**
✅ HTML válido (W3C)  
✅ Sem erros de sintaxe  
✅ Estrutura bem formada  

---

## 🧪 Validação e Testes

### Ferramentas de Validação
- **W3C HTML Validator**: https://validator.w3.org/
- **WAVE Web Accessibility**: https://wave.webaim.org/
- **Schema Markup Validator**: https://validator.schema.org/

### Checklist de Validação
- [ ] HTML válido sem erros
- [ ] Hierarquia de títulos correta
- [ ] Todos os formulários com labels
- [ ] Imagens com atributos alt
- [ ] Links funcionais
- [ ] Atributos ARIA corretos
- [ ] Meta tags presentes
- [ ] Structured data válido

---

## 📈 Próximas Fases

### Fase 2: HTML + CSS
- Estilização completa do site
- Design responsivo
- Animações e transições
- Sistema de grid e layout

### Fase 3: HTML + CSS + JavaScript
- Interatividade
- Validação de formulários
- Integração com APIs
- Funcionalidades dinâmicas

---

## 📚 Referências

- **HTML5**: https://html.spec.whatwg.org/
- **MDN Web Docs**: https://developer.mozilla.org/pt-BR/
- **W3C**: https://www.w3.org/
- **Schema.org**: https://schema.org/
- **ARIA**: https://www.w3.org/WAI/ARIA/

---

## 📝 Notas de Desenvolvimento

### Decisões Técnicas
1. **Estrutura Semântica**: Priorização de tags HTML5 semânticas para melhor acessibilidade e SEO
2. **Formulários**: Validação HTML5 nativa preparada para validação JavaScript posterior
3. **SEO**: Implementação completa de meta tags e structured data desde a fase 1
4. **Acessibilidade**: ARIA implementado desde o início para garantir inclusão

### Desafios Enfrentados
- Organização de conteúdo extenso em estrutura lógica
- Implementação de structured data complexo
- Balanceamento entre semântica e necessidades de estilização futura

---

**Data de Conclusão da Fase 1:** 17 de outubro de 2024  
**Versão:** 1.0  
**Status:** ✅ Concluído
