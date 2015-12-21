import Ember from 'ember';

export default Ember.Controller.extend({
  example1RangeStart: 3000,
  example1RangeEnd: 6000,

  example2RangeStart: 3000,
  example2RangeEnd: 6000,
  example2IsSliding: false,

  example3RangeStart: 25,
  example3RangeEnd: 75,

  example4RangeStart: 3000,
  example4RangeEnd: 6000,

  actions: {
    example1RangeSliderChanging(range) {
      this.set('example1RangeStart', range.start);
      this.set('example1RangeEnd', range.end);
    },
    example2RangeSliderChanged(range) {
      this.set('example2RangeStart', range.start);
      this.set('example2RangeEnd', range.end);
    },
    example3RangeSliderChanging(range) {
      this.set('example3RangeStart', range.start);
      this.set('example3RangeEnd', range.end);
    },
    example4RangeSliderChanging(range) {
      this.set('example4RangeStart', Math.round(range.start));
      this.set('example4RangeEnd', Math.round(range.end));
    },
    example4UpdateStart(val) {
      this.set('example4RangeStart', Math.min(Math.max(1200, val), this.get('example4RangeEnd')));
    },
    example4UpdateEnd(val) {
      this.set('example4RangeEnd', Math.min(Math.max(val, this.get('example4RangeStart')), 8000));
    }
  }
});
