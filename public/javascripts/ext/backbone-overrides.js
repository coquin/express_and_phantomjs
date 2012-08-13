// Render View using Handlebars templates
Backbone.View.prototype.render = function(data) {
  var data, compiled;

  if (this.template) {
    data = this.model ? this.model.toJSON() : (data || {});
    compiled = Handlebars.compile(this.template.join('\n'));
    this.el.innerHTML = compiled(data);
  }

  return this;
};