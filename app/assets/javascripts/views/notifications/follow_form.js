RationalReads.Views.FollowForm = Backbone.View.extend({
  template: JST['notifications/follow_form'],
  errorTemplate: JST['error'],

  initialize: function(options) {
    this.followed = options.followed;
    this.follow = options.follow;
  },

  events: {
    "click .notification-button": "submitForm"
  },

  render: function () {
    var content = this.template({followed: this.followed});
    this.$el.html(content);
    return this;
  },

  submitForm: function (event) {
    var formData = $(event.currentTarget).serializeJSON();
    var newFollow = new RationalReads.Models.Follow();
    newFollow.set(formData);
    newFollow.set({work_id: this.model.get("id")})

    if (newFollow.get("follow_status") == "yes") {
      this.saveFollow(newFollow);
    } else {
      this.destroyFollow(this.follow);
    }
  },

  saveFollow: function (newFollow) {
    newFollow.save({},
      {
        success: function (model) {
          $("#message1").removeClass("hidden");
          $("#message2").addClass("hidden");
          this.follow = model;
        }.bind(this),
        error: function (model, response) {
          response.responseJSON.forEach ( function (error) {
            $(".errors").append(this.errorTemplate({error: error}));
          }.bind(this));

        }.bind(this)
      }
    );
  },

  destroyFollow: function (follow) {
    follow.destroy();
    $("#message2").removeClass("hidden");
    $("#message1").addClass("hidden");
    this.follow = null;
  }

});
