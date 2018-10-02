import Controller from '@ember/controller';
import { schedule } from '@ember/runloop';

export default Controller.extend({

    init() {
        this._super();
        schedule("afterRender",this,function() {
            window.mixpanel.track('watch orders');
        });
      },


});
