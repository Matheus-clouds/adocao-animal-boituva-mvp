const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { validateInterest } = require('../interest-validation.js');

afterEach(() => {
  delete global.document;
  delete global.window;
  delete require.cache[require.resolve(path.join(__dirname, '..', 'app.js'))];
});

function createElement(properties = {}) {
  return {
    hidden: false,
    dataset: {},
    listeners: {},
    addEventListener(type, callback) { this.listeners[type] = callback; },
    focus() { this.focused = true; },
    ...properties,
  };
}

function loadApplication() {
  const home = createElement({ dataset: { view: 'home' } });
  const profile = createElement({ dataset: { view: 'profile' }, hidden: true });
  const result = createElement({ dataset: { view: 'result' }, hidden: true });
  const form = createElement({
    elements: {
      name: { value: 'Ana Silva' },
      phone: { value: '15999990000' },
      email: { value: '', validity: { valid: true } },
      'contact-ok': { checked: true },
    },
    reset() { this.wasReset = true; },
  });
  const errorBox = createElement({ textContent: '' });
  const headings = {
    '#home-title': createElement(),
    '#profile-title': createElement(),
    '#result-title': createElement(),
  };
  const profileLink = createElement({ dataset: { show: 'profile' } });
  const showControls = [profileLink];
  const staffLink = createElement();
  const staffNote = createElement({ hidden: true });
  const selectors = {
    '#interest-form': form,
    '#form-error': errorBox,
    '#staff-link': staffLink,
    '#staff-note': staffNote,
    ...headings,
  };
  const document = {
    querySelectorAll(selector) {
      if (selector === '[data-view]') return [home, profile, result];
      if (selector === '[data-show]') return showControls;
      return [];
    },
    querySelector(selector) { return selectors[selector] || null; },
  };
  const appPath = path.join(__dirname, '..', 'app.js');
  global.document = document;
  global.window = { InterestValidation: { validateInterest }, scrollTo() {} };
  delete require.cache[require.resolve(appPath)];
  require(appPath);
  return { home, profile, result, form, errorBox, headings, profileLink, staffLink, staffNote };
}

test('invalid form remains on profile and announces a helpful error', () => {
  const app = loadApplication();
  app.profileLink.listeners.click({ preventDefault() {} });
  app.form.elements.name.value = ' ';
  let prevented = false;
  app.form.listeners.submit({ preventDefault() { prevented = true; } });

  assert.equal(prevented, true);
  assert.equal(app.profile.hidden, false);
  assert.equal(app.result.hidden, true);
  assert.match(app.errorBox.textContent, /nome completo/);
  assert.equal(app.errorBox.hidden, false);
  assert.equal(app.errorBox.focused, true);
  assert.equal(app.form.wasReset, undefined);
});

test('valid form resets and navigates to the confirmation result', () => {
  const app = loadApplication();
  app.profileLink.listeners.click({ preventDefault() {} });
  app.form.listeners.submit({ preventDefault() {} });

  assert.equal(app.form.wasReset, true);
  assert.equal(app.profile.hidden, true);
  assert.equal(app.result.hidden, false);
  assert.equal(app.headings['#result-title'].focused, true);
});

test('staff access notice is exposed and focused without opening a protected area', () => {
  const app = loadApplication();
  app.staffLink.listeners.click();

  assert.equal(app.staffNote.hidden, false);
  assert.equal(app.staffNote.focused, true);
  assert.equal(app.home.hidden, false);
});
