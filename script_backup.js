// --- Restauração do gráfico e boleta na Análise Técnica ---
function restaurarGraficoEBoletaAnaliseTecnica() {
  // Renderiza o gráfico com o ativo e timeframe selecionados
  let ativo = document.querySelector('#ativoDropdownList li.selected')?.dataset.value || document.getElementById('selectedAtivoLabel')?.textContent?.trim() || 'PETR4';
  renderizarGrafico(ativo);
    clonarBoletaParaGrafico(ativo);
}

// Sempre que a aba Análise Técnica for exibida, restaura gráfico e boleta
document.addEventListener('DOMContentLoaded', function() {
  const graficoSection = document.getElementById('graficoSection');
  if (graficoSection) {
    const observer = new MutationObserver(function() {
      if (!graficoSection.classList.contains('hidden')) {
        setTimeout(restaurarGraficoEBoletaAnaliseTecnica, 100);
      }
    });
    observer.observe(graficoSection, { attributes: true, attributeFilter: ['class'] });
  }
});

// --- Dropdowns customizados de Ativo e Timeframe na Análise Técnica ---
document.addEventListener('DOMContentLoaded', function() {
  // Ativos do dashboard
  const ativos = [
    { nome: 'PETR4', logo: 'img/PETR4.png' },
    { nome: 'VALE3', logo: 'img/VALE3.png' },
    { nome: 'ITUB4', logo: 'img/ITUB4.png' },
    { nome: 'ABEV3', logo: 'img/ABEV3.png' },
    { nome: 'BBDC4', logo: 'img/BBDC4.png' },
    { nome: 'BBAS3', logo: 'img/BBAS3.png' },
    { nome: 'BRFS3', logo: 'img/BRFS3.png' },
    { nome: 'GGBR4', logo: 'img/GGBR4.png' },
    { nome: 'LREN3', logo: 'img/LREN3.png' },
    { nome: 'MGLU3', logo: 'img/MGLU3.png' },
    { nome: 'USIM5', logo: 'img/USIM5.png' },
    { nome: 'WEGE3', logo: 'img/WEGE3.png' },
    { nome: 'RADL3', logo: 'img/RADL3.png' },
    { nome: 'TIMS3', logo: 'img/TIMS3.png' }
  ];
  // Timeframes agrupados
  const timeframes = [
    { group: 'MINUTOS', options: [
      { value: '1m', label: '1 minuto' },
      { value: '2m', label: '2 minutos' },
      { value: '3m', label: '3 minutos' },
      { value: '5m', label: '5 minutos' },
      { value: '10m', label: '10 minutos' },
      { value: '15m', label: '15 minutos' },
      { value: '30m', label: '30 minutos' },
      { value: '45m', label: '45 minutos' }
    ]},
    { group: 'HORAS', options: [
      { value: '1h', label: '1 hora' },
      { value: '2h', label: '2 horas' },
      { value: '3h', label: '3 horas' },
      { value: '4h', label: '4 horas' }
    ]},
    { group: 'DIAS', options: [
      { value: '1d', label: '1 dia' },
      { value: '1w', label: '1 semana' },
      { value: '1M', label: '1 mês' }
    ]}
  ];
  // Ativo Dropdown
  const ativoDropdown = document.getElementById('ativoDropdown');
  if (ativoDropdown) {
    ativoDropdown.innerHTML = `
      <button class="tf-btn" id="ativoDropdownBtn">
        <span id="selectedAtivoLabel"><img src="${ativos[0].logo}" alt="" style="width:22px;height:22px;vertical-align:middle;margin-right:7px;border-radius:50%;box-shadow:0 0 6px #00ffa3;">${ativos[0].nome}</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ffa3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <ul class="tf-list" id="ativoDropdownList" style="z-index:20;">
        ${ativos.map(a => `<li data-value="${a.nome}"><img src="${a.logo}" alt="" style="width:22px;height:22px;vertical-align:middle;margin-right:7px;border-radius:50%;box-shadow:0 0 6px #00ffa3;">${a.nome}</li>`).join('')}
      </ul>
    `;
    const btn = document.getElementById('ativoDropdownBtn');
    const list = document.getElementById('ativoDropdownList');
    const label = document.getElementById('selectedAtivoLabel');
    btn.onclick = function(e) {
      e.stopPropagation();
      ativoDropdown.classList.toggle('open');
    };
    document.addEventListener('click', function(e) {
      if (!ativoDropdown.contains(e.target)) ativoDropdown.classList.remove('open');
    });
    list.querySelectorAll('li').forEach(item => {
      item.onclick = function() {
        list.querySelectorAll('li.selected').forEach(li => li.classList.remove('selected'));
        item.classList.add('selected');
        label.innerHTML = item.innerHTML;
        ativoDropdown.classList.remove('open');
        atualizarGraficoAtivo(item.dataset.value);
      };
    });
  }
  // Timeframe Dropdown
  const tfDropdown = document.getElementById('timeframeDropdown');
  if (tfDropdown) {
    tfDropdown.innerHTML = `
      <button class="tf-btn" id="timeframeDropdownBtn">
        <span id="selectedTimeframeLabel">5 minutos</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ffa3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <ul class="tf-list" id="timeframeDropdownList">
        ${timeframes.map(g => `<li class="tf-group">${g.group}</li>${g.options.map(opt => `<li data-value="${opt.value}">${opt.label}</li>`).join('')}`).join('')}
      </ul>
    `;
    const btn = document.getElementById('timeframeDropdownBtn');
    const list = document.getElementById('timeframeDropdownList');
    const label = document.getElementById('selectedTimeframeLabel');
    btn.onclick = function(e) {
      e.stopPropagation();
      tfDropdown.classList.toggle('open');
    };
    document.addEventListener('click', function(e) {
      if (!tfDropdown.contains(e.target)) tfDropdown.classList.remove('open');
    });
    list.querySelectorAll('li[data-value]').forEach(item => {
      item.onclick = function() {
        list.querySelectorAll('li.selected').forEach(li => li.classList.remove('selected'));
        item.classList.add('selected');
        label.textContent = item.textContent;
        tfDropdown.classList.remove('open');
        atualizarGraficoTimeframe(item.dataset.value, item.textContent);
      };
    });
  }

  // Função para atualizar o gráfico ao trocar ativo ou timeframe
  window.atualizarGraficoAtivo = function(ativoSelecionado) {
    const tfLabel = document.getElementById('selectedTimeframeLabel');
    const tfValue = document.querySelector('#timeframeDropdownList li.selected')?.dataset.value || '5m';
    atualizarGraficoTimeframe(tfValue, tfLabel ? tfLabel.textContent : '5 minutos', ativoSelecionado);
  };

  // Atualiza gráfico ao trocar timeframe
  window.atualizarGraficoTimeframe = function(tf, label, ativoSelecionado) {
    // Pega o ativo selecionado do dropdown customizado
    let ativo = ativoSelecionado || document.querySelector('#ativoDropdownList li.selected')?.dataset.value || document.getElementById('selectedAtivoLabel')?.textContent?.trim() || 'PETR4';
    renderizarGrafico(ativo, tf);
    // Atualiza boleta para o ativo selecionado
    clonarBoletaParaGrafico(ativo);
  };

  // Atualiza boleta para todos os ativos disponíveis
  window.clonarBoletaParaGrafico = function(ativoSelecionado) {
    const container = document.getElementById('boletaGraficoContainer');
    if (!container) return;
    container.innerHTML = '';
    const form = document.createElement('div');
    form.className = 'card card-boleta';
    form.innerHTML = `
      <h3>Boleta de Ofertas (Gráfico)</h3>
      <label for="quantidadeGrafico">Quantidade</label>
      <input type="number" id="quantidadeGrafico" min="100" step="100" value="100" style="width:100%; padding:12px 10px; border-radius:12px; border:1.5px solid #232a3d; background:#232a3d; color:#fff; font-size:1.05rem; margin-bottom:12px; outline:none; transition: border 0.2s;" onfocus="this.style.borderColor='#00ffa3'" onblur="this.style.borderColor='#232a3d'">
      <label for="valorGrafico">Valor</label>
      <input type="number" id="valorGrafico" min="0.01" step="0.01" value="0.01" style="width:100%; padding:12px 10px; border-radius:12px; border:1.5px solid #232a3d; background:#232a3d; color:#fff; font-size:1.05rem; margin-bottom:12px; outline:none; transition: border 0.2s;" onfocus="this.style.borderColor='#00ffa3'" onblur="this.style.borderColor='#232a3d'">
      <div class="boleta-botoes">
        <button id="btnCompraGrafico" class="btn-compra" type="button">Comprar</button>
        <button id="btnVendaGrafico" class="btn-venda" type="button">Vender</button>
      </div>
      <div id="mensagemGrafico" class="mensagem"></div>
    `;
    container.appendChild(form);
    // Preenche o valor do ativo selecionado
    const valorInput = form.querySelector('#valorGrafico');
    let ativoAtual = ativoSelecionado || document.querySelector('#ativoDropdownList li.selected')?.dataset.value || document.getElementById('selectedAtivoLabel')?.textContent?.trim() || 'PETR4';
    // Simula preço do ativo (pode ser randomizado ou fixo por ativo)
    function precoSimulado(ativo) {
      // Exemplo: preço base por ativo
      const precos = {
        'PETR4': 32.00, 'VALE3': 56.00, 'ITUB4': 28.00, 'ABEV3': 15.00, 'BBDC4': 23.00, 'BBAS3': 18.00, 'BRFS3': 10.00, 'GGBR4': 20.00, 'LREN3': 35.00, 'MGLU3': 4.00, 'USIM5': 8.00, 'WEGE3': 40.00, 'RADL3': 25.00, 'TIMS3': 12.00
      };
      return precos[ativo] || 10.00;
    }
    valorInput.value = precoSimulado(ativoAtual).toFixed(2);
    // Atualiza valor ao trocar ativo no gráfico
    window._atualizaValorBoleta = function(ativo) {
      valorInput.value = precoSimulado(ativo).toFixed(2);
    };
    // Botões de compra e venda
    form.querySelector('#btnCompraGrafico').onclick = function() {
      executarOperacaoGrafico('Compra');
    };
    form.querySelector('#btnVendaGrafico').onclick = function() {
      executarOperacaoGrafico('Venda');
    };
  };
});
// Validação robusta de senha forte
function validarSenhaForte(senha) {
  // Mínimo 8 caracteres, pelo menos 1 maiúscula, 1 minúscula, 1 número e 1 especial
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!^\-_=+.,;:])[A-Za-z\d@#$%&*!^\-_=+.,;:]{8,}$/;
  return regex.test(senha);
}

const MSG_SENHA_FORTE = "A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (ex: @, #, $, %, &, *).";

// === Exibe tela de login ao clicar nos botões da landing ===
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.btn-login, .btn-cadastro').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof mostrarLogin === 'function') {
        mostrarLogin();
      } else {
        // Fallback manual
        var loginSection = document.getElementById('loginSection');
        var cadastroSection = document.getElementById('cadastroSection');
        var portal = document.getElementById('portal');
        if (loginSection) loginSection.classList.remove('hidden');
        if (cadastroSection) cadastroSection.classList.add('hidden');
        if (portal) portal.classList.add('hidden');
      }
    });
  });

  // --- CORREÇÃO DO BUG: Restaura usuário logado do localStorage se existir ---
  const usuarioSalvo = localStorage.getItem('usuarioLogado');
  if (usuarioSalvo) {
    try {
      const usuario = JSON.parse(usuarioSalvo);
      // Verifica se o usuário ainda existe na lista de usuários
      const usuarioValido = usuarios.find(u => u.cpf === usuario.cpf);
      if (usuarioValido) {
        // Restaura dados do usuário logado
        usuarioLogado = usuarioValido;
        // Atualiza com dados mais recentes do localStorage
        if (usuario.carteira && Object.keys(usuario.carteira).length > 0) {
          usuarioLogado.carteira = usuario.carteira;
        }
        if (usuario.extrato && usuario.extrato.length > 0) {
          usuarioLogado.extrato = usuario.extrato;
        }
        if (usuario.ordens && usuario.ordens.length > 0) {
          usuarioLogado.ordens = usuario.ordens;
        }
        if (usuario.saldo !== undefined && usuario.saldo !== 200000.00) {
          usuarioLogado.saldo = usuario.saldo;
        }
        // Salva as alterações
        atualizarLocalStorageUsuario();
        // Mostra o portal diretamente
        mostrarPortal();
        return; // Sai da função para não executar o código abaixo
      }
    } catch (e) {
      console.error('Erro ao restaurar usuário do localStorage:', e);
      localStorage.removeItem('usuarioLogado'); // Remove dados corrompidos
    }
  }

  // --- Atualiza carteira, extrato e ordens ao recarregar se usuário estiver logado e portal visível ---
  if (typeof usuarioLogado !== 'undefined' && usuarioLogado && !document.getElementById('portal').classList.contains('hidden')) {
    atualizarCarteira();
    atualizarExtrato();
    atualizarOrdens();
    atualizarBook();
  }
});
// --- Dropdown de intervalo de tempo do gráfico (Análise Técnica) ---
document.addEventListener('DOMContentLoaded', function() {
  const tfDropdown = document.getElementById('timeframeDropdown');
  const tfBtn = document.getElementById('timeframeDropdownBtn');
  const tfList = document.getElementById('timeframeDropdownList');
  const tfLabel = document.getElementById('selectedTimeframeLabel');
    if (tfDropdown && tfBtn && tfList && tfLabel) {
      tfBtn.onclick = function(e) {
        e.stopPropagation();
        tfDropdown.classList.toggle('open');
      };
      document.addEventListener('click', function(e) {
        if (!tfDropdown.contains(e.target)) tfDropdown.classList.remove('open');
      });
      tfList.querySelectorAll('li[data-value]').forEach(item => {
        item.onclick = function() {
          tfList.querySelectorAll('li.selected').forEach(li => li.classList.remove('selected'));
          item.classList.add('selected');
          tfLabel.textContent = item.textContent;
          tfDropdown.classList.remove('open');
          atualizarGraficoTimeframe(item.dataset.value, item.textContent);
        };
      });
    }
});

// Atualização real time do gráfico ao mudar timeframe
let graficoRealTimeInterval = null;

// Nova renderização do gráfico para timeframe customizado
// --- Candle animado em tempo real ---
let candleInterval = null;
function renderizarGrafico(ativo, tf='5m') {
  if (candleInterval) clearInterval(candleInterval);
  // Determina o intervalo e o número de candles
  let intervalMs = 60000, numCandles = 30, alignFunc = null;
  if (tf.endsWith('m')) { intervalMs = parseInt(tf) * 60000; numCandles = 60; alignFunc = (d) => { d.setSeconds(0,0); d.setMinutes(Math.floor(d.getMinutes() / parseInt(tf)) * parseInt(tf)); return d; }; }
  if (tf.endsWith('h')) { intervalMs = parseInt(tf) * 3600000; numCandles = 48; alignFunc = (d) => { d.setSeconds(0,0); d.setMinutes(0); d.setHours(Math.floor(d.getHours() / parseInt(tf)) * parseInt(tf)); return d; }; }
  if (tf === '1d') { intervalMs = 24*3600000; numCandles = 30; alignFunc = (d) => { d.setHours(0,0,0,0); return d; }; }
  if (tf === '1w') { intervalMs = 7*24*3600000; numCandles = 26; alignFunc = (d) => { d.setHours(0,0,0,0); d.setDate(d.getDate() - d.getDay()); return d; }; }
  if (tf === '1M') { intervalMs = 30*24*3600000; numCandles = 24; alignFunc = (d) => { d.setHours(0,0,0,0); d.setDate(1); return d; }; }
  // Gera candles simulados para o timeframe, datas coerentes e alinhadas
  let candles = [];
  let base = 50 + Math.random() * 30;
  let now = new Date();
  let alignedNow = alignFunc ? alignFunc(new Date(now)) : now;
  let lastCandleEnd = alignedNow.getTime() + intervalMs;
  for (let i = numCandles - 1; i > 0; i--) {
    let candleDate = new Date(lastCandleEnd - i * intervalMs);
    if (alignFunc) candleDate = alignFunc(new Date(candleDate));
    let open = base + (Math.random() - 0.5) * 2;
    let close = open + (Math.random() - 0.5) * 2;
    let high = Math.max(open, close) + Math.random() * 2;
    let low = Math.min(open, close) - Math.random() * 2;
    candles.push({
      x: candleDate,
      y: [open.toFixed(2), high.toFixed(2), low.toFixed(2), close.toFixed(2)]
    });
    base = close;
  }
  // Último candle (em formação, tempo real)
  let lastCandleTime = lastCandleEnd;
  let lastOpen = base + (Math.random() - 0.5) * 2;
  let lastClose = lastOpen + (Math.random() - 0.5) * 2;
  let lastHigh = Math.max(lastOpen, lastClose) + Math.random() * 2;
  let lastLow = Math.min(lastOpen, lastClose) - Math.random() * 2;
  // O último candle sempre acompanha o horário real
  let lastCandle = {
    x: new Date(),
    y: [lastOpen.toFixed(2), lastHigh.toFixed(2), lastLow.toFixed(2), lastClose.toFixed(2)]
  };
  candles.push(lastCandle);
  // Volume fake proporcional ao candle
  let volumes = candles.map((c, i) => ({
    x: c.x,
    y: Math.floor(1200 + Math.random() * 800 + Math.abs(c.y[3] - c.y[0]) * 300)
  }));
  // Opções do gráfico
  const options = {
    chart: {
      type: 'candlestick',
      height: 440,
      background: '#181a1f',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      toolbar: { show: false },
      animations: { enabled: true }
    },
    grid: {
      borderColor: '#23272f',
      strokeDashArray: 5,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    },
    title: {
      text: `Análise Técnica - ${ativo}`,
      align: 'left',
      style: { color: '#00ffa3', fontWeight: 700, fontSize: '1.35rem', fontFamily: 'inherit' }
    },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#bdbdbd', fontSize: '13px', fontFamily: 'inherit' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    tooltip: {
      enabled: true,
      shared: true,
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        const candle = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        if (!candle) return '';
        return `<div style='padding:10px 14px;background:#23272f;color:#fff;border-radius:10px;font-size:1.08em;'>`
          + `<b>${new Date(candle.x).toLocaleString()}</b><br>`
          + `Abertura: <b style='color:#61ffb3'>${candle.y[0]}</b><br>`
          + `Máxima: <b style='color:#00ffa3'>${candle.y[1]}</b><br>`
          + `Mínima: <b style='color:#ff4d4d'>${candle.y[2]}</b><br>`
          + `Fechamento: <b style='color:${candle.y[3] > candle.y[0] ? '#00ff7f' : '#ff4d4d'}'>${candle.y[3]}</b>`
          + `</div>`;
      }
    },
    series: [
      {
        name: 'Candlestick',
        type: 'candlestick',
        data: candles,
        color: '#bdbdbd',
        upColor: '#00ff7f',
        downColor: '#ff4d4d',
        wick: { useFillColor: true }
      },
      {
        name: 'Volume',
        type: 'bar',
        data: volumes,
        color: '#00ffa3',
        opacity: 0.45,
        yAxisIndex: 1,
        barWidth: '70%'
      }
    ],
    theme: { mode: 'dark' },
    responsive: [{
      breakpoint: 900,
      options: {
        chart: { height: 280 },
        title: { style: { fontSize: '1rem' } }
      }
    }],
    annotations: { yaxis: [] },
    yaxis: [
      {
        tooltip: { enabled: true },
        labels: { style: { colors: '#bdbdbd', fontSize: '13px', fontFamily: 'inherit' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
        title: { text: 'Preço', style: { color: '#bdbdbd', fontWeight: 600 } },
        height: '70%',
      },
      {
        show: true,
        labels: { style: { colors: '#00ffa3', fontSize: '12px', fontFamily: 'inherit' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
        title: { text: 'Volume', style: { color: '#00ffa3', fontWeight: 600 } },
        top: '72%',
        height: '28%',
        offsetY: 0
      }
    ]
  };
  if (!window.chart) {
    window.chart = new ApexCharts(document.querySelector("#chart"), options);
    window.chart.render();
  } else {
    window.chart.updateOptions({
      title: { text: `Análise Técnica - ${ativo}` },
      series: [
        {
          name: 'Candlestick',
          type: 'candlestick',
          data: candles,
          color: '#bdbdbd',
          upColor: '#00ff7f',
          downColor: '#ff4d4d',
          wick: { useFillColor: true }
        },
        {
          name: 'Volume',
          type: 'bar',
          data: volumes,
          color: '#00ffa3',
          opacity: 0.45,
          yAxisIndex: 1,
          barWidth: '70%'
        }
      ]
    });
  }
  // --- Candle animado ao vivo ---
  // Animação fluida: ticks a cada 200ms para simular fluxo de mercado
  candleInterval = setInterval(() => {
    let last = candles[candles.length - 1];
    let nowTime = Date.now();
    let elapsed = nowTime - lastCandleTime;
    // Se passou o tempo do candle, fecha e inicia novo
    if (elapsed >= intervalMs) {
      last.y[3] = (parseFloat(last.y[0]) + (Math.random() - 0.5) * 2).toFixed(2);
      let open = last.y[3];
      let close = (parseFloat(open) + (Math.random() - 0.5) * 2).toFixed(2);
      let high = Math.max(open, close) + Math.random() * 2;
      let low = Math.min(open, close) - Math.random() * 2;
      let newCandle = {
        x: new Date(),
        y: [open, high.toFixed(2), low.toFixed(2), close]
      };
      candles.push(newCandle);
      if (candles.length > numCandles) candles.shift();
      volumes.push({ x: newCandle.x, y: Math.floor(1200 + Math.random() * 800 + Math.abs(close - open) * 300) });
      if (volumes.length > numCandles) volumes.shift();
      lastCandleTime = nowTime;
    } else {
      // Movimentação real: ticks a cada 200ms
      let open = parseFloat(last.y[0]);
      let prevClose = parseFloat(last.y[3]);
      let tickVol = tf.endsWith('m') ? 0.25 : tf.endsWith('h') ? 0.5 : 1.5;
      // Simula micro variação
      let close = (prevClose + (Math.random() - 0.5) * tickVol).toFixed(2);
      let high = Math.max(open, close, last.y[1]) + Math.random() * tickVol * 0.2;
      let low = Math.min(open, close, last.y[2]) - Math.random() * tickVol * 0.2;
      last.y[1] = high.toFixed(2);
      last.y[2] = low.toFixed(2);
      last.y[3] = close;
      last.x = new Date();
      volumes[volumes.length - 1].x = last.x;
    }
    if (window.chart) {
      window.chart.updateSeries([
        { name: 'Candlestick', type: 'candlestick', data: candles },
        { name: 'Volume', type: 'bar', data: volumes }
      ]);
    }
  }, 200);
}

// Inicializa o gráfico com o timeframe padrão ao abrir a Análise Técnica
document.addEventListener('DOMContentLoaded', function() {
  const graficoSection = document.getElementById('graficoSection');
  if (graficoSection) {
    const observer = new MutationObserver(function() {
      if (!graficoSection.classList.contains('hidden')) {
        // Pega o selecionado
                    const tfSelect = document.getElementById('selectTimeframeGrafico');
                    if (tfSelect) atualizarGraficoTimeframe(tfSelect.value, tfSelect.options[tfSelect.selectedIndex].textContent);
      }
    });
    observer.observe(graficoSection, { attributes: true, attributeFilter: ['class'] });
  }
});
// --- Fim dropdown timeframe ---
// 1. Corrige cor dos cards da Carteira e gráficos
  document.querySelectorAll('#carteira tbody tr td > div').forEach(card => {
    card.style.background = 'linear-gradient(90deg,#232a3d 80%,#181c2f 100%)';
    card.style.color = '#e6e6e6';
    card.style.boxShadow = '0 2px 12px #0006';
    card.style.borderRadius = '14px';
    // Sparkline SVG cor escura
    let svg = card.querySelector('svg');
    if (svg) svg.querySelector('polyline').setAttribute('stroke', '#00ffa3');
  });

  // 2. Corrige fundo e texto do Extrato de Operações
  const extratoTable = document.getElementById('extrato');
  if (extratoTable) {
    extratoTable.style.background = 'linear-gradient(90deg,#232a3d 80%,#181c2f 100%)';
    extratoTable.style.color = '#e6e6e6';
    extratoTable.style.borderRadius = '12px';
    extratoTable.style.boxShadow = '0 2px 12px #0006';
    extratoTable.querySelectorAll('th').forEach(th => {
      th.style.background = '#181c2f';
      th.style.color = '#00ffa3';
      th.style.fontWeight = 'bold';
      th.style.borderBottom = '2px solid #00ffa3';
    });
    extratoTable.querySelectorAll('td').forEach(td => {
      td.style.background = 'transparent';
      td.style.color = '#e6e6e6';
      td.style.fontSize = '15px';
    });
    // --- Dropdown Exportação Extrato ---
    const dropdown = document.getElementById('exportExtratoDropdown');
    const btn = document.getElementById('exportExtratoBtn');
    const list = document.getElementById('exportExtratoList');
    if (dropdown && btn && list) {
      btn.onclick = function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      };
      document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
      });
      list.querySelectorAll('li').forEach(item => {
        item.onclick = function() {
          dropdown.classList.remove('open');
          if (item.dataset.export === 'xlsx') exportExtratoXLSX();
          if (item.dataset.export === 'json') exportExtratoJSON();
        };
      });
    }
    // --- Fim Dropdown ---
    // Função para coletar dados do extrato da tabela (apenas do dia atual)
    function getExtratoDataHoje() {
      const tbody = extratoTable.querySelector('tbody');
      if (!tbody) return [];
      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const ano = hoje.getFullYear();
      const rows = Array.from(tbody.querySelectorAll('tr'));
      return rows.map(tr => {
        const tds = tr.querySelectorAll('td');
        // Data/Hora, Tipo, Ativo, Qtd, Preço Unit., Total (R$), Taxas, L/P (R$), Status
        return {
          dataHora: tds[0]?.innerText || '',
          tipo: tds[1]?.innerText || '',
          ativo: tds[2]?.innerText || '',
          qtd: tds[3]?.innerText || '',
          precoUnit: tds[4]?.innerText || '',
          total: tds[5]?.innerText || '',
          taxas: tds[6]?.innerText || '',
          lp: tds[7]?.innerText || '',
          status: tds[8]?.innerText || ''
        };
      }).filter(obj => {
        // Só do dia atual
        if (!obj.dataHora) return false;
        const [data] = obj.dataHora.split(',');
        if (!data) return false;
        const [d, m, y] = data.split('/');
        return d === dia && m === mes && y === String(ano);
      });
    }
    // Exportar para XLSX usando SheetJS
    function exportExtratoXLSX() {
      const data = getExtratoDataHoje();
      if (!data.length) { alert('Nenhuma transação do dia encontrada.'); return; }
      const header = ['Data/Hora','Tipo','Ativo','Qtd','Preço Unit.','Total (R$)','Taxas','L/P (R$)','Status'];
      const aoa = [header].concat(data.map(obj => [obj.dataHora,obj.tipo,obj.ativo,obj.qtd,obj.precoUnit,obj.total,obj.taxas,obj.lp,obj.status]));
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Extrato');
      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const ano = hoje.getFullYear();
      XLSX.writeFile(wb, `extrato_${dia}-${mes}-${ano}.xlsx`);
    }
    // Exportar para JSON
    function exportExtratoJSON() {
      const data = getExtratoDataHoje();
      if (!data.length) { alert('Nenhuma transação do dia encontrada.'); return; }
      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const ano = hoje.getFullYear();
      const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `transacoes_${dia}-${mes}-${ano}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  // 3. Aplica tema escuro, realce e layout moderno ao topo/header
  const header = document.querySelector('.header-portal, .header, #header, .dashboard-header, .dashboard-top');
  if (header) {
    header.style.background = 'linear-gradient(90deg,#181c2f 60%,#232a3d 100%)';
    header.style.color = '#00ffa3';
    header.style.boxShadow = '0 4px 24px #00ffa344, 0 2px 8px #0008';
    header.style.borderBottom = '2px solid #00ffa3';
    header.style.padding = '18px 28px 18px 28px';
    header.style.borderRadius = '0 0 18px 18px';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.gap = '18px';
  }
  // Avatar com glow
  const logo = document.querySelector('.logo-circular');
  if (logo) {
    logo.style.borderRadius = '50%';
    logo.style.boxShadow = '0 0 16px 4px #00ffa3, 0 0 0 4px #181c2f';
    logo.style.background = '#181c2f';
    logo.style.width = '80px';
    logo.style.height = '80px';
    logo.style.objectFit = 'cover';
    logo.style.marginRight = '18px';
    logo.style.border = '2px solid #00ffa3';
  }
  // Nome e badge premium (nome em duas linhas, badge ao lado)
  const usernamePremium = document.querySelector('.username-premium');
  if (usernamePremium) {
    usernamePremium.style.display = 'flex';
    usernamePremium.style.alignItems = 'center';
    usernamePremium.style.gap = '12px';
  }
  const username = document.getElementById('username');
  if (username) {
    // Divide nome e sobrenome (ou primeira palavra e o resto)
    const nomeCompleto = username.textContent.trim();
    let nome1 = nomeCompleto, nome2 = '';
    if (nomeCompleto.includes(' ')) {
      const partes = nomeCompleto.split(' ');
      nome1 = partes[0];
      nome2 = partes.slice(1).join(' ');
    }
    username.innerHTML = `<span style="display:block;font-size:1.5rem;font-weight:bold;line-height:1.1;color:#00ffa3">${nome1}</span>` +
      (nome2 ? `<span style="display:block;font-size:1.5rem;font-weight:bold;line-height:1.1;color:#00ffa3">${nome2}</span>` : '');
    username.style.display = 'flex';
    username.style.flexDirection = 'column';
    username.style.justifyContent = 'center';
    username.style.alignItems = 'flex-start';
    username.style.maxWidth = '180px';
    username.style.overflow = 'hidden';
    username.style.textOverflow = 'ellipsis';
    username.style.whiteSpace = 'normal';
    username.style.margin = '0';
    username.style.padding = '0';
  }
  // Badge premium (apenas uma vez)
  (function() {
    const badgeEl = document.querySelector('.premium-badge');
    if (badgeEl) {
      badgeEl.style.border = '1.5px solid #00ffa3';
      badgeEl.style.color = '#00ffa3';
      badgeEl.style.background = 'transparent';
      badgeEl.style.borderRadius = '8px';
      badgeEl.style.padding = '2px 10px';
      badgeEl.style.fontWeight = 'bold';
      badgeEl.style.fontSize = '0.95rem';
      badgeEl.style.marginLeft = '6px';
      badgeEl.style.boxShadow = '0 0 4px #00ffa355';
      badgeEl.style.alignSelf = 'center';
      badgeEl.style.height = 'fit-content';
      badgeEl.style.display = 'inline-block';
      badgeEl.style.verticalAlign = 'middle';
    }
  })();
  const badge = document.querySelector('.premium-badge');
  if (badge) {
    badge.style.border = '1.5px solid #00ffa3';
    badge.style.color = '#00ffa3';
    badge.style.background = 'transparent';
    badge.style.borderRadius = '8px';
    badge.style.padding = '2px 10px';
    badge.style.fontWeight = 'bold';
    badge.style.fontSize = '0.95rem';
    badge.style.marginLeft = '6px';
    badge.style.boxShadow = '0 0 4px #00ffa355';
  }
  // Saldo destacado
  const saldoBloco = document.getElementById('saldoBloco');
  if (saldoBloco) {
    saldoBloco.style.background = 'rgba(24, 25, 36, 0.95)';
    saldoBloco.style.border = '1.5px solid #00ffa3';
    saldoBloco.style.borderRadius = '10px';
    saldoBloco.style.padding = '6px 18px';
    saldoBloco.style.color = '#fff';
    saldoBloco.style.fontWeight = 'bold';
    saldoBloco.style.fontSize = '1.1rem';
    saldoBloco.style.boxShadow = '0 0 8px #00ffa355';
    saldoBloco.style.margin = '0 12px';
    saldoBloco.style.display = 'flex';
    saldoBloco.style.alignItems = 'center';
    saldoBloco.style.gap = '8px';
  }
  // Botões do header
  const headerBtns = document.querySelector('.header-buttons');
  if (headerBtns) {
    headerBtns.style.display = 'flex';
    headerBtns.style.gap = '32px';
  }
  // Botão de transferência
  const btnTransf = document.getElementById('btnTransferencia');
  if (btnTransf) {
    btnTransf.style.background = 'linear-gradient(90deg,#00ffa3 60%,#00c97a 100%)';
    btnTransf.style.borderRadius = '16px';
    btnTransf.style.boxShadow = '0 0 16px #00ffa355, 0 2px 8px #00ffa322';
    btnTransf.style.border = 'none';
    btnTransf.style.padding = '16px';
    btnTransf.style.transition = 'background 0.2s, filter 0.2s';
    btnTransf.style.display = 'flex';
    btnTransf.style.alignItems = 'center';
    btnTransf.querySelector('svg').style.color = '#181c2f';
    btnTransf.onmouseover = () => {
      btnTransf.style.filter = 'brightness(1.15) drop-shadow(0 0 8px #00ffa3)';
    };
    btnTransf.onmouseout = () => {
      btnTransf.style.filter = 'none';
    };
  }
  // Botão de gráfico
  const btnGraf = document.getElementById('btnGrafico');
  if (btnGraf) {
    btnGraf.style.background = 'linear-gradient(90deg,#00ffa3 60%,#00c97a 100%)';
    btnGraf.style.borderRadius = '16px';
    btnGraf.style.boxShadow = '0 0 16px #00ffa355, 0 2px 8px #00ffa322';
    btnGraf.style.border = 'none';
    btnGraf.style.padding = '16px';
    btnGraf.style.transition = 'background 0.2s, filter 0.2s';
    btnGraf.style.display = 'flex';
    btnGraf.style.alignItems = 'center';
    btnGraf.querySelector('svg').style.color = '#181c2f';
    btnGraf.onmouseover = () => {
      btnGraf.style.filter = 'brightness(1.15) drop-shadow(0 0 8px #00ffa3)';
    };
    btnGraf.onmouseout = () => {
      btnGraf.style.filter = 'none';
    };
  }
  // Botão de logout destacado em vermelho
  const btnSair = document.getElementById('btnSair');
  if (btnSair) {
    btnSair.style.background = 'rgba(255, 0, 64, 0.18)';
    btnSair.style.borderRadius = '16px';
    btnSair.style.boxShadow = '0 0 16px #ff4d4d88';
    btnSair.style.border = 'none';
    btnSair.style.padding = '16px';
    btnSair.style.transition = 'background 0.2s, filter 0.2s';
    btnSair.style.display = 'flex';
    btnSair.style.alignItems = 'center';
    btnSair.querySelector('svg').style.color = '#ff4d4d';
    btnSair.onmouseover = () => {
      btnSair.style.background = 'rgba(255, 0, 64, 0.35)';
      btnSair.style.filter = 'brightness(1.1) drop-shadow(0 0 8px #ff4d4d)';
      btnSair.querySelector('svg').style.color = '#fff';
    };
    btnSair.onmouseout = () => {
      btnSair.style.background = 'rgba(255, 0, 64, 0.18)';
      btnSair.style.filter = 'none';
      btnSair.querySelector('svg').style.color = '#ff4d4d';
    };
  }

  // 4. Aumenta contraste dos botões Comprar/Vender
  document.querySelectorAll('.btn-compra').forEach(btn => {
    btn.style.background = 'linear-gradient(90deg,#00ffa3 60%,#00c97a 100%)';
    btn.style.color = '#181c2f';
    btn.style.fontWeight = 'bold';
    btn.style.boxShadow = '0 2px 8px #00ffa322';
    btn.style.borderRadius = '8px';
    btn.style.border = 'none';
  });
  document.querySelectorAll('.btn-venda').forEach(btn => {
    btn.style.background = 'linear-gradient(90deg,#ff4d4d 60%,#c90000 100%)';
    btn.style.color = '#fff';
    btn.style.fontWeight = 'bold';
    btn.style.boxShadow = '0 2px 8px #ff4d4d22';
    btn.style.borderRadius = '8px';
    btn.style.border = 'none';
  });

  // 5. Ícones alinhados no status do extrato
  document.querySelectorAll('#extrato tbody tr td:last-child').forEach(td => {
    td.style.display = 'flex';
    td.style.alignItems = 'center';
    td.style.gap = '6px';
    td.style.fontWeight = 'bold';
    td.style.fontSize = '16px';
  });

  // 6. Bordas arredondadas e sombras nos cards das seções
  document.querySelectorAll('.card, .dashboard-row-align, .scrollable-carteira-align, .scrollable-book-align, .scrollable-extrato-align, .scrollable-ordens-align').forEach(card => {
    card.style.borderRadius = '18px';
    card.style.boxShadow = '0 4px 24px #0006';
    card.style.background = 'linear-gradient(120deg,#181c2f 80%,#232a3d 100%)';
    card.style.padding = '24px';
    card.style.marginBottom = '18px';
  });

  // 7. Organiza campos da boleta em linha única se houver espaço
  const boleta = document.querySelector('.card-boleta');
  if (boleta) {
    boleta.style.display = 'flex';
    boleta.style.flexWrap = 'wrap';
    boleta.style.flexDirection = 'row';
    boleta.style.alignItems = 'center';
    boleta.style.gap = '16px';
    boleta.style.padding = '18px 24px';
    boleta.style.borderRadius = '16px';
    boleta.style.boxShadow = '0 2px 12px #0006';
    boleta.style.background = 'linear-gradient(90deg,#181c2f 80%,#232a3d 100%)';
    boleta.querySelectorAll('label,input,select,button').forEach(el => {
      el.style.margin = '0 8px';
      el.style.height = '38px';
      el.style.borderRadius = '8px';
      el.style.border = 'none';
      el.style.boxShadow = '0 1px 4px #0002';
      el.style.background = '#232a3d';
      el.style.color = '#e6e6e6';
    });
    boleta.querySelectorAll('button').forEach(btn => {
      btn.style.padding = '0 18px';
      btn.style.fontWeight = 'bold';
      btn.style.background = 'linear-gradient(90deg,#00ffa3 60%,#00c97a 100%)';
      btn.style.color = '#181c2f';
      btn.style.borderRadius = '8px';
      btn.style.boxShadow = '0 2px 8px #00ffa322';
      btn.onmouseover = () => btn.style.background = '#00c97a';
      btn.onmouseout = () => btn.style.background = 'linear-gradient(90deg,#00ffa3 60%,#00c97a 100%)';
    });
  }
  // Estilo moderno para cards principais
  document.querySelectorAll('.card, .dashboard-row-align, .scrollable-carteira-align, .scrollable-book-align, .scrollable-extrato-align, .scrollable-ordens-align').forEach(card => {
    card.style.borderRadius = '18px';
    card.style.boxShadow = '0 4px 24px #0003';
    card.style.background = 'linear-gradient(120deg,#181c2f 80%,#232a3d 100%)';
    card.style.padding = '24px';
    card.style.marginBottom = '18px';
  });
  // Aplica layout compacto à boleta de compra e venda (sem redeclaração)
  var boletaElem = document.querySelector('.card-boleta');
  if (boletaElem) {
    boletaElem.style.display = 'flex';
    boletaElem.style.flexDirection = 'row';
    boletaElem.style.alignItems = 'center';
    boletaElem.style.gap = '16px';
    boletaElem.style.padding = '18px 24px';
    boletaElem.style.borderRadius = '16px';
    boletaElem.style.boxShadow = '0 2px 12px #0002';
    boletaElem.style.background = 'linear-gradient(90deg,#181c2f 80%,#232a3d 100%)';
    boletaElem.querySelectorAll('label,input,select,button').forEach(el => {
      el.style.margin = '0 8px';
      el.style.height = '38px';
      el.style.borderRadius = '8px';
      el.style.border = 'none';
      el.style.boxShadow = '0 1px 4px #0001';
    });
    boletaElem.querySelectorAll('button').forEach(btn => {
      btn.style.padding = '0 18px';
      btn.style.fontWeight = 'bold';
      btn.style.background = '#00ffa3';
      btn.style.color = '#181c2f';
      btn.style.borderRadius = '8px';
      btn.style.boxShadow = '0 2px 8px #00ffa322';
      btn.onmouseover = () => btn.style.background = '#00c97a';
      btn.onmouseout = () => btn.style.background = '#00ffa3';
    });
  }
// ========== DADOS SIMULADOS INICIAIS ==========
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioLogado = null;
// Removido saldo global, usar apenas usuarioLogado.saldo

// Garante que o loader esteja oculto ao iniciar o sistema
window.addEventListener('DOMContentLoaded', function() {
  // Verifica se há um usuário logado no localStorage para restaurar a sessão
  const usuarioSalvo = localStorage.getItem('usuarioLogado');
  if (usuarioSalvo) {
    try {
      const usuario = JSON.parse(usuarioSalvo);
      // Busca o usuário na lista de usuários para garantir que os dados estão atualizados
      const usuarioValido = usuarios.find(u => u.cpf === usuario.cpf);
      if (usuarioValido && usuarioLogado) {
        // Só restaura se o usuário tiver dados válidos (não seja um usuário "limpo" do logout)
        const temDadosValidos = (usuario.carteira && Object.keys(usuario.carteira).length > 0) ||
                                (usuario.extrato && usuario.extrato.length > 0) ||
                                (usuario.ordens && usuario.ordens.length > 0) ||
                                (usuario.saldo !== undefined && usuario.saldo !== 200000.00);
        
        if (temDadosValidos) {
          usuarioLogado = usuarioValido;
          // Restaura dados específicos do usuário salvo (carteira, extrato, ordens, saldo)
          if (usuario.carteira && Object.keys(usuario.carteira).length > 0) {
            usuarioLogado.carteira = usuario.carteira;
          }
          if (usuario.extrato && usuario.extrato.length > 0) {
            usuarioLogado.extrato = usuario.extrato;
          }
          if (usuario.ordens && usuario.ordens.length > 0) {
            usuarioLogado.ordens = usuario.ordens;
          }
          if (usuario.saldo !== undefined && usuario.saldo !== 200000.00) {
            usuarioLogado.saldo = usuario.saldo;
          }
          // Atualiza o localStorage e mostra o portal
          atualizarLocalStorageUsuario();
          mostrarPortal();
          return; // Sai da função para não mostrar a tela de login
        } else {
          // Se o usuário não tem dados válidos, remove do localStorage (usuário "limpo" do logout)
          localStorage.removeItem('usuarioLogado');
        }
      }
    } catch (e) {
      console.error('Erro ao restaurar usuário do localStorage:', e);
      localStorage.removeItem('usuarioLogado');
    }
  }
  
  // Garante que só a tela de login aparece ao iniciar (apenas se não houver usuário para restaurar)
  document.getElementById('loginSection').classList.remove('hidden');
  document.getElementById('cadastroSection').classList.add('hidden');
  document.getElementById('portal').classList.add('hidden');
  document.getElementById('transferSection').classList.add('hidden');
  var graficoSection = document.getElementById('graficoSection');
  if (graficoSection) graficoSection.classList.add('hidden');
  // Elementos de loader removidos - não existem mais no HTML
  var tabs = document.getElementById('tabs');
  if (tabs) tabs.classList.add('hidden');
  // Adiciona eventos aos botões da boleta
  const btnCompra = document.getElementById('btnCompra');
  const btnVenda = document.getElementById('btnVenda');
  if (btnCompra) {
    btnCompra.onclick = function() {
      executarOperacao('Compra');
    };
  }
  if (btnVenda) {
    btnVenda.onclick = function() {
      executarOperacao('Venda');
    };
  }
  // Elemento de loader removido - não existe mais no HTML

  // Adiciona mensagem informativa sobre o preenchimento automático da boleta
  var boletaInfo = document.getElementById('boletaInfo');
  if (!boletaInfo) {
    var infoDiv = document.createElement('div');
    infoDiv.id = 'boletaInfo';
    infoDiv.style.margin = '8px 0';
    infoDiv.style.fontSize = '14px';
    infoDiv.style.color = '#fefefeff';
    infoDiv.style.textAlign = 'center';
    infoDiv.textContent = 'Ao clicar no Book de Ofertas, os dados são preenchidos automaticamente na Boleta.';

    // Procura o título do Book de Ofertas
    var bookTitles = document.querySelectorAll('h2, h3, div, span');
    var bookTitleElem = null;
    bookTitles.forEach(function(elem) {
      if (elem.textContent.trim().toLowerCase().includes('book de ofertas')) {
        bookTitleElem = elem;
      }
    });
    if (bookTitleElem && bookTitleElem.parentNode) {
      // Insere a mensagem logo abaixo do título
      if (bookTitleElem.nextSibling) {
        bookTitleElem.parentNode.insertBefore(infoDiv, bookTitleElem.nextSibling);
      } else {
        bookTitleElem.parentNode.appendChild(infoDiv);
      }
    } else {
      // Fallback: insere acima do botão Comprar
      var btnCompraFallback = document.getElementById('btnCompra');
      if (btnCompraFallback && btnCompraFallback.parentNode) {
        btnCompraFallback.parentNode.insertBefore(infoDiv, btnCompraFallback);
      } else {
        // Último fallback: insere no body
        document.body.insertBefore(infoDiv, document.body.firstChild);
      }
    }
  }
});

let ativos = [
  { nome: 'PETR4', preco: 32.00, historico: [32.00] },
  { nome: 'VALE3', preco: 67.28, historico: [67.28] },
  { nome: 'ITUB4', preco: 30.01, historico: [30.01] },
  { nome: 'ABEV3', preco: 16.50, historico: [16.50] },
  { nome: 'BBDC4', preco: 22.75, historico: [22.75] },
  { nome: 'BBAS3', preco: 32.90, historico: [32.90] },
  { nome: 'BRFS3', preco: 19.80, historico: [19.80] },
  { nome: 'GGBR4', preco: 29.10, historico: [29.10] },
  { nome: 'LREN3', preco: 45.30, historico: [45.30] },
  { nome: 'MGLU3', preco: 12.70, historico: [12.70] },
  { nome: 'USIM5', preco: 13.60, historico: [13.60] },
  { nome: 'WEGE3', preco: 35.40, historico: [35.40] },
  { nome: 'RADL3', preco: 24.50, historico: [24.50] },
  { nome: 'TIMS3', preco: 8.75, historico: [8.75] }
];


// ================== TRANSFERÊNCIAS ==================
let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

// ========== UTILITÁRIOS ==========
function salvarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// ===== Alternância de Tema Claro/Escuro =====


function atualizarLocalStorageUsuario() {
  const index = usuarios.findIndex(u => u.cpf === usuarioLogado.cpf);
  if (index !== -1) {
    usuarios[index] = usuarioLogado;
    salvarUsuarios();
  }
  // Também atualiza a chave 'usuarioLogado' no localStorage para manter a sessão sincronizada
  if (usuarioLogado) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
  }
}

// ========== LOGIN ==========
function login() {
  // Verifica se as validações estão funcionando
  if (typeof validarFormularioLogin === 'function' && !validarFormularioLogin()) {
    return; // As validações já mostraram as mensagens de erro
  }

  let loginInput = document.getElementById("cpf").value.trim();
  const senha = document.getElementById("senha").value;
  const msg = document.getElementById("loginMsg");
  
  if (!loginInput) {
    msg.textContent = "Por favor, preencha o campo de CPF ou e-mail.";
    return;
  }
  
  if (!senha) {
    msg.textContent = "Por favor, preencha o campo de senha.";
    return;
  }

  // Validação de CPF ou e-mail
  const regexCpfPontuado = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const regexCpfNumeros = /^\d{11}$/;
  const regexEmail = /^[\w-.]+@[\w-]+(\.[a-z]{2,})+$/i;
  
  let isCpf = regexCpfPontuado.test(loginInput) || regexCpfNumeros.test(loginInput);
  let isEmail = regexEmail.test(loginInput);
  
  if (!isCpf && !isEmail) {
    msg.textContent = "Digite um CPF ou e-mail válido.";
    return;
  }

  // Busca usuário
  let user;
  if (isCpf) {
    let cpf = loginInput.replace(/[^\d]/g, '');
    user = usuarios.find(u => u.cpf === cpf && u.senha === senha);
  } else if (isEmail) {
    user = usuarios.find(u => u.email && u.email.toLowerCase() === loginInput.toLowerCase() && u.senha === senha);
  }
  
  if (user) {
    usuarioLogado = user;
    // Salva o usuário logado no localStorage para persistência
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    msg.textContent = "";
    document.getElementById('loginSection').classList.add('hidden');
    // Redirecionamento direto para o portal - sem loader
    mostrarPortal();
  } else {
    msg.textContent = "CPF/E-mail ou senha incorretos. Verifique seus dados e tente novamente.";
  }
}

// ========== CADASTRO ==========
function mostrarCadastro() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("cadastroSection").classList.remove("hidden");
}

function mostrarLogin() {
  document.getElementById("cadastroSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
}
function cadastrarUsuario() {
  // Verifica se as validações estão funcionando
  if (typeof validarFormularioCadastro === 'function' && !validarFormularioCadastro()) {
    return; // As validações já mostraram as mensagens de erro
  }

  const nome = document.getElementById("nome").value.trim();
  const celular = document.getElementById("whatsapp").value.trim();
  const email = document.getElementById("email").value.trim();
  let cpfOriginal = document.getElementById("novoCpf").value.trim();
  const senha = document.getElementById("novaSenhaCadastro").value;
  const confirmar = document.getElementById("confirmaSenha").value;
  const msg = document.getElementById("cadastroMsg");

  // Validação de campos obrigatórios
  if (!nome || !celular || !email || !cpfOriginal || !senha || !confirmar) {
    msg.textContent = "Por favor, preencha todos os campos obrigatórios.";
    return;
  }

  // Validação de nome
  const nomesProibidos = ['teste', 'admin', 'usuario', 'senha', '123456'];
  if (nomesProibidos.includes(nome.toLowerCase())) {
    msg.textContent = "Esse nome de usuário não é permitido.";
    return;
  }

  // Validação de CPF
  let cpf = cpfOriginal.replace(/[^\d]/g, '');
  const regexCpfPontuado = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const regexCpfNumeros = /^\d{11}$/;
  
  if (!(regexCpfPontuado.test(cpfOriginal) || regexCpfNumeros.test(cpfOriginal))) {
    msg.textContent = "O CPF deve conter 11 números, podendo ser digitado apenas números ou com pontos e traço.";
    return;
  }

  // Verifica se já existe usuário com esse CPF ou e-mail
  if (usuarios.some(u => u.cpf === cpf || (u.email && u.email.toLowerCase() === email.toLowerCase()))) {
    msg.textContent = "Já existe um usuário cadastrado com esse CPF ou e-mail.";
    return;
  }

  // Validação de senha
  if (senha !== confirmar) {
    msg.textContent = "As senhas digitadas não coincidem. Verifique e tente novamente.";
    return;
  }

  if (!validarSenhaForte(senha)) {
    msg.textContent = MSG_SENHA_FORTE;
    return;
  }

  // Cadastro válido
  const novoUsuario = {
    nome,
    cpf, // sempre apenas números
    email,
    senha,
    saldo: 200000.00,
    carteira: {}, // Carteira começa vazia, sem ativos comprados
    ordens: [],
    extrato: []
  };

  usuarios.push(novoUsuario);
  salvarUsuarios();
  msg.textContent = "Usuário cadastrado com sucesso!";
  msg.classList.remove("mensagem");
  msg.classList.add("success");

  // Login automático após cadastro
  usuarioLogado = novoUsuario;
  // Salva o usuário logado no localStorage
  localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
  setTimeout(() => {
    mostrarLoaderSplash(() => {
      mostrarPortal();
    });
  }, 800); // pequena pausa para mostrar mensagem de sucesso
}



// Corrige saldo inicial para 200 mil reais para todos os usuários já cadastrados e novos
usuarios.forEach(u => { u.saldo = 200000.00; });


// ========== PORTAL ==========
function mostrarPortal() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("cadastroSection").classList.add("hidden");
  document.getElementById("portal").classList.remove("hidden");
  var tabs = document.getElementById('tabs');
  if (tabs) tabs.classList.remove('hidden');
  // Loader removido - não existe mais no HTML
  // Atualiza nome do usuário
  document.getElementById("username").textContent = usuarioLogado.nome;
  document.getElementById("usernameCarteira").textContent = usuarioLogado.nome;
  // Atualiza saldo em destaque, se existir o bloco
  var saldoBloco = document.getElementById("saldoBloco");
  if (saldoBloco) {
    const saldoFormatado = usuarioLogado.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    saldoBloco.innerHTML = `
      <span class="label">Saldo</span>
      <span class="valor">${saldoFormatado}</span>
    `;
  }
  // Garante botões funcionais no header-portal
  var btnTransf = document.getElementById('btnTransferencia');
  if (btnTransf) btnTransf.onclick = mostrarTransferencia;
  var btnGraf = document.getElementById('btnGrafico');
  if (btnGraf) btnGraf.onclick = function() { showTab('graficoSection'); };
  var btnSair = document.getElementById('btnSair');
  if (btnSair) btnSair.onclick = function() {
    if (typeof logout === 'function') {
      logout();
    } else {
      // Fallback: esconde portal e mostra login
      document.getElementById('portal').classList.add('hidden');
      document.getElementById('loginSection').classList.remove('hidden');
      usuarioLogado = null;
    }
  };
// Função de logout global caso não exista
if (typeof logout !== 'function') {
  function logout() {
    // Restaura saldo do usuário para R$ 200.000,00
    if (usuarioLogado) {
      usuarioLogado.saldo = 200000.00; // Reset saldo
      usuarioLogado.extrato = [];      // Limpa extrato de operações
      usuarioLogado.ordens = [];       // Limpa book de ordens
      usuarioLogado.carteira = {};     // Limpa carteira de ativos
      // Comentário: saldo, extrato, ordens e carteira do usuário restaurados/limpos no logout
      atualizarLocalStorageUsuario();  // Salva alterações no localStorage
    }
    usuarioLogado = null;
    // Remove completamente o usuário logado do localStorage
    localStorage.removeItem('usuarioLogado');
    // Esconde todas as seções do portal
    document.getElementById('portal').classList.add('hidden');
    document.getElementById('graficoSection').classList.add('hidden');
    document.getElementById('transferSection').classList.add('hidden');
    var tabs = document.getElementById('tabs');
    if (tabs) tabs.classList.add('hidden');
    // Limpa dados visuais da sessão
    var saldoBloco = document.getElementById('saldoBloco');
    if (saldoBloco) saldoBloco.innerHTML = '';
    var saldoAntigo = document.getElementById('saldo');
    if (saldoAntigo) saldoAntigo.textContent = '';
    var username = document.getElementById('username');
    if (username) username.textContent = '';
    var usernameCarteira = document.getElementById('usernameCarteira');
    if (usernameCarteira) usernameCarteira.textContent = '';
    var carteiraBody = document.querySelector('#carteira tbody');
    if (carteiraBody) carteiraBody.innerHTML = '';
    var extratoBody = document.querySelector('#extrato tbody');
    if (extratoBody) extratoBody.innerHTML = '';
    var ordensBody = document.querySelector('#ordens tbody');
    if (ordensBody) ordensBody.innerHTML = '';
    var bookBody = document.querySelector('#book tbody');
    if (bookBody) bookBody.innerHTML = '';
    // Exibe tela de login
    document.getElementById('loginSection').classList.remove('hidden');
  }
}
  // Para compatibilidade, ainda atualiza saldo antigo se existir
  var saldoAntigo = document.getElementById("saldo");
  if (saldoAntigo) saldoAntigo.textContent = usuarioLogado.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  atualizarCarteira();
  atualizarBook();
  atualizarSelectAtivos();
  // Aplica sistema de rolagem nos containers das tabelas Extrato e Ordens
  const extratoTable = document.getElementById('extrato');
  if (extratoTable && !extratoTable.parentElement.classList.contains('scrollable-extrato-align')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'scrollable-extrato-align';
    extratoTable.parentNode.insertBefore(wrapper, extratoTable);
    wrapper.appendChild(extratoTable);
  }
  const ordensTable = document.getElementById('ordens');
  if (ordensTable && !ordensTable.parentElement.classList.contains('scrollable-ordens-align')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'scrollable-ordens-align';
    ordensTable.parentNode.insertBefore(wrapper, ordensTable);
    wrapper.appendChild(ordensTable);
  }
  atualizarExtrato();
  atualizarOrdens();
}

// ===== Loader Splash =====
function mostrarLoaderSplash(callback) {
  // Elementos de loader removidos - executa callback diretamente
  if (typeof callback === "function") callback();
}

// ========== LOGOUT ==========
// --- ABA GRÁFICO/ANÁLISE TÉCNICA ---
const ativosDisponiveis = ["PETR4", "VALE3", "ITUB4", "BBDC4", "ABEV3"];

function showTab(tabId) {
  document.getElementById('portal').classList.add('hidden');
  document.getElementById('graficoSection').classList.add('hidden');
  document.getElementById('transferSection').classList.add('hidden');
  document.getElementById(tabId).classList.remove('hidden');
}


// Gera base de 1 minuto para simulação (pode ser cacheada)
let base1mCache = {};
function gerarBase1m(ativo, totalMinutos = 500) {
  if (base1mCache[ativo] && base1mCache[ativo].length >= totalMinutos) return base1mCache[ativo].slice(-totalMinutos);
  let candles = [];
  let base = 50 + Math.random() * 30;
  const now = Date.now();
  for (let i = 0; i < totalMinutos; i++) {
    let open = base + (Math.random() - 0.5) * 2;
    let close = open + (Math.random() - 0.5) * 2;
    let high = Math.max(open, close) + Math.random() * 2;
    let low = Math.min(open, close) - Math.random() * 2;
    candles.push({
      x: new Date(now - (totalMinutos - i) * 60 * 1000),
      y: [open, high, low, close]
    });
    base = close;
  }
  base1mCache[ativo] = candles;
  return candles;
}

// Agrupa candles de 1m em blocos do intervalo desejado
function agruparCandles(candles1m, minutosPorCandle, num=30) {
  let agrupados = [];
  let bloco = [];
  for (let i = 0; i < candles1m.length; i++) {
    bloco.push(candles1m[i]);
    if (bloco.length === minutosPorCandle) {
      let open = bloco[0].y[0];
      let close = bloco[bloco.length-1].y[3];
      let high = Math.max(...bloco.map(c => c.y[1]));
      let low = Math.min(...bloco.map(c => c.y[2]));
      agrupados.push({
        x: bloco[0].x,
        y: [open.toFixed(2), high.toFixed(2), low.toFixed(2), close.toFixed(2)]
      });
      bloco = [];
    }
    if (agrupados.length === num) break;
  }
  return agrupados;
}

// Função principal para gerar candles fake agrupados
function gerarCandlesFake(ativo, intervalo='5m', num=30) {
  // Tabela de minutos por candle
  const tabela = {
    '1m': 1, '5m': 5, '15m': 15, '30m': 30, '1h': 60, '2h': 120, '1d': 1440
  };
  let minutos = tabela[intervalo] || 5;
  let totalMinutos = minutos * num;
  let base1m = gerarBase1m(ativo, totalMinutos + 10); // +10 para garantir
  return agruparCandles(base1m, minutos, num);
}

let chartApex;
function renderizarGrafico(ativo, intervalo='5m') {
  // Gráfico de candles com visual profissional aprimorado
  const candles = gerarCandlesFake(ativo, intervalo);
  // Volume fake proporcional ao candle
  const volumes = candles.map((c, i) => ({
    x: c.x,
    y: Math.floor(1200 + Math.random() * 800 + Math.abs(c.y[3] - c.y[0]) * 300)
  }));
  const options = {

    chart: {
      type: 'candlestick',
      height: 440,
      background: '#181a1f',
      borderColor: '#23272f',
      strokeDashArray: 5,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    },
    title: {
      text: `Análise Técnica - ${ativo}`,
      align: 'left',
      style: { color: '#00ffa3', fontWeight: 700, fontSize: '1.35rem', fontFamily: 'inherit' }
    },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#bdbdbd', fontSize: '13px', fontFamily: 'inherit' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    tooltip: {
      enabled: true,
      shared: true,
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        const candle = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        if (!candle) return '';
        return `<div style='padding:10px 14px;background:#23272f;color:#fff;border-radius:10px;font-size:1.08em;'>`
          + `<b>${new Date(candle.x).toLocaleString()}</b><br>`
          + `Abertura: <b style='color:#61ffb3'>${candle.y[0]}</b><br>`
          + `Máxima: <b style='color:#00ffa3'>${candle.y[1]}</b><br>`
          + `Mínima: <b style='color:#ff4d4d'>${candle.y[2]}</b><br>`
          + `Fechamento: <b style='color:${candle.y[3] > candle.y[0] ? '#00ff7f' : '#ff4d4d'}'>${candle.y[3]}</b>`
          + `</div>`;
      }
    },
    series: [
      {
        name: 'Candlestick',
        type: 'candlestick',
        data: candles,
        color: '#bdbdbd',
        upColor: '#00ff7f',
        downColor: '#ff4d4d',
        wick: { useFillColor: true }
      },
      {
        name: 'Volume',
        type: 'bar',
        data: volumes,
        color: '#00ffa3',
        opacity: 0.45,
        yAxisIndex: 1,
        barWidth: '70%'
      }
    ],
    theme: { mode: 'dark' },
    responsive: [{
      breakpoint: 900,
      options: {
        chart: { height: 280 },
        title: { style: { fontSize: '1rem' } }
      }
    }],
    annotations: { yaxis: [] },
    yaxis: [
      {
        tooltip: { enabled: true },
        labels: { style: { colors: '#bdbdbd', fontSize: '13px', fontFamily: 'inherit' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
        title: { text: 'Preço', style: { color: '#bdbdbd', fontWeight: 600 } },
        height: '70%',
      },
      {
        show: true,
        labels: { style: { colors: '#00ffa3', fontSize: '12px', fontFamily: 'inherit' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
        title: { text: 'Volume', style: { color: '#00ffa3', fontWeight: 600 } },
        top: '72%',
        height: '28%',
        offsetY: 0
      }
    ]
  };
  if (!chartApex) {
    chartApex = new ApexCharts(document.querySelector("#chart"), options);
    chartApex.render();
  } else {
    chartApex.updateOptions({
      title: { text: `Análise Técnica - ${ativo}` },
      series: [
        {
          name: 'Candlestick',
          type: 'candlestick',
          data: candles,
          color: '#bdbdbd',
          upColor: '#00ff7f',
          downColor: '#ff4d4d',
          wick: { useFillColor: true }
        },
        {
          name: 'Volume',
          type: 'bar',
          data: volumes,
          color: '#00ffa3',
          opacity: 0.45,
          yAxisIndex: 1,
          barWidth: '70%'
        }
      ]
    });
  }
}


// Atualiza gráfico ao trocar ativo OU timeframe
function atualizarGraficoAtivo() {
  const ativo = document.getElementById('selectAtivoGrafico').value;
  const tfValue = document.querySelector('#timeframeDropdownList li.selected')?.dataset.value || '5m';
  renderizarGrafico(ativo, tfValue);
}

function popularSelectGrafico() {
  const select = document.getElementById('selectAtivoGrafico');
  select.innerHTML = '';
  ativosDisponiveis.forEach(a => {
    const option = document.createElement('option');
    option.value = a;
    option.textContent = a;
    select.appendChild(option);
  });
}

function clonarBoletaParaGrafico() {
  // Cria uma boleta completa apenas com os ativos do gráfico
  const container = document.getElementById('boletaGraficoContainer');
  if (!container) return;
  container.innerHTML = '';
  // Cria o formulário da boleta
  const form = document.createElement('div');
  form.className = 'card card-boleta';
  form.innerHTML = `
    <h3>Boleta de Ofertas (Gráfico)</h3>
    <label for="quantidadeGrafico">Quantidade</label>
    <input type="number" id="quantidadeGrafico" min="100" step="100" value="100" style="width:100%; padding:12px 10px; border-radius:12px; border:1.5px solid #232a3d; background:#232a3d; color:#fff; font-size:1.05rem; margin-bottom:12px; outline:none; transition: border 0.2s;" onfocus="this.style.borderColor='#00ffa3'" onblur="this.style.borderColor='#232a3d'">
    <label for="valorGrafico">Valor</label>
    <input type="number" id="valorGrafico" min="0.01" step="0.01" value="0.01" style="width:100%; padding:12px 10px; border-radius:12px; border:1.5px solid #232a3d; background:#232a3d; color:#fff; font-size:1.05rem; margin-bottom:12px; outline:none; transition: border 0.2s;" onfocus="this.style.borderColor='#00ffa3'" onblur="this.style.borderColor='#232a3d'">
    <div class="boleta-botoes">
      <button id="btnCompraGrafico" class="btn-compra" type="button">Comprar</button>
      <button id="btnVendaGrafico" class="btn-venda" type="button">Vender</button>
    </div>
    <div id="mensagemGrafico" class="mensagem"></div>
  `;
  container.appendChild(form);
  // Atualiza valor ao trocar ativo no selectAtivoGrafico
  const selectGrafico = document.getElementById('selectAtivoGrafico');
  if (selectGrafico) {
    // Atualiza valor da boleta ao trocar ativo no gráfico
    const atualizarValorBoleta = function() {
      const ativoObj = ativos.find(at => at.nome === selectGrafico.value);
      if (ativoObj) {
        const valorInput = form.querySelector('#valorGrafico');
        if (valorInput) valorInput.value = ativoObj.preco.toFixed(2);
      }
    };
    selectGrafico.addEventListener('change', atualizarValorBoleta);
    // Atualiza também ao abrir a boleta
    atualizarValorBoleta();
  }
  // Botões de compra e venda
  form.querySelector('#btnCompraGrafico').onclick = function() {
    executarOperacaoGrafico('Compra');
  };
  form.querySelector('#btnVendaGrafico').onclick = function() {
    executarOperacaoGrafico('Venda');
  };
}

// Função para executar operação a partir da boleta do gráfico
function executarOperacaoGrafico(tipo) {
  const form = document.querySelector('.card-boleta');
  const qtdInput = form ? form.querySelector('#quantidadeGrafico') : null;
  const valorInput = form ? form.querySelector('#valorGrafico') : null;
  const msg = form ? form.querySelector('#mensagemGrafico') : null;
  if (!form) {
    alert('Erro interno: formulário da boleta não encontrado.');
    return;
  }
  if (!qtdInput || !valorInput || !msg) {
    let erro = 'Erro interno: campos da boleta não encontrados.\n';
    erro += 'Quantidade: ' + (!!qtdInput) + '\n';
    erro += 'Valor: ' + (!!valorInput) + '\n';
    erro += 'Mensagem: ' + (!!msg);
    if (msg) msg.textContent = erro;
    else alert(erro);
    return;
  }
  // Usa o ativo selecionado no gráfico
  // Busca o ativo do dropdown customizado
  let ativo = document.querySelector('#ativoDropdownList li.selected')?.dataset.value;
  if (!ativo) {
    ativo = document.getElementById('selectedAtivoLabel')?.textContent?.trim();
  }
  const qtd = qtdInput && qtdInput.value ? parseInt(qtdInput.value) : NaN;
  const valor = valorInput && valorInput.value ? parseFloat(valorInput.value) : NaN;
  if (!ativo) {
    msg.textContent = "Selecione o ativo acima do gráfico.";
    return;
  }
  if (isNaN(qtd) || qtd <= 0) {
    msg.textContent = "Informe a quantidade (mínimo 100, múltiplos de 100).";
    return;
  }
  if (qtd < 100 || qtd % 100 !== 0) {
    msg.textContent = "A quantidade deve ser no mínimo 100 e em lotes de 100.";
    return;
  }
  if (isNaN(valor) || valor <= 0) {
    msg.textContent = "Informe o valor por lote (R$).";
    return;
  }
  const cotacao = ativos.find(a => a.nome === ativo)?.preco || 0;
  const total = qtd * valor;
  const diferenca = Math.abs(valor - cotacao);
  let status = "";
  if (diferenca > 5) {
    status = "Rejeitado";
    msg.textContent = "Ordem rejeitada. Diferença superior a R$5 da cotação.";
  } else if (diferenca === 0) {
    status = "Executado";
  } else {
    status = "Aceito";
  }
  if (tipo === "Compra") {
    if (usuarioLogado.saldo < total) {
      msg.textContent = "Saldo insuficiente.";
      msg.style.display = 'block';
      return;
    }
    if (status === "Executado") {
      usuarioLogado.saldo -= total;
      usuarioLogado.carteira[ativo] = (usuarioLogado.carteira[ativo] || 0) + qtd;
      usuarioLogado.extrato.push({ tipo, ativo, qtd, valor, dataHora: new Date().toISOString() });
      const objAtivo = ativos.find(a => a.nome === ativo);
      if (objAtivo) {
        objAtivo.preco = valor;
        objAtivo.historico.push(valor);
        if (objAtivo.historico.length > 20) objAtivo.historico.shift();
      }
      atualizarBook();
      msg.textContent = "Ordem executada com sucesso!";
      msg.style.display = 'block';
    } else {
      msg.textContent = (status === "Aceito")
        ? "Ordem aceita e aguardando execução."
        : msg.textContent;
      msg.style.display = 'block';
    }
  } else {
    if (!usuarioLogado.carteira[ativo] || usuarioLogado.carteira[ativo] < qtd) {
      msg.textContent = "Quantidade insuficiente na carteira.";
      msg.style.display = 'block';
      return;
    }
    if (status === "Executado") {
      usuarioLogado.carteira[ativo] -= qtd;
      usuarioLogado.saldo += total;
      usuarioLogado.extrato.push({ tipo, ativo, qtd, valor, dataHora: new Date().toISOString() });
      const objAtivo = ativos.find(a => a.nome === ativo);
      if (objAtivo) {
        objAtivo.preco = valor;
        objAtivo.historico.push(valor);
        if (objAtivo.historico.length > 20) objAtivo.historico.shift();
      }
      atualizarBook();
      msg.textContent = "Ordem executada com sucesso!";
      msg.style.display = 'block';
    } else {
      msg.textContent = (status === "Aceito")
        ? "Ordem aceita e aguardando execução."
        : msg.textContent;
      msg.style.display = 'block';
    }
  }
  usuarioLogado.ordens.push({
    tipo,
    ativo,
    qtd,
    valor,
    cotacao,
    status
  });
  atualizarCarteira && atualizarCarteira();
  atualizarExtrato && atualizarExtrato();
  atualizarOrdens && atualizarOrdens();
  // Atualiza saldo visual em todos os blocos após execução de operação
  var saldoAntigo = document.getElementById("saldo");
  if (saldoAntigo) saldoAntigo.textContent = usuarioLogado.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  var saldoBloco = document.getElementById("saldoBloco");
  if (saldoBloco) {
    const saldoFormatado = usuarioLogado.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    saldoBloco.innerHTML = `
      <span class="label">Saldo</span>
      <span class="valor">${saldoFormatado}</span>
    `;
  }
  atualizarLocalStorageUsuario && atualizarLocalStorageUsuario();
}

// Inicialização da aba gráfico
document.addEventListener('DOMContentLoaded', () => {
  popularSelectGrafico();
  renderizarGrafico(ativosDisponiveis[0]);
  clonarBoletaParaGrafico();
});

// Atualiza boleta ao trocar de aba
const tabGraficoElem = document.getElementById('tabGrafico');
if (tabGraficoElem) {
  tabGraficoElem.addEventListener('click', () => {
    clonarBoletaParaGrafico();
    atualizarGraficoAtivo();
  });
}
// ========== ATUALIZAÇÕES ==========
function atualizarCarteira() {
  const corpo = document.querySelector("#carteira tbody");
  corpo.innerHTML = "";
  corpo.innerHTML = '';
  let cores = ['#00ffa3','#00cfff','#a3a3ff','#7fffd4','#b2f7ef','#b2b2ff','#c3f7a3','#f7c3a3'];
  let i = 0;
  for (let ativo in usuarioLogado.carteira) {
    const qtd = usuarioLogado.carteira[ativo];
    const objAtivo = ativos.find(a => a.nome === ativo);
    const precoAtual = objAtivo?.preco || 0;
    let precoMedio = precoAtual * 0.95;
    let valorTotal = qtd * precoAtual;
    let lucroPrejuizo = (precoAtual - precoMedio) * qtd;
    let classeLucro = lucroPrejuizo >= 0 ? 'saldo-up' : 'saldo-down';
    let variacaoPercentual = ((precoAtual - precoMedio) / precoMedio) * 100;
    let classeVar = variacaoPercentual >= 0 ? 'saldo-up' : 'saldo-down';
    let historico = objAtivo?.historico || [precoAtual];
    let svg = gerarSparkline(historico);
    let cor = cores[i % cores.length];
    const card = document.createElement('tr');
    card.innerHTML = `
      <td style="padding:0;border:none;">
        <img src="img/${ativo}.png" alt="${ativo}" class="logo-ativo" style="width:32px; height:32px; border-radius:50%; box-shadow:0 0 8px #00ffa3; background:#181c2f;">
      </td>
      <td colspan="6" style="padding:0;border:none;">
        <div style="display:flex;align-items:center;gap:18px;background:${cor};border-radius:14px;padding:14px 18px;box-shadow:0 2px 12px #0002;margin-bottom:8px;">
          <span style="font-weight:bold;font-size:1.1em;color:#181c2f;min-width:80px;">${ativo} ${svg}</span>
          <span style="color:#181c2f;">Qtd: <b>${qtd}</b></span>
          <span style="color:#181c2f;">PM: <b>R$ ${precoMedio.toFixed(2)}</b></span>
          <span style="color:#181c2f;">Total: <b>R$ ${valorTotal.toFixed(2)}</b></span>
          <span class="${classeLucro}" style="color:#181c2f;">${lucroPrejuizo >= 0 ? '✔️ +' : '❌ -'}R$ ${Math.abs(lucroPrejuizo).toFixed(2)}</span>
          <span class="${classeVar}" style="color:#181c2f;">${variacaoPercentual >= 0 ? '▲ +' : '▼ -'}${Math.abs(variacaoPercentual).toFixed(2)}%</span>
        </div>
      </td>
    `;
    corpo.appendChild(card);
    i++;
  }
}

// Função para gerar sparkline SVG

// Função para gerar sparkline SVG (gráfico de linhas pequeno)
function gerarSparkline(data) {
  if (!data || data.length < 2) return '';
  const w = 60, h = 20;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  return `<svg width="${w}" height="${h}" style="vertical-align:middle"><polyline points="${points}" fill="none" stroke="#00ffa3" stroke-width="2"/></svg>`;
}

function atualizarBook() {
  const corpo = document.querySelector("#book tbody");
  corpo.innerHTML = "";
  ativos.forEach(a => {
    const precoAnterior = parseFloat(localStorage.getItem(`precoAnterior_${a.nome}`)) || a.preco;
    const variacao = a.preco - precoAnterior;
    const variacaoPercentual = precoAnterior ? ((a.preco - precoAnterior) / precoAnterior) * 100 : 0;
    // Cores para efeito piscante
    let corFundoCotacao = '#222';
    let corFundoVar = '#222';
    if (variacao > 0) {
      corFundoCotacao = '#1e4023'; // verde escuro
      corFundoVar = '#1e4023';
    } else if (variacao < 0) {
      corFundoCotacao = '#4a1e1e'; // vermelho escuro
      corFundoVar = '#4a1e1e';
    } else {
      corFundoCotacao = '#333'; // cinza
      corFundoVar = '#333';
    }
    const classe = variacao > 0 ? "alta" : variacao < 0 ? "baixa" : "neutra";
    const classeVar = variacaoPercentual > 0 ? "alta" : variacaoPercentual < 0 ? "baixa" : "neutra";
    const tr = document.createElement('tr');
    // Adiciona o ícone redondo ao lado do nome do ativo
    const icone = iconesAtivos[a.nome] || iconePadrao;
    tr.innerHTML = `
      <td class="book-ativo" style="cursor:pointer;display:flex;align-items:center;gap:8px;">
        <img src="${icone}" alt="${a.nome}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;background:#fff;box-shadow:0 0 2px #0002;"> ${a.nome}
      </td>
      <td class="book-preco ${classe}">${a.preco.toFixed(2)}</td>
      <td class="book-variacao ${classeVar}">${variacaoPercentual >= 0 ? '+' : ''}${variacaoPercentual.toFixed(2)}%</td>
    `;
    // Efeito piscante nas células de cotação e variação
    setTimeout(() => {
      const precoTd = tr.querySelector('.book-preco');
      const varTd = tr.querySelector('.book-variacao');
      if (precoTd) {
        precoTd.style.transition = 'background 0.2s';
        precoTd.style.background = corFundoCotacao;
      }
      if (varTd) {
        varTd.style.transition = 'background 0.2s';
        varTd.style.background = corFundoVar;
      }
      setTimeout(() => {
        if (precoTd) precoTd.style.background = '';
        if (varTd) varTd.style.background = '';
      }, 200);
    }, 10);
    tr.addEventListener('click', function(e) {
      document.getElementById('ativo').value = a.nome;
      document.getElementById('valor').value = a.preco.toFixed(2);
    });
    corpo.appendChild(tr);
  });
}

function atualizarSelectAtivos() {
  const select = document.getElementById("ativo");
  const valorInput = document.getElementById("valor");
  const tipoSelect = document.getElementById("tipo");
  if (!select) return;
  select.innerHTML = "";
  ativos.forEach(a => {
    const option = document.createElement("option");
    option.value = a.nome;
    option.textContent = a.nome;
    select.appendChild(option);
  });

  // Atualiza o valor da boleta ao selecionar um ativo
  select.addEventListener('change', function() {
    const ativoObj = ativos.find(a => a.nome === select.value);
    if (ativoObj && valorInput) valorInput.value = ativoObj.preco.toFixed(2);
  });

  // Preenche o valor ao carregar o select (primeiro ativo)
  if (ativos.length > 0 && valorInput) {
    valorInput.value = ativos[0].preco.toFixed(2);
  }

  // Garante que o select e valor sejam atualizados ao clicar no book
  document.querySelectorAll('#book tbody .book-ativo').forEach(td => {
    td.onclick = function() {
      select.value = td.textContent;
      const ativoObj = ativos.find(at => at.nome === td.textContent);
      if (ativoObj && valorInput) valorInput.value = ativoObj.preco.toFixed(2);
      if (tipoSelect) tipoSelect.value = "Compra";
    };
  });
}

function atualizarExtrato() {
  const corpo = document.querySelector("#extrato tbody");
  corpo.innerHTML = "";
  usuarioLogado.extrato.forEach(e => {
    // Data/Hora: formato dd/mm/yyyy, hh:mm:ss, fuso horário Brasília (UTC-3)
    let dataObj;
    if (e.dataHora) {
      // Se já está em string, tenta converter para Date
      dataObj = new Date(e.dataHora);
      if (isNaN(dataObj.getTime())) {
        // Se não for válida, usa a string como está
        dataObj = null;
      }
    } else {
      dataObj = new Date();
    }
    let dataHora;
    if (dataObj) {
      // Ajusta para UTC-3 (Brasília)
      const utc = dataObj.getTime() + (dataObj.getTimezoneOffset() * 60000);
      const brasilia = new Date(utc - (3 * 60 * 60 * 1000));
      const pad = n => n.toString().padStart(2, '0');
      dataHora = `${pad(brasilia.getDate())}/${pad(brasilia.getMonth()+1)}/${brasilia.getFullYear()}, ${pad(brasilia.getHours())}:${pad(brasilia.getMinutes())}:${pad(brasilia.getSeconds())}`;
    } else {
      dataHora = e.dataHora || '';
    }
    const tipo = e.tipo || '';
    const ativo = e.ativo || '';
    const qtd = e.qtd || 0;
    const precoUnit = e.valor ? e.valor.toFixed(2) : '';
    const total = e.qtd && e.valor ? (e.qtd * e.valor).toFixed(2) : '';
    const taxas = e.taxas !== undefined ? e.taxas.toFixed(2) : '5.40'; // Exemplo fixo
    const lp = e.lp !== undefined ? e.lp : '—';
    const status = e.status || 'OK';
    let statusIcon = '';
    if (status === 'Executado' || status === 'OK') statusIcon = '✔️';
    else if (status === 'Cancelada' || status === 'Cancelado') statusIcon = '❌';
    else if (status === 'Aceito') statusIcon = '⏳';
    else if (status === 'Rejeitado') statusIcon = '🚫';
    else statusIcon = '';
    const tr = `<tr>
      <td>${dataHora}</td>
      <td>${tipo}</td>
      <td>${ativo}</td>
      <td>${qtd}</td>
      <td>${precoUnit}</td>
      <td>${total}</td>
      <td>${taxas}</td>
      <td>${lp}</td>
      <td>${statusIcon} ${status}</td>
    </tr>`;
    corpo.innerHTML += tr;
  });
}

function atualizarOrdens() {
  const corpo = document.querySelector("#ordens tbody");
  corpo.innerHTML = "";
  usuarioLogado.ordens.forEach((o, i) => {
    let bg = '';
    let statusIcon = '';
    let color = '#e6e6e6';
    if (o.status === 'Executado') {
      bg = 'background:linear-gradient(90deg,#232a3d 80%,#181c2f 100%);';
      statusIcon = '✔️';
      color = '#00ffa3';
    } else if (o.status === 'Aceito') {
      bg = 'background:linear-gradient(90deg,#232a3d 80%,#181c2f 100%);';
      statusIcon = '⏳';
      color = '#ffe066';
    } else if (o.status === 'Cancelada' || o.status === 'Cancelado') {
      bg = 'background:linear-gradient(90deg,#2a232d 80%,#3d232a 100%);';
      statusIcon = '❌';
      color = '#ff4d4d';
    } else if (o.status === 'Rejeitado') {
      bg = 'background:linear-gradient(90deg,#2a232d 80%,#3d232a 100%);';
      statusIcon = '🚫';
      color = '#ff4d4d';
    } else {
      bg = 'background:linear-gradient(90deg,#232a3d 80%,#181c2f 100%);';
      statusIcon = '';
      color = '#e6e6e6';
    }
    const tr = `<tr style="${bg}border-radius:8px;box-shadow:0 1px 6px #0002;">
      <td style="color:${color};font-weight:bold;">${o.tipo}</td>
      <td style="color:${color};">${o.ativo}</td>
      <td style="color:${color};">${o.qtd}</td>
      <td style="color:${color};">${o.valor.toFixed(2)}</td>
      <td style="color:${color};">${o.cotacao.toFixed(2)}</td>
      <td style="color:${color};font-weight:bold;">${statusIcon} ${o.status}</td>
      <td>${o.status === 'Aceito' ? `<button onclick="cancelarOrdem(${i})" style="background:#ff4d4d;color:#fff;border:none;border-radius:6px;padding:4px 12px;box-shadow:0 1px 4px #ff4d4d22;">Cancelar</button>` : ''}</td>
    </tr>`;
    corpo.innerHTML += tr;
  });
}

// ========== OPERAÇÕES ==========
function executarOperacao() {
  const tipo = arguments[0] || 'Compra';
  const ativoInput = document.getElementById("ativo");
  const qtdInput = document.getElementById("quantidade");
  const valorInput = document.getElementById("valor");
  const msg = document.getElementById("mensagem");
  // Limpa mensagens anteriores
  msg.textContent = "";
  // Remove classes de erro
  [ativoInput, qtdInput, valorInput].forEach(i => i && i.classList.remove('input-erro'));

  const ativo = ativoInput ? ativoInput.value : '';
  const qtd = qtdInput ? parseInt(qtdInput.value) : NaN;
  const valor = valorInput ? parseFloat(valorInput.value) : NaN;

  // Validação: campos obrigatórios
  if (!ativo) {
    msg.textContent = "Selecione o ativo.";
    if (ativoInput) ativoInput.classList.add('input-erro');
    return;
  }
  if (isNaN(qtd) || qtd <= 0) {
    msg.textContent = "Informe a quantidade (mínimo 100, múltiplos de 100).";
    if (qtdInput) qtdInput.classList.add('input-erro');
    return;
  }
  if (qtd < 100 || qtd % 100 !== 0) {
    msg.textContent = "Quantidade deve ser no mínimo 100 e em lotes de 100.";
    if (qtdInput) qtdInput.classList.add('input-erro');
    return;
  }
  if (isNaN(valor) || valor <= 0) {
    msg.textContent = "Informe o valor por lote (R$).";
    if (valorInput) valorInput.classList.add('input-erro');
    return;
  }

  const cotacao = ativos.find(a => a.nome === ativo)?.preco || 0;
  const total = qtd * valor;
  const diferenca = Math.abs(valor - cotacao);
  let status = "";

  // Validação: diferença de preço
  if (valor === cotacao) {
    status = "Executado";
  } else if (diferenca <= 5) {
    status = "Aceito";
  } else {
    status = "Rejeitado";
    msg.textContent = "Ordem rejeitada. Diferença superior a R$5 da cotação.";
    usuarioLogado.ordens.push({ tipo, ativo, qtd, valor, cotacao, status });
    atualizarOrdens();
    atualizarLocalStorageUsuario();
    // Limpa campos
    qtdInput.value = '';
    valorInput.value = '';
    return;
  }

  if (tipo === "Compra") {
    // Validação: saldo suficiente
    if (usuarioLogado.saldo < total) {
      msg.textContent = "Saldo insuficiente para realizar a compra.";
      status = "Rejeitado";
      usuarioLogado.ordens.push({ tipo, ativo, qtd, valor, cotacao, status });
      atualizarOrdens();
      atualizarLocalStorageUsuario();
      qtdInput.value = '';
      valorInput.value = '';
      return;
    }
    if (status === "Executado") {
      usuarioLogado.saldo -= total;
      usuarioLogado.carteira[ativo] = (usuarioLogado.carteira[ativo] || 0) + qtd;
      usuarioLogado.extrato.push({ tipo, ativo, qtd, valor, dataHora: new Date().toISOString() });
      const objAtivo = ativos.find(a => a.nome === ativo);
      if (objAtivo) {
        objAtivo.preco = valor;
        objAtivo.historico.push(valor);
        if (objAtivo.historico.length > 20) objAtivo.historico.shift();
      }
      atualizarBook();
      msg.textContent = "Ordem executada com sucesso!";
    } else if (status === "Aceito") {
      msg.textContent = "Ordem aceita e aguardando execução.";
    }
  } else { // Venda
    // Validação: ativos suficientes na carteira
    if (!usuarioLogado.carteira[ativo] || usuarioLogado.carteira[ativo] < qtd) {
      msg.textContent = "Quantidade insuficiente na carteira para realizar a venda.";
      status = "Rejeitado";
      usuarioLogado.ordens.push({ tipo, ativo, qtd, valor, cotacao, status });
      atualizarOrdens();
      atualizarLocalStorageUsuario();
      qtdInput.value = '';
      valorInput.value = '';
      return;
    }
    if (status === "Executado") {
      usuarioLogado.carteira[ativo] -= qtd;
      if (usuarioLogado.carteira[ativo] <= 0) {
        delete usuarioLogado.carteira[ativo]; // Remove o ativo se zerar
      }
      usuarioLogado.saldo += total;
      usuarioLogado.extrato.push({ tipo, ativo, qtd, valor, dataHora: new Date().toISOString() });
      const objAtivo = ativos.find(a => a.nome === ativo);
      if (objAtivo) {
        objAtivo.preco = valor;
        objAtivo.historico.push(valor);
        if (objAtivo.historico.length > 20) objAtivo.historico.shift();
      }
      atualizarBook();
      msg.textContent = "Ordem executada com sucesso!";
    } else if (status === "Aceito") {
      msg.textContent = "Ordem aceita e aguardando execução.";
    }
  }

  usuarioLogado.ordens.push({ tipo, ativo, qtd, valor, cotacao, status });
  atualizarCarteira();
  atualizarExtrato();
  atualizarOrdens();
  // Atualiza saldo visual em todos os blocos após execução de operação
  var saldoAntigo = document.getElementById("saldo");
  if (saldoAntigo) saldoAntigo.textContent = usuarioLogado.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  var saldoBloco = document.getElementById("saldoBloco");
  if (saldoBloco) {
    const saldoFormatado = usuarioLogado.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    saldoBloco.innerHTML = `
      <span class="label">Saldo</span>
      <span class="valor">${saldoFormatado}</span>
    `;
  }
  atualizarLocalStorageUsuario();
  // Limpa campos após sucesso
  qtdInput.value = '';
  valorInput.value = '';
}

function cancelarOrdem(index) {
  const ordem = usuarioLogado.ordens[index];
  const msg = document.getElementById("mensagem");
  if (ordem.status === "Aceito") {
    ordem.status = "Cancelada";
    atualizarOrdens();
    atualizarLocalStorageUsuario();
    msg.textContent = "Ordem cancelada com sucesso!";
  } else {
    msg.textContent = "Só é possível cancelar ordens com status 'Aceito'.";
  }
}

// ========== ESQUECI SENHA ==========
function esqueciSenha() {
  let cpf = prompt("Digite o CPF cadastrado:");
  if (!cpf) {
    alert("CPF inválido.");
    return;
  }
  cpf = cpf.replace(/[^\d]/g, ''); // limpar o CPF

  const usuario = usuarios.find(u => u.cpf === cpf);

  if (!usuario) {
    alert("CPF não encontrado.");
    return;
  }

  const novaSenha = prompt("Digite a nova senha:");
  if (!novaSenha) {
    alert("Por favor, digite a nova senha.");
    return;
  }
  if (!validarSenhaForte(novaSenha)) {
    alert(MSG_SENHA_FORTE);
    return;
  }
  usuario.senha = novaSenha;
  salvarUsuarios();
  alert("Senha redefinida com sucesso! Agora você pode fazer login com a nova senha.");
}


// ========== TRANSFERÊNCIAS ==========

function mostrarTransferencia() {
  document.getElementById('portal').classList.add('hidden');
  document.getElementById('transferSection').classList.remove('hidden');
  // Loader removido - não existe mais no HTML
  listarAgendamentos();
  // Aplica padrão visual aos botões de transferência
  setTimeout(function() {
    var btnTransferir = document.querySelector('#transferSection button[onclick*="realizarTransferencia"]');
    if (btnTransferir) {
      btnTransferir.style.background = 'linear-gradient(90deg,#00ffa3 60%,#00c97a 100%)';
      btnTransferir.style.color = '#181c2f';
      btnTransferir.style.fontWeight = 'bold';
      btnTransferir.style.borderRadius = '10px';
      btnTransferir.style.boxShadow = '0 2px 12px #00ffa344';
      btnTransferir.style.border = 'none';
      btnTransferir.style.padding = '16px 0';
      btnTransferir.style.fontSize = '1.15rem';
      btnTransferir.onmouseover = function() {
        btnTransferir.style.filter = 'brightness(1.15) drop-shadow(0 0 8px #00ffa3)';
      };
      btnTransferir.onmouseout = function() {
        btnTransferir.style.filter = 'none';
      };
    }
    document.querySelectorAll('#transferSection button').forEach(function(btn) {
      if (btn.textContent.includes('Cancelar')) {
        btn.style.background = 'linear-gradient(90deg,#ff4d4d 60%,#c90000 100%)';
        btn.style.color = '#fff';
        btn.style.fontWeight = 'bold';
        btn.style.borderRadius = '10px';
        btn.style.boxShadow = '0 2px 12px #ff4d4d44';
        btn.style.border = 'none';
        btn.style.padding = '8px 18px';
        btn.style.fontSize = '1rem';
        btn.onmouseover = function() {
          btn.style.filter = 'brightness(1.1) drop-shadow(0 0 8px #ff4d4d)';
        };
        btn.onmouseout = function() {
          btn.style.filter = 'none';
        };
      }
    });
  }, 100);
}

function voltarPortal() {
  // Esconde transferSection e graficoSection (caso estejam visíveis)
  var transferSection = document.getElementById('transferSection');
  if (transferSection) transferSection.classList.add('hidden');
  var graficoSection = document.getElementById('graficoSection');
  if (graficoSection) graficoSection.classList.add('hidden');
  // Volta direto ao dashboard - sem loader
  document.getElementById('portal').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
  var agendar = document.getElementById('agendar');
  if (agendar) {
    agendar.addEventListener('change', function(){
      document.getElementById('agendamentoCampos').classList.toggle('hidden', !this.checked);
    });
  }
  var btnTransferir = document.querySelector('#transferSection button[onclick*="realizarTransferencia"]');
  if (btnTransferir) {
    btnTransferir.onclick = realizarTransferencia;
  }
});

// Função para validar dados da transferência
function validarTransferencia(banco, agencia, conta, cidade, estado) {
  if (!banco || banco.trim().length < 3) return 'Informe um banco válido.';
  if (!/^\d{3,5}$/.test(agencia)) return 'Agência inválida.';
  if (!/^\d{4,10}(-\d+)?$/.test(conta)) return 'Conta inválida.'; // regex atualizada
  if (!cidade || cidade.trim().length < 2) return 'Cidade inválida.';
  if (!estado || !/^[A-Z]{2}$/.test(estado)) return 'Estado inválido (use sigla, ex: SP).';
  return null;
}

function realizarTransferencia() {
  const banco = document.getElementById('banco').value.trim();
  const agencia = document.getElementById('agencia').value.trim();
  const conta = document.getElementById('contaDestino').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const estado = document.getElementById('estado').value.trim().toUpperCase();
  const valor = parseFloat(document.getElementById('valorTransferencia').value);
  const agendar = document.getElementById('agendar').checked;
  const dataHora = agendar ? document.getElementById('dataHora').value : '';
  const repetir = agendar ? document.getElementById('repetirMes').value : 'nao';
  const msg = document.getElementById('transferMsg');
  // var loaderDiv = document.getElementById('loader'); // Elemento removido
  msg.textContent = '';

  // Validação dos campos obrigatórios
  const erro = validarTransferencia(banco, agencia, conta, cidade, estado);
  if (erro) {
    msg.textContent = erro;
    alert(erro);
    return;
  }
  if (isNaN(valor) || valor <= 0) {
    msg.textContent = 'Informe um valor válido para transferência.';
    alert('Informe um valor válido para transferência.');
    return;
  }
  if (!usuarioLogado) {
    msg.textContent = 'Faça login para realizar transferências.';
    alert('Faça login para realizar transferências.');
    return;
  }
  if (usuarioLogado.saldo < valor) {
    msg.textContent = 'Saldo insuficiente.';
    alert('Saldo insuficiente.');
    return;
  }

  if (agendar && !dataHora) {
    msg.textContent = 'Informe a data e hora do agendamento.';
    alert('Informe a data e hora do agendamento.');
    return;
  }

  // if (loaderDiv) loaderDiv.classList.remove('hidden'); // Elemento removido
  setTimeout(() => {
    if (agendar) {
      // Agendamento
      agendamentos.push({
        banco,
        agencia,
        conta,
        cidade,
        estado,
        valor,
        dataHora,
        repetir,
        status: 'Pendente'
      });
      salvarAgendamentos();
      listarAgendamentos();
      msg.textContent = '✅ Transferência agendada com sucesso!';
      alert('Transferência agendada com sucesso!');
    } else {
      // Transferência imediata
      usuarioLogado.saldo -= valor;
      atualizarLocalStorageUsuario();
      var saldoBloco = document.getElementById('saldoBloco');
      if (saldoBloco) {
        const saldoFormatado = usuarioLogado.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        saldoBloco.innerHTML = `<span class="label">Saldo</span><span class="valor">${saldoFormatado}</span>`;
      }
      msg.textContent = '✅ Transferência realizada com sucesso!';
      alert('Transferência realizada com sucesso!');
    }
    // if (loaderDiv) loaderDiv.classList.add('hidden'); // Elemento removido
  }, 1500);
}

function listarAgendamentos() {
  const corpo = document.querySelector('#tabelaAgendamentos tbody');
  corpo.innerHTML = "";
  agendamentos.forEach((ag, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${ag.banco || '-'}</td>
      <td>${ag.agencia || '-'}</td>
      <td>${ag.conta || '-'}</td>
      <td>${ag.cidade || '-'}</td>
      <td>${ag.estado || '-'}</td>
      <td>R$ ${ag.valor ? ag.valor.toFixed(2) : '-'}</td>
      <td>${ag.dataHora || '-'}</td>
      <td>${ag.repetir || '-'}</td>
      <td>${ag.status}</td>
      <td>${ag.status === 'Pendente' ? `<button onclick="cancelarAgendamento(${i})">Cancelar</button>` : ''}</td>
    `;
    corpo.appendChild(tr);
  });
}

function cancelarAgendamento(i) {
  if (agendamentos[i].status === 'Pendente') {
    agendamentos[i].status = 'Cancelado';
    salvarAgendamentos();
    listarAgendamentos();
  }
}

function salvarAgendamentos() {
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}

// ========== ATUALIZAÇÃO DE BOOK AO VIVO ========== 

let intervaloAtualizacao = null;
function iniciarAtualizacaoPeriodica() {
  if (intervaloAtualizacao) clearInterval(intervaloAtualizacao);
  intervaloAtualizacao = setInterval(() => {
    if (!usuarioLogado || document.getElementById('portal').classList.contains('hidden')) return;
    ativos.forEach(ativo => {
      // Salva o preço anterior ANTES de atualizar
      const precoAnterior = ativo.preco;
      // Variação de R$0,01 para cima ou para baixo
      const direcao = Math.random() < 0.5 ? -1 : 1;
      let novoPreco = precoAnterior + (0.01 * direcao);
      if (novoPreco < 1) novoPreco = 1;
      ativo.preco = parseFloat(novoPreco.toFixed(2));
      // Atualiza histórico
      if (!Array.isArray(ativo.historico)) ativo.historico = [precoAnterior];
      ativo.historico.push(ativo.preco);
      if (ativo.historico.length > 20) ativo.historico.shift();
      // Salva preço anterior para efeito de pisca
      localStorage.setItem(`precoAnterior_${ativo.nome}`, precoAnterior);
    });
    // Reavalia ordens Aceitas: se cotação igualar valor da ordem, executa
    if (usuarioLogado && usuarioLogado.ordens) {
      usuarioLogado.ordens.forEach((ordem, i) => {
        if (ordem.status === "Aceito") {
          const precoAtual = ativos.find(a => a.nome === ordem.ativo)?.preco;
          if (precoAtual && parseFloat(precoAtual) === ordem.valor) {
            if (ordem.tipo === "Compra") {
              const taxas = ordem.taxas !== undefined ? ordem.taxas : 5.40; // taxa padrão se não especificada
              const valorTotal = ordem.qtd * ordem.valor + taxas;
              if (usuarioLogado.saldo >= valorTotal) {
                usuarioLogado.saldo -= valorTotal;
                usuarioLogado.carteira[ordem.ativo] = (usuarioLogado.carteira[ordem.ativo] || 0) + ordem.qtd;
                usuarioLogado.extrato.push({ tipo: ordem.tipo, ativo: ordem.ativo, qtd: ordem.qtd, valor: ordem.valor, taxas: taxas, dataHora: new Date().toISOString() });
                ordem.status = "Executado";
              } else {
                ordem.status = "Rejeitado";
              }
            } else if (ordem.tipo === "Venda") {
              if (usuarioLogado.carteira[ordem.ativo] && usuarioLogado.carteira[ordem.ativo] >= ordem.qtd) {
                usuarioLogado.carteira[ordem.ativo] -= ordem.qtd;
                usuarioLogado.saldo += ordem.qtd * ordem.valor;
                usuarioLogado.extrato.push({ tipo: ordem.tipo, ativo: ordem.ativo, qtd: ordem.qtd, valor: ordem.valor, dataHora: new Date().toISOString() });
                ordem.status = "Executado";
              }
            }
          }
        }
      });
      atualizarLocalStorageUsuario();
      atualizarBook();
      atualizarCarteira();
      atualizarExtrato();
      atualizarOrdens();
      var saldoAntigo = document.getElementById("saldo");
      if (saldoAntigo) saldoAntigo.textContent = usuarioLogado.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      var saldoBloco = document.getElementById("saldoBloco");
      if (saldoBloco) {
        const saldoFormatado = usuarioLogado.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        saldoBloco.innerHTML = `
          <span class="label">Saldo</span>
          <span class="valor">${saldoFormatado}</span>
        `;
      }
    }
    atualizarBook();
    atualizarCarteira();
  }, 10000);
}

// Inicia atualização periódica ao mostrar o portal (login ou cadastro)
let atualizacaoJaIniciada = false;
const _mostrarPortalOriginal = mostrarPortal;
mostrarPortal = function() {
  _mostrarPortalOriginal.apply(this, arguments);
  if (!atualizacaoJaIniciada) {
    iniciarAtualizacaoPeriodica();
    atualizacaoJaIniciada = true;
  }
  atualizarBook();
  atualizarCarteira();
};

// ========== MAPA DE ÍCONES DOS ATIVOS ========== 
const iconesAtivos = {
  'BBAS3': 'img/BBAS3.png',
  'PETR4': 'img/PETR4.png',
  'VALE3': 'img/VALE3.png',
  'WEGE3': 'img/WEGE3.png',
  'EMBR3': 'img/EMBR3.png',
  'BBDC4': 'img/BBDC4.png',
  'BBSE3': 'img/BBSE3.png',
  'ITSA4': 'img/ITSA4.png',
  'MGLU3': 'img/MGLU3.png',
  'CXSE3': 'img/CXSE3.png',
  'PRIO3': 'img/PRIO3.png',
  'ITUB4': 'img/ITUB4.png',
  'ABEV3': 'img/ABEV3.png',
  'BRFS3': 'img/BRFS3.png',
  'CIEL3': 'img/CIEL3.png',
  'GGBR4': 'img/GGBR4.png',
  'LREN3': 'img/LREN3.png',
  'USIM5': 'img/USIM5.png',
  'RADL3': 'img/RADL3.png',
  'TIMS3': 'img/TIMS3.png',
};
const iconePadrao = 'img/ativo-default.png'; // Adicione um ícone padrão na pasta img
// Deixa os logotipos das telas de loading, login e cadastro redondos
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('#loginSection img, #cadastroSection img').forEach(function(img) {
    img.style.borderRadius = '50%';
    img.style.boxShadow = '0 0 22px #00ffa3, 0 0 0 6px #181c20';
    img.style.background = '#181c20';
    img.style.objectFit = 'cover';
  });
});

// ========== GRÁFICO DE ANÁLISE TÉCNICA ==========
// Variáveis globais para o gráfico TradingView
let currentSymbol = 'PETR4';
let currentInterval = 'D';
let currentMode = 'candlestick';

// Histórico completo de ativos da B3 com dados OHLCV simulados
const historicoAtivos = {
  'PETR4': [
    { time: '2024-01-01', open: 28.50, high: 29.20, low: 28.30, close: 28.90, volume: 1500000 },
    { time: '2024-01-02', open: 28.90, high: 29.80, low: 28.70, close: 29.50, volume: 1800000 },
    { time: '2024-01-03', open: 29.50, high: 30.10, low: 29.20, close: 29.80, volume: 2200000 },
    { time: '2024-01-04', open: 29.80, high: 30.50, low: 29.60, close: 30.20, volume: 1900000 },
    { time: '2024-01-05', open: 30.20, high: 30.80, low: 29.90, close: 30.60, volume: 2100000 },
    { time: '2024-01-08', open: 30.60, high: 31.20, low: 30.40, close: 30.90, volume: 2400000 },
    { time: '2024-01-09', open: 30.90, high: 31.50, low: 30.70, close: 31.30, volume: 2000000 },
    { time: '2024-01-10', open: 31.30, high: 31.80, low: 31.00, close: 31.60, volume: 2300000 },
    { time: '2024-01-11', open: 31.60, high: 32.10, low: 31.40, close: 31.90, volume: 2600000 },
    { time: '2024-01-12', open: 31.90, high: 32.40, low: 31.70, close: 32.20, volume: 2200000 },
    { time: '2024-01-15', open: 32.20, high: 32.80, low: 32.00, close: 32.50, volume: 2500000 },
    { time: '2024-01-16', open: 32.50, high: 33.00, low: 32.30, close: 32.80, volume: 2800000 },
    { time: '2024-01-17', open: 32.80, high: 33.30, low: 32.60, close: 33.10, volume: 2400000 },
    { time: '2024-01-18', open: 33.10, high: 33.60, low: 32.90, close: 33.40, volume: 2100000 },
    { time: '2024-01-19', open: 33.40, high: 33.90, low: 33.20, close: 33.70, volume: 2300000 },
    { time: '2024-01-22', open: 33.70, high: 34.20, low: 33.50, close: 33.90, volume: 2600000 },
    { time: '2024-01-23', open: 33.90, high: 34.40, low: 33.70, close: 34.20, volume: 2400000 },
    { time: '2024-01-24', open: 34.20, high: 34.70, low: 34.00, close: 34.50, volume: 2200000 },
    { time: '2024-01-25', open: 34.50, high: 35.00, low: 34.30, close: 34.80, volume: 2500000 },
    { time: '2024-01-26', open: 34.80, high: 35.30, low: 34.60, close: 35.10, volume: 2800000 }
  ],
  'VALE3': [
    { time: '2024-01-01', open: 65.20, high: 66.10, low: 64.80, close: 65.90, volume: 800000 },
    { time: '2024-01-02', open: 65.90, high: 66.80, low: 65.60, close: 66.50, volume: 950000 },
    { time: '2024-01-03', open: 66.50, high: 67.20, low: 66.20, close: 66.90, volume: 1100000 },
    { time: '2024-01-04', open: 66.90, high: 67.60, low: 66.70, close: 67.40, volume: 900000 },
    { time: '2024-01-05', open: 67.40, high: 68.10, low: 67.20, close: 67.80, volume: 1050000 },
    { time: '2024-01-08', open: 67.80, high: 68.50, low: 67.60, close: 68.20, volume: 1200000 },
    { time: '2024-01-09', open: 68.20, high: 68.90, low: 68.00, close: 68.70, volume: 1000000 },
    { time: '2024-01-10', open: 68.70, high: 69.40, low: 68.50, close: 69.10, volume: 1150000 },
    { time: '2024-01-11', open: 69.10, high: 69.80, low: 68.90, close: 69.50, volume: 1300000 },
    { time: '2024-01-12', open: 69.50, high: 70.20, low: 69.30, close: 69.90, volume: 1100000 },
    { time: '2024-01-15', open: 69.90, high: 70.60, low: 69.70, close: 70.30, volume: 1250000 },
    { time: '2024-01-16', open: 70.30, high: 71.00, low: 70.10, close: 70.70, volume: 1400000 },
    { time: '2024-01-17', open: 70.70, high: 71.40, low: 70.50, close: 71.10, volume: 1200000 },
    { time: '2024-01-18', open: 71.10, high: 71.80, low: 71.00, close: 71.50, volume: 1050000 },
    { time: '2024-01-19', open: 71.50, high: 72.20, low: 71.30, close: 71.90, volume: 1150000 },
    { time: '2024-01-22', open: 71.90, high: 72.60, low: 71.70, close: 72.30, volume: 1300000 },
    { time: '2024-01-23', open: 72.30, high: 73.00, low: 72.10, close: 72.70, volume: 1200000 },
    { time: '2024-01-24', open: 72.70, high: 73.40, low: 72.50, close: 73.10, volume: 1100000 },
    { time: '2024-01-25', open: 73.10, high: 73.80, low: 73.00, close: 73.50, volume: 1250000 },
    { time: '2024-01-26', open: 73.50, high: 74.20, low: 73.30, close: 73.90, volume: 1400000 }
  ],
  'ITUB4': [
    { time: '2024-01-01', open: 29.80, high: 30.20, low: 29.60, close: 30.00, volume: 1200000 },
    { time: '2024-01-02', open: 30.00, high: 30.50, low: 29.90, close: 30.30, volume: 1400000 },
    { time: '2024-01-03', open: 30.30, high: 30.80, low: 30.20, close: 30.60, volume: 1600000 },
    { time: '2024-01-04', open: 30.60, high: 31.00, low: 30.50, close: 30.90, volume: 1300000 },
    { time: '2024-01-05', open: 30.90, high: 31.30, low: 30.80, close: 31.20, volume: 1500000 },
    { time: '2024-01-08', open: 31.20, high: 31.60, low: 31.10, close: 31.50, volume: 1700000 },
    { time: '2024-01-09', open: 31.50, high: 31.90, low: 31.40, close: 31.80, volume: 1400000 },
    { time: '2024-01-10', open: 31.80, high: 32.20, low: 31.70, close: 32.10, volume: 1600000 },
    { time: '2024-01-11', open: 32.10, high: 32.50, low: 32.00, close: 32.40, volume: 1800000 },
    { time: '2024-01-12', open: 32.40, high: 32.80, low: 32.30, close: 32.70, volume: 1500000 },
    { time: '2024-01-15', open: 32.70, high: 33.10, low: 32.60, close: 33.00, volume: 1700000 },
    { time: '2024-01-16', open: 33.00, high: 33.40, low: 32.90, close: 33.30, volume: 1900000 },
    { time: '2024-01-17', open: 33.30, high: 33.70, low: 33.20, close: 33.60, volume: 1600000 },
    { time: '2024-01-18', open: 33.60, high: 34.00, low: 33.50, close: 33.90, volume: 1400000 },
    { time: '2024-01-19', open: 33.90, high: 34.30, low: 33.80, close: 34.20, volume: 1600000 },
    { time: '2024-01-22', open: 34.20, high: 34.60, low: 34.10, close: 34.50, volume: 1800000 },
    { time: '2024-01-23', open: 34.50, high: 34.90, low: 34.40, close: 34.80, volume: 1700000 },
    { time: '2024-01-24', open: 34.80, high: 35.20, low: 34.70, close: 35.10, volume: 1500000 },
    { time: '2024-01-25', open: 35.10, high: 35.50, low: 35.00, close: 35.40, volume: 1700000 },
    { time: '2024-01-26', open: 35.40, high: 35.80, low: 35.30, close: 35.70, volume: 1900000 }
  ],
  'ABEV3': [
    { time: '2024-01-01', open: 16.20, high: 16.50, low: 16.10, close: 16.40, volume: 800000 },
    { time: '2024-01-02', open: 16.40, high: 16.70, low: 16.30, close: 16.60, volume: 900000 },
    { time: '2024-01-03', open: 16.60, high: 16.90, low: 16.50, close: 16.80, volume: 1000000 },
    { time: '2024-01-04', open: 16.80, high: 17.10, low: 16.70, close: 17.00, volume: 850000 },
    { time: '2024-01-05', open: 17.00, high: 17.30, low: 16.90, close: 17.20, volume: 950000 },
    { time: '2024-01-08', open: 17.20, high: 17.50, low: 17.10, close: 17.40, volume: 1100000 },
    { time: '2024-01-09', open: 17.40, high: 17.70, low: 17.30, close: 17.60, volume: 900000 },
    { time: '2024-01-10', open: 17.60, high: 17.90, low: 17.50, close: 17.80, volume: 1000000 },
    { time: '2024-01-11', open: 17.80, high: 18.10, low: 17.70, close: 18.00, volume: 1150000 },
    { time: '2024-01-12', open: 18.00, high: 18.30, low: 17.90, close: 18.20, volume: 950000 },
    { time: '2024-01-15', open: 18.20, high: 18.50, low: 18.10, close: 18.40, volume: 1100000 },
    { time: '2024-01-16', open: 18.40, high: 18.70, low: 18.30, close: 18.60, volume: 1250000 },
    { time: '2024-01-17', open: 18.60, high: 18.90, low: 18.50, close: 18.80, volume: 1000000 },
    { time: '2024-01-18', open: 18.80, high: 19.10, low: 18.70, close: 19.00, volume: 900000 },
    { time: '2024-01-19', open: 19.00, high: 19.30, low: 18.90, close: 19.20, volume: 1000000 },
    { time: '2024-01-22', open: 19.20, high: 19.50, low: 19.10, close: 19.40, volume: 1150000 },
    { time: '2024-01-23', open: 19.40, high: 19.70, low: 19.30, close: 19.60, volume: 1100000 },
    { time: '2024-01-24', open: 19.60, high: 19.90, low: 19.50, close: 19.80, volume: 950000 },
    { time: '2024-01-25', open: 19.80, high: 20.10, low: 19.70, close: 20.00, volume: 1100000 },
    { time: '2024-01-26', open: 20.00, high: 20.30, low: 19.90, close: 20.20, volume: 1250000 }
  ],
  'BBDC4': [
    { time: '2024-01-01', open: 18.50, high: 18.80, low: 18.40, close: 18.70, volume: 700000 },
    { time: '2024-01-02', open: 18.70, high: 19.00, low: 18.60, close: 18.90, volume: 800000 },
    { time: '2024-01-03', open: 18.90, high: 19.20, low: 18.80, close: 19.10, volume: 900000 },
    { time: '2024-01-04', open: 19.10, high: 19.40, low: 19.00, close: 19.30, volume: 750000 },
    { time: '2024-01-05', open: 19.30, high: 19.60, low: 19.20, close: 19.50, volume: 850000 },
    { time: '2024-01-08', open: 19.50, high: 19.80, low: 19.40, close: 19.70, volume: 1000000 },
    { time: '2024-01-09', open: 19.70, high: 20.00, low: 19.60, close: 19.90, volume: 800000 },
    { time: '2024-01-10', open: 19.90, high: 20.20, low: 19.80, close: 20.10, volume: 900000 },
    { time: '2024-01-11', open: 20.10, high: 20.40, low: 20.00, close: 20.30, volume: 1050000 },
    { time: '2024-01-12', open: 20.30, high: 20.60, low: 20.20, close: 20.50, volume: 850000 },
    { time: '2024-01-15', open: 20.50, high: 20.80, low: 20.40, close: 20.70, volume: 1000000 },
    { time: '2024-01-16', open: 20.70, high: 21.00, low: 20.60, close: 20.90, volume: 1150000 },
    { time: '2024-01-17', open: 20.90, high: 21.20, low: 20.80, close: 21.10, volume: 900000 },
    { time: '2024-01-18', open: 21.10, high: 21.40, low: 21.00, close: 21.30, volume: 800000 },
    { time: '2024-01-19', open: 21.30, high: 21.60, low: 21.20, close: 21.50, volume: 900000 },
    { time: '2024-01-22', open: 21.50, high: 21.80, low: 21.40, close: 21.70, volume: 1050000 },
    { time: '2024-01-23', open: 21.70, high: 22.00, low: 21.60, close: 21.90, volume: 1000000 },
    { time: '2024-01-24', open: 21.90, high: 22.20, low: 21.80, close: 22.10, volume: 850000 },
    { time: '2024-01-25', open: 22.10, high: 22.40, low: 22.00, close: 22.30, volume: 1000000 },
    { time: '2024-01-26', open: 22.30, high: 22.60, low: 22.20, close: 22.50, volume: 1150000 }
  ],
  'TIMS3': [
    { time: '2024-01-01', open: 12.80, high: 13.10, low: 12.70, close: 13.00, volume: 600000 },
    { time: '2024-01-02', open: 13.00, high: 13.30, low: 12.90, close: 13.20, volume: 700000 },
    { time: '2024-01-03', open: 13.20, high: 13.50, low: 13.10, close: 13.40, volume: 800000 },
    { time: '2024-01-04', open: 13.40, high: 13.70, low: 13.30, close: 13.60, volume: 650000 },
    { time: '2024-01-05', open: 13.60, high: 13.90, low: 13.50, close: 13.80, volume: 750000 },
    { time: '2024-01-08', open: 13.80, high: 14.10, low: 13.70, close: 14.00, volume: 900000 },
    { time: '2024-01-09', open: 14.00, high: 14.30, low: 13.90, close: 14.20, volume: 700000 },
    { time: '2024-01-10', open: 14.20, high: 14.50, low: 14.10, close: 14.40, volume: 800000 },
    { time: '2024-01-11', open: 14.40, high: 14.70, low: 14.30, close: 14.60, volume: 950000 },
    { time: '2024-01-12', open: 14.60, high: 14.90, low: 14.50, close: 14.80, volume: 750000 },
    { time: '2024-01-15', open: 14.80, high: 15.10, low: 14.70, close: 15.00, volume: 900000 },
    { time: '2024-01-16', open: 15.00, high: 15.30, low: 14.90, close: 15.20, volume: 1050000 },
    { time: '2024-01-17', open: 15.20, high: 15.50, low: 15.10, close: 15.40, volume: 800000 },
    { time: '2024-01-18', open: 15.40, high: 15.70, low: 15.30, close: 15.60, volume: 700000 },
    { time: '2024-01-19', open: 15.60, high: 15.90, low: 15.50, close: 15.80, volume: 800000 },
    { time: '2024-01-22', open: 15.80, high: 16.10, low: 15.70, close: 16.00, volume: 950000 },
    { time: '2024-01-23', open: 16.00, high: 16.30, low: 15.90, close: 16.20, volume: 900000 },
    { time: '2024-01-24', open: 16.20, high: 16.50, low: 16.10, close: 16.40, volume: 750000 },
    { time: '2024-01-25', open: 16.40, high: 16.70, low: 16.30, close: 16.60, volume: 900000 },
    { time: '2024-01-26', open: 16.60, high: 16.90, low: 16.50, close: 16.80, volume: 1050000 }
  ]
};

// Função para inicializar o gráfico
function initChart() {
  console.log('=== INICIALIZANDO GRÁFICO ===');
  
  // Verificar se a biblioteca LightweightCharts está carregada
  if (typeof LightweightCharts === 'undefined') {
    console.error('❌ Biblioteca LightweightCharts não está carregada!');
    return;
  }
  
  console.log('✅ LightweightCharts disponível:', LightweightCharts);
  
  // Limpar gráficos existentes
  if (chart) {
    console.log('🔄 Removendo gráfico existente');
    chart.remove();
    chart = null;
  }
  
  if (volumeChart) {
    console.log('🔄 Removendo gráfico de volume existente');
    volumeChart.remove();
    volumeChart = null;
  }

  // Obter containers
  const chartContainer = document.getElementById('chartContainer');
  const volumeContainer = document.getElementById('volumeContainer');
  
  console.log('📦 chartContainer:', chartContainer);
  console.log('📦 volumeContainer:', volumeContainer);
  
  if (!chartContainer || !volumeContainer) {
    console.error('❌ Containers não encontrados!');
    return;
  }
  
  try {
    console.log('Criando gráfico principal...');
    
    // 1. Criar gráfico principal corretamente
    console.log('🎯 Criando gráfico principal...');
    
    try {
      chart = LightweightCharts.createChart(chartContainer, {
        width: chartContainer.clientWidth || 600,
        height: chartContainer.clientHeight || 400,
        layout: {
          background: { color: 'rgba(35, 42, 61, 0.3)' },
          textColor: '#fff',
        },
        grid: {
          vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
          horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
        },
        crosshair: {
          mode: LightweightCharts.CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: 'rgba(0, 255, 163, 0.3)',
          textColor: '#fff',
        },
        timeScale: {
          borderColor: 'rgba(0, 255, 163, 0.3)',
          textColor: '#fff',
          timeVisible: true,
          secondsVisible: false,
        },
      });
      
      console.log('✅ Gráfico principal criado com sucesso:', chart);
      console.log('🔍 Verificando métodos disponíveis...');
      console.log('addCandlestickSeries:', typeof chart.addCandlestickSeries);
      console.log('addLineSeries:', typeof chart.addLineSeries);
      
    } catch (error) {
      console.error('❌ Erro ao criar gráfico principal:', error);
      return;
    }

    console.log('✅ Gráfico principal criado com sucesso:', chart);

    console.log('📊 Criando gráfico de volume...');
    
    // 2. Criar gráfico de volume
    try {
      volumeChart = LightweightCharts.createChart(volumeContainer, {
        width: volumeContainer.clientWidth || 600,
        height: volumeContainer.clientHeight || 150,
        layout: {
          background: { color: 'rgba(35, 42, 61, 0.3)' },
          textColor: '#fff',
        },
        grid: {
          vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
          horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
        },
        rightPriceScale: {
          borderColor: 'rgba(0, 255, 163, 0.3)',
          textColor: '#fff',
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        timeScale: {
          borderColor: 'rgba(0, 255, 163, 0.3)',
          textColor: '#fff',
          visible: false,
        },
      });
      
      console.log('✅ Gráfico de volume criado com sucesso:', volumeChart);
      
    } catch (error) {
      console.error('❌ Erro ao criar gráfico de volume:', error);
      return;
    }

    // Sincronizar time scales
    chart.timeScale().subscribeVisibleTimeRangeChange(() => {
      const timeRange = chart.timeScale().getVisibleRange();
      if (timeRange) {
        volumeChart.timeScale().setVisibleRange(timeRange);
      }
    });

    console.log('Criando séries...');
    
    // 3. Criar séries APENAS após o chart estar instanciado
    console.log('Verificando chart antes de criar séries:', chart);
    console.log('typeof chart.addCandlestickSeries:', typeof chart?.addCandlestickSeries);
    
    try {
      candlestickSeries = chart.addCandlestickSeries({
        upColor: '#00ffa3',
        downColor: '#ff6b6b',
        borderDownColor: '#ff6b6b',
        borderUpColor: '#00ffa3',
        wickDownColor: '#ff6b6b',
        wickUpColor: '#00ffa3',
      });
      console.log('Série candlestick criada:', candlestickSeries);
    } catch (error) {
      console.error('Erro ao criar série candlestick:', error);
      console.error('chart object:', chart);
      return;
    }

    try {
      lineSeries = chart.addLineSeries({
        color: '#00ffa3',
        lineWidth: 2,
      });
      console.log('Série linha criada:', lineSeries);
    } catch (error) {
      console.error('Erro ao criar série linha:', error);
      return;
    }

    try {
      volumeSeries = volumeChart.addHistogramSeries({
        color: '#00ffa3',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      });
      console.log('Série volume criada:', volumeSeries);
    } catch (error) {
      console.error('Erro ao criar série volume:', error);
      return;
    }

    console.log('Séries criadas:', { candlestickSeries, lineSeries, volumeSeries });

    // 4. Carregar dados APENAS se as séries foram criadas com sucesso
    if (candlestickSeries && lineSeries && volumeSeries) {
      console.log('Carregando dados iniciais...');
      // Carregar dados do ativo selecionado na boleta ou PETR4 como padrão
      const ativoSelecionado = document.getElementById('ativo')?.value || 'PETR4';
      loadChartData(ativoSelecionado);
    } else {
      console.error('Séries não foram criadas corretamente!');
      return;
    }
    
    // Configurar responsividade
    const resizeObserver = new ResizeObserver(() => {
      if (chart) {
        chart.applyOptions({
          width: chartContainer.clientWidth,
          height: chartContainer.clientHeight,
        });
      }
      if (volumeChart) {
        volumeChart.applyOptions({
          width: volumeContainer.clientWidth,
          height: volumeContainer.clientHeight,
        });
      }
    });
    
    resizeObserver.observe(chartContainer);
    resizeObserver.observe(volumeContainer);
    
    console.log('Gráfico inicializado com sucesso!');
    
  } catch (error) {
    console.error('Erro ao inicializar gráfico:', error);
  }
}

// Função para carregar dados do gráfico
function loadChartData(ativo) {
  console.log('📊 Carregando dados para ativo:', ativo);
  
  // Verificar se as séries existem antes de tentar usar
  if (!candlestickSeries || !lineSeries || !volumeSeries) {
    console.error('❌ Séries não estão disponíveis para carregar dados!');
    console.error('candlestickSeries:', candlestickSeries);
    console.error('lineSeries:', lineSeries);
    console.error('volumeSeries:', volumeSeries);
    return;
  }
  
  // Verificar se o ativo tem dados disponíveis
  if (!historicoAtivos[ativo]) {
    console.log('⚠️ Nenhum dado disponível para este ativo:', ativo);
    console.log('Ativos disponíveis:', Object.keys(historicoAtivos));
    return;
  }
  
  const data = historicoAtivos[ativo];
  console.log('📈 Dados encontrados:', data.length, 'registros');
  
  try {
    if (currentMode === 'candlestick') {
      console.log('🕯️ Carregando dados candlestick...');
      candlestickSeries.setData(data);
      lineSeries.setData([]);
    } else {
      console.log('📈 Carregando dados linha...');
      candlestickSeries.setData([]);
      const lineData = data.map(d => ({
        time: d.time,
        value: d.close
      }));
      lineSeries.setData(lineData);
    }
    
    console.log('📊 Carregando dados de volume...');
    volumeSeries.setData(data.map(d => ({
      time: d.time,
      value: d.volume,
      color: d.close >= d.open ? 'rgba(0, 255, 163, 0.6)' : 'rgba(255, 107, 107, 0.6)'
    })));
    
    console.log('✅ Dados carregados com sucesso para:', ativo);
    console.log('Modo atual:', currentMode);
    
  } catch (error) {
    console.error('❌ Erro ao carregar dados:', error);
  }
}

// Função para alternar entre modos de gráfico
function toggleChartMode(mode) {
  console.log('🔄 Alternando modo do gráfico para:', mode);
  currentMode = mode;
  
  // Atualizar botões
  const btnCandlestick = document.getElementById('btnCandlestick');
  const btnLine = document.getElementById('btnLine');
  
  if (btnCandlestick) {
    btnCandlestick.classList.toggle('active', mode === 'candlestick');
    console.log('✅ Botão candlestick atualizado');
  }
  if (btnLine) {
    btnLine.classList.toggle('active', mode === 'line');
    console.log('✅ Botão linha atualizado');
  }
  
  // Recarregar dados apenas se as séries existirem
  if (candlestickSeries && lineSeries && volumeSeries) {
    const ativo = document.getElementById('ativo')?.value || 'PETR4';
    console.log('🔄 Recarregando dados para ativo:', ativo, 'no modo:', mode);
    loadChartData(ativo);
  } else {
    console.error('❌ Séries não disponíveis para alternar modo');
  }
}

// Função para atualizar timeframe
function updateTimeframe(timeframe) {
  // Aqui você pode implementar a lógica para diferentes timeframes
  // Por enquanto, apenas recarrega os dados atuais
  if (candlestickSeries && lineSeries && volumeSeries) {
    const ativo = document.getElementById('ativo')?.value || 'PETR4';
    loadChartData(ativo);
  }
}

// Função para sincronizar gráfico com seleção de ativo
function syncChartWithBoleta() {
  if (candlestickSeries && lineSeries && volumeSeries) {
    const ativo = document.getElementById('ativo')?.value || 'PETR4';
    loadChartData(ativo);
  }
}

// Função para sincronizar gráfico com seleção de ativo no dropdown
function syncChartWithAtivoDropdown(ativo) {
  if (candlestickSeries && lineSeries && volumeSeries) {
    loadChartData(ativo);
  }
}

// Função para sincronizar gráfico com seleção de ativo no book de ofertas
function syncChartWithBookOfertas(ativo) {
  if (candlestickSeries && lineSeries && volumeSeries) {
    loadChartData(ativo);
  }
}

// Inicializar gráfico quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOMContentLoaded - Inicializando gráfico...');
  
  // Verificar se estamos na página correta
  const chartContainer = document.getElementById('chartContainer');
  const volumeContainer = document.getElementById('volumeContainer');
  
  if (!chartContainer || !volumeContainer) {
    console.log('⚠️ Página não possui gráfico - pulando inicialização');
    console.log('chartContainer:', chartContainer);
    console.log('volumeContainer:', volumeContainer);
    return;
  }
  
  console.log('✅ Elementos do gráfico encontrados na página');
  console.log('📏 Dimensões dos containers:');
  console.log('chartContainer:', chartContainer.clientWidth, 'x', chartContainer.clientHeight);
  console.log('volumeContainer:', volumeContainer.clientWidth, 'x', volumeContainer.clientHeight);
  
  // Aguardar um pouco para garantir que os elementos estejam renderizados
  setTimeout(() => {
    console.log('⏰ Timeout executado - chamando initChart()...');
    
    // Verificar se os elementos estão visíveis antes de inicializar
    if (chartContainer && volumeContainer) {
      console.log('🎯 Elementos encontrados, inicializando gráfico...');
      
      // 5. Chamar initChart() apenas após o DOM estar carregado
      initChart();
      
      // Aguardar um pouco mais para o gráfico ser inicializado
      setTimeout(() => {
        // Configurar event listeners APENAS se o gráfico foi inicializado com sucesso
        if (chart && volumeChart && candlestickSeries && lineSeries && volumeSeries) {
          console.log('✅ Gráfico inicializado com sucesso, configurando event listeners...');
          
          const btnCandlestick = document.getElementById('btnCandlestick');
          const btnLine = document.getElementById('btnLine');
          const timeframeSelect = document.getElementById('timeframeSelect');
          const ativoSelect = document.getElementById('ativo');
          
          console.log('🔘 Elementos encontrados:', { btnCandlestick, btnLine, timeframeSelect, ativoSelect });
          
          if (btnCandlestick) {
            btnCandlestick.addEventListener('click', () => toggleChartMode('candlestick'));
            console.log('✅ Event listener para candlestick configurado');
          }
          
          if (btnLine) {
            btnLine.addEventListener('click', () => toggleChartMode('line'));
            console.log('✅ Event listener para linha configurado');
          }
          
          if (timeframeSelect) {
            timeframeSelect.addEventListener('change', (e) => updateTimeframe(e.target.value));
            console.log('✅ Event listener para timeframe configurado');
          }
          
          if (ativoSelect) {
            ativoSelect.addEventListener('change', syncChartWithBoleta);
            console.log('✅ Event listener para ativo configurado');
          }
          
          // Adicionar event listeners para sincronização com dropdown de ativos
          const ativoDropdownItems = document.querySelectorAll('#ativoDropdownList li');
          ativoDropdownItems.forEach(item => {
            item.addEventListener('click', function() {
              const ativo = this.dataset.value;
              if (ativo) {
                console.log('🔄 Ativo selecionado no dropdown:', ativo);
                syncChartWithAtivoDropdown(ativo);
              }
            });
          });
          console.log('✅ Event listeners para dropdown de ativos configurados');
          
          // Adicionar event listeners para sincronização com book de ofertas
          const bookOfertasRows = document.querySelectorAll('#bookOfertas tbody tr');
          bookOfertasRows.forEach(row => {
            row.addEventListener('click', function() {
              const ativo = this.querySelector('td:first-child')?.textContent;
              if (ativo) {
                console.log('🔄 Ativo selecionado no book de ofertas:', ativo);
                syncChartWithBookOfertas(ativo);
              }
            });
          });
          console.log('✅ Event listeners para book de ofertas configurados');
          
          console.log('🎉 Todos os event listeners configurados com sucesso!');
          
          // Carregar dados iniciais
          const ativoInicial = document.getElementById('ativo')?.value || 'PETR4';
          console.log('📊 Carregando dados iniciais para:', ativoInicial);
          loadChartData(ativoInicial);
          
        } else {
          console.error('❌ Gráfico não foi inicializado corretamente!');
          console.error('chart:', chart);
          console.error('volumeChart:', volumeChart);
          console.error('candlestickSeries:', candlestickSeries);
          console.error('lineSeries:', lineSeries);
          console.error('volumeSeries:', volumeSeries);
        }
      }, 500);
      
    } else {
      console.error('❌ Elementos do gráfico não encontrados após timeout!');
    }
  }, 1000);
});


