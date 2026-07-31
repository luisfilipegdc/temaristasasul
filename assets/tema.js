/* tema.js — alternador de tema compartilhado.
   Sem localStorage: o projeto guarda estado só em memória. */
(function(){
  var btn = document.getElementById('themeBtn');
  if(!btn) return;
  var ico = document.getElementById('themeIco');
  var lbl = document.getElementById('themeLbl');
  btn.addEventListener('click', function(){
    var root = document.documentElement;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    if(ico) ico.textContent = next === 'dark' ? '☀️' : '🌙';
    if(lbl) lbl.textContent = next === 'dark' ? 'Tema claro' : 'Tema escuro';
  });
})();
