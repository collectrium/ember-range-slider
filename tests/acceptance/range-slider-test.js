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

    expectWithin(assert, 26, startHandlePositionRounded('.example-1'), 1, 'start handle is positioned (Example 1)');
    expectWithin(assert, 70, endHandlePositionRounded('.example-1'), 1, 'end handle is positioned (Example 1)');
    expectWithin(assert, 26, activeRangeRounded('.example-1').start, 1, 'active range start is positioned (Example 1)');
    expectWithin(assert, 70, activeRangeRounded('.example-1').end, 1, 'active range end is positioned (Example 1)');

    expectWithin(assert, 26, startHandlePositionRounded('.example-2'), 1, 'start handle is positioned (Example 2)');
    expectWithin(assert, 70, endHandlePositionRounded('.example-2'), 1, 'end handle is positioned (Example 2)');
    expectWithin(assert, 26, activeRangeRounded('.example-2').start, 1, 'active range start is positioned (Example 2)');
    expectWithin(assert, 70, activeRangeRounded('.example-2').end, 1, 'active range end is positioned (Example 2)');

    expectWithin(assert, 25, startHandlePositionRounded('.example-3'), 1, 'start handle is positioned (Example 3)');
    expectWithin(assert, 75, endHandlePositionRounded('.example-3'), 1, 'end handle is positioned (Example 3)');
    expectWithin(assert, 25, activeRangeRounded('.example-3').start, 1, 'active range start is positioned (Example 3)');
    expectWithin(assert, 75, activeRangeRounded('.example-3').end, 1, 'active range end is positioned (Example 3)');

    expectWithin(assert, 26, startHandlePositionRounded('.example-4'), 1, 'start handle is positioned (Example 4)');
    expectWithin(assert, 70, endHandlePositionRounded('.example-4'), 1, 'end handle is positioned (Example 4)');
    expectWithin(assert, 26, activeRangeRounded('.example-4').start, 1, 'active range start is positioned (Example 4)');
    expectWithin(assert, 70, activeRangeRounded('.example-4').end, 1, 'active range end is positioned (Example 4)');
  });
});

test('slide start handle interaction with rangeChanging action', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 26, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
  });
  rawMouseDown(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start");
  andThen(function() {
    expectWithin(assert, 26, startHandlePositionRounded('.example-1'), 1, 'after mousedown start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 50, 'after mousedown bound start text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start", -4, 0);
  andThen(function() {
    expectWithin(assert, 23, startHandlePositionRounded('.example-1'), 1, 'after mousemove lower start handle position');
    expectWithin(assert, 2765, boundStartTextValue('.example-1'), 50, 'after mousemove lower bound start text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start", 6, 0);
  andThen(function() {
    expectWithin(assert, 29, startHandlePositionRounded('.example-1'), 1, 'after mousemove higher start handle position');
    expectWithin(assert, 3150, boundStartTextValue('.example-1'), 50, 'after mousemove higher bound start text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start", 0, -5);
  andThen(function() {
    expectWithin(assert, 29, startHandlePositionRounded('.example-1'), 1, 'after mousemove vertical start handle position');
    expectWithin(assert, 3150, boundStartTextValue('.example-1'), 50, 'after mousemove vertical bound start text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start");
  andThen(function() {
    expectWithin(assert, 29, startHandlePositionRounded('.example-1'), 1, 'after mouseup start handle position');
    expectWithin(assert, 3150, boundStartTextValue('.example-1'), 50, 'after mouseup bound start text');
  });
});

test('slide end handle interaction with rangeChanging action', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 70, endHandlePositionRounded('.example-1'), 1, 'before interaction end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 1, 'before interaction bound end text');
  });
  rawMouseDown(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end");
  andThen(function() {
    expectWithin(assert, 70, endHandlePositionRounded('.example-1'), 1, 'after mousedown end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 50, 'after mousedown bound end text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end", 4.5, 0);
  andThen(function() {
    expectWithin(assert, 74, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 6295, boundEndTextValue('.example-1'), 50, 'after mousemove higher bound end text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end", -6, 0);
  andThen(function() {
    expectWithin(assert, 69, endHandlePositionRounded('.example-1'), 1, 'after mousemove lower end handle position');
    expectWithin(assert, 5878, boundEndTextValue('.example-1'), 50, 'after mousemove lower bound end text');
  });
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end", 0, 10);
  andThen(function() {
    expectWithin(assert, 69, endHandlePositionRounded('.example-1'), 1, 'after mousemove vertical end handle position');
    expectWithin(assert, 5878, boundEndTextValue('.example-1'), 50, 'after mousemove vertical bound end text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end");
  andThen(function() {
    expectWithin(assert, 69, endHandlePositionRounded('.example-1'), 1, 'after mouseup end handle position');
    expectWithin(assert, 5878, boundEndTextValue('.example-1'), 50, 'after mouseup bound end text');
  });
});

test('check when two ranges in end positions', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 26, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 70, endHandlePositionRounded('.example-1'), 1, 'before interaction end handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 1, 'before interaction bound end text');
  });
  rawMouseDown(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end");
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end", 30, 0);
  andThen(function() {
    expectWithin(assert, 26, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 100, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 8000, boundEndTextValue('.example-1'), 50, 'after mousemove higher bound end text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end");
  rawMouseDown(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start");
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start", 74, 0);
  andThen(function() {
    expectWithin(assert, 100, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 100, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 8000, boundStartTextValue('.example-1'), 50, 'before interaction bound start text');
    expectWithin(assert, 8000, boundEndTextValue('.example-1'), 50, 'after mousemove higher bound end text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start");
  rawMouseDown(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start");
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start", -73.5, 0);
  andThen(function() {
    expectWithin(assert, 26, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 100, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 50, 'before interaction bound start text');
    expectWithin(assert, 8000, boundEndTextValue('.example-1'), 50, 'after mousemove higher bound end text');
  });
});

test('check when two ranges in start positions', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 27, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 70, endHandlePositionRounded('.example-1'), 1, 'before interaction end handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 1, 'before interaction bound end text');
  });
  rawMouseDown(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start");
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start", -27, 0);
  andThen(function() {
    expectWithin(assert, 0, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 70, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 1200, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 50, 'after mousemove higher bound end text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--start");
  rawMouseDown(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end");
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end", -71, 0);
  andThen(function() {
    expectWithin(assert, 0, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 0, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 1200, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 1200, boundEndTextValue('.example-1'), 50, 'after mousemove higher bound end text');
  });
  rawMouseUp(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end");
  rawMouseDown(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end");
  rawMouseMove(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-handle--end", 70.5, 0);
  andThen(function() {
    expectWithin(assert, 0, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 70, endHandlePositionRounded('.example-1'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 1200, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 50, 'after mousemove higher bound end text');
  });

});

test('tap interaction', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 26, startHandlePositionRounded('.example-1'), 1, 'before interaction start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-1'), 1, 'before interaction bound start text');
    expectWithin(assert, 70, endHandlePositionRounded('.example-1'), 1, 'before interaction end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 1, 'before interaction bound end text');
  });
  rawTap(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-base", { x: -5, y: 0});
  andThen(function() {
    expectWithin(assert, 44, startHandlePositionRounded('.example-1'), 1, 'after lower tap start handle position');
    expectWithin(assert, 4250, boundStartTextValue('.example-1'), 50, 'after lower tap bound start text');
    expectWithin(assert, 70, endHandlePositionRounded('.example-1'), 1, 'after lower tap end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-1'), 1, 'after lower tap bound end text');
  });
  rawTap(".example-1 .EmberRangeSlider", ".example-1 .EmberRangeSlider-base", { x: 23.5, y: 0});
  andThen(function() {
    expectWithin(assert, 44, startHandlePositionRounded('.example-1'), 1, 'after higher tap start handle position');
    expectWithin(assert, 4250, boundStartTextValue('.example-1'), 50, 'after higher tap bound start text');
    expectWithin(assert, 73, endHandlePositionRounded('.example-1'), 1, 'after higher tap end handle position');
    expectWithin(assert, 6185, boundEndTextValue('.example-1'), 50, 'after higher tap bound end text');
  });
});

test('slide start handle interaction with rangeChanged action', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 26, startHandlePositionRounded('.example-2'), 1, 'before interaction start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-2'), 1, 'before interaction bound start text');
    expectIsSliding(assert, '.example-2', 'false', 'before interaction');
  });
  rawMouseDown(".example-2 .EmberRangeSlider", ".example-2 .EmberRangeSlider-handle--start");
  andThen(function() {
    expectWithin(assert, 26, startHandlePositionRounded('.example-2'), 1, 'after mousedown start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-2'), 50, 'after mousedown bound start text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousedown');
  });
  rawMouseMove(".example-2 .EmberRangeSlider", ".example-2 .EmberRangeSlider-handle--start", -10, 0);
  andThen(function() {
    expectWithin(assert, 16, startHandlePositionRounded('.example-2'), 1, 'after mousemove lower start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-2'), 50, 'after mousemove lower bound start text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousemove lower');
  });
  rawMouseMove(".example-2 .EmberRangeSlider", ".example-2 .EmberRangeSlider-handle--start", 13, 0);
  andThen(function() {
    expectWithin(assert, 28, startHandlePositionRounded('.example-2'), 1, 'after mousemove higher start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-2'), 50, 'after mousemove higher bound start text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousemove higher');
  });
  rawMouseUp(".example-2 .EmberRangeSlider", ".example-2 .EmberRangeSlider-handle--start");
  andThen(function() {
    expectWithin(assert, 28, startHandlePositionRounded('.example-2'), 1, 'after mouseup start handle position');
    expectWithin(assert, 3150, boundStartTextValue('.example-2'), 50, 'after mouseup bound start text');
    expectIsSliding(assert, '.example-2', 'false', 'after mouseup');
  });
});

test('slide end handle interaction with rangeChanged action', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 70, endHandlePositionRounded('.example-2'), 1, 'before interaction end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-2'), 1, 'before interaction bound end text');
    expectIsSliding(assert, '.example-2', 'false', 'before interaction');
  });
  rawMouseDown(".example-2 .EmberRangeSlider", ".example-2 .EmberRangeSlider-handle--end");
  andThen(function() {
    expectWithin(assert, 70, endHandlePositionRounded('.example-2'), 1, 'after mousedown end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-2'), 50, 'after mousedown bound end text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousedown');
  });
  rawMouseMove(".example-2 .EmberRangeSlider", ".example-2 .EmberRangeSlider-handle--end", -10, 0);
  andThen(function() {
    expectWithin(assert, 60, endHandlePositionRounded('.example-2'), 1, 'after mousemove lower end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-2'), 50, 'after mousemove lower bound end text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousemove lower');
  });
  rawMouseMove(".example-2 .EmberRangeSlider", ".example-2 .EmberRangeSlider-handle--end", 13, 0);
  andThen(function() {
    expectWithin(assert, 73, endHandlePositionRounded('.example-2'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-2'), 50, 'after mousemove higher bound end text');
    expectIsSliding(assert, '.example-2', 'true', 'after mousemove higher');
  });
  rawMouseUp(".example-2 .EmberRangeSlider", ".example-2 .EmberRangeSlider-handle--end");
  andThen(function() {
    expectWithin(assert, 73, endHandlePositionRounded('.example-2'), 1, 'after mouseup end handle position');
    expectWithin(assert, 6150, boundEndTextValue('.example-2'), 50, 'after mouseup bound end text');
    expectIsSliding(assert, '.example-2', 'false', 'after mouseup');
  });
});


test('slide start handle interaction with roundingHandler action', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 22, startHandlePositionRounded('.example-6'), 1, 'before interaction start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-6'), 1, 'before interaction bound start text');
  });
  rawMouseDown(".example-6 .EmberRangeSlider", ".example-6 .EmberRangeSlider-handle--start");
  andThen(function() {
    expectWithin(assert, 22, startHandlePositionRounded('.example-6'), 1, 'after mousedown start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-6'), 1, 'after mousedown bound start text');
  });
  rawMouseMove(".example-6 .EmberRangeSlider", ".example-6 .EmberRangeSlider-handle--start", 10, 0);
  andThen(function() {
    expectWithin(assert, 32, startHandlePositionRounded('.example-6'), 1, 'after mousemove lower start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-6'), 1, 'after mousemove lower bound start text');
  });
  rawMouseMove(".example-6 .EmberRangeSlider", ".example-6 .EmberRangeSlider-handle--start", 10, 0);
  andThen(function() {
    expectWithin(assert, 42, startHandlePositionRounded('.example-6'), 1, 'after mousemove lower start handle position');
    expectWithin(assert, 4000, boundStartTextValue('.example-6'), 1, 'after mousemove lower bound start text');
  });
  rawMouseUp(".example-6 .EmberRangeSlider", ".example-6 .EmberRangeSlider-handle--start");
  andThen(function() {
    expectWithin(assert, 42, startHandlePositionRounded('.example-6'), 1, 'after mouseup start handle position');
    expectWithin(assert, 4000, boundStartTextValue('.example-6'), 1, 'after mouseup bound start text');
  });
});

test('slide end handle interaction with roundingHandler action', function(assert) {
  visit('/');
  andThen(function() {
    expectWithin(assert, 56, endHandlePositionRounded('.example-6'), 1, 'before interaction end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-6'), 1, 'before interaction bound end text');
  });
  rawMouseDown(".example-6 .EmberRangeSlider", ".example-6 .EmberRangeSlider-handle--end");
  andThen(function() {
    expectWithin(assert, 56, endHandlePositionRounded('.example-6'), 1, 'after mousedown end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-6'), 1, 'after mousedown bound end text');
  });
  rawMouseMove(".example-6 .EmberRangeSlider", ".example-6 .EmberRangeSlider-handle--end", 4, 0);
  andThen(function() {
    expectWithin(assert, 60, endHandlePositionRounded('.example-6'), 1, 'after mousemove lower end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-6'), 1, 'after mousemove lower bound end text');
  });
  rawMouseMove(".example-6 .EmberRangeSlider", ".example-6 .EmberRangeSlider-handle--end", 15, 0);
  andThen(function() {
    expectWithin(assert, 75, endHandlePositionRounded('.example-6'), 1, 'after mousemove higher end handle position');
    expectWithin(assert, 7000, boundEndTextValue('.example-6'), 1, 'after mousemove higher bound end text');
  });
  rawMouseUp(".example-6 .EmberRangeSlider", ".example-6 .EmberRangeSlider-handle--end");
  andThen(function() {
    expectWithin(assert, 75, endHandlePositionRounded('.example-6'), 1, 'after mouseup end handle position');
    expectWithin(assert, 7000, boundEndTextValue('.example-6'), 1, 'after mouseup bound end text');
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
    expectWithin(assert, 26, startHandlePositionRounded('.example-4'), 1, 'before interaction start handle position');
    expectWithin(assert, 3000, boundStartTextValue('.example-4'), 1, 'before interaction bound start text');
    expectWithin(assert, 3000, boundStartInputValue('.example-4'), 1, 'before interaction bound start input');
    expectWithin(assert, 70, endHandlePositionRounded('.example-4'), 1, 'before interaction end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-4'), 1, 'before interaction bound end text');
    expectWithin(assert, 6000, boundEndInputValue('.example-4'), 1, 'before interaction bound end input');
  });
  fillIn('.example-4 input:eq(0)', '3200');
  keyEvent('.example-4 input:eq(0)', 'keyup', 13); // enter
  andThen(function() {
    expectWithin(assert, 29, startHandlePositionRounded('.example-4'), 1, 'after update start text field, start handle position');
    expectWithin(assert, 3200, boundStartTextValue('.example-4'), 1, 'after update start text field, bound start text');
    expectWithin(assert, 3200, boundStartInputValue('.example-4'), 1, 'after update start text field, bound start input');
    expectWithin(assert, 70, endHandlePositionRounded('.example-4'), 1, 'after update start text field, end handle position');
    expectWithin(assert, 6000, boundEndTextValue('.example-4'), 1, 'after update start text field, bound end text');
    expectWithin(assert, 6000, boundEndInputValue('.example-4'), 1, 'after update start text field, bound end input');
  });
  fillIn('.example-4 input:eq(1)', '5000');
  keyEvent('.example-4 input:eq(1)', 'keyup', 13); // enter
  andThen(function() {
    expectWithin(assert, 29, startHandlePositionRounded('.example-4'), 1, 'after update end text field, start handle position');
    expectWithin(assert, 3200, boundStartTextValue('.example-4'), 1, 'after update end text field, bound start text');
    expectWithin(assert, 3200, boundStartInputValue('.example-4'), 1, 'after update end text field, bound start input');
    expectWithin(assert, 55, endHandlePositionRounded('.example-4'), 1, 'after update end text field, end handle position');
    expectWithin(assert, 5000, boundEndTextValue('.example-4'), 1, 'after update end text field, bound end text');
    expectWithin(assert, 5000, boundEndInputValue('.example-4'), 1, 'after update end text field, bound end input');
  });
  rawPan(".example-4 .EmberRangeSlider", '.example-4 .EmberRangeSlider-handle--start', -6, 0);
  andThen(function() {
    expectWithin(assert, 23, startHandlePositionRounded('.example-4'), 1, 'after slide start handle, start handle position');
    expectWithin(assert, 2796, boundStartTextValue('.example-4'), 50, 'after slide start handle, bound start text');
    expectWithin(assert, 2796, boundStartInputValue('.example-4'), 50, 'after slide start handle, bound start input');
    expectWithin(assert, 55, endHandlePositionRounded('.example-4'), 1, 'after slide start handle, end handle position');
    expectWithin(assert, 5000, boundEndTextValue('.example-4'), 1, 'after slide start handle, bound end text');
    expectWithin(assert, 5000, boundEndInputValue('.example-4'), 50, 'after slide start handle, bound end input');
  });
  rawPan(".example-4 .EmberRangeSlider", '.example-4 .EmberRangeSlider-handle--end', -5.5, 0);
  andThen(function() {
    expectWithin(assert, 23, startHandlePositionRounded('.example-4'), 1, 'after slide end handle, start handle position');
    expectWithin(assert, 2796, boundStartTextValue('.example-4'), 50, 'after slide end handle, bound start text');
    expectWithin(assert, 2796, boundStartInputValue('.example-4'), 50, 'after slide end handle, bound start input');
    expectWithin(assert, 50, endHandlePositionRounded('.example-4'), 1, 'after slide end handle, end handle position');
    expectWithin(assert, 4600, boundEndTextValue('.example-4'), 50, 'after slide end handle, bound end text');
    expectWithin(assert, 4600, boundEndInputValue('.example-4'), 50, 'after slide end handle, bound end input');
  });
});
