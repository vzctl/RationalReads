RationalReads.Views.WorksShow = Backbone.CompositeView.extend({
  template: JST['comments/headers/work_comment_header'],
  childInsertionTemplate: JST['comments/child_comment_marker'],

  initialize: function () {
    this.style = "show";
  },

  render: function () {
    this.renderWork();
    this.renderCommentForm();
    var child_comments = this.renderTopLevelComments();

    while (child_comments.length > 0) {
      var deletes = this.renderChildren(child_comments);
      deletes.sort( function (a,b) {
        return b - a;
      });

      child_comments = this.deleteArrayAt(child_comments, deletes);
    }

    return this;
  },

  renderWork: function () {
    this.$el.append("<div id='work-info'>");

    var workShow = new RationalReads.Views.WorkItem({
      model: this.model,
      style: this.style
    });

    this.addSubview('#work-info', workShow);
  },

  renderCommentForm: function () {
    this.$el.append("<div id='comment-form'>")

    var newComment = new RationalReads.Views.CommentForm({
      parent_comment: null,
      work: this.model,
      reply: false
    });

    this.addSubview('#comment-form', newComment)
  },

  renderTopLevelComments: function () {
    this.$el.append(this.template());
    this.$el.append("<div id='comment'>")
    this.model.comments().sort();
    var child_comments = [];

    this.model.comments().each(function (comment) {
      if (comment.get("parent_comment_id") === "none") {
        var commentItem = new RationalReads.Views.CommentItem({
          model: comment,
          work: this.model
        });
        this.addSubview('#comment', commentItem);
      } else {
        child_comments.push(comment);
      }
    }.bind(this));

    return child_comments
  },

  deleteArrayAt: function (child_comments, deletes) {
    deletes.forEach ( function (comment_index) {
      child_comments.splice(comment_index, 1);
    }.bind(this))

    return child_comments
  },

  renderChildren: function (child_comments) {
    var deletes = [];

    var childComments = new RationalReads.Collections.Comments();
    childComments.reset(child_comments);
    childComments.sort()

    childComments.each( function (comment, index) {
      var parent_element = this.$el.find('#' + comment.get("parent_comment_id"))
      if (parent_element.length > 0 ) {
        var commentItem = new RationalReads.Views.CommentItem({
          model: comment,
          work: this.model
        });

        if ( !(this.$el.find('#c' + comment.get("parent_comment_id")).length > 0) ) {
          var child_insertion_div = this.childInsertionTemplate({id: comment.get("parent_comment_id")});
          var parent_of_parent = $(parent_element).parent();
          $(child_insertion_div).insertAfter(parent_of_parent);
        }
        this.addSubview('#c' + comment.get("parent_comment_id"), commentItem);

        deletes.push(index);
      }
    }.bind(this));

    return deletes
  }

});
