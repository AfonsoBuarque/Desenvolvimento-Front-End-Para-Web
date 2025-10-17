// ===== VOLUNTEER FORM HANDLER =====

document.addEventListener('DOMContentLoaded', function() {
    initializeVolunteerForm();
});

function initializeVolunteerForm() {
    console.log('Inicializando formulário de voluntário...');
    
    // Inicializa funcionalidades específicas do voluntário
    initializeVolunteerCEP();
    initializeVolunteerValidation();
    initializeVolunteerSubmission();
    initializeVolunteerCounters();
}

// ===== CEP LOOKUP ESPECÍFICO PARA VOLUNTÁRIO =====
function initializeVolunteerCEP() {
    console.log('Inicializando busca de CEP para voluntário...');
    
    const cepField = document.getElementById('cep');
    if (!cepField) {
        console.log('Campo CEP não encontrado');
        return;
    }
    
    console.log('Campo CEP encontrado, adicionando listeners...');
    
    function limpaFormularioCep() {
        // Limpa valores do formulário de cep
        const ruaField = document.getElementById('rua');
        const bairroField = document.getElementById('bairro');
        const cidadeField = document.getElementById('cidade');
        const ufField = document.getElementById('uf');
        const ibgeField = document.getElementById('ibge');
        
        if (ruaField) ruaField.value = "";
        if (bairroField) bairroField.value = "";
        if (cidadeField) cidadeField.value = "";
        if (ufField) ufField.value = "";
        if (ibgeField) ibgeField.value = "";
        
        console.log('Campos de endereço limpos');
    }
    
    // Quando o campo cep perde o foco
    cepField.addEventListener('blur', async function() {
        console.log('CEP blur event - Valor:', this.value);
        
        // Nova variável "cep" somente com dígitos
        const cep = this.value.replace(/\D/g, '');
        console.log('CEP limpo:', cep);
        
        // Verifica se campo cep possui valor informado
        if (cep != "") {
            // Expressão regular para validar o CEP
            const validacep = /^[0-9]{8}$/;
            
            // Valida o formato do CEP
            if (validacep.test(cep)) {
                console.log('CEP válido, iniciando consulta...');
                
                const fieldContainer = this.closest('.form-group');
                
                // Busca os campos de endereço
                const ruaField = document.getElementById('rua');
                const bairroField = document.getElementById('bairro');
                const cidadeField = document.getElementById('cidade');
                const ufField = document.getElementById('uf');
                const ibgeField = document.getElementById('ibge');
                
                console.log('Campos encontrados:', {
                    rua: !!ruaField,
                    bairro: !!bairroField,
                    cidade: !!cidadeField,
                    uf: !!ufField,
                    ibge: !!ibgeField
                });
                
                // Preenche os campos com "..." enquanto consulta webservice
                if (ruaField) ruaField.value = "...";
                if (bairroField) bairroField.value = "...";
                if (cidadeField) cidadeField.value = "...";
                if (ufField) ufField.value = "...";
                if (ibgeField) ibgeField.value = "...";
                
                // Adiciona classe de loading
                if (fieldContainer) {
                    fieldContainer.classList.add('loading');
                    fieldContainer.classList.remove('error', 'success');
                }
                
                try {
                    console.log('Fazendo requisição para ViaCEP:', cep);
                    
                    // Consulta o webservice viacep.com.br/
                    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    console.log('Resposta recebida - Status:', response.status);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const dados = await response.json();
                    console.log('Dados do CEP recebidos:', dados);
                    
                    if (!("erro" in dados)) {
                        // Atualiza os campos com os valores da consulta
                        if (ruaField) {
                            ruaField.value = dados.logradouro || "";
                            console.log('Rua preenchida:', dados.logradouro);
                        }
                        if (bairroField) {
                            bairroField.value = dados.bairro || "";
                            console.log('Bairro preenchido:', dados.bairro);
                        }
                        if (cidadeField) {
                            cidadeField.value = dados.localidade || "";
                            console.log('Cidade preenchida:', dados.localidade);
                        }
                        if (ufField) {
                            ufField.value = dados.uf || "";
                            console.log('UF preenchido:', dados.uf);
                        }
                        if (ibgeField) {
                            ibgeField.value = dados.ibge || "";
                            console.log('IBGE preenchido:', dados.ibge);
                        }
                        
                        // Remove loading e adiciona success
                        if (fieldContainer) {
                            fieldContainer.classList.remove('loading');
                            fieldContainer.classList.add('success');
                        }
                        
                        console.log('✅ CEP preenchido com sucesso!');
                        
                        // Mostra notificação de sucesso
                        if (window.NGOUtils && window.NGOUtils.showNotification) {
                            window.NGOUtils.showNotification('Endereço preenchido automaticamente!', 'success', 3000);
                        }
                        
                    } else {
                        // CEP pesquisado não foi encontrado
                        console.log('❌ CEP não encontrado');
                        limpaFormularioCep();
                        
                        if (fieldContainer) {
                            fieldContainer.classList.remove('loading');
                            fieldContainer.classList.add('error');
                        }
                        
                        showVolunteerFieldError(cepField, 'CEP não encontrado.');
                    }
                } catch (error) {
                    // Erro na consulta
                    console.error('❌ Erro ao consultar CEP:', error);
                    limpaFormularioCep();
                    
                    if (fieldContainer) {
                        fieldContainer.classList.remove('loading');
                        fieldContainer.classList.add('error');
                    }
                    
                    showVolunteerFieldError(cepField, 'Erro ao consultar CEP. Tente novamente.');
                }
            } else {
                // CEP é inválido
                console.log('❌ Formato de CEP inválido');
                limpaFormularioCep();
                showVolunteerFieldError(cepField, 'Formato de CEP inválido. Use o formato: 00000-000');
            }
        } else {
            // CEP sem valor, limpa formulário
            console.log('CEP vazio, limpando campos...');
            limpaFormularioCep();
        }
    });
}

// ===== VALIDAÇÃO ESPECÍFICA DO VOLUNTÁRIO =====
function initializeVolunteerValidation() {
    const form = document.getElementById('volunteerForm');
    if (!form) return;
    
    console.log('Inicializando validação específica do voluntário...');
    
    // Validação em tempo real para campos específicos
    const emailField = form.querySelector('input[name="email"]');
    const cpfField = form.querySelector('input[name="cpf"]');
    const phoneField = form.querySelector('input[type="tel"]');
    
    if (emailField) {
        emailField.addEventListener('blur', () => validateVolunteerEmail(emailField));
    }
    
    if (cpfField) {
        cpfField.addEventListener('blur', () => validateVolunteerCPF(cpfField));
    }
    
    if (phoneField) {
        phoneField.addEventListener('blur', () => validateVolunteerPhone(phoneField));
    }
}

function validateVolunteerEmail(field) {
    const email = field.value.trim();
    if (email && window.NGOUtils && !window.NGOUtils.isValidEmail(email)) {
        showVolunteerFieldError(field, 'Por favor, insira um e-mail válido');
        return false;
    }
    clearVolunteerFieldError(field);
    return true;
}

function validateVolunteerCPF(field) {
    const cpf = field.value.trim();
    if (cpf && window.NGOUtils && !window.NGOUtils.isValidCPF(cpf)) {
        showVolunteerFieldError(field, 'CPF inválido');
        return false;
    }
    clearVolunteerFieldError(field);
    return true;
}

function validateVolunteerPhone(field) {
    const phone = field.value.trim();
    if (phone) {
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 10 || phoneDigits.length > 11) {
            showVolunteerFieldError(field, 'Telefone deve ter 10 ou 11 dígitos');
            return false;
        }
    }
    clearVolunteerFieldError(field);
    return true;
}

// ===== SUBMISSÃO ESPECÍFICA DO VOLUNTÁRIO =====
function initializeVolunteerSubmission() {
    const form = document.getElementById('volunteerForm');
    if (!form) return;
    
    console.log('Inicializando submissão específica do voluntário...');
    
    form.addEventListener('submit', handleVolunteerFormSubmission);
}

function handleVolunteerFormSubmission(e) {
    e.preventDefault();
    console.log('Formulário de voluntário submetido');
    
    const form = e.target;
    
    // Validação específica antes do envio
    if (!validateVolunteerForm(form)) {
        console.log('Validação falhou');
        return;
    }
    
    // Coleta dados do formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Coleta múltiplas seleções
    data.interests = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
    data.availability = Array.from(form.querySelectorAll('input[name="availability"]:checked')).map(cb => cb.value);
    
    console.log('Dados do voluntário coletados:', data);
    
    // Simula envio
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="spinner spinner-small"></div> Enviando...';
    }
    
    // Simula processamento
    setTimeout(() => {
        console.log('✅ Cadastro de voluntário processado com sucesso');
        
        if (window.NGOUtils && window.NGOUtils.showNotification) {
            window.NGOUtils.showNotification('Cadastro realizado com sucesso! Entraremos em contato em breve.', 'success', 5000);
        }
        
        // Reset do formulário
        form.reset();
        clearAllVolunteerErrors(form);
        
        // Reabilita botão
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Enviar Cadastro';
        }
        
        // Redireciona após sucesso
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
        
    }, 2000);
}

function validateVolunteerForm(form) {
    let isValid = true;
    
    // Validar áreas de interesse
    const interests = form.querySelectorAll('input[name="interests"]:checked');
    if (interests.length === 0) {
        isValid = false;
        const firstInterest = form.querySelector('input[name="interests"]');
        if (firstInterest) {
            showVolunteerFieldError(firstInterest, 'Selecione pelo menos uma área de interesse');
        }
    }
    
    // Validar disponibilidade
    const availability = form.querySelectorAll('input[name="availability"]:checked');
    if (availability.length === 0) {
        isValid = false;
        const firstAvailability = form.querySelector('input[name="availability"]');
        if (firstAvailability) {
            showVolunteerFieldError(firstAvailability, 'Selecione pelo menos um horário de disponibilidade');
        }
    }
    
    return isValid;
}

// ===== UTILITÁRIOS ESPECÍFICOS DO VOLUNTÁRIO =====
function showVolunteerFieldError(field, message) {
    const fieldContainer = field.closest('.form-group') || field.closest('fieldset');
    if (!fieldContainer) return;
    
    const errorElement = fieldContainer.querySelector('.error-message');
    
    fieldContainer.classList.add('error');
    fieldContainer.classList.remove('success');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    console.log('Erro mostrado:', message);
}

function clearVolunteerFieldError(field) {
    const fieldContainer = field.closest('.form-group') || field.closest('fieldset');
    if (!fieldContainer) return;
    
    const errorElement = fieldContainer.querySelector('.error-message');
    
    fieldContainer.classList.remove('error');
    if (field.value.trim()) {
        fieldContainer.classList.add('success');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearAllVolunteerErrors(form) {
    const fieldContainers = form.querySelectorAll('.form-group, fieldset');
    
    fieldContainers.forEach(container => {
        container.classList.remove('error', 'success', 'loading');
        const errorElement = container.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    });
}

// ===== CONTADORES ESPECÍFICOS DO VOLUNTÁRIO =====
function initializeVolunteerCounters() {
    console.log('Inicializando contadores do voluntário...');
    
    const counters = document.querySelectorAll('.volunteer-hero .stat-number');
    
    if (counters.length === 0) {
        console.log('Nenhum contador de voluntário encontrado');
        return;
    }
    
    console.log(`${counters.length} contadores de voluntário encontrados`);
    
    const animateVolunteerCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        console.log(`Animando contador para: ${target}`);
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString('pt-BR');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('pt-BR');
                console.log(`Contador finalizado em: ${target}`);
            }
        };
        
        updateCounter();
    };

    // Intersection Observer para animar quando visível
    const volunteerCounterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateVolunteerCounter(counter);
                }
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => {
        volunteerCounterObserver.observe(counter);
    });
    
    // Fallback: animar imediatamente se já estiver visível
    setTimeout(() => {
        const heroSection = document.querySelector('.volunteer-hero');
        if (heroSection) {
            const rect = heroSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                console.log('Hero do voluntário visível, animando contadores...');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateVolunteerCounter(counter);
                    }
                });
            }
        }
    }, 500);
}

// Exporta funções para uso global se necessário
window.VolunteerForm = {
    initializeVolunteerCEP,
    initializeVolunteerCounters,
    validateVolunteerForm,
    showVolunteerFieldError,
    clearVolunteerFieldError,
    clearAllVolunteerErrors
};
