import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
   task: belongsTo('task'),
   client: belongsTo('client'),
   priorized: attr('boolean', { defaultValue: false }),
   sent: attr('boolean', { defaultValue: false }),
   sent_at: attr('date'),
   text: attr('text')
});