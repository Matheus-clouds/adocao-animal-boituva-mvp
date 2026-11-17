const test = require('node:test');
const assert = require('node:assert/strict');
const { validateInterest } = require('../interest-validation.js');

const valid = { name: 'Ana Silva', phone: '15999990000', email: '', emailValid: true, consent: true };

test('rejects a blank name', () => {
  assert.match(validateInterest({ ...valid, name: '  ' }), /nome completo/);
});

test('rejects a blank phone', () => {
  assert.match(validateInterest({ ...valid, phone: '' }), /telefone/);
});

test('rejects an invalid optional email when provided', () => {
  assert.match(validateInterest({ ...valid, email: 'ana@', emailValid: false }), /formato do e-mail/);
});

test('rejects missing contact consent', () => {
  assert.match(validateInterest({ ...valid, consent: false }), /confirmação de contato/);
});

test('accepts valid required fields when the optional email is blank', () => {
  assert.equal(validateInterest(valid), '');
});

test('accepts a valid email when it is provided', () => {
  assert.equal(validateInterest({ ...valid, email: 'ana@example.com', emailValid: true }), '');
});

test('exposes the same validator for the browser and Node test runner', () => {
  assert.equal(globalThis.InterestValidation.validateInterest, validateInterest);
});
