# Express and PhantomJS

Простая демонстрация возможности предоставления роботам поисковых систем полноценного контента страниц, содержимое которых отрисовывается JavaScript шаблонизаторами.

В качестве примера используется простой, всем уже набивший оскомину, модуль Todo, написанный на [Backbone.js](http://backbonejs.org/) поверх архитектуры [Backbone Aura](https://github.com/addyosmani/backbone-aura]):

![Smaller icon](http://i.imgur.com/r667P.png "Page screenshot.")

В качестве контента по умолчанию я добавил четыре модели, которые якобы «запрашиваются» с сервера при инициализации приложения.

Вот что получает обычный поисковый робот, заходя на эту страницу (без применения PhantomJS):

```html
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
```

Только базовая разметка и никаких данных. Робот не сможет корректно проиндексировать эту страницу.

Теперь попробуем, определяя по заголовку User-Agent, перенаправлять запросы от поисковых роботов на headless браузер, который отрисует страницу, выполнит все скрипты. Готовую страницу со всеми нужными данными мы просто скормим роботу, вот что он получит:

```html
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
```

Робот получает точно такую же «картинку», что и пользователь в обычном браузере.

### Как это завести

Нам потребуются:

* NodeJS (и [npm](https://github.com/isaacs/npm)) 
* PhantomJS

#### Установка

```
git clone /url-to-repo/
cd express_and_phantomjs
npm install
node app.js
```

Демо-сервер (на [Express](http://expressjs.com/)) будет доступен по адресу `http://localhost:8888`.

Далее любым удобным способом нужно эмулировать посещение страницы поисковым роботом. Вот пример как это сделать с помощью приложения [HTTP Client](http://ditchnet.org/httpclient/) для Mac:

![Smaller icon](http://imgur.com/y7EPF.png "Response screenshot.")

Указываем для заголовока User-Agent значение `Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)`.

Любуемся, экспериментируем.