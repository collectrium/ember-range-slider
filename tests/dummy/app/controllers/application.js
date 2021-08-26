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

  example5RangeStart: -100,
  example5RangeEnd: 100000,

  example6RangeStart: 3000,
  example6RangeEnd: 6000,

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
    example5RangeSliderChanging(range) {
      this.set('example5RangeStart', Math.round(range.start));
      this.set('example5RangeEnd', Math.round(range.end));
    },
    example6RangeSliderChanging(range) {
      this.set('example6RangeStart', Math.round(range.start));
      this.set('example6RangeEnd', Math.round(range.end));
    },
    example4UpdateStart(val) {
      const endRange = this.get('example4RangeEnd')

      if (val >= 1200 && val <= endRange) {
        this.set('example4RangeStart', Math.min(Math.max(1200, val), endRange));
      }
    },
    example4UpdateEnd(val) {
      const startRange = this.get('example4RangeStart')

      if (val >= startRange) {
        this.set('example4RangeEnd', Math.min(Math.max(val, startRange), 8000));
      }
    },
    example6RoundingHandle(val) {
      return parseInt((val / 1000)) * 1000;
    }
  }
});
