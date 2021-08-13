/* global Hammer */
import Ember from 'ember';
import layout from '../templates/components/ember-range-slider';
import scaleStrategies from '../utils/scale-strategies';

const { computed, isBlank, run, get, set } = Ember;
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

  scale: 'linear',
  scaleStrategies,

  onlyIntegers: false,

  baseClassName: 'EmberRangeSlider-base',
  activeRegionClassName: 'EmberRangeSlider-active',
  handleClassName: 'EmberRangeSlider-handle',
  startHandleClassName: 'EmberRangeSlider-handle--start',
  endHandleClassName: 'EmberRangeSlider-handle--end',

  startHandleFullClassName: computed('handleClassName', 'startHandleClassName', function () {
    return `${this.get('handleClassName')} ${this.get('startHandleClassName')}`;
  }),

  endHandleFullClassName: computed('handleClassName', 'endHandleClassName', function () {
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
       const scale = get(this, 'scale');
       const strategy = get(this, 'scaleStrategies')[scale];

       const min = get(this, 'min');
       const max = get(this, 'max');
       const start = get(this, 'start');
       const value = isBlank(start) ? min : start;

       const percentage = strategy.getPercentage(min, max, value);
       const limitedPercentage = constrainToBetween(percentage, 0, 100);

       if (!get(this, 'isSlidingStartHandle')) {
         set(this, 'mockStartPercentage', limitedPercentage);
       }

       return limitedPercentage;
     },
     set(key, percentage) {
       const updatedStart = this.getValueFromPercentage(percentage);
       set(this, 'mockStartPercentage', percentage);
       this.sendAction('rangeChanging', {
         start: updatedStart,
         end: get(this, 'end')
       });
       return percentage;
     }
   }),
   endPercentage: computed('min', 'max', 'end', {
     get() {
       const scale = get(this, 'scale');
       const strategy = get(this, 'scaleStrategies')[scale];

       const min = get(this, 'min');
       const max = get(this, 'max');
       const end = get(this, 'end');
       const value = isBlank(end) ? max : end;

       const percentage = strategy.getPercentage(min, max, value);
       const limitedPercentage = constrainToBetween(percentage, 0, 100);

       if (!get(this, 'isSlidingEndHandle')) {
         set(this, 'mockEndPercentage', limitedPercentage);
       }

       return limitedPercentage;
     },
     set(key, percentage) {
       const updatedEnd = this.getValueFromPercentage(percentage);
       set(this, 'mockEndPercentage', percentage);
       this.sendAction('rangeChanging', {
         start: get(this, 'start'),
         end: updatedEnd
       });
       return percentage;
     }
   }),

   /**
    *  These values is showing when handle is sliding.
    *  Used to prevent yanking of handle.
    */
   mockStartPercentage: null,
   mockEndPercentage: null,

   currentStartPercentage: computed('isSlidingStartHandle', 'startPercentage', 'mockStartPercentage', function() {
     const isSlidingStartHandle = get(this, 'isSlidingStartHandle');

     if (!isSlidingStartHandle) {
       const startPercentage = get(this, 'startPercentage');
       set(this, 'mockStartPercentage', startPercentage);
       return startPercentage;
     } else {
       return get(this, 'mockStartPercentage');
     }
   }),
   currentEndPercentage: computed('isSlidingEndHandle', 'endPercentage', 'mockEndPercentage', function() {
     const isSlidingEndHandle = get(this, 'isSlidingEndHandle');

     if (!isSlidingEndHandle) {
       const endPercentage = get(this, 'endPercentage');
       set(this, 'mockEndPercentage', endPercentage);
       return endPercentage;
     } else {
       return get(this, 'mockEndPercentage');
     }
   }),

  /* These three CPs are used for dynamic binding in the handlebars template.
   */
  activeRangeStyle: computed('currentStartPercentage', 'currentEndPercentage', function() {
    let startPercentage = this.get('currentStartPercentage');
    let endPercentage = this.get('currentEndPercentage');
    return htmlSafe(`left: ${startPercentage}%; right: ${100 - endPercentage}%`);
  }),
  startHandleStyle: computed('currentStartPercentage', function() {
    let startPercentage = this.get('currentStartPercentage'),
        endPercentage = this.get('currentEndPercentage');
    startPercentage = Math.round(startPercentage * 1000) / 1000;
    endPercentage = Math.round(endPercentage * 1000) / 1000;
    if (+startPercentage === 100 && +endPercentage === 100) {
      return htmlSafe(`left: ${startPercentage}%; z-index: 1`);
    } else {
      return htmlSafe(`left: ${startPercentage}%`);
    }
  }),
  endHandleStyle: computed('currentEndPercentage', function() {
    let endPercentage = this.get('currentEndPercentage'),
        startPercentage = this.get('currentStartPercentage');
    startPercentage = Math.round(startPercentage * 1000) / 1000;
    endPercentage = Math.round(endPercentage * 1000) / 1000;
    if (+startPercentage === 0 && +endPercentage === 0) {
      return htmlSafe(`left: ${endPercentage}%; z-index: 1`);
    } else {
      return htmlSafe(`left: ${endPercentage}%`);
    }
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
    const min = get(this, 'min');
    const max = get(this, 'max');
    const onlyIntegers = get(this, 'onlyIntegers');

    const scale = get(this, 'scale');
    const strategy = get(this, 'scaleStrategies')[scale];

    const value = strategy.getValue(min, max, percentage);
    return (onlyIntegers) ? Math.round(value) : value;
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
    let startPercentage = this.get('startPercentage');
    let endPercentage = this.get('endPercentage');
    let start = this.getValueFromPercentage(startPercentage);
    let end = this.getValueFromPercentage(endPercentage);
    this.sendAction('rangeChanged', { start, end });
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
