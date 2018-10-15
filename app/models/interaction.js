import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    action: attr('string'),
    extra_info: attr('string'),
    current_url: attr('string'),
    browser_info: attr('string'),
    session_info: attr('string')
});
