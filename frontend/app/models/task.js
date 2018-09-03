import Model from 'ember-data/model';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
    task_description: attr('string'),
    date: attr('date'),
    num_to_send: attr('number'),
    done: attr('boolean', { defaultValue: false }),
    excuted_date: attr('date'),
    suggested_clients: hasMany('suggested_client'),
    seller: belongsTo('seller'),
    content: belongsTo('content')
});
