import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  normalize(primaryModelClass, payload) {
    payload.type = 'flickr-feed';
    payload.id = payload.title;

    payload.attributes = {};
    payload.attributes.title = payload.title;

    payload.relationships = {};
    //$.each(payload.items, function (i, item) {
    //  item.type = 'flickr-item';
    //  item.id = item.link;
    //});
    //
    //payload.relationships.items = {
    //  data: payload.items
    //};

    delete payload.title;

    return this._super(...arguments);
  }
});
