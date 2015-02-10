RationalReads.Models.Work = Backbone.Model.extend({
  urlRoot: 'api/works',

  parse: function (response) {
    this.comments().set(response.comments);
    this.chapters().set(response.chapters);
    delete response.comments;
    delete response.chapters;

    return response;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new RationalReads.Collections.Comments();
    }

    return this._comments;
  },

  chapters: function () {
    if (!this._chapters) {
      this._chapters = new RationalReads.Collections.Chapters();
    }

    return this._chapters;
  }

});
