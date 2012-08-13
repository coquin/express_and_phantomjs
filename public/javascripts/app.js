/*global
  TodosCollection: true
  TodosView: true
  TodoFormView: true
  TodosCountView: true
*/
$(function() {
  var todosCollection = new TodosCollection(),
      todosView = new TodosView({ collection: todosCollection }),
      todoFormView = new TodoFormView({ collection: todosCollection }),
      todosCountView = new TodosCountView({ collection: todosCollection });

  $('.b-todos')
      .append(todoFormView.render().el)
      .append(todosView.render().el);

  $('.b-todos-footer')
      .append(todosCountView.render().el);

  todosCollection.fetch();
});