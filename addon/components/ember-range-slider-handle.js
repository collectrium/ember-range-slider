import Ember from 'ember';
import layout from '../templates/components/ember-range-slider-handle';

export default Ember.Component.extend({
  layout,
  attributeBindings: ['style'],
  classNameBindings: ['isSliding']
});
