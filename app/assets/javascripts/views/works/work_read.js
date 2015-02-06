RationalReads.Views.ReadWorks = Backbone.CompositeView.extend({
  template: JST['works/read'],

  initialize: function (options) {
    this.style = "list";
  },

  render: function () {
    this.$el.html(this.template());
    this.$el.append("<div id='index'>")
    this.collection.sort()
    this.collection.each( function (work) {
      var subItem = new RationalReads.Views.WorkItem({
        model: work,
        style: this.style
      });
      this.addSubview('#index', subItem)
    }.bind(this));

    return this;
  }
});
