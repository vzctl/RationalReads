RationalReads.Views.WorkForm = Backbone.CompositeView.extend({
  template: JST['works/work_form'],
  errorTemplate: JST['error'],

  initialize: function (options) {
    this.$el = $("<div class='centered'>");
    this.tags = options.tags;
    this.edit = options.edit;
  },

  events: {
    "submit form": "submit"
  },

  render: function () {
    var content = this.template({tags: this.tags, work: this.model, edit: this.edit});
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

  submit: function (event) {
    event.preventDefault();
    if (this.edit === false) {
      this.submitWork(event);
    } else {
      this.editWork(event);
    }
  },

  editWork: function (event) {
    var formData = $(event.currentTarget).serializeJSON();

    this.model.set(formData);
    var tags = this.getTags();
    this.model.set({taggings: tags});

    this.model.save({},
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
  },

  submitWork: function (event) {
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
