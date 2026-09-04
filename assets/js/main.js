// BLU INTERIORES — shared behaviors
(function(){
  "use strict";

  /* ---------- header scroll state ---------- */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
    else{ header.classList.remove('is-scrolled'); }
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- mobile menu ---------- */
  var hamburger = document.querySelector('.hamburger');
  var panel = document.querySelector('.mobile-panel');
  var closeBtn = document.querySelector('.close-btn');
  function openPanel(){
    if(!panel) return;
    panel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    hamburger && hamburger.setAttribute('aria-expanded','true');
  }
  function closePanel(){
    if(!panel) return;
    panel.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger && hamburger.setAttribute('aria-expanded','false');
  }
  hamburger && hamburger.addEventListener('click', openPanel);
  closeBtn && closeBtn.addEventListener('click', closePanel);
  panel && panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closePanel); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closePanel(); });

  /* ---------- reveal on scroll (single subtle effect) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.14, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- carousels ---------- */
  document.querySelectorAll('[data-carousel]').forEach(function(root){
    var track = root.querySelector('.carousel-track');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var dotsWrap = root.querySelector('.carousel-dots');
    var slides = track ? Array.prototype.slice.call(track.children) : [];
    if(!track || !slides.length) return;

    if(dotsWrap){
      slides.forEach(function(_, i){
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Ir para item ' + (i+1));
        if(i === 0) b.classList.add('is-active');
        b.addEventListener('click', function(){ scrollToSlide(i); });
        dotsWrap.appendChild(b);
      });
    }

    function scrollToSlide(i){
      var target = slides[i];
      if(!target) return;
      track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }

    function currentIndex(){
      var scrollLeft = track.scrollLeft;
      var closest = 0, min = Infinity;
      slides.forEach(function(s, i){
        var d = Math.abs((s.offsetLeft - track.offsetLeft) - scrollLeft);
        if(d < min){ min = d; closest = i; }
      });
      return closest;
    }

    function updateDots(){
      if(!dotsWrap) return;
      var idx = currentIndex();
      Array.prototype.slice.call(dotsWrap.children).forEach(function(d,i){
        d.classList.toggle('is-active', i === idx);
      });
    }

    prev && prev.addEventListener('click', function(){ scrollToSlide(Math.max(0, currentIndex()-1)); });
    next && next.addEventListener('click', function(){ scrollToSlide(Math.min(slides.length-1, currentIndex()+1)); });
    track.addEventListener('scroll', function(){
      window.clearTimeout(track._t);
      track._t = window.setTimeout(updateDots, 80);
    }, {passive:true});

    // keyboard support: left/right arrows move the carousel when it has focus
    track.addEventListener('keydown', function(e){
      if(e.key === 'ArrowRight'){ e.preventDefault(); scrollToSlide(Math.min(slides.length-1, currentIndex()+1)); }
      if(e.key === 'ArrowLeft'){ e.preventDefault(); scrollToSlide(Math.max(0, currentIndex()-1)); }
    });
  });

  /* ---------- back to top ---------- */
  var backToTop = document.querySelector('.back-to-top');
  if(backToTop){
    document.addEventListener('scroll', function(){
      if(window.scrollY > 900){ backToTop.classList.add('is-visible'); }
      else{ backToTop.classList.remove('is-visible'); }
    }, {passive:true});
    backToTop.addEventListener('click', function(){
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }

  /* ---------- whatsapp fab ---------- */
  var waFab = document.querySelector('.wa-fab');
  var waMenu = document.querySelector('.wa-menu');
  waFab && waFab.addEventListener('click', function(){
    waMenu && waMenu.classList.toggle('is-open');
  });
  document.addEventListener('click', function(e){
    if(waMenu && waMenu.classList.contains('is-open')){
      if(!waMenu.contains(e.target) && !waFab.contains(e.target)){
        waMenu.classList.remove('is-open');
      }
    }
  });

  /* ---------- contact form validation ---------- */
  var form = document.querySelector('[data-contact-form]');
  if(form){
    var status = form.querySelector('.form-status');

    function setError(field, msg){
      var wrap = field.closest('.field');
      if(!wrap) return;
      wrap.classList.add('has-error');
      var err = wrap.querySelector('.field-error');
      if(err) err.textContent = msg;
      field.setAttribute('aria-invalid', 'true');
    }
    function clearError(field){
      var wrap = field.closest('.field');
      if(!wrap) return;
      wrap.classList.remove('has-error');
      field.removeAttribute('aria-invalid');
    }
    function isValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function isValidPhone(v){ return v.replace(/\D/g,'').length >= 10; }

    form.addEventListener('submit', function(e){
      e.preventDefault();

      // honeypot spam guard
      var hp = form.querySelector('input[name="empresa_site"]');
      if(hp && hp.value){ return; }

      var valid = true;
      var required = form.querySelectorAll('[data-required]');
      required.forEach(function(field){
        clearError(field);
        var val = (field.value || '').trim();
        if(!val){
          setError(field, 'Este campo é obrigatório.');
          valid = false;
        }
      });

      var emailField = form.querySelector('[name="email"]');
      if(emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())){
        setError(emailField, 'Informe um e-mail válido.');
        valid = false;
      }

      var phoneField = form.querySelector('[name="telefone"]');
      if(phoneField && phoneField.value.trim() && !isValidPhone(phoneField.value.trim())){
        setError(phoneField, 'Informe um telefone válido, com DDD.');
        valid = false;
      }

      var serviceField = form.querySelector('[name="servico"]');
      if(serviceField && !serviceField.value){
        setError(serviceField, 'Selecione um tipo de serviço.');
        valid = false;
      }

      if(!valid){
        if(status){
          status.textContent = 'Verifique os campos destacados antes de enviar.';
          status.classList.add('is-visible','is-error');
        }
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if(firstInvalid){ firstInvalid.focus(); }
        return;
      }

      if(status){
        status.classList.remove('is-error');
        status.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
        status.classList.add('is-visible');
      }
      form.reset();
    });
  }
})();
