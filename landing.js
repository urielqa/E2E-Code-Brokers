// landing.js - Funcionalidades premium para landing page InvestUOF

// Particles.js config
particlesJS('particles-js', {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 900 } },
    color: { value: ['#a259ff', '#00ffa3', '#fff'] },
    shape: { type: 'circle' },
    opacity: { value: 0.18, random: true },
    size: { value: 4, random: true },
    line_linked: { enable: true, distance: 120, color: '#a259ff', opacity: 0.12, width: 1 },
    move: { enable: true, speed: 1.2, direction: 'none', out_mode: 'out' }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: false }, onclick: { enable: false } },
    modes: {}
  },
  retina_detect: true
});

// Header sticky compacto ao rolar
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 40) {
    header.classList.add('compact');
  } else {
    header.classList.remove('compact');
  }
});

// Scroll suave para seções
window.scrollToSection = function(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// FAQ acordeão
if (document.querySelectorAll('.faq-question').length) {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', function() {
      const item = this.parentElement;
      item.classList.toggle('open');
    });
  });
}

// Animação fade-in-up ao carregar (para elementos com .fade-in-up)
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  });
});

// Máscara e validação para campo CPF
document.addEventListener('DOMContentLoaded', function() {
  var cpfInputs = document.querySelectorAll('input[type="text"], input[type="tel"]');
  cpfInputs.forEach(function(input) {
    if (input.id && input.id.toLowerCase().includes('cpf') || input.name && input.name.toLowerCase().includes('cpf')) {
      input.addEventListener('input', function(e) {
        let v = this.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        this.value = v;
      });
      input.addEventListener('blur', function() {
        // Validação simples de formato
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(this.value)) {
          this.setCustomValidity('CPF inválido. Use o formato 000.000.000-00');
        } else {
          this.setCustomValidity('');
        }
      });
    }
  });
});
