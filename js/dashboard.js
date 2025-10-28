/**
 * Dashboard Management System
 */

class DashboardManager {
    constructor() {
        this.currentSection = 'dashboard';
        this.charts = {};
        this.init();
    }

    init() {
        // Check authentication
        if (!authSystem.requireAuth('admin')) {
            return;
        }

        // Initialize UI
        this.initSidebar();
        this.initNavigation();
        this.initCharts();
        this.updateUserInfo();
        this.loadDashboardData();
    }

    initSidebar() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.toggle('show');
                } else {
                    sidebar.classList.toggle('collapsed');
                    mainContent.classList.toggle('sidebar-collapsed');
                }
            });
        }

        // Close sidebar on mobile when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        });
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
            });
        });
    }

    showSection(sectionName) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            projetos: 'Gestão de Projetos',
            voluntarios: 'Gestão de Voluntários',
            doacoes: 'Gestão de Doações',
            campanhas: 'Campanhas de Arrecadação',
            relatorios: 'Relatórios e Analytics',
            configuracoes: 'Configurações do Sistema'
        };
        document.getElementById('pageTitle').textContent = titles[sectionName] || 'Dashboard';

        // Show section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');

        this.currentSection = sectionName;
    }

    initCharts() {
        // Donations Chart
        const donationsCtx = document.getElementById('donationsChart');
        if (donationsCtx) {
            this.charts.donations = new Chart(donationsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [{
                        label: 'Doações (R$)',
                        data: [12000, 15000, 18000, 22000, 19000, 25000, 28000, 32000, 29000, 35000, 38000, 42000],
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Projects Chart
        const projectsCtx = document.getElementById('projectsChart');
        if (projectsCtx) {
            this.charts.projects = new Chart(projectsCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Educação', 'Empoderamento', 'Inclusão', 'Inovação'],
                    datasets: [{
                        data: [15, 12, 8, 12],
                        backgroundColor: [
                            '#667eea',
                            '#16a34a',
                            '#d97706',
                            '#dc2626'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    updateUserInfo() {
        const user = authSystem.getCurrentUser();
        if (user) {
            const userInitials = document.getElementById('userInitials');
            const userName = document.getElementById('userName');
            
            if (userInitials) {
                userInitials.textContent = (user.firstName[0] + user.lastName[0]).toUpperCase();
            }
            
            if (userName) {
                userName.textContent = `${user.firstName} ${user.lastName}`;
            }
        }
    }

    async loadDashboardData() {
        try {
            // Simulate loading dashboard data
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update stats with animation
            this.animateCounters();
            
        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
=======
=======
>>>>>>> Stashed changes
            // Usa o atributo data-value se existir, senão tenta fazer parse do texto
            const dataValue = counter.getAttribute('data-value');
            const isCurrency = counter.getAttribute('data-currency') === 'true';
            
            if (!dataValue) {
                console.warn('Contador sem data-value:', counter);
                return;
            }
            
            const target = parseInt(dataValue);
            
            if (isNaN(target) || target === 0) {
                console.warn('Valor inválido para contador:', dataValue);
                return;
            }
            
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                if (counter.textContent.includes('R$')) {
                    counter.textContent = 'R$ ' + Math.floor(current).toLocaleString();
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
=======
=======
>>>>>>> Stashed changes
                const roundedValue = Math.floor(current);
                
                if (isCurrency) {
                    counter.textContent = 'R$ ' + roundedValue.toLocaleString('pt-BR');
                } else {
                    counter.textContent = roundedValue.toLocaleString('pt-BR');
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                }
            }, 16);
        });
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});
