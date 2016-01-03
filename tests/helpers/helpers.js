import Ember from "ember";

export function startHandlePositionRounded(scope) {
  return Math.round(Ember.$(scope).find('.EmberRangeSlider-handle--start').position().left);
}

export function endHandlePositionRounded(scope) {
  return Math.round(Ember.$(scope).find('.EmberRangeSlider-handle--end').position().left);
}

export function activeRangeRounded(scope) {
  let left = Ember.$(scope).find('.EmberRangeSlider-active').position().left;
  let width = Ember.$(scope).find('.EmberRangeSlider-active').width();
  return {
    start: Math.round(left),
    end: Math.round(left + width)
  };
}

export function expectWithin(assert, expected, actual, tolerance, description) {
  assert.ok(Math.abs(expected - actual) <= tolerance, `Expected ${description} to be within ${tolerance} of ${expected} but was ${actual}`);
}

export function boundStartTextValue(scope) {
  let text = find(scope).text();
  let match = /start: ([0-9.]+)/.exec(text);
  return parseFloat(match[1]);
}

export function boundEndTextValue(scope) {
  let text = find(scope).text();
  let match = /end: ([0-9.]+)/.exec(text);
  return parseFloat(match[1]);
}

export function boundStartInputValue(scope) {
  let value = find(scope).find('input:eq(0)').val();
  return parseFloat(value);
}

export function boundEndInputValue(scope) {
  let value = find(scope).find('input:eq(1)').val();
  return parseFloat(value);
}

export function expectIsSliding(assert, scope, expectedText, description) {
  let text = find(scope).text();
  let match = /isSliding: (\w+)/.exec(text);
  assert.equal(match[1], expectedText, `Expected ${description} isSliding to be ${expectedText} but was ${match[1]}`);
}
