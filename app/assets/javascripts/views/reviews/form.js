RationalReads.Views.ReviewForm = Backbone.View.extend({
  template: JST['comments/form'],
  errorTemplate: JST['comments/error'],
  successTemplate: JST['comments/show'],

  initialize: function (options) {
    this.work = options.work
    this.reply = options.reply
    this.parent_comment = options.parent_comment
  },

  events: {
    "submit .comment": "submitComment"
  },

  render: function () {
    if (this.reply) {
      var header = "Leave a reply"
    } else {
      var header = "Leave a comment"
    }

    var content = this.template({header: header});

    this.$el.html(content);

    return this;
  },

  submitComment: function (event) {
    event.preventDefault();
    var form = $(event.currentTarget);
    var textarea = form.find("textarea");
    var content = textarea.val();

    var comment = new RationalReads.Models.Comment();

    comment.set({work_id: this.work.get("id"), content: content});

    if (!this.parent_comment) {
      comment.set({parent_comment_id: this.parent_comment.get("id")});
    }

    comment.save({},
      {
        success: function(model, response) {
          var newComment = this.successTemplate({content: response.content})
          $("#comment").prepend(newComment);
        }.bind(this),
        error: function (model, response) {
          if (content.length === 0) {
            var error = "No content to submit! Type some more.";
          } else {
            var error = "You've got to log in to leave a comment!";
          }
          $(".errors").append(this.errorTemplate({error: error}));
        }.bind(this)
      }
    )
  }

});
