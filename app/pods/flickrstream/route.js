import Ember from 'ember';

export default Ember.Route.extend({

  isRefreshing: false,

  queryParams: {
    userIds: {
      refreshModel: true,
      as: 'ids'
    },
    tagNames: {
      refreshModel: true,
      as: 'tags'
    }
  },

  actions: {
    loadMore: function() {
      if(this.get('isRefreshing')){
        return;
      }
      this.set('isRefreshing', true);
      this.refresh();
    }
  },


  model(params) {
    var _this, store, url;
    store = this.store;
    _this = this;
    url = 'https://api.flickr.com/services/feeds/photos_public.gne';
    url += '?format=json&jsoncallback=?';
    if (params.tagNames) {
      url += '&tags='+params.tagNames;
    }
    if (params.userIds) {
      url += '&ids='+params.userIds;
    }
    Ember.$.getJSON(url,function(data){
      let r;
      data.type = 'flickr_feed';
      data.id = data.title;
      store.pushPayload('flickr_feed',{data: data});
      r = store.peekRecord('flickr_feed', data.id);
      if (params.tagNames) {
        r.set('searchTags', params.tagNames);
      }

      Ember.$.each(data.items, function (i, item) {
        item.type = 'flickr_item';
        item.id = item.link;
        item.flickr_feed = data;
      });
      store.pushPayload('flickr_item',{data: data.items});
      _this.set('isRefreshing', false);
    });
    return this.store.peekAll('flickr_feed');
  }

});
