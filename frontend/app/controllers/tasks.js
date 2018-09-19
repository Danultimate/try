import Controller from '@ember/controller';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';

export default Controller.extend({

    // ready: observer('currentPath', function () {   
    //     next(this, function () {
    //         window.mixpanel.track('on tasks')
    //     });
    // }),

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
