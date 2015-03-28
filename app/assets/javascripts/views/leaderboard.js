RationalReads.Views.Leaderboard = Backbone.View.extend({
  template: JST['leaderboard'],

  render: function () {
    var content = this.template({users: this.collection})
    this.$el.append(content);
    RationalReads.Utils.MoveTop();
    return this
  }

});
