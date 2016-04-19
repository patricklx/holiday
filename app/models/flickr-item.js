import DS from 'ember-data';

export default DS.Model.extend({
  link: DS.attr(),
  media: DS.attr(),
  title: DS.attr(),
  author: DS.attr(),
  authorid: DS.attr(),
  description: DS.attr(),
  tags: DS.attr(),
  flickrFeed: DS.belongsTo('flickr-feed')
});
