# Express and PhantomJS

Simple proof of concept of routing requests from search engine crawlers through PhantomJS to get full HTML and content of web sites heavily loaded with JavaScript, AJAX and client-side rendering.

### Prerequirements

* NodeJS
* PhantomJS


### Setup

#### Install PhantomJS

```
brew update
brew install phantomjs
```

#### Clone the repo

```
git clone /url-to-repo/
cd express_and_phantomjs
npm install
node app.js
```

A demo page would be available at `http://localhost:8888`. It contains a simple Todos app, based on [Backbone.js](http://backbonejs.org/) and [Backbone Aura](https://github.com/addyosmani/backbone-aura]). I've added four todos as a default content.

![Smaller icon](http://i.imgur.com/r667P.png "Page screenshot.")

I use PhantomJS to render this page in a headless browser and send the resulting HTML to search engine crawlers (this makes this website fully reachable for them despite of JavaScript based content rendering).

Here is a dump of server response without PhantomJS being involved:


	<!DOCTYPE html>
	<html>
	  <head>
	    <title></title>
	    <link href="/stylesheets/normalize.css" media="screen" rel="stylesheet" />
	    <link href="/stylesheets/style.css" media="screen" rel="stylesheet" />
	
	    <script data-main="javascripts/apps/todos/js/app" src="javascripts/extensions/backbone/lib/require.js"></script>
	    <script src="javascripts/config.js"></script>
	  </head>
	  <body>
	    <div id="content">
		  <header class="b-todos-header">
		    <h1>My todos</h1>
		  </header>
		  <section class="b-todos">
		    <header id="todo_form"></header>
		    <section id="todos_list"></section>
		    <footer id="todos_stats" class="b-todos-footer"></footer>
		  </section>
		</div>

		<script>
		  // Bootstrapped models for initialization
		  var todosBootstrap = [{
	        "isDone": true,
	        "text": "Write a simple Backbone.js based Todo app"
	      }, {
	        "isDone": true,
	        "text": "Move the app to a Backbone Aura platform"
	      }, {
	        "isDone": true,
	        "text": "Install PhantomJS and experiment!"
	      }, {
	        "isDone": false,
	        "text": "Profit!"
	      }];
		</script>
	  </body>
	</html>

There are no actual data in this dump, because everything is fetched and rendered by JavaScript framework.

In ExpressJS application main file, `app.js`, I added a condition to route requests from Google Bot (by detecting it's specific `User-Agent` request header) through PhantomJS, and this is how the server response looks like:

	<!DOCTYPE html>
	<html>
	  <head>
	    <title></title>
	    <link href="/stylesheets/normalize.css" media="screen" rel="stylesheet">
	    <link href="/stylesheets/style.css" media="screen" rel="stylesheet">

	    <script data-main="javascripts/apps/todos/js/app" src="javascripts/extensions/backbone/lib/require.js"></script>
	    <script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="app" src="javascripts/apps/todos/js/app.js"></script>
	    <script src="javascripts/config.js"></script>
	    <!-- And bunch of application scripts loaded by RequireJS ... -->
	  </head>
	  <body>
	    <div id="content">
	      <header class="b-todos-header">
	        <h1>My todos</h1>
	      </header>
	      <section class="b-todos">
	        <header id="todo_form">
	          <form class="b-create-todo-form">
	            <span class="b-text-input">
	              <input type="text" name="todo" placeholder="What needs to be done?">
	            </span>
	            <button style="display: none;"></button> <!-- To auto-submit form on Enter -->
	          </form>
	        </header>
	        <section id="todos_list">
	          <ul class="b-todos-list">
	            <li class="b-todos-list-item b-todos-list-item--done">
	              <input type="checkbox" checked="" />
	              <span class="b-todos-list-item-text b-todos-list-item-text--done">Write a simple Backbone.js based Todo app</span>
	              <i class="b-remove-icon"></i>
	            </li>
	            <li class="b-todos-list-item b-todos-list-item--done">
	              <input type="checkbox" checked="" />
	              <span class="b-todos-list-item-text b-todos-list-item-text--done">Move the app to a Backbone Aura platform</span>
	              <i class="b-remove-icon"></i>
	            </li>
	            <li class="b-todos-list-item b-todos-list-item--done">
	              <input type="checkbox" checked="" />
	              <span class="b-todos-list-item-text b-todos-list-item-text--done">Install PhantomJS and experiment!</span>
	              <i class="b-remove-icon"></i>
	            </li>
	            <li class="b-todos-list-item">
	              <input type="checkbox" />
	              <span class="b-todos-list-item-text">Profit!</span>
	              <i class="b-remove-icon"></i>
	            </li>
	          </ul>
	        </section>
	        <footer id="todos_stats" class="b-todos-footer">
	          <p><span class="b-todos-count">1 todo</span> left</p>
	        </footer>
	      </section>
	    </div>

	    <script>
	      // Bootstrapped models for initialization
	      var todosBootstrap = [{
	            "isDone": true,
	            "text": "Write a simple Backbone.js based Todo app"
	          }, {
	            "isDone": true,
	            "text": "Move the app to a Backbone Aura platform"
	          }, {
	            "isDone": true,
	            "text": "Install PhantomJS and experiment!"
	          }, {
	            "isDone": false,
	            "text": "Profit!"
	          }];
	    </script>
	  </body>
	</html>

PhantomJS renders the whole page, waits until all data fetched and rendered and then returns HTML contents of the page to requester. Bingo!