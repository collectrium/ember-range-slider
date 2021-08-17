import Ember from "ember";

const coordinates = (scope) => {
  return {
    emberRangeSliderWidth: Ember.$(scope)
      .find(".EmberRangeSlider")
      .css("width")
      .replace("px", ""),
    emberRangeSliderStartLeft: Ember.$(scope)
      .find(".EmberRangeSlider-handle--start")
      .css("left")
      .replace("px", ""),
    emberRangeSliderEndLeft: Ember.$(scope)
      .find(".EmberRangeSlider-handle--end")
      .css("left")
      .replace("px", ""),
    emberRangeSliderActiveWidth: Ember.$(scope)
      .find(".EmberRangeSlider-active")
      .css("width")
      .replace("px", ""),
    emberRangeSliderActiveLeft: Ember.$(scope)
      .find(".EmberRangeSlider-active")
      .css("left")
      .replace("px", ""),
  };
};

export function startHandlePositionRounded(scope) {
  return Math.round(
    (+coordinates(scope).emberRangeSliderStartLeft /
      +coordinates(scope).emberRangeSliderWidth) *
      100
  );
}

export function endHandlePositionRounded(scope) {
  return Math.round(
    (+coordinates(scope).emberRangeSliderEndLeft /
      +coordinates(scope).emberRangeSliderWidth) *
      100
  );
}

export function activeRangeRounded(scope) {
  let left = +coordinates(scope).emberRangeSliderActiveLeft;
  let width = +coordinates(scope).emberRangeSliderActiveWidth;
  return {
    start: Math.round((left / +coordinates(scope).emberRangeSliderWidth) * 100),
    end: Math.ceil(
      ((left + width) / +coordinates(scope).emberRangeSliderWidth) * 100
    ),
  };
}

export function expectWithin(assert, expected, actual, tolerance, description) {
  assert.ok(
    Math.abs(expected - actual) <= tolerance,
    `Expected ${description} to be within ${tolerance} of ${expected} but was ${actual}`
  );
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
  let value = find(scope).find("input:eq(0)").val();
  return parseFloat(value);
}

export function boundEndInputValue(scope) {
  let value = find(scope).find("input:eq(1)").val();
  return parseFloat(value);
}

export function expectIsSliding(assert, scope, expectedText, description) {
  let text = find(scope).text();
  let match = /isSliding: (\w+)/.exec(text);
  assert.equal(
    match[1],
    expectedText,
    `Expected ${description} isSliding to be ${expectedText} but was ${match[1]}`
  );
}
