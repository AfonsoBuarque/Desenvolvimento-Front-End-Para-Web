// ===== MOCK DATA FOR NGO WEBSITE =====

// Dados da ONG
const ngoData = {
    name: "Programando o Futuro",
    founded: 2012,
    mission: "Democratizar o acesso à educação tecnológica, capacitando pessoas para o mercado de trabalho digital e promovendo inclusão social através da tecnologia.",
    vision: "Ser referência nacional em educação tecnológica social, transformando vidas e comunidades através do conhecimento digital.",
    values: [
        "Inclusão e diversidade",
        "Educação de qualidade",
        "Transparência e ética",
        "Inovação social",
        "Sustentabilidade"
    ],
    contact: {
        address: "Rua da Tecnologia, 123, Bairro Inovação, São Paulo - SP, CEP: 01234-567",
        phone: "(11) 1234-5678",
        whatsapp: "(11) 98765-4321",
        email: "contato@programandofuturo.org",
        website: "www.programandofuturo.org"
    },
    socialMedia: {
        facebook: "https://facebook.com/programandofuturo",
        instagram: "https://instagram.com/programandofuturo", 
        linkedin: "https://linkedin.com/company/programandofuturo",
        youtube: "https://youtube.com/programandofuturo"
    }
};

// Dados de impacto
const impactData = {
    totalBeneficiaries: 2547,
    activeVolunteers: 205,
    completedProjects: 18,
    partnersCount: 32,
    yearsActive: new Date().getFullYear() - ngoData.founded,
    monthlyGrowth: 12.5,
    satisfactionRate: 96.8
};

// Equipe
const teamMembers = [
    {
        id: 1,
        name: "Ana Silva",
        role: "Diretora Executiva",
        bio: "Formada em Ciência da Computação pela USP, com MBA em Gestão de ONGs. Atua há 15 anos no terceiro setor, sendo pioneira em projetos de inclusão digital.",
        photo: "assets/images/team-1.jpg",
        email: "ana.silva@programandofuturo.org",
        linkedin: "https://linkedin.com/in/anasilva",
        specialties: ["Gestão", "Estratégia", "Captação de recursos"]
    },
    {
        id: 2,
        name: "Carlos Santos",
        role: "Coordenador Pedagógico",
        bio: "Pedagogo especializado em tecnologias educacionais. Desenvolveu metodologias inovadoras para ensino de programação para diferentes faixas etárias.",
        photo: "assets/images/team-2.jpg",
        email: "carlos.santos@programandofuturo.org",
        linkedin: "https://linkedin.com/in/carlossantos",
        specialties: ["Educação", "Metodologia", "Capacitação"]
    },
    {
        id: 3,
        name: "Maria Costa",
        role: "Gerente de Projetos",
        bio: "Engenheira de Software com experiência em gestão de projetos sociais. Especialista em implementação de soluções tecnológicas para ONGs.",
        photo: "assets/images/team-3.jpg",
        email: "maria.costa@programandofuturo.org",
        linkedin: "https://linkedin.com/in/mariacosta",
        specialties: ["Gestão de Projetos", "Tecnologia", "Inovação"]
    },
    {
        id: 4,
        name: "Roberto Lima",
        role: "Coordenador de Voluntários",
        bio: "Psicólogo organizacional especializado em gestão de pessoas. Responsável por recrutar, treinar e acompanhar mais de 200 voluntários.",
        photo: "assets/images/team-4.jpg",
        email: "roberto.lima@programandofuturo.org",
        linkedin: "https://linkedin.com/in/robertolima",
        specialties: ["Recursos Humanos", "Voluntariado", "Treinamento"]
    },
    {
        id: 5,
        name: "Juliana Oliveira",
        role: "Coordenadora de Comunicação",
        bio: "Jornalista especializada em comunicação digital e marketing social. Responsável por toda estratégia de comunicação e relacionamento com a mídia.",
        photo: "assets/images/team-5.jpg",
        email: "juliana.oliveira@programandofuturo.org",
        linkedin: "https://linkedin.com/in/julianaoliveira",
        specialties: ["Comunicação", "Marketing Digital", "Redes Sociais"]
    },
    {
        id: 6,
        name: "Fernando Alves",
        role: "Coordenador Financeiro",
        bio: "Contador com especialização em terceiro setor. Garante total transparência na gestão dos recursos e elabora relatórios financeiros detalhados.",
        photo: "assets/images/team-6.jpg",
        email: "fernando.alves@programandofuturo.org",
        linkedin: "https://linkedin.com/in/fernandoalves",
        specialties: ["Finanças", "Transparência", "Compliance"]
    }
];

// Projetos
const projects = [
    {
        id: "codekids",
        title: "CodeKids",
        category: "educacao",
        status: "active",
        description: "Ensino de programação para crianças de 8 a 14 anos através de jogos e atividades lúdicas.",
        fullDescription: "O projeto CodeKids é uma iniciativa inovadora que ensina programação para crianças de 8 a 14 anos através de jogos e atividades lúdicas. Utilizamos metodologias ativas e ferramentas visuais como Scratch para tornar o aprendizado divertido e eficaz.",
        image: "assets/images/projeto-1.jpg",
        startDate: "2020-03-01",
        endDate: null,
        beneficiaries: 320,
        volunteers: 15,
        budget: 85000,
        progress: 85,
        coordinator: teamMembers[1],
        location: "Sede da ONG e escolas parceiras",
        requirements: [
            "Idade entre 8 e 14 anos",
            "Disponibilidade de 2x por semana (2h cada)",
            "Não é necessário conhecimento prévio"
        ],
        achievements: [
            "320 crianças capacitadas",
            "15 escolas parceiras",
            "95% de aprovação dos pais",
            "Metodologia replicada em 5 estados"
        ]
    },
    {
        id: "techwomen",
        title: "TechWomen",
        category: "empoderamento",
        status: "active",
        description: "Programa de capacitação tecnológica exclusivo para mulheres em situação de vulnerabilidade.",
        fullDescription: "O TechWomen é um programa de capacitação tecnológica exclusivo para mulheres, focado em promover igualdade de gênero no mercado de trabalho tech. O programa inclui cursos de programação, design UX/UI e empreendedorismo digital.",
        image: "assets/images/projeto-2.jpg",
        startDate: "2019-08-15",
        endDate: null,
        beneficiaries: 180,
        volunteers: 22,
        budget: 120000,
        progress: 70,
        coordinator: teamMembers[2],
        location: "Laboratório principal da ONG",
        requirements: [
            "Ser mulher e ter mais de 18 anos",
            "Ensino médio completo",
            "Disponibilidade integral (manhã ou tarde)"
        ],
        achievements: [
            "180 mulheres capacitadas",
            "78% conseguiram emprego na área",
            "Salário médio 300% maior",
            "25 empresas parceiras para contratação"
        ]
    },
    {
        id: "digitalsenior",
        title: "Digital Senior",
        category: "inclusao",
        status: "active",
        description: "Inclusão digital para pessoas da terceira idade, ensinando desde o básico até redes sociais.",
        fullDescription: "O Digital Senior promove inclusão digital para pessoas da terceira idade, ensinando desde o básico de informática até uso de redes sociais e aplicativos úteis do dia a dia. As aulas são adaptadas ao ritmo de cada participante.",
        image: "assets/images/projeto-3.jpg",
        startDate: "2021-01-10",
        endDate: null,
        beneficiaries: 95,
        volunteers: 8,
        budget: 45000,
        progress: 60,
        coordinator: teamMembers[1],
        location: "Sede da ONG e centros comunitários",
        requirements: [
            "Idade mínima de 60 anos",
            "Não é necessário conhecimento prévio",
            "Disponibilidade de 1x por semana (2h)"
        ],
        achievements: [
            "95 idosos capacitados",
            "100% aprenderam WhatsApp",
            "85% usam internet banking",
            "Redução de 60% no isolamento social"
        ]
    }
];

// Depoimentos
const testimonials = [
    {
        id: 1,
        name: "Maria Santos",
        age: 28,
        project: "TechWomen",
        role: "Ex-aluna, atual Desenvolvedora Full-Stack",
        photo: "assets/images/testimonial-1.jpg",
        quote: "O TechWomen mudou completamente minha vida. Saí do desemprego para me tornar desenvolvedora em uma startup. Hoje ganho 5 vezes mais do que ganhava antes.",
        rating: 5,
        date: "2024-01-15",
        videoUrl: "assets/videos/testimonial-1.mp4",
        audioUrl: "assets/audio/testimonial-1.mp3"
    },
    {
        id: 2,
        name: "João Silva",
        age: 12,
        project: "CodeKids",
        role: "Aluno do projeto",
        photo: "assets/images/testimonial-2.jpg",
        quote: "Aprendi a programar brincando! Agora já criei 3 jogos no Scratch e quero ser programador quando crescer. As aulas são muito divertidas!",
        rating: 5,
        date: "2024-01-10",
        videoUrl: "assets/videos/testimonial-2.mp4",
        audioUrl: "assets/audio/testimonial-2.mp3"
    },
    {
        id: 3,
        name: "Dona Rosa",
        age: 68,
        project: "Digital Senior",
        role: "Participante do projeto",
        photo: "assets/images/testimonial-3.jpg",
        quote: "Aos 68 anos aprendi a usar WhatsApp e fazer videochamada com meus netos. Não me sinto mais excluída do mundo digital!",
        rating: 5,
        date: "2024-01-05",
        videoUrl: "assets/videos/testimonial-3.mp4",
        audioUrl: "assets/audio/testimonial-3.mp3"
    }
];

// Posts do blog
const blogPosts = [
    {
        id: 1,
        title: "Como Maria transformou sua vida através da programação",
        slug: "maria-transformou-vida-programacao",
        category: "historias",
        author: {
            name: "Ana Silva",
            photo: "assets/images/author-1.jpg",
            role: "Coordenadora de Comunicação"
        },
        publishDate: "2024-01-15",
        readTime: 4,
        excerpt: "Conheça a história inspiradora de Maria Santos, que saiu do desemprego para se tornar desenvolvedora full-stack através do nosso projeto TechWomen...",
        content: "História completa da Maria...",
        image: "assets/images/blog-featured.jpg",
        tags: ["programação", "empoderamento", "mulheres", "tecnologia"],
        views: 1250,
        likes: 89,
        featured: true
    },
    {
        id: 2,
        title: "Inauguração do novo laboratório de informática",
        slug: "inauguracao-novo-laboratorio",
        category: "noticias",
        author: {
            name: "Carlos Santos",
            photo: "assets/images/author-2.jpg",
            role: "Coordenador Pedagógico"
        },
        publishDate: "2024-01-10",
        readTime: 3,
        excerpt: "Com 30 novos computadores, o laboratório vai beneficiar mais de 200 alunos por mês...",
        content: "Detalhes da inauguração...",
        image: "assets/images/blog-1.jpg",
        tags: ["infraestrutura", "educação", "tecnologia"],
        views: 890,
        likes: 45,
        featured: false
    }
];

// Parceiros
const partners = [
    {
        id: 1,
        name: "Microsoft",
        logo: "assets/images/partner-microsoft.png",
        type: "Tecnologia",
        partnership: "Doação de licenças e treinamentos",
        since: "2018"
    },
    {
        id: 2,
        name: "Google.org",
        logo: "assets/images/partner-google.png",
        type: "Financiamento",
        partnership: "Grant de $50.000 para projetos de IA",
        since: "2020"
    },
    {
        id: 3,
        name: "Universidade de São Paulo",
        logo: "assets/images/partner-usp.png",
        type: "Acadêmico",
        partnership: "Bolsas de estudo e pesquisa",
        since: "2019"
    }
];

// Relatórios financeiros
const financialReports = [
    {
        year: 2023,
        totalRevenue: 2180000,
        totalExpenses: 1950000,
        programExpenses: 1560000,
        adminExpenses: 195000,
        fundraisingExpenses: 195000,
        netAssets: 230000,
        programEfficiency: 80.0,
        reportUrl: "assets/reports/relatorio-2023.pdf"
    },
    {
        year: 2022,
        totalRevenue: 1890000,
        totalExpenses: 1720000,
        programExpenses: 1376000,
        adminExpenses: 172000,
        fundraisingExpenses: 172000,
        netAssets: 170000,
        programEfficiency: 80.0,
        reportUrl: "assets/reports/relatorio-2022.pdf"
    }
];

// Certificações
const certifications = [
    {
        name: "OSCIP",
        description: "Organização da Sociedade Civil de Interesse Público",
        issuer: "Ministério da Justiça",
        validUntil: "2025-12-31",
        certificate: "assets/certificates/oscip.pdf"
    },
    {
        name: "Selo de Transparência",
        description: "Certificação de transparência e prestação de contas",
        issuer: "Instituto Doar",
        validUntil: "2024-06-30",
        certificate: "assets/certificates/transparencia.pdf"
    }
];

// Eventos
const events = [
    {
        id: 1,
        title: "1º Hackathon Social",
        date: "2024-03-15",
        time: "08:00",
        location: "Sede da ONG",
        description: "48 horas criando soluções tecnológicas para problemas sociais",
        participants: 120,
        projects: 24,
        winners: 3,
        image: "assets/images/event-hackathon.jpg"
    },
    {
        id: 2,
        title: "Feira de Profissões Tech",
        date: "2024-04-20",
        time: "14:00",
        location: "Shopping Center Norte",
        description: "Apresentação de carreiras em tecnologia para jovens",
        participants: 300,
        companies: 15,
        image: "assets/images/event-feira.jpg"
    }
];

// Exporta todos os dados
if (typeof window !== 'undefined') {
    window.MockData = {
        ngoData,
        impactData,
        teamMembers,
        projects,
        testimonials,
        blogPosts,
        partners,
        financialReports,
        certifications,
        events
    };
}

// Para uso em Node.js (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ngoData,
        impactData,
        teamMembers,
        projects,
        testimonials,
        blogPosts,
        partners,
        financialReports,
        certifications,
        events
    };
}
