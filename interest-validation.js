function validateInterest({ name, phone, email, emailValid, consent }) {
  if (!name.trim()) return 'Informe seu nome completo para continuar.';
  if (!phone.trim()) return 'Informe seu telefone para que a equipe possa entrar em contato.';
  if (email.trim() && !emailValid) return 'Confira o formato do e-mail ou deixe o campo em branco.';
  if (!consent) return 'Marque a confirmação de contato para enviar seu interesse.';
  return '';
}

const interestValidation = { validateInterest };
if (typeof module !== 'undefined' && module.exports) module.exports = interestValidation;
globalThis.InterestValidation = interestValidation;
