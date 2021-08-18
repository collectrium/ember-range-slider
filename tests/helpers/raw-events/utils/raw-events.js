/* globals PointerEvent */

import Ember from "ember";

function createTouchEvent(name, x, y /*, identifier*/) {
  const event = new PointerEvent(name, {
    view: window,
    bubbles: true,
    cancelable: true,
    button: 0,
    clientX: x,
    clientY: y,
    screenX: x,
    screenY: y,
  });
  return event;
}

function dispatchTouchEvent(el, name, x, y) {
  const event = createTouchEvent(name, x, y);
  el.dispatchEvent(event);
}

function elementCoordinates($element, $parentElement) {
  const width = $element.width();
  const height = $element.height();
  const offset = $element.offset();
  const sliderWidth = +$parentElement.css("width").replace("px", "");
  return {
    x: offset.left + width / 2 - 0.4,
    y: offset.top + height / 2,
    sliderWidth,
  };
}

export function rawTap(parentElement, selector, offsetFromCenter = null) {
  return new Ember.RSVP.Promise(function (resolve) {
    const $parent = Ember.$(parentElement);
    const $element = Ember.$(selector);
    const center = elementCoordinates($element, $parent);
    if (offsetFromCenter) {
      center.x = center.x + (center.sliderWidth * offsetFromCenter.x) / 100;
      center.y = center.y + offsetFromCenter.y;
    }
    dispatchTouchEvent($element[0], "pointerdown", center.x, center.y);
    dispatchTouchEvent($element[0], "pointerup", center.x, center.y);
    Ember.run.later(() => {
      resolve();
    }, 100);
  });
}

export function rawPan(parentElement, selector, deltaX, deltaY) {
  return new Ember.RSVP.Promise(function (resolve) {
    const $parent = Ember.$(parentElement);
    const $element = Ember.$(selector);
    const begin = elementCoordinates($element, $parent);
    const end = {
      x: begin.x + (begin.sliderWidth * deltaX) / 100,
      y: begin.y + deltaY,
    };

    dispatchTouchEvent($element[0], "pointerdown", begin.x, begin.y);
    dispatchTouchEvent($element[0], "pointermove", begin.x, begin.y);

    Ember.run.later(() => {
      dispatchTouchEvent($element[0], "pointermove", end.x, end.y);

      Ember.run.later(() => {
        dispatchTouchEvent($element[0], "pointermove", end.x, end.y);
        dispatchTouchEvent($element[0], "pointerup", end.x, end.y);

        Ember.run.later(() => {
          resolve();
        }, 100);
      }, 100);
    }, 100);
  });
}

export function rawMouseDown(parentElement, selector) {
  return new Ember.RSVP.Promise(function (resolve) {
    const $parent = Ember.$(parentElement);
    const $element = Ember.$(selector);
    const coords = elementCoordinates($element, $parent);
    dispatchTouchEvent($element[0], "pointerdown", coords.x, coords.y);
    Ember.run.later(() => {
      resolve();
    }, 100);
  });
}

export function rawMouseUp(parentElement, selector) {
  return new Ember.RSVP.Promise(function (resolve) {
    const $parent = Ember.$(parentElement);
    const $element = Ember.$(selector);
    const coords = elementCoordinates($element, $parent);
    dispatchTouchEvent($element[0], "pointerup", coords.x, coords.y);
    Ember.run.later(() => {
      resolve();
    }, 100);
  });
}

export function rawMouseMove(parentElement, selector, deltaX, deltaY) {
  return new Ember.RSVP.Promise(function (resolve) {
    const $parent = Ember.$(parentElement);
    const $element = Ember.$(selector);
    const begin = elementCoordinates($element, $parent);
    const end = {
      x: begin.x + (begin.sliderWidth * deltaX) / 100,
      y: begin.y + deltaY,
    };

    dispatchTouchEvent($element[0], "pointermove", begin.x, begin.y);
    Ember.run.later(() => {
      dispatchTouchEvent($element[0], "pointermove", end.x, end.y);
      Ember.run.later(() => {
        resolve();
      }, 100);
    }, 100);
  });
}
