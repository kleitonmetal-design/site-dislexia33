(function () {
  var raiz = document.documentElement;
  function ler(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function gravar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // Tema
  var btnTema = document.getElementById('btn-tema');
  function aplicarTema(t) {
    if (t) { raiz.setAttribute('data-tema', t); } else { raiz.removeAttribute('data-tema'); }
    var escuro = t === 'escuro' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
    btnTema.setAttribute('aria-pressed', String(escuro));
    btnTema.textContent = escuro ? 'Tema claro' : 'Tema escuro';
  }
  aplicarTema(ler('tema'));
  btnTema.addEventListener('click', function () {
    var escuro = btnTema.getAttribute('aria-pressed') === 'true';
    var novo = escuro ? 'claro' : 'escuro';
    gravar('tema', novo); aplicarTema(novo);
  });

  // Fonte
  var btnFonte = document.getElementById('btn-fonte');
  function aplicarFonte(f) {
    raiz.setAttribute('data-fonte', f);
    var od = f === 'opendyslexic';
    btnFonte.setAttribute('aria-pressed', String(od));
    btnFonte.textContent = od ? 'Fonte Verdana' : 'Fonte OpenDyslexic';
  }
  aplicarFonte(ler('fonte') === 'opendyslexic' ? 'opendyslexic' : 'verdana');
  btnFonte.addEventListener('click', function () {
    var novo = raiz.getAttribute('data-fonte') === 'opendyslexic' ? 'verdana' : 'opendyslexic';
    gravar('fonte', novo); aplicarFonte(novo);
  });

  // Menu do celular (gaveta)
  var topo = document.querySelector('.topo');
  var btnMenu = document.getElementById('btn-menu');
  var painel = document.getElementById('painel-lateral');
  if (topo && btnMenu && painel) {
    var largo = window.matchMedia('(min-width: 48em)');
    var fundo = document.createElement('div');
    fundo.className = 'menu-fundo';
    document.body.appendChild(fundo);
    topo.classList.add('menu-js');
    var fundoDaPagina = document.querySelectorAll('main, footer');

    function estaAberto() { return painel.classList.contains('aberto'); }
    function definirInerte(sim) {
      for (var i = 0; i < fundoDaPagina.length; i++) {
        if (sim) { fundoDaPagina[i].setAttribute('inert', ''); } else { fundoDaPagina[i].removeAttribute('inert'); }
      }
    }
    function abrir() {
      painel.classList.add('aberto');
      fundo.classList.add('aberto');
      btnMenu.setAttribute('aria-expanded', 'true');
      raiz.classList.add('menu-aberto');
      definirInerte(true);
      var primeiro = painel.querySelector('a');
      if (primeiro) { primeiro.focus(); }
    }
    function fechar(devolverFoco) {
      painel.classList.remove('aberto');
      fundo.classList.remove('aberto');
      btnMenu.setAttribute('aria-expanded', 'false');
      raiz.classList.remove('menu-aberto');
      definirInerte(false);
      if (devolverFoco) { btnMenu.focus(); }
    }
    btnMenu.addEventListener('click', function () {
      if (estaAberto()) { fechar(true); } else { abrir(); }
    });
    fundo.addEventListener('click', function () { fechar(true); });
    painel.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a) { fechar(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && estaAberto()) { fechar(true); }
    });
    function aoMudarTela() { if (largo.matches && estaAberto()) { fechar(false); } }
    if (largo.addEventListener) { largo.addEventListener('change', aoMudarTela); } else { largo.addListener(aoMudarTela); }
  }

  // Ouvir esta página
  var btnOuvir = document.getElementById('btn-ouvir');
  if (!('speechSynthesis' in window)) { btnOuvir.hidden = true; return; }
  btnOuvir.addEventListener('click', function () {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      btnOuvir.textContent = 'Ouvir esta página';
      return;
    }
    var texto = document.getElementById('conteudo').innerText;
    var fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    fala.onend = fala.onerror = function () { btnOuvir.textContent = 'Ouvir esta página'; };
    btnOuvir.textContent = 'Parar de ouvir';
    speechSynthesis.speak(fala);
  });
})();
