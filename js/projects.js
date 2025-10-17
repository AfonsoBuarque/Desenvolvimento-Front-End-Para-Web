// ===== PROJECTS PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    initializeProjectsPage();
});

function initializeProjectsPage() {
    initializeProjectFilters();
    initializeProjectModals();
    initializeProjectSearch();
}

// ===== FILTROS DE PROJETOS =====
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active no botão clicado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtra projetos
            filterProjects(filterValue, projectCards);
        });
    });
}

function filterProjects(filterValue, projectCards) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
            // Mostra o card com animação
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            // Esconde o card com animação
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Atualiza contador de projetos visíveis
    updateProjectCount(filterValue);
}

function updateProjectCount(filterValue) {
    const projectCards = document.querySelectorAll('.project-card');
    const visibleCards = Array.from(projectCards).filter(card => {
        const category = card.getAttribute('data-category');
        return filterValue === 'all' || category === filterValue;
    });
    
    // Atualiza texto do contador se existir
    const counterElement = document.querySelector('.projects-counter');
    if (counterElement) {
        counterElement.textContent = `${visibleCards.length} projeto(s) encontrado(s)`;
    }
}

// ===== MODAIS DE DETALHES DOS PROJETOS =====
function initializeProjectModals() {
    const detailButtons = document.querySelectorAll('.project-details-btn');
    const modal = document.getElementById('projectModal');
    const closeButtons = document.querySelectorAll('.modal-close');

    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            showProjectModal(projectId);
        });
    });

    // Fecha modal
    closeButtons.forEach(button => {
        button.addEventListener('click', closeProjectModal);
    });

    // Fecha modal clicando fora
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeProjectModal();
            }
        });
    }

    // Fecha modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function showProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal) return;

    // Dados dos projetos
    const projectsData = getProjectsData();
    const project = projectsData[projectId];
    
    if (!project) return;

    // Atualiza conteúdo do modal
    modalTitle.textContent = project.title;
    modalContent.innerHTML = createProjectModalContent(project);
    
    // Mostra modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Foca no modal para acessibilidade
    modal.focus();
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function createProjectModalContent(project) {
    return `
        <div class="project-modal-content">
            <div class="project-modal-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            
            <div class="project-modal-info">
                <div class="project-modal-meta">
                    <span class="project-category">${project.category}</span>
                    <span class="project-status ${project.status.toLowerCase()}">${project.statusText}</span>
                </div>
                
                <p class="project-description">${project.fullDescription}</p>
                
                <div class="project-details">
                    <div class="detail-item">
                        <strong>Público-alvo:</strong>
                        <span>${project.target}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Duração:</strong>
                        <span>${project.duration}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Participantes:</strong>
                        <span>${project.participants}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Local:</strong>
                        <span>${project.location}</span>
                    </div>
                </div>
                
                <div class="project-progress-section">
                    <h4>Progresso do Projeto</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                    <span class="progress-text">${project.progress}% concluído</span>
                </div>
                
                <div class="project-requirements">
                    <h4>Como Participar</h4>
                    <ul>
                        ${project.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-contact">
                    <h4>Responsável</h4>
                    <div class="contact-info">
                        <img src="${project.coordinator.photo}" alt="${project.coordinator.name}">
                        <div>
                            <strong>${project.coordinator.name}</strong>
                            <p>${project.coordinator.role}</p>
                            <p>📧 ${project.coordinator.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== BUSCA DE PROJETOS =====
function initializeProjectSearch() {
    const searchInput = document.getElementById('projectSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();
        searchProjects(searchTerm);
    }, 300));
}

function searchProjects(searchTerm) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const category = card.querySelector('.project-category').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       category.includes(searchTerm);
        
        if (matches || searchTerm === '') {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===== DADOS DOS PROJETOS =====
function getProjectsData() {
    return {
        codekids: {
            title: 'CodeKids',
            category: 'Educação',
            status: 'active',
            statusText: 'Ativo',
            image: 'assets/images/projeto-1.jpg',
            fullDescription: 'O projeto CodeKids é uma iniciativa inovadora que ensina programação para crianças de 8 a 14 anos através de jogos e atividades lúdicas. Utilizamos metodologias ativas e ferramentas visuais como Scratch para tornar o aprendizado divertido e eficaz.',
            target: 'Crianças de 8 a 14 anos',
            duration: '6 meses por turma',
            participants: '120 participantes',
            location: 'Sede da ONG e escolas parceiras',
            progress: 85,
            requirements: [
                'Idade entre 8 e 14 anos',
                'Disponibilidade de 2x por semana (2h cada)',
                'Não é necessário conhecimento prévio',
                'Responsável deve assinar termo de participação'
            ],
            coordinator: {
                name: 'Prof. Ana Silva',
                role: 'Coordenadora Pedagógica',
                email: 'ana.silva@programandofuturo.org',
                photo: 'assets/images/team-1.jpg'
            }
        },
        
        techwomen: {
            title: 'TechWomen',
            category: 'Empoderamento',
            status: 'active',
            statusText: 'Ativo',
            image: 'assets/images/projeto-2.jpg',
            fullDescription: 'O TechWomen é um programa de capacitação tecnológica exclusivo para mulheres, focado em promover igualdade de gênero no mercado de trabalho tech. O programa inclui cursos de programação, design UX/UI e empreendedorismo digital.',
            target: 'Mulheres a partir de 18 anos',
            duration: '4 meses intensivos',
            participants: '80 participantes',
            location: 'Laboratório principal da ONG',
            progress: 70,
            requirements: [
                'Ser mulher e ter mais de 18 anos',
                'Ensino médio completo',
                'Disponibilidade integral (manhã ou tarde)',
                'Participar de processo seletivo'
            ],
            coordinator: {
                name: 'Maria Costa',
                role: 'Gerente de Projetos',
                email: 'maria.costa@programandofuturo.org',
                photo: 'assets/images/team-3.jpg'
            }
        },
        
        digitalsenior: {
            title: 'Digital Senior',
            category: 'Inclusão',
            status: 'active',
            statusText: 'Ativo',
            image: 'assets/images/projeto-3.jpg',
            fullDescription: 'O Digital Senior promove inclusão digital para pessoas da terceira idade, ensinando desde o básico de informática até uso de redes sociais e aplicativos úteis do dia a dia. As aulas são adaptadas ao ritmo de cada participante.',
            target: 'Pessoas acima de 60 anos',
            duration: '3 meses por módulo',
            participants: '45 participantes',
            location: 'Sede da ONG e centros comunitários',
            progress: 60,
            requirements: [
                'Idade mínima de 60 anos',
                'Não é necessário conhecimento prévio',
                'Disponibilidade de 1x por semana (2h)',
                'Trazer documento de identidade'
            ],
            coordinator: {
                name: 'Carlos Santos',
                role: 'Coordenador Pedagógico',
                email: 'carlos.santos@programandofuturo.org',
                photo: 'assets/images/team-2.jpg'
            }
        }
    };
}

// ===== INSCRIÇÃO EM PROJETOS =====
function initializeProjectInscription() {
    const inscribeBtn = document.getElementById('inscribeProject');
    
    if (inscribeBtn) {
        inscribeBtn.addEventListener('click', function() {
            // Redireciona para formulário de inscrição
            window.location.href = 'voluntariado.html#inscricao-projeto';
        });
    }
}

// ===== UTILITÁRIOS =====
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

// Inicializa funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectInscription();
    
    // Adiciona animações aos cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Exporta funções para uso global
window.ProjectsUtils = {
    filterProjects,
    showProjectModal,
    closeProjectModal,
    searchProjects,
    getProjectsData
};
