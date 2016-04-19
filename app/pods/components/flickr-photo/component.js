import Ember from 'ember';

export default Ember.Component.extend({
  flickr: null,
  tags: Ember.computed('flickr.tags', function () {
    return this.get('flickr.tags').split(' ');
  }),

  actions: {
    addTag(tag){
      this.sendAction('addTag', tag);
    }
  }
});
