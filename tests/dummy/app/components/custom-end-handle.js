import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['CustomHandle', 'CustomHandle--end'],
  classNameBindings: ['isSliding'],
  attributeBindings: ['style'],
  isSliding: false
});
