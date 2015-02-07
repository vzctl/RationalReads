RationalReads.Views.WorkForm = Backbone.CompositeView.extend({
  template: JST['works/work_form'],
  errorTemplate: JST['error'],

  initialize: function () {
    this.$el = $("<div class='new-work'></div>")
  },

  events: {
    "submit form": "submitWork"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submitWork: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();

    var newWork = new RationalReads.Models.Work();
    newWork.set(formData);
    newWork.save({},
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
