/*global define */

define(['sandbox', './views/app'], function(sandbox, AppView) {

  return function(element) {
    new AppView().render().$el.appendTo(sandbox.dom.find(element));
  };

});