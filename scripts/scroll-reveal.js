/**
 * Efeito de surgimento ao fazer scroll
 * Usa Intersection Observer API para detectar quando elementos entram no viewport
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configuração do Intersection Observer
  const observerOptions = {
    threshold: 0.1, // Dispara quando 10% do elemento é visível
    rootMargin: '0px 0px -50px 0px' // Dispara 50px antes de entrar completamente
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

// ==================== NAVEGAÇÃO ATIVA ====================
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');

  // Função para remover classe ativa de todos os links
  function removeActiveClass() {
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
  }

  // Função para adicionar classe ativa ao link clicado
  function setActiveLink(link) {
    removeActiveClass();
    link.classList.add('active');
  }

  // Adicionar event listeners aos links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      setActiveLink(this);
    });
  });

  // Verificar se estamos numa página específica e marcar o link correspondente
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // Se nenhum link estiver ativo (página inicial), ativar o primeiro link
  const hasActiveLink = Array.from(navLinks).some(link => link.classList.contains('active'));
  if (!hasActiveLink && currentPage === 'index.html') {
    navLinks[0].classList.add('active');
  }
});
