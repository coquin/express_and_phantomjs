// Render View using Handlebars templates
Backbone.View.prototype.render = function(data) {
  var data;

  if (this.template) {
    data = this.model ? this.model.toJSON() : (data || {});
    this.el.innerHTML = this.template(data);
  }

  return this;
};