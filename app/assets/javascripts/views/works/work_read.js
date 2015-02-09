RationalReads.Views.WorksRead = Backbone.CompositeView.extend({
  template: JST['works/headers/read_header'],
  noBooksTempalte: JST['works/display/no_books'],

  initialize: function (options) {
    this.style = "list";
    this.$el = $("<div class='centered'>");
    RationalReads.Utils.MoveTop();
  },

  render: function () {
    this.$el.html(this.template());

    if (this.collection.length > 0) {
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
    } else {
      var $table = this.$el.find("#read-works");
      $(this.noBooksTempalte()).insertAfter($table);
    }
    this.$el.find("th.rating").removeClass("headerSortUp");
    return this;
  }
});
