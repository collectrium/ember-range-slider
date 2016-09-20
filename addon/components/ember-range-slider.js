/* global Hammer */
import Ember from 'ember';
import layout from '../templates/components/ember-range-slider';

const { computed, isBlank, run } = Ember;
const { htmlSafe } = Ember.String;

function constrainToBetween(value, min, max) {
  value = Math.max(min, value);
  return Math.min(value, max);
}

export default Ember.Component.extend({
  layout,
  classNames: ['EmberRangeSlider'],

  /* Required input properties. These are not updated by this component per the
   * "data-down" portion of the data-down / actions-up approach.
   */
  min: null,
  max: null,
  start: null,
  end: null,

<<<<<<< HEAD
=======
  scale: 'linear',
  scaleStrategies,

  /**
   *  If true, the second value will be parsed even if selected only one.
   */
  forceValueObtaining: false,

  isDisabled: false,

  baseClassName: 'EmberRangeSlider-base',
  activeRegionClassName: 'EmberRangeSlider-active',
  handleClassName: 'EmberRangeSlider-handle',
  startHandleClassName: 'EmberRangeSlider-handle--start',
  endHandleClassName: 'EmberRangeSlider-handle--end',

  startHandleFullClassName: computed('handleClassName', 'startHandleClassName', function() {
    return `${this.get('handleClassName')} ${this.get('startHandleClassName')}`;
  }),

  endHandleFullClassName: computed('handleClassName', 'endHandleClassName', function() {
    return `${this.get('handleClassName')} ${this.get('endHandleClassName')}`;
  }),

  /* Set these properties to use another component for the
   * start and/or end slider handles
   */
  startHandleComponentKey: 'ember-range-slider-handle',
  endHandleComponentKey: 'ember-range-slider-handle',

  /* These properties are bound down to the handle components
   * so that they are aware when they are sliding.
   */
  isSlidingStartHandle: false,
  isSlidingEndHandle: false,

  /* Handle positioning is done based on percentages, and the startPercentage
   * and endPercentage CPs are responsible for converting between the provided
   * min/max/start/end values and the percentages used for layout. Their
   * setters also invoke the rangeChanging action, which should be used for
   * providing immediate feedback.
   */
  startPercentage: computed('min', 'max', 'start', {
    get() {
      let min = this.get('min');
      let max = this.get('max');
      let start = this.get('start');
      if (isBlank(start)) {
        start = min;
      }
      start = constrainToBetween(start, min, max);
      return (start - min) / (max - min) * 100;
    },
    set(key, value) {
      let updatedStart = this.getValueFromPercentage(value);
      this.sendAction('rangeChanging', {
        start: updatedStart,
        end: this.get('end')
      });
      return value;
    }
  }),
  endPercentage: computed('min', 'max', 'end', {
    get() {
      let min = this.get('min');
      let max = this.get('max');
      let end = this.get('end');
      if (isBlank(end)) {
        end = max;
      }
      end = constrainToBetween(end, min, max);
      return (end - min) / (max - min) * 100;
    },
    set(key, value) {
      let updatedEnd = this.getValueFromPercentage(value);
      this.sendAction('rangeChanging', {
        start: this.get('start'),
        end: updatedEnd
      });
      return value;
    }
  }),

  /* These three CPs are used for dynamic binding in the handlebars template.
   */
  activeRangeStyle: computed('startPercentage', 'endPercentage', function() {
    let startPercentage = this.get('startPercentage');
    let endPercentage = this.get('endPercentage');
    return htmlSafe(`left: ${startPercentage}%; right: ${100 - endPercentage}%`);
  }),
  startHandleStyle: computed('startPercentage', function() {
    let startPercentage = this.get('startPercentage');
    startPercentage = Math.round(startPercentage * 1000) / 1000;
    return htmlSafe(`left: ${startPercentage}%`);
  }),
  endHandleStyle: computed('endPercentage', function() {
    let endPercentage = this.get('endPercentage');
    endPercentage = Math.round(endPercentage * 1000) / 1000;
    return htmlSafe(`left: ${endPercentage}%`);
  }),

  didInsertElement() {
    this._super(...arguments);
    this.setupHammerEvents();
  },

  /* Set up a Hammer.js manager to handle touch and mouse events.
   * Hammer is a global that is available by virtue of this plugin
   * app.import'ing the hammer.js bower_component
   */
  setupHammerEvents() {
    this._hammer = new Hammer.Manager(this.get('element'), {
      recognizers: [
        [Hammer.Tap],
        [Hammer.Press, { time: 1 }],
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL, threshold: 1 }]
      ]
    });
    this.wirePress();
    this.wirePan();
    this.wireTap();
  },

  /* Tear down the Hammer.js manager on destroy.
   */
  willDestroyElement() {
    this._super(...arguments);
    this._hammer.destroy();
  },

  /* This next set of methods contain all the references to css class names
   * for this component. If you subclass and provide your own template with
   * different class names, override these methods.
   */
  getSliderHandleFromEventTarget(eventTarget) {
    return Ember.$(eventTarget).closest(`.${this.get('handleClassName')}`);
  },

  isStartHandle($sliderHandle) {
    return $sliderHandle.hasClass(this.get('startHandleClassName'));
  },

  isEndHandle($sliderHandle) {
    return $sliderHandle.hasClass(this.get('endHandleClassName'));
  },

  isSliderBase($element) {
    return $element.hasClass(this.get('baseClassName'));
  },

  isSliderActiveRegion($element) {
    return $element.hasClass(this.get('activeRegionClassName'));
  },

  getPercentageFromX(x) {
    let $sliderBase = this.$(`.${this.get('baseClassName')}`);
    let baseLeft = $sliderBase.offset().left;
    let baseRight = baseLeft + $sliderBase.width();
    return ((x - baseLeft) / (baseRight - baseLeft)) * 100;
  },

  /* Convert from percentage position to the numeric value in
   * terms of the passed in range min and max.
   */
  getValueFromPercentage(percentage) {
    let min = this.get('min');
    let max = this.get('max');
    return (max - min) * (percentage / 100) + min;
  },

  /* press events precede pan events, so we can use this to keep track of
   * which handle is being interacted with, start or end
   */
  wirePress() {
    this._hammer.on('press', (ev) => {
      let $sliderHandle = this.getSliderHandleFromEventTarget(ev.target);
      if (this.isStartHandle($sliderHandle)) {
        this._isMovingStartHandle = true;
        this.startSliding();
      }
      if (this.isEndHandle($sliderHandle)) {
        this._isMovingEndHandle = true;
        this.startSliding();
      }
    });

    this._hammer.on('pressup', () => {
      this.stopSliding();
    });
  },

  /* pan events get translated to a percentage position when a handle is
   * being dragged around
   */
  wirePan() {
    this._hammer.on('pan', (ev) => {
      if (this._isMovingStartHandle) {
        let startHandlePercent = this.getPercentageFromX(ev.center.x);
        let endPercentage = this.get('endPercentage');
        startHandlePercent = constrainToBetween(startHandlePercent, 0, endPercentage);
        run(() => {
          this.set('startPercentage', startHandlePercent);
        });
      }
      if (this._isMovingEndHandle) {
        let endHandlePercent = this.getPercentageFromX(ev.center.x);
        let startPercentage = this.get('startPercentage');
        endHandlePercent = constrainToBetween(endHandlePercent, startPercentage, 100);
        run(() => {
          this.set('endPercentage', endHandlePercent);
        });
      }
    });
    this._hammer.on('panend', () => {
      this.stopSliding();
    });
  },

  /* tap events are translated to a percentage position when a handle is
   * being dragged around
   */
  wireTap() {
    this._hammer.on('tap', (ev) => {
      let $target = Ember.$(ev.target);
      let tapShouldPositionHandle = this.isSliderBase($target) || this.isSliderActiveRegion($target);
      if (tapShouldPositionHandle) {
        let tappablePercent = this.getPercentageFromX(ev.center.x);
        let startPercentage = this.get('startPercentage');
        let endPercentage = this.get('endPercentage');
        let distanceFromStart = Math.abs(tappablePercent - startPercentage);
        let distanceFromEnd = Math.abs(tappablePercent - endPercentage);
        run(() => {
          if (distanceFromStart > distanceFromEnd) {
            this.set('endPercentage', tappablePercent);
          } else {
            this.set('startPercentage', tappablePercent);
          }
          this.sendRangeChanged();
        });
        return;
      }
      if (this.getSliderHandleFromEventTarget(ev.target).length === 1) {
        this.stopSliding();
      }
    });
  },

  sendRangeChanged() {
    this.sendAction('rangeChanged', {
      start: this.getValueFromPercentage(this.get('startPercentage')),
      end: this.getValueFromPercentage(this.get('endPercentage'))
    });
  },

  startSliding() {
    run(() => {
      this.set('isSlidingStartHandle', this._isMovingStartHandle);
      this.set('isSlidingEndHandle', this._isMovingEndHandle);
      this.sendAction('isSlidingChanged', true);
    });
  },

  stopSliding() {
    if (!this._isMovingStartHandle && !this._isMovingEndHandle) {
      return;
    }
    this._isMovingStartHandle = false;
    this._isMovingEndHandle = false;
    run(() => {
      this.set('isSlidingStartHandle', false);
      this.set('isSlidingEndHandle', false);
      this.sendAction('isSlidingChanged', false);
      this.sendRangeChanged();
    });
  }
});
