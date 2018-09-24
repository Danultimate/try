import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | terms_conditions_1', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:terms-conditions-1');
    assert.ok(route);
  });
});
