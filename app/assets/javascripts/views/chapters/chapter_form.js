RationalReads.Views.ChapterForm = Backbone.View.extend({
  template: JST['chapters/chapter_plus_block'],
  formTemplate: JST['chapters/chapter_form'],
  errorTemplate: JST['error'],

  events: {
    "click": "showForm",
    "submit .chapter-form": "createChapter"
  },

  render: function () {
    var content = this.template();

    this.$el.html(content);

    return this;
  },

  showForm: function () {
    $("#chapters").append(this.formTemplate());
  },

  createChapter: function (event) {
    debugger
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();

    var newChapter = new RationalReads.Models.Work();
    newChapter.set(formData);
    newChapter.save({},
      {
        success: function (model) {
          Backbone.history.navigate("#/works/" + model.get("id"), {trigger: true})
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
