import Controller from '@ember/controller';
import { inject as injectService } from '@ember/service';

export default Controller.extend({

  actions: {

    save() {
      this.get("model").save().then(() => {
        this.transitionToRoute(this.get("model"), this.get("model"))
      })
    },
  }
});
