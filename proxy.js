// Рендерит запрашиваемую по `url` страницу
// и возвращает её HTML
var page = require('webpage').create(),
    url = phantom.args[0];

page.onLoadFinished = function(status) {
  // В целях простой демонстрации не сильно
  // заморачиваемся и просто считаем, что за
  // три секунды страничка будет готова
  setTimeout(function() {
    // Сохраняем скриншот страницы
    page.render('page_snapshot.png');

    // и отвечаем её содержимым
    console.log(page.content);
    phantom.exit();
  }, 3000);
};

page.viewportSize = { width: 800, height: 500 };
page.open(url);