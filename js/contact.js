// ===== CONTACT PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    initializeContactForm();
    initializeMap();
    initializeFAQ();
    initializeSocialLinks();
}

// ===== FORMULÁRIO DE CONTATO =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Validação específica para o formulário de contato
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            submitContactForm();
        }
    });

    // Auto-resize do textarea
    const messageTextarea = document.getElementById('contactMessage');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'];
    let isValid = true;

    // Valida campos obrigatórios
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field.value.trim()) {
            FormUtils.showFieldError(field, 'Este campo é obrigatório');
            isValid = false;
        }
    });

    // Valida email
    const emailField = document.getElementById('contactEmail');
    if (emailField.value && !NGOUtils.isValidEmail(emailField.value)) {
        FormUtils.showFieldError(emailField, 'Por favor, insira um e-mail válido');
        isValid = false;
    }

    // Valida consentimento LGPD
    const lgpdConsent = form.querySelector('input[name="lgpdConsent"]');
    if (!lgpdConsent.checked) {
        FormUtils.showFieldError(lgpdConsent, 'É necessário concordar com a Política de Privacidade');
        isValid = false;
    }

    return isValid;
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Mostra loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner spinner-small"></div> Enviando...';
    
    // Coleta dados do formulário
    const formData = new FormData(form);
    const contactData = Object.fromEntries(formData.entries());
    
    // Simula envio
    setTimeout(() => {
        console.log('Dados do contato:', contactData);
        
        // Mostra sucesso
        NGOUtils.showNotification('Mensagem enviada com sucesso! Responderemos em breve.', 'success', 5000);
        
        // Limpa formulário
        form.reset();
        FormUtils.clearFormValidation(form);
        
        // Reabilita botão
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar Mensagem';
        
        // Envia email de confirmação (simulado)
        sendConfirmationEmail(contactData.contactEmail);
        
    }, 2000);
}

function sendConfirmationEmail(email) {
    // Simula envio de email de confirmação
    console.log(`Email de confirmação enviado para: ${email}`);
}

// ===== MAPA INTERATIVO =====
function initializeMap() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    // Adiciona funcionalidades ao mapa
    const iframe = mapContainer.querySelector('iframe');
    if (iframe) {
        // Adiciona loading state
        iframe.addEventListener('load', function() {
            mapContainer.classList.add('loaded');
        });

        // Fallback para erro de carregamento
        iframe.addEventListener('error', function() {
            showMapFallback();
        });
    }
}

function showMapFallback() {
    const mapContainer = document.querySelector('.map-container');
    
    mapContainer.innerHTML = `
        <div class="map-fallback">
            <div class="map-fallback-content">
                <h3>📍 Nossa Localização</h3>
                <address>
                    Rua da Tecnologia, 123<br>
                    Bairro Inovação<br>
                    São Paulo - SP<br>
                    CEP: 01234-567
                </address>
                <p>
                    <a href="https://maps.google.com/?q=Rua+da+Tecnologia+123+São+Paulo" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="btn btn-primary">
                        Ver no Google Maps
                    </a>
                </p>
            </div>
        </div>
    `;
}

// ===== FAQ INTERATIVO =====
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todos os outros itens da mesma categoria
            const category = faqItem.closest('.faq-category');
            category.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== faqItem) {
                    activeItem.classList.remove('active');
                    const activeQuestion = activeItem.querySelector('.faq-question');
                    if (activeQuestion) {
                        activeQuestion.setAttribute('aria-expanded', 'false');
                    }
                }
            });
            
            // Toggle do item atual
            if (isActive) {
                faqItem.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
            } else {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

function toggleFAQItem(item) {
    const content = item.querySelector('p');
    const icon = item.querySelector('.faq-icon');
    
    if (!content) return;
    
    const isExpanded = item.classList.contains('expanded');
    
    // Fecha todos os outros itens
    document.querySelectorAll('.faq-item.expanded').forEach(expandedItem => {
        if (expandedItem !== item) {
            expandedItem.classList.remove('expanded');
            const expandedContent = expandedItem.querySelector('p');
            const expandedIcon = expandedItem.querySelector('.faq-icon');
            
            if (expandedContent) {
                expandedContent.style.maxHeight = '0';
                expandedContent.style.opacity = '0';
            }
            if (expandedIcon) {
                expandedIcon.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    // Toggle do item atual
    if (isExpanded) {
        item.classList.remove('expanded');
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
        item.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}

// ===== LINKS SOCIAIS =====
function initializeSocialLinks() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList[1]; // segunda classe (facebook, instagram, etc.)
            trackSocialClick(platform);
            
            // Simula redirecionamento (em produção seria o link real)
            NGOUtils.showNotification(`Redirecionando para ${platform}...`, 'info', 2000);
            
            setTimeout(() => {
                // window.open(realSocialLink, '_blank');
                console.log(`Redirecionamento para ${platform}`);
            }, 1000);
        });
        
        // Adiciona animação hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function trackSocialClick(platform) {
    // Analytics tracking (Google Analytics, etc.)
    console.log(`Social click tracked: ${platform}`);
    
    // Em produção, seria algo como:
    // gtag('event', 'social_click', {
    //     'social_network': platform,
    //     'page_location': window.location.href
    // });
}

// ===== FUNCIONALIDADES ADICIONAIS =====

// Horário de atendimento dinâmico
function updateBusinessHours() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Domingo, 1 = Segunda, etc.
    
    const businessHoursElement = document.querySelector('.business-hours-status');
    if (!businessHoursElement) return;
    
    let status = '';
    let statusClass = '';
    
    // Segunda a Sexta: 8h às 18h
    // Sábado: 8h às 12h
    // Domingo: Fechado
    
    if (currentDay === 0) { // Domingo
        status = 'Fechado';
        statusClass = 'closed';
    } else if (currentDay === 6) { // Sábado
        if (currentHour >= 8 && currentHour < 12) {
            status = 'Aberto agora';
            statusClass = 'open';
        } else {
            status = 'Fechado';
            statusClass = 'closed';
        }
    } else { // Segunda a Sexta
        if (currentHour >= 8 && currentHour < 18) {
            status = 'Aberto agora';
            statusClass = 'open';
        } else {
            status = 'Fechado';
            statusClass = 'closed';
        }
    }
    
    businessHoursElement.textContent = status;
    businessHoursElement.className = `business-hours-status ${statusClass}`;
}

// Tempo de resposta estimado
function calculateResponseTime() {
    const responseTimeElement = document.querySelector('.response-time');
    if (!responseTimeElement) return;
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();
    
    let responseTime = '';
    
    // Se for horário comercial, resposta mais rápida
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 8 && currentHour < 18) {
        responseTime = 'Resposta em até 2 horas';
    } else if (currentDay === 6 && currentHour >= 8 && currentHour < 12) {
        responseTime = 'Resposta em até 4 horas';
    } else {
        responseTime = 'Resposta em até 24 horas';
    }
    
    responseTimeElement.textContent = responseTime;
}

// Inicializa funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    updateBusinessHours();
    calculateResponseTime();
    
    // Atualiza status a cada minuto
    setInterval(() => {
        updateBusinessHours();
        calculateResponseTime();
    }, 60000);
});

// Exporta funções para uso global
window.ContactUtils = {
    validateContactForm,
    submitContactForm,
    toggleFAQItem,
    trackSocialClick,
    updateBusinessHours
};
