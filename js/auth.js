/**
 * Authentication System
 * Handles login, registration, and user session management
 */

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check for existing session
        this.loadSession();
        
        // Initialize forms
        this.initLoginForm();
        this.initRegisterForm();
        this.initPasswordToggles();
        
        // Setup navigation
        this.updateNavigation();
    }

    // Session Management
    loadSession() {
        const userData = localStorage.getItem('programandoFuturo_user');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.redirectToDashboard();
            } catch (error) {
                console.error('Erro ao carregar sessão:', error);
                this.logout();
            }
        }
    }

    saveSession(userData) {
        this.currentUser = userData;
        localStorage.setItem('programandoFuturo_user', JSON.stringify(userData));
        
        // Save login timestamp
        localStorage.setItem('programandoFuturo_loginTime', Date.now().toString());
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('programandoFuturo_user');
        localStorage.removeItem('programandoFuturo_loginTime');
        window.location.href = 'index.html';
    }

    // User Type Detection and Redirection
    redirectToDashboard() {
        if (!this.currentUser) return;

        const userType = this.currentUser.userType;
        const currentPage = window.location.pathname.split('/').pop();
        
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        // Don't redirect if already on appropriate page
        if (currentPage.includes('dashboard') || currentPage.includes('admin') || currentPage.includes('area-')) {
=======
=======
>>>>>>> Stashed changes
        // Don't redirect if already on appropriate page or on public pages
        if (currentPage.includes('dashboard') || 
            currentPage.includes('admin') || 
            currentPage.includes('area-') ||
            currentPage === 'index.html' ||
            currentPage === '' ||
            currentPage.includes('projetos') ||
            currentPage.includes('voluntariado') ||
            currentPage.includes('doacoes') ||
            currentPage.includes('transparencia') ||
            currentPage.includes('contato')) {
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            return;
        }

        switch (userType) {
            case 'admin':
                window.location.href = 'admin/dashboard.html';
                break;
            case 'volunteer':
                window.location.href = 'area-voluntario.html';
                break;
            case 'donor':
                window.location.href = 'area-doador.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    }

    // Form Initialization
    initLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (!loginForm) return;

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleLogin(loginForm);
        });
    }

    initRegisterForm() {
        const registerForm = document.getElementById('registerForm');
        if (!registerForm) return;

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleRegister(registerForm);
        });

        // Real-time validation
        const passwordInput = registerForm.querySelector('#password');
        const confirmPasswordInput = registerForm.querySelector('#confirmPassword');
        
        if (passwordInput && confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', () => {
                this.validatePasswordMatch(passwordInput, confirmPasswordInput);
            });
        }
    }

    initPasswordToggles() {
        const passwordToggles = document.querySelectorAll('.password-toggle');
        
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const input = toggle.parentElement.querySelector('input');
                const isPassword = input.type === 'password';
                
                input.type = isPassword ? 'text' : 'password';
                
                // Update icon
                const icon = toggle.querySelector('svg');
                if (isPassword) {
                    icon.innerHTML = `
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                    `;
                } else {
                    icon.innerHTML = `
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    `;
                }
            });
        });
    }

    // Login Handler
    async handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const remember = formData.get('remember');

        // Clear previous errors
        this.clearFormErrors(form);

        // Validate inputs
        if (!this.validateEmail(email)) {
            this.showFieldError('email', 'Por favor, insira um e-mail válido');
            return;
        }

        if (!password) {
            this.showFieldError('password', 'Por favor, insira sua senha');
            return;
        }

        // Show loading state
        this.setFormLoading(form, true);

        try {
            // Simulate API call
            const userData = await this.authenticateUser(email, password);
            
            if (userData) {
                // Save session
                this.saveSession(userData);
                
                // Show success message
                this.showSuccessMessage('Login realizado com sucesso!');
                
                // Redirect after short delay
                setTimeout(() => {
                    this.redirectToDashboard();
                }, 1500);
            } else {
                this.showFieldError('password', 'E-mail ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            this.showFieldError('password', 'Erro interno. Tente novamente.');
        } finally {
            this.setFormLoading(form, false);
        }
    }

    // Register Handler
    async handleRegister(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Clear previous errors
        this.clearFormErrors(form);

        // Validate inputs
        const validation = this.validateRegistrationData(data);
        if (!validation.isValid) {
            validation.errors.forEach(error => {
                this.showFieldError(error.field, error.message);
            });
            return;
        }

        // Show loading state
        this.setFormLoading(form, true);

        try {
            // Simulate API call
            const userData = await this.registerUser(data);
            
            if (userData) {
                // Save session
                this.saveSession(userData);
                
                // Show success message
                this.showSuccessMessage('Conta criada com sucesso!');
                
                // Redirect after short delay
                setTimeout(() => {
                    this.redirectToDashboard();
                }, 1500);
            } else {
                this.showFieldError('email', 'Este e-mail já está em uso');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            this.showFieldError('email', 'Erro interno. Tente novamente.');
        } finally {
            this.setFormLoading(form, false);
        }
    }

    // Validation Methods
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return phoneRegex.test(phone);
    }

    validatePassword(password) {
        return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
    }

    validatePasswordMatch(passwordInput, confirmPasswordInput) {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword && password !== confirmPassword) {
            this.showFieldError('confirmPassword', 'As senhas não coincidem');
            return false;
        } else {
            this.clearFieldError('confirmPassword');
            return true;
        }
    }

    validateRegistrationData(data) {
        const errors = [];

        if (!data.firstName?.trim()) {
            errors.push({ field: 'firstName', message: 'Nome é obrigatório' });
        }

        if (!data.lastName?.trim()) {
            errors.push({ field: 'lastName', message: 'Sobrenome é obrigatório' });
        }

        if (!this.validateEmail(data.email)) {
            errors.push({ field: 'email', message: 'E-mail inválido' });
        }

        if (!this.validatePhone(data.phone)) {
            errors.push({ field: 'phone', message: 'Telefone deve estar no formato (11) 99999-9999' });
        }

        if (!data.userType) {
            errors.push({ field: 'userType', message: 'Selecione o tipo de usuário' });
        }

        if (!this.validatePassword(data.password)) {
            errors.push({ field: 'password', message: 'Senha deve ter pelo menos 8 caracteres, incluindo letras e números' });
        }

        if (data.password !== data.confirmPassword) {
            errors.push({ field: 'confirmPassword', message: 'As senhas não coincidem' });
        }

        if (!data.terms) {
            errors.push({ field: 'terms', message: 'Você deve aceitar os termos de uso' });
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // API Simulation Methods
    async authenticateUser(email, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock user database
        const users = [
            {
                id: 1,
                email: 'admin@programandofuturo.org',
                password: 'admin123',
                userType: 'admin',
                firstName: 'Administrador',
                lastName: 'Sistema',
                phone: '(11) 99999-9999'
            },
            {
                id: 2,
                email: 'voluntario@teste.com',
                password: 'voluntario123',
                userType: 'volunteer',
                firstName: 'João',
                lastName: 'Silva',
                phone: '(11) 98888-8888'
            },
            {
                id: 3,
                email: 'doador@teste.com',
                password: 'doador123',
                userType: 'donor',
                firstName: 'Maria',
                lastName: 'Santos',
                phone: '(11) 97777-7777'
            }
        ];

        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Don't return password
            const { password: _, ...userData } = user;
            return userData;
        }

        return null;
    }

    async registerUser(data) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Check if email already exists (mock)
        const existingEmails = [
            'admin@programandofuturo.org',
            'teste@existe.com'
        ];

        if (existingEmails.includes(data.email)) {
            return null;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            email: data.email,
            userType: data.userType,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            newsletter: data.newsletter === 'on',
            createdAt: new Date().toISOString()
        };

        return newUser;
    }

    // UI Helper Methods
    showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.add('error');
        }
    }

    clearFieldError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }

        const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.remove('error');
        }
    }

    clearFormErrors(form) {
        const errorElements = form.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.classList.remove('show');
        });

        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }

    setFormLoading(form, loading) {
        if (loading) {
            form.classList.add('loading');
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processando...';
            }
        } else {
            form.classList.remove('loading');
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = false;
                const isLogin = form.id === 'loginForm';
                submitBtn.textContent = isLogin ? 'Entrar' : 'Criar conta';
            }
        }
    }

    showSuccessMessage(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    updateNavigation() {
        // Add login/logout buttons to navigation
        const navbar = document.querySelector('.navbar-menu');
        if (!navbar) return;

        // Remove existing auth buttons
        const existingAuthButtons = navbar.querySelectorAll('.auth-button');
        existingAuthButtons.forEach(btn => btn.remove());

        if (this.currentUser) {
            // Add user menu
            const userMenu = document.createElement('li');
            userMenu.className = 'auth-button';
            userMenu.innerHTML = `
                <div class="user-menu">
                    <button class="user-menu-toggle">
                        ${this.currentUser.firstName} ▼
                    </button>
                    <div class="user-menu-dropdown">
                        <a href="${this.getDashboardUrl()}">Minha Área</a>
                        <a href="#" onclick="authSystem.logout()">Sair</a>
                    </div>
                </div>
            `;
            navbar.appendChild(userMenu);
        } else {
            // Add login button
            const loginButton = document.createElement('li');
            loginButton.className = 'auth-button';
            loginButton.innerHTML = '<a href="login.html" class="nav-link">Entrar</a>';
            navbar.appendChild(loginButton);
        }
    }

    getDashboardUrl() {
        if (!this.currentUser) return 'login.html';

        switch (this.currentUser.userType) {
            case 'admin':
                return 'admin/dashboard.html';
            case 'volunteer':
                return 'area-voluntario.html';
            case 'donor':
                return 'area-doador.html';
            default:
                return 'index.html';
        }
    }

    // Public methods for external use
    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    requireAuth(requiredUserType = null) {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }

        if (requiredUserType && this.currentUser.userType !== requiredUserType) {
            window.location.href = 'index.html';
            return false;
        }

        return true;
    }
}

// Initialize authentication system
const authSystem = new AuthSystem();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .user-menu {
        position: relative;
    }

    .user-menu-toggle {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }

    .user-menu-toggle:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    .user-menu-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        min-width: 150px;
        display: none;
        z-index: 1000;
    }

    .user-menu:hover .user-menu-dropdown {
        display: block;
    }

    .user-menu-dropdown a {
        display: block;
        padding: 0.75rem 1rem;
        color: var(--text-primary);
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .user-menu-dropdown a:hover {
        background-color: var(--gray-50);
    }

    .form-group input.error,
    .form-group select.error {
        border-color: var(--error-color);
        background-color: #fef2f2;
    }
`;
document.head.appendChild(style);
