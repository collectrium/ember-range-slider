import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import {
  startHandlePositionRounded,
  endHandlePositionRounded,
  activeRangeRounded,
  expectWithin,
  boundStartTextValue,
  boundEndTextValue,
  boundStartInputValue,
  boundEndInputValue,
  expectIsSliding
} from '../helpers/helpers';

var application;

module('Acceptance: Range Slider', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('initial rendering', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentPath(), 'index');

    assert.equal(startHandlePositionRounded('.example-1'),  91, 'start handle is positioned (Example 1)');
    assert.equal(  endHandlePositionRounded('.example-1'), 242, 'end handle is positioned (Example 1)');
    assert.equal(activeRangeRounded('.example-1').start, 91, 'active range start is positioned (Example 1)');
    assert.equal(activeRangeRounded('.example-1').end, 242, 'active range end is positioned (Example 1)');

    assert.equal(startHandlePositionRounded('.example-2'),  91, 'start handle is positioned (Example 2)');
    assert.equal(  endHandlePositionRounded('.example-2'), 242, 'end handle is positioned (Example 2)');
    assert.equal(activeRangeRounded('.example-2').start, 91, 'active range start is positioned (Example 2)');
    assert.equal(activeRangeRounded('.example-2').end, 242, 'active range end is positioned (Example 2)');

    assert.equal(startHandlePositionRounded('.example-3'),  86, 'start handle is positioned (Example 3)');
    assert.equal(  endHandlePositionRounded('.example-3'), 253, 'end handle is positioned (Example 3)');
    assert.equal(activeRangeRounded('.example-3').start, 86, 'active range start is positioned (Example 3)');
    assert.equal(activeRangeRounded('.example-3').end, 257, 'active range end is positioned (Example 3)');

    assert.equal(startHandlePositionRounded('.example-4'),  91, 'start handle is positioned (Example 4)');
    assert.equal(  endHandlePositionRounded('.example-4'), 242, 'end handle is positioned (Example 4)');
    assert.equal(activeRangeRounded('.example-4').start, 91, 'active range start is positioned (Example 4)');
    assert.equal(activeRangeRounded('.example-4').end, 242, 'active range end is positioned (Example 4)');
  });
});

test('slide start handle interaction with rangeChanging action', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 91, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
  });
  rawMouseDown(".example-1 .EmberRangeSlider-handle--start");
  andThen(function() {
    expectWithin(assert, 91, startHandlePositionRounded('.example-1'), 1, 'after mousedown start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 25, 'after mousedown bound start text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider-handle--start", -11, 0);
  andThen(function() {
    expectWithin(assert, 79, startHandlePositionRounded('.example-1'), 1, 'after mousemove lower start handle position');
    expectWithin(assert, 2765, boundStartTextValue('.example-1'), 25, 'after mousemove lower bound start text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider-handle--start", 20, 0);
  andThen(function() {
    expectWithin(assert, 99, startHandlePositionRounded('.example-1'), 1, 'after mousemove higher start handle position');
    expectWithin(assert, 3150, boundStartTextValue('.example-1'), 25, 'after mousemove higher bound start text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider-handle--start", 0, -5);
  andThen(function() {
    expectWithin(assert, 99, startHandlePositionRounded('.example-1'), 1, 'after mousemove vertical start handle position');
    expectWithin(assert, 3150, boundStartTextValue('.example-1'), 25, 'after mousemove vertical bound start text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider-handle--start");
  andThen(function() {
    expectWithin(assert, 99, startHandlePositionRounded('.example-1'), 1, 'after mouseup start handle position');
    expectWithin(assert, 3150, boundStartTextValue('.example-1'), 25, 'after mouseup bound start text');
  });
});

test('slide end handle interaction with rangeChanging action', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 242, endHandlePositionRounded('.example-1'), 1, 'before interaction end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 1, 'before interaction bound end text');
  });
  rawMouseDown(".example-1 .EmberRangeSlider-handle--end");
  andThen(function() {
    expectWithin(assert, 242, endHandlePositionRounded('.example-1'), 1, 'after mousedown end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 25, 'after mousedown bound end text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider-handle--end", 15, 0);
  andThen(function() {
    expectWithin(assert, 257, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 6295, boundEndTextValue('.example-1'), 25, 'after mousemove higher bound end text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider-handle--end", -20, 0);
  andThen(function() {
    expectWithin(assert, 237, endHandlePositionRounded('.example-1'), 1, 'after mousemove lower end handle position');
    expectWithin(assert, 5878, boundEndTextValue('.example-1'), 25, 'after mousemove lower bound end text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider-handle--end", 0, 10);
  andThen(function() {
    expectWithin(assert, 237, endHandlePositionRounded('.example-1'), 1, 'after mousemove vertical end handle position');
    expectWithin(assert, 5878, boundEndTextValue('.example-1'), 25, 'after mousemove vertical bound end text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider-handle--end");
  andThen(function() {
    expectWithin(assert, 237, endHandlePositionRounded('.example-1'), 1, 'after mouseup end handle position');
    expectWithin(assert, 5878, boundEndTextValue('.example-1'), 25, 'after mouseup bound end text');
  });
});

test('check when two ranges in start positions', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 91, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 242, endHandlePositionRounded('.example-1'), 1, 'before interaction end handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 1, 'before interaction bound end text');
  });
  rawMouseDown(".example-1 .EmberRangeSlider-handle--end");
  rawMouseMove(".example-1 .EmberRangeSlider-handle--end", 101, 0);
  andThen(function() {
    expectWithin(assert, 91, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 343, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 8000, boundEndTextValue('.example-1'), 25, 'after mousemove higher bound end text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider-handle--end");
  rawMouseDown(".example-1 .EmberRangeSlider-handle--start");
  rawMouseMove(".example-1 .EmberRangeSlider-handle--start", 253, 0);
  andThen(function() {
    expectWithin(assert, 343, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 343, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 8000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 8000, boundEndTextValue('.example-1'), 25, 'after mousemove higher bound end text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider-handle--start");
  rawMouseDown(".example-1 .EmberRangeSlider-handle--start");
  rawMouseMove(".example-1 .EmberRangeSlider-handle--start", -150, 0);
  andThen(function() {
    expectWithin(assert, 193, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 343, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 5026, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 8000, boundEndTextValue('.example-1'), 25, 'after mousemove higher bound end text');
  });
});

test('check when two ranges in end positions', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 91, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 242, endHandlePositionRounded('.example-1'), 1, 'before interaction end handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 1, 'before interaction bound end text');
  });
  rawMouseDown(".example-1 .EmberRangeSlider-handle--start");
  rawMouseMove(".example-1 .EmberRangeSlider-handle--start", -91, 0);
  andThen(function() {
    expectWithin(assert, 0, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 242, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 1200, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 25, 'after mousemove higher bound end text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider-handle--start");
  rawMouseDown(".example-1 .EmberRangeSlider-handle--end");
  rawMouseMove(".example-1 .EmberRangeSlider-handle--end", -242, 0);
  andThen(function() {
    expectWithin(assert, 0, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 0, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 1200, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 1200, boundEndTextValue('.example-1'), 25, 'after mousemove higher bound end text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider-handle--end");
  rawMouseDown(".example-1 .EmberRangeSlider-handle--end");
  rawMouseMove(".example-1 .EmberRangeSlider-handle--end", 150, 0);
  andThen(function() {
    expectWithin(assert, 0, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 150, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 1200, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 4173, boundEndTextValue('.example-1'), 25, 'after mousemove higher bound end text');
  });

});

test('tap interaction', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 91, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 242, endHandlePositionRounded('.example-1'), 1, 'before interaction end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 1, 'before interaction bound end text');
  });
  rawTap(".example-1 .EmberRangeSlider-base", { x: -20, y: 0});
  andThen(function() {
    expectWithin(assert, 151, startHandlePositionRounded('.example-1'), 1, 'after lower tap start handle position');
    expectWithin(assert, 4200, boundStartTextValue('.example-1'), 25, 'after lower tap bound start text');
    expectWithin(assert, 242, endHandlePositionRounded('.example-1'), 1, 'after lower tap end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 1, 'after lower tap bound end text');
  });
  rawTap(".example-1 .EmberRangeSlider-base", { x: 80, y: 0});
  andThen(function() {
    expectWithin(assert, 151, startHandlePositionRounded('.example-1'), 1, 'after higher tap start handle position');
    expectWithin(assert, 4200, boundStartTextValue('.example-1'), 25, 'after higher tap bound start text');
    expectWithin(assert, 252, endHandlePositionRounded('.example-1'), 1, 'after higher tap end handle position');
    expectWithin(assert, 6185, boundEndTextValue('.example-1'), 25, 'after higher tap bound end text');
  });
});

test('slide start handle interaction with rangeChanged action', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 91, startHandlePositionRounded('.example-2'), 1, 'before interaction start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-2'), 1, 'before interaction bound start text');
    expectIsSliding(assert, '.example-2', 'false', 'before interaction');
  });
  rawMouseDown(".example-2 .EmberRangeSlider-handle--start");
  andThen(function() {
    expectWithin(assert, 91, startHandlePositionRounded('.example-2'), 1, 'after mousedown start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-2'), 25, 'after mousedown bound start text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousedown');
  });
  rawMouseMove(".example-2 .EmberRangeSlider-handle--start", -11, 0);
  andThen(function() {
    expectWithin(assert, 79, startHandlePositionRounded('.example-2'), 1, 'after mousemove lower start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-2'), 25, 'after mousemove lower bound start text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousemove lower');
  });
  rawMouseMove(".example-2 .EmberRangeSlider-handle--start", 20, 0);
  andThen(function() {
    expectWithin(assert, 99, startHandlePositionRounded('.example-2'), 1, 'after mousemove higher start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-2'), 25, 'after mousemove higher bound start text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousemove higher');
  });
  rawMouseUp(".example-2 .EmberRangeSlider-handle--start");
  andThen(function() {
    expectWithin(assert, 99, startHandlePositionRounded('.example-2'), 1, 'after mouseup start handle position');
    expectWithin(assert, 3150, boundStartTextValue('.example-2'), 25, 'after mouseup bound start text');
    expectIsSliding(assert, '.example-2', 'false', 'after mouseup');
  });
});

test('slide end handle interaction with rangeChanged action', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 242, endHandlePositionRounded('.example-2'), 1, 'before interaction end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-2'), 1, 'before interaction bound end text');
    expectIsSliding(assert, '.example-2', 'false', 'before interaction');
  });
  rawMouseDown(".example-2 .EmberRangeSlider-handle--end");
  andThen(function() {
    expectWithin(assert, 242, endHandlePositionRounded('.example-2'), 1, 'after mousedown end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-2'), 25, 'after mousedown bound end text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousedown');
  });
  rawMouseMove(".example-2 .EmberRangeSlider-handle--end", -11, 0);
  andThen(function() {
    expectWithin(assert, 231, endHandlePositionRounded('.example-2'), 1, 'after mousemove lower end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-2'), 25, 'after mousemove lower bound end text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousemove lower');
  });
  rawMouseMove(".example-2 .EmberRangeSlider-handle--end", 19, 0);
  andThen(function() {
    expectWithin(assert, 250, endHandlePositionRounded('.example-2'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-2'), 25, 'after mousemove higher bound end text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousemove higher');
  });
  rawMouseUp(".example-2 .EmberRangeSlider-handle--end");
  andThen(function() {
    expectWithin(assert, 250, endHandlePositionRounded('.example-2'), 1, 'after mouseup end handle position');
    expectWithin(assert, 6150, boundEndTextValue('.example-2'), 25, 'after mouseup bound end text');
    expectIsSliding(assert, '.example-2', 'false', 'after mouseup');
  });
});

test('custom components for handles', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(Ember.$('.example-3 .EmberRangeSlider-handle--start').css('background-color'), 'rgb(0, 128, 0)', 'start handle is green');
    assert.equal(Ember.$('.example-3 .EmberRangeSlider-handle--end').css('background-color'), 'rgb(0, 0, 255)', 'end handle is blue');
  });
});

test('bound to text fields', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 91, startHandlePositionRounded('.example-4'), 1, 'before interaction start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-4'), 1, 'before interaction bound start text');
    expectWithin(assert, 3000, boundStartInputValue('.example-4'), 1, 'before interaction bound start input');
    expectWithin(assert, 242, endHandlePositionRounded('.example-4'), 1, 'before interaction end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-4'), 1, 'before interaction bound end text');
    expectWithin(assert, 6000, boundEndInputValue('.example-4'), 1, 'before interaction bound end input');
  });
  fillIn('.example-4 input:eq(0)', '3200');
  keyEvent('.example-4 input:eq(0)', 'keyup', 13); // enter
  andThen(function() {
    expectWithin(assert, 101, startHandlePositionRounded('.example-4'), 1, 'after update start text field, start handle position');
    expectWithin(assert, 3200, boundStartTextValue('.example-4'), 1, 'after update start text field, bound start text');
    expectWithin(assert, 3200, boundStartInputValue('.example-4'), 1, 'after update start text field, bound start input');
    expectWithin(assert, 242, endHandlePositionRounded('.example-4'), 1, 'after update start text field, end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-4'), 1, 'after update start text field, bound end text');
    expectWithin(assert, 6000, boundEndInputValue('.example-4'), 1, 'after update start text field, bound end input');
  });
  fillIn('.example-4 input:eq(1)', '5000');
  keyEvent('.example-4 input:eq(1)', 'keyup', 13); // enter
  andThen(function() {
    expectWithin(assert, 101, startHandlePositionRounded('.example-4'), 1, 'after update end text field, start handle position');
    expectWithin(assert, 3200, boundStartTextValue('.example-4'), 1, 'after update end text field, bound start text');
    expectWithin(assert, 3200, boundStartInputValue('.example-4'), 1, 'after update end text field, bound start input');
    expectWithin(assert, 192, endHandlePositionRounded('.example-4'), 1, 'after update end text field, end handle position');
    expectWithin(assert, 5000, boundEndTextValue('.example-4'), 1, 'after update end text field, bound end text');
    expectWithin(assert, 5000, boundEndInputValue('.example-4'), 1, 'after update end text field, bound end input');
  });
  rawPan('.example-4 .EmberRangeSlider-handle--start', -20, 0);
  andThen(function() {
    expectWithin(assert, 81, startHandlePositionRounded('.example-4'), 1, 'after slide start handle, start handle position');
    expectWithin(assert, 2796, boundStartTextValue('.example-4'), 25, 'after slide start handle, bound start text');
    expectWithin(assert, 2796, boundStartInputValue('.example-4'), 25, 'after slide start handle, bound start input');
    expectWithin(assert, 192, endHandlePositionRounded('.example-4'), 1, 'after slide start handle, end handle position');
    expectWithin(assert, 5000, boundEndTextValue('.example-4'), 1, 'after slide start handle, bound end text');
    expectWithin(assert, 5000, boundEndInputValue('.example-4'), 25, 'after slide start handle, bound end input');
  });
  rawPan('.example-4 .EmberRangeSlider-handle--end', -20, 0);
  andThen(function() {
    expectWithin(assert, 81, startHandlePositionRounded('.example-4'), 1, 'after slide end handle, start handle position');
    expectWithin(assert, 2796, boundStartTextValue('.example-4'), 25, 'after slide end handle, bound start text');
    expectWithin(assert, 2796, boundStartInputValue('.example-4'), 25, 'after slide end handle, bound start input');
    expectWithin(assert, 172, endHandlePositionRounded('.example-4'), 1, 'after slide end handle, end handle position');
    expectWithin(assert, 4590, boundEndTextValue('.example-4'), 1, 'after slide end handle, bound end text');
    expectWithin(assert, 4590, boundEndInputValue('.example-4'), 25, 'after slide end handle, bound end input');
  });
});
