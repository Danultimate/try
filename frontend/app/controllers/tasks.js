import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    session: service('session'),
    actions: {
        updateTask(task, event) {
            window.mixpanel.track('done task', 
                                    {'task_id': task.id,
                                    'task_description': task.task_description});
            $.getJSON('https://json.geoiplookup.io').then((data) => {
                let browser_info = JSON.stringify(data, null, 2);
                let record = this.store.createRecord('interaction', {
                                action: 'done task',
                                extra_info: JSON.stringify({"type": "task",
                                            "id": task.id,
                                            "description": task.task_description}),
                                current_url: window.location.href,
                                browser_info: browser_info,
                                session_info: JSON.stringify(this.get('session').data)
                            });
                record.save()
            });
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
