(function () {
  var slot = document.getElementById('rekomenduem-slot');
  if (!slot) return;
  fetch('/rekomenduem.html')
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then(function (html) {
      slot.innerHTML = html;
      // убрать из подборки ссылку на саму эту страницу
      var here = location.pathname.replace(/\/+$/, '');
      slot.querySelectorAll('a').forEach(function (a) {
        if (a.getAttribute('href').replace(/\/+$/, '') === here) {
          a.remove();
        }
      });
      if (!slot.querySelector('a')) {
        slot.style.display = 'none';
        return;
      }
      slot.classList.add('loaded');
    })
    .catch(function () {
      slot.style.display = 'none';
    });
})();
