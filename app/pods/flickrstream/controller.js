import Ember from 'ember';

export default Ember.Controller.extend({

  users: [],
  tagOptions: [],
  userIds: '',
  tagNames: '',

  selectedUser: Ember.computed('userIds', function () {
    return this.get('userIds.length')?this.get('userIds').split(','):null;
  }),
  selectedTag: Ember.computed('tagNames', function () {
    return this.get('tagNames.length')?this.get('tagNames').split(','):null;
  }),

  currentFeed: Ember.computed('model.[]','selectedTag.[]', function () {
    var tagnames = null;
    if(this.get('tagNames')){
      tagnames=this.get('tagNames');
    }
    return this.get('model').findBy('searchTags', tagnames);
  }),

  actions: {
    createUser(user){
      this.get('users').pushObject(user);
      var users = this.get('selectedUser') || [];
      users.pushObject(user);
      this.set('userIds', users.join(','));
    },

    createTag(tag){
      this.get('tagOptions').pushObject(tag);
      var tags = this.get('selectedTag') || [];
      tags.pushObject(tag);
      this.set('tagNames', tags.join(','));
    },

    changedUser(selection){
      this.set('userIds', selection.join(','));
    },

    changedTag(selection){
      this.set('tagNames', selection.join(','));
    },

    more(){
      this.send('loadMore');
    },

    addTag(tag){
      var selectedTag = this.get('selectedTag') || [];
      var isSelected = selectedTag.contains(tag);
      var has = this.get('tagOptions').contains(tag);
      if(isSelected){
        return;
      }
      if(has){
        var tags = this.get('selectedTag') || [];
        tags.pushObject(tag);
        this.set('tagNames', tags.join(','));
      }else{
        this.send('createTag',tag);
      }
    }
  }
});
