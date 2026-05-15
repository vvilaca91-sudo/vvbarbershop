/**
 * Efeito de surgimento ao fazer scroll
 * Usa Intersection Observer API para detectar quando elementos entram no viewport
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configuração do Intersection Observer
  const observerOptions = {
    threshold: 0.1, // Dispara quando 10% do elemento é visível
    rootMargin: '0px 0px -20px 0px' // Dispara 20px antes de entrar completamente
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adiciona a classe de animação
        entry.target.classList.add('reveal');
        // Para de observar após a primeira vez
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Seleciona todos os elementos com data-reveal
  const revealElements = document.querySelectorAll('[data-reveal]');
  revealElements.forEach(element => {
    observer.observe(element);
  });
});

// Alternativa: aplicar a animações em seções inteiras
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll(
    '.section-header, .servicos-grid, .precos-container, .sobrenos-container, .horarios-grid, .contacto-container'
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-section');
        // Anima os filhos também com delay progressivo
        const children = entry.target.querySelectorAll('.servico-card, .horario-card, .precos-table, .info-item');
        children.forEach((child, index) => {
          child.style.setProperty('--child-index', index);
          child.classList.add('reveal-child');
        });
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});

// ==================== NAVEGAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      this.classList.add('clicked');
      window.setTimeout(() => {
        this.classList.remove('clicked');
      }, 220);
    });
  });
});
