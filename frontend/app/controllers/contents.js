import Controller from '@ember/controller';
import { filterBy, filter } from '@ember/object/computed';

export default Controller.extend({
    segmentedContent: filterBy('model', 'segment', 1),

});
