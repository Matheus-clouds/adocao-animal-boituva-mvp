const views = [...document.querySelectorAll('[data-view]')];
const form = document.querySelector('#interest-form');
const errorBox = document.querySelector('#form-error');
let lastView = 'home';

function showView(name) {
  views.forEach((view) => { view.hidden = view.dataset.view !== name; });
  lastView = name;
  const heading = document.querySelector(`#${name}-title`);
  if (heading) heading.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-show]').forEach((control) => {
  control.addEventListener('click', (event) => {
    event.preventDefault();
    showView(control.dataset.show);
  });
});

document.querySelector('#staff-link').addEventListener('click', () => {
  document.querySelector('#staff-note').hidden = false;
  document.querySelector('#staff-note').focus?.();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  errorBox.hidden = true;
  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const email = form.elements.email.value.trim();
  const consent = form.elements['contact-ok'].checked;
  let message = '';
  if (!name) message = 'Informe seu nome completo para continuar.';
  else if (!phone) message = 'Informe seu telefone para que a equipe possa entrar em contato.';
  else if (email && !form.elements.email.validity.valid) message = 'Confira o formato do e-mail ou deixe o campo em branco.';
  else if (!consent) message = 'Marque a confirmação de contato para enviar seu interesse.';
  if (message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
    errorBox.focus();
    return;
  }
  form.reset();
  showView('result');
});
