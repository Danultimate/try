import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';

export default Controller.extend({
    
    session: service('session'),

    init() {
        this._super();
        schedule("afterRender",this,function() {
            localStorage.clear();
        });
      },
    
});
