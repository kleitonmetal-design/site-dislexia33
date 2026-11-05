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


  // Menu do celular
  var topo = document.querySelector('.topo');
  var lista = document.getElementById('menu-principal');
  if (topo && lista) {
    var nav = lista.parentNode;
    var btnMenu = document.createElement('button');
    btnMenu.type = 'button';
    btnMenu.className = 'menu-toggle';
    btnMenu.textContent = 'Menu';
    btnMenu.setAttribute('aria-expanded', 'false');
    btnMenu.setAttribute('aria-controls', 'menu-principal');
    nav.parentNode.insertBefore(btnMenu, nav);
    topo.classList.add('menu-js');
    function fechar() { lista.classList.remove('aberto'); btnMenu.setAttribute('aria-expanded', 'false'); }
    btnMenu.addEventListener('click', function () {
      var abre = !lista.classList.contains('aberto');
      lista.classList.toggle('aberto', abre);
      btnMenu.setAttribute('aria-expanded', String(abre));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lista.classList.contains('aberto')) { fechar(); btnMenu.focus(); }
    });
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
