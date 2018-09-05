import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

// export default DS.RESTAdapter.extend(DataAdapterMixin, {
//     host: 'http://localhost:5000',
//     namespace: 'api/v1',
//     authorizer: 'authorizer:application'
// });

export default DS.RESTAdapter.extend(DataAdapterMixin, {
    host: 'https://localhost:5000',
    namespace: 'api',
    session: service(), 
    authorize(xhr) {
      let { access_token } = this.get('session.data.authenticated');
      if (isPresent(access_token)) {
        xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
      }
    }
  });