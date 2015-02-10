RationalReads.Models.Chapter = Backbone.Model.extend({
  urlRoot: "api/chapters",

  initialize: function () {
    this.type = "chapter"
  },
  
  parse: function (response) {
    this.comments().set(response.comments);
    delete response.comments;

    return response;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new RationalReads.Collections.Comments();
    }

    return this._comments;
  },
});
