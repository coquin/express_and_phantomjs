# Express and PhantomJS

Простая демонстрация возможности предоставления роботам поисковых систем полноценного контента страниц, содержимое которых отрисовывается JavaScript шаблонизаторами.

В качестве примера используется простой, всем уже набивший оскомину, модуль Todo, написанный на [Backbone.js](http://backbonejs.org/) поверх архитектуры [Backbone Aura](https://github.com/addyosmani/backbone-aura]):

![Smaller icon](http://i.imgur.com/r667P.png "Page screenshot.")

В качестве контента по умолчанию я добавил четыре модели, которые якобы «запрашиваются» с сервера при инициализации приложения.

Вот что получает обычный поисковый робот, заходя на эту страницу (без применения PhantomJS):

<script src="https://gist.github.com/3434379.js?file=withoutPhantomJS.html"></script>

Только базовая разметка и никаких данных. Робот не сможет корректно проиндексировать эту страницу.

Теперь попробуем, определяя по заголовку User-Agent, перенаправлять запросы от поисковых роботов на headless браузер, который отрисует страницу, выполнит все скрипты. Готовую страницу со всеми нужными данными мы просто скормим роботу, вот что он получит:

<script src="https://gist.github.com/3434379.js?file=withPhantomJS.html"></script>

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