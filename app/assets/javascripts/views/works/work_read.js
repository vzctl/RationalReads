RationalReads.Views.WorksRead = Backbone.CompositeView.extend({
  template: JST['works/headers/read_header'],

  initialize: function (options) {
    this.style = "list";
    RationalReads.Utils.MoveTop();
  },

  render: function () {
    this.$el.html(this.template());
    this.collection.sort();
    this.collection.each( function (work) {
      var subItem = new RationalReads.Views.WorkItem({
        model: work,
        type: "read"
      });
      this.addSubview('tbody', subItem);
    }.bind(this));

    this.$el.find("#read-works").tablesorter({
      sortList: [[5,1]]
    });

    this.$el.find("th.rating").removeClass("headerSortUp");
    return this;
  }
});
