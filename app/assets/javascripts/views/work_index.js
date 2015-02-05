RationalReads.Views.WorksIndex = Backbone.CompositeView.extend({
  template: JST['works/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.style = "fullscreen";
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
  },

});
