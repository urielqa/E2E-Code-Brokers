# 📊 Gráfico Profissional de Análise Técnica - E2E Invest

## 🚀 Visão Geral

Este sistema implementa um gráfico profissional de análise técnica de nível corretora, usando a biblioteca **Lightweight Charts** da TradingView. O gráfico oferece funcionalidades avançadas para traders profissionais, incluindo indicadores técnicos, ferramentas de desenho e análise em tempo real.

## ✨ Funcionalidades Principais

### 📈 Indicadores Técnicos
- **SMA (Média Móvel Simples)** - Período 20
- **EMA (Média Móvel Exponencial)** - Período 12
- **Bollinger Bands** - Período 20, 2 desvios padrão
- **Volume** - Histograma colorido por direção do preço

### 🛠️ Ferramentas de Análise
- **Linha de Tendência** - Desenho de tendências de alta/baixa
- **Retração de Fibonacci** - Níveis de retração automáticos
- **Suporte e Resistência** - Linhas horizontais de suporte/resistência
- **Limpar Desenhos** - Remove todas as ferramentas aplicadas

### 🎯 Controles Avançados
- Seleção de ativos (PETR4, VALE3, ITUB4, BBDC4, ABEV3)
- Múltiplos timeframes (1M, 5M, 15M, 1H, 4H, 1D, 1W)
- Ativação/desativação de indicadores
- Tooltip detalhado com informações OHLC + Volume

## 🏗️ Arquitetura do Sistema

### Arquivos Principais
```
├── index.html              # Interface principal com layout de duas colunas
├── style.css               # Estilos CSS para o gráfico e controles
├── professional_chart.js   # Lógica principal do gráfico
├── market_data_generator.py # Gerador Python de dados de mercado
└── sample_market_data.json # Dados de exemplo para demonstração
```

### Tecnologias Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Gráficos**: Lightweight Charts (TradingView)
- **Backend de Dados**: Python 3.8+
- **Dados**: JSON com estrutura OHLCV

## 🚀 Como Usar

### 1. Inicialização Automática
O gráfico é inicializado automaticamente quando a página carrega. Ele:
- Cria o container do gráfico
- Carrega dados iniciais (simulados ou do arquivo JSON)
- Configura todas as séries e indicadores
- Aplica o tema dark neon do sistema

### 2. Controle de Indicadores
```javascript
// Ativar/desativar indicadores
window.professionalChart.toggleIndicator('sma');    // Média Móvel Simples
window.professionalChart.toggleIndicator('ema');    // Média Móvel Exponencial
window.professionalChart.toggleIndicator('bollinger'); // Bollinger Bands
```

### 3. Ferramentas de Desenho
```javascript
// Ativar ferramentas
window.professionalChart.activateTool('trendline');  // Linha de Tendência
window.professionalChart.activateTool('fibonacci');  // Fibonacci
window.professionalChart.activateTool('support');    // Suporte/Resistência
window.professionalChart.activateTool('clear');      // Limpar Tudo
```

### 4. Mudança de Ativo/Timeframe
```javascript
// Mudar ativo
window.professionalChart.setAsset('PETR4');

// Mudar timeframe
window.professionalChart.setTimeframe('1H');
```

## 📊 Estrutura dos Dados

### Formato OHLCV
```json
{
  "time": 1704067200000,        // Timestamp em milissegundos
  "open": 50.00,                // Preço de abertura
  "high": 51.20,                // Preço mais alto
  "low": 49.80,                 // Preço mais baixo
  "close": 50.85,               // Preço de fechamento
  "volume": 1200000,            // Volume negociado
  "sma_20": 50.42,             // Média Móvel Simples (20)
  "ema_12": 50.43,             // Média Móvel Exponencial (12)
  "bb_upper": 52.15,           // Bollinger Band Superior
  "bb_middle": 50.42,          // Bollinger Band Média
  "bb_lower": 48.69            // Bollinger Band Inferior
}
```

## 🐍 Gerador Python de Dados

### Execução
```bash
python market_data_generator.py
```

### Funcionalidades
- Gera dados OHLCV realistas com volatilidade e tendência
- Calcula indicadores técnicos automaticamente
- Exporta para JSON compatível com o gráfico
- Configurável (períodos, volatilidade, tendência)

### Personalização
```python
generator = MarketDataGenerator()
generator.base_price = 100.0      # Preço base
generator.volatility = 0.03       # Volatilidade diária
generator.trend = 0.0002          # Tendência sutil
generator.volume_base = 2000000   # Volume base

# Gerar dados personalizados
data = generator.generate_complete_dataset(days=200, timeframe='1H')
```

## 🎨 Personalização Visual

### Cores do Tema
- **Candlesticks**: Verde (#00ffa3) para alta, Vermelho (#ff4d4d) para baixa
- **Volume**: Azul (#26a69a) com cores baseadas na direção
- **SMA**: Vermelho (#ff6b6b)
- **EMA**: Ciano (#4ecdc4)
- **Bollinger Bands**: Azul (#45b7d1) e Verde (#96ceb4)
- **Ferramentas**: Laranja (#ff9800), Roxo (#9c27b0), Vermelho (#f44336)

### Responsividade
- Layout adaptativo para diferentes tamanhos de tela
- Gráfico redimensiona automaticamente
- Controles empilham em telas pequenas
- Altura do gráfico ajusta por breakpoint

## 🔧 Configuração Avançada

### Opções do Gráfico
```javascript
const chartOptions = {
    width: 800,
    height: 500,
    layout: {
        background: { color: '#181c2f' },
        textColor: '#d1d4dc',
    },
    grid: {
        vertLines: { color: '#2B2B43' },
        horzLines: { color: '#2B2B43' },
    },
    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
        vertLine: { color: '#00ffa3' },
        horzLine: { color: '#00ffa3' },
    }
};
```

### Períodos dos Indicadores
- **SMA**: 20 períodos (configurável)
- **EMA**: 12 períodos (configurável)
- **Bollinger Bands**: 20 períodos, 2 desvios padrão (configurável)

## 📱 Responsividade

### Breakpoints
- **Desktop**: Layout de duas colunas (40% boleta, 60% gráfico)
- **Tablet**: Ajusta proporções e espaçamentos
- **Mobile**: Empilha colunas e otimiza controles

### Adaptações Mobile
- Controles empilham verticalmente
- Botões redimensionam para touch
- Gráfico ajusta altura automaticamente
- Dropdowns centralizados

## 🚨 Solução de Problemas

### Gráfico não carrega
1. Verifique se LightweightCharts está carregada
2. Confirme se o container `#professionalChart` existe
3. Verifique console para erros JavaScript

### Indicadores não aparecem
1. Clique nos botões de indicadores para ativá-los
2. Verifique se há dados suficientes (mínimo 20 períodos)
3. Confirme se as séries foram criadas corretamente

### Ferramentas não funcionam
1. Clique no botão da ferramenta desejada
2. Clique em dois pontos no gráfico para desenhar
3. Use "Limpar" para remover desenhos

## 🔮 Próximas Funcionalidades

### Planejadas
- **RSI (Índice de Força Relativa)**
- **MACD (Convergência/Divergência de Médias Móveis)**
- **Stochastic Oscillator**
- **Padrões de candlestick automáticos**
- **Alertas de preço**
- **Exportação de gráficos**
- **Múltiplos timeframes simultâneos**

### Integração
- **API de dados reais** (Alpha Vantage, Yahoo Finance)
- **WebSocket para dados em tempo real**
- **Sincronização com carteira do usuário**
- **Histórico de operações integrado**

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador
2. Confirme se todos os arquivos estão carregados
3. Teste com dados de exemplo primeiro
4. Verifique compatibilidade do navegador

---

**Desenvolvido para E2E Invest Code Brokers** 🚀
*Transformando análise técnica em experiência profissional*



