import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
  normalize(primaryModelClass, payload) {
    payload.type = 'flickr-item';
    payload.id = payload.link;

    payload.attributes = {};
    payload.attributes.link = payload.link;
    payload.attributes.title = payload.title;
    payload.attributes.media = payload.media;
    payload.attributes.author = payload.author;
    payload.attributes.authorid = payload.author_id;
    payload.attributes.tags = payload.tags;

    payload.relationships = {};
    payload.relationships["flickr-feed"] = {
      data: payload.flickr_feed
    };

    var html = Ember.$(Ember.$.parseHTML(payload.description));
    html.find("p").first().remove();
    payload.attributes.description = html.get(0).outerHTML;



    delete payload.title;

    return this._super(...arguments);
  }
});
