RationalReads.Collections.Comments = Backbone.Collection.extend({
  model: RationalReads.Models.Comment,

  comparator: function (comment) {
    var date = new Date(comment.get("created_at"))
    return -date.getTime();
  }
});
