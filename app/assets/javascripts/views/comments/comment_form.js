RationalReads.Views.CommentForm = Backbone.View.extend({
  template: JST['comments/comment_form'],
  errorTemplate: JST['error'],
  successTemplate: JST['comments/new_comment'],

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
    var $textarea = form.find("textarea");
    var content = $textarea.val();

    var comment = new RationalReads.Models.Comment();

    comment.set({work_id: this.work.get("id"), content: content});

    if (this.parent_comment != null) {
      comment.set({parent_comment_id: this.parent_comment.get("id")});
    }

    comment.save({},
      {
        success: function(model, response) {
          var newComment = this.successTemplate({content: response.content})
          this.updateCommentCount(this.work.get("num_comments"));
          this.remove();
          if (this.reply) {
            $("#" + model.get("parent_comment_id")).append(newComment);
          } else {
            $("#comment").prepend(newComment);
          }

        }.bind(this),
        error: function (model, response) {

          response.responseJSON.forEach ( function (error) {
            $(".errors").append(this.errorTemplate({error: error}));
          }.bind(this));

        }.bind(this)
      }
    )
  },

  updateCommentCount: function (comments) {
    var newNumComments = comments + 1;

    $(".num-comments-number").animate({'opacity': 0}, 500, function () {
        $(this).text(newNumComments);
    }).animate({'opacity': 1}, 10);
  }

});
