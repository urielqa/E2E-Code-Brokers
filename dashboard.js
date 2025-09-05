// ===== DASHBOARD PROFISSIONAL - E2E CODE BROKERS =====

// Variáveis globais
let currentUser = null;
let currentAsset = 'PETR4';
let currentTimeframe = '1m';
let tradingChart = null;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    initializeParticles();
    initializeTradingChart();
    initializeTechForms(); // Inicializar formulários tecnológicos
    initializeTechButtons(); // Inicializar botões tecnológicos
    initializeAnalytics(); // Inicializar análises e relatórios
    setupEventListeners();
    loadUserData();
    loadUserAvatar(); // Carregar foto do usuário
    updateMarketData();
    checkMarketStatus();
    startRealTimeUpdates();
});

// ===== COTAÇÕES DOS ATIVOS =====
const assetQuotes = {
    'PETR4': 25.50,
    'VALE3': 45.20,
    'ITUB4': 28.75,
    'ABEV3': 12.30,
    'BBDC4': 22.80,
    'BBAS3': 35.40,
    'BRFS3': 8.90,
    'GGBR4': 1.00,
    'USIM5': 15.60,
    'MGLU3': 3.20,
    'LREN3': 18.45,
    'WEGE3': 42.10,
    'RADL3': 24.80,
    'TIMS3': 16.75
};

// ===== INICIALIZAÇÃO DO DASHBOARD =====
function initializeDashboard() {
    console.log('🚀 Inicializando Dashboard Profissional...');
    
    // Verificar se há usuário logado
    const userData = localStorage.getItem('usuarioLogado');
    if (!userData) {
        // Redirecionar para login se não houver usuário logado
        window.location.href = 'index.html';
        return;
    }
    
    // Não carregar dados aqui - deixar para loadUserData() fazer isso corretamente
    // currentUser = JSON.parse(userData);
    // updateUserInterface();
}

// ===== PARTICLES.JS CONFIGURATION =====
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00ffa3', '#00d4ff', '#a259ff']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: '#00ffa3',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 150,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ===== TRADING CHART =====
function initializeTradingChart() {
    const chartContainer = document.getElementById('tradingview_chart');
    if (!chartContainer) return;

    // Executar diagnóstico completo
    runTradingViewDiagnostic();

    // Aguardar TradingView carregar com múltiplas tentativas
    let attempts = 0;
    const maxAttempts = 15;

    const tryLoadChart = () => {
        attempts++;
        if (typeof TradingView !== 'undefined' && TradingView.widget) {
            console.log('✅ TradingView carregado, inicializando gráfico...');
            renderTradingViewChart(currentAsset);
        } else if (attempts < maxAttempts) {
            console.log(`⏳ Tentativa ${attempts}/${maxAttempts} - Aguardando TradingView...`);
            setTimeout(tryLoadChart, 1500);
        } else {
            console.error('❌ TradingView não carregou após múltiplas tentativas');
            showChartError();
        }
    };

    // Aguardar um pouco mais antes de começar as tentativas
    setTimeout(tryLoadChart, 2000);
    
    // Fallback adicional - tentar carregar o script do TradingView se não estiver disponível
    if (typeof TradingView === 'undefined') {
        console.log('🔄 TradingView não encontrado, tentando recarregar script...');
        loadTradingViewScript();
    }
}

// ===== DIAGNÓSTICO TRADINGVIEW =====
function runTradingViewDiagnostic() {
    console.log('🔍 === DIAGNÓSTICO TRADINGVIEW ===');
    
    // 1. Verificar se o script está carregado
    const tradingViewScript = document.querySelector('script[src*="tradingview.com"]');
    console.log('📜 Script TradingView encontrado:', !!tradingViewScript);
    if (tradingViewScript) {
        console.log('📜 URL do script:', tradingViewScript.src);
    }
    
    // 2. Verificar se TradingView está disponível globalmente
    console.log('🌐 TradingView global:', typeof TradingView);
    if (typeof TradingView !== 'undefined') {
        console.log('🌐 TradingView.widget:', typeof TradingView.widget);
        console.log('🌐 TradingView.charting_library:', typeof TradingView.charting_library);
    }
    
    // 3. Verificar conectividade
    testTradingViewConnectivity();
    
    // 4. Verificar container
    const container = document.getElementById('tradingview_chart');
    console.log('📦 Container encontrado:', !!container);
    if (container) {
        console.log('📦 Dimensões do container:', {
            width: container.offsetWidth,
            height: container.offsetHeight,
            display: getComputedStyle(container).display
        });
    }
    
    // 5. Verificar CSP (Content Security Policy)
    checkCSP();
    
    // 6. Verificar console por erros
    checkConsoleErrors();
    
    console.log('🔍 === FIM DO DIAGNÓSTICO ===');
}

function testTradingViewConnectivity() {
    console.log('🌐 Testando conectividade com TradingView...');
    
    // Testar se conseguimos acessar o CDN
    const testImage = new Image();
    testImage.onload = function() {
        console.log('✅ CDN TradingView acessível');
    };
    testImage.onerror = function() {
        console.log('❌ CDN TradingView inacessível');
    };
    testImage.src = 'https://s3.tradingview.com/favicon.ico';
    
    // Testar fetch para o script
    fetch('https://s3.tradingview.com/tv.js', { method: 'HEAD' })
        .then(response => {
            console.log('✅ Script TradingView acessível via fetch:', response.status);
        })
        .catch(error => {
            console.log('❌ Erro ao acessar script TradingView:', error.message);
        });
}

function checkCSP() {
    console.log('🛡️ Verificando Content Security Policy...');
    
    // Verificar se há meta tags CSP
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (cspMeta) {
        console.log('🛡️ CSP encontrado:', cspMeta.content);
    } else {
        console.log('🛡️ Nenhum CSP encontrado');
    }
    
    // Verificar se há headers CSP (isso seria visível no Network tab)
    console.log('🛡️ Verifique o Network tab para headers CSP');
}

function checkConsoleErrors() {
    console.log('🚨 Verificando erros no console...');
    
    // Interceptar erros temporariamente
    const originalError = console.error;
    const errors = [];
    
    console.error = function(...args) {
        errors.push(args.join(' '));
        originalError.apply(console, args);
    };
    
    // Restaurar após 5 segundos
    setTimeout(() => {
        console.error = originalError;
        if (errors.length > 0) {
            console.log('🚨 Erros capturados:', errors);
        } else {
            console.log('🚨 Nenhum erro capturado');
        }
    }, 5000);
}

function loadTradingViewScript() {
    // Verificar se o script já existe
    const existingScript = document.querySelector('script[src*="tradingview.com"]');
    if (existingScript) {
        existingScript.remove();
    }
    
    // Criar novo script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    
    script.onload = function() {
        console.log('✅ Script TradingView recarregado com sucesso');
        setTimeout(() => {
            initializeTradingChart();
        }, 1000);
    };
    
    script.onerror = function() {
        console.error('❌ Erro ao recarregar script TradingView');
        showChartError();
    };
    
    document.head.appendChild(script);
}

// ===== TESTE DE DIFERENTES URLs =====
function testDifferentTradingViewUrls() {
    console.log('🔗 Testando diferentes URLs do TradingView...');
    
    const urls = [
        'https://s3.tradingview.com/tv.js',
        'https://s3.tradingview.com/external-embedding/embedding.js',
        'https://s3.tradingview.com/widget-docs/widgets/charts/symbol-overview/symbol-overview.js'
    ];
    
    urls.forEach((url, index) => {
        console.log(`🔗 Testando URL ${index + 1}: ${url}`);
        
        fetch(url, { method: 'HEAD' })
            .then(response => {
                console.log(`✅ URL ${index + 1} acessível:`, response.status);
            })
            .catch(error => {
                console.log(`❌ URL ${index + 1} inacessível:`, error.message);
            });
    });
}

// ===== TESTE DE WIDGET SIMPLES =====
function testSimpleWidget() {
    console.log('🧪 Testando widget simples do TradingView...');
    
    const chartContainer = document.getElementById('tradingview_chart');
    if (!chartContainer) return;
    
    // Limpar container
    chartContainer.innerHTML = '';
    
    // Tentar criar um widget mais simples
    if (typeof TradingView !== 'undefined' && TradingView.widget) {
        try {
            // Configuração ULTRA SIMPLES para evitar TypeError
            const ultraSimpleConfig = {
                autosize: true,
                symbol: "BMFBOVESPA:PETR4",
                interval: "1",
                timezone: "America/Sao_Paulo",
                theme: "dark",
                style: "1",
                locale: "pt",
                enable_publishing: false,
                container_id: "tradingview_chart"
            };
            
            // Interceptar erros
            const originalError = console.error;
            console.error = function(...args) {
                const errorMessage = args.join(' ');
                if (errorMessage.includes('TypeError') || errorMessage.includes('Cannot read properties')) {
                    console.log('🚨 Erro interceptado no widget simples:', errorMessage);
                    showChartError();
                    return;
                }
                originalError.apply(console, args);
            };
            
            const simpleWidget = new TradingView.widget(ultraSimpleConfig);
            console.log('✅ Widget simples criado com sucesso');
            
            // Restaurar console.error
            setTimeout(() => {
                console.error = originalError;
            }, 5000);
            
        } catch (error) {
            console.error('❌ Erro ao criar widget simples:', error);
            showChartError();
        }
    } else {
        console.log('❌ TradingView não disponível para widget simples');
        showChartError();
    }
}

// ===== WIDGET ALTERNATIVO SEM TRADINGVIEW =====
function createAlternativeWidget() {
    console.log('🔄 Criando widget alternativo sem TradingView...');
    
    const chartContainer = document.getElementById('tradingview_chart');
    if (!chartContainer) return;
    
    const symbol = currentAsset || 'PETR4';
    const currentPrice = getCurrentPrice(symbol);
    
    chartContainer.innerHTML = `
        <div class="alternative-widget">
            <div class="widget-header">
                <div class="symbol-info">
                    <h3>${symbol}</h3>
                    <span class="exchange">BMFBOVESPA</span>
                </div>
                <div class="price-info">
                    <span class="current-price">${formatCurrency(currentPrice)}</span>
                    <span class="price-change positive">+0.5%</span>
                </div>
            </div>
            
            <div class="widget-chart">
                <canvas id="alternativeChart" width="600" height="300"></canvas>
            </div>
            
            <div class="widget-controls">
                <div class="timeframe-selector">
                    <button class="tf-btn active" data-tf="1m">1m</button>
                    <button class="tf-btn" data-tf="5m">5m</button>
                    <button class="tf-btn" data-tf="15m">15m</button>
                    <button class="tf-btn" data-tf="1h">1h</button>
                    <button class="tf-btn" data-tf="1d">1D</button>
                </div>
                <div class="chart-actions">
                    <button onclick="showAlternativeChart()" class="btn-refresh">
                        <i class="fas fa-sync-alt"></i>
                        Atualizar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Desenhar gráfico alternativo
    drawAlternativeChart(symbol, currentPrice);
}

function drawAlternativeChart(symbol, basePrice) {
    const canvas = document.getElementById('alternativeChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configurações
    const padding = 30;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Gerar dados simulados mais realistas
    const dataPoints = 60;
    const data = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < dataPoints; i++) {
        const change = (Math.random() - 0.5) * 0.015; // ±0.75% de variação
        currentPrice *= (1 + change);
        data.push({
            price: currentPrice,
            volume: Math.random() * 1000000
        });
    }
    
    // Encontrar min/max
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Desenhar fundo
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, width, height);
    
    // Desenhar grid
    ctx.strokeStyle = 'rgba(0, 255, 163, 0.1)';
    ctx.lineWidth = 1;
    
    // Linhas horizontais
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Linhas verticais
    for (let i = 0; i <= 10; i++) {
        const x = padding + (chartWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }
    
    // Desenhar linha do gráfico
    ctx.strokeStyle = '#00ffa3';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((point, index) => {
        const x = padding + (chartWidth / (dataPoints - 1)) * index;
        const y = height - padding - ((point.price - minPrice) / priceRange) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Desenhar área sob a linha
    ctx.fillStyle = 'rgba(0, 255, 163, 0.1)';
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    data.forEach((point, index) => {
        const x = padding + (chartWidth / (dataPoints - 1)) * index;
        const y = height - padding - ((point.price - minPrice) / priceRange) * chartHeight;
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Adicionar labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    
    // Preço atual
    const lastPrice = data[data.length - 1].price;
    const lastX = width - padding;
    const lastY = height - padding - ((lastPrice - minPrice) / priceRange) * chartHeight;
    
    ctx.fillText(formatCurrency(lastPrice), lastX, lastY - 10);
    
    // Labels dos eixos
    ctx.textAlign = 'right';
    ctx.fillText(formatCurrency(maxPrice), padding - 10, padding + 5);
    ctx.fillText(formatCurrency(minPrice), padding - 10, height - padding + 5);
}

function renderTradingViewChart(symbol) {
    const chartContainer = document.getElementById('tradingview_chart');
    if (!chartContainer) return;
    
    console.log(`📊 Renderizando gráfico para ${symbol}`);
    
    // Limpar container
    chartContainer.innerHTML = '';
    
    // Mostrar loading
    chartContainer.innerHTML = `
        <div class="chart-placeholder">
            <i class="fas fa-chart-line"></i>
            <p>Carregando gráfico ${symbol}...</p>
        </div>
    `;
    
    // Configuração MÍNIMA para evitar TypeError
    const widgetConfig = {
        autosize: true,
        symbol: `BMFBOVESPA:${symbol}`,
        interval: "1",
        timezone: "America/Sao_Paulo",
        theme: "dark",
        style: "1",
        locale: "pt",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        container_id: "tradingview_chart"
    };
    
    try {
        if (typeof TradingView !== 'undefined' && TradingView.widget) {
            // Destruir gráfico anterior se existir
            if (tradingChart) {
                try {
                    tradingChart.remove();
                } catch (e) {
                    console.log('Gráfico anterior removido');
                }
            }
            
            // Interceptar erros do TradingView
            const originalConsoleError = console.error;
            console.error = function(...args) {
                const errorMessage = args.join(' ');
                if (errorMessage.includes('TypeError') || errorMessage.includes('Cannot read properties')) {
                    console.log('🚨 Erro do TradingView interceptado:', errorMessage);
                    showChartError();
                    return;
                }
                originalConsoleError.apply(console, args);
            };
            
            tradingChart = new TradingView.widget(widgetConfig);
            console.log(`✅ Gráfico TradingView carregado para ${symbol}`);
            
            // Restaurar console.error após 5 segundos
            setTimeout(() => {
                console.error = originalConsoleError;
            }, 5000);
            
            // Aguardar o gráfico carregar completamente
            setTimeout(() => {
                updateOrderPrice(symbol);
            }, 3000);
        } else {
            console.warn('TradingView não está disponível');
            showChartError();
        }
    } catch (error) {
        console.error('Erro ao carregar gráfico TradingView:', error);
        showChartError();
    }
}

function updateTradingChart(symbol) {
    console.log(`📊 Atualizando gráfico para ${symbol}`);
    renderTradingViewChart(symbol);
}

function showChartError() {
    const chartContainer = document.getElementById('tradingview_chart');
    if (chartContainer) {
        chartContainer.innerHTML = `
            <div class="chart-placeholder">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erro ao carregar gráfico</h3>
                <p>O gráfico TradingView não pôde ser carregado. Isso pode ser devido a:</p>
                <ul>
                    <li>Problemas de conexão com a internet</li>
                    <li>Bloqueio de scripts externos</li>
                    <li>Limitações do TradingView</li>
                </ul>
                <div class="chart-actions">
                    <button onclick="initializeTradingChart()" class="btn-refresh">
                        <i class="fas fa-sync-alt"></i>
                        Tentar Novamente
                    </button>
                    <button onclick="runTradingViewDiagnostic()" class="btn-diagnostic">
                        <i class="fas fa-stethoscope"></i>
                        Diagnóstico
                    </button>
                    <button onclick="testDifferentTradingViewUrls()" class="btn-test">
                        <i class="fas fa-link"></i>
                        Testar URLs
                    </button>
                    <button onclick="testSimpleWidget()" class="btn-test">
                        <i class="fas fa-cog"></i>
                        Widget Simples
                    </button>
                    <button onclick="createAlternativeWidget()" class="btn-alternative">
                        <i class="fas fa-chart-line"></i>
                        Widget Alternativo
                    </button>
                    <button onclick="showAlternativeChart()" class="btn-alternative">
                        <i class="fas fa-chart-area"></i>
                        Gráfico Simulado
                    </button>
                </div>
                <div class="diagnostic-info">
                    <p><i class="fas fa-info-circle"></i> Abra o Console (F12) para ver os logs de diagnóstico</p>
                </div>
            </div>
        `;
    }
}

// ===== GRÁFICO ALTERNATIVO =====
function showAlternativeChart() {
    const chartContainer = document.getElementById('tradingview_chart');
    if (!chartContainer) return;
    
    const symbol = currentAsset || 'PETR4';
    const currentPrice = getCurrentPrice(symbol);
    
    chartContainer.innerHTML = `
        <div class="alternative-chart">
            <div class="chart-header-alt">
                <h3>${symbol} - Gráfico Simulado</h3>
                <p>Preço atual: ${formatCurrency(currentPrice)}</p>
            </div>
            <div class="chart-simulation">
                <canvas id="simulatedChart" width="800" height="400"></canvas>
            </div>
            <div class="chart-info">
                <p><i class="fas fa-info-circle"></i> Este é um gráfico simulado para demonstração. Para dados reais, use o TradingView.</p>
            </div>
        </div>
    `;
    
    // Desenhar gráfico simulado
    drawSimulatedChart(symbol, currentPrice);
}

function drawSimulatedChart(symbol, basePrice) {
    const canvas = document.getElementById('simulatedChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configurações
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Gerar dados simulados
    const dataPoints = 50;
    const data = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < dataPoints; i++) {
        const change = (Math.random() - 0.5) * 0.02; // ±1% de variação
        currentPrice *= (1 + change);
        data.push(currentPrice);
    }
    
    // Encontrar min/max
    const minPrice = Math.min(...data);
    const maxPrice = Math.max(...data);
    const priceRange = maxPrice - minPrice;
    
    // Desenhar grid
    ctx.strokeStyle = 'rgba(0, 255, 163, 0.1)';
    ctx.lineWidth = 1;
    
    // Linhas horizontais
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Linhas verticais
    for (let i = 0; i <= 10; i++) {
        const x = padding + (chartWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }
    
    // Desenhar linha do gráfico
    ctx.strokeStyle = '#00ffa3';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((price, index) => {
        const x = padding + (chartWidth / (dataPoints - 1)) * index;
        const y = height - padding - ((price - minPrice) / priceRange) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Desenhar pontos
    ctx.fillStyle = '#00ffa3';
    data.forEach((price, index) => {
        const x = padding + (chartWidth / (dataPoints - 1)) * index;
        const y = height - padding - ((price - minPrice) / priceRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Adicionar labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    
    // Preço atual
    const lastPrice = data[data.length - 1];
    const lastX = width - padding;
    const lastY = height - padding - ((lastPrice - minPrice) / priceRange) * chartHeight;
    
    ctx.fillText(formatCurrency(lastPrice), lastX, lastY - 10);
    
    // Labels dos eixos
    ctx.textAlign = 'right';
    ctx.fillText(formatCurrency(maxPrice), padding - 10, padding + 5);
    ctx.fillText(formatCurrency(minPrice), padding - 10, height - padding + 5);
}

// ===== FORMULÁRIOS TECNOLÓGICOS =====
function initializeTechForms() {
    console.log('🚀 Inicializando formulários tecnológicos...');
    
    // Adicionar efeitos visuais a todos os inputs
    document.querySelectorAll('input, select, textarea').forEach(input => {
        addTechFormEffects(input);
    });
    
    // Adicionar validação em tempo real
    document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], textarea').forEach(input => {
        addRealTimeValidation(input);
    });
    
    // Adicionar efeitos de digitação
    document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
        addTypingEffects(input);
    });
}

function addTechFormEffects(input) {
    // Efeito de hover
    input.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
    });
    
    input.addEventListener('mouseleave', function() {
        if (!this.matches(':focus')) {
            this.style.transform = 'translateY(0)';
        }
    });
    
    // Efeito de focus
    input.addEventListener('focus', function() {
        this.style.transform = 'translateY(-2px)';
        this.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'translateY(0)';
        this.classList.remove('focused');
    });
    
    // Efeito de preenchimento
    input.addEventListener('input', function() {
        if (this.value.length > 0) {
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
    });
}

function addRealTimeValidation(input) {
    input.addEventListener('input', function() {
        const value = this.value.trim();
        
        // Remover classes anteriores
        this.classList.remove('valid', 'invalid', 'loading', 'success-animation', 'error-animation');
        
        if (value.length === 0) {
            return;
        }
        
        // Adicionar efeito de loading
        this.classList.add('loading');
        
        // Simular validação
        setTimeout(() => {
            this.classList.remove('loading');
            
            const isValid = validateField(this);
            
            if (isValid) {
                this.classList.add('valid', 'success-animation');
                setTimeout(() => {
                    this.classList.remove('success-animation');
                }, 600);
            } else {
                this.classList.add('invalid', 'error-animation');
                setTimeout(() => {
                    this.classList.remove('error-animation');
                }, 600);
            }
        }, 500);
    });
}

function addTypingEffects(input) {
    let typingTimer;
    
    input.addEventListener('input', function() {
        this.classList.add('typing');
        
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            this.classList.remove('typing');
        }, 1000);
    });
}

function validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    const name = input.name || input.id;
    
    switch (type) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case 'number':
            return !isNaN(value) && value.length > 0;
        default:
            if (name.includes('cpf')) {
                return validateCPF(value);
            }
            if (name.includes('phone') || name.includes('whatsapp')) {
                return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value);
            }
            return value.length >= 2;
    }
}

// ===== BOTÕES TECNOLÓGICOS =====
function initializeTechButtons() {
    console.log('🚀 Inicializando botões tecnológicos...');
    
    // Adicionar efeitos aos botões de compra e venda
    document.querySelectorAll('.btn-tech').forEach(button => {
        addTechButtonEffects(button);
    });
    
    // Inicializar botões do gráfico
    initializeChartButtons();
    
}

function addTechButtonEffects(button) {
    // Efeito de hover
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        if (!this.classList.contains('loading')) {
            this.style.transform = 'translateY(0)';
        }
    });
    
    // Efeito de clique
    button.addEventListener('click', function() {
        this.classList.add('loading');
        
        // Simular processamento
        setTimeout(() => {
            this.classList.remove('loading');
            this.classList.add('success');
            
            setTimeout(() => {
                this.classList.remove('success');
            }, 1000);
        }, 2000);
    });
}

function showButtonFeedback(button, type) {
    button.classList.remove('loading', 'success', 'error');
    
    if (type === 'loading') {
        button.classList.add('loading');
    } else if (type === 'success') {
        button.classList.add('success');
        setTimeout(() => {
            button.classList.remove('success');
        }, 1000);
    } else if (type === 'error') {
        button.classList.add('error');
        setTimeout(() => {
            button.classList.remove('error');
        }, 1000);
    }
}

// ===== BOTÕES DO GRÁFICO =====
function initializeChartButtons() {
    console.log('🚀 Inicializando botões do gráfico...');
    
    // Botão de indicadores
    const indicatorsBtn = document.querySelector('.tool-btn[title="Indicadores"]');
    if (indicatorsBtn) {
        indicatorsBtn.addEventListener('click', toggleIndicators);
    }
    
    // Botão de desenhar
    const drawBtn = document.querySelector('.tool-btn[title="Desenhar"]');
    if (drawBtn) {
        drawBtn.addEventListener('click', toggleDrawingTools);
    }
    
    // Botão de fullscreen
    const fullscreenBtn = document.querySelector('.tool-btn[title="Fullscreen"]');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
}

function toggleIndicators() {
    console.log('📊 Alternando indicadores...');
    
    // Simular toggle de indicadores
    const chartContainer = document.getElementById('tradingview_chart');
    if (chartContainer) {
        const hasIndicators = chartContainer.classList.contains('indicators-active');
        
        if (hasIndicators) {
            chartContainer.classList.remove('indicators-active');
            showNotification('Indicadores desabilitados', 'info');
        } else {
            chartContainer.classList.add('indicators-active');
            showNotification('Indicadores habilitados', 'success');
        }
    }
}

function toggleDrawingTools() {
    console.log('✏️ Alternando ferramentas de desenho...');
    
    // Simular toggle de ferramentas de desenho
    const chartContainer = document.getElementById('tradingview_chart');
    if (chartContainer) {
        const hasDrawingTools = chartContainer.classList.contains('drawing-active');
        
        if (hasDrawingTools) {
            chartContainer.classList.remove('drawing-active');
            showNotification('Ferramentas de desenho desabilitadas', 'info');
        } else {
            chartContainer.classList.add('drawing-active');
            showNotification('Ferramentas de desenho habilitadas', 'success');
        }
    }
}

function toggleFullscreen() {
    console.log('🖥️ Alternando fullscreen...');
    
    const chartContainer = document.getElementById('tradingview_chart');
    if (!chartContainer) return;
    
    if (!document.fullscreenElement) {
        // Entrar em fullscreen
        if (chartContainer.requestFullscreen) {
            chartContainer.requestFullscreen();
        } else if (chartContainer.webkitRequestFullscreen) {
            chartContainer.webkitRequestFullscreen();
        } else if (chartContainer.msRequestFullscreen) {
            chartContainer.msRequestFullscreen();
        }
        
        // Adicionar classe para estilização
        chartContainer.classList.add('fullscreen-active');
        showNotification('Gráfico em tela cheia', 'success');
        
    } else {
        // Sair do fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        // Remover classe
        chartContainer.classList.remove('fullscreen-active');
        showNotification('Saindo da tela cheia', 'info');
    }
}

// Escutar mudanças de fullscreen
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    const chartContainer = document.getElementById('tradingview_chart');
    if (!chartContainer) return;
    
    if (document.fullscreenElement) {
        chartContainer.classList.add('fullscreen-active');
    } else {
        chartContainer.classList.remove('fullscreen-active');
    }
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    // Remover notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navegação da sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Seletor de ativo
    const assetSelector = document.getElementById('assetSelector');
    if (assetSelector) {
        assetSelector.addEventListener('change', function() {
            currentAsset = this.value;
            updateTradingChart();
            updateOrderPrice(this.value);
        });
    }
    
    // Seletor de ativo na boleta
    const orderAssetSelector = document.getElementById('orderAsset');
    if (orderAssetSelector) {
        orderAssetSelector.addEventListener('change', function() {
            updateOrderPrice(this.value);
            // Sincronizar com o seletor do gráfico
            const chartAssetSelector = document.getElementById('assetSelector');
            if (chartAssetSelector && chartAssetSelector.value !== this.value) {
                chartAssetSelector.value = this.value;
                currentAsset = this.value;
                updateTradingChart();
            }
        });
    }
    
    // Timeframes
    document.querySelectorAll('.timeframe-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTimeframe = this.getAttribute('data-timeframe');
            updateTradingChart();
        });
    });
    
    // Toggle de ordem
    document.querySelectorAll('.order-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.order-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Toggle Alta/Baixa em Principais Movimentações
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            updateTopMovers(view);
        });
    });
    
    // Campos da ordem
    const orderQuantity = document.getElementById('orderQuantity');
    const orderPrice = document.getElementById('orderPrice');
    
    if (orderQuantity) {
        orderQuantity.addEventListener('input', calculateOrderTotal);
    }
    
    if (orderPrice) {
        orderPrice.addEventListener('input', calculateOrderTotal);
    }
    
    // Botão de atualizar
    const refreshBtn = document.querySelector('.btn-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', updateMarketData);
    }
    
    // Botão de configurações
    const settingsBtn = document.querySelector('.btn-settings');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', showSettings);
    }
    
    // Botão cancelar todas as ordens
    const cancelAllBtn = document.querySelector('.btn-cancel-all');
    if (cancelAllBtn) {
        cancelAllBtn.addEventListener('click', cancelAllOrders);
    }
    
    // Botões de exportar
    const exportBtns = document.querySelectorAll('.btn-export');
    exportBtns.forEach(btn => {
        btn.addEventListener('click', showExportMenu);
    });
}

// ===== NAVEGAÇÃO DE TABS =====
function switchTab(tabId) {
    // Remover active de todos os nav-items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Adicionar active ao item clicado
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Esconder todos os tab-contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Mostrar o tab-content correspondente
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
        
        // Carregar dados específicos da tab
        loadTabData(tabId);
    }
}

function loadTabData(tabId) {
    switch (tabId) {
        case 'overview':
            updateMarketOverview();
            break;
        case 'trading':
            updateTradingChart();
            break;
        case 'portfolio':
            updatePortfolio();
            break;
        case 'orders':
            updateOrders();
            break;
        case 'history':
            updateHistory();
            break;
        case 'analytics':
            updateAnalytics();
            break;
    }
}

// ===== PROFILE MODAL =====
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    
    if (!currentUser) {
        showNotification('Usuário não encontrado. Faça login novamente.', 'error');
        return;
    }
    
    // Carregar dados do perfil
    loadProfileData();
    
    // Mostrar modal
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.zIndex = '9999';
    
    // Adicionar evento para fechar clicando fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProfileModal();
        }
    });
    
    // Adicionar evento para fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProfileModal();
        }
    });
}

// Funções globais
window.openProfileModal = openProfileModal;
window.logout = logout;

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
        
        // Remover event listeners
        modal.removeEventListener('click', arguments.callee);
        document.removeEventListener('keydown', arguments.callee);
    }
}

function loadProfileData() {
    console.log('📊 Carregando dados do perfil...');
    if (!currentUser) {
        console.error('❌ Usuário não encontrado');
        return;
    }

    console.log('👤 Dados do usuário:', currentUser);

    // Informações pessoais
    const nameField = document.getElementById('profileName');
    const emailField = document.getElementById('profileEmail');
    const whatsappField = document.getElementById('profileWhatsApp');
    const cpfField = document.getElementById('profileCPF');
    
    if (nameField) nameField.value = currentUser.nome || '';
    if (emailField) emailField.value = currentUser.email || '';
    if (whatsappField) whatsappField.value = currentUser.whatsapp || '';
    if (cpfField) cpfField.value = currentUser.cpf || '';

    // Informações da conta
    const registrationDate = currentUser.dataRegistro ? new Date(currentUser.dataRegistro) : new Date();
    const registrationField = document.getElementById('profileRegistrationDate');
    if (registrationField) registrationField.value = registrationDate.toLocaleDateString('pt-BR');
    
    const timeOnPlatform = calculateTimeOnPlatform(registrationDate);
    const timeField = document.getElementById('profileTimeOnPlatform');
    if (timeField) timeField.value = timeOnPlatform;
    
    const userIdField = document.getElementById('profileUserId');
    if (userIdField) userIdField.value = currentUser.id || 'N/A';

    console.log('✅ Dados básicos carregados');

    // Carregar foto de perfil se existir
    loadProfilePhoto();

    // Estatísticas de trading
    loadTradingStats();

    // Resumo da carteira
    loadPortfolioSummary();
    
    console.log('✅ Todos os dados do perfil carregados');
}

function calculateTimeOnPlatform(registrationDate) {
    const now = new Date();
    const diffTime = Math.abs(now - registrationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
        return `${diffDays} dias`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else {
        const years = Math.floor(diffDays / 365);
        const remainingMonths = Math.floor((diffDays % 365) / 30);
        return `${years} ${years === 1 ? 'ano' : 'anos'}${remainingMonths > 0 ? ` e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}` : ''}`;
    }
}

function loadProfilePhoto() {
    const profileImage = document.getElementById('profileImage');
    const profilePhotoPlaceholder = document.getElementById('profilePhotoPlaceholder');
    const userAvatarImg = document.getElementById('userAvatarImg');
    const userAvatarIcon = document.getElementById('userAvatarIcon');
    
    if (currentUser && currentUser.fotoPerfil) {
        profileImage.src = currentUser.fotoPerfil;
        profileImage.style.display = 'block';
        profilePhotoPlaceholder.style.display = 'none';
        
        // Atualizar avatar no dashboard
        if (userAvatarImg) {
            userAvatarImg.src = currentUser.fotoPerfil;
            userAvatarImg.style.display = 'block';
            userAvatarIcon.style.display = 'none';
        }
    } else {
        profileImage.style.display = 'none';
        profilePhotoPlaceholder.style.display = 'flex';
        
        // Resetar avatar no dashboard
        if (userAvatarImg) {
            userAvatarImg.style.display = 'none';
            userAvatarIcon.style.display = 'block';
        }
    }
}

// Função para carregar foto do usuário no dashboard
function loadUserAvatar() {
    if (!currentUser) return;
    
    const userAvatarImg = document.getElementById('userAvatarImg');
    const userAvatarIcon = document.getElementById('userAvatarIcon');
    
    if (currentUser.fotoPerfil) {
        if (userAvatarImg && userAvatarIcon) {
            userAvatarImg.src = currentUser.fotoPerfil;
            userAvatarImg.style.display = 'block';
            userAvatarIcon.style.display = 'none';
        }
    } else {
        if (userAvatarImg && userAvatarIcon) {
            userAvatarImg.style.display = 'none';
            userAvatarIcon.style.display = 'block';
        }
    }
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            showNotification('Por favor, selecione apenas arquivos de imagem.', 'error');
            return;
        }

        // Validar tamanho (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('A imagem deve ter no máximo 5MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            // Atualizar foto no modal
            const profileImage = document.getElementById('profileImage');
            const profilePhotoPlaceholder = document.getElementById('profilePhotoPlaceholder');
            
            if (profileImage && profilePhotoPlaceholder) {
                profileImage.src = e.target.result;
                profileImage.style.display = 'block';
                profilePhotoPlaceholder.style.display = 'none';
            }
            
            // Atualizar foto no dashboard
            const userAvatarImg = document.getElementById('userAvatarImg');
            const userAvatarIcon = document.getElementById('userAvatarIcon');
            
            if (userAvatarImg && userAvatarIcon) {
                userAvatarImg.src = e.target.result;
                userAvatarImg.style.display = 'block';
                userAvatarIcon.style.display = 'none';
            }

            // Salvar no currentUser e localStorage
            if (currentUser) {
                currentUser.fotoPerfil = e.target.result;
                
                // Salvar no localStorage (usuarioLogado)
                localStorage.setItem('usuarioLogado', JSON.stringify(currentUser));
                
                // Atualizar também na lista de usuários
                const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
                const userIndex = usuarios.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    usuarios[userIndex].fotoPerfil = e.target.result;
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                }
                
                showNotification('Foto de perfil atualizada com sucesso!', 'success');
            }
        };
        reader.readAsDataURL(file);
    }
}

function loadTradingStats() {
    if (!currentUser) return;

    // Total investido - carteira é um objeto, não array
    let totalInvested = 0;
    if (currentUser.carteira && typeof currentUser.carteira === 'object') {
        Object.values(currentUser.carteira).forEach(asset => {
            if (asset && typeof asset.quantidade === 'number' && typeof asset.precoMedio === 'number') {
                totalInvested += (asset.quantidade * asset.precoMedio);
            }
        });
    }
    document.getElementById('totalInvested').textContent = formatCurrency(totalInvested);

    // Total de operações - verificar se extrato é array
    let totalOperations = 0;
    if (currentUser.extrato && Array.isArray(currentUser.extrato)) {
        totalOperations = currentUser.extrato.length;
    }
    document.getElementById('totalOperations').textContent = totalOperations;

    // Taxa de sucesso (simulada)
    const successRate = totalOperations > 0 ? Math.floor(Math.random() * 30) + 70 : 0;
    document.getElementById('successRate').textContent = `${successRate}%`;

    // Saldo atual
    document.getElementById('currentBalance').textContent = formatCurrency(currentUser.saldo || 0);
}

function loadPortfolioSummary() {
    const portfolioSummary = document.getElementById('portfolioSummary');
    
    if (!currentUser || !currentUser.carteira || typeof currentUser.carteira !== 'object' || Object.keys(currentUser.carteira).length === 0) {
        portfolioSummary.innerHTML = `
            <div class="empty-portfolio">
                <i class="fas fa-wallet"></i>
                <p>Nenhum ativo em carteira</p>
            </div>
        `;
        return;
    }

    const portfolioHTML = Object.entries(currentUser.carteira).map(([symbol, asset]) => {
        if (!asset || !asset.quantidade || !asset.precoMedio) {
            return '';
        }
        return `
            <div class="portfolio-item">
                <div class="asset-info">
                    <span class="asset-symbol">${symbol}</span>
                    <span class="asset-quantity">${asset.quantidade} ações</span>
                </div>
                <div class="asset-value">
                    <span class="asset-price">${formatCurrency(asset.precoMedio)}</span>
                    <span class="asset-total">${formatCurrency(asset.quantidade * asset.precoMedio)}</span>
                </div>
            </div>
        `;
    }).filter(html => html !== '').join('');

    portfolioSummary.innerHTML = `
        <div class="portfolio-items">
            ${portfolioHTML}
        </div>
    `;
}

// ===== FUNÇÕES DE EDIÇÃO =====
let isEditMode = false;

function toggleEditMode() {
    isEditMode = !isEditMode;
    const modal = document.getElementById('profileModal');
    const editBtnText = document.getElementById('editBtnText');
    const inputs = modal.querySelectorAll('.profile-field input:not(.readonly-field)');
    
    if (isEditMode) {
        modal.classList.add('edit-mode');
        editBtnText.textContent = 'Salvar Alterações';
        inputs.forEach(input => {
            input.removeAttribute('readonly');
        });
    } else {
        // Validar todos os campos antes de salvar
        if (!validateAllProfileFields()) {
            showNotification('Por favor, corrija os erros nos campos antes de salvar!', 'error');
            return;
        }
        
        modal.classList.remove('edit-mode');
        editBtnText.textContent = 'Editar Perfil';
        inputs.forEach(input => {
            input.setAttribute('readonly', 'readonly');
        });
        saveProfileChanges();
    }
}

// ===== VALIDAÇÕES DO PERFIL =====
function validateProfileName(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('profileNameError');
    
    if (!value) {
        showFieldError(input, errorElement, 'Nome é obrigatório');
        return false;
    }
    
    if (value.length < 2) {
        showFieldError(input, errorElement, 'Nome deve ter pelo menos 2 caracteres');
        return false;
    }
    
    if (value.length > 100) {
        showFieldError(input, errorElement, 'Nome deve ter no máximo 100 caracteres');
        return false;
    }
    
    // Verificar se contém apenas letras e espaços
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
        showFieldError(input, errorElement, 'Nome deve conter apenas letras e espaços');
        return false;
    }
    
    showFieldSuccess(input, errorElement);
    return true;
}

function validateProfileEmail(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('profileEmailError');
    
    if (!value) {
        showFieldError(input, errorElement, 'E-mail é obrigatório');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        showFieldError(input, errorElement, 'E-mail inválido');
        return false;
    }
    
    // Verificar se o email já existe (exceto o próprio usuário)
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const emailExists = usuarios.some(u => u.email === value && u.email !== currentUser.email);
    
    if (emailExists) {
        showFieldError(input, errorElement, 'Este e-mail já está em uso');
        return false;
    }
    
    showFieldSuccess(input, errorElement);
    return true;
}

function validateProfileWhatsApp(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('profileWhatsAppError');
    
    if (!value) {
        showFieldError(input, errorElement, 'WhatsApp é obrigatório');
        return false;
    }
    
    // Remover caracteres não numéricos para validação
    const cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.length < 10 || cleanValue.length > 11) {
        showFieldError(input, errorElement, 'WhatsApp deve ter 10 ou 11 dígitos');
        return false;
    }
    
    if (!cleanValue.startsWith('11') && !cleanValue.startsWith('21') && !cleanValue.startsWith('31') && 
        !cleanValue.startsWith('41') && !cleanValue.startsWith('51') && !cleanValue.startsWith('61') && 
        !cleanValue.startsWith('71') && !cleanValue.startsWith('81') && !cleanValue.startsWith('85')) {
        showFieldError(input, errorElement, 'DDD inválido');
        return false;
    }
    
    showFieldSuccess(input, errorElement);
    return true;
}

function validateProfileCPF(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('profileCPFError');
    
    if (!value) {
        showFieldError(input, errorElement, 'CPF é obrigatório');
        return false;
    }
    
    if (!validateCPF(value)) {
        showFieldError(input, errorElement, 'CPF inválido');
        return false;
    }
    
    showFieldSuccess(input, errorElement);
    return true;
}

function showFieldError(input, errorElement, message) {
    input.classList.remove('success');
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function showFieldSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function validateAllProfileFields() {
    const nameValid = validateProfileName(document.getElementById('profileName'));
    const emailValid = validateProfileEmail(document.getElementById('profileEmail'));
    const whatsappValid = validateProfileWhatsApp(document.getElementById('profileWhatsApp'));
    const cpfValid = validateProfileCPF(document.getElementById('profileCPF'));
    
    return nameValid && emailValid && whatsappValid && cpfValid;
}

function saveProfileChanges() {
    if (!currentUser) return;
    
    // Salvar alterações nos campos editáveis
    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    const whatsappInput = document.getElementById('profileWhatsApp');
    const cpfInput = document.getElementById('profileCPF');
    
    if (nameInput) currentUser.nome = nameInput.value.trim();
    if (emailInput) currentUser.email = emailInput.value.trim();
    if (whatsappInput) currentUser.whatsapp = whatsappInput.value.trim();
    if (cpfInput) currentUser.cpf = cpfInput.value.trim();
    
    // Salvar no localStorage
    localStorage.setItem('usuarioLogado', JSON.stringify(currentUser));
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const userIndex = usuarios.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        usuarios[userIndex] = currentUser;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    
    // Atualizar nome no dashboard
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = currentUser.nome;
    }
    
    showNotification('Perfil atualizado com sucesso!', 'success');
}

// ===== FUNÇÕES FINANCEIRAS =====
function showDepositModal() {
    const modal = document.getElementById('depositModal');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.zIndex = '10000';
}

function closeDepositModal() {
    const modal = document.getElementById('depositModal');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
}

// ===== VALIDAÇÕES DE CONTA BANCÁRIA =====
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validar dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

function validateBankAccount(bank, agency, account) {
    // Validação básica de agência (4 dígitos)
    if (!agency || agency.length !== 4 || !/^\d{4}$/.test(agency)) {
        return { valid: false, message: 'Agência deve ter 4 dígitos numéricos' };
    }
    
    // Validação básica de conta (6-8 dígitos)
    if (!account || account.length < 6 || account.length > 8 || !/^\d+$/.test(account)) {
        return { valid: false, message: 'Conta deve ter entre 6 e 8 dígitos numéricos' };
    }
    
    // Validações específicas por banco (baseadas no gerador do 4Devs)
    switch (bank) {
        case '001': // Banco do Brasil
            if (account.length !== 8) {
                return { valid: false, message: 'Conta do Banco do Brasil deve ter 8 dígitos' };
            }
            break;
        case '237': // Bradesco
            if (account.length !== 7) {
                return { valid: false, message: 'Conta do Bradesco deve ter 7 dígitos' };
            }
            break;
        case '341': // Itaú
            if (account.length !== 5) {
                return { valid: false, message: 'Conta do Itaú deve ter 5 dígitos' };
            }
            break;
        case '033': // Santander
            if (account.length !== 8) {
                return { valid: false, message: 'Conta do Santander deve ter 8 dígitos' };
            }
            break;
        case '104': // Caixa
            if (account.length !== 6) {
                return { valid: false, message: 'Conta da Caixa deve ter 6 dígitos' };
            }
            break;
    }
    
    return { valid: true, message: 'Conta válida' };
}

function toggleBankFields() {
    const method = document.getElementById('depositMethod').value;
    const bankFields = document.getElementById('bankFields');
    const accountFields = document.getElementById('accountFields');
    const pixFields = document.getElementById('pixFields');
    const pixKeyField = document.getElementById('pixKeyField');
    
    if (method === 'pix') {
        bankFields.style.display = 'none';
        accountFields.style.display = 'none';
        pixFields.style.display = 'block';
    } else {
        bankFields.style.display = 'block';
        accountFields.style.display = 'block';
        pixFields.style.display = 'none';
        pixKeyField.style.display = 'none';
    }
}

function processDeposit() {
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const method = document.getElementById('depositMethod').value;
    const bank = document.getElementById('depositBank').value;
    const agency = document.getElementById('depositAgency').value;
    const account = document.getElementById('depositAccount').value;
    const pixKeyType = document.getElementById('pixKeyType').value;
    const pixKeyValue = document.getElementById('pixKeyValue').value;
    
    if (!amount || amount <= 0) {
        showNotification('Por favor, insira um valor válido!', 'error');
        return;
    }
    
    // Validar PIX
    if (method === 'pix') {
        if (!pixKeyType) {
            showNotification('Por favor, selecione o tipo de chave PIX!', 'error');
            return;
        }
        
        if (!validatePixKey()) {
            showNotification('Por favor, insira uma chave PIX válida!', 'error');
            return;
        }
    }
    
    // Validar campos bancários se necessário
    if (method !== 'pix') {
        if (!bank) {
            showNotification('Por favor, selecione o banco!', 'error');
            return;
        }
        
        const accountValidation = validateBankAccount(bank, agency, account);
        if (!accountValidation.valid) {
            showNotification(accountValidation.message, 'error');
            return;
        }
    }
    
    // Simular processamento
    let message = `Depósito de R$ ${amount.toFixed(2)} via ${method.toUpperCase()} processado!`;
    if (method === 'pix') {
        message += `\nChave PIX: ${pixKeyValue}`;
    }
    showNotification(message, 'success');
    
    // Atualizar saldo
    if (currentUser) {
        currentUser.saldo = (currentUser.saldo || 0) + amount;
        updateUserBalance();
        saveUserData();
    }
    
    closeDepositModal();
    document.getElementById('depositAmount').value = '';
}

function showTransferModal() {
    const modal = document.getElementById('transferModal');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.zIndex = '10000';
}

function closeTransferModal() {
    const modal = document.getElementById('transferModal');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
}

function processTransfer() {
    const amount = parseFloat(document.getElementById('transferAmount').value);
    const cpf = document.getElementById('transferCPF').value;
    const name = document.getElementById('transferName').value;
    const bank = document.getElementById('transferBank').value;
    const agency = document.getElementById('transferAgency').value;
    const account = document.getElementById('transferAccount').value;
    
    if (!amount || amount <= 0) {
        showNotification('Por favor, insira um valor válido!', 'error');
        return;
    }
    
    if (!cpf || !name || !bank || !agency || !account) {
        showNotification('Por favor, preencha todos os campos!', 'error');
        return;
    }
    
    // Validar CPF
    if (!validateCPF(cpf)) {
        showNotification('CPF inválido!', 'error');
        return;
    }
    
    // Validar conta bancária
    const accountValidation = validateBankAccount(bank, agency, account);
    if (!accountValidation.valid) {
        showNotification(accountValidation.message, 'error');
        return;
    }
    
    if (currentUser && amount > (currentUser.saldo || 0)) {
        showNotification('Saldo insuficiente para transferência!', 'error');
        return;
    }
    
    // Simular processamento
    showNotification(`Transferência de R$ ${amount.toFixed(2)} para ${name} processada!`, 'success');
    
    // Atualizar saldo
    if (currentUser) {
        currentUser.saldo = (currentUser.saldo || 0) - amount;
        updateUserBalance();
        saveUserData();
    }
    
    closeTransferModal();
    document.getElementById('transferAmount').value = '';
    document.getElementById('transferCPF').value = '';
    document.getElementById('transferName').value = '';
    document.getElementById('transferBank').value = '';
    document.getElementById('transferAgency').value = '';
    document.getElementById('transferAccount').value = '';
}

function showWithdrawModal() {
    const modal = document.getElementById('withdrawModal');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.zIndex = '10000';
}

function closeWithdrawModal() {
    const modal = document.getElementById('withdrawModal');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
}

function processWithdraw() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const bank = document.getElementById('withdrawBank').value;
    const agency = document.getElementById('withdrawAgency').value;
    const account = document.getElementById('withdrawAccount').value;
    const accountType = document.getElementById('withdrawAccountType').value;
    
    if (!amount || amount <= 0) {
        showNotification('Por favor, insira um valor válido!', 'error');
        return;
    }
    
    if (!bank || !agency || !account) {
        showNotification('Por favor, preencha todos os campos bancários!', 'error');
        return;
    }
    
    // Validar conta bancária
    const accountValidation = validateBankAccount(bank, agency, account);
    if (!accountValidation.valid) {
        showNotification(accountValidation.message, 'error');
        return;
    }
    
    if (currentUser && amount > (currentUser.saldo || 0)) {
        showNotification('Saldo insuficiente para saque!', 'error');
        return;
    }
    
    // Simular processamento
    showNotification(`Saque de R$ ${amount.toFixed(2)} para ${accountType} processado!`, 'success');
    
    // Atualizar saldo
    if (currentUser) {
        currentUser.saldo = (currentUser.saldo || 0) - amount;
        updateUserBalance();
        saveUserData();
    }
    
    closeWithdrawModal();
    document.getElementById('withdrawAmount').value = '';
    document.getElementById('withdrawBank').value = '';
    document.getElementById('withdrawAgency').value = '';
    document.getElementById('withdrawAccount').value = '';
}

function updateUserBalance() {
    const balanceElement = document.getElementById('userBalance');
    if (balanceElement && currentUser) {
        balanceElement.textContent = formatCurrency(currentUser.saldo || 0);
    }
}

function saveUserData() {
    if (currentUser) {
        localStorage.setItem('usuarioLogado', JSON.stringify(currentUser));
    }
}

// ===== FORMATAÇÃO DE CAMPOS =====
function formatCPF(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = value;
}

function formatAgency(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substring(0, 4);
    input.value = value;
}

function formatAccount(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 8) value = value.substring(0, 8);
    input.value = value;
}

function formatWhatsApp(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    
    if (value.length >= 2) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
    }
    if (value.length >= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3');
    }
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    input.value = value;
}

// ===== VALIDAÇÕES PIX =====
function togglePixKeyField() {
    const keyType = document.getElementById('pixKeyType').value;
    const pixKeyField = document.getElementById('pixKeyField');
    const pixKeyLabel = document.getElementById('pixKeyLabel');
    const pixKeyValue = document.getElementById('pixKeyValue');
    const pixKeyError = document.getElementById('pixKeyError');
    
    if (keyType) {
        pixKeyField.style.display = 'block';
        
        // Atualizar label e placeholder baseado no tipo
        switch (keyType) {
            case 'cpf':
                pixKeyLabel.textContent = 'CPF';
                pixKeyValue.placeholder = '000.000.000-00';
                pixKeyValue.maxLength = 14;
                break;
            case 'email':
                pixKeyLabel.textContent = 'E-mail';
                pixKeyValue.placeholder = 'exemplo@email.com';
                pixKeyValue.maxLength = 100;
                break;
            case 'phone':
                pixKeyLabel.textContent = 'Telefone';
                pixKeyValue.placeholder = '(11) 99999-9999';
                pixKeyValue.maxLength = 15;
                break;
            case 'random':
                pixKeyLabel.textContent = 'Chave Aleatória';
                pixKeyValue.placeholder = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
                pixKeyValue.maxLength = 36;
                break;
        }
        
        // Limpar campo e erro
        pixKeyValue.value = '';
        pixKeyError.textContent = '';
        pixKeyError.classList.remove('show');
        pixKeyValue.classList.remove('error', 'success');
    } else {
        pixKeyField.style.display = 'none';
    }
}

function validatePixKey() {
    const keyType = document.getElementById('pixKeyType').value;
    const keyValue = document.getElementById('pixKeyValue').value.trim();
    const errorElement = document.getElementById('pixKeyError');
    const inputElement = document.getElementById('pixKeyValue');
    
    if (!keyValue) {
        showPixFieldError(inputElement, errorElement, 'Chave PIX é obrigatória');
        return false;
    }
    
    let isValid = false;
    let errorMessage = '';
    
    switch (keyType) {
        case 'cpf':
            if (!validateCPF(keyValue)) {
                errorMessage = 'CPF inválido';
            } else {
                isValid = true;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(keyValue)) {
                errorMessage = 'E-mail inválido';
            } else {
                isValid = true;
            }
            break;
            
        case 'phone':
            const cleanPhone = keyValue.replace(/\D/g, '');
            if (cleanPhone.length < 10 || cleanPhone.length > 11) {
                errorMessage = 'Telefone deve ter 10 ou 11 dígitos';
            } else if (!cleanPhone.startsWith('11') && !cleanPhone.startsWith('21') && 
                      !cleanPhone.startsWith('31') && !cleanPhone.startsWith('41') && 
                      !cleanPhone.startsWith('51') && !cleanPhone.startsWith('61') && 
                      !cleanPhone.startsWith('71') && !cleanPhone.startsWith('81') && 
                      !cleanPhone.startsWith('85')) {
                errorMessage = 'DDD inválido';
            } else {
                isValid = true;
            }
            break;
            
        case 'random':
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(keyValue)) {
                errorMessage = 'Chave aleatória deve ter formato UUID válido';
            } else {
                isValid = true;
            }
            break;
    }
    
    if (isValid) {
        showPixFieldSuccess(inputElement, errorElement);
        return true;
    } else {
        showPixFieldError(inputElement, errorElement, errorMessage);
        return false;
    }
}

function showPixFieldError(input, errorElement, message) {
    input.classList.remove('success');
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function showPixFieldSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(event) {
    const modal = document.getElementById('profileModal');
    if (event.target === modal) {
        closeProfileModal();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProfileModal();
    }
});

// ===== CONTROLE DE MERCADO =====
function checkMarketStatus() {
    const now = new Date();
    const brazilTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
    const currentHour = brazilTime.getHours();
    const currentMinute = brazilTime.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    // Horário da B3: 9:00 às 18:00 (horário de Brasília)
    const marketOpen = 9 * 60; // 9:00
    const marketClose = 18 * 60; // 18:00
    
    const isMarketOpen = currentTime >= marketOpen && currentTime < marketClose;
    
    updateMarketStatusDisplay(isMarketOpen);
    return isMarketOpen;
}

function updateMarketStatusDisplay(isOpen) {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    const statusTime = document.getElementById('marketTime');
    
    if (statusIndicator && statusText && statusTime) {
        if (isOpen) {
            statusIndicator.className = 'status-indicator active';
            statusText.textContent = 'Mercado Aberto';
            statusTime.textContent = '09:00 - 18:00';
        } else {
            statusIndicator.className = 'status-indicator closed';
            statusText.textContent = 'Mercado Fechado';
            statusTime.textContent = 'Operações 24h';
        }
    }
}

function allowOperationsAfterHours() {
    // Sempre permitir operações, independente do horário
    return true;
}

// ===== ATUALIZAÇÃO DE DADOS =====
function updateUserInterface() {
    if (!currentUser) {
        clearUserInterface();
        return;
    }
    
    // Garantir que o usuário tem dados válidos
    if (!currentUser.nome || typeof currentUser.nome !== 'string') {
        currentUser.nome = 'Usuário';
    }
    
    if (typeof currentUser.saldo !== 'number' || isNaN(currentUser.saldo)) {
        currentUser.saldo = 200000.00;
    }
    
    // Atualizar informações do usuário
    const userName = document.getElementById('userName');
    const userBalance = document.getElementById('userBalance');
    
    if (userName) {
        userName.textContent = currentUser.nome;
    }
    
    if (userBalance) {
        userBalance.textContent = formatCurrency(currentUser.saldo);
    }
    
    // Atualizar todas as seções
    updatePortfolio();
    updateOrders();
    updateHistory();
}

function clearUserInterface() {
    const userName = document.getElementById('userName');
    const userBalance = document.getElementById('userBalance');
    
    if (userName) {
        userName.textContent = '';
    }
    
    if (userBalance) {
        userBalance.textContent = 'R$ 0,00';
    }
    
    clearPortfolioDisplay();
    clearHistoryDisplay();
}

function updateMarketData() {
    // Simular dados de mercado em tempo real
    const marketData = {
        ibovespa: {
            price: 127543.21 + (Math.random() - 0.5) * 1000,
            change: (Math.random() - 0.5) * 2000,
            changePercent: (Math.random() - 0.5) * 2
        },
        usdbrl: {
            price: 5.12 + (Math.random() - 0.5) * 0.1,
            change: (Math.random() - 0.5) * 0.05,
            changePercent: (Math.random() - 0.5) * 1
        },
        bitcoin: {
            price: 185432 + (Math.random() - 0.5) * 10000,
            change: (Math.random() - 0.5) * 5000,
            changePercent: (Math.random() - 0.5) * 3
        }
    };
    
    updateMarketOverviewCards(marketData);
    updateTopMovers();
}

function updateMarketOverviewCards(data) {
    // IBOVESPA
    const ibovCard = document.querySelector('.overview-card:nth-child(1)');
    if (ibovCard) {
        const price = ibovCard.querySelector('.price');
        const change = ibovCard.querySelector('.change');
        
        if (price) price.textContent = formatNumber(data.ibovespa.price);
        if (change) {
            const isPositive = data.ibovespa.change >= 0;
            change.textContent = `${isPositive ? '+' : ''}${formatNumber(data.ibovespa.change)} (${isPositive ? '+' : ''}${data.ibovespa.changePercent.toFixed(2)}%)`;
            change.className = `change ${isPositive ? 'positive' : 'negative'}`;
        }
    }
    
    // USD/BRL
    const usdCard = document.querySelector('.overview-card:nth-child(2)');
    if (usdCard) {
        const price = usdCard.querySelector('.price');
        const change = usdCard.querySelector('.change');
        
        if (price) price.textContent = `R$ ${data.usdbrl.price.toFixed(2)}`;
        if (change) {
            const isPositive = data.usdbrl.change >= 0;
            change.textContent = `${isPositive ? '+' : ''}R$ ${data.usdbrl.change.toFixed(2)} (${isPositive ? '+' : ''}${data.usdbrl.changePercent.toFixed(2)}%)`;
            change.className = `change ${isPositive ? 'positive' : 'negative'}`;
        }
    }
    
    // Bitcoin
    const btcCard = document.querySelector('.overview-card:nth-child(3)');
    if (btcCard) {
        const price = btcCard.querySelector('.price');
        const change = btcCard.querySelector('.change');
        
        if (price) price.textContent = `R$ ${formatNumber(data.bitcoin.price)}`;
        if (change) {
            const isPositive = data.bitcoin.change >= 0;
            change.textContent = `${isPositive ? '+' : ''}R$ ${formatNumber(data.bitcoin.change)} (${isPositive ? '+' : ''}${data.bitcoin.changePercent.toFixed(2)}%)`;
            change.className = `change ${isPositive ? 'positive' : 'negative'}`;
        }
    }
}

function updateTopMovers(view = 'gainers') {
    let movers = [
        { symbol: 'PETR4', name: 'Petrobras', price: 32.45 + (Math.random() - 0.5) * 2, change: (Math.random() - 0.5) * 4 },
        { symbol: 'VALE3', name: 'Vale', price: 67.28 + (Math.random() - 0.5) * 3, change: (Math.random() - 0.5) * 2 },
        { symbol: 'ITUB4', name: 'Itaú', price: 28.99 + (Math.random() - 0.5) * 1, change: (Math.random() - 0.5) * 1.5 },
        { symbol: 'ABEV3', name: 'Ambev', price: 16.41 + (Math.random() - 0.5) * 1, change: (Math.random() - 0.5) * 1.2 },
        { symbol: 'BBDC4', name: 'Bradesco', price: 22.79 + (Math.random() - 0.5) * 1.5, change: (Math.random() - 0.5) * 1.8 },
        { symbol: 'BBAS3', name: 'Banco do Brasil', price: 32.90 + (Math.random() - 0.5) * 1.5, change: (Math.random() - 0.5) * 1.5 },
        { symbol: 'BRFS3', name: 'BRF', price: 19.80 + (Math.random() - 0.5) * 1, change: (Math.random() - 0.5) * 1.2 },
        { symbol: 'GGBR4', name: 'Gerdau', price: 29.10 + (Math.random() - 0.5) * 1.5, change: (Math.random() - 0.5) * 1.8 },
        { symbol: 'USIM5', name: 'Usiminas', price: 13.60 + (Math.random() - 0.5) * 1, change: (Math.random() - 0.5) * 1.5 },
        { symbol: 'MGLU3', name: 'Magazine Luiza', price: 12.70 + (Math.random() - 0.5) * 1, change: (Math.random() - 0.5) * 1.2 },
        { symbol: 'LREN3', name: 'Lojas Renner', price: 45.30 + (Math.random() - 0.5) * 2, change: (Math.random() - 0.5) * 2.5 },
        { symbol: 'WEGE3', name: 'WEG', price: 35.40 + (Math.random() - 0.5) * 2, change: (Math.random() - 0.5) * 2 },
        { symbol: 'RADL3', name: 'Raia Drogasil', price: 24.50 + (Math.random() - 0.5) * 1.5, change: (Math.random() - 0.5) * 1.8 },
        { symbol: 'TIMS3', name: 'TIM', price: 8.75 + (Math.random() - 0.5) * 0.5, change: (Math.random() - 0.5) * 1 }
    ];
    
    // Filtrar por alta ou baixa
    if (view === 'gainers') {
        movers = movers.filter(mover => mover.change >= 0).sort((a, b) => b.change - a.change);
    } else if (view === 'losers') {
        movers = movers.filter(mover => mover.change < 0).sort((a, b) => a.change - b.change);
    }
    
    const moversList = document.getElementById('topGainers');
    if (moversList) {
        moversList.innerHTML = movers.map(mover => {
            const changePercent = (mover.change / (mover.price - mover.change)) * 100;
            const isPositive = mover.change >= 0;
            
            return `
                <div class="mover-item">
                    <div class="mover-info">
                        <img src="img/${mover.symbol}.png" alt="${mover.symbol}" class="mover-logo" />
                        <div class="mover-details">
                            <span class="mover-symbol">${mover.symbol}</span>
                            <span class="mover-name">${mover.name}</span>
                        </div>
                    </div>
                    <div class="mover-price">
                        <span class="price">R$ ${mover.price.toFixed(2)}</span>
                        <span class="change ${isPositive ? 'positive' : 'negative'}">${isPositive ? '+' : ''}${mover.change.toFixed(2)} (${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)</span>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function updateTradingChart() {
    if (tradingChart) {
        renderTradingViewChart(currentAsset);
    }
}

function updatePortfolio() {
    // Verificar se há usuário logado
    if (!currentUser) {
        clearPortfolioDisplay();
        return;
    }
    
    const portfolioTableBody = document.getElementById('portfolioTableBody');
    if (!portfolioTableBody) return;
    
    // Garantir que carteira existe e é um objeto válido
    if (!currentUser.carteira || typeof currentUser.carteira !== 'object') {
        currentUser.carteira = {};
    }
    
    const portfolio = currentUser.carteira;
    const portfolioValue = document.getElementById('portfolioValue');
    const portfolioPnL = document.getElementById('portfolioPnL');
    const portfolioReturn = document.getElementById('portfolioReturn');
    
    // Verificar se carteira está vazia ou contém dados inválidos
    const validAssets = Object.entries(portfolio).filter(([symbol, data]) => {
        return data && 
               typeof data.quantidade === 'number' && 
               data.quantidade > 0 &&
               typeof data.precoMedio === 'number' && 
               data.precoMedio > 0;
    });
    
    if (validAssets.length === 0) {
        // Limpar carteira se contém dados inválidos
        currentUser.carteira = {};
        clearPortfolioDisplay();
        return;
    }
    
    // Calcular valores do portfólio
    let totalValue = 0;
    let totalPnL = 0;
    let totalInvested = 0;
    
    const portfolioRows = validAssets.map(([symbol, data]) => {
        const currentPrice = getCurrentPrice(symbol);
        const quantity = Number(data.quantidade) || 0;
        const avgPrice = Number(data.precoMedio) || 0;
        
        const totalCurrentValue = quantity * currentPrice;
        const totalInvestedValue = quantity * avgPrice;
        const pnl = totalCurrentValue - totalInvestedValue;
        const pnlPercent = totalInvestedValue > 0 ? (pnl / totalInvestedValue) * 100 : 0;
        
        totalValue += totalCurrentValue;
        totalPnL += pnl;
        totalInvested += totalInvestedValue;
        
        return `
            <tr>
                <td>${symbol}</td>
                <td>${quantity.toLocaleString('pt-BR')}</td>
                <td>${formatCurrency(avgPrice)}</td>
                <td>${formatCurrency(currentPrice)}</td>
                <td>${formatCurrency(totalCurrentValue)}</td>
                <td class="${pnl >= 0 ? 'positive' : 'negative'}">${formatCurrency(pnl)}</td>
                <td class="${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : ''}${pnlPercent.toFixed(2)}%</td>
                <td>
                    <button class="sell-all-btn" onclick="sellAllAsset('${symbol}', ${quantity}, ${currentPrice})" title="Vender tudo">
                        <i class="fas fa-times-circle"></i>
                        Vender Tudo
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    portfolioTableBody.innerHTML = portfolioRows;
    
    // Atualizar resumo do portfólio
    if (portfolioValue) portfolioValue.textContent = formatCurrency(totalValue);
    if (portfolioPnL) {
        portfolioPnL.textContent = `${totalPnL >= 0 ? '+' : ''}${formatCurrency(totalPnL)}`;
        portfolioPnL.className = `summary-value ${totalPnL >= 0 ? 'positive' : 'negative'}`;
    }
    if (portfolioReturn) {
        const returnPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;
        portfolioReturn.textContent = `${returnPercent >= 0 ? '+' : ''}${returnPercent.toFixed(2)}%`;
        portfolioReturn.className = `summary-value ${returnPercent >= 0 ? 'positive' : 'negative'}`;
    }
}

// ===== VENDER TUDO =====
function sellAllAsset(symbol, quantity, currentPrice) {
    if (!currentUser || !currentUser.carteira || !currentUser.carteira[symbol]) {
        showNotification('Ativo não encontrado na carteira!', 'error');
        return;
    }
    
    const assetData = currentUser.carteira[symbol];
    const totalValue = quantity * currentPrice;
    const avgPrice = assetData.precoMedio;
    const pnl = totalValue - (quantity * avgPrice);
    const pnlPercent = ((pnl / (quantity * avgPrice)) * 100);
    
    // Armazenar dados para o modal
    window.sellAllData = {
        symbol: symbol,
        quantity: quantity,
        currentPrice: currentPrice,
        avgPrice: avgPrice,
        totalValue: totalValue,
        pnl: pnl,
        pnlPercent: pnlPercent
    };
    
    // Mostrar modal profissional
    showSellAllModal();
}

// ===== FUNÇÕES DO MODAL VENDER TUDO =====
function showSellAllModal() {
    const modal = document.getElementById('sellAllModal');
    if (!modal || !window.sellAllData) return;
    
    const data = window.sellAllData;
    
    // Preencher dados no modal
    document.getElementById('sellAllSymbol').textContent = data.symbol;
    document.getElementById('sellAllQuantity').textContent = `${data.quantity.toLocaleString('pt-BR')} ações`;
    document.getElementById('sellAllCurrentPrice').textContent = formatCurrency(data.currentPrice);
    document.getElementById('sellAllAvgPrice').textContent = formatCurrency(data.avgPrice);
    document.getElementById('sellAllTotalValue').textContent = formatCurrency(data.totalValue);
    
    // P&L com cor baseada no valor
    const pnlElement = document.getElementById('sellAllPnL');
    const pnlText = `${formatCurrency(data.pnl)} (${data.pnl >= 0 ? '+' : ''}${data.pnlPercent.toFixed(2)}%)`;
    pnlElement.textContent = pnlText;
    pnlElement.className = `price-value ${data.pnl >= 0 ? 'positive' : 'negative'}`;
    
    // Mostrar modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
    }, 10);
}

function closeSellAllModal() {
    const modal = document.getElementById('sellAllModal');
    if (!modal) return;
    
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
    
    setTimeout(() => {
        modal.style.display = 'none';
        window.sellAllData = null; // Limpar dados
    }, 300);
}

function confirmSellAll() {
    if (!window.sellAllData) return;
    
    const data = window.sellAllData;
    
    // Executar venda
    const order = {
        id: Date.now(),
        ativo: data.symbol,
        tipo: 'Venda',
        quantidade: data.quantity,
        preco: data.currentPrice,
        dataHora: new Date().toISOString(),
        status: 'Executada'
    };
    
    // Remover da carteira
    delete currentUser.carteira[data.symbol];
    
    // Adicionar ao extrato
    if (!currentUser.extrato) currentUser.extrato = [];
    currentUser.extrato.push(order);
    
    // Atualizar saldo
    currentUser.saldo = (currentUser.saldo || 0) + data.totalValue;
    
    // Salvar dados
    localStorage.setItem('usuarioLogado', JSON.stringify(currentUser));
    
    // Atualizar interface
    updatePortfolio();
    updateUserBalance();
    updateHistory();
    
    // Fechar modal
    closeSellAllModal();
    
    // Notificação de sucesso
    const pnlText = data.pnl >= 0 ? `Lucro de ${formatCurrency(data.pnl)}` : `Prejuízo de ${formatCurrency(Math.abs(data.pnl))}`;
    showNotification(`Venda executada! ${data.quantity.toLocaleString('pt-BR')} ações de ${data.symbol} vendidas por ${formatCurrency(data.totalValue)}. ${pnlText}.`, 'success');
}

function clearPortfolioDisplay() {
    const portfolioTableBody = document.getElementById('portfolioTableBody');
    const portfolioValue = document.getElementById('portfolioValue');
    const portfolioPnL = document.getElementById('portfolioPnL');
    const portfolioReturn = document.getElementById('portfolioReturn');
    
    if (portfolioTableBody) {
        portfolioTableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="8" class="empty-message">
                    <i class="fas fa-briefcase"></i>
                    <p>Nenhum ativo em carteira</p>
                    <span>Comece a investir para ver seus ativos aqui</span>
                </td>
            </tr>
        `;
    }
    
    if (portfolioValue) portfolioValue.textContent = 'R$ 0,00';
    if (portfolioPnL) {
        portfolioPnL.textContent = 'R$ 0,00';
        portfolioPnL.className = 'summary-value positive';
    }
    if (portfolioReturn) {
        portfolioReturn.textContent = '0,00%';
        portfolioReturn.className = 'summary-value positive';
    }
}

function updateOrders() {
    if (!currentUser || !currentUser.ordens) return;
    
    const ordersTableBody = document.getElementById('ordersTableBody');
    if (!ordersTableBody) return;
    
    const orders = currentUser.ordens.filter(order => order.status === 'pendente');
    
    if (orders.length === 0) {
        ordersTableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="7" class="empty-message">
                    <i class="fas fa-list-alt"></i>
                    <p>Nenhuma ordem ativa</p>
                    <span>Suas ordens aparecerão aqui</span>
                </td>
            </tr>
        `;
        return;
    }
    
    const ordersRows = orders.map(order => {
        const stopLossInfo = order.stopLossEnabled ? `<br><small>SL: ${formatCurrency(order.stopLoss)}</small>` : '';
        const takeProfitInfo = order.takeProfitEnabled ? `<br><small>TP: ${formatCurrency(order.takeProfit)}</small>` : '';
        
        return `
        <tr>
            <td>${order.tipo}</td>
            <td>${order.ativo}</td>
            <td>${order.quantidade}</td>
            <td>${formatCurrency(order.preco)}${stopLossInfo}${takeProfitInfo}</td>
            <td><span class="status-badge pending">Pendente</span></td>
            <td>${formatDateTime(order.dataHora)}</td>
            <td>
                <button class="btn-cancel" onclick="cancelOrder('${order.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        </tr>
        `;
    }).join('');
    
    ordersTableBody.innerHTML = ordersRows;
}



function updateHistory() {
    // Verificar se há usuário logado
    if (!currentUser) {
        clearHistoryDisplay();
        return;
    }
    
    const historyTableBody = document.getElementById('historyTableBody');
    if (!historyTableBody) return;
    
    // Garantir que extrato existe e é um array válido
    if (!currentUser.extrato || !Array.isArray(currentUser.extrato)) {
        currentUser.extrato = [];
    }
    
    const history = currentUser.extrato;
    
    // Filtrar apenas operações válidas
    const validOperations = history.filter(operation => {
        return operation && 
               operation.tipo && 
               operation.ativo && 
               typeof operation.quantidade === 'number' && 
               operation.quantidade > 0 &&
               typeof operation.preco === 'number' && 
               operation.preco > 0 &&
               operation.dataHora;
    });
    
    if (validOperations.length === 0) {
        clearHistoryDisplay();
        return;
    }
    
    const historyRows = validOperations.map(operation => {
        const quantity = Number(operation.quantidade) || 0;
        const price = Number(operation.preco) || 0;
        const total = Number(operation.total) || (quantity * price);
        const fees = Number(operation.taxas) || 0;
        
        return `
            <tr>
                <td>${formatDateTime(operation.dataHora)}</td>
                <td>${operation.tipo}</td>
                <td>${operation.ativo}</td>
                <td>${quantity.toLocaleString('pt-BR')}</td>
                <td>${formatCurrency(price)}</td>
                <td>${formatCurrency(total)}</td>
                <td>${formatCurrency(fees)}</td>
                <td>${operation.lucroPrejuizo ? formatCurrency(operation.lucroPrejuizo) : '—'}</td>
                <td><span class="status-badge executed">Executado</span></td>
            </tr>
        `;
    }).join('');
    
    historyTableBody.innerHTML = historyRows;
}

function clearHistoryDisplay() {
    const historyTableBody = document.getElementById('historyTableBody');
    
    if (historyTableBody) {
        historyTableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="9" class="empty-message">
                    <i class="fas fa-history"></i>
                    <p>Nenhuma operação realizada</p>
                    <span>Seu histórico de operações aparecerá aqui</span>
                </td>
            </tr>
        `;
    }
}

function updateAnalytics() {
    // Implementar gráficos de análise
    console.log('Atualizando análises...');
}

// ===== ORDENS DE TRADING =====
function calculateOrderTotal() {
    const quantity = parseFloat(document.getElementById('orderQuantity')?.value || 0);
    const price = parseFloat(document.getElementById('orderPrice')?.value || 0);
    
    const total = quantity * price;
    const fees = total * 0.001; // 0.1% de taxa
    const totalWithFees = total + fees;
    
    const orderTotal = document.getElementById('orderTotal');
    const orderFees = document.getElementById('orderFees');
    const orderTotalWithFees = document.getElementById('orderTotalWithFees');
    
    if (orderTotal) orderTotal.textContent = formatCurrency(total);
    if (orderFees) orderFees.textContent = formatCurrency(fees);
    if (orderTotalWithFees) orderTotalWithFees.textContent = formatCurrency(totalWithFees);
}

function executeOrder(type) {
    const quantity = parseFloat(document.getElementById('orderQuantity')?.value || 0);
    const price = parseFloat(document.getElementById('orderPrice')?.value || 0);
    const asset = document.getElementById('orderAsset')?.value || currentAsset;
    
    // Verificar status do mercado (apenas informativo)
    const isMarketOpen = checkMarketStatus();
    if (!isMarketOpen) {
        showNotification('Mercado fechado - Ordem será executada no próximo pregão', 'info');
    }
    
    // ===== VALIDAÇÕES OFICIAIS DA B3 (Brasil, Bolsa, Balcão) =====
    
    // 1. Validação de Ativo
    if (!asset) {
        showNotification('Selecione um ativo para negociar', 'error');
        return;
    }
    
    // 2. Validação de Quantidade (Regras B3)
    if (!quantity || quantity <= 0) {
        showNotification('Quantidade deve ser maior que zero', 'error');
        return;
    }
    
    // 3. Lote Padrão B3 (100 ações para ações ordinárias e preferenciais)
    if (quantity < 100) {
        showNotification('Lote mínimo B3: 100 ações', 'error');
        return;
    }
    
    // 4. Múltiplo do Lote Padrão B3
    if (quantity % 100 !== 0) {
        showNotification('Quantidade deve ser múltipla de 100 (lote padrão B3)', 'error');
        return;
    }
    
    // 5. Validação de Preço
    if (!price || price <= 0) {
        showNotification('Preço deve ser maior que zero', 'error');
        return;
    }
    
    // 6. Preço Mínimo Realista B3 (R$ 1,00)
    if (price < 1.00) {
        showNotification('Preço mínimo realista B3: R$ 1,00', 'error');
        return;
    }
    
    // 7. Cálculo de Taxas B3
    const total = quantity * price;
    const taxaCorretagem = total * 0.001; // 0,1% corretagem
    const taxaB3 = total * 0.0003; // 0,03% taxa B3
    const totalTaxas = taxaCorretagem + taxaB3;
    const totalWithFees = total + totalTaxas;
    
    // 8. Validação de Saldo para Compra
    if (type === 'buy' && totalWithFees > currentUser.saldo) {
        showNotification(`Saldo insuficiente. Necessário: R$ ${totalWithFees.toFixed(2)}`, 'error');
        return;
    }
    
    // 9. Validação de Carteira para Venda
    if (type === 'sell') {
        if (!currentUser.carteira || !currentUser.carteira[asset] || currentUser.carteira[asset].quantidade < quantity) {
            showNotification('Quantidade insuficiente na carteira para venda', 'error');
            return;
        }
    }
    
    // 10. Negociação 24 horas habilitada
    // Sistema permite negociação a qualquer hora, todos os dias
    
    // 11. Validação de Cotação vs Preço Solicitado
    const currentQuote = assetQuotes[asset];
    if (!currentQuote) {
        showNotification('Cotação não disponível para este ativo', 'error');
        return;
    }
    
    const priceDifference = Math.abs(price - currentQuote);
    
    // Regra: Diferença máxima de R$ 5,00 da cotação atual
    if (priceDifference > 5.00) {
        showNotification(`Ordem rejeitada! Diferença de R$ ${priceDifference.toFixed(2)} da cotação atual (R$ ${currentQuote.toFixed(2)})`, 'error');
        return;
    }
    
    // Criar ordem com taxas B3
    const order = {
        id: Date.now().toString(),
        tipo: type === 'buy' ? 'Compra' : 'Venda',
        ativo: asset,
        quantidade: quantity,
        preco: price,
        total: total,
        taxas: totalTaxas,
        taxaCorretagem: taxaCorretagem,
        taxaB3: taxaB3,
        dataHora: new Date().toISOString(),
        status: 'pendente'
    };
    
    // ===== LÓGICA DE EXECUÇÃO BASEADA NA COTAÇÃO =====
    if (priceDifference === 0) {
        // Preço igual à cotação → EXECUTAR IMEDIATAMENTE
        showNotification('Ordem executada imediatamente! Preço igual à cotação atual.', 'success');
        executeOrderImmediately(order);
    } else {
        // Diferença ≤ R$ 5,00 → ACEITA E PENDENTE DE EXECUÇÃO
        if (!currentUser.ordens) currentUser.ordens = [];
        currentUser.ordens.push(order);
        
        showNotification(`Ordem aceita! Diferença de R$ ${priceDifference.toFixed(2)} da cotação atual (R$ ${currentQuote.toFixed(2)}). Será executada em breve.`, 'info');
        
        // Simular execução após 2-5 segundos
        const executionDelay = Math.random() * 3000 + 2000; // 2-5 segundos
        setTimeout(() => {
            executeOrderImmediately(order);
        }, executionDelay);
    }
    
    // Salvar dados
    localStorage.setItem('usuarioLogado', JSON.stringify(currentUser));
    
    // Atualizar interface
    updateUserInterface();
    updateOrders();
    
    // Limpar formulário
    document.getElementById('orderQuantity').value = '';
    document.getElementById('orderPrice').value = '';
    
    showNotification(`Ordem de ${type === 'buy' ? 'compra' : 'venda'} criada com sucesso!`, 'success');
}

// ===== FUNÇÃO PARA TOGGLE DOS CAMPOS AVANÇADOS =====
function toggleAdvancedFields() {
    const stopLossChecked = document.getElementById('stopLoss')?.checked || false;
    const takeProfitChecked = document.getElementById('takeProfit')?.checked || false;
    const advancedFields = document.getElementById('orderAdvanced');
    
    if (stopLossChecked || takeProfitChecked) {
        advancedFields.style.display = 'block';
    } else {
        advancedFields.style.display = 'none';
        // Limpar campos quando ocultar
        document.getElementById('stopLossPrice').value = '';
        document.getElementById('takeProfitPrice').value = '';
    }
}



function executeOrderImmediately(order) {
    // Marcar ordem como executada
    order.status = 'executado';
    
    // Atualizar saldo
    if (order.tipo === 'Compra') {
        currentUser.saldo -= order.total + order.taxas;
    } else {
        currentUser.saldo += order.total - order.taxas;
    }
    
    // Atualizar carteira
    updatePortfolioAfterOrder(order);
    
    // Adicionar ao extrato
    if (!currentUser.extrato) currentUser.extrato = [];
    currentUser.extrato.push(order);
    
    // Salvar dados
    localStorage.setItem('usuarioLogado', JSON.stringify(currentUser));
    
    // Atualizar interface
    updateUserInterface();
    updateOrders();
    updatePortfolio();
    updateHistory();
    
    showNotification(`Ordem de ${order.tipo.toLowerCase()} executada!`, 'success');
}

function updatePortfolioAfterOrder(order) {
    if (!currentUser.carteira) currentUser.carteira = {};
    
    const asset = order.ativo;
    const quantity = order.quantidade;
    const price = order.preco;
    
    if (order.tipo === 'Compra') {
        if (currentUser.carteira[asset]) {
            const existing = currentUser.carteira[asset];
            const totalQuantity = existing.quantidade + quantity;
            const totalValue = (existing.quantidade * existing.precoMedio) + (quantity * price);
            currentUser.carteira[asset] = {
                quantidade: totalQuantity,
                precoMedio: totalValue / totalQuantity
            };
        } else {
            currentUser.carteira[asset] = {
                quantidade: quantity,
                precoMedio: price
            };
        }
    } else {
        if (currentUser.carteira[asset]) {
            currentUser.carteira[asset].quantidade -= quantity;
            if (currentUser.carteira[asset].quantidade <= 0) {
                delete currentUser.carteira[asset];
            }
        }
    }
}

function cancelOrder(orderId) {
    if (!currentUser.ordens) return;
    
    const orderIndex = currentUser.ordens.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
        // Remover a ordem da lista de ordens pendentes
        currentUser.ordens.splice(orderIndex, 1);
        
        // Salvar dados
        localStorage.setItem('usuarioLogado', JSON.stringify(currentUser));
        
        // Atualizar interface
        updateOrders();
        showNotification('Ordem cancelada com sucesso!', 'success');
    }
}

function cancelAllOrders() {
    if (!currentUser.ordens || currentUser.ordens.length === 0) {
        showNotification('Não há ordens para cancelar', 'info');
        return;
    }
    
    showCancelAllModal();
}

function showCancelAllModal() {
    const modal = document.getElementById('cancelAllModal');
    if (!modal) return;
    
    // Atualizar contador
    const countElement = document.getElementById('cancelOrderCount');
    if (countElement) {
        countElement.textContent = currentUser.ordens.length;
    }
    
    // Preencher lista de ordens
    const ordersList = document.getElementById('ordersToCancel');
    if (ordersList) {
        ordersList.innerHTML = currentUser.ordens.map(order => `
            <div class="order-item">
                <div class="order-info">
                    <div class="order-symbol">${order.ativo}</div>
                    <div class="order-details">${order.tipo} • ${order.quantidade} ações • ${formatCurrency(order.preco)}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Mostrar modal
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeCancelAllModal() {
    const modal = document.getElementById('cancelAllModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function confirmCancelAllOrders() {
    // Limpar todas as ordens pendentes
    currentUser.ordens = [];
    
    // Salvar dados
    localStorage.setItem('usuarioLogado', JSON.stringify(currentUser));
    
    // Atualizar interface
    updateOrders();
    
    // Fechar modal
    closeCancelAllModal();
    
    showNotification('Todas as ordens foram canceladas!', 'success');
}

// ===== ANÁLISES E RELATÓRIOS =====
function initializeAnalytics() {
    console.log('📊 Inicializando Análises e Relatórios...');
    
    // Gerar gráficos quando a aba for ativada
    const analyticsTab = document.querySelector('[data-tab="analytics"]');
    if (analyticsTab) {
        analyticsTab.addEventListener('click', () => {
            setTimeout(() => {
                generateMonthlyPerformanceChart();
                generateAssetDistributionChart();
                generateRiskReturnChart();
            }, 100);
        });
    }
    
    // Botão gerar relatório
    const generateBtn = document.querySelector('.btn-generate');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateFullReport);
    }
}

function generateMonthlyPerformanceChart() {
    const canvas = document.getElementById('monthlyChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 400;
    const height = canvas.height = 200;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Dados simulados de performance mensal
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const performance = [2.5, 5.2, -1.8, 8.4, 3.1, 6.7]; // % de retorno
    
    // Configurações do gráfico
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const maxValue = Math.max(...performance.map(Math.abs));
    const scale = chartHeight / (maxValue * 2);
    
    // Desenhar eixos
    ctx.strokeStyle = 'rgba(0, 255, 163, 0.3)';
    ctx.lineWidth = 1;
    
    // Eixo X
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Eixo Y
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // Linha de referência (0%)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, height - padding - (maxValue * scale));
    ctx.lineTo(width - padding, height - padding - (maxValue * scale));
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Desenhar linha de performance
    ctx.strokeStyle = '#00ffa3';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    performance.forEach((value, index) => {
        const x = padding + (index * chartWidth / (months.length - 1));
        const y = height - padding - ((value + maxValue) * scale);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Desenhar pontos
    ctx.fillStyle = '#00ffa3';
    performance.forEach((value, index) => {
        const x = padding + (index * chartWidth / (months.length - 1));
        const y = height - padding - ((value + maxValue) * scale);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Labels dos meses
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    months.forEach((month, index) => {
        const x = padding + (index * chartWidth / (months.length - 1));
        ctx.fillText(month, x, height - padding + 20);
    });
    
    // Labels dos valores
    ctx.textAlign = 'right';
    ctx.fillStyle = '#00ffa3';
    performance.forEach((value, index) => {
        const x = padding + (index * chartWidth / (months.length - 1));
        const y = height - padding - ((value + maxValue) * scale) - 10;
        ctx.fillText(`${value > 0 ? '+' : ''}${value.toFixed(1)}%`, x, y);
    });
}

function generateAssetDistributionChart() {
    const canvas = document.getElementById('distributionChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 400;
    const height = canvas.height = 200;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Dados da carteira atual
    const portfolio = currentUser.carteira || {};
    const assets = Object.keys(portfolio);
    
    if (assets.length === 0) {
        // Mostrar mensagem quando não há ativos
        ctx.fillStyle = '#666666';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Nenhum ativo na carteira', width / 2, height / 2);
        return;
    }
    
    // Calcular valores totais
    const totalValue = assets.reduce((sum, asset) => {
        const assetData = portfolio[asset];
        return sum + (assetData.quantidade * assetData.precoMedio);
    }, 0);
    
    // Dados para o gráfico
    const chartData = assets.map(asset => {
        const assetData = portfolio[asset];
        const value = assetData.quantidade * assetData.precoMedio;
        return {
            name: asset,
            value: value,
            percentage: (value / totalValue) * 100
        };
    }).sort((a, b) => b.value - a.value);
    
    // Cores para cada ativo
    const colors = ['#00ffa3', '#ff6b35', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    // Desenhar gráfico de barras horizontais
    const barHeight = 25;
    const spacing = 5;
    const startY = 30;
    
    chartData.forEach((asset, index) => {
        const y = startY + index * (barHeight + spacing);
        const barWidth = (asset.percentage / 100) * (width - 100);
        
        // Barra
        ctx.fillStyle = colors[index % colors.length];
        ctx.fillRect(50, y, barWidth, barHeight);
        
        // Label do ativo
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(asset.name, 5, y + barHeight / 2 + 4);
        
        // Porcentagem
        ctx.textAlign = 'right';
        ctx.fillText(`${asset.percentage.toFixed(1)}%`, width - 5, y + barHeight / 2 + 4);
    });
}

function generateRiskReturnChart() {
    const canvas = document.getElementById('riskReturnChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 400;
    const height = canvas.height = 200;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Dados simulados de risco vs retorno
    const assets = [
        { name: 'PETR4', risk: 15, return: 8 },
        { name: 'VALE3', risk: 18, return: 12 },
        { name: 'ITUB4', risk: 12, return: 6 },
        { name: 'ABEV3', risk: 20, return: 15 },
        { name: 'BBAS3', risk: 10, return: 5 }
    ];
    
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Escalas
    const maxRisk = Math.max(...assets.map(a => a.risk));
    const maxReturn = Math.max(...assets.map(a => a.return));
    
    // Desenhar eixos
    ctx.strokeStyle = 'rgba(0, 255, 163, 0.3)';
    ctx.lineWidth = 1;
    
    // Eixo X (Risco)
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Eixo Y (Retorno)
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // Labels dos eixos
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Risco (%)', width / 2, height - 10);
    
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Retorno (%)', 0, 0);
    ctx.restore();
    
    // Desenhar pontos dos ativos
    assets.forEach((asset, index) => {
        const x = padding + (asset.risk / maxRisk) * chartWidth;
        const y = height - padding - (asset.return / maxReturn) * chartHeight;
        
        // Círculo
        ctx.fillStyle = '#00ffa3';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(asset.name, x, y - 12);
    });
    
    // Linha de fronteira eficiente (simulada)
    ctx.strokeStyle = 'rgba(0, 255, 163, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding + (10 / maxRisk) * chartWidth, height - padding - (5 / maxReturn) * chartHeight);
    ctx.lineTo(padding + (15 / maxRisk) * chartWidth, height - padding - (8 / maxReturn) * chartHeight);
    ctx.lineTo(padding + (20 / maxRisk) * chartWidth, height - padding - (15 / maxReturn) * chartHeight);
    ctx.stroke();
    ctx.setLineDash([]);
}

function generateFullReport() {
    showNotification('Gerando relatório completo...', 'info');
    
    // Simular geração de relatório
    setTimeout(() => {
        const reportData = {
            portfolio: currentUser.carteira || {},
            history: currentUser.extrato || [],
            balance: currentUser.saldo || 0,
            totalInvested: calculateTotalInvested(),
            totalReturn: calculateTotalReturn(),
            bestPerformer: getBestPerformingAsset(),
            worstPerformer: getWorstPerformingAsset()
        };
        
        // Criar e baixar relatório
        downloadReport(reportData);
        showNotification('Relatório gerado com sucesso!', 'success');
    }, 2000);
}

function calculateTotalInvested() {
    const portfolio = currentUser.carteira || {};
    return Object.values(portfolio).reduce((total, asset) => {
        return total + (asset.quantidade * asset.precoMedio);
    }, 0);
}

function calculateTotalReturn() {
    const portfolio = currentUser.carteira || {};
    let totalReturn = 0;
    
    Object.entries(portfolio).forEach(([asset, data]) => {
        const currentPrice = assetQuotes[asset] || data.precoMedio;
        const returnPercent = ((currentPrice - data.precoMedio) / data.precoMedio) * 100;
        totalReturn += returnPercent * (data.quantidade * data.precoMedio) / calculateTotalInvested();
    });
    
    return totalReturn;
}

function getBestPerformingAsset() {
    const portfolio = currentUser.carteira || {};
    let bestAsset = null;
    let bestReturn = -Infinity;
    
    Object.entries(portfolio).forEach(([asset, data]) => {
        const currentPrice = assetQuotes[asset] || data.precoMedio;
        const returnPercent = ((currentPrice - data.precoMedio) / data.precoMedio) * 100;
        
        if (returnPercent > bestReturn) {
            bestReturn = returnPercent;
            bestAsset = asset;
        }
    });
    
    return { asset: bestAsset, return: bestReturn };
}

function getWorstPerformingAsset() {
    const portfolio = currentUser.carteira || {};
    let worstAsset = null;
    let worstReturn = Infinity;
    
    Object.entries(portfolio).forEach(([asset, data]) => {
        const currentPrice = assetQuotes[asset] || data.precoMedio;
        const returnPercent = ((currentPrice - data.precoMedio) / data.precoMedio) * 100;
        
        if (returnPercent < worstReturn) {
            worstReturn = returnPercent;
            worstAsset = asset;
        }
    });
    
    return { asset: worstAsset, return: worstReturn };
}

function downloadReport(data) {
    const reportContent = `
RELATÓRIO DE ANÁLISES - E2E CODE BROKERS
==========================================

📊 RESUMO GERAL:
- Saldo Atual: R$ ${data.balance.toFixed(2)}
- Total Investido: R$ ${data.totalInvested.toFixed(2)}
- Retorno Total: ${data.totalReturn.toFixed(2)}%

🏆 MELHOR PERFORMANCE:
- Ativo: ${data.bestPerformer.asset || 'N/A'}
- Retorno: ${data.bestPerformer.return ? data.bestPerformer.return.toFixed(2) + '%' : 'N/A'}

📉 PIOR PERFORMANCE:
- Ativo: ${data.worstPerformer.asset || 'N/A'}
- Retorno: ${data.worstPerformer.return ? data.worstPerformer.return.toFixed(2) + '%' : 'N/A'}

📈 CARTEIRA:
${Object.entries(data.portfolio).map(([asset, data]) => 
    `- ${asset}: ${data.quantidade} ações × R$ ${data.precoMedio.toFixed(2)} = R$ ${(data.quantidade * data.precoMedio).toFixed(2)}`
).join('\n') || 'Nenhum ativo na carteira'}

📅 HISTÓRICO DE OPERAÇÕES:
${data.history.slice(-10).map(op => 
    `${op.dataHora.split('T')[0]} - ${op.tipo} ${op.quantidade} ${op.ativo} @ R$ ${op.preco.toFixed(2)}`
).join('\n') || 'Nenhuma operação realizada'}

Gerado em: ${new Date().toLocaleString('pt-BR')}
    `;
    
    // Criar e baixar arquivo
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_analises_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ===== FUNCIONALIDADES DE EXPORTAÇÃO =====
function showExportMenu(event) {
    const button = event.target.closest('.btn-export');
    const rect = button.getBoundingClientRect();
    
    // Remover menu anterior se existir
    const existingMenu = document.querySelector('.export-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Criar menu de exportação
    const menu = document.createElement('div');
    menu.className = 'export-menu';
    menu.style.cssText = `
        position: fixed;
        top: ${rect.bottom + 5}px;
        left: ${rect.left}px;
        background: #1a1d23;
        border: 1px solid #2d3748;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        min-width: 150px;
        padding: 8px 0;
    `;
    
    menu.innerHTML = `
        <div class="export-option" onclick="exportData('json')">
            <i class="fas fa-file-code"></i>
            <span>JSON</span>
        </div>
        <div class="export-option" onclick="exportData('xlsx')">
            <i class="fas fa-file-excel"></i>
            <span>Excel</span>
        </div>
        <div class="export-option" onclick="exportData('pdf')">
            <i class="fas fa-file-pdf"></i>
            <span>PDF</span>
        </div>
    `;
    
    // Adicionar estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        .export-menu .export-option {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 15px;
            cursor: pointer;
            color: #e2e8f0;
            transition: all 0.2s ease;
        }
        .export-menu .export-option:hover {
            background: #2d3748;
            color: #00ffa3;
        }
        .export-menu .export-option i {
            width: 16px;
            color: #00ffa3;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(menu);
    
    // Fechar menu ao clicar fora
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && !button.contains(e.target)) {
                menu.remove();
                style.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

function exportData(format) {
    if (!currentUser || !currentUser.extrato || currentUser.extrato.length === 0) {
        showNotification('Nenhum dado para exportar', 'warning');
        return;
    }
    
    const data = currentUser.extrato;
    const fileName = `historico_operacoes_${new Date().toISOString().split('T')[0]}`;
    
    switch (format) {
        case 'json':
            exportToJSON(data, fileName);
            break;
        case 'xlsx':
            exportToExcel(data, fileName);
            break;
        case 'pdf':
            exportToPDF(data, fileName);
            break;
    }
    
    // Fechar menu
    const menu = document.querySelector('.export-menu');
    if (menu) menu.remove();
}

function exportToJSON(data, fileName) {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Arquivo JSON exportado com sucesso!', 'success');
}

function exportToExcel(data, fileName) {
    // Criar dados formatados para Excel
    const excelData = [
        ['Data/Hora', 'Tipo', 'Ativo', 'Quantidade', 'Preço', 'Total', 'Taxas', 'Status']
    ];
    
    data.forEach(order => {
        excelData.push([
            formatDateTime(order.dataHora),
            order.tipo,
            order.ativo,
            order.quantidade,
            formatCurrency(order.preco),
            formatCurrency(order.total),
            formatCurrency(order.taxas),
            order.status
        ]);
    });
    
    // Converter para CSV (compatível com Excel)
    const csvContent = excelData.map(row => 
        row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Arquivo Excel exportado com sucesso!', 'success');
}

function exportToPDF(data, fileName) {
    // Criar conteúdo HTML para PDF
    let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Histórico de Operações</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #00ffa3; text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #1a1d23; color: #00ffa3; }
                tr:nth-child(even) { background-color: #f2f2f2; }
                .summary { margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; }
            </style>
        </head>
        <body>
            <h1>Histórico de Operações</h1>
            <div class="summary">
                <p><strong>Cliente:</strong> ${currentUser.nome}</p>
                <p><strong>Data de Exportação:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
                <p><strong>Total de Operações:</strong> ${data.length}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Data/Hora</th>
                        <th>Tipo</th>
                        <th>Ativo</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Total</th>
                        <th>Taxas</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    data.forEach(order => {
        htmlContent += `
            <tr>
                <td>${formatDateTime(order.dataHora)}</td>
                <td>${order.tipo}</td>
                <td>${order.ativo}</td>
                <td>${order.quantidade}</td>
                <td>${formatCurrency(order.preco)}</td>
                <td>${formatCurrency(order.total)}</td>
                <td>${formatCurrency(order.taxas)}</td>
                <td>${order.status}</td>
            </tr>
        `;
    });
    
    htmlContent += `
                </tbody>
            </table>
        </body>
        </html>
    `;
    
    // Abrir em nova janela para impressão/PDF
    const newWindow = window.open('', '_blank');
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    
    // Aguardar carregamento e imprimir
    newWindow.onload = function() {
        newWindow.print();
        showNotification('PDF gerado com sucesso!', 'success');
    };
}

// ===== ATUALIZAÇÕES EM TEMPO REAL =====
function startRealTimeUpdates() {
    // Atualizar dados de mercado a cada 5 segundos
    setInterval(updateMarketData, 5000);
    
    // Atualizar horário do mercado
    setInterval(updateMarketTime, 1000);
}

function updateMarketTime() {
    const marketTimeElement = document.getElementById('marketTime');
    if (marketTimeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        marketTimeElement.textContent = timeString;
    }
}

// ===== UTILITÁRIOS =====
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value.toFixed(2));
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getCurrentPrice(symbol) {
    // Usar as mesmas cotações do objeto assetQuotes para consistência
    const basePrice = assetQuotes[symbol] || 10.00;
    return basePrice + (Math.random() - 0.5) * 2;
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 163, 0.9)' : type === 'error' ? 'rgba(255, 71, 87, 0.9)' : 'rgba(0, 212, 255, 0.9)'};
        color: ${type === 'success' || type === 'error' ? '#0a0e1a' : '#ffffff'};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(20px);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== MODAL DE LOGOUT =====
function logout() {
    showLogoutModal();
}

function showLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (!modal) return;
    
    // Carregar dados do usuário no modal
    loadLogoutUserData();
    
    // Mostrar modal
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.zIndex = '10000';
    
    // Adicionar evento para fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLogoutModal();
        }
    });
}

function closeLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
    }
}

function loadLogoutUserData() {
    if (!currentUser) return;
    
    // Carregar nome e email
    const userName = document.getElementById('logoutUserName');
    const userEmail = document.getElementById('logoutUserEmail');
    const userAvatar = document.getElementById('logoutUserAvatar');
    const userIcon = document.getElementById('logoutUserIcon');
    
    if (userName) userName.textContent = currentUser.nome || 'Usuário';
    if (userEmail) userEmail.textContent = currentUser.email || 'email@exemplo.com';
    
    // Carregar foto do usuário
    if (currentUser.fotoPerfil) {
        if (userAvatar && userIcon) {
            userAvatar.src = currentUser.fotoPerfil;
            userAvatar.style.display = 'block';
            userIcon.style.display = 'none';
        }
    } else {
        if (userAvatar && userIcon) {
            userAvatar.style.display = 'none';
            userIcon.style.display = 'block';
        }
    }
}

function confirmLogout() {
    // Limpar dados do usuário
    if (currentUser) {
        currentUser.saldo = 200000.00; // Reset saldo
        currentUser.extrato = [];      // Limpa extrato de operações
        currentUser.ordens = [];       // Limpa book de ordens
        currentUser.carteira = {};     // Limpa carteira de ativos
        
        // IMPORTANTE: Salvar os dados limpos no localStorage antes de remover
        localStorage.setItem('usuarioLogado', JSON.stringify(currentUser));
        
        // Atualizar também na lista de usuários
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const userIndex = usuarios.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            usuarios[userIndex] = currentUser;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    }
    
    // Limpar dados visuais da interface
    clearDashboardData();
    
    // Fechar modal
    closeLogoutModal();
    
    // Redirecionar para landing page
    setTimeout(() => {
        window.location.href = 'landing.html';
    }, 300);
}

function clearDashboardData() {
    // Limpar dados da carteira
    const portfolioCards = document.querySelectorAll('.portfolio-card .card-value');
    portfolioCards.forEach(card => {
        card.textContent = 'R$ 0,00';
    });
    
    // Limpar tabela da carteira
    const portfolioTableBody = document.getElementById('portfolioTableBody');
    if (portfolioTableBody) {
        portfolioTableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="8" class="empty-message">
                    <i class="fas fa-briefcase"></i>
                    <p>Nenhum ativo na carteira</p>
                    <span>Suas posições aparecerão aqui</span>
                </td>
            </tr>
        `;
    }
    
    // Limpar tabela de ordens
    const ordersTableBody = document.getElementById('ordersTableBody');
    if (ordersTableBody) {
        ordersTableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="7" class="empty-message">
                    <i class="fas fa-list-alt"></i>
                    <p>Nenhuma ordem ativa</p>
                    <span>Suas ordens aparecerão aqui</span>
                </td>
            </tr>
        `;
    }
    
    // Limpar tabela do histórico
    const historyTableBody = document.getElementById('historyTableBody');
    if (historyTableBody) {
        historyTableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="9" class="empty-message">
                    <i class="fas fa-history"></i>
                    <p>Nenhuma operação realizada</p>
                    <span>Seu histórico aparecerá aqui</span>
                </td>
            </tr>
        `;
    }
    
    // Limpar dados do usuário na interface
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
        const userName = userInfo.querySelector('.user-name');
        const userBalance = userInfo.querySelector('.user-balance');
        if (userName) userName.textContent = '';
        if (userBalance) userBalance.textContent = '';
    }
    
    // Limpar dados de mercado
    const marketCards = document.querySelectorAll('.market-card .card-value');
    marketCards.forEach(card => {
        card.textContent = 'R$ 0,00';
    });
    
    // Limpar gráfico
    const chartContainer = document.getElementById('tradingview_chart');
    if (chartContainer) {
        chartContainer.innerHTML = `
            <div class="chart-placeholder">
                <i class="fas fa-chart-line"></i>
                <p>Gráfico será carregado aqui</p>
            </div>
        `;
    }
    
    // Resetar variáveis globais
    currentUser = null;
    currentAsset = 'PETR4';
}

function showSettings() {
    showNotification('Configurações em desenvolvimento', 'info');
    // Aqui você pode implementar um modal de configurações
}

function updateOrderPrice(symbol) {
    const orderPriceInput = document.getElementById('orderPrice');
    if (orderPriceInput && symbol) {
        const currentPrice = getCurrentPrice(symbol);
        orderPriceInput.value = currentPrice.toFixed(2);
        
        // Recalcular total
        calculateOrderTotal();
        
        // Atualizar seletor de ativo na boleta para sincronizar
        const orderAssetSelector = document.getElementById('orderAsset');
        if (orderAssetSelector && orderAssetSelector.value !== symbol) {
            orderAssetSelector.value = symbol;
        }
    }
}

// ===== LOAD USER DATA =====
function loadUserData() {
    const userData = localStorage.getItem('usuarioLogado');
    if (userData) {
        try {
            currentUser = JSON.parse(userData);
            
            // Validar e limpar dados do usuário
            if (!currentUser || typeof currentUser !== 'object') {
                throw new Error('Dados de usuário inválidos');
            }
            
            // Garantir que todos os campos obrigatórios existem
            if (!currentUser.nome || typeof currentUser.nome !== 'string') {
                currentUser.nome = 'Usuário';
            }
            
            if (typeof currentUser.saldo !== 'number' || isNaN(currentUser.saldo)) {
                currentUser.saldo = 200000.00;
            }
            
            if (!currentUser.carteira || typeof currentUser.carteira !== 'object') {
                currentUser.carteira = {};
            }
            
            if (!currentUser.extrato || !Array.isArray(currentUser.extrato)) {
                currentUser.extrato = [];
            }
            
            if (!currentUser.ordens || !Array.isArray(currentUser.ordens)) {
                currentUser.ordens = [];
            }
            
            // IMPORTANTE: Se a carteira e extrato estão vazios (após logout), manter vazios
            // Só limpar dados corrompidos se houver dados válidos
            if (Object.keys(currentUser.carteira).length > 0) {
                const validCarteira = {};
                Object.entries(currentUser.carteira).forEach(([symbol, data]) => {
                    if (data && 
                        typeof data.quantidade === 'number' && 
                        data.quantidade > 0 &&
                        typeof data.precoMedio === 'number' && 
                        data.precoMedio > 0) {
                        validCarteira[symbol] = data;
                    }
                });
                currentUser.carteira = validCarteira;
            }
            
            // IMPORTANTE: Se o extrato está vazio (após logout), manter vazio
            if (currentUser.extrato.length > 0) {
                currentUser.extrato = currentUser.extrato.filter(operation => {
                    return operation && 
                           operation.tipo && 
                           operation.ativo && 
                           typeof operation.quantidade === 'number' && 
                           operation.quantidade > 0 &&
                           typeof operation.preco === 'number' && 
                           operation.preco > 0 &&
                           operation.dataHora;
                });
            }
            
            // Salvar dados limpos
            localStorage.setItem('usuarioLogado', JSON.stringify(currentUser));
            
            updateUserInterface();
            loadUserAvatar(); // Carregar foto do usuário
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
            // Limpar dados corrompidos
            localStorage.removeItem('usuarioLogado');
            currentUser = null;
            showNotification('Dados corrompidos detectados. Redirecionando...', 'error');
            setTimeout(() => {
                window.location.href = 'landing.html';
            }, 2000);
        }
    } else {
        // Se não há usuário logado, redirecionar para landing page
        showNotification('Sessão expirada. Redirecionando...', 'warning');
        setTimeout(() => {
            window.location.href = 'landing.html';
        }, 2000);
    }
}

// ===== ANIMAÇÕES CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
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
        font-weight: 500;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .status-badge.pending {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
        border: 1px solid rgba(255, 193, 7, 0.3);
    }
    
    .status-badge.executed {
        background: rgba(0, 255, 163, 0.2);
        color: #00ffa3;
        border: 1px solid rgba(0, 255, 163, 0.3);
    }
    
    .btn-cancel {
        background: transparent;
        border: 1px solid var(--red-neon);
        color: var(--red-neon);
        border-radius: 6px;
        padding: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .btn-cancel:hover {
        background: var(--red-neon);
        color: #ffffff;
    }
`;
document.head.appendChild(style);

console.log('✅ Dashboard Profissional carregado com sucesso!');
