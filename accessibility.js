const textToggle = document.querySelector('#text-toggle');
const contrastToggle = document.querySelector('#contrast-toggle');
const accessibilityStatus = document.querySelector('#accessibility-status');

textToggle?.addEventListener('click', () => {
  const enabled = document.body.classList.toggle('text-large');
  textToggle.setAttribute('aria-pressed', String(enabled));
  accessibilityStatus.textContent = enabled ? 'Texto ampliado.' : 'Tamanho de texto normal.';
});

contrastToggle?.addEventListener('click', () => {
  const enabled = document.body.classList.toggle('high-contrast');
  contrastToggle.setAttribute('aria-pressed', String(enabled));
  accessibilityStatus.textContent = enabled ? 'Alto contraste ativado.' : 'Alto contraste desativado.';
});
