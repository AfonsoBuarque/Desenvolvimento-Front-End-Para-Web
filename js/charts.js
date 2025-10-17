// ===== CHARTS FOR TRANSPARENCY PAGE =====

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    // Aguarda o React e Recharts carregarem
    if (typeof React !== 'undefined' && typeof Recharts !== 'undefined') {
        createPieChart();
        createLineChart();
        createBarChart();
    } else {
        // Fallback para gráficos CSS se Recharts não estiver disponível
        createFallbackCharts();
    }
}

// ===== DADOS MOCK PARA OS GRÁFICOS =====
const chartData = {
    resourceDistribution: [
        { name: 'Educação', value: 45, color: '#2563eb' },
        { name: 'Infraestrutura', value: 25, color: '#10b981' },
        { name: 'Capacitação', value: 20, color: '#f59e0b' },
        { name: 'Administrativo', value: 10, color: '#ef4444' }
    ],
    
    volunteerGrowth: [
        { month: 'Jan', volunteers: 120 },
        { month: 'Fev', volunteers: 125 },
        { month: 'Mar', volunteers: 135 },
        { month: 'Abr', volunteers: 142 },
        { month: 'Mai', volunteers: 158 },
        { month: 'Jun', volunteers: 165 },
        { month: 'Jul', volunteers: 172 },
        { month: 'Ago', volunteers: 180 },
        { month: 'Set', volunteers: 185 },
        { month: 'Out', volunteers: 192 },
        { month: 'Nov', volunteers: 198 },
        { month: 'Dez', volunteers: 205 }
    ],
    
    regionalImpact: [
        { region: 'Norte', people: 450 },
        { region: 'Sul', people: 680 },
        { region: 'Leste', people: 520 },
        { region: 'Oeste', people: 380 },
        { region: 'Centro', people: 517 }
    ]
};

// ===== GRÁFICO DE PIZZA - DISTRIBUIÇÃO DE RECURSOS =====
function createPieChart() {
    const { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } = Recharts;
    
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return React.createElement('div', {
                className: 'custom-tooltip',
                style: {
                    backgroundColor: 'white',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }
            }, [
                React.createElement('p', { key: 'label', style: { margin: 0, fontWeight: 600 } }, data.payload.name),
                React.createElement('p', { key: 'value', style: { margin: 0, color: data.payload.color } }, 
                    `${data.value}% (R$ ${(data.value * 21800).toLocaleString('pt-BR')})`
                )
            ]);
        }
        return null;
    };

    const pieChart = React.createElement(ResponsiveContainer, {
        width: '100%',
        height: 400
    }, 
        React.createElement(PieChart, null, [
            React.createElement(Pie, {
                key: 'pie',
                data: chartData.resourceDistribution,
                cx: '50%',
                cy: '50%',
                labelLine: false,
                label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`,
                outerRadius: 120,
                fill: '#8884d8',
                dataKey: 'value'
            }, 
                chartData.resourceDistribution.map((entry, index) => 
                    React.createElement(Cell, { key: `cell-${index}`, fill: entry.color })
                )
            ),
            React.createElement(Tooltip, { key: 'tooltip', content: React.createElement(CustomTooltip) })
        ])
    );

    const container = document.getElementById('pieChart');
    if (container) {
        ReactDOM.render(pieChart, container);
    }
}

// ===== GRÁFICO DE LINHA - EVOLUÇÃO DE VOLUNTÁRIOS =====
function createLineChart() {
    const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return React.createElement('div', {
                className: 'custom-tooltip',
                style: {
                    backgroundColor: 'white',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }
            }, [
                React.createElement('p', { key: 'label', style: { margin: 0, fontWeight: 600 } }, `${label}/2024`),
                React.createElement('p', { key: 'value', style: { margin: 0, color: '#2563eb' } }, 
                    `${payload[0].value} voluntários`
                )
            ]);
        }
        return null;
    };

    const lineChart = React.createElement(ResponsiveContainer, {
        width: '100%',
        height: 400
    },
        React.createElement(LineChart, {
            data: chartData.volunteerGrowth,
            margin: { top: 5, right: 30, left: 20, bottom: 5 }
        }, [
            React.createElement(CartesianGrid, { key: 'grid', strokeDasharray: '3 3' }),
            React.createElement(XAxis, { key: 'xaxis', dataKey: 'month' }),
            React.createElement(YAxis, { key: 'yaxis' }),
            React.createElement(Tooltip, { key: 'tooltip', content: React.createElement(CustomTooltip) }),
            React.createElement(Line, {
                key: 'line',
                type: 'monotone',
                dataKey: 'volunteers',
                stroke: '#2563eb',
                strokeWidth: 3,
                dot: { fill: '#2563eb', strokeWidth: 2, r: 6 },
                activeDot: { r: 8, stroke: '#2563eb', strokeWidth: 2 }
            })
        ])
    );

    const container = document.getElementById('lineChart');
    if (container) {
        ReactDOM.render(lineChart, container);
    }
}

// ===== GRÁFICO DE BARRAS - IMPACTO POR REGIÃO =====
function createBarChart() {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return React.createElement('div', {
                className: 'custom-tooltip',
                style: {
                    backgroundColor: 'white',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }
            }, [
                React.createElement('p', { key: 'label', style: { margin: 0, fontWeight: 600 } }, `Região ${label}`),
                React.createElement('p', { key: 'value', style: { margin: 0, color: '#10b981' } }, 
                    `${payload[0].value} pessoas atendidas`
                )
            ]);
        }
        return null;
    };

    const barChart = React.createElement(ResponsiveContainer, {
        width: '100%',
        height: 400
    },
        React.createElement(BarChart, {
            data: chartData.regionalImpact,
            margin: { top: 20, right: 30, left: 20, bottom: 5 }
        }, [
            React.createElement(CartesianGrid, { key: 'grid', strokeDasharray: '3 3' }),
            React.createElement(XAxis, { key: 'xaxis', dataKey: 'region' }),
            React.createElement(YAxis, { key: 'yaxis' }),
            React.createElement(Tooltip, { key: 'tooltip', content: React.createElement(CustomTooltip) }),
            React.createElement(Bar, {
                key: 'bar',
                dataKey: 'people',
                fill: '#10b981',
                radius: [4, 4, 0, 0]
            })
        ])
    );

    const container = document.getElementById('barChart');
    if (container) {
        ReactDOM.render(barChart, container);
    }
}

// ===== GRÁFICOS FALLBACK COM CSS =====
function createFallbackCharts() {
    createFallbackPieChart();
    createFallbackLineChart();
    createFallbackBarChart();
}

function createFallbackPieChart() {
    const container = document.getElementById('pieChart');
    if (!container) return;

    const total = chartData.resourceDistribution.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '400');
    svg.setAttribute('viewBox', '0 0 400 400');

    const centerX = 200;
    const centerY = 200;
    const radius = 120;

    chartData.resourceDistribution.forEach((item, index) => {
        const percentage = item.value / total;
        const angle = percentage * 360;
        
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        
        const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
        const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
        const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
        const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
        
        const largeArcFlag = angle > 180 ? 1 : 0;
        
        const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', item.color);
        path.setAttribute('stroke', 'white');
        path.setAttribute('stroke-width', '2');
        
        // Tooltip
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${item.name}: ${item.value}%`;
        path.appendChild(title);
        
        svg.appendChild(path);
        
        currentAngle += angle;
    });

    container.appendChild(svg);
}

function createFallbackLineChart() {
    const container = document.getElementById('lineChart');
    if (!container) return;

    const data = chartData.volunteerGrowth;
    const maxValue = Math.max(...data.map(d => d.volunteers));
    const minValue = Math.min(...data.map(d => d.volunteers));
    const range = maxValue - minValue;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '400');
    svg.setAttribute('viewBox', '0 0 800 400');

    const padding = 60;
    const chartWidth = 800 - 2 * padding;
    const chartHeight = 400 - 2 * padding;

    // Linha do gráfico
    const points = data.map((item, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + (1 - (item.volunteers - minValue) / range) * chartHeight;
        return `${x},${y}`;
    }).join(' ');

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', points);
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', '#2563eb');
    polyline.setAttribute('stroke-width', '3');

    svg.appendChild(polyline);

    // Pontos
    data.forEach((item, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + (1 - (item.volunteers - minValue) / range) * chartHeight;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '6');
        circle.setAttribute('fill', '#2563eb');

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${item.month}: ${item.volunteers} voluntários`;
        circle.appendChild(title);

        svg.appendChild(circle);
    });

    container.appendChild(svg);
}

function createFallbackBarChart() {
    const container = document.getElementById('barChart');
    if (!container) return;

    const data = chartData.regionalImpact;
    const maxValue = Math.max(...data.map(d => d.people));

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '400');
    svg.setAttribute('viewBox', '0 0 600 400');

    const padding = 60;
    const chartWidth = 600 - 2 * padding;
    const chartHeight = 400 - 2 * padding;
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;

    data.forEach((item, index) => {
        const barHeight = (item.people / maxValue) * chartHeight;
        const x = padding + index * (barWidth + barSpacing);
        const y = padding + chartHeight - barHeight;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', barHeight);
        rect.setAttribute('fill', '#10b981');
        rect.setAttribute('rx', '4');

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${item.region}: ${item.people} pessoas`;
        rect.appendChild(title);

        svg.appendChild(rect);

        // Label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + barWidth / 2);
        text.setAttribute('y', padding + chartHeight + 20);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '12');
        text.textContent = item.region;

        svg.appendChild(text);
    });

    container.appendChild(svg);
}

// ===== ANIMAÇÕES E INTERAÇÕES =====
function animateCharts() {
    // Anima contadores nas métricas
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach(element => {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^\d.-]/g, ''));
        
        if (!isNaN(number)) {
            animateNumber(element, 0, number, 2000, text);
        }
    });
}

function animateNumber(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const isPercentage = originalText.includes('%');
    const isCurrency = originalText.includes('R$');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutQuart(progress);
        
        let formattedValue;
        if (isCurrency) {
            formattedValue = `R$ ${Math.floor(current).toLocaleString('pt-BR')}`;
        } else if (isPercentage) {
            formattedValue = `${Math.floor(current)}%`;
        } else {
            formattedValue = Math.floor(current).toLocaleString('pt-BR');
        }
        
        element.textContent = formattedValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = originalText;
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

// ===== INICIALIZAÇÃO COM INTERSECTION OBSERVER =====
function initializeChartsOnScroll() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                // Anima o container específico
                const chartId = entry.target.querySelector('.chart').id;
                
                setTimeout(() => {
                    if (chartId === 'pieChart') createPieChart();
                    if (chartId === 'lineChart') createLineChart();
                    if (chartId === 'barChart') createBarChart();
                }, 200);
            }
        });
    }, { threshold: 0.3 });
    
    chartContainers.forEach(container => {
        observer.observe(container);
    });
}

// Inicializa animações quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateCharts, 500);
    initializeChartsOnScroll();
});

// Exporta funções para uso global
window.ChartUtils = {
    chartData,
    animateCharts,
    createFallbackCharts
};
