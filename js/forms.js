// ===== FORM VALIDATION AND HANDLING =====

document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
});

function initializeForms() {
    initializeFormValidation();
    initializeFormMasks();
    // CEP lookup movido para volunteer.js para melhor organização
    initializeFormSubmissions();
}

// ===== VALIDAÇÃO DE FORMULÁRIOS =====
function initializeFormValidation() {
    const forms = document.querySelectorAll('form[novalidate]');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validação em tempo real
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', debounce(() => validateField(input), 300));
        });
        
        // Validação no submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                handleFormSubmission(form);
            }
        });
    });
}

function validateField(field) {
    const fieldContainer = field.closest('.form-group');
    if (!fieldContainer) {
        console.warn('Campo sem .form-group pai:', field);
        return true; // Se não tem container, considera válido
    }
    
    const errorElement = fieldContainer.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';

    // Remove estados anteriores
    fieldContainer.classList.remove('error', 'success', 'loading');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Validações específicas por tipo
    switch (field.type) {
        case 'email':
            if (field.value && !NGOUtils.isValidEmail(field.value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um e-mail válido';
            }
            break;
            
        case 'tel':
            if (field.value) {
                const phoneDigits = field.value.replace(/\D/g, '');
                if (phoneDigits.length < 10 || phoneDigits.length > 11) {
                    isValid = false;
                    errorMessage = 'Telefone deve ter 10 ou 11 dígitos';
                }
            }
            break;
            
        case 'text':
            if (field.name === 'cpf' && field.value) {
                if (!NGOUtils.isValidCPF(field.value)) {
                    isValid = false;
                    errorMessage = 'CPF inválido';
                }
            }
            
            if (field.name === 'cep' && field.value) {
                const cepDigits = field.value.replace(/\D/g, '');
                if (cepDigits.length !== 8) {
                    isValid = false;
                    errorMessage = 'CEP deve ter 8 dígitos';
                }
            }
            break;
            
        case 'password':
            if (field.value && field.value.length < 6) {
                isValid = false;
                errorMessage = 'Senha deve ter pelo menos 6 caracteres';
            }
            break;
    }

    // Validação de campos obrigatórios
    if (field.required && !field.value.trim()) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    }

    // Validação de checkboxes obrigatórios
    if (field.type === 'checkbox' && field.required && !field.checked) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    }

    // Validação de grupos de checkbox (pelo menos um selecionado)
    if (field.type === 'checkbox' && field.name === 'interests') {
        const checkboxGroup = document.querySelectorAll(`input[name="${field.name}"]`);
        const checkedBoxes = Array.from(checkboxGroup).filter(cb => cb.checked);
        
        if (checkedBoxes.length === 0) {
            isValid = false;
            errorMessage = 'Selecione pelo menos uma área de interesse';
        }
    }

    if (field.type === 'checkbox' && field.name === 'availability') {
        const checkboxGroup = document.querySelectorAll(`input[name="${field.name}"]`);
        const checkedBoxes = Array.from(checkboxGroup).filter(cb => cb.checked);
        
        if (checkedBoxes.length === 0) {
            isValid = false;
            errorMessage = 'Selecione pelo menos um horário de disponibilidade';
        }
    }

    // Aplica estado visual (com verificação de segurança)
    if (fieldContainer) {
        if (isValid && field.value) {
            fieldContainer.classList.add('success');
        } else if (!isValid) {
            fieldContainer.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
            }
        }
    }

    return isValid;
}

function validateForm(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    let isFormValid = true;

    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    // Validações específicas por formulário
    const formId = form.id;
    
    if (formId === 'volunteerForm') {
        // Validar se pelo menos uma área de interesse foi selecionada
        const interests = form.querySelectorAll('input[name="interests"]:checked');
        if (interests.length === 0) {
            isFormValid = false;
            showFieldError(form.querySelector('input[name="interests"]'), 'Selecione pelo menos uma área de interesse');
        }

        // Validar se pelo menos um horário foi selecionado
        const availability = form.querySelectorAll('input[name="availability"]:checked');
        if (availability.length === 0) {
            isFormValid = false;
            showFieldError(form.querySelector('input[name="availability"]'), 'Selecione pelo menos um horário de disponibilidade');
        }
    }

    if (formId === 'donationForm') {
        // Validar valor da doação
        const selectedAmount = form.querySelector('.amount-btn.active');
        const customValue = form.querySelector('#customValue');
        
        if (!selectedAmount && (!customValue || !customValue.value)) {
            isFormValid = false;
            NGOUtils.showNotification('Selecione um valor para doação', 'error');
        }
    }

    return isFormValid;
}

function showFieldError(field, message) {
    const fieldContainer = field.closest('.form-group') || field.closest('fieldset');
    const errorElement = fieldContainer.querySelector('.error-message');
    
    fieldContainer.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// ===== MÁSCARAS DE ENTRADA =====
function initializeFormMasks() {
    // Máscara para CPF
    document.querySelectorAll('input[name="cpf"], input[name="donorCpf"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = NGOUtils.formatCPF(this.value);
        });
    });

    // Máscara para telefone
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = NGOUtils.formatPhone(this.value);
        });
    });

    // Máscara para CEP
    document.querySelectorAll('input[name="cep"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = NGOUtils.formatCEP(this.value);
        });
    });

    // Máscara para cartão de crédito
    document.querySelectorAll('input[name="cardNumber"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value
                .replace(/\D/g, '')
                .replace(/(\d{4})(\d)/, '$1 $2')
                .replace(/(\d{4})(\d)/, '$1 $2')
                .replace(/(\d{4})(\d)/, '$1 $2')
                .replace(/(\d{4})\d+?$/, '$1');
        });
    });

    // Máscara para validade do cartão
    document.querySelectorAll('input[name="cardExpiry"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\/\d{2})\d+?$/, '$1');
        });
    });

    // Máscara para CVV
    document.querySelectorAll('input[name="cardCvv"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 3);
        });
    });
}

// ===== BUSCA DE CEP ===== 
// MOVIDO PARA volunteer.js - Mantido aqui comentado para referência
/*
function initializeCEPLookup() {
    console.log('Inicializando busca de CEP...');
    const cepInputs = document.querySelectorAll('input[name="cep"]');
    console.log('Encontrados', cepInputs.length, 'campos CEP');
    
    cepInputs.forEach(input => {
        
        function limpaFormularioCep() {
            // Limpa valores do formulário de cep
            const form = input.closest('form');
            const ruaField = form.querySelector('#rua');
            const bairroField = form.querySelector('#bairro');
            const cidadeField = form.querySelector('#cidade');
            const ufField = form.querySelector('#uf');
            const ibgeField = form.querySelector('#ibge');
            
            if (ruaField) ruaField.value = "";
            if (bairroField) bairroField.value = "";
            if (cidadeField) cidadeField.value = "";
            if (ufField) ufField.value = "";
            if (ibgeField) ibgeField.value = "";
        }
        
        // Quando o campo cep perde o foco
        input.addEventListener('blur', async function() {
            console.log('CEP blur event triggered, valor:', this.value);
            // Nova variável "cep" somente com dígitos
            const cep = this.value.replace(/\D/g, '');
            console.log('CEP limpo:', cep);
            
            // Verifica se campo cep possui valor informado
            if (cep != "") {
                // Expressão regular para validar o CEP
                const validacep = /^[0-9]{8}$/;
                
                // Valida o formato do CEP
                if (validacep.test(cep)) {
                    const fieldContainer = this.closest('.form-group');
                    const form = this.closest('form');
                    
                    // Preenche os campos com "..." enquanto consulta webservice
                    const ruaField = form.querySelector('#rua');
                    const bairroField = form.querySelector('#bairro');
                    const cidadeField = form.querySelector('#cidade');
                    const ufField = form.querySelector('#uf');
                    const ibgeField = form.querySelector('#ibge');
                    
                    if (ruaField) ruaField.value = "...";
                    if (bairroField) bairroField.value = "...";
                    if (cidadeField) cidadeField.value = "...";
                    if (ufField) ufField.value = "...";
                    if (ibgeField) ibgeField.value = "...";
                    
                    fieldContainer.classList.add('loading');
                    
                    try {
                        console.log('Fazendo requisição para ViaCEP:', cep);
                        // Consulta o webservice viacep.com.br/
                        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                        console.log('Resposta recebida:', response.status);
                        
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        
                        const dados = await response.json();
                        console.log('Dados do CEP:', dados);
                        
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
                            
                            fieldContainer.classList.remove('loading');
                            fieldContainer.classList.add('success');
                            console.log('CEP preenchido com sucesso!');
                        } else {
                            // CEP pesquisado não foi encontrado
                            console.log('CEP não encontrado');
                            limpaFormularioCep();
                            fieldContainer.classList.remove('loading');
                            showFieldError(this, 'CEP não encontrado.');
                        }
                    } catch (error) {
                        // Erro na consulta
                        console.error('Erro ao consultar CEP:', error);
                        limpaFormularioCep();
                        fieldContainer.classList.remove('loading');
                        showFieldError(this, 'Erro ao consultar CEP.');
                    }
                } else {
                    // CEP é inválido
                    limpaFormularioCep();
                    showFieldError(this, 'Formato de CEP inválido.');
                }
            } else {
                // CEP sem valor, limpa formulário
                limpaFormularioCep();
            }
        });
    });
}
*/

// ===== SUBMISSÃO DE FORMULÁRIOS =====
function initializeFormSubmissions() {
    // Newsletter forms
    document.querySelectorAll('#newsletterForm, #blogNewsletterForm').forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmission);
    });
}

function handleFormSubmission(form) {
    const formId = form.id;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Desabilita botão e mostra loading
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="spinner spinner-small"></div> Enviando...';
    }

    // Simula envio (em produção, seria uma requisição real)
    setTimeout(() => {
        switch (formId) {
            case 'volunteerForm':
                handleVolunteerSubmission(form);
                break;
            case 'donationForm':
                handleDonationSubmission(form);
                break;
            case 'contactForm':
                handleContactSubmission(form);
                break;
            case 'newsletterForm':
            case 'blogNewsletterForm':
                handleNewsletterSubmission(form);
                break;
            default:
                handleGenericSubmission(form);
        }
        
        // Reabilita botão
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = submitButton.dataset.originalText || 'Enviar';
        }
    }, 2000);
}

function handleVolunteerSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Coleta múltiplas seleções
    data.interests = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
    data.availability = Array.from(form.querySelectorAll('input[name="availability"]:checked')).map(cb => cb.value);
    
    console.log('Dados do voluntário:', data);
    
    NGOUtils.showNotification('Cadastro realizado com sucesso! Entraremos em contato em breve.', 'success', 5000);
    form.reset();
    
    // Redireciona após sucesso
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

function handleDonationSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Pega valor selecionado
    const selectedAmount = document.querySelector('.amount-btn.active');
    const customValue = document.querySelector('#customValue');
    
    if (selectedAmount && !selectedAmount.classList.contains('custom')) {
        data.amount = selectedAmount.dataset.amount;
    } else if (customValue && customValue.value) {
        data.amount = customValue.value;
    }
    
    console.log('Dados da doação:', data);
    
    NGOUtils.showNotification('Doação processada com sucesso! Obrigado por sua contribuição.', 'success', 5000);
    
    // Simula redirecionamento para página de confirmação
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

function handleContactSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Dados do contato:', data);
    
    NGOUtils.showNotification('Mensagem enviada com sucesso! Responderemos em breve.', 'success');
    form.reset();
}

function handleNewsletterSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Coleta preferências se existirem
    if (form.querySelectorAll('input[name="preferences"]').length > 0) {
        data.preferences = Array.from(form.querySelectorAll('input[name="preferences"]:checked')).map(cb => cb.value);
    }
    
    console.log('Dados da newsletter:', data);
    
    NGOUtils.showNotification('Inscrição realizada com sucesso!', 'success');
    form.reset();
}

function handleGenericSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Dados do formulário:', data);
    
    NGOUtils.showNotification('Formulário enviado com sucesso!', 'success');
    form.reset();
}

// ===== UTILITÁRIOS ESPECÍFICOS DE FORMULÁRIOS =====

// Debounce function (importada do main.js)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para limpar todos os estados de validação
function clearFormValidation(form) {
    const fieldContainers = form.querySelectorAll('.form-group');
    
    fieldContainers.forEach(container => {
        container.classList.remove('error', 'success', 'loading');
        const errorElement = container.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    });
}

// Função para resetar formulário completamente
function resetForm(form) {
    form.reset();
    clearFormValidation(form);
    
    // Remove seleções ativas
    form.querySelectorAll('.active').forEach(el => {
        el.classList.remove('active');
    });
}

// Exporta funções para uso global
window.FormUtils = {
    validateField,
    validateForm,
    showFieldError,
    clearFormValidation,
    resetForm
};
