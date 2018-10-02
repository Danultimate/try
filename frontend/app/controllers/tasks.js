import Controller from '@ember/controller';
import { schedule } from '@ember/runloop';

export default Controller.extend({
    init() {
        this._super();
        schedule("afterRender",this,function() {
            window.mixpanel.track('watch tasks');
        });
      },
    
    actions: {
        updateTask(task, event) {
            window.mixpanel.track('done task', 
                                    {'task_id': task.id,
                                    'task_description': task.task_description});
            let checked = event.target.checked;
            task.set('done', checked)
            task.set('excuted_date', new Date())
            task.save().catch((reason) => {
                console.log('Error @tasks.updateTask: '+ reason)
                this.set('isError', true);
            });
        },

    }
});
