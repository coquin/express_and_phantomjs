// Renders a page specified by url
// and returns page HTML contents
var page = require('webpage').create(),
    url = phantom.args[0];

page.onLoadFinished = function(status) {
  // Save page screenshot
  page.render('page_snapshot.png');

  // Respond with the page content
  console.log(page.content);
  phantom.exit();
};

page.open(url);