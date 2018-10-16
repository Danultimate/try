import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  url: attr('string'),
  thumbnailUrl: attr('string'),
  media_type: attr('string'),
  description: attr('string'),
  profile: belongsTo('profile'),
  topic: belongsTo('topic'),
  segment: attr('number')
});
