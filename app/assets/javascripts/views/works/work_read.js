RationalReads.Views.WorksRead = Backbone.CompositeView.extend({
  template: JST['works/headers/read_header'],

  initialize: function (options) {
    this.style = "list";
    RationalReads.Utils.MoveTop();
  },

  render: function () {
    this.$el.html(this.template());
    this.$el.append("<div id='index'>")
    this.collection.sort()
    this.collection.each( function (work) {
      var subItem = new RationalReads.Views.WorkItem({
        model: work,
        type: "read"
      });
      this.addSubview('#index', subItem)
    }.bind(this));

    return this;
  }
});
