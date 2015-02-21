RationalReads.Views.WorkForm = Backbone.CompositeView.extend({
  template: JST['works/work_form'],
  errorTemplate: JST['error'],

  initialize: function (options) {
    this.$el = $("<div class='centered'>");
    this.tags = options.tags
  },

  events: {
    "submit form": "submitWork"
  },

  render: function () {
    var content = this.template({tags: this.tags});
    this.$el.html(content);
    return this;
  },

  getTags: function () {
    $checkedTags = $( "input:checkbox:checked" );
    var tags = [];

    $checkedTags.each( function(index, tag) {
      tags.push($(tag).val());
    });

    return tags;
  },

  submitWork: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();

    var newWork = new RationalReads.Models.Work();
    newWork.set(formData);
    var tags = this.getTags();
    newWork.set({taggings: tags});

    newWork.save({},
      {
        success: function (model) {
          Backbone.history.navigate("#/works/" + model.get("id"), {trigger: true})
        },
        error: function (model, response) {
          response.responseJSON.forEach ( function (error) {
            $(".errors").append(this.errorTemplate({error: error}));
            setTimeout( function () {
              $(".alert").fadeOut();
            }, 5000);

          }.bind(this));

        }.bind(this)
      }
    );
  }

});
