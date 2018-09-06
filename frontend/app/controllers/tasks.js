import Controller from '@ember/controller';

export default Controller.extend({

    actions: {
        updateTask(task, event) {
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
