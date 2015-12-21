import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['CustomHandle', 'CustomHandle--start'],
  classNameBindings: ['isSliding'],
  attributeBindings: ['style'],
  isSliding: false
});
