requirejs.config({
  baseUrl: 'js/lib',

  paths: {
    app: '../app',

    jquery: 'jquery',
    handlebars: 'handlebars',
    text: 'text'
  }
});

require([
    'jquery',
    'app/list',
    'app/subject',
], function ($, List, Subject, Handlebars) {
  
  "use strict";

  $(function() {
    var listApp = new List();
    listApp.init();
  });

});