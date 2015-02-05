RationalReads.Models.Work = Backbone.Model.extend({
  urlRoot: 'api/works',

  parse: function (response) {
    this.comments().set(response.comments);
    delete response.comments;

    return response
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new RationalReads.Collections.Comments();
    }

    return this._comments
  }
});
