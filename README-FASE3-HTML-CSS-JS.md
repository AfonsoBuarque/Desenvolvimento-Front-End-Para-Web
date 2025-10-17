# ⚡ Documentação Técnica - Fase 3: HTML + CSS + JavaScript

## 📋 Informações do Projeto

**Atividade:** Desenvolvimento Front-End Para Web  
**Turma:** 005  
**Aluno:** Afonso Buarque Silva Gusmão  
**RGM:** 462812820  
**Fase:** 3 - Interatividade com JavaScript  

---

## 🎯 Objetivo da Fase 3

Adicionar interatividade completa ao site da ONG Programando o Futuro com JavaScript, focando em:
- Validação de formulários
- Integração com APIs externas
- Animações dinâmicas
- Manipulação do DOM
- Gerenciamento de estado
- Autenticação simulada

---

## 📁 Estrutura de Arquivos JavaScript

```
js/
├── main.js              # Scripts globais e navegação
├── forms.js             # Validação de formulários
├── volunteer.js         # Formulário de voluntário + ViaCEP
├── projects.js          # Filtros e modal de projetos
├── auth.js              # Sistema de autenticação
├── volunteer-area.js    # Área do voluntário
├── donor-area.js        # Área do doador
└── dashboard.js         # Dashboard administrativo
```

---

## 🔧 Funcionalidades Implementadas

### 1. **Navegação e Menu Mobile**

**Arquivo:** `main.js`

```javascript
// Toggle menu mobile
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle?.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    navbarToggle.setAttribute('aria-expanded', 
        navbarMenu.classList.contains('active'));
});

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Contador animado
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animar contadores
            if (entry.target.classList.contains('counter-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.counter-number, .fade-in-element')
    .forEach(el => observer.observe(el));
```

---

### 2. **Validação de Formulários**

**Arquivo:** `forms.js`

```javascript
// Validação genérica de formulários
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }
    
    init() {
        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });
        
        // Validação em tempo real
        this.form?.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearError(field));
        });
    }
    
    validateForm() {
        let isValid = true;
        const fields = this.form.querySelectorAll('[required]');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Campo vazio
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }
        
        // Email
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Email inválido';
            }
        }
        
        // Telefone
        else if (field.name === 'phone' && value) {
            const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Telefone inválido. Use: (11) 99999-9999';
            }
        }
        
        // CPF
        else if (field.name === 'cpf' && value) {
            if (!this.validateCPF(value)) {
                isValid = false;
                errorMessage = 'CPF inválido';
            }
        }
        
        // Mostrar/ocultar erro
        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }
        
        return isValid;
    }
    
    validateCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        if (cpf.length !== 11) return false;
        
        // Validação básica de CPF
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let digit = 11 - (sum % 11);
        if (digit >= 10) digit = 0;
        if (digit !== parseInt(cpf.charAt(9))) return false;
        
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        digit = 11 - (sum % 11);
        if (digit >= 10) digit = 0;
        if (digit !== parseInt(cpf.charAt(10))) return false;
        
        return true;
    }
    
    showError(field, message) {
        field.classList.add('error');
        const errorDiv = field.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }
    
    clearError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
    }
    
    submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        console.log('Dados do formulário:', data);
        
        // Simular envio
        this.showSuccess('Formulário enviado com sucesso!');
        this.form.reset();
    }
    
    showSuccess(message) {
        // Criar e mostrar mensagem de sucesso
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        this.form.prepend(successDiv);
        
        setTimeout(() => successDiv.remove(), 5000);
    }
}

// Máscaras de input
function applyMasks() {
    // Telefone
    document.querySelectorAll('input[name="phone"]').forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }
            
            e.target.value = value;
        });
    });
    
    // CPF
    document.querySelectorAll('input[name="cpf"]').forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            
            e.target.value = value;
        });
    });
    
    // CEP
    document.querySelectorAll('input[name="cep"]').forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);
            
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            
            e.target.value = value;
        });
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    applyMasks();
});
```

---

### 3. **Integração com ViaCEP**

**Arquivo:** `volunteer.js`

```javascript
// Busca de CEP com ViaCEP API
class CEPLookup {
    constructor(cepInputId) {
        this.cepInput = document.getElementById(cepInputId);
        this.init();
    }
    
    init() {
        this.cepInput?.addEventListener('blur', () => {
            const cep = this.cepInput.value.replace(/\D/g, '');
            if (cep.length === 8) {
                this.fetchAddress(cep);
            }
        });
    }
    
    async fetchAddress(cep) {
        try {
            // Mostrar loading
            this.setLoadingState(true);
            
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (data.erro) {
                throw new Error('CEP não encontrado');
            }
            
            // Preencher campos
            this.fillAddressFields(data);
            
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            this.showError('CEP não encontrado. Verifique e tente novamente.');
            this.clearAddressFields();
        } finally {
            this.setLoadingState(false);
        }
    }
    
    fillAddressFields(data) {
        const fields = {
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf,
            ibge: data.ibge
        };
        
        Object.entries(fields).forEach(([name, value]) => {
            const field = document.getElementById(name);
            if (field) {
                field.value = value;
                field.readOnly = true;
            }
        });
    }
    
    clearAddressFields() {
        ['rua', 'bairro', 'cidade', 'uf', 'ibge'].forEach(name => {
            const field = document.getElementById(name);
            if (field) {
                field.value = '';
            }
        });
    }
    
    setLoadingState(isLoading) {
        ['rua', 'bairro', 'cidade', 'uf', 'ibge'].forEach(name => {
            const field = document.getElementById(name);
            if (field) {
                field.value = isLoading ? '...' : '';
                field.disabled = isLoading;
            }
        });
    }
    
    showError(message) {
        const errorDiv = this.cepInput.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        }
    }
}

// Inicializar validação do formulário de voluntário
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator('volunteerForm');
    new CEPLookup('cep');
});
```

---

### 4. **Filtros de Projetos**

**Arquivo:** `projects.js`

```javascript
// Sistema de filtros de projetos
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.searchInput = document.getElementById('projectSearch');
        this.init();
    }
    
    init() {
        // Filtros por categoria
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterProjects(filter);
                this.setActiveButton(btn);
            });
        });
        
        // Busca por texto
        this.searchInput?.addEventListener('input', (e) => {
            this.searchProjects(e.target.value);
        });
    }
    
    filterProjects(category) {
        this.projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => card.classList.add('fade-in'), 10);
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
    }
    
    searchProjects(query) {
        const searchTerm = query.toLowerCase();
        
        this.projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    setActiveButton(activeBtn) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}

// Modal de detalhes do projeto
class ProjectModal {
    constructor() {
        this.modal = document.getElementById('projectModal');
        this.detailButtons = document.querySelectorAll('.project-details-btn');
        this.closeButtons = document.querySelectorAll('.modal-close');
        this.init();
    }
    
    init() {
        this.detailButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = btn.dataset.project;
                this.openModal(projectId);
            });
        });
        
        this.closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });
        
        // Fechar ao clicar fora
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }
    
    openModal(projectId) {
        // Buscar dados do projeto (simulado)
        const projectData = this.getProjectData(projectId);
        this.renderModalContent(projectData);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    getProjectData(projectId) {
        // Dados simulados
        const projects = {
            codekids: {
                title: 'CodeKids',
                description: 'Ensino de programação para crianças...',
                details: 'Detalhes completos do projeto...'
            },
            // ... outros projetos
        };
        
        return projects[projectId] || {};
    }
    
    renderModalContent(data) {
        const modalTitle = this.modal.querySelector('#modalTitle');
        const modalContent = this.modal.querySelector('#modalContent');
        
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalContent) modalContent.innerHTML = `
            <p>${data.description}</p>
            <div class="project-details">${data.details}</div>
        `;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new ProjectFilter();
    new ProjectModal();
});
```

---

### 5. **Sistema de Autenticação**

**Arquivo:** `auth.js`

```javascript
// Sistema de autenticação simulado
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        // Verificar se há usuário logado
        this.currentUser = this.getStoredUser();
        this.updateUI();
        
        // Login form
        const loginForm = document.getElementById('loginForm');
        loginForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e.target);
        });
        
        // Cadastro form
        const signupForm = document.getElementById('signupForm');
        signupForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup(e.target);
        });
        
        // Logout buttons
        document.querySelectorAll('.logout-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleLogout());
        });
    }
    
    handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Simular autenticação
        const user = {
            email: email,
            name: 'Usuário Teste',
            role: 'volunteer', // volunteer, donor, admin
            id: Date.now()
        };
        
        this.setUser(user);
        this.redirectToDashboard(user.role);
    }
    
    handleSignup(form) {
        const formData = new FormData(form);
        const user = {
            email: formData.get('email'),
            name: formData.get('name'),
            role: formData.get('role') || 'volunteer',
            id: Date.now()
        };
        
        this.setUser(user);
        this.redirectToDashboard(user.role);
    }
    
    handleLogout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = '/index.html';
    }
    
    setUser(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    getStoredUser() {
        const stored = localStorage.getItem('currentUser');
        return stored ? JSON.parse(stored) : null;
    }
    
    redirectToDashboard(role) {
        const dashboards = {
            volunteer: '/area-voluntario.html',
            donor: '/area-doador.html',
            admin: '/admin/dashboard.html'
        };
        
        window.location.href = dashboards[role] || '/index.html';
    }
    
    updateUI() {
        const loginBtn = document.querySelector('.login-btn');
        const userMenu = document.querySelector('.user-menu');
        
        if (this.currentUser) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (userMenu) {
                userMenu.style.display = 'block';
                userMenu.querySelector('.user-name').textContent = this.currentUser.name;
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (userMenu) userMenu.style.display = 'none';
        }
    }
    
    requireAuth() {
        if (!this.currentUser) {
            window.location.href = '/login.html';
        }
    }
}

// Inicializar
const auth = new AuthSystem();

// Proteger páginas privadas
if (window.location.pathname.includes('area-') || window.location.pathname.includes('dashboard')) {
    auth.requireAuth();
}
```

---

## 📊 Funcionalidades por Página

### index.html
- ✅ Contador animado
- ✅ Smooth scroll
- ✅ Carousel de depoimentos
- ✅ Newsletter form validation

### projetos.html
- ✅ Filtros de categoria
- ✅ Busca por texto
- ✅ Modal de detalhes
- ✅ Animações de cards

### voluntariado.html
- ✅ Validação completa
- ✅ Integração ViaCEP
- ✅ Máscaras de input
- ✅ Checkboxes dinâmicos

### doacoes.html
- ✅ Seleção de plano
- ✅ Cálculo de valores
- ✅ Validação de pagamento

### Áreas de Usuário
- ✅ Autenticação
- ✅ Dashboard dinâmico
- ✅ Gráficos (Chart.js)
- ✅ Filtros e busca

---

## 🛠️ Tecnologias e APIs

### APIs Externas
- **ViaCEP**: Busca de endereço por CEP
- **Chart.js**: Gráficos e visualizações

### Recursos JavaScript
- Fetch API
- LocalStorage
- IntersectionObserver
- FormData
- Async/Await

---

## ✅ Checklist

- [x] Navegação responsiva
- [x] Validação de formulários
- [x] Integração ViaCEP
- [x] Filtros e busca
- [x] Modais
- [x] Autenticação simulada
- [x] Animações dinâmicas
- [x] LocalStorage
- [x] Máscaras de input
- [x] Gráficos (Chart.js)

---

**Data de Conclusão:** 17 de outubro de 2024  
**Status:** ✅ Concluído
