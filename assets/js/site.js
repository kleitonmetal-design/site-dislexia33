(function () {
  var raiz = document.documentElement;

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
})();
