import Ember from 'ember';

import {
  triggerTapHelper,
  rawTapHelper,
  rawPanHelper,
  rawMouseDownHelper,
  rawMouseUpHelper,
  rawMouseMoveHelper,
} from './async';

export default function(){
  Ember.Test.registerAsyncHelper('triggerTap', triggerTapHelper);
  Ember.Test.registerAsyncHelper('rawTap', rawTapHelper);
  Ember.Test.registerAsyncHelper('rawPan', rawPanHelper);
  Ember.Test.registerAsyncHelper('rawMouseDown', rawMouseDownHelper);
  Ember.Test.registerAsyncHelper('rawMouseUp', rawMouseUpHelper);
  Ember.Test.registerAsyncHelper('rawMouseMove', rawMouseMoveHelper);
}
