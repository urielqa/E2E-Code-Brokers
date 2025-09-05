// ===== VALIDAÇÕES DOS FORMULÁRIOS =====

// Configuração das validações
const VALIDACOES = {
  // Validação de nome: NOME COMPLETO obrigatório (nome + sobrenome)
  nome: {
    regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
    mensagem: "Nome deve conter apenas letras e espaços",
    validar: (valor) => {
      const nome = valor.trim();

      // Verifica se está vazio
      if (!nome) return "Nome completo é obrigatório";

      // Verifica comprimento mínimo
      if (nome.length < 6) return "Nome deve ter pelo menos 6 caracteres";

      // Verifica comprimento máximo
      if (nome.length > 50) return "Nome deve ter no máximo 50 caracteres";

      // Verifica se contém apenas letras e espaços
      if (!VALIDACOES.nome.regex.test(nome)) return VALIDACOES.nome.mensagem;

      // Verifica se tem pelo menos 2 palavras (nome + sobrenome)
      const palavras = nome.split(' ').filter(palavra => palavra.length > 0);
      if (palavras.length < 2) return "Digite nome completo (nome e sobrenome)";

      // Verifica se cada palavra tem pelo menos 2 caracteres
      for (let palavra of palavras) {
        if (palavra.length < 2) return "Cada nome deve ter pelo menos 2 caracteres";
      }

      // Verifica se não tem espaços múltiplos
      if (nome.includes('  ')) return "Não use espaços múltiplos";

      // Verifica se não começa ou termina com espaço
      if (nome !== nome.trim()) return "Nome não pode começar ou terminar com espaço";

      return null; // válido
    }
  },

  // Validação de CPF: formato 000.000.000-00 ou apenas números (11 dígitos)
  cpf: {
    regex: /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/,
    mensagem: "CPF deve ter 11 dígitos no formato 000.000.000-00 ou apenas números",
    validar: (valor) => {
      const cpf = valor.replace(/\D/g, '');
      if (cpf.length !== 11) return "CPF deve ter exatamente 11 dígitos";
      if (!/^\d{11}$/.test(cpf)) return "CPF deve conter apenas números";

      // Validação de CPF válido (algoritmo)
      if (cpf === "00000000000" || cpf === "11111111111" ||
        cpf === "22222222222" || cpf === "33333333333" ||
        cpf === "44444444444" || cpf === "55555555555" ||
        cpf === "66666666666" || cpf === "77777777777" ||
        cpf === "88888888888" || cpf === "99999999999") {
        return "CPF inválido";
      }

      // Validação dos dígitos verificadores - ALGORITMO CORRIGIDO
      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let resto = soma % 11;
      let digito1 = resto < 2 ? 0 : 11 - resto;

      soma = 0;
      for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
      }
      resto = soma % 11;
      let digito2 = resto < 2 ? 0 : 11 - resto;

      // Verifica se os dígitos verificadores estão corretos
      if (parseInt(cpf.charAt(9)) !== digito1 || parseInt(cpf.charAt(10)) !== digito2) {
        return "CPF inválido";
      }

      return null; // válido
    }
  },

  // Validação de e-mail: APENAS domínios válidos da lista
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    mensagem: "E-mail deve ter formato válido (ex: usuario@gmail.com)",
    validar: (valor) => {
      const email = valor.trim().toLowerCase();
      if (!VALIDACOES.email.regex.test(email)) return VALIDACOES.email.mensagem;

      // Validação de domínios válidos - APENAS os da lista
      const dominio = email.split('@')[1];
      const dominiosValidos = [
        'gmail.com', 'gmail.com.br', 'hotmail.com', 'hotmail.com.br',
        'outlook.com', 'outlook.com.br', 'yahoo.com', 'yahoo.com.br',
        'icloud.com', 'protonmail.com', 'live.com', 'live.com.br',
        'uol.com.br', 'bol.com.br', 'terra.com.br', 'ig.com.br',
        'r7.com', 'globo.com', 'oi.com.br', 'tim.com.br',
        'vivo.com.br', 'claro.com.br', 'net.com.br', 'msn.com',
        'aol.com', 'zoho.com', 'yandex.com', 'mail.com'
      ];

      // REJEITA se não estiver na lista de domínios válidos
      if (!dominiosValidos.includes(dominio)) {
        return `Domínio "${dominio}" não é aceito. Use apenas domínios conhecidos como gmail.com, hotmail.com, outlook.com, etc.`;
      }

      return null; // válido
    }
  },

  // Validação de celular: padrão brasileiro (10 ou 11 dígitos)
  celular: {
    regex: /^\(?[1-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$/,
    mensagem: "Celular deve ter DDD + 8 ou 9 dígitos (ex: 11947013629 ou (11) 94701-3629)",
    validar: (valor) => {
      const celular = valor.replace(/\D/g, '');
      if (celular.length < 10 || celular.length > 11) {
        return "Celular deve ter entre 10 e 11 dígitos (com DDD)";
      }

      // Verifica se o DDD é válido (11-99)
      const ddd = parseInt(celular.substring(0, 2));
      if (ddd < 11 || ddd > 99) {
        return "DDD inválido";
      }

      // Verifica se o número não é apenas zeros
      if (celular === '0'.repeat(celular.length)) {
        return "Número de celular inválido";
      }

      return null; // válido
    }
  },

  // Validação de senha: mínimo 8 caracteres, com requisitos específicos
  senha: {
    validar: (valor) => {
      if (valor.length < 8) return "Senha deve ter pelo menos 8 caracteres";
      if (!/[A-Z]/.test(valor)) return "Senha deve ter pelo menos 1 letra maiúscula";
      if (!/[a-z]/.test(valor)) return "Senha deve ter pelo menos 1 letra minúscula";
      if (!/\d/.test(valor)) return "Senha deve ter pelo menos 1 número";
      if (!/[@#$%&*!^\-_=+.,;:]/.test(valor)) return "Senha deve ter pelo menos 1 caractere especial (@#$%&*!^\-_=+.,;:)";
      return null; // válido
    }
  }
};

// ===== MEDIDOR DE FORÇA DA SENHA =====
class MedidorSenha {
  constructor(inputId, containerId) {
    this.input = document.getElementById(inputId);
    this.container = containerId ? document.getElementById(containerId) : this.input.parentNode;
    this.barra = null;
    this.mensagem = null;
    this.init();
  }

  init() {
    if (!this.input || !this.container) return;

    // Cria a barra de força
    this.barra = document.createElement('div');
    this.barra.className = 'password-strength-bar';
    this.barra.innerHTML = '<div class="strength-fill"></div>';

    // Cria a mensagem de orientação
    this.mensagem = document.createElement('div');
    this.mensagem.className = 'password-strength-message';

    // Adiciona ao container
    this.container.appendChild(this.barra);
    this.container.appendChild(this.mensagem);

    // Adiciona evento de input
    this.input.addEventListener('input', () => this.atualizarForca());
    this.input.addEventListener('blur', () => this.atualizarForca());
  }

  calcularForca(senha) {
    let pontos = 0;

    // Comprimento
    if (senha.length >= 8) pontos += 1;
    if (senha.length >= 12) pontos += 1;

    // Tipos de caracteres
    if (/[a-z]/.test(senha)) pontos += 1;
    if (/[A-Z]/.test(senha)) pontos += 1;
    if (/\d/.test(senha)) pontos += 1;
    if (/[@#$%&*!^\-_=+.,;:]/.test(senha)) pontos += 1;

    // Complexidade adicional
    if (senha.length > 8 && /[a-z]/.test(senha) && /[A-Z]/.test(senha) && /\d/.test(senha) && /[@#$%&*!^\-_=+.,;:]/.test(senha)) {
      pontos += 2; // Bônus para senha completa
    }

    return Math.min(pontos, 5); // Máximo 5 pontos
  }

  obterNivelForca(pontos) {
    if (pontos <= 1) return { nivel: 'fraca', cor: '#ff4444', mensagem: 'Senha muito fraca' };
    if (pontos <= 2) return { nivel: 'fraca', cor: '#ff8800', mensagem: 'Senha fraca' };
    if (pontos <= 3) return { nivel: 'media', cor: '#ffaa00', mensagem: 'Senha média' };
    if (pontos <= 4) return { nivel: 'forte', cor: '#00aa00', mensagem: 'Senha forte' };
    return { nivel: 'muito-forte', cor: '#00ff00', mensagem: 'Senha muito forte' };
  }

  atualizarForca() {
    const senha = this.input.value;
    if (!senha) {
      this.barra.style.display = 'none';
      this.mensagem.style.display = 'none';
      return;
    }

    this.barra.style.display = 'block';
    this.mensagem.style.display = 'block';

    const pontos = this.calcularForca(senha);
    const nivel = this.obterNivelForca(pontos);

    // Atualiza a barra
    const fill = this.barra.querySelector('.strength-fill');
    fill.style.width = `${(pontos / 5) * 100}%`;
    fill.style.backgroundColor = nivel.cor;

    // Atualiza a mensagem
    this.mensagem.textContent = nivel.mensagem;
    this.mensagem.style.color = nivel.cor;

    // Adiciona classe para estilização
    this.barra.className = `password-strength-bar strength-${nivel.nivel}`;
  }
}

// ===== FUNÇÕES AUXILIARES =====

// Função para bloquear números e caracteres especiais no campo nome
function bloquearNumerosNome(event) {
  const tecla = event.key;
  const codigoTecla = event.keyCode || event.which;
  const input = event.target;
  const valorAtual = input.value;

  // Permite: teclas de controle (backspace, delete, setas, tab, etc.)
  if (codigoTecla === 8 || codigoTecla === 9 || codigoTecla === 37 ||
    codigoTecla === 38 || codigoTecla === 39 || codigoTecla === 40 ||
    codigoTecla === 46 || codigoTecla === 32) {
    return true;
  }

  // Permite apenas letras e acentos
  if (/^[A-Za-zÀ-ÖØ-öø-ÿ]$/.test(tecla)) {
    return true;
  }

  // Permite espaço apenas se não for o primeiro caractere e não houver espaço duplo
  if (tecla === ' ') {
    if (valorAtual.length === 0) {
      event.preventDefault();
      return false;
    }
    if (valorAtual.endsWith(' ')) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // Bloqueia números, símbolos e outros caracteres
  event.preventDefault();
  return false;
}

// Função para aplicar máscara de CPF
function aplicarMascaraCPF(valor) {
  const numeros = valor.replace(/\D/g, '');
  if (numeros.length <= 3) return numeros;
  if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  if (numeros.length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
  return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;
}

// Função para aplicar máscara de celular
function aplicarMascaraCelular(valor) {
  const numeros = valor.replace(/\D/g, '');
  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
}

// ===== VALIDADOR DE CAMPOS =====
class ValidadorCampo {
  constructor(campoId, tipo, containerId) {
    this.campo = document.getElementById(campoId);
    this.tipo = tipo;
    this.container = containerId ? document.getElementById(containerId) : this.campo.parentNode;
    this.mensagemErro = null;
    this.init();
  }

  init() {
    if (!this.campo) return;

    // Cria elemento para mensagem de erro
    this.mensagemErro = document.createElement('div');
    this.mensagemErro.className = 'campo-erro hidden';
    this.container.appendChild(this.mensagemErro);

    // Adiciona eventos específicos por tipo
    if (this.tipo === 'nome') {
      // Para nome: bloqueia números em tempo real
      this.campo.addEventListener('keydown', bloquearNumerosNome);
      this.campo.addEventListener('input', () => this.validarEmTempoReal());
    } else if (this.tipo === 'cpf') {
      // Para CPF: aplica máscara
      this.campo.addEventListener('input', (e) => {
        const valor = e.target.value.replace(/\D/g, '');
        if (valor.length <= 11) {
          e.target.value = aplicarMascaraCPF(valor);
        }
        this.validarEmTempoReal();
      });
    } else if (this.tipo === 'celular') {
      // Para celular: aplica máscara
      this.campo.addEventListener('input', (e) => {
        const valor = e.target.value.replace(/\D/g, '');
        if (valor.length <= 11) {
          e.target.value = aplicarMascaraCelular(valor);
        }
        this.validarEmTempoReal();
      });
    } else {
      // Para outros campos: validação normal
      this.campo.addEventListener('input', () => this.validarEmTempoReal());
    }

    // Eventos comuns para todos os campos
    this.campo.addEventListener('blur', () => this.validar());
    this.campo.addEventListener('focus', () => this.limparErro());
  }

  validar() {
    const valor = this.campo.value.trim();
    let erro = null;

    // Validação específica por tipo
    switch (this.tipo) {
      case 'nome':
        erro = VALIDACOES.nome.validar(valor);
        break;
      case 'cpf':
        erro = VALIDACOES.cpf.validar(valor);
        break;
      case 'email':
        erro = VALIDACOES.email.validar(valor);
        break;
      case 'celular':
        erro = VALIDACOES.celular.validar(valor);
        break;
      case 'senha':
        erro = VALIDACOES.senha.validar(valor);
        break;
    }

    if (erro) {
      this.mostrarErro(erro);
      return false;
    } else {
      this.limparErro();
      return true;
    }
  }

  validarEmTempoReal() {
    if (this.campo.value.trim()) {
      this.validar();
    } else {
      this.limparErro();
    }
  }

  mostrarErro(mensagem) {
    this.mensagemErro.textContent = mensagem;
    this.mensagemErro.classList.remove('hidden');
    this.campo.classList.add('campo-invalido');
  }

  limparErro() {
    this.mensagemErro.classList.add('hidden');
    this.campo.classList.remove('campo-invalido');
  }

  isValid() {
    return !this.campo.classList.contains('campo-invalido');
  }
}

// ===== INICIALIZAÇÃO DAS VALIDAÇÕES =====
document.addEventListener('DOMContentLoaded', function () {
  // Inicializa validações do formulário de cadastro
  const validadoresCadastro = [
    new ValidadorCampo('nome', 'nome'),
    new ValidadorCampo('novoCpf', 'cpf'),
    new ValidadorCampo('email', 'email'),
    new ValidadorCampo('whatsapp', 'celular'),
    new ValidadorCampo('novaSenhaCadastro', 'senha')
  ];

  // Inicializa validações do formulário de login
  const validadoresLogin = [
    new ValidadorCampo('cpf', 'cpf')
  ];

  // Inicializa medidor de força da senha
  const medidorSenha = new MedidorSenha('novaSenhaCadastro');

  // Função para validar todos os campos do cadastro
  window.validarFormularioCadastro = function () {
    return validadoresCadastro.every(validador => validador.isValid());
  };

  // Função para validar todos os campos do login
  window.validarFormularioLogin = function () {
    return validadoresLogin.every(validador => validador.isValid());
  };
});
