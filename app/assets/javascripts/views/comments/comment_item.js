RationalReads.Views.CommentItem = Backbone.CompositeView.extend({

  template: JST['comments/comment_show'],

  events: {
    "click .reply": "createForm"
  },

  initialize: function (options) {
    this.work = options.work;
    this.chapter = options.chapter;
    this.formCreated = false;
    this.form = null;
    this.type = options.type;
  },

  render: function () {
    var comment = this.template({comment: this.model});
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
          chapter: this.chapter,
          reply: true,
          parent_comment: this.model,
          type: this.type
        });
      this.form = newComment;
      var form = newComment.render().$el;
      form.addClass("hidden-display");
      this.$el.append(form);
      form.slideDown("slow");
      // newComment.render().$el.appendTo(this.$el).slideDown("slow");
    }
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    if (this.form != null) {
        this.form.remove();
    }
  }

});
