const views = [...document.querySelectorAll('[data-view]')];
const form = document.querySelector('#interest-form');
const errorBox = document.querySelector('#form-error');
const { validateInterest } = window.InterestValidation;

function showView(name) {
  views.forEach((view) => { view.hidden = view.dataset.view !== name; });
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
  const message = validateInterest({
    name,
    phone,
    email,
    emailValid: form.elements.email.validity.valid,
    consent,
  });
  if (message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
    errorBox.focus();
    return;
  }
  form.reset();
  showView('result');
});
