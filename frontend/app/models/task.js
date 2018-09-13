import Model from 'ember-data/model';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
    task_description: attr('string'),
    planned_date: attr('date'),
    num_of_clients: attr('number'),
    done: attr('boolean', { defaultValue: false }),
    excuted_date: attr('date'),
    clients: hasMany('client'),
    seller: belongsTo('seller'),
    content: belongsTo('content')
});
