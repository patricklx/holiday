import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    var _this = this;
    Ember.$(window).bind("scroll", function() {
      _this.didScroll();
    });
  },
  willDestroy() {
    Ember.$(window).unbind("scroll");
  },

  didScroll() {
    if(this.isScrolledToBottom()) {
      this.sendAction('more');
    }
  },

  isScrolledToBottom() {
    var $ = Ember.$;
    var distanceToTop = $(document).height() - $(window).height(),
      top           = $(document).scrollTop();

    return top === distanceToTop;
  },

  actions: {
    addTag(tag){
      this.sendAction('addTag', tag);
    }
  }
});
