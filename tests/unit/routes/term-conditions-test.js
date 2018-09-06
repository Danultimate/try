import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | term_conditions', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:term-conditions');
    assert.ok(route);
  });
});
