RationalReads.Views.CommentItem = Backbone.CompositeView.extend({

  template: JST['comments/comment_show'],

  events: {
    "click .reply": "createForm"
  },

  initialize: function (options) {
    this.work = options.work;
    this.formCreated = false;
    this.form = null;
  },

  render: function () {
    var comment = this.template({comment: this.model, depth: this.model.get("depth")});
    this.$el.html(comment);

    var $raty = this.$el.find(".raty")
      $raty.raty({
        readOnly: true,
        score: this.model.get("rating")
      });

    return this;
  },

  createForm: function () {
    if (!this.formCreated) {
      this.formCreated = true;
      var newComment = new RationalReads.Views.CommentForm({
          work: this.work,
          reply: true,
          parent_comment: this.model
        });
      this.form = newComment;
      this.$el.append(newComment.render().$el);
    }
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    if (this.form != null) {
        this.form.remove();
    }
  }

});
