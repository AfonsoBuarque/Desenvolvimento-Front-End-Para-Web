/**
 * Volunteer Area Management
 */

class VolunteerArea {
    constructor() {
        this.currentTab = 'oportunidades';
        this.init();
    }

    init() {
        // Check authentication
        if (!authSystem.requireAuth('volunteer')) {
            return;
        }

        // Initialize UI
        this.initTabs();
        this.initUserMenu();
        this.initFilters();
        this.updateUserInfo();
        this.loadVolunteerData();
    }

    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active tab panel
                tabPanels.forEach(panel => panel.classList.remove('active'));
                document.getElementById(`${tabName}-tab`).classList.add('active');
                
                this.currentTab = tabName;
                this.loadTabContent(tabName);
            });
        });
    }

    initUserMenu() {
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');

        if (userMenuBtn && userDropdown) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                userDropdown.classList.remove('show');
            });

            userDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    initFilters() {
        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => {
                this.filterOpportunities();
            });
        }

        // Location filter
        const locationFilter = document.getElementById('locationFilter');
        if (locationFilter) {
            locationFilter.addEventListener('change', () => {
                this.filterOpportunities();
            });
        }

        // Timeline filter
        const timelineFilters = document.querySelectorAll('.filter-btn');
        timelineFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                timelineFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterTimeline(btn.dataset.filter);
            });
        });

        // Initialize opportunity cards
        this.initOpportunityCards();
    }

    initOpportunityCards() {
        const candidateButtons = document.querySelectorAll('.opportunity-card .btn-primary');
        candidateButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCandidature(btn);
            });
        });

        const detailButtons = document.querySelectorAll('.opportunity-card .btn-outline');
        detailButtons.forEach(btn => {
            if (btn.textContent.includes('Saiba Mais')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showOpportunityDetails(btn);
                });
            }
        });
    }

    updateUserInfo() {
        const user = authSystem.getCurrentUser();
        if (user) {
            // Update user initials and name
            const userInitials = document.getElementById('userInitials');
            const userName = document.getElementById('userName');
            const volunteerName = document.getElementById('volunteerName');
            const profileInitials = document.getElementById('profileInitials');
            const profileName = document.getElementById('profileName');

            const initials = (user.firstName[0] + user.lastName[0]).toUpperCase();
            const fullName = `${user.firstName} ${user.lastName}`;

            if (userInitials) userInitials.textContent = initials;
            if (userName) userName.textContent = user.firstName;
            if (volunteerName) volunteerName.textContent = user.firstName;
            if (profileInitials) profileInitials.textContent = initials;
            if (profileName) profileName.textContent = fullName;
        }
    }

    async loadVolunteerData() {
        try {
            // Simulate loading volunteer data
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update stats with animation
            this.animateStats();
            
        } catch (error) {
            console.error('Erro ao carregar dados do voluntário:', error);
        }
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    loadTabContent(tabName) {
        switch (tabName) {
            case 'oportunidades':
                this.loadOpportunities();
                break;
            case 'historico':
                this.loadHistory();
                break;
            case 'certificados':
                this.loadCertificates();
                break;
            case 'perfil':
                this.loadProfile();
                break;
        }
    }

    async loadOpportunities() {
        // Simulate loading opportunities
        console.log('Carregando oportunidades...');
    }

    async loadHistory() {
        // Simulate loading history
        console.log('Carregando histórico...');
    }

    async loadCertificates() {
        // Simulate loading certificates
        console.log('Carregando certificados...');
        
        // Initialize certificate actions
        const downloadButtons = document.querySelectorAll('.certificate-actions .btn-primary');
        downloadButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.downloadCertificate(btn);
            });
        });
    }

    async loadProfile() {
        // Simulate loading profile
        console.log('Carregando perfil...');
    }

    filterOpportunities() {
        const categoryFilter = document.getElementById('categoryFilter');
        const locationFilter = document.getElementById('locationFilter');
        
        const selectedCategory = categoryFilter?.value || '';
        const selectedLocation = locationFilter?.value || '';
        
        const opportunityCards = document.querySelectorAll('.opportunity-card');
        
        opportunityCards.forEach(card => {
            const category = card.querySelector('.project-badge')?.textContent.toLowerCase();
            const location = card.querySelector('.detail-item span')?.textContent.toLowerCase();
            
            const categoryMatch = !selectedCategory || category?.includes(selectedCategory);
            const locationMatch = !selectedLocation || location?.includes(selectedLocation);
            
            if (categoryMatch && locationMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterTimeline(filter) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            switch (filter) {
                case 'all':
                    item.style.display = 'block';
                    break;
                case 'active':
                    if (item.classList.contains('active')) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                    break;
                case 'completed':
                    if (item.classList.contains('completed')) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                    break;
            }
        });
    }

    async handleCandidature(button) {
        const card = button.closest('.opportunity-card');
        const title = card.querySelector('.opportunity-title').textContent;
        
        // Show loading state
        const originalText = button.textContent;
        button.textContent = 'Processando...';
        button.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            this.showNotification('Candidatura enviada com sucesso!', 'success');
            
            // Update button
            button.textContent = 'Candidatura Enviada';
            button.classList.remove('btn-primary');
            button.classList.add('btn-success');
            
        } catch (error) {
            console.error('Erro ao enviar candidatura:', error);
            this.showNotification('Erro ao enviar candidatura. Tente novamente.', 'error');
            
            // Restore button
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    showOpportunityDetails(button) {
        const card = button.closest('.opportunity-card');
        const title = card.querySelector('.opportunity-title').textContent;
        
        // Create modal or redirect to details page
        this.showNotification(`Detalhes de: ${title}`, 'info');
    }

    async downloadCertificate(button) {
        const card = button.closest('.certificate-card');
        const title = card.querySelector('.certificate-preview h3').textContent;
        const project = card.querySelector('.certificate-preview p').textContent;
        
        // Show loading state
        const originalText = button.textContent;
        button.textContent = 'Baixando...';
        button.disabled = true;
        
        try {
            // Simulate download
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create fake download
            const link = document.createElement('a');
            link.href = '#';
            link.download = `certificado-${project.toLowerCase().replace(/\s+/g, '-')}.pdf`;
            link.click();
            
            this.showNotification('Certificado baixado com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao baixar certificado:', error);
            this.showNotification('Erro ao baixar certificado. Tente novamente.', 'error');
        } finally {
            // Restore button
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        
        const icons = {
            success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>',
            error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
            info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
            warning: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${icons[type]}
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize volunteer area when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VolunteerArea();
});

// Add notification animations
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
        gap: 0.75rem;
    }

    .btn-success {
        background-color: #10b981;
        border-color: #10b981;
        color: white;
    }

    .btn-success:hover {
        background-color: #059669;
        border-color: #059669;
    }
`;
document.head.appendChild(style);
