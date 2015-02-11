RationalReads.Views.ChapterForm = Backbone.View.extend({
  template: JST['chapters/chapter_plus_block'],
  formTemplate: JST['chapters/chapter_form'],
  shortTemplate: JST['chapters/short_plus'],
  errorTemplate: JST['error'],

  initialize: function (options) {
    this.type = options.type;
  },

  events: {
    "click": "showForm"
  },

  render: function () {
    if (this.type === "full") {
      var content = this.template();
    } else {
      var content = this.shortTemplate();
    }
    this.$el.html(content);

    return this;
  },

  showForm: function () {
    if (this.type === "short") {
      $(".chapter-form-link").remove();
    }

    $("#chapters").append(this.formTemplate());
    $(".chapter-form").submit( function (event) {
      this.createChapter(event);
    }.bind(this));
  },

  createChapter: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();

    var newChapter = new RationalReads.Models.Chapter();
    newChapter.set(formData);
    newChapter.set({work_id: this.model.get("id")})
    newChapter.save({},
      {
        success: function (model) {
          Backbone.history.navigate("#/chapters/" + model.get("id"), {trigger: true})
        },
        error: function (model, response) {
          response.responseJSON.forEach ( function (error) {
            $(".errors").append(this.errorTemplate({error: error}));
          }.bind(this));

        }.bind(this)
      }
    );
  }

});
