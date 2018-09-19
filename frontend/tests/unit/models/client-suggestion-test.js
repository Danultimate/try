import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | client suggestion', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('client-suggestion', {});
    assert.ok(model);
  });
});
