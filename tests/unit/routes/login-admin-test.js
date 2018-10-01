import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | login_admin', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:login-admin');
    assert.ok(route);
  });
});
