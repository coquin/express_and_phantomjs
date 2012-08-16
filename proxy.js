// Renders a page specified by url
// and returns page HTML contents
var page = require('webpage').create(),
    url = phantom.args[0];

page.onLoadFinished = function(status) {
  // Just give a page 3 seconds to render
  setTimeout(function() {
    // Save page screenshot
    page.render('page_snapshot.png');

    // Respond with the page content
    console.log(page.content);
    phantom.exit();
  }, 3000);
};

page.viewportSize = { width: 800, height: 500 };
page.open(url);