export function initialize() {
  Ember.LinkComponent.reopen({
    attributeBindings: ['style']
  });
}

export default {
  name: 'link-to-helper-extend',
  initialize
};