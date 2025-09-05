// Landing Page JavaScript - E2E Code Brokers com Animações Completas

// ===== CONFIGURAÇÃO DE PARTÍCULAS =====
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#00ffa3"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00ffa3",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

// ===== COTAÇÕES DOS ATIVOS =====
const assetQuotes = {
    'PETR4': { price: 25.50, change: 1.2, changePercent: 4.9 },
    'VALE3': { price: 45.20, change: -0.8, changePercent: -1.7 },
    'ITUB4': { price: 28.75, change: 0.5, changePercent: 1.8 },
    'ABEV3': { price: 12.30, change: 0.3, changePercent: 2.5 },
    'BBDC4': { price: 22.80, change: -0.2, changePercent: -0.9 },
    'BBAS3': { price: 35.40, change: 1.1, changePercent: 3.2 },
    'BRFS3': { price: 8.90, change: -0.1, changePercent: -1.1 },
    'GGBR4': { price: 1.00, change: 0.05, changePercent: 5.3 },
    'USIM5': { price: 15.60, change: 0.4, changePercent: 2.6 },
    'MGLU3': { price: 3.20, change: -0.15, changePercent: -4.5 },
    'LREN3': { price: 18.45, change: 0.8, changePercent: 4.5 },
    'WEGE3': { price: 42.10, change: 1.5, changePercent: 3.7 },
    'RADL3': { price: 24.80, change: 0.6, changePercent: 2.5 },
    'TIMS3': { price: 16.75, change: -0.3, changePercent: -1.8 }
};

// ===== FUNÇÕES DE COTAÇÕES =====
function formatPrice(price) {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

function formatPercent(percent) {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(1)}%`;
}

function updateAssetQuotes() {
    const assetCards = document.querySelectorAll('.b3-asset-card');
    
    assetCards.forEach(card => {
        const assetCode = card.getAttribute('data-asset');
        if (assetCode && assetQuotes[assetCode]) {
            const quote = assetQuotes[assetCode];
            
            let priceElement = card.querySelector('.b3-asset-price');
            if (!priceElement) {
                priceElement = document.createElement('span');
                priceElement.className = 'b3-asset-price';
                card.querySelector('.b3-asset-info').appendChild(priceElement);
            }
            priceElement.textContent = formatPrice(quote.price);
            
            let changeElement = card.querySelector('.b3-asset-change');
            if (!changeElement) {
                changeElement = document.createElement('span');
                changeElement.className = 'b3-asset-change';
                card.querySelector('.b3-asset-info').appendChild(changeElement);
            }
            changeElement.textContent = formatPercent(quote.changePercent);
            changeElement.className = `b3-asset-change ${quote.changePercent >= 0 ? 'positive' : 'negative'}`;
        }
    });
}

function simulateQuoteChanges() {
    Object.keys(assetQuotes).forEach(asset => {
        const quote = assetQuotes[asset];
        const randomChange = (Math.random() - 0.5) * 0.5;
        const newPrice = Math.max(0.01, quote.price + randomChange);
        const priceChange = newPrice - quote.price;
        const percentChange = (priceChange / quote.price) * 100;
        
        quote.price = newPrice;
        quote.change = priceChange;
        quote.changePercent = percentChange;
    });
    
    updateAssetQuotes();
}

function addAssetData() {
    const assetCards = document.querySelectorAll('.b3-asset-card');
    assetCards.forEach(card => {
        const codeElement = card.querySelector('.b3-asset-codigo');
        if (codeElement) {
            const assetCode = codeElement.textContent;
            card.setAttribute('data-asset', assetCode);
        }
    });
}

// ===== ANIMAÇÕES DO HERO =====
function initHeroAnimations() {
    // Animação do título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s ease-out';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Animação da descrição
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroDescription.style.transition = 'all 1s ease-out';
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 800);
    }
    
    // Animação dos botões
    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
        heroActions.style.opacity = '0';
        heroActions.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroActions.style.transition = 'all 1s ease-out';
            heroActions.style.opacity = '1';
            heroActions.style.transform = 'translateY(0)';
        }, 1100);
    }
    
    // Animação das estatísticas
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStats.style.opacity = '0';
        heroStats.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroStats.style.transition = 'all 1s ease-out';
            heroStats.style.opacity = '1';
            heroStats.style.transform = 'translateY(0)';
        }, 1400);
    }
    
    // Animação do mockup
    const tradingMockup = document.querySelector('.trading-mockup');
    if (tradingMockup) {
        tradingMockup.style.opacity = '0';
        tradingMockup.style.transform = 'translateX(50px) scale(0.9)';
        
        setTimeout(() => {
            tradingMockup.style.transition = 'all 1.2s ease-out';
            tradingMockup.style.opacity = '1';
            tradingMockup.style.transform = 'translateX(0) scale(1)';
        }, 1000);
    }
}

// ===== ANIMAÇÃO DE TEXTO GRADIENTE =====
function initGradientTextAnimation() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    
    gradientTexts.forEach(text => {
        // Criar animação de gradiente
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .gradient-text {
                background: linear-gradient(-45deg, #00ffa3, #00d4ff, #a259ff, #ff4757);
                background-size: 400% 400%;
                animation: gradientShift 3s ease infinite;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        `;
        document.head.appendChild(style);
    });
}

// ===== HEADER STICKY =====
function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
      });
    }
  });
    });
}

// ===== ANIMAÇÕES ON SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .section-title');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ===== FAQ ACCORDION =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os outros
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle do item atual
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== CONTADORES ANIMADOS CORRIGIDOS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    // Valores corretos para as estatísticas
    const statsData = [
        { value: 2.5, suffix: 'B+', label: 'Volume Negociado' },
        { value: 50, suffix: 'K+', label: 'Investidores Ativos' },
        { value: 99.9, suffix: '%', label: 'Uptime' }
    ];
    
    counters.forEach((counter, index) => {
        if (index < statsData.length) {
            const data = statsData[index];
            const finalValue = data.value;
            const suffix = data.suffix;
            
            // Limpar o conteúdo atual
            counter.textContent = '0' + suffix;
            
            let currentValue = 0;
            const increment = finalValue / 100;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }
                
                let displayValue;
                if (suffix === '%') {
                    displayValue = currentValue.toFixed(1) + suffix;
                } else if (suffix === 'B+') {
                    displayValue = currentValue.toFixed(1) + suffix;
                } else if (suffix === 'K+') {
                    displayValue = currentValue.toFixed(0) + suffix;
                } else {
                    displayValue = currentValue.toFixed(1) + suffix;
                }
                
                counter.textContent = displayValue;
            }, 20);
        }
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando Landing Page com Animações Completas...');
    
    // Inicializar todas as funcionalidades
    initHeroAnimations();
    initGradientTextAnimation();
    initStickyHeader();
    initSmoothScroll();
    initScrollAnimations();
    initFAQ();
    
    // Inicializar contadores com delay para garantir que o DOM esteja pronto
    setTimeout(() => {
        initCounters();
    }, 1000);
    
    // Inicializar cotações
    addAssetData();
    updateAssetQuotes();
    setInterval(simulateQuoteChanges, 3000);
    
    console.log('✅ Landing Page inicializada com sucesso!');
});

// ===== FUNÇÕES GLOBAIS =====
window.updateAssetQuotes = updateAssetQuotes;
window.simulateQuoteChanges = simulateQuoteChanges;