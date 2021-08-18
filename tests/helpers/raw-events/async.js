import Ember from "ember";
import {
  rawTap,
  rawPan,
  rawMouseDown,
  rawMouseUp,
  rawMouseMove
} from './utils/raw-events';

// Send a tap or a click depending on if we think we're mobile or not.

export function rawTapHelper(app, parentElement, selector, offsetFromCenter = null) {
  Ember.assert('helper must be given a selector', !!selector);
  findWithAssert(selector);
  rawTap(parentElement, selector, offsetFromCenter);
  return app.testHelpers.wait();
}

export function rawPanHelper(app,parentElement, selector, deltaX, deltaY) {
  Ember.assert('helper must be given a selector', !!selector);
  findWithAssert(selector);
  rawPan(parentElement,selector, deltaX, deltaY);
  return app.testHelpers.wait();
}

export function rawMouseDownHelper(app,parentElement, selector) {
  Ember.assert('helper must be given a selector', !!selector);
  findWithAssert(selector);
  rawMouseDown(parentElement,selector);
  return app.testHelpers.wait();
}

export function rawMouseUpHelper(app, parentElement, selector) {
  Ember.assert('helper must be given a selector', !!selector);
  findWithAssert(selector);
  rawMouseUp(parentElement, selector);
  return app.testHelpers.wait();
}

export function rawMouseMoveHelper(app, parentElement, selector, deltaX, deltaY) {
  Ember.assert('helper must be given a selector', !!selector);
  findWithAssert(selector);
  rawMouseMove(parentElement, selector, deltaX, deltaY);
  return app.testHelpers.wait();
}
