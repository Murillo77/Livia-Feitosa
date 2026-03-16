(function () {
  'use strict';

  // Animações de entrada: ativar após o load
  var body = document.getElementById('body');
  if (body) {
    function addPageLoaded() {
      body.classList.add('page-loaded');
    }
    if (document.readyState === 'complete') {
      setTimeout(addPageLoaded, 50);
    } else {
      window.addEventListener('load', function () { setTimeout(addPageLoaded, 50); });
    }
  }

  // Seções: animar ao entrar no viewport
  var sections = document.querySelectorAll('.section-entrance');
  if (sections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    sections.forEach(function (el) { observer.observe(el); });
  } else {
    sections.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Ano no footer
  var anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Hero: rolar palavras (loop contínuo, volta ao início imperceptível)
  var heroRollInner = document.getElementById('hero-roll-inner');
  if (heroRollInner) {
    var heroWords = heroRollInner.querySelectorAll('.hero-roll-word');
    var heroIndex = 0;
    var duration = 600;
    function rollHeroWord() {
      heroIndex++;
      heroRollInner.style.transform = 'translateY(-' + heroIndex + 'em)';
      if (heroIndex === heroWords.length - 1) {
        setTimeout(function () {
          heroRollInner.style.transition = 'none';
          heroRollInner.style.transform = 'translateY(0)';
          heroIndex = 0;
          heroRollInner.offsetHeight;
          heroRollInner.style.transition = '';
        }, duration);
      }
    }
    setInterval(rollHeroWord, 2500);
  }

  // Menu mobile
  var btnMenu = document.getElementById('btn-menu');
  var menuMobile = document.getElementById('menu-mobile');
  if (btnMenu && menuMobile) {
    btnMenu.addEventListener('click', function () {
      var isOpen = !menuMobile.classList.contains('hidden');
      menuMobile.classList.toggle('hidden');
      btnMenu.setAttribute('aria-expanded', !isOpen);
      btnMenu.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    });

    // Fechar menu ao clicar em um link (mobile/tablet)
    menuMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuMobile.classList.add('hidden');
        btnMenu.setAttribute('aria-expanded', 'false');
        btnMenu.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  // Sombra no header ao rolar
  var header = document.getElementById('header');
  if (header) {
    function onScroll() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Scroll suave para âncoras (navegadores que não suportam scroll-margin)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var href = anchor.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Botão voltar ao topo: mostrar/ocultar ao rolar
  var btnTopo = document.getElementById('btn-topo');
  if (btnTopo) {
    function toggleBtnTopo() {
      if (window.scrollY > 400) {
        btnTopo.classList.remove('opacity-0', 'pointer-events-none');
        btnTopo.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        btnTopo.classList.add('opacity-0', 'pointer-events-none');
        btnTopo.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }
    window.addEventListener('scroll', toggleBtnTopo, { passive: true });
    toggleBtnTopo();
  }
})();
