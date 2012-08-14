Handlebars.registerHelper('count', function(count, options) {
  var out = count;

  if (count === 0 && options.hash.none) {
    out = options.hash.none;
  }
  if (count !== undefined) {
    out += ' ' + options.hash[ count == 1 ? 'singular' : 'plural' ];
  }

  return out;
});