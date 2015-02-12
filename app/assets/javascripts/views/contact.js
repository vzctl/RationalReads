RationalReads.Views.Contact = Backbone.CompositeView.extend({
  template: JST['contact'],

  render: function () {
    this.$el.append(this.template());
    RationalReads.Utils.MoveTop();
    return this
  }

});
