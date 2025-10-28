# Guia de SEO - ONG Programando o Futuro

## 📋 Implementações Realizadas

### 1. Meta Tags Otimizadas

Todas as páginas públicas agora possuem:

- **Meta Description**: Descrições únicas e otimizadas (150-160 caracteres)
- **Meta Keywords**: Palavras-chave relevantes para cada página
- **Meta Author**: Identificação da organização
- **Meta Robots**: Controle de indexação (index/noindex)
- **Theme Color**: Cor do tema (#6366f1) para navegadores móveis
- **Language**: Idioma definido como Português

### 2. Open Graph (Facebook/LinkedIn)

Implementado em todas as páginas para melhor compartilhamento em redes sociais:

- `og:type`: Tipo de conteúdo (website)
- `og:url`: URL canônica da página
- `og:title`: Título otimizado para redes sociais
- `og:description`: Descrição atrativa
- `og:image`: Imagem de preview (1200x630px recomendado)
- `og:locale`: Localização (pt_BR)
- `og:site_name`: Nome do site

### 3. Twitter Cards

Meta tags específicas para Twitter:

- `twitter:card`: Tipo de card (summary_large_image ou summary)
- `twitter:title`: Título otimizado
- `twitter:description`: Descrição concisa
- `twitter:image`: Imagem de preview

### 4. Structured Data (Schema.org)

Implementado JSON-LD para melhor compreensão pelos motores de busca:

#### index.html
- **NGO Schema**: Informações da organização
- **WebSite Schema**: Dados do site com SearchAction

#### projetos.html
- **ItemList Schema**: Lista de projetos com detalhes

#### voluntariado.html
- **VolunteerAction Schema**: Oportunidades de voluntariado
- **FAQPage Schema**: Perguntas frequentes

#### doacoes.html
- **DonateAction Schema**: Informações sobre doações
- **FinancialProduct Schema**: Programa de doações recorrentes

#### contato.html
- **ContactPage Schema**: Informações de contato completas

#### transparencia.html
- **AboutPage Schema**: Informações sobre transparência

### 5. URLs Canônicas

Todas as páginas possuem tag `<link rel="canonical">` para evitar conteúdo duplicado.

### 6. Títulos Otimizados

Títulos únicos e descritivos seguindo o padrão:
```
[Título da Página] - [Contexto] | Programando o Futuro
```

### 7. Arquivos Essenciais

#### sitemap.xml
Mapa do site com todas as URLs públicas, prioridades e frequências de atualização.

#### robots.txt
Configuração de crawling:
- **Permitido**: Páginas públicas
- **Bloqueado**: Áreas privadas, autenticação, recursos estáticos
- **Sitemap**: Link para sitemap.xml

#### .htaccess
Configurações de servidor:
- Compressão GZIP
- Cache de navegador
- Redirecionamento HTTPS
- Remoção de .html das URLs
- Headers de segurança
- Página 404 personalizada

#### manifest.json
Configuração PWA (Progressive Web App):
- Ícones em múltiplos tamanhos
- Cores do tema
- Metadados da aplicação

## 🎯 Estratégia de Indexação

### Páginas Indexadas (robots: index, follow)
- ✅ index.html (Prioridade: 1.0)
- ✅ projetos.html (Prioridade: 0.9)
- ✅ voluntariado.html (Prioridade: 0.9)
- ✅ doacoes.html (Prioridade: 0.8)
- ✅ transparencia.html (Prioridade: 0.7)
- ✅ contato.html (Prioridade: 0.6)

### Páginas Não Indexadas (robots: noindex, nofollow)
- ❌ login.html
- ❌ cadastro.html
- ❌ area-voluntario.html
- ❌ area-doador.html
- ❌ admin/dashboard.html

## 📊 Estrutura Semântica HTML5

Todas as páginas utilizam tags semânticas adequadas:

- `<header>`: Cabeçalho do site
- `<nav>`: Navegação principal
- `<main>`: Conteúdo principal
- `<section>`: Seções de conteúdo
- `<article>`: Conteúdo independente (projetos, depoimentos)
- `<aside>`: Conteúdo complementar
- `<footer>`: Rodapé
- `<figure>` e `<figcaption>`: Imagens com legendas

### Atributos ARIA
- `aria-label`: Rótulos descritivos
- `aria-labelledby`: Associação com títulos
- `aria-describedby`: Descrições adicionais
- `role`: Papéis semânticos (menubar, menuitem, etc.)

## 🔍 Palavras-chave Principais

### Primárias
- ONG
- Educação tecnológica
- Programação
- Cursos gratuitos
- Inclusão digital

### Secundárias
- Voluntariado
- Doações
- Impacto social
- Tecnologia social
- Capacitação profissional
- CodeKids
- TechWomen
- Digital Senior

### Long-tail
- "ONG de educação tecnológica em São Paulo"
- "Cursos gratuitos de programação para jovens"
- "Como ser voluntário ensinando tecnologia"
- "Doação para projetos de inclusão digital"

## 🚀 Próximos Passos Recomendados

### 1. Criar Imagens para Redes Sociais
Criar as seguintes imagens otimizadas:

**Open Graph (Facebook/LinkedIn)**
- og-image.jpg (1200x630px)
- projects-og.jpg
- volunteer-og.jpg
- donations-og.jpg
- transparency-og.jpg
- contact-og.jpg

**Twitter Cards**
- twitter-card.jpg (1200x600px)
- projects-twitter.jpg
- volunteer-twitter.jpg
- donations-twitter.jpg

### 2. Criar Ícones PWA
Gerar ícones nos seguintes tamanhos:
- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512

### 3. Registrar no Google Search Console
1. Verificar propriedade do site
2. Enviar sitemap.xml
3. Monitorar indexação e erros
4. Verificar Core Web Vitals

### 4. Registrar no Bing Webmaster Tools
1. Importar dados do Google Search Console
2. Enviar sitemap.xml

### 5. Implementar Google Analytics
Adicionar código de tracking para monitorar:
- Tráfego orgânico
- Páginas mais visitadas
- Taxa de conversão
- Comportamento do usuário

### 6. Implementar Schema.org Adicional
- **BreadcrumbList**: Navegação em breadcrumb
- **Review**: Avaliações de voluntários/doadores
- **Event**: Eventos e workshops
- **Course**: Cursos oferecidos

### 7. Otimizar Imagens
- Comprimir todas as imagens
- Usar formatos modernos (WebP)
- Implementar lazy loading
- Adicionar atributos alt descritivos

### 8. Criar Página 404 Personalizada
Criar arquivo 404.html com:
- Mensagem amigável
- Links para páginas principais
- Busca no site

### 9. Implementar Breadcrumbs
Adicionar navegação breadcrumb em páginas internas.

### 10. Link Building
- Parcerias com outras ONGs
- Artigos em blogs de tecnologia
- Presença em diretórios de ONGs
- Redes sociais ativas

## 📈 Métricas para Monitorar

### Performance
- Page Speed Insights score
- Core Web Vitals (LCP, FID, CLS)
- Tempo de carregamento

### SEO
- Posição nos resultados de busca
- Impressões e cliques (Search Console)
- Taxa de cliques (CTR)
- Páginas indexadas

### Engajamento
- Taxa de rejeição
- Tempo médio na página
- Páginas por sessão
- Conversões (formulários preenchidos)

## 🛠️ Ferramentas Úteis

- **Google Search Console**: Monitoramento de indexação
- **Google Analytics**: Análise de tráfego
- **PageSpeed Insights**: Performance
- **GTmetrix**: Análise de velocidade
- **Screaming Frog**: Auditoria de SEO
- **Ahrefs/SEMrush**: Pesquisa de palavras-chave
- **Schema Markup Validator**: Validação de structured data
- **Mobile-Friendly Test**: Teste de responsividade

## 📝 Checklist de Manutenção

### Mensal
- [ ] Verificar links quebrados
- [ ] Atualizar sitemap.xml se houver novas páginas
- [ ] Revisar posições no Google Search Console
- [ ] Analisar páginas com baixo desempenho

### Trimestral
- [ ] Atualizar meta descriptions se necessário
- [ ] Revisar palavras-chave
- [ ] Analisar concorrência
- [ ] Atualizar conteúdo desatualizado

### Anual
- [ ] Auditoria completa de SEO
- [ ] Revisar estratégia de conteúdo
- [ ] Atualizar structured data
- [ ] Revisar backlinks

## 📞 Suporte

Para dúvidas sobre implementação de SEO:
- Email: contato@programandofuturo.org
- Documentação: https://developers.google.com/search/docs

---

**Última atualização**: 17 de outubro de 2024
**Versão**: 1.0
