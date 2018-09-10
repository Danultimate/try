import LinkComponent from '@ember/routing/link-component';

export function initialize() {
  LinkComponent.reopen({
    attributeBindings: ['style']
  });
}

export default {
  name: 'link-to-helper-extend',
  initialize
};