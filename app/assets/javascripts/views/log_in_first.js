RationalReads.Views.LogInFirst = Backbone.CompositeView.extend({
  template: JST['log_in_first'],

  render: function () {
    this.$el.append(this.template());
    RationalReads.Utils.MoveTop();
    return this
  }

});
