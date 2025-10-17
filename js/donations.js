// ===== DONATION PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    initializeDonationPage();
});

function initializeDonationPage() {
    initializeAmountSelection();
    initializePaymentMethods();
    initializeDonationSummary();
    initializeDonationForm();
}

// ===== SELEÇÃO DE VALORES =====
function initializeAmountSelection() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountDiv = document.getElementById('customAmount');
    const customValueInput = document.getElementById('customValue');

    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active de todos os botões
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active no botão clicado
            this.classList.add('active');
            
            // Mostra/esconde campo personalizado
            if (this.dataset.amount === 'custom') {
                customAmountDiv.style.display = 'block';
                customValueInput.focus();
            } else {
                customAmountDiv.style.display = 'none';
                customValueInput.value = '';
            }
            
            updateDonationSummary();
        });
    });

    // Listener para valor personalizado
    if (customValueInput) {
        customValueInput.addEventListener('input', function() {
            // Formata valor monetário
            let value = this.value.replace(/\D/g, '');
            value = (parseInt(value) / 100).toFixed(2);
            
            if (value !== '0.00') {
                this.value = value;
                updateDonationSummary();
            }
        });

        customValueInput.addEventListener('blur', function() {
            if (this.value) {
                const value = parseFloat(this.value);
                if (value < 5) {
                    FormUtils.showFieldError(this, 'Valor mínimo para doação é R$ 5,00');
                    this.value = '';
                }
            }
        });
    }
}

// ===== MÉTODOS DE PAGAMENTO =====
function initializePaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardFields = document.getElementById('cardFields');

    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Mostra/esconde campos do cartão
            if (this.value === 'credit' || this.value === 'debit') {
                cardFields.style.display = 'block';
                
                // Torna campos obrigatórios
                const cardInputs = cardFields.querySelectorAll('input');
                cardInputs.forEach(input => {
                    input.required = true;
                });
            } else {
                cardFields.style.display = 'none';
                
                // Remove obrigatoriedade
                const cardInputs = cardFields.querySelectorAll('input');
                cardInputs.forEach(input => {
                    input.required = false;
                    input.value = '';
                });
            }
            
            updateDonationSummary();
        });
    });

    // Validação específica do cartão
    initializeCardValidation();
}

function initializeCardValidation() {
    const cardNumberInput = document.getElementById('cardNumber');
    const cardExpiryInput = document.getElementById('cardExpiry');
    const cardCvvInput = document.getElementById('cardCvv');

    // Validação do número do cartão
    if (cardNumberInput) {
        cardNumberInput.addEventListener('blur', function() {
            const cardNumber = this.value.replace(/\s/g, '');
            
            if (cardNumber.length < 13 || cardNumber.length > 19) {
                FormUtils.showFieldError(this, 'Número do cartão inválido');
                return;
            }
            
            // Algoritmo de Luhn para validação
            if (!isValidCardNumber(cardNumber)) {
                FormUtils.showFieldError(this, 'Número do cartão inválido');
            }
        });
    }

    // Validação da validade
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('blur', function() {
            const expiry = this.value;
            
            if (expiry.length !== 5) {
                FormUtils.showFieldError(this, 'Data de validade inválida');
                return;
            }
            
            const [month, year] = expiry.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;
            
            const cardMonth = parseInt(month);
            const cardYear = parseInt(year);
            
            if (cardMonth < 1 || cardMonth > 12) {
                FormUtils.showFieldError(this, 'Mês inválido');
                return;
            }
            
            if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
                FormUtils.showFieldError(this, 'Cartão expirado');
            }
        });
    }

    // Validação do CVV
    if (cardCvvInput) {
        cardCvvInput.addEventListener('blur', function() {
            if (this.value.length < 3) {
                FormUtils.showFieldError(this, 'CVV deve ter 3 dígitos');
            }
        });
    }
}

// Algoritmo de Luhn para validação de cartão
function isValidCardNumber(cardNumber) {
    let sum = 0;
    let alternate = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let n = parseInt(cardNumber.charAt(i));
        
        if (alternate) {
            n *= 2;
            if (n > 9) {
                n = (n % 10) + 1;
            }
        }
        
        sum += n;
        alternate = !alternate;
    }
    
    return (sum % 10) === 0;
}

// ===== RESUMO DA DOAÇÃO =====
function initializeDonationSummary() {
    const donationTypes = document.querySelectorAll('input[name="donationType"]');
    
    donationTypes.forEach(type => {
        type.addEventListener('change', updateDonationSummary);
    });
    
    // Atualiza resumo inicial
    updateDonationSummary();
}

function updateDonationSummary() {
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryType = document.getElementById('summaryType');
    const summaryMethod = document.getElementById('summaryMethod');
    
    if (!summaryAmount) return;

    // Valor
    let amount = 0;
    const activeAmountBtn = document.querySelector('.amount-btn.active');
    const customValue = document.getElementById('customValue');
    
    if (activeAmountBtn && !activeAmountBtn.classList.contains('custom')) {
        amount = parseFloat(activeAmountBtn.dataset.amount);
    } else if (customValue && customValue.value) {
        amount = parseFloat(customValue.value);
    }
    
    summaryAmount.textContent = `R$ ${amount.toFixed(2).replace('.', ',')}`;
    
    // Tipo
    const selectedType = document.querySelector('input[name="donationType"]:checked');
    if (selectedType && summaryType) {
        summaryType.textContent = selectedType.value === 'monthly' ? 'Mensal' : 'Única';
    }
    
    // Método
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (selectedMethod && summaryMethod) {
        const methodNames = {
            'credit': 'Cartão de Crédito',
            'debit': 'Cartão de Débito',
            'pix': 'PIX',
            'boleto': 'Boleto'
        };
        summaryMethod.textContent = methodNames[selectedMethod.value] || 'Não selecionado';
    }
    
    // Atualiza impacto estimado
    updateImpactEstimate(amount);
}

function updateImpactEstimate(amount) {
    const impactElement = document.getElementById('impactEstimate');
    if (!impactElement) return;
    
    let impactText = '';
    
    if (amount >= 200) {
        impactText = 'Oferece bolsa completa para 1 aluno por 1 mês';
    } else if (amount >= 100) {
        impactText = 'Ajuda na manutenção de computadores e equipamentos';
    } else if (amount >= 50) {
        impactText = 'Garante acesso à internet para 5 alunos durante as aulas';
    } else if (amount >= 25) {
        impactText = 'Fornece material didático completo para 1 aluno por 1 mês';
    } else if (amount > 0) {
        impactText = 'Toda contribuição faz a diferença!';
    }
    
    impactElement.textContent = impactText;
}

// ===== FORMULÁRIO DE DOAÇÃO =====
function initializeDonationForm() {
    const donationForm = document.getElementById('donationForm');
    if (!donationForm) return;

    // Validação customizada para doações
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateDonationForm()) {
            processDonation();
        }
    });
}

function validateDonationForm() {
    let isValid = true;
    
    // Valida valor selecionado
    const activeAmountBtn = document.querySelector('.amount-btn.active');
    const customValue = document.getElementById('customValue');
    
    if (!activeAmountBtn) {
        NGOUtils.showNotification('Selecione um valor para doação', 'error');
        isValid = false;
    } else if (activeAmountBtn.classList.contains('custom')) {
        if (!customValue || !customValue.value || parseFloat(customValue.value) < 5) {
            NGOUtils.showNotification('Valor mínimo para doação é R$ 5,00', 'error');
            isValid = false;
        }
    }
    
    // Valida método de pagamento
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethod) {
        NGOUtils.showNotification('Selecione um método de pagamento', 'error');
        isValid = false;
    }
    
    // Valida campos do cartão se necessário
    if (selectedMethod && (selectedMethod.value === 'credit' || selectedMethod.value === 'debit')) {
        const cardFields = ['cardNumber', 'cardName', 'cardExpiry', 'cardCvv'];
        
        cardFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && !field.value.trim()) {
                FormUtils.showFieldError(field, 'Este campo é obrigatório');
                isValid = false;
            }
        });
    }
    
    return isValid;
}

function processDonation() {
    const form = document.getElementById('donationForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Mostra loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner spinner-small"></div> Processando...';
    
    // Coleta dados da doação
    const donationData = collectDonationData();
    
    // Simula processamento
    setTimeout(() => {
        console.log('Dados da doação:', donationData);
        
        // Mostra modal de sucesso ou redireciona
        showDonationSuccess(donationData);
        
        // Reabilita botão
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Finalizar Doação';
        
    }, 3000);
}

function collectDonationData() {
    const formData = new FormData(document.getElementById('donationForm'));
    const data = Object.fromEntries(formData.entries());
    
    // Adiciona valor selecionado
    const activeAmountBtn = document.querySelector('.amount-btn.active');
    const customValue = document.getElementById('customValue');
    
    if (activeAmountBtn && !activeAmountBtn.classList.contains('custom')) {
        data.amount = activeAmountBtn.dataset.amount;
    } else if (customValue && customValue.value) {
        data.amount = customValue.value;
    }
    
    // Adiciona tipo de doação
    const donationType = document.querySelector('input[name="donationType"]:checked');
    if (donationType) {
        data.donationType = donationType.value;
    }
    
    // Adiciona método de pagamento
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (paymentMethod) {
        data.paymentMethod = paymentMethod.value;
    }
    
    return data;
}

function showDonationSuccess(donationData) {
    const amount = parseFloat(donationData.amount);
    const type = donationData.donationType === 'monthly' ? 'mensal' : 'única';
    
    NGOUtils.showNotification(
        `Doação ${type} de R$ ${amount.toFixed(2).replace('.', ',')} processada com sucesso! Obrigado por sua contribuição.`,
        'success',
        5000
    );
    
    // Limpa formulário
    document.getElementById('donationForm').reset();
    document.querySelectorAll('.amount-btn.active').forEach(btn => btn.classList.remove('active'));
    document.getElementById('customAmount').style.display = 'none';
    updateDonationSummary();
    
    // Redireciona após alguns segundos
    setTimeout(() => {
        window.location.href = 'index.html?donation=success';
    }, 3000);
}

// ===== UTILITÁRIOS =====

// Função para detectar tipo de cartão
function detectCardType(cardNumber) {
    const patterns = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        discover: /^6(?:011|5)/,
        elo: /^(?:4011|4312|4389|4514|4573|4576|5041|5066|5067|6277|6362|6363|6504|6505|6516)/
    };
    
    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(cardNumber)) {
            return type;
        }
    }
    
    return 'unknown';
}

// Função para formatar valor monetário
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Exporta funções para uso global
window.DonationUtils = {
    detectCardType,
    formatCurrency,
    isValidCardNumber,
    updateDonationSummary
};
