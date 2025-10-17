/**
 * Donor Area Management
 */

class DonorArea {
    constructor() {
        this.currentTab = 'doacoes';
        this.charts = {};
        this.init();
    }

    init() {
        // Check authentication
        if (!authSystem.requireAuth('donor')) {
            return;
        }

        // Initialize UI
        this.initTabs();
        this.initUserMenu();
        this.initFilters();
        this.initCharts();
        this.updateUserInfo();
        this.loadDonorData();
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

            document.addEventListener('click', () => {
                userDropdown.classList.remove('show');
            });

            userDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    initFilters() {
        const yearFilter = document.getElementById('yearFilter');
        if (yearFilter) {
            yearFilter.addEventListener('change', () => {
                this.filterDonations();
            });
        }

        // Initialize donation actions
        this.initDonationActions();
        this.initCampaignActions();
    }

    initDonationActions() {
        const receiptButtons = document.querySelectorAll('.donation-actions .btn-outline');
        receiptButtons.forEach(btn => {
            if (btn.textContent.includes('Comprovante')) {
                btn.addEventListener('click', () => {
                    this.downloadReceipt(btn);
                });
            } else if (btn.textContent.includes('Ver Impacto')) {
                btn.addEventListener('click', () => {
                    this.showImpactDetails(btn);
                });
            }
        });

        const downloadAllBtn = document.querySelector('.filters .btn-outline');
        if (downloadAllBtn && downloadAllBtn.textContent.includes('Baixar Comprovantes')) {
            downloadAllBtn.addEventListener('click', () => {
                this.downloadAllReceipts();
            });
        }
    }

    initCampaignActions() {
        const donateButtons = document.querySelectorAll('.campaign-actions .btn-primary');
        donateButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleCampaignDonation(btn);
            });
        });

        const learnMoreButtons = document.querySelectorAll('.campaign-actions .btn-outline');
        learnMoreButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.showCampaignDetails(btn);
            });
        });
    }

    initCharts() {
        const financialCtx = document.getElementById('financialChart');
        if (financialCtx) {
            this.charts.financial = new Chart(financialCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Projetos Educacionais', 'Infraestrutura', 'Administrativo', 'Marketing/Captação'],
                    datasets: [{
                        data: [65, 20, 10, 5],
                        backgroundColor: [
                            '#667eea',
                            '#16a34a',
                            '#d97706',
                            '#dc2626'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
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
            const donorName = document.getElementById('donorName');

            const initials = (user.firstName[0] + user.lastName[0]).toUpperCase();
            const fullName = `${user.firstName} ${user.lastName}`;

            if (userInitials) userInitials.textContent = initials;
            if (userName) userName.textContent = user.firstName;
            if (donorName) donorName.textContent = user.firstName;
        }
    }

    async loadDonorData() {
        try {
            // Simulate loading donor data
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update stats with animation
            this.animateStats();
            
        } catch (error) {
            console.error('Erro ao carregar dados do doador:', error);
        }
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const isMonetary = text.includes('R$');
            const target = parseInt(text.replace(/[^\d]/g, ''));
            
            if (target > 0) {
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (isMonetary) {
                        stat.textContent = 'R$ ' + Math.floor(current).toLocaleString();
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            }
        });
    }

    loadTabContent(tabName) {
        switch (tabName) {
            case 'doacoes':
                this.loadDonations();
                break;
            case 'impacto':
                this.loadImpact();
                break;
            case 'campanhas':
                this.loadCampaigns();
                break;
            case 'transparencia':
                this.loadTransparency();
                break;
        }
    }

    async loadDonations() {
        console.log('Carregando histórico de doações...');
    }

    async loadImpact() {
        console.log('Carregando dados de impacto...');
    }

    async loadCampaigns() {
        console.log('Carregando campanhas ativas...');
    }

    async loadTransparency() {
        console.log('Carregando relatórios de transparência...');
        
        // Initialize report download buttons
        const reportButtons = document.querySelectorAll('.report-actions .btn-outline');
        reportButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.downloadReport(btn);
            });
        });
    }

    filterDonations() {
        const yearFilter = document.getElementById('yearFilter');
        const selectedYear = yearFilter?.value || '';
        
        const donationItems = document.querySelectorAll('.donation-item');
        
        donationItems.forEach(item => {
            const dateText = item.querySelector('.donation-date')?.textContent || '';
            const itemYear = dateText.includes('2024') ? '2024' : '2023';
            
            if (!selectedYear || itemYear === selectedYear) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    async downloadReceipt(button) {
        const donationItem = button.closest('.donation-item');
        const donationTitle = donationItem.querySelector('.donation-details h4').textContent;
        
        const originalText = button.textContent;
        button.textContent = 'Baixando...';
        button.disabled = true;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulate download
            const link = document.createElement('a');
            link.href = '#';
            link.download = `comprovante-${donationTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`;
            link.click();
            
            this.showNotification('Comprovante baixado com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao baixar comprovante:', error);
            this.showNotification('Erro ao baixar comprovante. Tente novamente.', 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    showImpactDetails(button) {
        const donationItem = button.closest('.donation-item');
        const donationTitle = donationItem.querySelector('.donation-details h4').textContent;
        
        this.showNotification(`Detalhes do impacto: ${donationTitle}`, 'info');
    }

    async downloadAllReceipts() {
        const button = document.querySelector('.filters .btn-outline');
        const originalText = button.textContent;
        
        button.textContent = 'Preparando...';
        button.disabled = true;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate zip download
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'comprovantes-2024.zip';
            link.click();
            
            this.showNotification('Arquivo ZIP com todos os comprovantes baixado!', 'success');
            
        } catch (error) {
            console.error('Erro ao baixar comprovantes:', error);
            this.showNotification('Erro ao preparar arquivo. Tente novamente.', 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    handleCampaignDonation(button) {
        const campaignCard = button.closest('.campaign-card');
        const campaignTitle = campaignCard.querySelector('h3').textContent;
        
        // Redirect to donation page with campaign parameter
        window.location.href = `doacoes.html?campanha=${encodeURIComponent(campaignTitle)}`;
    }

    showCampaignDetails(button) {
        const campaignCard = button.closest('.campaign-card');
        const campaignTitle = campaignCard.querySelector('h3').textContent;
        
        this.showNotification(`Detalhes da campanha: ${campaignTitle}`, 'info');
    }

    async downloadReport(button) {
        const reportItem = button.closest('.report-item');
        const reportTitle = reportItem.querySelector('h4').textContent;
        
        const originalText = button.textContent;
        button.textContent = 'Baixando...';
        button.disabled = true;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulate download
            const link = document.createElement('a');
            link.href = '#';
            link.download = `${reportTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`;
            link.click();
            
            this.showNotification('Relatório baixado com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao baixar relatório:', error);
            this.showNotification('Erro ao baixar relatório. Tente novamente.', 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    showNotification(message, type = 'info') {
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

// Initialize donor area when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DonorArea();
});

// Add specific styles for donor area
const style = document.createElement('style');
style.textContent = `
    .donations-summary {
        margin-bottom: 2rem;
    }

    .summary-card {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        border: 1px solid #e2e8f0;
    }

    .summary-card h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 1.5rem 0;
    }

    .summary-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
    }

    .summary-item .label {
        font-weight: 500;
        color: var(--text-secondary);
    }

    .summary-item .value {
        font-weight: 700;
        color: var(--text-primary);
        font-size: 1.125rem;
    }

    .donations-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .donation-item {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        transition: all 0.3s ease;
    }

    .donation-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .donation-info {
        flex: 1;
        display: flex;
        gap: 1rem;
    }

    .donation-date {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-secondary);
        min-width: 80px;
    }

    .donation-details h4 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 0.25rem 0;
    }

    .donation-details p {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin: 0;
    }

    .donation-amount {
        text-align: right;
        min-width: 120px;
    }

    .donation-amount .amount {
        display: block;
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--text-primary);
    }

    .donation-amount .method {
        font-size: 0.75rem;
        color: var(--text-secondary);
    }

    .donation-actions {
        display: flex;
        gap: 0.5rem;
    }

    .impact-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
    }

    .impact-card {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        border: 1px solid #e2e8f0;
    }

    .impact-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .impact-header h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
    }

    .impact-badge {
        padding: 0.25rem 0.75rem;
        background: #dcfce7;
        color: #16a34a;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .impact-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .impact-stats .stat {
        text-align: center;
    }

    .impact-stats .number {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary-color);
    }

    .impact-stats .label {
        font-size: 0.75rem;
        color: var(--text-secondary);
        margin-top: 0.25rem;
    }

    .impact-description {
        margin-bottom: 1.5rem;
    }

    .impact-description p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin: 0;
    }

    .impact-progress {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .progress-bar {
        width: 100%;
        height: 8px;
        background: #e2e8f0;
        border-radius: 4px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: var(--primary-color);
        transition: width 0.3s ease;
    }

    .progress-text {
        font-size: 0.875rem;
        color: var(--text-secondary);
        text-align: center;
    }

    .testimonials-section h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 1.5rem 0;
    }

    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .testimonial-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
    }

    .testimonial-card blockquote {
        font-style: italic;
        color: var(--text-secondary);
        margin: 0 0 1rem 0;
        line-height: 1.6;
    }

    .testimonial-card cite {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .testimonial-card cite strong {
        color: var(--text-primary);
        font-weight: 600;
    }

    .testimonial-card cite span {
        font-size: 0.875rem;
        color: var(--text-secondary);
    }

    .campaigns-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1.5rem;
    }

    .campaign-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
    }

    .campaign-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    .campaign-image {
        height: 200px;
        overflow: hidden;
    }

    .campaign-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .campaign-content {
        padding: 1.5rem;
    }

    .campaign-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 0.75rem 0;
    }

    .campaign-content p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin: 0 0 1.5rem 0;
    }

    .campaign-progress {
        margin-bottom: 1.5rem;
    }

    .progress-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .progress-info .raised {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--text-primary);
    }

    .progress-info .goal {
        font-size: 0.875rem;
        color: var(--text-secondary);
    }

    .progress-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
    }

    .campaign-actions {
        display: flex;
        gap: 0.75rem;
    }

    .transparency-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .financial-summary {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        border: 1px solid #e2e8f0;
    }

    .financial-summary h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 1.5rem 0;
    }

    .financial-chart {
        height: 250px;
        margin-bottom: 1.5rem;
    }

    .financial-details {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .financial-details .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: #f8fafc;
        border-radius: 6px;
    }

    .financial-details .category {
        font-weight: 500;
        color: var(--text-primary);
    }

    .financial-details .percentage {
        font-weight: 600;
        color: var(--primary-color);
    }

    .financial-details .amount {
        font-weight: 600;
        color: var(--text-primary);
    }

    .reports-list {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        border: 1px solid #e2e8f0;
    }

    .reports-list h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 1.5rem 0;
    }

    .report-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
    }

    .report-item:hover {
        background-color: #f8fafc;
    }

    .report-item:last-child {
        margin-bottom: 0;
    }

    .report-info h4 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 0.5rem 0;
    }

    .report-info p {
        color: var(--text-secondary);
        margin: 0 0 0.5rem 0;
    }

    .report-date {
        font-size: 0.875rem;
        color: var(--text-secondary);
    }

    @media (max-width: 768px) {
        .transparency-content {
            grid-template-columns: 1fr;
        }
        
        .donation-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .donation-info {
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .donation-actions {
            width: 100%;
            justify-content: flex-end;
        }
        
        .impact-stats {
            grid-template-columns: 1fr;
        }
        
        .campaign-actions {
            flex-direction: column;
        }
        
        .report-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
    }
`;
document.head.appendChild(style);
