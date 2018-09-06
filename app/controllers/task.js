import Controller from '@ember/controller';

export default Controller.extend({

  actions: {

    update() {
      this.store.findRecord('task', this.get('task_id')).then(function (task) {
        task.set('done', true);
        task.save(); // => PATCH to '/tasks/1'
      });
    },
T
  }
});
